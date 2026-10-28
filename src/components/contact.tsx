"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Copy, LoaderCircle } from "lucide-react";
import { site } from "@/data/site";
import { Clock, Orb } from "./shell";
import { sendContact } from "@/lib/email";
export function Contact() {
  const [copied, setCopied] = useState(false),
    [service, setService] = useState("Full stack app"),
    [status, setStatus] = useState<
      "idle" | "sending" | "success" | "error"
    >("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;
    const name = String(data.get("name")).trim(),
      email = String(data.get("email")).trim(),
      message = String(data.get("message")).trim();
    if (!name || !message) return;
    setStatus("sending");
    try {
      await sendContact({ name, email, subject: service, message });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };
  return (
    <section id="contact" className="contact">
      <div className="contact-ribbon" aria-hidden="true">
        <div>
          Got a project? <Orb /> Let’s talk <Orb /> Let’s build something{" "}
          <Orb /> Got a project? <Orb /> Let’s talk <Orb />
        </div>
      </div>
      <div className="container contact-grid">
        <div data-reveal>
          <span className="eyebrow">
            <Orb /> A good place to start
          </span>
          <h2>
            Have something
            <br />
            in <span className="gradient-text">mind?</span>
          </h2>
          <p>
            I’m open to full-time opportunities and freelance projects. Let’s
            talk about what you’re building.
          </p>
          <div className="email-pill">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <button
              className="icon-button"
              onClick={copy}
              aria-label={copied ? "Email copied" : "Copy email"}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
          <div className="contact-location mono">
            <span className="live-dot" />
            {site.location} · <Clock />
          </div>
        </div>
        <div className="contact-form-card" data-reveal>
          {status === "success" ? (
            <div className="success-screen" role="status">
              <Check size={40} />
              <h3>Message received.</h3>
              <p>Thanks for reaching out. I’ll get back to you by email.</p>
              <button className="button" onClick={() => setStatus("idle")}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h3>Tell me about your project.</h3>
              <fieldset>
                <legend className="mono">What do you need?</legend>
                <div className="service-options">
                  {[
                    "Full stack app",
                    "Frontend",
                    "API & backend",
                    "Something else",
                  ].map((s) => (
                    <button
                      type="button"
                      key={s}
                      aria-pressed={service === s}
                      onClick={() => setService(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="form-row">
                <label>
                  Your name
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="Alex"
                    required
                    maxLength={100}
                  />
                </label>
                <label>
                  Email address
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="alex@company.com"
                    required
                    maxLength={254}
                  />
                </label>
              </div>
              <label>
                A little about your idea
                <textarea
                  name="message"
                  rows={3}
                  placeholder="What would you like to build?"
                  required
                  maxLength={4000}
                />
              </label>
              <div className="honeypot" aria-hidden="true">
                <label>
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <button
                className="button gradient-button"
                disabled={status === "sending"}
                type="submit"
              >
                {status === "sending" ? (
                  <>
                    <LoaderCircle className="spin" size={18} />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowUpRight size={19} />
                  </>
                )}
              </button>
              <p className="form-note" role="status">
                {status === "error" ? (
                  <>
                    Couldn’t send. Please{" "}
                    <a href={`mailto:${site.email}`}>email me directly</a>.
                  </>
                ) : (
                  "Your message goes directly to my inbox."
                )}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
