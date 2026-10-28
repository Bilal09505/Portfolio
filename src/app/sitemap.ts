import { site } from "@/data/site";
import { projects } from "@/data/projects";
export const dynamic = "force-static";
export default function sitemap() {
  return [
    { url: site.url + "/" },
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}/` })),
  ];
}
