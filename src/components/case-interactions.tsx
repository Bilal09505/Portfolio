"use client";
import { useEffect, useRef, useState } from "react";
import { X, Maximize2 } from "lucide-react";
import { asset } from "@/data/site";
export function CaseNavigation() {
  const [active, setActive] = useState("problem");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-15% 0px -55% 0px" },
    );
    document
      .querySelectorAll(".case-content section")
      .forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return (
    <aside className="case-toc" aria-label="On this page">
      <span className="mono">Inside the project</span>
      {[
        ["problem", "The problem"],
        ["built", "What I built"],
        ["flow", "How it works"],
        ["engineering", "Engineering notes"],
        ["technology", "The stack"],
      ].map(([id, label]) => (
        <a href={`#${id}`} aria-current={active === id} key={id}>
          {label}
        </a>
      ))}
    </aside>
  );
}
export function Gallery({ image, title }: { image: string; title: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        className="gallery-button"
        onClick={() => ref.current?.showModal()}
      >
        <img src={asset(image)} alt={`${title} interface`} loading="lazy" />
        <span>
          <Maximize2 size={13} style={{ display: "inline", marginRight: 7 }} />
          Open screenshot
        </span>
      </button>
      <dialog className="lightbox" ref={ref}>
        <button
          className="icon-button"
          aria-label="Close screenshot"
          onClick={() => ref.current?.close()}
        >
          <X />
        </button>
        <img src={asset(image)} alt={`${title} interface enlarged`} />
      </dialog>
    </>
  );
}
