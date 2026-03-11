import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export function absoluteUrl(path = ""): string {
  return `${siteConfig.url}${path}`;
}

export function buildMetadata(params: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
}): Metadata {
  const { locale, title, description, path } = params;
  const canonicalUrl = absoluteUrl(path);
  const altLocale = locale === "fr" ? "en" : "fr";
  const altPath = path.replace(`/${locale}`, `/${altLocale}`);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: path.replace(`/${locale}`, "/fr"),
        en: path.replace(`/${locale}`, "/en"),
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale,
      url: canonicalUrl,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    other: {
      "x-alt-url": absoluteUrl(altPath),
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    areaServed: "FR",
    serviceType: [
      "Developpement web",
      "Developpement applicatif",
      "Automatisation",
      "UX/UI design",
    ],
  };
}

