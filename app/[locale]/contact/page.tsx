import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { ContactForm } from "@/components/forms/ContactForm";
import { getLocaleContent } from "@/content/site-content";
import { getLocaleStaticParams } from "@/lib/i18n";
import { resolveLocale } from "@/lib/resolve-locale";
import { buildMetadata } from "@/lib/seo";

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
    <div className="lg:h-full">
      <PageIntro
        title={dictionary.contactPage.title}
        lead={dictionary.contactPage.lead}
        useDefaultSpacing={false}
        className="contact-page-intro pt-6 pb-3 md:pt-7 md:pb-4 lg:pt-10 lg:pb-5"
        contentClassName="mx-auto max-w-3xl px-6 md:px-8"
        titleClassName="lg:mb-3"
        leadClassName="lg:text-lg"
      />
      <section className="contact-form-section pb-8 lg:pb-8">
        <div className="container-default">
          <div className="mx-auto max-w-3xl">
            <ContactForm locale={locale} dictionary={dictionary} />
          </div>
        </div>
      </section>
    </div>
  );
}
