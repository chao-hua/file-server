const fs = require("fs");
const path = require("path");
const promisify = require("util").promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const compress = require("./compress");
const range = require("./range");
const cache = require("./cache");
// handlebars template
const handlebars = require("handlebars");
const tplPath = path.join(__dirname, "../template/dir.tpl");
const source = fs.readFileSync(tplPath);
const template = handlebars.compile(source.toString());
const typeTransfer = require("./typeTransfer.js");

module.exports = async function(req, res, filePath, conf) {
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {
      const contentType = typeTransfer(filePath);
      res.setHeader("Content-type", contentType.type);
      // cache
      if (cache(stats, req, res)) {
        res.statusCode = 304;
        res.end();
      }
      // range
      let rs;
      const { start, end, code } = range(stats.size, req, res);
      if (code === 200) {
        res.statusCode = 200;
        rs = fs.createReadStream(filePath);
      } else {
        res.statusCode = 206;
        rs = fs.createReadStream(filePath, { start, end });
      }
      // compress
      if (filePath.match(conf.compress)) {
        rs = compress(rs, req, res);
      }
      rs.pipe(res);
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath);
      const dir = path.relative(conf.root, filePath);
      // template data
      const data = {
        title: path.basename(filePath),
        dir: dir ? `${dir}` : "",
        files: files.map(file => {
          const fullPath = path.join(filePath, file);
          const typeInfo = typeTransfer(fullPath);
          return {
            file,
            type: typeInfo.type,
            icon: typeInfo.icon
          };
        })
      };
      res.statusCode = 200;
      res.setHeader("Content-type", "text/html");
      res.end(template(data));
    }
  } catch (err) {
    res.statusCode = 404;
    res.setHeader("Content-type", "text/plain");
    res.end(`${filePath} is not a directory or a file.\n ${err}`);
  }
};
