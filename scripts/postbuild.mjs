import fs from "node:fs/promises";
import path from "node:path";
async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(p);
    else if (entry.name === "opengraph-image") await fs.copyFile(p, `${p}.png`);
  }
}
await walk("out");
await fs.writeFile("out/.nojekyll", "");
console.log("Static export ready in out/.");
