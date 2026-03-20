"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  locale: Locale;
  label: string;
  onNavigate?: () => void;
};

function toLocalePath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${targetLocale}`;
  }

  if (locales.includes(segments[0] as Locale)) {
    segments[0] = targetLocale;
  } else {
    segments.unshift(targetLocale);
  }

  return `/${segments.join("/")}`;
}

export function LocaleSwitcher({ locale, label, onNavigate }: LocaleSwitcherProps) {
  const pathname = usePathname() || `/${locale}`;

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-text-muted">
      <span>{label}</span>
      {locales.map((item) => (
        <Link
          key={item}
          href={toLocalePath(pathname, item)}
          onClick={onNavigate}
          className={cn(
            "rounded-full border px-2 py-1 transition-colors",
            item === locale
              ? "border-brand bg-brand/25 text-white"
              : "border-border-strong text-text-muted hover:border-brand/70 hover:text-text",
          )}
        >
          {item.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

