// Envoi d'événements GA4 sûr : no-op tant que `window.gtag` n'existe pas
// (analytics désactivé ou consentement non accordé). Le type global `window.gtag`
// est déclaré dans components/analytics/AnalyticsLoader.tsx.
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", name, params ?? {});
}
