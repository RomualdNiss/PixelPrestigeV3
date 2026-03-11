import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { getLocaleContent } from "@/content/site-content";
import { resolveLocale } from "@/lib/resolve-locale";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { dictionary } = getLocaleContent(locale);

  return buildMetadata({
    locale,
    title: dictionary.privacyPage.title,
    description: dictionary.privacyPage.title,
    path: `/${locale}/politique-confidentialite`,
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const locale = await resolveLocale(params);

  return (
    <>
      <PageIntro
        title={locale === "fr" ? "Politique de confidentialite" : "Privacy policy"}
        lead={
          locale === "fr"
            ? "Explication des donnees collectees et de leur utilisation."
            : "How data is collected and used on this website."
        }
      />
      <section className="pb-24">
        <div className="container-default rounded-3xl border border-white/15 bg-bg-soft/70 p-6 text-sm text-text-muted">
          <p>
            {locale === "fr"
              ? "Nous collectons uniquement les donnees necessaires au traitement de votre demande de contact."
              : "We only collect data required to process your contact request."}
          </p>
          <p className="mt-4">
            {locale === "fr"
              ? "Aucune donnee n'est revendue. Vous pouvez demander suppression ou export de vos donnees a tout moment."
              : "No data is sold. You can request deletion or export of your data at any time."}
          </p>
          <p className="mt-4">
            {locale === "fr"
              ? "Les mesures analytics sont activees uniquement apres consentement."
              : "Analytics are enabled only after explicit consent."}
          </p>
        </div>
      </section>
    </>
  );
}

