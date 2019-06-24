const fs = require("fs");
const path = require("path");
const promisify = require("util").promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const conf = require("../config/defaultConfig.js");
// handlebars template
const handlebars = require("handlebars");
const tplPath = path.join(__dirname, "../template/dir.tpl");
const source = fs.readFileSync(tplPath);
const template = handlebars.compile(source.toString());
const typeTransfer = require("./typeTransfer.js");

module.exports = async function(req, res, filePath) {
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {
      const contentType = typeTransfer(filePath);
      res.statusCode = 200;
      res.setHeader("Content-type", contentType);
      fs.createReadStream(filePath).pipe(res);
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath);
      const dir = path.relative(conf.root, filePath);
      res.statusCode = 200;
      res.setHeader("Content-type", "text/html");
      const data = {
        title: path.basename(filePath),
        dir: dir ? `${dir}` : "",
        files: files.map(file => {
          return {
            file,
            type: typeTransfer(file),
            icon: typeTransfer(file)
          };
        })
      };
      res.end(template(data));
    }
  } catch (err) {
    res.statusCode = 404;
    res.setHeader("Content-type", "text/plain");
    res.end(`${filePath} is not a directory or a file.\n ${err}`);
  }
};
