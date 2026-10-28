// node scripts/media.mjs media/manifest.json
// Redact before resizing. Raw media is gitignored.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { spawnSync } from "node:child_process";
const manifest = JSON.parse(
  await fs.readFile(process.argv[2] || "media/manifest.json", "utf8"),
);
for (const item of manifest) {
  if (!/^[a-z0-9-]+$/.test(item.slug))
    throw new Error("Use a lowercase filename slug.");
  const dir = path.join("public/media", item.slug);
  await fs.mkdir(dir, { recursive: true });
  if (item.video) {
    const args = [
      "-y",
      "-i",
      item.source,
      "-an",
      "-c:v",
      "libx264",
      "-crf",
      "25",
      "-movflags",
      "+faststart",
      path.join(dir, "demo.mp4"),
    ];
    const result = spawnSync("ffmpeg", args, {
      stdio: "inherit",
      shell: false,
    });
    if (result.status !== 0)
      throw new Error("ffmpeg failed; install ffmpeg and check input.");
    const poster = spawnSync(
      "ffmpeg",
      ["-y", "-i", item.source, "-frames:v", "1", path.join(dir, "poster.jpg")],
      { stdio: "inherit", shell: false },
    );
    if (poster.status !== 0) throw new Error("Poster creation failed.");
    continue;
  }
  const input = await fs.readFile(item.source);
  const overlays = [];
  for (const box of item.blur || []) {
    const image = await sharp(input).extract(box).blur(28).png().toBuffer();
    overlays.push({ input: image, left: box.left, top: box.top });
  }
  const redacted = await sharp(input).composite(overlays).png().toBuffer();
  for (const width of [640, 1280, 1920])
    await sharp(redacted)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(path.join(dir, `cover-${width}.webp`));
}
