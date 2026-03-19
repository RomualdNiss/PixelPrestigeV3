import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import type { Dictionary } from "@/types/content";

type SiteFooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-default flex flex-col gap-6 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
        <p>{dictionary.footerText}</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href={localizedPath(locale, "/mentions-legales")} className="hover:text-white">
            {locale === "fr" ? "Mentions légales" : "Legal notice"}
          </Link>
          <Link href={localizedPath(locale, "/politique-confidentialite")} className="hover:text-white">
            {locale === "fr" ? "Confidentialité" : "Privacy"}
          </Link>
          <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">
            {siteConfig.contact.email}
          </a>
        </div>
      </div>
    </footer>
  );
}

