import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { isLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { THEME_META_ID, themeInitScript } from "@/lib/theme";

const defaultSocialImage = "/assets/img/logo_complet.png";
const defaultKeywords = [
  "agence digitale Rouen",
  "site internet",
  "communication",
  "image de marque",
  "stratégie réseaux sociaux",
  "conception web",
  "Pixel Prestige",
  "développement web",
  "développement",
];

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: defaultKeywords,
  verification: {
    google: "uXUCfCKsPFvpl_ueg0vSlsYzxKLOfEVz-e5j9d_WTdg",
  },
  icons: {
    icon: [
      { url: "/assets/img/icone.svg", type: "image/svg+xml" },
      { url: "/assets/img/icone.ico", sizes: "any" },
      { url: "/assets/img/icone.png", type: "image/png" },
    ],
    apple: [{ url: "/assets/img/icone.png" }],
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: defaultSocialImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [defaultSocialImage],
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}>) {
  const resolvedParams = await params;
  const lang = isLocale(resolvedParams?.locale ?? "") ? resolvedParams.locale : "fr";

  return (
    <html lang={lang} suppressHydrationWarning data-theme="dark">
      <head>
        <meta id={THEME_META_ID} name="theme-color" content="#07070b" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${displayFont.variable} ${bodyFont.variable} bg-bg text-text antialiased`}>
        {children}
      </body>
    </html>
  );
}
