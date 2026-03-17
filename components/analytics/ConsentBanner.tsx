"use client";

import { useEffect, useMemo, useState } from "react";
import { AnalyticsLoader } from "@/components/analytics/AnalyticsLoader";

const CONSENT_KEY = "pp_analytics_consent";
const DEFAULT_GA_MEASUREMENT_ID = "G-42P8LQBHQC";

type ConsentMode = "accepted" | "declined" | null;

type ConsentBannerProps = {
  locale: "fr" | "en";
};

export function ConsentBanner({ locale }: ConsentBannerProps) {
  const [consent, setConsent] = useState<ConsentMode>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY);

    if (stored === "accepted" || stored === "declined") {
      const timeoutId = window.setTimeout(() => {
        setConsent(stored);
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }
  }, []);

  const copy = useMemo(() => {
    if (locale === "fr") {
      return {
        text: "Nous utilisons des mesures anonymisees pour ameliorer l'experience.",
        accept: "Accepter",
        decline: "Refuser",
      };
    }

    return {
      text: "We use anonymized analytics to improve your experience.",
      accept: "Accept",
      decline: "Decline",
    };
  }, [locale]);

  const setChoice = (value: Exclude<ConsentMode, null>) => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  };

  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? DEFAULT_GA_MEASUREMENT_ID;
  const analyticsEnabled = consent === "accepted";

  return (
    <>
      <AnalyticsLoader measurementId={measurementId} enabled={analyticsEnabled} />
      {consent !== null ? null : (
        <aside className="fixed bottom-4 left-4 right-4 z-[90] mx-auto max-w-3xl rounded-2xl border border-white/20 bg-bg-soft/95 p-4 backdrop-blur-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-text-muted">{copy.text}</p>
            <div className="flex gap-2">
              <button type="button" className="btn-secondary text-sm" onClick={() => setChoice("declined")}>
                {copy.decline}
              </button>
              <button type="button" className="btn-primary text-sm" onClick={() => setChoice("accepted")}>
                {copy.accept}
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

