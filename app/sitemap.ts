import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { locales } from "@/lib/i18n";
import { getBlogPosts } from "@/content/blog-content";

export const dynamic = "force-static";

const pages = [
  "",
  "/services",
  "/realisations",
  "/process",
  "/a-propos",
  "/blog",
  "/contact",
  "/mentions-legales",
  "/politique-confidentialite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${siteConfig.url}/${locale}${page}`,
      changeFrequency: page === "" || page === "/blog" ? "weekly" : "monthly",
      priority: page === "" ? 1 : 0.7,
      lastModified: new Date(),
    })),
  );

  const blogEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getBlogPosts(locale).map((post) => ({
      url: `${siteConfig.url}/${locale}/blog/${post.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
      lastModified: new Date(`${post.date}T00:00:00Z`),
    })),
  );

  return [...staticEntries, ...blogEntries];
}
