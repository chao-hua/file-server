const { cache } = require("../config/defaultConfig.js");

const eH = "Expires";
const cH = "Catch-Control";
const lH = "Last-Modified";
const lQH = "if-modified-since";
const tH = "ETag";
const tQH = "if-none-match";

function refreshRes(stats, res) {
  const { maxAge, expires, catchControl, lastModified, etag } = cache;

  if (expires) {
    res.setHeader(eH, new Date(Date.now() + maxAge * 1000).getTime());
  }

  if (catchControl) {
    res.setHeader(cH, `public, max-age=${maxAge}`);
  }

  if (lastModified) {
    res.setHeader(lH, stats.mtime.getTime());
  }

  if (etag) {
    res.setHeader(tH, `${stats.size}-${stats.mtime.getTime()}`);
  }
}

module.exports = (stats, req, res) => {
  refreshRes(stats, res);
  const lastModified = req.headers[lQH];
  const etag = req.headers[tQH];

  if (!lastModified && !etag) {
    return false;
  }

  if (lastModified && lastModified != res.getHeader(lH)) {
    return false;
  }

  if (etag && etag != res.getHeader(tH)) {
    return false;
  }

  return true;
};
