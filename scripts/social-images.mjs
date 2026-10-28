import fs from "node:fs/promises";
import { ImageResponse } from "next/og.js";
import React from "react";
import { stripTypeScriptTypes } from "node:module";
const source = await fs.readFile("src/data/projects.ts", "utf8");
const { projects } = await import(
  `data:text/javascript;base64,${Buffer.from(stripTypeScriptTypes(source)).toString("base64")}`
);
const h = React.createElement;
await fs.mkdir("public/media", { recursive: true });
for (const p of [
  {
    slug: "home",
    title: "Bilal Hassan",
    tagline: "Thoughtful interfaces. Reliable systems.",
    platform: "Angular · React · Next.js · NestJS",
    tint: "#ded2ee",
  },
  ...projects,
]) {
  const response = new ImageResponse(
    h(
      "div",
      {
        style: {
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#f4f4f1",
          padding: 75,
          flexDirection: "column",
          fontFamily: "sans-serif",
          color: "#242425",
        },
      },
      h(
        "div",
        {
          style: {
            display: "flex",
            fontSize: 22,
            color: "#777",
            marginBottom: 60,
          },
        },
        "BILAL HASSAN  /  SELECTED WORK",
      ),
      h(
        "div",
        {
          style: {
            display: "flex",
            fontSize: 76,
            letterSpacing: -4,
            maxWidth: 1000,
            lineHeight: 1.1,
          },
        },
        p.title,
      ),
      h(
        "div",
        {
          style: {
            display: "flex",
            fontSize: 30,
            color: "#777",
            marginTop: 30,
          },
        },
        p.tagline,
      ),
      h(
        "div",
        {
          style: {
            display: "flex",
            fontSize: 20,
            marginTop: "auto",
            padding: 18,
            background: p.tint,
            borderRadius: 15,
          },
        },
        p.platform,
      ),
    ),
    { width: 1200, height: 630 },
  );
  await fs.writeFile(
    p.slug === "home" ? "public/og.png" : `public/media/og-${p.slug}.png`,
    Buffer.from(await response.arrayBuffer()),
  );
}
console.log("Generated home and project share images.");
