"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const ANALYTICS_SCRIPT_ID = "pp-ga4-script";

function deleteCookie(name: string, domain?: string) {
  const domainSegment = domain ? ` domain=${domain};` : "";
  document.cookie = `${name}=; Max-Age=0; path=/;${domainSegment} SameSite=Lax`;
}

function clearAnalyticsCookies(measurementId: string) {
  window[`ga-disable-${measurementId}`] = true;

  if (window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: "denied",
    });
  }

  const hostname = window.location.hostname.replace(/^www\./, "");
  const domains = [undefined, hostname, `.${hostname}`];
  const cookieNames = document.cookie
    .split(";")
    .map((chunk) => chunk.trim().split("=")[0])
    .filter((name) => name === "_ga" || name === "_gid" || name === "_gat" || name.startsWith("_ga_"));

  for (const cookieName of cookieNames) {
    for (const domain of domains) {
      deleteCookie(cookieName, domain);
    }
  }
}

function ensureAnalyticsLoaded(measurementId: string) {
  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
  }

  window[`ga-disable-${measurementId}`] = false;
  window.gtag("consent", "update", {
    analytics_storage: "granted",
  });
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true });

  if (document.getElementById(ANALYTICS_SCRIPT_ID)) {
    return;
  }

  const script = document.createElement("script");
  script.id = ANALYTICS_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

type AnalyticsLoaderProps = {
  measurementId?: string;
  enabled: boolean;
};

export function AnalyticsLoader({ measurementId, enabled }: AnalyticsLoaderProps) {
  useEffect(() => {
    if (!measurementId) {
      return;
    }

    if (enabled) {
      ensureAnalyticsLoaded(measurementId);
      return;
    }

    clearAnalyticsCookies(measurementId);
  }, [enabled, measurementId]);

  return null;
}
