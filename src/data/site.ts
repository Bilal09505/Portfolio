export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(
  /\/$/,
  "",
);
export const asset = (path: string) => `${basePath}${path}`;
export const site = {
  name: "Bilal Hassan",
  initials: "BH",
  role: "Frontend-focused full stack developer",
  email: "mc180406267@gmail.com",
  location: "Gujrat, Pakistan",
  timezone: "Asia/Karachi",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    `https://bilal09505.github.io${basePath}`,
  github: "https://github.com/Bilal09505",
  linkedin: "https://www.linkedin.com/in/bilal-hassan-a31026206/",
  resume: "/bilal-cv.pdf",
  description:
    "Bilal Hassan builds thoughtful web experiences and reliable systems with Angular, React, Next.js and NestJS. Based in Gujrat, Pakistan.",
  experience: [
    {
      role: "Full Stack Developer",
      company: "Techno Verse",
      period: "2023 — Present",
      description:
        "Building modular Angular and React applications, NestJS services, authentication and role-based access. Working with code reviews and CI/CD to keep delivery maintainable.",
    },
    {
      role: "Freelance Full Stack Developer",
      company: "Remote",
      period: "2019 — 2022",
      description:
        "Delivered admin panels, dashboards and CRUD applications end to end, with Firebase authentication and real-time data.",
    },
    {
      role: "IT Administrator",
      company: "Police Department",
      period: "2018 — 2020",
      description:
        "Designed and maintained an online attendance system, alongside system monitoring, data validation and maintenance.",
    },
  ],
  education: [
    {
      degree: "Master of Computer Science",
      school: "Virtual University, Lahore",
    },
    {
      degree: "Bachelor of Computer Science",
      school: "University of Sargodha · Mathematics & CS",
    },
  ],
};
