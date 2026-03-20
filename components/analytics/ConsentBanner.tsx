"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { AnalyticsLoader } from "@/components/analytics/AnalyticsLoader";
import { localizedPath } from "@/lib/i18n";

const CONSENT_KEY = "pp_analytics_consent";
const CONSENT_EVENT = "pp-analytics-consent-change";

type ConsentMode = "accepted" | "declined" | null;

type ConsentBannerProps = {
  locale: "fr" | "en";
};

function getStoredConsent(): ConsentMode {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(CONSENT_KEY);
  return stored === "accepted" || stored === "declined" ? stored : null;
}

function subscribeToConsent(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleChange = () => {
    onStoreChange();
  };

  window.addEventListener("storage", handleChange);
  window.addEventListener(CONSENT_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(CONSENT_EVENT, handleChange);
  };
}

function subscribeToHydration() {
  return () => {};
}

export function ConsentBanner({ locale }: ConsentBannerProps) {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || undefined;
  const isHydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const consent = useSyncExternalStore(subscribeToConsent, getStoredConsent, () => null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const copy = useMemo(() => {
    if (locale === "fr") {
      return {
        title: "Préférences cookies",
        text:
          "Pixel Prestige utilise uniquement des cookies de mesure d'audience si vous les acceptez. Vous pouvez revenir sur ce choix à tout moment.",
        manage: "Gérer les cookies",
        accept: "Accepter",
        decline: "Refuser",
        close: "Fermer",
        privacy: "Consulter la politique de confidentialité",
        accepted: "Consentement enregistré : analytics activés.",
        declined: "Consentement enregistré : analytics désactivés.",
        pending: "Aucun consentement enregistré pour le moment.",
      };
    }

    return {
      title: "Cookie preferences",
      text:
        "Pixel Prestige only uses analytics cookies if you accept them. You can change this choice at any time.",
      manage: "Cookie settings",
      accept: "Accept",
      decline: "Decline",
      close: "Close",
      privacy: "View the privacy policy",
      accepted: "Saved choice: analytics enabled.",
      declined: "Saved choice: analytics disabled.",
      pending: "No consent choice has been saved yet.",
    };
  }, [locale]);

  if (!measurementId || !isHydrated) {
    return null;
  }

  const setChoice = (value: Exclude<ConsentMode, null>) => {
    window.localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setIsSettingsOpen(false);
  };

  const statusText = consent === "accepted" ? copy.accepted : consent === "declined" ? copy.declined : copy.pending;
  const analyticsEnabled = consent === "accepted";
  const canClose = consent !== null;
  const isOpen = consent === null || isSettingsOpen;

  return (
    <>
      <AnalyticsLoader measurementId={measurementId} enabled={analyticsEnabled} />

      {!isOpen && canClose ? (
        <button
          type="button"
          className="fixed bottom-4 right-4 z-[89] rounded-full border border-border-strong bg-surface-strong px-4 py-2 text-sm text-text backdrop-blur-xl transition-colors hover:border-brand/60"
          onClick={() => setIsSettingsOpen(true)}
        >
          {copy.manage}
        </button>
      ) : null}

      {isOpen ? (
        <aside className="fixed bottom-4 left-4 right-4 z-[90] mx-auto max-w-3xl rounded-2xl border border-border-strong bg-surface-strong p-4 backdrop-blur-xl">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-text">{copy.title}</p>
                <p className="text-sm text-text-muted">{copy.text}</p>
                <p className="text-xs text-text-muted">{statusText}</p>
                <Link href={localizedPath(locale, "/politique-confidentialite")} className="theme-link inline-flex text-sm">
                  {copy.privacy}
                </Link>
              </div>
              {canClose ? (
                <button
                  type="button"
                  className="text-sm text-text-muted transition-colors hover:text-text"
                  onClick={() => setIsSettingsOpen(false)}
                >
                  {copy.close}
                </button>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-secondary text-sm" onClick={() => setChoice("declined")}>
                {copy.decline}
              </button>
              <button type="button" className="btn-primary text-sm" onClick={() => setChoice("accepted")}>
                {copy.accept}
              </button>
            </div>
          </div>
        </aside>
      ) : null}
    </>
  );
}
