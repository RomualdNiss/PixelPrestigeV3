import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import type { FaqItem } from "@/types/content";
import { hasSiteValue, siteConfig } from "@/lib/site";

export function absoluteUrl(path = ""): string {
  return `${siteConfig.url}${path}`;
}

export function buildMetadata(params: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  keywords?: string[];
  openGraphTitle?: string;
  openGraphDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  image?: string;
}): Metadata {
  const {
    locale,
    title,
    description,
    path,
    absoluteTitle,
    keywords,
    openGraphTitle,
    openGraphDescription,
    twitterTitle,
    twitterDescription,
    image,
  } = params;
  const canonicalUrl = absoluteUrl(path);
  const altLocale = locale === "fr" ? "en" : "fr";
  const altPath = path.replace(`/${locale}`, `/${altLocale}`);
  const socialImage = image ? absoluteUrl(image) : undefined;
  const localeCode = locale === "fr" ? "fr_FR" : "en_US";

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: path.replace(`/${locale}`, "/fr"),
        en: path.replace(`/${locale}`, "/en"),
      },
    },
    openGraph: {
      title: openGraphTitle ?? title,
      description: openGraphDescription ?? description,
      type: "website",
      locale: localeCode,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: socialImage ? [{ url: socialImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle ?? title,
      description: twitterDescription ?? description,
      images: socialImage ? [socialImage] : undefined,
    },
    other: {
      "x-alt-url": absoluteUrl(altPath),
    },
  };
}

export function organizationSchema() {
  const address = siteConfig.legal.address;
  const hasAddress =
    hasSiteValue(address.street) &&
    hasSiteValue(address.postalCode) &&
    hasSiteValue(address.city) &&
    hasSiteValue(address.country);

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    telephone: hasSiteValue(siteConfig.contact.phone) ? siteConfig.contact.phone : undefined,
    address: hasAddress
      ? {
          "@type": "PostalAddress",
          streetAddress: address.street,
          postalCode: address.postalCode,
          addressLocality: address.city,
          addressCountry: address.country,
        }
      : undefined,
    areaServed: "FR",
    serviceType: [
      "Développement web",
      "Développement applicatif",
      "Automatisation",
      "UX/UI design",
    ],
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

