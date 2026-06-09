import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { BlogPostCard } from "@/components/ui/BlogPostCard";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { getLocaleContent } from "@/content/site-content";
import { getBlogPost, getBlogSlugs, getRelatedPosts } from "@/content/blog-content";
import { isLocale, locales, localizedPath, type Locale } from "@/lib/i18n";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { formatPostDate } from "@/lib/format-date";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getBlogSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  const post = getBlogPost(locale, slug);
  if (!post) {
    return {};
  }

  return buildMetadata({
    locale,
    title: post.title,
    description: post.description,
    path: `/${locale}/blog/${slug}`,
    absoluteTitle: true,
    keywords: post.keywords,
    // PNG généré par opengraph-image.tsx puis copié avec extension .png par
    // scripts/copy-og-images.mjs (MIME correct en hébergement statique).
    image: `/${locale}/blog/${slug}/opengraph-image.png`,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const typedLocale = locale as Locale;
  const post = getBlogPost(typedLocale, slug);
  if (!post) {
    notFound();
  }

  const { dictionary } = getLocaleContent(typedLocale);
  const related = getRelatedPosts(typedLocale, slug);
  const schema = articleSchema({ post, locale: typedLocale, path: `/${typedLocale}/blog/${slug}` });
  const breadcrumbs = breadcrumbSchema([
    { name: typedLocale === "fr" ? "Accueil" : "Home", path: `/${typedLocale}` },
    { name: dictionary.blogPage.title, path: `/${typedLocale}/blog` },
    { name: post.title, path: `/${typedLocale}/blog/${slug}` },
  ]);

  return (
    <article className="section-space">
      <div className="container-default">
        <div className="mx-auto max-w-3xl">
          <Link
            href={localizedPath(typedLocale, "/blog")}
            className="inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-text"
          >
            <ArrowLeft size={16} />
            {dictionary.blogPage.backToList}
          </Link>

          <header className="mt-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-text-muted">
              <time dateTime={post.date}>{formatPostDate(post.date, typedLocale)}</time>
              {post.readingMinutes ? (
                <>
                  <span aria-hidden>·</span>
                  <span>
                    {post.readingMinutes} {dictionary.blogPage.minutesLabel}
                  </span>
                </>
              ) : null}
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-text md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-text-muted">{post.description}</p>
          </header>

          <div className="mt-10">
            <ArticleBody blocks={post.body} />
          </div>

          <aside className="mt-14 glass-panel rounded-3xl p-8">
            <h2 className="font-display text-2xl font-semibold text-text">{dictionary.blogPage.ctaTitle}</h2>
            <p className="mt-3 text-text-muted">{dictionary.blogPage.ctaText}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLink
                href={localizedPath(typedLocale, "/contact")}
                className="btn-primary inline-flex"
                location={`blog_article:${slug}`}
              >
                {dictionary.common.ctaContact}
              </TrackedLink>
              <Link href={localizedPath(typedLocale, "/services")} className="btn-secondary inline-flex">
                {dictionary.common.ctaProject}
              </Link>
            </div>
          </aside>
        </div>

        {related.length > 0 ? (
          <div className="mx-auto mt-16 max-w-5xl border-t border-border-soft pt-12">
            <h2 className="section-title mb-8">{dictionary.blogPage.related}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {related.map((item) => (
                <BlogPostCard key={item.slug} locale={typedLocale} post={item} dictionary={dictionary} />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    </article>
  );
}
