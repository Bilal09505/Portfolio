import fs from "node:fs/promises";
import sharp from "sharp";
import { feature } from "topojson-client";
import { geoContains } from "d3-geo";
await fs.mkdir("public/media", { recursive: true });
await fs.mkdir("public/fonts", { recursive: true });
for (const name of ["Geist", "GeistMono"]) {
  const dir = name === "Geist" ? "geist-sans" : "geist-mono";
  await fs.copyFile(
    `node_modules/geist/dist/fonts/${dir}/${name}-Variable.woff2`,
    `public/fonts/${name}.woff2`,
  );
}
for (const width of [640, 1280, 1920])
  await sharp("images/api-doc.png")
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(`public/media/api-doc-${width}.webp`);
const atlas = JSON.parse(
  await fs.readFile("node_modules/world-atlas/land-110m.json", "utf8"),
);
const land = feature(atlas, atlas.objects.land);
const dots = [];
for (let lat = -57; lat < 82; lat += 2)
  for (
    let lon = -180;
    lon < 180;
    lon += 2 / Math.max(0.25, Math.cos((lat * Math.PI) / 180))
  )
    if (geoContains(land, [lon, lat]))
      dots.push([+lat.toFixed(2), +lon.toFixed(2)]);
await fs.writeFile("public/media/globe.json", JSON.stringify(dots));
const icon = `<svg width="180" height="180" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="a"><stop stop-color="#7dd3fc"/><stop offset=".5" stop-color="#a78bfa"/><stop offset="1" stop-color="#fbbf24"/></linearGradient></defs><rect width="180" height="180" rx="45" fill="#171719"/><circle cx="90" cy="90" r="66" fill="url(#a)"/><text x="90" y="109" text-anchor="middle" fill="#171719" font-family="sans-serif" font-size="52" font-weight="700">BH</text></svg>`;
await sharp(Buffer.from(icon)).png().toFile("public/apple-icon.png");
console.log(
  `Prepared local fonts, responsive screenshot, icon and ${dots.length} globe points.`,
);
