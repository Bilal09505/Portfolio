import {
  siAngular,
  siReact,
  siNextdotjs,
  siTypescript,
  siTailwindcss,
  siNodedotjs,
  siNestjs,
  siExpress,
  siMongodb,
  siMysql,
  siFirebase,
  siIonic,
  siGit,
  siGithub,
  siDocker,
  siPostman,
  siJavascript,
  siHtml5,
  siCss,
} from "simple-icons";
const icons = [
  siAngular,
  siReact,
  siNextdotjs,
  siTypescript,
  siTailwindcss,
  siNodedotjs,
  siNestjs,
  siExpress,
  siMongodb,
  siMysql,
  siFirebase,
  siIonic,
  siGit,
  siGithub,
  siDocker,
  siPostman,
  siJavascript,
  siHtml5,
  siCss,
];
const names = [
  "Angular",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "NestJS",
  "Express",
  "MongoDB",
  "MySQL",
  "Firebase",
  "Ionic",
  "Git",
  "GitHub",
  "Docker",
  "Postman",
  "JavaScript",
  "HTML5",
  "CSS3",
];
export function BrandSprite() {
  return (
    <svg className="sprite" aria-hidden="true">
      <defs>
        {icons.map((icon, i) => (
          <symbol key={icon.slug} id={`brand-${i}`} viewBox="0 0 24 24">
            <path d={icon.path} />
          </symbol>
        ))}
      </defs>
    </svg>
  );
}
export function Brand({ name }: { name: string }) {
  const i = names.indexOf(name);
  return i < 0 ? (
    <span>{name}</span>
  ) : (
    <svg aria-hidden="true" className="brand-icon" viewBox="0 0 24 24">
      <use href={`#brand-${i}`} />
    </svg>
  );
}
export function Tech({ name }: { name: string }) {
  return (
    <span className="tech-chip">
      <Brand name={name} />
      {name}
    </span>
  );
}
