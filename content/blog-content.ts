import type { Locale } from "@/lib/i18n";
import type { BlogPost } from "@/types/content";

// Articles de blog, stockés en TypeScript typé comme le reste du contenu du site.
// Chaque article existe en FR et EN et partage le même `slug`.
// Contenu éditorial de Pixel Prestige : à relire / ajuster avant publication.

const frPosts: BlogPost[] = [
  {
    slug: "refondre-son-site-vitrine",
    title: "Refondre son site vitrine : par où commencer ?",
    description:
      "Une refonte réussie ne commence pas par le design, mais par les objectifs. Voici une méthode claire pour cadrer la refonte de votre site vitrine.",
    date: "2026-06-02",
    readingMinutes: 6,
    keywords: [
      "refonte site vitrine",
      "refonte site internet",
      "cahier des charges site web",
      "agence web Rouen",
    ],
    body: [
      {
        type: "paragraph",
        text: "Beaucoup d'entreprises lancent une refonte parce que leur site « fait daté ». C'est un bon signal, mais une mauvaise raison de démarrer. Un site qui convertit ne se juge pas à son esthétique seule : il répond à des objectifs business précis. Avant de parler maquettes, il faut clarifier ce que le site doit accomplir.",
      },
      {
        type: "heading",
        text: "1. Repartir des objectifs, pas de l'existant",
      },
      {
        type: "paragraph",
        text: "Demandez-vous d'abord ce qu'un visiteur doit comprendre et faire en arrivant sur votre site. Prendre contact ? Demander un devis ? Réserver un créneau ? Chaque page doit servir un de ces objectifs. Si une section ne contribue à aucun, elle dilue le message.",
      },
      {
        type: "list",
        items: [
          "Quel est l'objectif principal du site (générer des demandes, vendre, rassurer) ?",
          "Qui sont vos visiteurs cibles et que cherchent-ils concrètement ?",
          "Quelles actions veut-on déclencher sur chaque page ?",
        ],
      },
      {
        type: "heading",
        text: "2. Auditer l'existant avant de tout jeter",
      },
      {
        type: "paragraph",
        text: "Votre site actuel contient des informations précieuses : pages qui reçoivent du trafic, mots-clés déjà positionnés, contenus qui convertissent. Une refonte mal préparée fait souvent chuter le référencement parce qu'on supprime des URL ou des contenus qui fonctionnaient. Un audit rapide (trafic, pages d'entrée, conversions) évite de repartir de zéro.",
      },
      {
        type: "quote",
        text: "Une refonte n'est pas une remise à zéro : c'est une amélioration mesurable de ce qui marche déjà.",
      },
      {
        type: "heading",
        text: "3. Soigner la structure et le contenu avant le design",
      },
      {
        type: "paragraph",
        text: "L'arborescence (les pages et leur hiérarchie) et le contenu rédactionnel comptent davantage que le choix d'une couleur. Un site clair, bien structuré, avec des titres explicites, est plus efficace pour vos visiteurs et pour les moteurs de recherche. Le design vient habiller une structure déjà solide, pas l'inverse.",
      },
      {
        type: "heading",
        text: "4. Prévoir la performance et le suivi dès le départ",
      },
      {
        type: "paragraph",
        text: "Un site rapide, accessible et mesurable n'est pas un bonus : c'est un prérequis. Performance technique, référencement de base et outil de mesure d'audience doivent être pensés dès la conception. C'est beaucoup plus coûteux de les ajouter après coup.",
      },
      {
        type: "paragraph",
        text: "En résumé : une bonne refonte part des objectifs, conserve ce qui fonctionne, structure le contenu, puis l'habille. Si vous préparez la refonte de votre site, nous pouvons vous aider à la cadrer — parlons-en.",
      },
    ],
  },
  {
    slug: "core-web-vitals-referencement",
    title: "Core Web Vitals : la performance web au service de votre référencement",
    description:
      "Vitesse, stabilité, réactivité : les Core Web Vitals influencent l'expérience utilisateur et le référencement. Voici ce qu'il faut comprendre et surveiller.",
    date: "2026-05-19",
    readingMinutes: 5,
    keywords: [
      "Core Web Vitals",
      "performance web",
      "vitesse site internet",
      "SEO technique",
    ],
    body: [
      {
        type: "paragraph",
        text: "Un site lent fait fuir les visiteurs et pénalise votre référencement. Google mesure une partie de l'expérience utilisateur à travers trois indicateurs appelés Core Web Vitals. Les comprendre aide à prioriser les bons chantiers techniques.",
      },
      {
        type: "heading",
        text: "Les trois indicateurs clés",
      },
      {
        type: "subheading",
        text: "LCP — la vitesse de chargement perçue",
      },
      {
        type: "paragraph",
        text: "Le Largest Contentful Paint mesure le temps avant que le contenu principal (souvent une grande image ou un titre) s'affiche. Objectif : moins de 2,5 secondes. Les images non optimisées et les scripts trop lourds sont les causes les plus fréquentes d'un mauvais LCP.",
      },
      {
        type: "subheading",
        text: "INP — la réactivité aux interactions",
      },
      {
        type: "paragraph",
        text: "L'Interaction to Next Paint mesure le délai entre une action de l'utilisateur (clic, saisie) et la réponse visible de la page. Un site qui « rame » au clic donne une impression de mauvaise qualité, même s'il s'est affiché vite.",
      },
      {
        type: "subheading",
        text: "CLS — la stabilité visuelle",
      },
      {
        type: "paragraph",
        text: "Le Cumulative Layout Shift mesure les déplacements inattendus des éléments pendant le chargement. Vous avez déjà cliqué au mauvais endroit parce qu'un bouton a « sauté » ? C'est un mauvais CLS. On l'évite en réservant l'espace des images et des polices.",
      },
      {
        type: "quote",
        text: "La performance n'est pas qu'une affaire de score : c'est un confort réel pour vos visiteurs, et un signal pour Google.",
      },
      {
        type: "heading",
        text: "Par où commencer concrètement",
      },
      {
        type: "list",
        items: [
          "Optimiser et redimensionner les images (formats modernes, dimensions adaptées).",
          "Limiter les scripts tiers non essentiels qui bloquent l'affichage.",
          "Réserver l'espace des éléments pour éviter les sauts de mise en page.",
          "Mesurer régulièrement avec un outil comme Lighthouse pour suivre les progrès.",
        ],
      },
      {
        type: "paragraph",
        text: "La bonne nouvelle : ces optimisations sont à la portée de tout site bien construit. Si vous voulez un diagnostic de performance sur votre site actuel, contactez-nous.",
      },
    ],
  },
];

const enPosts: BlogPost[] = [
  {
    slug: "refondre-son-site-vitrine",
    title: "Redesigning your marketing website: where to start",
    description:
      "A successful redesign doesn't start with design — it starts with goals. Here's a clear method to frame your marketing website redesign.",
    date: "2026-06-02",
    readingMinutes: 6,
    keywords: [
      "website redesign",
      "marketing website",
      "web project brief",
      "web agency",
    ],
    body: [
      {
        type: "paragraph",
        text: "Many companies launch a redesign because their site \"looks dated\". That's a fair signal, but a poor reason to start. A site that converts isn't judged on aesthetics alone: it answers precise business goals. Before talking mockups, you need to clarify what the site should achieve.",
      },
      {
        type: "heading",
        text: "1. Start from goals, not from the existing site",
      },
      {
        type: "paragraph",
        text: "First, ask what a visitor should understand and do when they land on your site. Get in touch? Request a quote? Book a slot? Each page should serve one of those goals. If a section contributes to none, it dilutes the message.",
      },
      {
        type: "list",
        items: [
          "What is the primary goal of the site (generate leads, sell, reassure)?",
          "Who are your target visitors and what are they actually looking for?",
          "What actions do you want to trigger on each page?",
        ],
      },
      {
        type: "heading",
        text: "2. Audit what exists before scrapping it",
      },
      {
        type: "paragraph",
        text: "Your current site holds valuable information: pages that receive traffic, keywords you already rank for, content that converts. A poorly prepared redesign often hurts SEO because it removes URLs or content that worked. A quick audit (traffic, landing pages, conversions) avoids starting from scratch.",
      },
      {
        type: "quote",
        text: "A redesign isn't a reset: it's a measurable improvement of what already works.",
      },
      {
        type: "heading",
        text: "3. Get structure and content right before design",
      },
      {
        type: "paragraph",
        text: "Information architecture (pages and their hierarchy) and written content matter more than the choice of a color. A clear, well-structured site with explicit headings is more effective for your visitors and for search engines. Design dresses up a solid structure, not the other way around.",
      },
      {
        type: "heading",
        text: "4. Plan for performance and measurement from day one",
      },
      {
        type: "paragraph",
        text: "A fast, accessible, measurable site isn't a bonus: it's a prerequisite. Technical performance, basic SEO and analytics should be considered from the design stage. Adding them afterwards is far more expensive.",
      },
      {
        type: "paragraph",
        text: "In short: a good redesign starts from goals, keeps what works, structures the content, then dresses it up. If you're planning a redesign, we can help you frame it — let's talk.",
      },
    ],
  },
  {
    slug: "core-web-vitals-referencement",
    title: "Core Web Vitals: web performance in service of your SEO",
    description:
      "Speed, stability, responsiveness: Core Web Vitals shape user experience and SEO. Here's what to understand and monitor.",
    date: "2026-05-19",
    readingMinutes: 5,
    keywords: [
      "Core Web Vitals",
      "web performance",
      "site speed",
      "technical SEO",
    ],
    body: [
      {
        type: "paragraph",
        text: "A slow site drives visitors away and hurts your SEO. Google measures part of the user experience through three metrics called Core Web Vitals. Understanding them helps prioritize the right technical work.",
      },
      {
        type: "heading",
        text: "The three key metrics",
      },
      {
        type: "subheading",
        text: "LCP — perceived loading speed",
      },
      {
        type: "paragraph",
        text: "Largest Contentful Paint measures the time before the main content (often a large image or heading) appears. Target: under 2.5 seconds. Unoptimized images and heavy scripts are the most common causes of a poor LCP.",
      },
      {
        type: "subheading",
        text: "INP — responsiveness to interactions",
      },
      {
        type: "paragraph",
        text: "Interaction to Next Paint measures the delay between a user action (click, typing) and the page's visible response. A site that lags on click feels low quality, even if it loaded quickly.",
      },
      {
        type: "subheading",
        text: "CLS — visual stability",
      },
      {
        type: "paragraph",
        text: "Cumulative Layout Shift measures unexpected movement of elements during loading. Ever clicked the wrong spot because a button \"jumped\"? That's poor CLS. You avoid it by reserving space for images and fonts.",
      },
      {
        type: "quote",
        text: "Performance isn't just a score: it's real comfort for your visitors, and a signal to Google.",
      },
      {
        type: "heading",
        text: "Where to start concretely",
      },
      {
        type: "list",
        items: [
          "Optimize and resize images (modern formats, appropriate dimensions).",
          "Limit non-essential third-party scripts that block rendering.",
          "Reserve space for elements to avoid layout shifts.",
          "Measure regularly with a tool like Lighthouse to track progress.",
        ],
      },
      {
        type: "paragraph",
        text: "The good news: these optimizations are within reach of any well-built site. If you'd like a performance diagnosis of your current site, get in touch.",
      },
    ],
  },
];

const postsByLocale: Record<Locale, BlogPost[]> = {
  fr: frPosts,
  en: enPosts,
};

function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPosts(locale: Locale): BlogPost[] {
  return sortByDateDesc(postsByLocale[locale]);
}

export function getBlogPost(locale: Locale, slug: string): BlogPost | undefined {
  return postsByLocale[locale].find((post) => post.slug === slug);
}

// Slugs partagés entre les locales — sert à generateStaticParams.
export function getBlogSlugs(): string[] {
  return frPosts.map((post) => post.slug);
}
