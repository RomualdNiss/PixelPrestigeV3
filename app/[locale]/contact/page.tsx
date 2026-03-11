import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { ContactForm } from "@/components/forms/ContactForm";
import { getLocaleContent } from "@/content/site-content";
import { getLocaleStaticParams } from "@/lib/i18n";
import { resolveLocale } from "@/lib/resolve-locale";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return getLocaleStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { dictionary } = getLocaleContent(locale);

  return buildMetadata({
    locale,
    title: dictionary.contactPage.title,
    description: dictionary.contactPage.lead,
    path: `/${locale}/contact`,
  });
}

export default async function ContactPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { dictionary } = getLocaleContent(locale);

  return (
    <>
      <PageIntro title={dictionary.contactPage.title} lead={dictionary.contactPage.lead} />
      <section className="pb-24">
        <div className="container-default grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <ContactForm locale={locale} dictionary={dictionary} />
          <aside className="space-y-4 rounded-3xl border border-white/15 bg-bg-soft/70 p-6">
            <p className="text-sm text-text-muted">{dictionary.contactPage.responseInfo}</p>
            <a href={siteConfig.contact.calendly} target="_blank" rel="noreferrer" className="btn-secondary w-full">
              {dictionary.common.ctaCalendly}
            </a>
            <div className="rounded-2xl border border-white/15 p-4 text-sm text-text-muted">
              <p className="text-white">{locale === "fr" ? "Scope type" : "Typical scope"}</p>
              <p className="mt-2">
                {locale === "fr"
                  ? "Site premium, app metier, automatisation, refonte UX."
                  : "Premium websites, internal apps, automation pipelines, UX redesign."}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

