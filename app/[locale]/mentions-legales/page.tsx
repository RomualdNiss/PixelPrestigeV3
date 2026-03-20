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

type DetailItem = {
  label: string;
  value: string;
};

function formatValue(locale: "fr" | "en", value: string) {
  return hasSiteValue(value)
    ? value
    : locale === "fr"
      ? "\u00C0 compléter avant mise en ligne"
      : "To complete before launch";
}

function formatAddress(locale: "fr" | "en", address: { street: string; postalCode: string; city: string; country: string }) {
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
    title: dictionary.legalPage.title,
    description: dictionary.legalPage.title,
    path: `/${locale}/mentions-legales`,
  });
}

export default async function LegalPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { dictionary } = getLocaleContent(locale);
  const isSoleTrader = siteConfig.legal.legalForm.toLowerCase().includes("entreprise individuelle");

  const editorItems: DetailItem[] = [
    {
      label: locale === "fr" ? "Nom commercial" : "Brand name",
      value: siteConfig.name,
    },
    {
      label: locale === "fr" ? "Dénomination / raison sociale" : "Legal entity name",
      value: formatValue(locale, siteConfig.legal.entityName),
    },
    {
      label: locale === "fr" ? "Forme juridique" : "Legal form",
      value: formatValue(locale, siteConfig.legal.legalForm),
    },
    {
      label: locale === "fr" ? "Capital social" : "Share capital",
      value: isSoleTrader ? (locale === "fr" ? "Non applicable" : "Not applicable") : formatValue(locale, siteConfig.legal.shareCapital),
    },
    {
      label: siteConfig.legal.registrationLabel,
      value: formatValue(locale, siteConfig.legal.registrationNumber),
    },
    {
      label: locale === "fr" ? "TVA intracommunautaire" : "VAT number",
      value: formatValue(locale, siteConfig.legal.vatNumber),
    },
    {
      label: locale === "fr" ? "Adresse" : "Address",
      value: formatAddress(locale, siteConfig.legal.address),
    },
    {
      label: locale === "fr" ? "E-mail" : "Email",
      value: siteConfig.contact.email,
    },
    {
      label: locale === "fr" ? "Téléphone" : "Phone",
      value: formatValue(locale, siteConfig.contact.phone),
    },
  ];

  const publicationItems: DetailItem[] = [
    {
      label: locale === "fr" ? "Directeur de la publication" : "Publishing director",
      value: formatValue(locale, siteConfig.legal.publicationDirector),
    },
    {
      label: locale === "fr" ? "Responsable du site" : "Website operator",
      value: siteConfig.privacy.controllerName,
    },
  ];

  const hostingItems: DetailItem[] = [
    {
      label: locale === "fr" ? "Hébergeur" : "Hosting provider",
      value: siteConfig.legal.host.companyName,
    },
    {
      label: locale === "fr" ? "Adresse" : "Address",
      value: formatAddress(locale, siteConfig.legal.host),
    },
    {
      label: locale === "fr" ? "Téléphone" : "Phone",
      value: siteConfig.legal.host.phone,
    },
    {
      label: locale === "fr" ? "E-mail" : "Email",
      value: siteConfig.legal.host.email,
    },
    {
      label: locale === "fr" ? "Site web" : "Website",
      value: siteConfig.legal.host.website,
    },
  ];

  const missingLegalItems = [
    !hasSiteValue(siteConfig.legal.entityName) ? (locale === "fr" ? "dénomination sociale" : "legal entity name") : null,
    !hasSiteValue(siteConfig.legal.legalForm) ? (locale === "fr" ? "forme juridique" : "legal form") : null,
    !hasSiteValue(siteConfig.legal.registrationNumber) ? siteConfig.legal.registrationLabel : null,
    !hasSiteValue(siteConfig.legal.address.street) ? (locale === "fr" ? "adresse" : "address") : null,
    !hasSiteValue(siteConfig.contact.phone) ? (locale === "fr" ? "téléphone" : "phone") : null,
    !hasSiteValue(siteConfig.legal.publicationDirector) ? (locale === "fr" ? "directeur de la publication" : "publishing director") : null,
  ].filter(Boolean);

  const sectionTitleClassName = "text-base font-semibold text-text";
  const sectionClassName = "rounded-3xl border border-border bg-surface p-6";

  return (
    <>
      <PageIntro
        title={dictionary.legalPage.title}
        lead={locale === "fr" ? "Informations éditeur, responsabilité de publication et hébergement." : "Publisher, publication responsibility, and hosting information."}
      />

      <section className="pb-24">
        <div className="container-default grid gap-6">
          {missingLegalItems.length > 0 ? (
            <div className="theme-warning-panel rounded-3xl p-6 text-sm">
              <p className="font-semibold text-text">
                {locale === "fr"
                  ? "Cette page n'est pas encore totalement conforme pour une mise en ligne publique."
                  : "This page is not fully compliant for public launch yet."}
              </p>
              <p className="mt-2">
                {locale === "fr"
                  ? `\u00C0 compléter dans lib/site.ts avant mise en production : ${missingLegalItems.join(", ")}.`
                  : `Complete these fields in lib/site.ts before production launch: ${missingLegalItems.join(", ")}.`}
              </p>
            </div>
          ) : null}

          <div className={sectionClassName}>
            <h2 className={sectionTitleClassName}>{locale === "fr" ? "\u00C9diteur du site" : "Site publisher"}</h2>
            <dl className="mt-4 grid gap-4 text-sm text-text-muted md:grid-cols-2">
              {editorItems.map((item) => (
                <div key={item.label} className="space-y-1">
                  <dt className="font-medium text-text">{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={sectionClassName}>
            <h2 className={sectionTitleClassName}>{locale === "fr" ? "Publication" : "Publication"}</h2>
            <dl className="mt-4 grid gap-4 text-sm text-text-muted md:grid-cols-2">
              {publicationItems.map((item) => (
                <div key={item.label} className="space-y-1">
                  <dt className="font-medium text-text">{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={sectionClassName}>
            <h2 className={sectionTitleClassName}>{locale === "fr" ? "Hébergement" : "Hosting"}</h2>
            <dl className="mt-4 grid gap-4 text-sm text-text-muted md:grid-cols-2">
              {hostingItems.map((item) => (
                <div key={item.label} className="space-y-1">
                  <dt className="font-medium text-text">{item.label}</dt>
                  <dd>
                    {item.value.startsWith("http") ? (
                      <a href={item.value} target="_blank" rel="noreferrer" className="theme-link">
                        {item.value}
                      </a>
                    ) : item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={sectionClassName}>
            <h2 className={sectionTitleClassName}>
              {locale === "fr" ? "Propriété intellectuelle et responsabilité" : "Intellectual property and liability"}
            </h2>
            <div className="mt-4 space-y-3 text-sm text-text-muted">
              <p>
                {locale === "fr"
                  ? "Sauf mention contraire, les textes, éléments d'interface, visuels, logos et composants présents sur ce site sont réservés à Pixel Prestige. Toute reproduction, adaptation ou diffusion sans autorisation préalable n'est pas autorisée."
                  : "Unless stated otherwise, the copy, interface elements, visuals, logos, and components published on this website are reserved for Pixel Prestige. Reproduction, adaptation, or redistribution without prior permission is not allowed."}
              </p>
              <p>
                {locale === "fr"
                  ? "Malgré le soin apporté à la publication, Pixel Prestige ne peut garantir l'absence totale d'erreurs ou d'indisponibilités temporaires du site."
                  : "Despite the care taken when publishing this website, Pixel Prestige cannot guarantee the total absence of errors or temporary downtime."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
