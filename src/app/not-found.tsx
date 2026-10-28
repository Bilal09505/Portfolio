import Link from "next/link";
export const metadata = { title: "Page not found" };
export default function NotFound() {
  return (
    <section className="container not-found">
      <span className="eyebrow">A little off the map</span>
      <h1>
        Nothing here.
        <br />
        <span className="gradient-text">Plenty to explore.</span>
      </h1>
      <p>This page doesn’t exist. Let’s get you back to the work.</p>
      <Link href="/" className="button">
        Back to home ↗
      </Link>
    </section>
  );
}
