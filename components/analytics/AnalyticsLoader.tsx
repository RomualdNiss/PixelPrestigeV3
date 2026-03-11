"use client";

import Script from "next/script";

type AnalyticsLoaderProps = {
  measurementId?: string;
  enabled: boolean;
};

export function AnalyticsLoader({ measurementId, enabled }: AnalyticsLoaderProps) {
  if (!enabled || !measurementId) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="ga4-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}

