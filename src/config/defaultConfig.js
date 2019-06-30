module.exports = {
  root: process.cwd(),
  hostname: "127.0.0.1",
  port: 8888,
  compress: /\.(html|js|css|md)/,
  cache: {
    maxAge: 600, // s
    expires: true,
    catchControl: true,
    lastModified: true,
    etag: true
  }
};
