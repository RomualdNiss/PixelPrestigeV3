import type { Locale } from "@/lib/i18n";

// Formate une date ISO (ex. "2026-06-02") en date lisible selon la locale.
// Utilisé uniquement dans des Server Components → exécuté au build (export statique).
export function formatPostDate(iso: string, locale: Locale): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
