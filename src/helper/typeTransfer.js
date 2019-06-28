const path = require("path");
const fs = require("fs");

const types = {
  unknown: { type: "text/plain", icon: "unknown" },
  folder: { type: "text/html", icon: "folder" },

  txt: { type: "text/plain", icon: "txt" },
  ppt: { type: "application/x-ppt", icon: "ppt" },
  pptx: { type: "application/x-ppt", icon: "ppt" },
  pdf: { type: "application/pdf", icon: "pdf" },
  xls: { type: "application/x-xls", icon: "excel" },
  doc: { type: "application/msword", icon: "excel" },
  docx: { type: "application/msword", icon: "excel" },
  zip: { type: "application/zip", icon: "zip" },
  rar: { type: "application/zip", icon: "zip" },
  exe: { type: "application/x-msdownload", icon: "exe" },
  dmg: { type: "application/octet-stream", icon: "dmg" },

  mp3: { type: "audio/mp3", icon: "music" },
  mp4: { type: "audio/mp4", icon: "video" },

  gif: { type: "image/gif", icon: "pic" },
  jpeg: { type: "image/jpeg", icon: "pic" },
  jpg: { type: "image/jpeg", icon: "pic" },
  png: { type: "image/png", icon: "pic" },
  ico: { type: "image/x-ico", icon: "pic" },

  css: { type: "text/css", icon: "code" },
  scss: { type: "text/css", icon: "code" },
  sass: { type: "text/css", icon: "code" },
  js: { type: "text/javascript", icon: "code" },
  html: { type: "text/html", icon: "code" },
  json: { type: "text/plain", icon: "code" },
  md: { type: "text/plain", icon: "code" },
  vue: { type: "text/plain", icon: "code" },
  xml: { type: "text/plain", icon: "code" },
  cmd: { type: "text/plain", icon: "code" }
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

  try {
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      ext = "folder";
    }
  } catch (err) {
    ext = "";
  }

  return types[ext] ? types[ext] : types["unknown"];
};
