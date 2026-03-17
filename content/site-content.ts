import type { Locale } from "@/lib/i18n";
import type {
  CaseStudy,
  Dictionary,
  GuaranteeItem,
  ProcessStep,
  SeoContent,
  ServiceItem,
} from "@/types/content";

type LocaleContent = {
  dictionary: Dictionary;
  services: ServiceItem[];
  cases: CaseStudy[];
  process: ProcessStep[];
  guarantees: GuaranteeItem[];
};

const frHomeSeo: SeoContent = {
  title: "Pixel Prestige | Agence de developpement web / d'application à Rouen",
  description:
    "Pixel Prestige, agence de developpement à Rouen : sites web sur mesure, webapps, applications metier, SEO technique et strategie digitale pour renforcer votre presence en ligne.",
  keywords: [
    "agence developpement web Rouen",
    "agence webapp Rouen",
    "site internet sur mesure",
    "application metier",
    "webapp",
    "SEO technique",
    "strategie digitale",
    "presence en ligne",
    "Pixel Prestige",
    "developpement web",
  ],
  openGraphTitle: "Pixel Prestige - Agence de developpement web et d'applications à Rouen",
  openGraphDescription:
    "Sites web sur mesure, webapps, SEO technique et strategie digitale : un partenaire technique pour construire votre presence en ligne.",
  twitterTitle: "Pixel Prestige - Agence de developpement web",
  twitterDescription:
    "Sites web, webapps, applications metier et strategie digitale pour les entreprises qui veulent une presence en ligne solide.",
  image: "/assets/img/logo_complet.png",
};

const enHomeSeo: SeoContent = {
  title: "Pixel Prestige | Web development and app agency",
  description:
    "Pixel Prestige builds custom websites, web apps and digital presence strategies for companies that need clean execution and long-term support.",
  keywords: [
    "web development agency",
    "web app agency",
    "custom website development",
    "business web app",
    "technical SEO",
    "digital strategy",
    "online presence",
    "Pixel Prestige",
  ],
  openGraphTitle: "Pixel Prestige - Web development and app agency",
  openGraphDescription:
    "Custom websites, web apps, technical SEO and digital strategy delivered as one coherent service.",
  twitterTitle: "Pixel Prestige - Web development agency",
  twitterDescription:
    "A technical partner for custom websites, web apps and stronger digital presence.",
  image: "/assets/img/logo_complet.png",
};

const frDictionary: Dictionary = {
  localeLabel: "FR",
  nav: [
    { href: "/services", label: "Services" },
    { href: "/realisations", label: "Realisations" },
    { href: "/process", label: "Process" },
    { href: "/a-propos", label: "A propos" },
    { href: "/contact", label: "Contact" },
  ],
  footerText: "Pixel Prestige - Developpement web, webapps et presence digitale.",
  home: {
    hero: {
      kicker: "Agence de développement de solutions et de stratégie digitale",
      title: "Solutions digitales sur mesure",
      subtitle:
        "Nous concevons des solutions web claires, performantes et utiles pour renforcer votre présence en ligne et faire avancer votre activité.",
      primaryCta: "Parler de mon projet",
      secondaryCta: "Voir les réalisations",
    },
    seo: frHomeSeo,
    trustLine: ["Sites sur mesure", "Webapps metier", "SEO technique", "Strategie digitale", "Maintenance evolutive"],
    servicesTitle: "Un partenaire technique pour construire, lancer et faire evoluer votre presence en ligne",
    servicesLead:
      "Du site vitrine a la webapp metier, nous combinons developpement, UX et strategie digitale pour livrer des outils utiles, rapides et durables.",
    casesTitle: "Realisations recentes",
    casesLead: "Des projets menes avec exigence technique, lisibilite produit et impact business concret.",
    differentiatorsTitle: "Pourquoi travailler avec Pixel Prestige",
    differentiatorsLead:
      "Une agence technique a taille humaine, avec un cadre clair, des livrables propres et une attention reelle a l'impact business.",
    differentiators: [
      {
        title: "Un seul partenaire pour cadrer et produire",
        detail:
          "Cadrage, UX, developpement, mise en ligne et suivi sont relies dans le meme flux pour eviter les pertes de contexte.",
      },
      {
        title: "Des choix utiles avant des effets gratuits",
        detail:
          "Chaque page, composant et automatisation sert un objectif concret: clarifier l'offre, convertir ou faire gagner du temps.",
      },
      {
        title: "Des fondations propres pour evoluer",
        detail:
          "Performance, SEO technique, analytics, maintenabilite et evolutions futures sont pris en compte des le depart.",
      },
    ],
    processTitle: "Une methode claire, du cadrage a la mise en ligne",
    processLead: "Cadrage, conception, developpement et lancement dans un flux de travail simple et transparent.",
    guaranteesTitle: "Des engagements mesurables",
    guaranteesLead: "Un partenaire fiable pour livrer proprement, performer et suivre dans la duree.",
    finalCtaTitle: "Besoin d'un site, d'une webapp ou d'une strategie digitale plus claire ?",
    finalCtaLead: "Expliquez votre contexte, vos objectifs et vos priorites. Nous revenons avec une recommandation concrete, un perimetre et une feuille de route.",
    finalCtaButton: "Parler de votre projet",
  },
  servicesPage: {
    title: "Developpement web, webapp & strategie digitale",
    lead: "Sites web sur mesure, applications metier, presence en ligne et optimisation continue : nous construisons des outils utiles, rapides et evolutifs.",
  },
  casesPage: {
    title: "Realisations web & cas clients",
    lead: "Une selection de projets web et applicatifs livres avec exigence technique, performance et impact metier.",
  },
  processPage: {
    title: "Notre process de build",
    lead: "Une methode structuree pour cadrer, developper, lancer et faire evoluer chaque projet.",
  },
  aboutPage: {
    title: "A propos de Pixel Prestige",
    lead: "Pixel Prestige accompagne les entreprises qui ont besoin d'un partenaire capable de concevoir, developper et faire vivre leur presence en ligne, du site vitrine a la webapp metier.",
    values: [
      "Developpement propre, fiable et maintenable",
      "Interfaces pensees pour l'usage et la conversion",
      "Vision business, SEO et presence en ligne",
      "Accompagnement durable apres la mise en production",
    ],
    stackTitle: "Stack et standards",
    stackItems: [
      "Next.js, TypeScript et architectures web sur mesure",
      "API, automatisation et outils metier connectes",
      "SEO technique, performance et fondations analytics",
      "Maintenance, evolutions produit et support continu",
    ],
  },
  contactPage: {
    title: "Parlons de votre prochain projet",
    lead: "Decrivez le site, la webapp ou la strategie digitale que vous voulez lancer ou remettre a niveau.",
    responseInfo: "Reponse sous 48h ouvrées.",
  },
  legalPage: {
    title: "Mentions legales",
  },
  privacyPage: {
    title: "Politique de confidentialite",
  },
  common: {
    ctaProject: "Explorer les services",
    ctaCases: "Voir nos cas",
    ctaContact: "Nous contacter",
    ctaCalendly: "Prendre rendez-vous",
    localeSwitch: "Language",
  },
  form: {
    name: "Nom",
    email: "Email",
    company: "Entreprise",
    projectType: "Type de projet",
    message: "Message",
    submit: "Envoyer la demande",
    success: "Message envoye. Nous revenons vers vous rapidement.",
    error: "Impossible d'envoyer pour le moment. Merci de reessayer.",
    projectTypes: {
      web: "Site web",
      app: "Application",
      automation: "Automatisation",
      other: "Autre",
    },
  },
};

const enDictionary: Dictionary = {
  localeLabel: "EN",
  nav: [
    { href: "/services", label: "Services" },
    { href: "/realisations", label: "Work" },
    { href: "/process", label: "Process" },
    { href: "/a-propos", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  footerText: "Pixel Prestige - Web development, web apps and digital presence.",
  home: {
    hero: {
      kicker: "Digital solutions & strategy agency",
      title: "Custom digital solutions",
      subtitle:
        "We design clear, high-performing, and useful web solutions to strengthen your online presence and help your business move forward.",
      primaryCta: "Discuss my project",
      secondaryCta: "See our work",
    },
    seo: enHomeSeo,
    trustLine: ["Custom websites", "Business web apps", "Technical SEO", "Digital strategy", "Ongoing support"],
    servicesTitle: "One technical partner for build, launch and growth",
    servicesLead: "From showcase sites to business web apps, we combine development, UX and digital strategy to deliver useful systems that last.",
    casesTitle: "Recent case studies",
    casesLead: "Projects delivered with strong technical standards, clear product thinking and measurable business impact.",
    differentiatorsTitle: "Why work with Pixel Prestige",
    differentiatorsLead:
      "A lean technical agency setup with clear delivery, clean execution and decisions tied to actual business outcomes.",
    differentiators: [
      {
        title: "One partner from scoping to launch",
        detail:
          "Scoping, UX, development, launch and follow-up stay connected in one workflow, which reduces context loss and handoff friction.",
      },
      {
        title: "Useful decisions over empty flair",
        detail:
          "Each page, component and automation should support a concrete goal: clearer positioning, better conversion or smoother operations.",
      },
      {
        title: "Built on foundations that can grow",
        detail:
          "Performance, technical SEO, analytics, maintainability and future iteration are considered from the start.",
      },
    ],
    processTitle: "A clear process from scoping to launch",
    processLead: "Scoping, design, development and launch handled through a structured and transparent workflow.",
    guaranteesTitle: "Commitments you can measure",
    guaranteesLead: "Reliable delivery, measurable performance and support that continues after launch.",
    finalCtaTitle: "Need a website, a web app or a clearer digital presence?",
    finalCtaLead: "Share your context, goals and constraints. We will come back with a concrete recommendation, scope and roadmap.",
    finalCtaButton: "Discuss your project",
  },
  servicesPage: {
    title: "Web development, web apps & digital strategy",
    lead: "Custom websites, business web apps, digital presence and ongoing optimization delivered as one coherent service.",
  },
  casesPage: {
    title: "Web builds & case studies",
    lead: "A selection of web and application projects delivered with technical rigor, performance and business impact.",
  },
  processPage: {
    title: "How we build",
    lead: "A structured method to scope, build, launch and improve every project.",
  },
  aboutPage: {
    title: "About Pixel Prestige",
    lead: "Pixel Prestige helps companies design, build and strengthen their digital presence, from marketing websites to business web apps.",
    values: [
      "Clean, reliable and maintainable implementation",
      "Interfaces shaped for usability and conversion",
      "Business thinking, technical SEO and digital presence",
      "Long-term support after launch",
    ],
    stackTitle: "Stack & standards",
    stackItems: [
      "Next.js, TypeScript and tailored web architectures",
      "APIs, automation and connected business tools",
      "Technical SEO, performance and analytics foundations",
      "Maintenance, product evolution and continuous support",
    ],
  },
  contactPage: {
    title: "Let us scope your next project",
    lead: "Tell us about the website, web app or digital strategy you want to launch or upgrade.",
    responseInfo: "Average response time: 48 business hours.",
  },
  legalPage: {
    title: "Legal notice",
  },
  privacyPage: {
    title: "Privacy policy",
  },
  common: {
    ctaProject: "Explore services",
    ctaCases: "View case studies",
    ctaContact: "Contact us",
    ctaCalendly: "Book a call",
    localeSwitch: "Lang",
  },
  form: {
    name: "Name",
    email: "Email",
    company: "Company",
    projectType: "Project type",
    message: "Message",
    submit: "Send request",
    success: "Message sent. We will reach out quickly.",
    error: "Unable to send right now. Please try again.",
    projectTypes: {
      web: "Website",
      app: "Application",
      automation: "Automation",
      other: "Other",
    },
  },
};

const frServices: ServiceItem[] = [
  {
    id: "site",
    title: "Sites web sur mesure",
    summary: "Sites vitrines, corporate et landing pages penses pour la credibilite, la performance et la conversion.",
    bullets: ["Conception UX/UI", "Developpement sur mesure", "SEO technique"],
  },
  {
    id: "webapp",
    title: "Webapps & applications metier",
    summary: "Applications web, extranets, dashboards et outils internes concus pour vos usages quotidiens.",
    bullets: ["Espace client", "Tableaux de bord", "Architecture evolutive"],
  },
  {
    id: "growth",
    title: "Presence en ligne & strategie digitale",
    summary: "Structuration de votre presence digitale pour gagner en lisibilite, acquisition et coherence globale.",
    bullets: ["Positionnement", "Parcours & contenu", "Strategie digitale"],
  },
  {
    id: "support",
    title: "Maintenance & optimisation",
    summary: "Suivi technique, corrections, evolutions et optimisation continue apres la mise en ligne.",
    bullets: ["Maintenance", "Performance", "Accompagnement continu"],
  },
];

const enServices: ServiceItem[] = [
  {
    id: "site",
    title: "Custom websites",
    summary: "Showcase sites, corporate platforms and landing pages built for credibility, speed and conversion.",
    bullets: ["UX/UI design", "Custom development", "Technical SEO"],
  },
  {
    id: "webapp",
    title: "Web apps & business applications",
    summary: "Business web apps, client portals, dashboards and internal tools shaped around real workflows.",
    bullets: ["Client portals", "Dashboards", "Scalable architecture"],
  },
  {
    id: "growth",
    title: "Digital presence & strategy",
    summary: "A clearer online presence designed to support visibility, acquisition and overall consistency.",
    bullets: ["Positioning", "Content & journeys", "Digital strategy"],
  },
  {
    id: "support",
    title: "Maintenance & optimization",
    summary: "Technical follow-up, fixes, product iterations and ongoing optimization after launch.",
    bullets: ["Maintenance", "Performance", "Ongoing support"],
  },
];

const frCases: CaseStudy[] = [
  {
    slug: "atelier-luxe",
    title: "Atelier Luxe",
    domain: "E-commerce premium",
    challenge: "Repositionner l'image et augmenter les leads qualifies.",
    impact: "+37% de demandes qualifiees en 3 mois.",
    stack: ["Next.js", "Shopify API", "GA4"],
  },
  {
    slug: "nova-saas",
    title: "Nova SaaS",
    domain: "Plateforme B2B",
    challenge: "Fluidifier le parcours onboarding et clarifier l'offre.",
    impact: "Temps de prise en main reduit de 42%.",
    stack: ["React", "Node", "Design System"],
  },
  {
    slug: "healthflow",
    title: "HealthFlow",
    domain: "Automatisation metier",
    challenge: "Connecter CRM, facturation et support sans erreurs manuelles.",
    impact: "12h gagnees/semaine par equipe.",
    stack: ["APIs", "Automations", "Monitoring"],
  },
];

const enCases: CaseStudy[] = [
  {
    slug: "atelier-luxe",
    title: "Atelier Luxe",
    domain: "Premium e-commerce",
    challenge: "Reframe brand perception and increase qualified inbound leads.",
    impact: "+37% qualified requests in 3 months.",
    stack: ["Next.js", "Shopify API", "GA4"],
  },
  {
    slug: "nova-saas",
    title: "Nova SaaS",
    domain: "B2B platform",
    challenge: "Improve onboarding flow and sharpen value proposition clarity.",
    impact: "42% faster user onboarding.",
    stack: ["React", "Node", "Design System"],
  },
  {
    slug: "healthflow",
    title: "HealthFlow",
    domain: "Workflow automation",
    challenge: "Connect CRM, billing and support without manual errors.",
    impact: "12h saved per team/week.",
    stack: ["APIs", "Automations", "Monitoring"],
  },
];

const frProcess: ProcessStep[] = [
  {
    title: "Discovery",
    detail: "Atelier de cadrage, objectifs business, priorites fonctionnelles et positionnement digital.",
  },
  {
    title: "Conception",
    detail: "Architecture, UX/UI, contenus cle et parcours de conversion.",
  },
  {
    title: "Build",
    detail: "Developpement web ou applicatif, QA continue et validations iteratives.",
  },
  {
    title: "Lancement & optimisation",
    detail: "Mise en ligne, SEO technique, performance et evolutions continues.",
  },
];

const enProcess: ProcessStep[] = [
  {
    title: "Discovery",
    detail: "Scoping workshop, business goals, feature priorities and digital positioning.",
  },
  {
    title: "Design",
    detail: "Architecture, UX/UI, key content and conversion journeys.",
  },
  {
    title: "Build",
    detail: "Website or app development, continuous QA and iterative validation.",
  },
  {
    title: "Launch & optimize",
    detail: "Launch, technical SEO, performance tuning and ongoing evolution.",
  },
];

const frGuarantees: GuaranteeItem[] = [
  { label: "Delai moyen de lancement", value: "3 a 8 semaines" },
  { label: "Performance cible", value: "Lighthouse > 90" },
  { label: "Temps de reponse", value: "< 48h" },
  { label: "Maintenance", value: "Support evolutif" },
];

const enGuarantees: GuaranteeItem[] = [
  { label: "Typical launch window", value: "3 to 8 weeks" },
  { label: "Performance target", value: "Lighthouse > 90" },
  { label: "Response time", value: "< 48h" },
  { label: "Maintenance", value: "Continuous support" },
];

const contentByLocale: Record<Locale, LocaleContent> = {
  fr: {
    dictionary: frDictionary,
    services: frServices,
    cases: frCases,
    process: frProcess,
    guarantees: frGuarantees,
  },
  en: {
    dictionary: enDictionary,
    services: enServices,
    cases: enCases,
    process: enProcess,
    guarantees: enGuarantees,
  },
};

export function getLocaleContent(locale: Locale): LocaleContent {
  return contentByLocale[locale];
}
