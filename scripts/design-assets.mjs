import fs from "node:fs/promises";
import * as icons from "simple-icons";
const names = {
  Angular: "siAngular",
  React: "siReact",
  "Next.js": "siNextdotjs",
  TypeScript: "siTypescript",
  "Tailwind CSS": "siTailwindcss",
  "Node.js": "siNodedotjs",
  NestJS: "siNestjs",
  Express: "siExpress",
  MongoDB: "siMongodb",
  MySQL: "siMysql",
  Firebase: "siFirebase",
  Ionic: "siIonic",
  Git: "siGit",
  GitHub: "siGithub",
  Docker: "siDocker",
  Postman: "siPostman",
};
await fs.mkdir("public/images/tech", { recursive: true });
await fs.mkdir("public/images/flags", { recursive: true });
await fs.mkdir("public/images/projects", { recursive: true });
for (const [name, key] of Object.entries(names)) {
  const icon = icons[key];
  if (!icon) throw new Error(`Missing logo ${name}`);
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  await fs.writeFile(
    `public/images/tech/${slug}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>${name}</title><path fill="#${icon.hex}" d="${icon.path}"/></svg>`,
  );
}
const flags = {
  pk: '<path fill="#075c39" d="M0 0h30v20H0z"/><path fill="#fff" d="M0 0h7v20H0z"/><circle cx="19" cy="10" r="6" fill="#fff"/><circle cx="21" cy="8" r="5.5" fill="#075c39"/><path fill="#fff" d="m23 5 .6 1.9h2l-1.6 1.2.6 1.9L23 8.8l-1.6 1.2.6-1.9-1.6-1.2h2z"/>',
  gb: '<path fill="#17336e" d="M0 0h30v20H0z"/><path stroke="#fff" stroke-width="5" d="m0 0 30 20M30 0 0 20"/><path stroke="#c9364f" stroke-width="2" d="m0 0 30 20M30 0 0 20"/><path stroke="#fff" stroke-width="7" d="M15 0v20M0 10h30"/><path stroke="#c9364f" stroke-width="4" d="M15 0v20M0 10h30"/>',
  ae: '<path fill="#16855d" d="M0 0h30v7H0z"/><path fill="#fff" d="M0 7h30v6H0z"/><path fill="#202224" d="M0 13h30v7H0z"/><path fill="#df3e43" d="M0 0h8v20H0z"/>',
};
for (const [key, svg] of Object.entries(flags))
  await fs.writeFile(
    `public/images/flags/${key}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20">${svg}</svg>`,
  );
const dots = JSON.parse(await fs.readFile("public/media/globe.json", "utf8"));
await fs.writeFile(
  "public/images/world-map.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500"><title>World map</title><g fill="#aaa0ba">${dots.map(([lat, lon]) => `<circle cx="${(((lon + 180) / 360) * 1000).toFixed(1)}" cy="${(((90 - lat) / 180) * 500).toFixed(1)}" r="1.55"/>`).join("")}</g></svg>`,
);
await fs.copyFile(
  "images/api-doc.png",
  "public/images/projects/api-documentation.png",
);
await fs.copyFile(
  "public/media/api-doc-1280.webp",
  "public/images/projects/api-documentation.webp",
);
console.log(
  "Prepared local world map, country flags, 16 brand SVGs and project screenshot assets.",
);
