"use client";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/data/site";
import * as THREE from "three";
export default function Globe() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }
    const scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.z = 3.5;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    const group = new THREE.Group();
    scene.add(group);
    group.rotation.y = -1.1;
    group.rotation.z = -0.14;
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.983, 48, 48),
      new THREE.MeshBasicMaterial({
        color: "#ece9f2",
        transparent: true,
        opacity: 0.85,
      }),
    );
    group.add(core);
    const grid = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 18),
      new THREE.MeshBasicMaterial({
        color: "#b8b0cd",
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      }),
    );
    group.add(grid);
    const position = (lat: number, lon: number, r = 1.012) => {
      const p = (lat * Math.PI) / 180,
        t = (lon * Math.PI) / 180;
      return new THREE.Vector3(
        r * Math.cos(p) * Math.cos(t),
        r * Math.sin(p),
        r * Math.cos(p) * Math.sin(t),
      );
    };
    const pin = new THREE.Mesh(
      new THREE.SphereGeometry(0.025, 16, 16),
      new THREE.MeshBasicMaterial({ color: "#8b5cf6" }),
    );
    pin.position.copy(position(32.57, 74.08, 1.025));
    group.add(pin);
    let disposed = false;
    const abort = new AbortController();
    fetch(asset("/media/globe.json"), { signal: abort.signal })
      .then((r) => r.json())
      .then((dots: number[][]) => {
        if (disposed) return;
        const geometry = new THREE.BufferGeometry().setFromPoints(
          dots.map(([lat, lon]) => position(lat, lon)),
        );
        group.add(
          new THREE.Points(
            geometry,
            new THREE.PointsMaterial({
              color: "#81769d",
              size: 0.012,
              transparent: true,
              opacity: 0.9,
            }),
          ),
        );
        setReady(true);
      })
      .catch(() => {});
    let dragging = false,
      prev = 0,
      frame = 0,
      visible = true;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const resize = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const down = (e: PointerEvent) => {
      dragging = true;
      prev = e.clientX;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (dragging) {
        group.rotation.y += (e.clientX - prev) * 0.007;
        prev = e.clientX;
      }
    };
    const up = () => {
      dragging = false;
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);
    let last = 0;
    const render = (time: number) => {
      frame = requestAnimationFrame(render);
      if (!visible || document.hidden) return;
      if (!media.matches && !dragging)
        group.rotation.y += Math.min(time - last, 50) * 0.000035;
      last = time;
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(render);
    return () => {
      disposed = true;
      abort.abort();
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry.dispose();
          const materials = Array.isArray(obj.material)
            ? obj.material
            : [obj.material];
          materials.forEach((m) => m.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return (
    <div className="globe-scene">
      <div className="globe-halo" />
      <div
        ref={ref}
        className="globe-canvas"
        role="img"
        aria-label="Interactive dotted globe. Bilal is based in Gujrat, Pakistan. Drag to rotate."
      />
      {!ready && <div className="globe-fallback" aria-hidden="true" />}
      <div className="globe-tag">
        <span className="live-dot" />
        Gujrat, Pakistan <span>↗</span>
      </div>
      <span className="globe-caption mono">
        A local perspective. A global mindset.
      </span>
    </div>
  );
}
