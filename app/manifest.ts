import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/fr",
    scope: "/",
    display: "standalone",
    background_color: "#0e0f15",
    theme_color: "#0e0f15",
    lang: "fr",
    icons: [
      { src: "/assets/img/icone.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/assets/img/icone.png", sizes: "181x200", type: "image/png" },
    ],
  };
}
