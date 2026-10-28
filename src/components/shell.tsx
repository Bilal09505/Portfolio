"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command } from "cmdk";
import {
  ArrowUpRight,
  ArrowUp,
  Sun,
  Moon,
  Menu,
  X,
  Search,
  Command as CommandIcon,
  FileDown,
  Code2,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site, asset } from "@/data/site";
import { projects } from "@/data/projects";
const links = [
  ["Work", "projects"],
  ["About", "about"],
  ["Stack", "stack"],
  ["Experience", "experience"],
];
export function Clock() {
  const [time, setTime] = useState("Pakistan · PKT");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: site.timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()) + " PKT",
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return <time suppressHydrationWarning>{time}</time>;
}
export function Orb() {
  return <span className="orb" aria-hidden="true" />;
}
export function Header() {
  const [scrolled, setScrolled] = useState(false),
    [dark, setDark] = useState(false),
    [menu, setMenu] = useState(false),
    [palette, setPalette] = useState(false),
    [active, setActive] = useState("");
  const pathname = usePathname();
  const menuRef = useRef<HTMLDialogElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
    const scroll = () => {
      setScrolled(scrollY > 60);
      document.documentElement.style.setProperty(
        "--scroll-progress",
        `${(scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)) * 100}%`,
      );
    };
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("keydown", key);
    };
  }, []);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);
  useEffect(() => {
    const d = menuRef.current;
    if (menu) {
      d?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      d?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);
  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const update = () => {
      const next = !dark;
      setDark(next);
      document.documentElement.dataset.theme = next ? "dark" : "light";
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {}
    };
    if (!document.startViewTransition || reduce) {
      update();
      return;
    }
    document.documentElement.style.setProperty("--theme-x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--theme-y", `${e.clientY}px`);
    document.startViewTransition(update);
  };
  const jump = (path: string) => {
    setPalette(false);
    setMenu(false);
    location.href = asset(path);
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={`header ${scrolled ? "compact" : ""}`}>
        <Link className="identity" href="/" aria-label="Bilal Hassan home">
          <span className="monogram">BH</span>
          <span>
            Bilal Hassan
            <span className="identity-caption">Full stack developer</span>
          </span>
        </Link>
        <nav aria-label="Main navigation">
          {links.map(([label, id]) => (
            <Link
              className={active === id ? "active" : ""}
              key={id}
              href={`/#${id}`}
            >
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="command-trigger icon-button"
            aria-label="Open command palette"
            onClick={() => setPalette(true)}
          >
            <CommandIcon size={15} />
            <kbd>K</kbd>
          </button>
          <button
            className="icon-button"
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            onClick={toggle}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link className="button small header-cta" href="/#contact">
            <span className="live-dot" />
            Let’s talk
            <ArrowUpRight size={16} />
          </Link>
          <button
            className="menu-trigger icon-button"
            aria-label="Open menu"
            aria-expanded={menu}
            onClick={() => setMenu(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>
      <dialog
        className="mobile-menu"
        ref={menuRef}
        onCancel={() => setMenu(false)}
      >
        <div className="mobile-menu-top">
          <span className="monogram">BH</span>
          <button
            className="icon-button"
            aria-label="Close menu"
            onClick={() => setMenu(false)}
          >
            <X />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {[...links, ["Contact", "contact"]].map(([label, id]) => (
            <Link key={id} href={`/#${id}`} onClick={() => setMenu(false)}>
              {label}
              <ArrowUpRight />
            </Link>
          ))}
        </nav>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <p className="mono">
          Gujrat, Pakistan · <Clock />
        </p>
      </dialog>
      <Command.Dialog
        open={palette}
        onOpenChange={setPalette}
        label="Jump to a section or project"
        className="command-dialog"
      >
        <div className="command-search">
          <Search size={20} />
          <Command.Input placeholder="Where would you like to go?" />
          <button
            className="icon-button"
            aria-label="Close search"
            onClick={() => setPalette(false)}
          >
            <X size={18} />
          </button>
        </div>
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Explore">
            {[...links, ["Contact", "contact"]].map(([label, id]) => (
              <Command.Item key={id} onSelect={() => jump(`/#${id}`)}>
                {label}
                <ArrowUpRight size={16} />
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Projects">
            {projects.map((p) => (
              <Command.Item
                key={p.slug}
                onSelect={() => jump(`/work/${p.slug}/`)}
              >
                {p.title}
                <span>{p.status}</span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
        <div className="command-footer mono">
          ↑ ↓ navigate · enter to open · esc to close
        </div>
      </Command.Dialog>
    </>
  );
}
export function MotionEngine() {
  const pathname = usePathname();
  useEffect(() => {
    let cleanup = () => {},
      cancelled = false;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("lenis"),
    ]).then(([{ gsap }, { ScrollTrigger }, { default: Lenis }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({
        anchors: true,
        lerp: 0.09,
        prevent: (node) => !!node.closest("[cmdk-list], dialog"),
      });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      const context = gsap.context(() => {
        gsap.utils
          .toArray<HTMLElement>("[data-reveal]")
          .forEach((el) =>
            gsap.fromTo(
              el,
              { y: 25 },
              {
                y: 0,
                duration: 0.85,
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 92%", once: true },
              },
            ),
          );
        gsap.utils
          .toArray<HTMLElement>(".bio-word")
          .forEach((word, i) =>
            gsap.fromTo(
              word,
              { opacity: 0.3 },
              {
                opacity: 1,
                scrollTrigger: {
                  trigger: ".about-copy",
                  start: `top ${80 - i * 0.8}%`,
                  end: `top ${65 - i * 0.8}%`,
                  scrub: true,
                },
              },
            ),
          );
      });
      cleanup = () => {
        context.revert();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [pathname]);
  return null;
}
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      !matchMedia("(pointer:fine) and (prefers-reduced-motion: no-preference)")
        .matches
    )
      return;
    const el = ref.current!;
    let x = -100,
      y = -100,
      tx = -100,
      ty = -100,
      frame = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = e.target as HTMLElement;
      const label =
        target.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
      el.dataset.label = label || "";
      el.classList.toggle("cursor-link", !!target.closest("a,button"));
      el.classList.toggle("cursor-input", !!target.closest("input,textarea"));
      el.classList.add("visible");
    };
    const down = () => el.classList.add("pressed"),
      up = () => el.classList.remove("pressed");
    const leave = () => el.classList.remove("visible");
    const draw = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px,${y}px,0)`;
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);
  return <div className="cursor" ref={ref} aria-hidden="true" />;
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <Link href="/" className="identity">
            <span className="monogram">BH</span>
            <span>
              Built with care.<small>From Gujrat, Pakistan.</small>
            </span>
          </Link>
          <div className="footer-links">
            <a href={site.github} target="_blank" rel="noreferrer">
              <Code2 size={16} />
              GitHub ↗
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href={asset(site.resume)} target="_blank" rel="noreferrer">
              <FileDown size={16} />
              Résumé ↗
            </a>
          </div>
          <a href="#main" className="icon-button" aria-label="Back to top">
            <ArrowUp />
          </a>
        </div>
        <div className="footer-wordmark">
          Bilal Hassan<span>®</span>
        </div>
        <div className="footer-bottom mono">
          <span>© {new Date().getFullYear()} Bilal Hassan</span>
          <span>Thoughtful interfaces. Reliable systems.</span>
          <Clock />
        </div>
      </div>
    </footer>
  );
}
