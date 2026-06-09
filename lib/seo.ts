import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import type { BlogPost, FaqItem } from "@/types/content";
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
  skipDefaultImage?: boolean;
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
    skipDefaultImage,
  } = params;
  const canonicalUrl = absoluteUrl(path);
  const altLocale = locale === "fr" ? "en" : "fr";
  const altPath = path.replace(`/${locale}`, `/${altLocale}`);
  // skipDefaultImage : laisser la convention `opengraph-image` fournir le visuel
  // (évite un doublon og:image).
  const socialImage = skipDefaultImage ? undefined : absoluteUrl(image ?? siteConfig.defaultOgImage);
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
        "x-default": path.replace(`/${locale}`, "/fr"),
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

  const sameAs = siteConfig.social.filter(hasSiteValue);

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
    image: absoluteUrl(siteConfig.defaultOgImage),
    sameAs: sameAs.length > 0 ? sameAs : undefined,
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

export function articleSchema(params: { post: BlogPost; locale: Locale; path: string }) {
  const { post, locale, path } = params;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: absoluteUrl(path),
    image: absoluteUrl(post.image ?? siteConfig.defaultOgImage),
    keywords: post.keywords?.join(", "),
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.logo),
      },
    },
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

