import type { Locale } from "@/lib/i18n";
import type { BlogPost } from "@/types/content";

// Articles de blog, stockés en TypeScript typé comme le reste du contenu du site.
// Chaque article existe en FR et EN et partage le même `slug`.
// Contenu éditorial de Pixel Prestige : à relire / ajuster avant publication.

const frPosts: BlogPost[] = [
  {
    slug: "combien-coute-site-internet",
    title: "Combien coûte un site internet professionnel ?",
    description:
      "La vraie réponse dépend de vos objectifs, pas d'un tarif unique. Voici ce qui fait varier le prix d'un site et comment éviter les mauvaises surprises.",
    date: "2026-06-09",
    readingMinutes: 6,
    keywords: [
      "prix site internet",
      "coût site web",
      "tarif création site vitrine",
      "devis site web",
    ],
    body: [
      {
        type: "paragraph",
        text: "« Combien coûte un site internet ? » est la question la plus fréquente, et celle dont la réponse « ça dépend » est la plus frustrante. Pourtant, elle est honnête : un site n'a pas de prix fixe parce qu'il ne répond pas toujours au même besoin. Comprendre ce qui fait varier le coût vous aide à savoir où investir.",
      },
      {
        type: "heading",
        text: "Ce qui fait vraiment varier le prix",
      },
      {
        type: "list",
        items: [
          "Le nombre de pages et la complexité du contenu à structurer.",
          "Le sur-mesure du design par rapport à un modèle préexistant.",
          "Les fonctionnalités : formulaire simple, réservation, espace client, paiement…",
          "Le travail de référencement et de performance intégré dès le départ.",
          "La création de contenu (textes, photos) si elle n'est pas fournie.",
        ],
      },
      {
        type: "paragraph",
        text: "Un site vitrine clair de quelques pages n'a pas le même coût qu'une application web avec réservation et comptes utilisateurs. Ce n'est pas une question de « cher » ou « pas cher », mais d'adéquation entre l'outil et l'objectif.",
      },
      {
        type: "heading",
        text: "Le piège du prix le plus bas",
      },
      {
        type: "paragraph",
        text: "Un site très peu cher cache souvent un coût différé : lenteur, absence de référencement, impossibilité d'évoluer, ou dépendance à une plateforme que vous ne maîtrisez pas. À l'inverse, payer cher ne garantit rien si le prestataire ne part pas de vos objectifs. Le bon repère n'est pas le tarif, mais ce que le site vous rapporte.",
      },
      {
        type: "quote",
        text: "Un site n'est pas une dépense ponctuelle : c'est un outil qui doit générer des contacts ou faire gagner du temps.",
      },
      {
        type: "heading",
        text: "Comment obtenir un devis fiable",
      },
      {
        type: "paragraph",
        text: "Un bon devis ne se résume pas à un montant : il décrit le périmètre, les livrables, ce qui est inclus (référencement, formation, maintenance) et ce qui ne l'est pas. Plus vous exprimez clairement vos objectifs, plus le chiffrage est juste. Présentez votre activité, vos priorités et votre échéance : c'est la base d'une estimation honnête.",
      },
      {
        type: "paragraph",
        text: "Vous voulez une estimation adaptée à votre projet plutôt qu'un tarif générique ? Décrivez-nous votre besoin, nous revenons avec un périmètre et une recommandation concrète.",
      },
    ],
  },
  {
    slug: "referencement-local-google",
    title: "Référencement local : être visible sur Google dans votre ville",
    description:
      "Pour une entreprise locale, apparaître dans les recherches « près de chez moi » change tout. Voici les leviers concrets du référencement local.",
    date: "2026-05-05",
    readingMinutes: 6,
    keywords: [
      "référencement local",
      "SEO local",
      "fiche Google Business",
      "être visible sur Google",
    ],
    body: [
      {
        type: "paragraph",
        text: "Quand un client cherche « ostéopathe Rouen » ou « plombier près de chez moi », Google met en avant des entreprises proches et bien renseignées. Pour une activité locale, ce référencement de proximité est souvent plus rentable que de viser des mots-clés nationaux très concurrentiels.",
      },
      {
        type: "heading",
        text: "1. Votre fiche d'établissement Google",
      },
      {
        type: "paragraph",
        text: "C'est le point de départ. Une fiche Google complète, à jour et vérifiée (adresse, horaires, téléphone, photos, description) augmente fortement vos chances d'apparaître dans la carte locale et le « pack » de résultats. C'est gratuit et l'impact est immédiat.",
      },
      {
        type: "list",
        items: [
          "Renseignez précisément votre activité et votre zone géographique.",
          "Ajoutez de vraies photos et gardez les horaires à jour.",
          "Répondez aux avis : cela renforce la confiance et le signal local.",
        ],
      },
      {
        type: "heading",
        text: "2. Un site cohérent avec votre zone",
      },
      {
        type: "paragraph",
        text: "Votre site doit indiquer clairement où vous intervenez. Mentionner votre ville et votre région dans les titres, les textes et les coordonnées aide Google à associer votre activité à un territoire. Une page de contact avec adresse et carte renforce ce lien.",
      },
      {
        type: "quote",
        text: "Le référencement local récompense la cohérence : mêmes nom, adresse et téléphone partout où vous apparaissez.",
      },
      {
        type: "heading",
        text: "3. Les avis et la réputation",
      },
      {
        type: "paragraph",
        text: "Les avis clients ne servent pas qu'à rassurer les visiteurs : leur nombre et leur régularité sont un signal pour le référencement local. Encourager vos clients satisfaits à laisser un avis, simplement et sans forcer, construit votre visibilité dans la durée.",
      },
      {
        type: "paragraph",
        text: "Bien fait, le référencement local apporte des contacts qualifiés, proches de vous et prêts à passer à l'action. Si vous voulez être mieux trouvé dans votre ville, parlons-en.",
      },
    ],
  },
  {
    slug: "automatiser-taches-repetitives",
    title: "Automatiser les tâches répétitives : par où commencer ?",
    description:
      "Devis, relances, saisies, transferts d'informations… Beaucoup de tâches manuelles peuvent être automatisées. Voici comment identifier les bonnes.",
    date: "2026-04-21",
    readingMinutes: 5,
    keywords: [
      "automatisation entreprise",
      "automatiser tâches",
      "gain de temps",
      "automatisation no-code",
    ],
    body: [
      {
        type: "paragraph",
        text: "Chaque semaine, une partie de votre temps part dans des tâches répétitives : recopier des informations d'un outil à un autre, envoyer les mêmes e-mails, relancer manuellement. Ces tâches sont rarement difficiles, mais elles s'accumulent. La bonne nouvelle : beaucoup peuvent être automatisées.",
      },
      {
        type: "heading",
        text: "Repérer ce qui mérite d'être automatisé",
      },
      {
        type: "paragraph",
        text: "Toutes les tâches ne se valent pas. Les meilleures candidates à l'automatisation sont répétitives, suivent des règles claires et n'exigent pas de jugement humain à chaque étape.",
      },
      {
        type: "list",
        items: [
          "Elle revient souvent (chaque jour, chaque commande, chaque client).",
          "Elle suit toujours les mêmes étapes prévisibles.",
          "Une erreur de saisie y a des conséquences coûteuses.",
          "Elle vous empêche de vous concentrer sur des tâches à plus forte valeur.",
        ],
      },
      {
        type: "quote",
        text: "Automatiser, ce n'est pas remplacer votre savoir-faire : c'est supprimer les frottements autour.",
      },
      {
        type: "heading",
        text: "Commencer petit, puis étendre",
      },
      {
        type: "paragraph",
        text: "Inutile de tout automatiser d'un coup. On commence par une tâche bien délimitée — par exemple connecter votre formulaire à votre messagerie et à un tableau de suivi — on vérifie que le gain est réel, puis on étend. Cette approche progressive limite les risques et montre vite des résultats concrets.",
      },
      {
        type: "paragraph",
        text: "Vous avez une tâche manuelle qui vous coûte du temps chaque semaine ? Décrivez-la nous : souvent, quelques heures de mise en place suffisent à en récupérer beaucoup d'autres.",
      },
    ],
  },
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
    slug: "combien-coute-site-internet",
    title: "How much does a professional website cost?",
    description:
      "The real answer depends on your goals, not on a single price tag. Here's what makes a website's cost vary and how to avoid bad surprises.",
    date: "2026-06-09",
    readingMinutes: 6,
    keywords: [
      "website cost",
      "website price",
      "marketing website pricing",
      "web project quote",
    ],
    body: [
      {
        type: "paragraph",
        text: "\"How much does a website cost?\" is the most common question, and \"it depends\" is the most frustrating answer. Yet it's an honest one: a website has no fixed price because it doesn't always answer the same need. Understanding what drives the cost helps you know where to invest.",
      },
      {
        type: "heading",
        text: "What actually drives the price",
      },
      {
        type: "list",
        items: [
          "The number of pages and the complexity of the content to structure.",
          "How custom the design is versus a pre-existing template.",
          "Features: simple form, booking, customer area, payment…",
          "The SEO and performance work built in from the start.",
          "Content creation (copy, photos) if it isn't provided.",
        ],
      },
      {
        type: "paragraph",
        text: "A clear few-page marketing site doesn't cost the same as a web app with booking and user accounts. It's not about \"expensive\" or \"cheap\", but about fit between the tool and the goal.",
      },
      {
        type: "heading",
        text: "The lowest-price trap",
      },
      {
        type: "paragraph",
        text: "A very cheap site often hides a deferred cost: slowness, no SEO, inability to evolve, or lock-in to a platform you don't control. Conversely, paying a lot guarantees nothing if the provider doesn't start from your goals. The right benchmark isn't the price, but what the site brings you.",
      },
      {
        type: "quote",
        text: "A website isn't a one-off expense: it's a tool that should generate leads or save you time.",
      },
      {
        type: "heading",
        text: "How to get a reliable quote",
      },
      {
        type: "paragraph",
        text: "A good quote isn't just an amount: it describes the scope, the deliverables, what's included (SEO, training, maintenance) and what isn't. The more clearly you express your goals, the more accurate the estimate. Share your business, your priorities and your timeline: that's the basis for an honest estimate.",
      },
      {
        type: "paragraph",
        text: "Want an estimate tailored to your project rather than a generic price? Describe your need and we'll come back with a scope and a concrete recommendation.",
      },
    ],
  },
  {
    slug: "referencement-local-google",
    title: "Local SEO: being visible on Google in your city",
    description:
      "For a local business, showing up in \"near me\" searches changes everything. Here are the concrete levers of local SEO.",
    date: "2026-05-05",
    readingMinutes: 6,
    keywords: [
      "local SEO",
      "Google Business Profile",
      "being visible on Google",
      "local search",
    ],
    body: [
      {
        type: "paragraph",
        text: "When a customer searches for \"osteopath Rouen\" or \"plumber near me\", Google highlights nearby, well-documented businesses. For a local activity, this proximity ranking is often more profitable than chasing highly competitive national keywords.",
      },
      {
        type: "heading",
        text: "1. Your Google Business Profile",
      },
      {
        type: "paragraph",
        text: "This is the starting point. A complete, up-to-date and verified Google profile (address, hours, phone, photos, description) strongly increases your chances of appearing in the local map and results \"pack\". It's free and the impact is immediate.",
      },
      {
        type: "list",
        items: [
          "Describe your activity and service area precisely.",
          "Add real photos and keep your opening hours current.",
          "Reply to reviews: it builds trust and the local signal.",
        ],
      },
      {
        type: "heading",
        text: "2. A site consistent with your area",
      },
      {
        type: "paragraph",
        text: "Your site should clearly state where you operate. Mentioning your city and region in titles, copy and contact details helps Google associate your business with a territory. A contact page with an address and map reinforces that link.",
      },
      {
        type: "quote",
        text: "Local SEO rewards consistency: the same name, address and phone everywhere you appear.",
      },
      {
        type: "heading",
        text: "3. Reviews and reputation",
      },
      {
        type: "paragraph",
        text: "Customer reviews don't only reassure visitors: their number and regularity are a signal for local SEO. Encouraging satisfied customers to leave a review, simply and without pressure, builds your visibility over time.",
      },
      {
        type: "paragraph",
        text: "Done well, local SEO brings qualified, nearby leads ready to take action. If you want to be found better in your city, let's talk.",
      },
    ],
  },
  {
    slug: "automatiser-taches-repetitives",
    title: "Automating repetitive tasks: where to start?",
    description:
      "Quotes, follow-ups, data entry, information transfers… Many manual tasks can be automated. Here's how to spot the right ones.",
    date: "2026-04-21",
    readingMinutes: 5,
    keywords: [
      "business automation",
      "automate tasks",
      "save time",
      "no-code automation",
    ],
    body: [
      {
        type: "paragraph",
        text: "Every week, part of your time goes into repetitive tasks: copying information from one tool to another, sending the same emails, following up manually. These tasks are rarely hard, but they add up. The good news: many can be automated.",
      },
      {
        type: "heading",
        text: "Spotting what's worth automating",
      },
      {
        type: "paragraph",
        text: "Not all tasks are equal. The best automation candidates are repetitive, follow clear rules and don't require human judgment at every step.",
      },
      {
        type: "list",
        items: [
          "It comes up often (every day, every order, every customer).",
          "It always follows the same predictable steps.",
          "A data-entry error there has costly consequences.",
          "It keeps you from focusing on higher-value work.",
        ],
      },
      {
        type: "quote",
        text: "Automating isn't about replacing your expertise: it's about removing the friction around it.",
      },
      {
        type: "heading",
        text: "Start small, then expand",
      },
      {
        type: "paragraph",
        text: "There's no need to automate everything at once. Start with one well-defined task — for example connecting your form to your inbox and a tracking sheet — check that the gain is real, then expand. This gradual approach limits risk and shows concrete results quickly.",
      },
      {
        type: "paragraph",
        text: "Do you have a manual task that costs you time every week? Describe it to us: often, a few hours of setup are enough to recover many more.",
      },
    ],
  },
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

// Articles suggérés (maillage interne) : les plus récents hors article courant.
export function getRelatedPosts(locale: Locale, slug: string, limit = 2): BlogPost[] {
  return getBlogPosts(locale)
    .filter((post) => post.slug !== slug)
    .slice(0, limit);
}

// Slugs partagés entre les locales — sert à generateStaticParams.
export function getBlogSlugs(): string[] {
  return frPosts.map((post) => post.slug);
}
