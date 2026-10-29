import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Box } from "lucide-react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { Tech } from "@/components/brands";
import { Orb } from "@/components/shell";
import { ProjectVisual } from "@/components/project-visual";
import { CaseNavigation, Gallery } from "@/components/case-interactions";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `${site.url}/work/${p.slug}/` },
    openGraph: {
      title: p.title,
      description: p.tagline,
      images: [`${site.url}/media/og-${p.slug}.png`],
    },
  };
}
export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <>
      <div className="reading-progress" />
      <header className="container case-header">
        <Link href="/#projects" className="back-link">
          <ArrowLeft size={15} />
          All projects
        </Link>
        <div className="project-meta mono">
          <span>{p.category}</span>
          <span className="status">{p.status}</span>
          <span>{p.year}</span>
        </div>
        <h1>
          {p.title}
          <span className="gradient-text">.</span>
        </h1>
        <p className="case-tagline">{p.tagline}</p>
        <div className="case-meta">
          <div>
            <span className="mono">Platform</span>
            {p.platform}
          </div>
          <div>
            <span className="mono">Focus</span>
            {p.category}
          </div>
          <div>
            <span className="mono">Status</span>
            {p.status}
          </div>
          {p.links.map((l) => (
            <a
              className="button outline"
              href={l.url}
              target="_blank"
              rel="noreferrer"
              key={l.label}
            >
              {l.label}
              <ArrowUpRight size={16} />
            </a>
          ))}
        </div>
      </header>
      <div className="container">
        <div className="case-cover">
          <ProjectVisual project={p} large />
        </div>
        <div className="case-layout">
          <CaseNavigation />
          <div className="case-content">
            <section id="problem">
              <span className="eyebrow">
                <Orb /> The challenge
              </span>
              <h2>The problem.</h2>
              <p className="problem-copy">{p.problem}</p>
            </section>
            <section id="built">
              <h2>What I built.</h2>
              <div className="feature-grid">
                {p.features.map((f) => (
                  <div key={f.title} data-reveal>
                    <Box size={22} />
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </div>
                ))}
              </div>
            </section>
            <section id="flow">
              <h2>How it works.</h2>
              <div className="flow-diagram">
                {p.flow.map((step) => (
                  <div className="flow-step" key={step}>
                    <Orb />
                    {step}
                  </div>
                ))}
              </div>
            </section>
            <section id="engineering">
              <h2>The decisions underneath.</h2>
              <ul className="engineering-notes">
                {p.notes.map((n) => (
                  <li key={n}>
                    <Check size={18} />
                    {n}
                  </li>
                ))}
              </ul>
            </section>
            <section id="technology">
              <h2>The stack.</h2>
              <div className="tech-list">
                {p.stack.map((t) => (
                  <Tech key={t} name={t} />
                ))}
              </div>
            </section>
            {p.image && (
              <section id="gallery">
                <h2>A closer look.</h2>
                <div className="project-gallery">
                  {(p.gallery || [{ image: p.image, title: p.title }]).map((shot) => (
                    <Gallery key={shot.image} image={shot.image} title={shot.title} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
        <Link href={`/work/${next.slug}/`} className="next-project">
          <div>
            <span className="eyebrow">
              <Orb /> Keep exploring
            </span>
            <h2>{next.title}</h2>
          </div>
          <ArrowUpRight size={45} />
        </Link>
      </div>
    </>
  );
}
