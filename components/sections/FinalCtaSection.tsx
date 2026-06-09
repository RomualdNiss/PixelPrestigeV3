import { localizedPath, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import type { Dictionary } from "@/types/content";

type FinalCtaSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function FinalCtaSection({ locale, dictionary }: FinalCtaSectionProps) {
  return (
    <section className="section-space">
      <div className="container-default">
        <div className="glass-panel pixel-frame rounded-3xl p-8 md:p-10">
          <h2 className="section-title max-w-3xl">{dictionary.home.finalCtaTitle}</h2>
          <p className="section-lead">{dictionary.home.finalCtaLead}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <TrackedLink
              href={localizedPath(locale, "/contact")}
              className="btn-primary"
              location="home_final_cta"
            >
              {dictionary.home.finalCtaButton}
            </TrackedLink>
            <TrackedLink
              href={`mailto:${siteConfig.contact.email}`}
              className="btn-secondary"
              location="home_final_cta_email"
              external
            >
              {siteConfig.contact.email}
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
