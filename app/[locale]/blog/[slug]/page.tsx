import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { getLocaleContent } from "@/content/site-content";
import { getBlogPost, getBlogSlugs } from "@/content/blog-content";
import { isLocale, locales, localizedPath, type Locale } from "@/lib/i18n";
import { articleSchema, buildMetadata } from "@/lib/seo";
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
    image: post.image,
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
  const schema = articleSchema({ post, locale: typedLocale, path: `/${typedLocale}/blog/${slug}` });

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
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </article>
  );
}
