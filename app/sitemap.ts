import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { locales } from "@/lib/i18n";

export const dynamic = "force-static";

const pages = [
  "",
  "/services",
  "/realisations",
  "/process",
  "/a-propos",
  "/contact",
  "/mentions-legales",
  "/politique-confidentialite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${siteConfig.url}/${locale}${page}`,
      changeFrequency: page === "" ? "weekly" : "monthly",
      priority: page === "" ? 1 : 0.7,
      lastModified: new Date(),
    })),
  );
}
