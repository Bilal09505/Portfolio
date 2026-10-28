import Home from "@/components/home";
import { site } from "@/data/site";
export const metadata = { alternates: { canonical: site.url + "/" } };
export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: site.name,
            jobTitle: site.role,
            url: site.url,
            sameAs: [site.github, site.linkedin],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Gujrat",
              addressCountry: "PK",
            },
          }),
        }}
      />
      <Home />
    </>
  );
}
