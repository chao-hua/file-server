const path = require("path");
const fs = require("fs");

const types = {
  folder: { type: "text/html", icon: "folder.png" },
  text: { type: "text/plain", icon: "other.png" },
  css: { type: "text/css", icon: "css.png" },
  js: { type: "text/javascript", icon: "js.png" },
  html: { type: "text/html", icon: "html.png" },
  json: { type: "text/plain", icon: "json.png" },
  md: { type: "text/plain", icon: "md.png" },
  pdf: { type: "application/pdf", icon: "pdf.png" },
  zip: { type: "application/zip", icon: "zip.png" },
  mp3: { type: "audio/mp3", icon: "mp3.png" },
  mp4: { type: "audio/mp4", icon: "mp4.png" },
  gif: { type: "image/gif", icon: "gif.png" },
  jpeg: { type: "image/jpeg", icon: "jpg.png" },
  jpg: { type: "image/jpeg", icon: "jpg.png" },
  png: { type: "image/png", icon: "png.png" }
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

  const stats = fs.statSync(filePath);
  if (stats.isDirectory()) {
    ext = "folder";
  }

  return types[ext] ? types[ext] : types["text"];
};
