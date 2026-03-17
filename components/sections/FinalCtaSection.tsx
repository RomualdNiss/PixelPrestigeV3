import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import type { Dictionary } from "@/types/content";

type FinalCtaSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function FinalCtaSection({ locale, dictionary }: FinalCtaSectionProps) {
  return (
    <section className="section-space">
      <div className="container-default">
        <div className="glass-panel rounded-3xl p-8 md:p-10">
          <h2 className="section-title max-w-3xl">{dictionary.home.finalCtaTitle}</h2>
          <p className="section-lead">{dictionary.home.finalCtaLead}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={localizedPath(locale, "/contact")} className="btn-primary">
              {dictionary.home.finalCtaButton}
            </Link>
            <a href={siteConfig.contact.calendly} className="btn-secondary" target="_blank" rel="noreferrer">
              {dictionary.common.ctaCalendly}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
