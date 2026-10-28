"use client";
import { useEffect, useRef, useState } from "react";
import { stack } from "@/data/stack";
import { asset } from "@/data/site";
import { RotateCcw } from "lucide-react";
const tools = stack
  .flatMap((s) => s.tools)
  .filter((t, i, a) => a.indexOf(t) === i);
const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const points = tools.map((tool, i) => {
  const y = 1 - (2 * (i + 0.5)) / tools.length;
  const radius = Math.sqrt(1 - y * y);
  const angle = i * Math.PI * (3 - Math.sqrt(5));
  return { tool, x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius };
});
export function StackSphere({ active }: { active: number }) {
  const ref = useRef<HTMLDivElement>(null),
    tiles = useRef<(HTMLButtonElement | null)[]>([]),
    rotation = useRef({ x: -0.12, y: 0.5 }),
    drag = useRef<{ x: number; y: number } | null>(null);
  const [hover, setHover] = useState<string | null>(null),
    [paused, setPaused] = useState(false);
  useEffect(() => {
    let frame = 0,
      last = 0,
      visible = true;
    const el = ref.current!;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(el);
    const render = (time: number) => {
      frame = requestAnimationFrame(render);
      if (!visible || document.hidden) {
        last = time;
        return;
      }
      if (time - last < 32) return;
      const delta = Math.min(time - last, 50);
      last = time;
      if (!drag.current && !paused && !media.matches)
        rotation.current.y += delta * 0.00009;
      const ry = rotation.current.y,
        rx = rotation.current.x;
      const projected = points.map((p) => {
        const x = p.x * Math.cos(ry) + p.z * Math.sin(ry),
          z1 = -p.x * Math.sin(ry) + p.z * Math.cos(ry),
          y = p.y * Math.cos(rx) - z1 * Math.sin(rx),
          z = p.y * Math.sin(rx) + z1 * Math.cos(rx);
        const depth = (z + 1) / 2;
        return {
          x: 50 + x * 36,
          y: 47 + y * 35,
          depth,
          scale: 0.72 + depth * 0.3,
        };
      });
      // Keep projected cards legible even when front/back points align.
      const cardSize = tiles.current[0]?.offsetWidth || 52;
      const sphereWidth = el.clientWidth;
      for (let pass = 0; pass < 24; pass++)
        for (let i = 0; i < projected.length; i++)
          for (let j = i + 1; j < projected.length; j++) {
            const a = projected[i],
              b = projected[j];
            const dx = b.x - a.x,
              dy = b.y - a.y;
            const minimum =
              (((cardSize * (a.scale + b.scale)) / 2 + 8) / sphereWidth) *
              100;
            const overlapX = minimum - Math.abs(dx),
              overlapY = minimum - Math.abs(dy);
            if (overlapX > 0 && overlapY > 0) {
              if (overlapX < overlapY) {
                const push = ((overlapX + 0.05) / 2) * (Math.sign(dx) || 1);
                a.x -= push;
                b.x += push;
              } else {
                const push = ((overlapY + 0.05) / 2) * (Math.sign(dy) || 1);
                a.y -= push;
                b.y += push;
              }
            }
          }
      projected.forEach(({ x, y, depth, scale }, i) => {
        const tile = tiles.current[i];
        if (!tile) return;
        tile.style.left = `${Math.max(9, Math.min(91, x))}%`;
        tile.style.top = `${Math.max(9, Math.min(88, y))}%`;
        tile.style.transform = `translate(-50%,-50%) scale(${scale})`;
        tile.style.opacity = String(0.32 + depth * 0.68);
        tile.style.zIndex = String(Math.round(depth * 30));
      });
    };
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [paused]);
  const activeTools = active >= 0 ? stack[active].tools : [];
  return (
    <div className="sphere-panel">
      <div
        ref={ref}
        className="logo-sphere"
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest("button")) return;
          drag.current = { x: e.clientX, y: e.clientY };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          rotation.current.y += (e.clientX - drag.current.x) * 0.008;
          rotation.current.x = Math.max(
            -0.7,
            Math.min(
              0.7,
              rotation.current.x + (e.clientY - drag.current.y) * 0.006,
            ),
          );
          drag.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
        aria-label="Interactive sphere of technology logos"
      >
        <div className="sphere-core" />
        <div className="sphere-equator" />
        {points.map((p, i) => (
          <button
            type="button"
            ref={(el) => {
              tiles.current[i] = el;
            }}
            className={`sphere-tile ${activeTools.includes(p.tool) ? "highlight" : ""}`}
            key={p.tool}
            style={{ left: `${50 + p.x * 36}%`, top: `${47 + p.y * 35}%` }}
            aria-label={p.tool}
            onPointerEnter={() => {
              setHover(p.tool);
              setPaused(true);
            }}
            onPointerLeave={() => {
              setHover(null);
              setPaused(false);
            }}
            onFocus={() => {
              setHover(p.tool);
              setPaused(true);
            }}
            onBlur={() => {
              setHover(null);
              setPaused(false);
            }}
            onClick={() => {
              setHover(p.tool);
              setPaused(true);
            }}
          >
            <img
              src={asset(`/images/tech/${slug(p.tool)}.svg`)}
              width="32"
              height="32"
              alt=""
              draggable={false}
            />
          </button>
        ))}
      </div>
      <div className="sphere-controls">
        <span className="mono" aria-live="polite">
          {hover || "Drag the sphere · explore the toolkit"}
        </span>
        <button
          type="button"
          className="icon-button"
          aria-label="Reset logo sphere"
          onClick={() => {
            rotation.current = { x: -0.12, y: 0.5 };
            setHover(null);
            setPaused(false);
          }}
        >
          <RotateCcw size={15} />
        </button>
      </div>
    </div>
  );
}
