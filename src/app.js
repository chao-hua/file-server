const http = require("http");
const conf = require("./config/defaultConfig.js");
const chalk = require("chalk");
const path = require("path");
const route = require("./helper/route");
const open = require("./helper/open");

class Server {
  constructor(config) {
    this.config = Object.assign({}, conf, config);
  }

  start() {
    const server = http.createServer((req, res) => {
      const filePath = path.join(this.config.root, req.url);
      route(req, res, filePath, this.config);
    });

    server.listen(this.config.port, this.config.hostname, () => {
      const addr = `http://${this.config.hostname}:${this.config.port}`;
      console.info(`Server is running at ${chalk.green(addr)}`);
      open(addr);
    });
  }
}

module.exports = Server;
