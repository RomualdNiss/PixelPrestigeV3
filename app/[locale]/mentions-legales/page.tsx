import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
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
    title: dictionary.legalPage.title,
    description: dictionary.legalPage.title,
    path: `/${locale}/mentions-legales`,
  });
}

export default async function LegalPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { dictionary } = getLocaleContent(locale);

  return (
    <>
      <PageIntro title={dictionary.legalPage.title} lead={locale === "fr" ? "Informations editeur et hebergement." : "Publisher and hosting information."} />
      <section className="pb-24">
        <div className="container-default rounded-3xl border border-white/15 bg-bg-soft/70 p-6 text-sm text-text-muted">
          <p className="text-white">Pixel Prestige</p>
          <p>{locale === "fr" ? "Agence de developpement web et applicatif." : "Web and application development agency."}</p>
          <p className="mt-4">{locale === "fr" ? "Contact" : "Contact"}: {siteConfig.contact.email}</p>
          <p>{locale === "fr" ? "Hebergeur" : "Hosting"}: Hostinger</p>
        </div>
      </section>
    </>
  );
}

