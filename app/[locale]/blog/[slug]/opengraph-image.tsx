import { ImageResponse } from "next/og";
import { getBlogPost, getBlogSlugs } from "@/content/blog-content";
import { isLocale, locales } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.flatMap((locale) => getBlogSlugs().map((slug) => ({ locale, slug })));
}

type ImageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const BRAND = "#a529ff";
const BG = "#07070b";

export default async function OpengraphImage({ params }: ImageProps) {
  const { locale, slug } = await params;
  const post = isLocale(locale) ? getBlogPost(locale, slug) : undefined;
  const title = post?.title ?? siteConfig.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          backgroundImage: `radial-gradient(900px 500px at 100% 0%, rgba(165,41,255,0.28), transparent 60%)`,
          padding: "72px",
          color: "#f5f7fa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "14px", height: "14px", borderRadius: "9999px", background: BRAND }} />
          <div
            style={{
              fontSize: "26px",
              letterSpacing: "6px",
              textTransform: "uppercase",
              color: "#c9b8ff",
            }}
          >
            {siteConfig.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? "60px" : "72px",
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", height: "8px", width: "120px", borderRadius: "9999px", background: BRAND }} />
          <div style={{ fontSize: "28px", color: "#9aa3b2" }}>pixelprestige.fr</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
