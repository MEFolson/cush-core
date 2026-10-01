import { site } from "@/lib/site";

const OG_IMAGE = "/og.jpg";

export type PageMetaInput = {
  title: string;
  description: string;
};

/** Per-route title/description + Open Graph basics for TanStack Router head. */
export function pageMeta({ title, description }: PageMetaInput) {
  const fullTitle = title.includes(site.name) ? title : `${title} · ${site.name}`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: site.name },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
    ],
  };
}
