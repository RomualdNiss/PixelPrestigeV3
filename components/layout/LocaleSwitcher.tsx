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
    <div className="pixel-label flex flex-wrap items-center gap-2 text-[0.62rem] text-text-muted">
      <span>{label}</span>
      {locales.map((item) => (
        <Link
          key={item}
          href={toLocalePath(pathname, item)}
          onClick={onNavigate}
          className={cn(
            "rounded-[3px] border px-2 py-1.5 transition-colors",
            item === locale
              ? "border-brand bg-brand/25 text-white shadow-[2px_2px_0_0_rgba(165,41,255,0.55)]"
              : "border-border-strong text-text-muted hover:border-brand/70 hover:text-text",
          )}
        >
          {item.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

