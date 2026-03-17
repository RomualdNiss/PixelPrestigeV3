import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/types/content";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-bg/70 backdrop-blur-xl">
      <div className="container-default flex h-[var(--header-height)] items-center justify-between gap-6 py-4">
        <Link href={localizedPath(locale, "/")} className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-brand shadow-[0_0_20px_rgba(165,41,255,0.9)]" />
          <span className="font-display text-base font-semibold tracking-wide text-white">Pixel Prestige</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {dictionary.nav.map((item) => (
            <Link
              key={item.href}
              href={localizedPath(locale, item.href)}
              className="text-sm text-text-muted transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} label={dictionary.common.localeSwitch} />
          <Link href={localizedPath(locale, "/contact")} className="btn-primary hidden text-sm md:inline-flex">
            {dictionary.common.ctaContact}
          </Link>
        </div>
      </div>
    </header>
  );
}

