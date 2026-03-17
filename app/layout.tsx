import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";

const defaultSocialImage = "/assets/img/logo_complet.png";
const defaultKeywords = [
  "agence digitale Rouen",
  "site internet",
  "communication",
  "branding",
  "strategie reseaux sociaux",
  "webdesign",
  "Pixel Prestige",
  "developpement web",
  "developpement",
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
  themeColor: "#A529FF",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${displayFont.variable} ${bodyFont.variable} bg-bg text-text antialiased`}>
        {children}
      </body>
    </html>
  );
}

