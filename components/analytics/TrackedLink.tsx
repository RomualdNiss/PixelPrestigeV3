"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  location: string; // d'où vient le clic (ex. "home_final_cta")
  eventName?: string; // défaut: contact_click
  external?: boolean; // true pour mailto / liens hors Next router
};

// Lien qui émet un événement GA4 au clic (no-op si analytics désactivé).
// Rendu utilisable depuis des Server Components.
export function TrackedLink({
  href,
  children,
  className,
  location,
  eventName = "contact_click",
  external = false,
}: TrackedLinkProps) {
  const handleClick = () => trackEvent(eventName, { location });

  if (external) {
    return (
      <a href={href} className={className} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
