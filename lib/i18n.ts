export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleStaticParams(): Array<{ locale: Locale }> {
  return locales.map((locale) => ({ locale }));
}

export function localizedPath(locale: Locale, href: string): string {
  if (!href.startsWith("/")) {
    return `/${locale}/${href}`;
  }

  if (href === "/") {
    return `/${locale}`;
  }

  return `/${locale}${href}`;
}

