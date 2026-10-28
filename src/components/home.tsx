"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Plus,
  Minus,
  Code2,
  Layers,
  GraduationCap,
  MapPin,
  Sparkles,
  X,
  Terminal,
  Braces,
  FolderGit2,
  Send,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { projects } from "@/data/projects";
import { stack } from "@/data/stack";
import { site, asset } from "@/data/site";
import { Brand, Tech } from "./brands";
import { Clock, Orb } from "./shell";
import { ProjectVisual } from "./project-visual";
import { Contact } from "./contact";
import { AvailabilityMap } from "./availability-map";
import { StackSphere } from "./stack-sphere";
const Globe = dynamic(() => import("./globe"), {
  ssr: false,
  loading: () => <div className="globe-placeholder" />,
});
const answers = [
  {
    question: "What do you build?",
    answer:
      "I build frontend-focused full stack applications: Angular and React interfaces, Next.js apps, and Node.js / NestJS APIs. My work includes school administration, inventory, commerce and developer tools.",
  },
  {
    question: "What are you working on?",
    answer:
      "Cambridge School and Hafiz Auto are currently in progress. Cambridge connects school finance and administration; Hafiz Auto connects car-parts inventory, sales and offline workflows.",
  },
  {
    question: "How can we work together?",
    answer: `I’m open to full-time and freelance opportunities. Email ${site.email} with your idea, scope and timeline, and we can take it from there.`,
  },
];
function Assistant() {
  const ref = useRef<HTMLDialogElement>(null);
  const [answer, setAnswer] = useState(""),
    [typed, setTyped] = useState("");
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) {
      setTyped(answer);
      return;
    }
    setTyped("");
    let i = 0;
    const timer = setInterval(() => {
      i += 3;
      setTyped(answer.slice(0, i));
      if (i >= answer.length) clearInterval(timer);
    }, 14);
    return () => clearInterval(timer);
  }, [answer, reduce]);
  return (
    <>
      <button className="text-button" onClick={() => ref.current?.showModal()}>
        <Sparkles size={16} />
        Ask my assistant
        <ArrowUpRight size={15} />
      </button>
      <dialog ref={ref} className="assistant-dialog">
        <div className="dialog-heading">
          <span>
            <Orb /> A little about Bilal
          </span>
          <button
            className="icon-button"
            aria-label="Close assistant"
            onClick={() => ref.current?.close()}
          >
            <X />
          </button>
        </div>
        <p className="muted">
          A few useful answers. Written by me, served by this little assistant.
        </p>
        <div className="assistant-questions">
          {answers.map((a) => (
            <button key={a.question} onClick={() => setAnswer(a.answer)}>
              {a.question}
              <ArrowUpRight size={16} />
            </button>
          ))}
        </div>
        <p className="assistant-answer" aria-live="polite">
          {typed || "Choose a question to get started."}
        </p>
        <a className="button" href={`mailto:${site.email}`}>
          Talk to the actual human
          <Send size={16} />
        </a>
      </dialog>
    </>
  );
}
function Hero() {
  const [near, setNear] = useState(-1);
  return (
    <section className="hero container" id="home">
      <div className="hero-copy">
        <div className="name-chip">
          <span className="tiny-monogram">BH</span>
          <span>Hey, I’m Bilal</span>
          <span className="chip-divider" />
          <span className="live-dot" />
          <span>Open to opportunities</span>
        </div>
        <h1 onPointerLeave={() => setNear(-1)}>
          Thoughtful
          <br />
          {"interfaces.".split("").map((c, i) => (
            <span
              key={i}
              onPointerEnter={() => setNear(i)}
              style={{
                fontWeight: near >= 0 && Math.abs(i - near) < 2 ? 750 : 500,
              }}
            >
              {c}
            </span>
          ))}{" "}
          <br />
          <span className="gradient-text">Reliable systems.</span>
        </h1>
        <p className="hero-description">
          I turn complex problems into clear, usable software.
          <br className="desktop-break" /> A frontend-focused full stack
          developer connecting
          <br className="desktop-break" /> beautiful interfaces with the logic
          behind them.
        </p>
        <div className="hero-actions">
          <Link href="/#projects" className="button">
            Explore my work
            <ArrowUpRight size={19} />
          </Link>
          <Assistant />
        </div>
        <div className="hero-meta mono">
          <span>
            <MapPin size={13} />
            Gujrat, Pakistan
          </span>
          <span>
            <Clock />
          </span>
        </div>
      </div>
      <div className="hero-art">
        <span className="art-eyebrow mono">
          <span className="crosshair">+</span> Built here. Ready for anywhere.
        </span>
        <Globe />
        <div className="orbit-note">
          <span className="orb" />
          <div>
            Interfaces ↔ APIs<small>Connecting the whole picture.</small>
          </div>
        </div>
      </div>
      <div className="hero-bottom mono">
        <span>Angular / React / Next.js / NestJS</span>
        <a href="#projects">
          Scroll to explore <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
function Marquee() {
  const brands = [
    "Angular",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "NestJS",
    "Firebase",
    "MongoDB",
  ];
  return (
    <section className="tech-marquee" aria-label="Technologies I work with">
      <div className="container marquee-label mono">
        Good tools. Thoughtfully connected.
      </div>
      <div className="marquee-mask">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div className="marquee-set" key={copy} aria-hidden={copy === 1}>
              {brands.map((b) => (
                <span key={b}>
                  <Brand name={b} />
                  {b}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="marquee-track reverse">
          {[0, 1].map((copy) => (
            <div
              className="marquee-set small-marquee"
              key={copy}
              aria-hidden={copy === 1}
            >
              {[
                "Clean architecture",
                "API design",
                "Responsive interfaces",
                "Role-based access",
                "TypeScript",
                "Real-time data",
                "Progressive web apps",
              ].map((t) => (
                <span key={t}>
                  <span className="small-dot" />
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Facts() {
  return (
    <div className="container facts-grid" data-reveal>
      <div className="fact-card">
        <FolderGit2 />
        <span className="fact-number">
          {projects.length}
          <span> projects</span>
        </span>
        <p>Selected across web & mobile</p>
        <div className="dot-field" aria-hidden="true">
          {Array.from({ length: 48 }, (_, i) => (
            <i key={i} style={{ animationDelay: `${i * 0.06}s` }} />
          ))}
        </div>
      </div>
      <div className="fact-card">
        <Code2 />
        <span className="fact-number">
          2<span> in progress</span>
        </span>
        <p>School finance & car parts</p>
        <div className="mini-bars" aria-hidden="true">
          {[25, 42, 36, 65, 58, 80, 72, 95].map((n, i) => (
            <i key={i} style={{ height: `${n}%` }} />
          ))}
        </div>
      </div>
      <div className="fact-card">
        <Layers />
        <span className="fact-word">End to end.</span>
        <p>From interface to API</p>
        <div className="mini-flow" aria-hidden="true">
          <Braces />
          <span>↔</span>
          <Terminal />
          <span>↔</span>
          <Layers />
        </div>
      </div>
      <div className="fact-card">
        <MapPin />
        <span className="fact-word">Pakistan.</span>
        <p>Based in Gujrat. Open to remote.</p>
        <div className="timezone-art mono">
          <span className="live-dot" />
          <Clock />
        </div>
      </div>
    </div>
  );
}
function Work() {
  return (
    <section className="section container" id="projects">
      <div className="section-heading" data-reveal>
        <div>
          <span className="eyebrow">
            <Orb /> Selected work
          </span>
          <h2>
            Real problems.
            <br />
            <span className="muted">Thoughtful solutions.</span>
          </h2>
        </div>
        <p>
          A closer look at the systems I’m building,
          <br />
          and the decisions that make them work.
        </p>
      </div>
      <div className="project-stack">
        {projects
          .filter((p) => p.featured)
          .map((p, i) => (
            <article
              className="featured-project"
              key={p.slug}
              style={{ top: `${100 + i * 12}px` }}
              data-reveal
            >
              <div className="project-text">
                <div className="project-meta mono">
                  <span>{p.category}</span>
                  <span
                    className={
                      p.status === "In progress"
                        ? "status active-status"
                        : "status"
                    }
                  >
                    {p.status === "In progress" && (
                      <span className="live-dot" />
                    )}
                    {p.status}
                  </span>
                </div>
                <div>
                  <h3>{p.title}</h3>
                  <p className="project-tagline">{p.tagline}</p>
                  <p className="muted">{p.description}</p>
                </div>
                <div className="tech-list">
                  {p.stack.map((t) => (
                    <Tech key={t} name={t} />
                  ))}
                </div>
                <div className="project-bottom">
                  <Link
                    href={`/work/${p.slug}/`}
                    className="button outline"
                    data-cursor="View"
                  >
                    Explore project
                    <ArrowUpRight size={17} />
                  </Link>
                  <span className="mono muted">{p.platform}</span>
                </div>
              </div>
              <Link
                href={`/work/${p.slug}/`}
                className="visual-link"
                aria-label={`Explore ${p.title}`}
                data-cursor="View"
              >
                <ProjectVisual project={p} />
              </Link>
            </article>
          ))}
      </div>
      <div className="also-heading">
        <h3>
          More from the workshop<span className="muted">.</span>
        </h3>
        <span className="mono">Built, explored, learned.</span>
      </div>
      <div className="side-projects">
        {projects
          .filter((p) => !p.featured)
          .map((p) => (
            <Link
              href={`/work/${p.slug}/`}
              key={p.slug}
              className="side-card"
              data-cursor="View"
            >
              <div className="side-icon" style={{ background: p.tint }}>
                <Code2 size={23} />
                <ArrowUpRight size={22} />
              </div>
              <span className="mono muted">{p.category}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <span className="side-stack mono">
                {p.stack.slice(0, 3).join(" / ")}
              </span>
            </Link>
          ))}
      </div>
    </section>
  );
}
function About() {
  const bio =
    "I’m Bilal, a frontend-focused full stack developer who cares as much about how software feels as how it works. I build clear interfaces, well-structured APIs, and systems that make everyday work a little easier.";
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <span className="eyebrow">
          <Orb /> The human behind the code
        </span>
        <div className="about-grid">
          <motion.div className="portrait-card" whileHover={{ rotate: 1.5 }}>
            <span className="portrait-word">BILAL</span>
            <div className="portrait-monogram">
              bh<span>✳</span>
            </div>
            <div className="floating-brand angular">
              <Brand name="Angular" />
            </div>
            <div className="floating-brand react">
              <Brand name="React" />
            </div>
            <div className="floating-brand typescript">
              <Brand name="TypeScript" />
            </div>
            <div className="portrait-caption">
              <span>
                Bilal Hassan
                <small>Developer. Problem solver. Always learning.</small>
              </span>
              <ArrowUpRight size={23} />
            </div>
          </motion.div>
          <div className="about-copy" data-reveal>
            <h2>
              A curious mind.
              <br />
              <span className="muted">A builder at heart.</span>
            </h2>
            <p>
              {bio.split(" ").map((word, i) => (
                <span className="bio-word" key={i}>
                  {word}{" "}
                </span>
              ))}
            </p>
            <p className="about-secondary">
              My work spans Angular, React, Next.js and NestJS. Right now, I’m
              going deeper into .NET, microservices and scalable system design.
            </p>
            <a
              href={asset(site.resume)}
              className="text-button"
              target="_blank"
              rel="noreferrer"
            >
              A little more about me — résumé
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <div className="about-bento">
          <div>
            <span className="eyebrow">
              <Code2 size={16} /> Currently building
            </span>
            <h3>
              School finance.
              <br />
              Car parts inventory.
            </h3>
            <span className="mono">
              <span className="live-dot" /> Work in progress
            </span>
          </div>
          <div className="clock-tile">
            <span className="eyebrow">
              <MapPin size={16} /> My corner of the world
            </span>
            <strong>
              <Clock />
            </strong>
            <p>Gujrat, Pakistan</p>
          </div>
          <div>
            <span className="eyebrow">
              <Sparkles size={16} /> Things I care about
            </span>
            <div className="value-chips">
              {[
                "Clarity over complexity",
                "Maintainable code",
                "Thoughtful details",
                "Always learning",
              ].map((v) => (
                <span key={v}>{v}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function Stack() {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();
  return (
    <section className="section container" id="stack">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            <Orb /> My toolkit
          </span>
          <h2>
            The right tool.
            <br />
            <span className="muted">For the right reason.</span>
          </h2>
        </div>
        <p>
          Tools change. A solid foundation
          <br />
          and a curious mind go a long way.
        </p>
      </div>
      <div className="stack-layout">
        <div className="stack-accordion">
          {stack.map((s, i) => (
            <div
              className={`stack-row ${open === i ? "is-open" : ""}`}
              key={s.name}
            >
              <button
                aria-expanded={open === i}
                aria-controls={`stack-panel-${i}`}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <span>
                  <Code2 size={19} />
                  {s.name}
                </span>
                <span className="stack-previews">
                  {s.tools.slice(0, 3).map((t) => (
                    <Brand name={t} key={t} />
                  ))}
                </span>
                {open === i ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              <div id={`stack-panel-${i}`} hidden={open !== i}>
                <p>{s.description}</p>
                <div className="tech-list">
                  {s.tools.map((t) => (
                    <Tech key={t} name={t} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <StackSphere active={open} />
      </div>
    </section>
  );
}
function Experience() {
  return (
    <section className="section experience-section" id="experience">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              <Orb /> The journey so far
            </span>
            <h2>
              Learning by <span className="muted">building.</span>
            </h2>
          </div>
          <a
            href={asset(site.resume)}
            target="_blank"
            rel="noreferrer"
            className="text-button"
          >
            Download résumé
            <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="experience-list">
          {site.experience.map((e, i) => (
            <article key={e.company} data-reveal>
              <span className="mono experience-period">{e.period}</span>
              <div>
                <h3>{e.role}</h3>
                <span className="company">{e.company}</span>
                <p>{e.description}</p>
              </div>
              <span className={`experience-dot ${i === 0 ? "current" : ""}`} />
            </article>
          ))}
        </div>
        <div className="education" id="education">
          <GraduationCap size={25} />
          {site.education.map((e) => (
            <div key={e.degree}>
              <h4>{e.degree}</h4>
              <p>{e.school}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Facts />
      <Work />
      <About />
      <Stack />
      <Experience />
      <AvailabilityMap />
      <Contact />
    </>
  );
}
