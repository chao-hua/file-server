const path = require("path");
const types = {
  text: "text/plain",
  css: "text/css",
  js: "text/javascript",
  html: "text/heml",
  pdf: "application/pdf",
  zip: "application/zip",
  mp3: "audio/mp3",
  mp4: "audio/mp4",
  gif: "image/gif",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png"
};

module.exports = filePath => {
  let ext = path
    .extname(filePath)
    .split(".")
    .pop()
    .toLowerCase();
  if (!ext) {
    ext = filePath;
  }

  return types[ext] ? types[ext] : types["text"];
};
