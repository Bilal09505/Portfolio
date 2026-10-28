import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
const root = path.resolve("out");
const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const types = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".txt": "text/plain",
  ".xml": "application/xml",
};
http
  .createServer(async (req, res) => {
    try {
      let url = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      if (base && !url.startsWith(base + "/") && url !== base) {
        res.writeHead(404);
        return res.end("Not found");
      }
      url = url.slice(base.length);
      let file = path.resolve(root, "." + url);
      if (file !== root && !file.startsWith(root + path.sep)) {
        res.writeHead(403);
        return res.end();
      }
      if ((await fs.stat(file)).isDirectory())
        file = path.join(file, "index.html");
      const data = await fs.readFile(file);
      res.writeHead(200, {
        "Content-Type": types[path.extname(file)] || "application/octet-stream",
      });
      res.end(data);
    } catch {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(
        await fs.readFile(path.join(root, "404.html")).catch(() => "Not found"),
      );
    }
  })
  .listen(3000, "127.0.0.1", () =>
    console.log(`Local: http://127.0.0.1:3000${base}/`),
  );
