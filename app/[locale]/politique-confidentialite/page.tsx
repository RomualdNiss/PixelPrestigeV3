import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { getLocaleContent } from "@/content/site-content";
import { getLocaleStaticParams } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/lib/resolve-locale";
import { hasSiteValue, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string }>;
};

function formatValue(locale: "fr" | "en", value: string) {
  return hasSiteValue(value)
    ? value
    : locale === "fr"
      ? "\u00C0 compléter avant mise en ligne"
      : "To complete before launch";
}

function formatAddress(locale: "fr" | "en") {
  const address = siteConfig.legal.address;
  const parts = [address.street, [address.postalCode, address.city].filter(Boolean).join(" ").trim(), address.country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : formatValue(locale, "");
}

export function generateStaticParams() {
  return getLocaleStaticParams();
}

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
  const analyticsConfigured = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim());
  const sectionClassName = "rounded-3xl border border-border bg-surface p-6";
  const sectionTitleClassName = "text-base font-semibold text-text";
  const missingIdentity =
    !hasSiteValue(siteConfig.legal.entityName) || !hasSiteValue(siteConfig.legal.address.street) || !hasSiteValue(siteConfig.contact.phone);

  return (
    <>
      <PageIntro
        title={locale === "fr" ? "Politique de confidentialité" : "Privacy policy"}
        lead={
          locale === "fr"
            ? "Comment les données du formulaire de contact et de la mesure d'audience sont traitées sur ce site."
            : "How contact-form and analytics data is handled on this website."
        }
      />

      <section className="pb-24">
        <div className="container-default grid gap-6">
          {missingIdentity ? (
            <div className="theme-warning-panel rounded-3xl p-6 text-sm">
              <p className="font-semibold text-text">
                {locale === "fr"
                  ? "Les informations d'identité du responsable de traitement doivent encore être complétées."
                  : "The controller identity details still need to be completed."}
              </p>
              <p className="mt-2">
                {locale === "fr"
                  ? "Complétez la dénomination légale, l'adresse postale et le téléphone dans lib/site.ts avant la mise en production."
                  : "Complete the legal entity name, postal address, and phone number in lib/site.ts before production launch."}
              </p>
            </div>
          ) : null}

          <div className={sectionClassName}>
            <h2 className={sectionTitleClassName}>{locale === "fr" ? "Responsable du traitement" : "Data controller"}</h2>
            <div className="mt-4 space-y-3 text-sm text-text-muted">
              <p>
                <span className="font-medium text-text">{locale === "fr" ? "Organisme" : "Entity"}:</span>{" "}
                {formatValue(locale, siteConfig.legal.entityName || siteConfig.privacy.controllerName)}
              </p>
              <p>
                <span className="font-medium text-text">{locale === "fr" ? "Adresse" : "Address"}:</span> {formatAddress(locale)}
              </p>
              <p>
                <span className="font-medium text-text">{locale === "fr" ? "E-mail" : "Email"}:</span> {siteConfig.contact.email}
              </p>
              <p>
                <span className="font-medium text-text">{locale === "fr" ? "Téléphone" : "Phone"}:</span>{" "}
                {formatValue(locale, siteConfig.contact.phone)}
              </p>
            </div>
          </div>

          <div className={sectionClassName}>
            <h2 className={sectionTitleClassName}>{locale === "fr" ? "Données collectées" : "Collected data"}</h2>
            <div className="mt-4 grid gap-4 text-sm text-text-muted md:grid-cols-2">
              <div>
                <p className="font-medium text-text">{locale === "fr" ? "Champs obligatoires" : "Required fields"}</p>
                <ul className="mt-2 space-y-2">
                  {siteConfig.privacy.requiredFields.map((field) => (
                    <li key={field}>{field}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-text">{locale === "fr" ? "Champs facultatifs" : "Optional fields"}</p>
                <ul className="mt-2 space-y-2">
                  {siteConfig.privacy.optionalFields.map((field) => (
                    <li key={field}>{field}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={sectionClassName}>
            <h2 className={sectionTitleClassName}>{locale === "fr" ? "Finalités et base légale" : "Purposes and legal basis"}</h2>
            <div className="mt-4 space-y-4 text-sm text-text-muted">
              <div>
                <p className="font-medium text-text">{locale === "fr" ? "Finalités" : "Purposes"}</p>
                <ul className="mt-2 space-y-2">
                  {siteConfig.privacy.contactPurposes.map((purpose) => (
                    <li key={purpose}>{purpose}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-text">{locale === "fr" ? "Base légale" : "Legal basis"}</p>
                <p className="mt-2">{siteConfig.privacy.legalBasis}</p>
              </div>
            </div>
          </div>

          <div className={sectionClassName}>
            <h2 className={sectionTitleClassName}>{locale === "fr" ? "Destinataires et conservation" : "Recipients and retention"}</h2>
            <div className="mt-4 space-y-4 text-sm text-text-muted">
              <div>
                <p className="font-medium text-text">{locale === "fr" ? "Destinataires" : "Recipients"}</p>
                <ul className="mt-2 space-y-2">
                  {siteConfig.privacy.recipients.map((recipient) => (
                    <li key={recipient}>{recipient}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-text">{locale === "fr" ? "Durée de conservation" : "Retention period"}</p>
                <p className="mt-2">{siteConfig.privacy.contactFormRetention}</p>
              </div>
            </div>
          </div>

          <div className={sectionClassName}>
            <h2 className={sectionTitleClassName}>{locale === "fr" ? "Cookies et mesure d'audience" : "Cookies and analytics"}</h2>
            <div className="mt-4 space-y-3 text-sm text-text-muted">
              <p>
                {analyticsConfigured
                  ? locale === "fr"
                    ? "La mesure d'audience n'est activée qu'après un consentement explicite. Vous pouvez accepter, refuser ou réouvrir ce choix à tout moment depuis le bouton de gestion des cookies."
                    : "Analytics are only enabled after explicit consent. You can accept, decline, or reopen this choice at any time from the cookie settings button."
                  : locale === "fr"
                    ? "Aucune mesure d'audience n'est actuellement active sur cette version du site car aucun identifiant Google Analytics n'est configuré."
                    : "No analytics are currently active on this build because no Google Analytics measurement ID is configured."}
              </p>
              <p>{siteConfig.privacy.internationalTransfers}</p>
              <p>
                {locale === "fr"
                  ? "Aucune donnée personnelle n'est vendue ou cédée à des tiers à des fins de revente."
                  : "No personal data is sold or licensed to third parties for resale."}
              </p>
            </div>
          </div>

          <div className={sectionClassName}>
            <h2 className={sectionTitleClassName}>{locale === "fr" ? "Vos droits" : "Your rights"}</h2>
            <div className="mt-4 space-y-3 text-sm text-text-muted">
              <p>
                {locale === "fr"
                  ? "Vous pouvez demander l'accès, la rectification, l'effacement, la limitation du traitement ou vous opposer au traitement de vos données lorsque la réglementation le permet."
                  : "You can request access, rectification, deletion, restriction, or object to the processing of your data whenever applicable under data-protection law."}
              </p>
              <p>
                {locale === "fr"
                  ? `Pour exercer vos droits, écrivez à ${siteConfig.contact.email}.`
                  : `To exercise your rights, email ${siteConfig.contact.email}.`}
              </p>
              <p>
                {locale === "fr"
                  ? "Vous pouvez également introduire une réclamation auprès de la CNIL si vous estimez que vos droits ne sont pas respectés."
                  : "You can also lodge a complaint with the CNIL if you believe your rights have not been respected."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
