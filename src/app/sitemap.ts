import type { MetadataRoute } from "next";

import { BUSINESS_SLUGS } from "@/content/business-pages";
import { SKYLINE } from "@/content/company";
import { absoluteUrl } from "@/lib/seo";

/**
 * Every page, with its main photos so they can appear in image search. lastModified is left out:
 * Google only trusts it when it changes exactly when the page does.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const photosOf = (href: string) =>
    SKYLINE.filter((item) => href === "/" || item.href === href).map((item) => absoluteUrl(item.feature.src.src));

  return [
    { url: absoluteUrl("/"), images: photosOf("/") },
    ...BUSINESS_SLUGS.map((slug) => ({ url: absoluteUrl(`/${slug}`), images: photosOf(`#${slug}`) })),
  ];
}
