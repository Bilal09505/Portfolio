"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { locations } from "@/data/locations";
import { asset } from "@/data/site";
import { Orb } from "./shell";
const point = (lat: number, lon: number) => ({
  x: ((lon + 180) / 360) * 1000,
  y: ((90 - lat) / 180) * 500,
});
export function AvailabilityMap() {
  const [selected, setSelected] = useState<string>("pk");
  const [times, setTimes] = useState<Record<string, string>>({});
  useEffect(() => {
    const tick = () =>
      setTimes(
        Object.fromEntries(
          locations.map((l) => [
            l.code,
            new Intl.DateTimeFormat("en-GB", {
              timeZone: l.timezone,
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date()),
          ]),
        ),
      );
    tick();
    const timer = setInterval(tick, 30000);
    return () => clearInterval(timer);
  }, []);
  const home = point(locations[0].lat, locations[0].lon);
  return (
    <section className="section availability-section" id="availability">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              <Orb /> Across time zones
            </span>
            <h2>
              Based in Pakistan.
              <br />
              <span className="muted">Open to what’s next.</span>
            </h2>
          </div>
          <p>
            Available for remote opportunities in Pakistan, the United Kingdom
            and the UAE. Good collaboration travels well.
          </p>
        </div>
        <div className="availability-card">
          <div className="world-map">
            <img
              src={asset("/images/world-map.svg")}
              width="1000"
              height="500"
              alt="Dotted world map highlighting remote availability in Pakistan, the United Kingdom and the United Arab Emirates"
              loading="lazy"
            />
            <svg
              viewBox="0 0 1000 500"
              className="map-connections"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="route-gradient">
                  <stop stopColor="#8dcce8" />
                  <stop offset=".5" stopColor="#af8ade" />
                  <stop offset="1" stopColor="#dba6bd" />
                </linearGradient>
              </defs>
              {locations.slice(1).map((l) => {
                const p = point(l.lat, l.lon);
                return (
                  <path
                    className={`map-route ${selected === l.code ? "selected" : ""}`}
                    key={l.code}
                    d={`M${home.x},${home.y} Q${(home.x + p.x) / 2},${Math.min(home.y, p.y) - 80} ${p.x},${p.y}`}
                    fill="none"
                    stroke="url(#route-gradient)"
                    strokeWidth="2"
                  />
                );
              })}
              {locations.map((l) => {
                const p = point(l.lat, l.lon);
                return (
                  <g key={l.code}>
                    <circle
                      className="map-pulse"
                      cx={p.x}
                      cy={p.y}
                      r="11"
                      fill="#aa8dc5"
                      opacity=".2"
                    />
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="4.5"
                      fill={selected === l.code ? "#9f71cb" : "#7f7b91"}
                      stroke="white"
                      strokeWidth="2"
                    />
                  </g>
                );
              })}
            </svg>
            {locations.map((l) => {
              const p = point(l.lat, l.lon);
              return (
                <button
                  key={l.code}
                  className={`map-label map-label-${l.code} ${selected === l.code ? "selected" : ""}`}
                  style={{ left: `${p.x / 10}%`, top: `${p.y / 5}%` }}
                  onClick={() => setSelected(l.code)}
                  aria-label={`Show ${l.name} availability`}
                  aria-pressed={selected === l.code}
                >
                  <img
                    src={asset(`/images/flags/${l.code}.svg`)}
                    alt=""
                    width="20"
                    height="14"
                  />
                  {l.code === "gb"
                    ? "UK"
                    : l.code === "ae"
                      ? "UAE"
                      : "Pakistan"}
                </button>
              );
            })}
            <span className="map-footnote mono">
              Remote availability · not a client-location map
            </span>
          </div>
          <div className="location-cards">
            {locations.map((l) => (
              <button
                key={l.code}
                className={`location-card ${selected === l.code ? "selected" : ""}`}
                onClick={() => setSelected(l.code)}
                aria-pressed={selected === l.code}
              >
                <span className="location-card-top">
                  <img
                    src={asset(`/images/flags/${l.code}.svg`)}
                    width="30"
                    height="22"
                    alt=""
                  />
                  <span className="mono">{times[l.code] || "Local time"}</span>
                </span>
                <strong>{l.name}</strong>
                <span>{l.label}</span>
                <span className="location-city mono">
                  {l.city}{" "}
                  {l.code === "pk"
                    ? "· PKT"
                    : l.code === "ae"
                      ? "· GST"
                      : "· UK local time"}
                </span>
              </button>
            ))}
          </div>
          <div className="map-bottom">
            <span>
              <span className="live-dot" />
              One conversation can start something good.
            </span>
            <a href="#contact" className="text-button">
              Let’s connect
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
