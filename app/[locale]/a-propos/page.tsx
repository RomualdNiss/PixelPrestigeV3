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
    title: dictionary.aboutPage.title,
    description: dictionary.aboutPage.lead,
    path: `/${locale}/a-propos`,
  });
}

export default async function AboutPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { dictionary } = getLocaleContent(locale);

  return (
    <>
      <PageIntro title={dictionary.aboutPage.title} lead={dictionary.aboutPage.lead} />
      <section className="pb-24">
        <div className="container-default grid gap-4 md:grid-cols-2">
          <article className="rounded-3xl border border-white/15 bg-bg-soft/70 p-6">
            <h2 className="font-display text-2xl text-white">{locale === "fr" ? "Valeurs" : "Values"}</h2>
            <ul className="mt-4 space-y-2 text-sm text-text-muted">
              {dictionary.aboutPage.values.map((value) => (
                <li key={value} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-sm bg-brand" />
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border border-white/15 bg-bg-soft/70 p-6">
            <h2 className="font-display text-2xl text-white">{dictionary.aboutPage.stackTitle}</h2>
            <ul className="mt-4 space-y-2 text-sm text-text-muted">
              {dictionary.aboutPage.stackItems.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-sm bg-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}

