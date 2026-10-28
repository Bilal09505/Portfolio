import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
const root = path.resolve("out");
const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const files = [];
async function walk(dir) {
  for (const item of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) await walk(file);
    else if (file.endsWith(".html")) files.push(file);
  }
}
await walk(root);
const checked = new Set();
for (const file of files) {
  const html = await fs.readFile(file, "utf8");
  assert.equal(
    (html.match(/<h1[\s>]/g) || []).length,
    1,
    `Expected one h1: ${file}`,
  );
  for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const url = match[1];
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    assert.ok(!base || url.startsWith(base + "/"), `Unprefixed URL: ${url}`);
    const pathname = decodeURIComponent(
      url.slice(base.length).split(/[?#]/)[0],
    );
    if (checked.has(pathname)) continue;
    checked.add(pathname);
    let target = path.join(root, pathname);
    const stat = await fs.stat(target).catch(() => null);
    assert.ok(stat, `Missing export asset: ${url}`);
    if (stat.isDirectory()) await fs.access(path.join(target, "index.html"));
  }
}
console.log(
  `Verified ${files.length} exported HTML pages and ${checked.size} local links/assets under ${base || "/"}.`,
);
