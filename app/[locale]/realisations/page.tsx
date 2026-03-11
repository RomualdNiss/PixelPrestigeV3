import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { Reveal } from "@/components/animations/Reveal";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
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
    title: dictionary.casesPage.title,
    description: dictionary.casesPage.lead,
    path: `/${locale}/realisations`,
  });
}

export default async function CasesPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { dictionary, cases } = getLocaleContent(locale);

  return (
    <>
      <PageIntro title={dictionary.casesPage.title} lead={dictionary.casesPage.lead} />
      <section className="pb-24">
        <div className="container-default grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cases.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.05}>
              <CaseStudyCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

