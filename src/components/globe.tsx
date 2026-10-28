"use client";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/data/site";
import { locations } from "@/data/locations";
import * as THREE from "three";
export default function Globe() {
  const ref = useRef<HTMLDivElement>(null);
  const labels = useRef<(HTMLAnchorElement | null)[]>([]);
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
    group.rotation.y = -0.85;
    group.rotation.x = 0.18;
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.983, 48, 48),
      new THREE.MeshBasicMaterial({
        color: "#ece9f2",
        transparent: false,
      }),
    );
    group.add(core);
    const position = (lat: number, lon: number, r = 1.012) => {
      const p = (lat * Math.PI) / 180,
        t = (lon * Math.PI) / 180;
      return new THREE.Vector3(
        r * Math.cos(p) * Math.sin(t),
        r * Math.sin(p),
        r * Math.cos(p) * Math.cos(t),
      );
    };
    const pins = locations.map((location) => {
      const pin = new THREE.Mesh(
        new THREE.SphereGeometry(0.018, 16, 16),
        new THREE.MeshBasicMaterial({ color: "#8064ae" }),
      );
      pin.position.copy(position(location.lat, location.lon, 1.025));
      group.add(pin);
      return pin;
    });
    // Great-circle-style arcs express remote availability, not client history.
    const travelingDots: { curve: THREE.CatmullRomCurve3; mesh: THREE.Mesh }[] =
      [];
    locations.slice(1).forEach((destination, index) => {
      const start = position(locations[0].lat, locations[0].lon),
        end = position(destination.lat, destination.lon);
      const midpoint = start
        .clone()
        .add(end)
        .normalize()
        .multiplyScalar(index === 0 ? 1.25 : 1.12);
      const curve = new THREE.CatmullRomCurve3([start, midpoint, end]);
      group.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(curve.getPoints(60)),
          new THREE.LineBasicMaterial({
            color: index === 0 ? "#ab80cd" : "#75b8d9",
            transparent: true,
            opacity: 0.85,
          }),
        ),
      );
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.012, 12, 12),
        new THREE.MeshBasicMaterial({ color: "#c494e1" }),
      );
      group.add(mesh);
      travelingDots.push({ curve, mesh });
    });
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
    let offset = 0;
    const render = (time: number) => {
      frame = requestAnimationFrame(render);
      if (!visible || document.hidden) return;
      if (dragging) offset = group.rotation.y + 0.85;
      else if (!media.matches)
        group.rotation.y = -0.85 + offset + Math.sin(time * 0.00015) * 0.04;
      travelingDots.forEach(({ curve, mesh }, i) =>
        mesh.position.copy(
          curve.getPoint(media.matches ? 0.5 : (time * 0.00014 + i * 0.3) % 1),
        ),
      );
      group.updateMatrixWorld(true);
      pins.forEach((pin, i) => {
        const label = labels.current[i];
        if (!label) return;
        const world = pin.getWorldPosition(new THREE.Vector3());
        const facing = world.z > 0.1;
        const screen = world.clone().project(camera);
        label.style.left = `${(screen.x * 0.5 + 0.5) * 100}%`;
        label.style.top = `${(-screen.y * 0.5 + 0.5) * 100}%`;
        label.style.opacity = facing ? "1" : "0";
        label.style.pointerEvents = facing ? "auto" : "none";
        label.tabIndex = facing ? 0 : -1;
      });
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
        if (
          obj instanceof THREE.Mesh ||
          obj instanceof THREE.Points ||
          obj instanceof THREE.Line
        ) {
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
        aria-label="Interactive dotted globe showing Pakistan, the UK and UAE as remote availability locations. Drag to rotate."
      />
      {!ready && <div className="globe-fallback" aria-hidden="true" />}
      {locations.map((location, i) => (
        <a
          key={location.code}
          ref={(el) => {
            labels.current[i] = el;
          }}
          href="#availability"
          className={`globe-country globe-country-${location.code}`}
          aria-label={`${location.name}: ${location.label}`}
        >
          <img
            src={asset(`/images/flags/${location.code}.svg`)}
            width="18"
            height="12"
            alt=""
          />
          <span>
            {location.code === "ae"
              ? "UAE"
              : location.code === "gb"
                ? "United Kingdom"
                : "Pakistan"}
            <small>{location.label}</small>
          </span>
          <span>↗</span>
        </a>
      ))}
      <span className="globe-caption mono">
        Pakistan · UK · UAE / Remote availability
      </span>
    </div>
  );
}
