import type { Locale } from "@/lib/i18n";
import type {
  CaseStudy,
  Dictionary,
  GuaranteeItem,
  ProcessStep,
  ServiceItem,
} from "@/types/content";

type LocaleContent = {
  dictionary: Dictionary;
  services: ServiceItem[];
  cases: CaseStudy[];
  process: ProcessStep[];
  guarantees: GuaranteeItem[];
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
  footerText: "Pixel Prestige - Experiences digitales premium.",
  home: {
    hero: {
      kicker: "Agence web & apps haut de gamme",
      title: "Le digital qui marque, convertit et scale.",
      subtitle:
        "Sites vitrine, applications et automatisations sur mesure avec un rendu premium, rapide et maintenable.",
      primaryCta: "Demarrer mon projet",
      secondaryCta: "Voir les realisations",
    },
    trustLine: ["Next.js", "TypeScript", "R3F", "Automatisation API", "UX/UI"],
    servicesTitle: "Des offres claires pour accelerer vos resultats",
    servicesLead:
      "Chaque pack combine design, architecture propre et impact business concret.",
    casesTitle: "Realisations recentes",
    casesLead: "Des projets qui melangent precision technique et objectif conversion.",
    processTitle: "Une methode structuree, sans friction",
    processLead: "Cadrage, execution, optimisation continue: vous gardez la visibilite.",
    guaranteesTitle: "Des engagements mesurables",
    guaranteesLead: "Qualite, performance et accompagnement long terme.",
    finalCtaTitle: "Pret a lancer une experience digitale qui sort du lot ?",
    finalCtaLead: "Recevez une proposition claire en 48h avec vision produit, budget et roadmap.",
    finalCtaButton: "Parler de mon projet",
  },
  servicesPage: {
    title: "Services Pixel Prestige",
    lead: "Du site vitrine a la plateforme metier, nous construisons des solutions robustes et evolutives.",
  },
  casesPage: {
    title: "Realisations & cas clients",
    lead: "Une selection de projets menes avec exigence de design, performance et ROI.",
  },
  processPage: {
    title: "Notre process",
    lead: "Un cadre simple, des iterations rapides, une execution transparente.",
  },
  aboutPage: {
    title: "A propos de Pixel Prestige",
    lead: "Nous combinons ambition creative et rigueur d'ingenierie pour produire des experiences digitales memorables.",
    values: [
      "Precision technique et code propre",
      "Design orienté performance business",
      "Transparence sur les priorites et les delais",
      "Accompagnement post-livraison",
    ],
    stackTitle: "Stack et standards",
    stackItems: [
      "Next.js, TypeScript, R3F, Framer Motion, GSAP",
      "Architecture composable et design tokens",
      "SEO technique + optimisation Core Web Vitals",
      "Maintenance continue et evolutions produit",
    ],
  },
  contactPage: {
    title: "Parlons de votre prochain projet",
    lead: "Decrivez votre besoin, vos objectifs, et nous revenons avec une direction claire.",
    responseInfo: "Reponse sous 48h ouvrées.",
  },
  legalPage: {
    title: "Mentions legales",
  },
  privacyPage: {
    title: "Politique de confidentialite",
  },
  common: {
    ctaProject: "Demarrer un projet",
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
    budget: "Budget estimatif",
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
  footerText: "Pixel Prestige - Premium digital experiences.",
  home: {
    hero: {
      kicker: "Premium web & app agency",
      title: "Digital products that look sharp and perform harder.",
      subtitle:
        "Websites, apps and automations crafted to ship fast, scale cleanly and convert consistently.",
      primaryCta: "Start my project",
      secondaryCta: "See our work",
    },
    trustLine: ["Next.js", "TypeScript", "R3F", "API automation", "UX/UI"],
    servicesTitle: "Clear service pillars to move faster",
    servicesLead: "Each package blends design craft, solid architecture and business outcomes.",
    casesTitle: "Recent case studies",
    casesLead: "Projects built for impact, speed and long-term maintainability.",
    processTitle: "A sharp process, no noise",
    processLead: "Discovery, build and optimization in short focused loops.",
    guaranteesTitle: "Commitments you can measure",
    guaranteesLead: "Quality code, performance baseline and post-launch support.",
    finalCtaTitle: "Ready to launch a digital experience with real edge?",
    finalCtaLead: "Get a clear proposal in 48h with scope, budget range and timeline.",
    finalCtaButton: "Discuss my project",
  },
  servicesPage: {
    title: "Pixel Prestige services",
    lead: "From premium websites to custom products, we build digital systems made to last.",
  },
  casesPage: {
    title: "Work & case studies",
    lead: "A selection of projects delivered with strong visual identity and measurable outcomes.",
  },
  processPage: {
    title: "How we work",
    lead: "A pragmatic framework built for speed, clarity and quality.",
  },
  aboutPage: {
    title: "About Pixel Prestige",
    lead: "We combine bold product vision with disciplined engineering execution.",
    values: [
      "Craft-level implementation quality",
      "Design decisions tied to business goals",
      "Transparent project communication",
      "Long-term product partnership",
    ],
    stackTitle: "Stack & standards",
    stackItems: [
      "Next.js, TypeScript, R3F, Framer Motion, GSAP",
      "Component-first architecture and design tokens",
      "SEO and Core Web Vitals optimization",
      "Maintenance, analytics and evolution roadmap",
    ],
  },
  contactPage: {
    title: "Let us scope your next project",
    lead: "Share your context and goals, and we will reply with a concrete direction.",
    responseInfo: "Average response time: 48 business hours.",
  },
  legalPage: {
    title: "Legal notice",
  },
  privacyPage: {
    title: "Privacy policy",
  },
  common: {
    ctaProject: "Start a project",
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
    budget: "Budget range",
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
    id: "web",
    title: "Web",
    summary: "Sites vitrine premium, corporate et landing pages orientes conversion.",
    bullets: ["UX/UI sur mesure", "SEO technique", "Core Web Vitals"],
  },
  {
    id: "app",
    title: "App",
    summary: "Applications metier web avec architecture scalable et interfaces fluides.",
    bullets: ["Dashboard", "Espace client", "Workflows internes"],
  },
  {
    id: "product",
    title: "Produit digital",
    summary: "Conception produit, design system et iterations data-driven.",
    bullets: ["Discovery", "Prototypage", "Systeme de composants"],
  },
  {
    id: "automation",
    title: "Automatisation",
    summary: "Integrations API et automatisations pour gagner du temps operationnel.",
    bullets: ["Connecteurs", "No-code / low-code", "Maintenance evolutive"],
  },
];

const enServices: ServiceItem[] = [
  {
    id: "web",
    title: "Web",
    summary: "Premium websites, corporate platforms and conversion-first landing pages.",
    bullets: ["Custom UX/UI", "Technical SEO", "Core Web Vitals"],
  },
  {
    id: "app",
    title: "App",
    summary: "Business web applications with scalable architecture and smooth UX.",
    bullets: ["Dashboards", "Client portals", "Internal workflows"],
  },
  {
    id: "product",
    title: "Digital product",
    summary: "Product design, design systems and iterative delivery loops.",
    bullets: ["Discovery", "Prototyping", "Component systems"],
  },
  {
    id: "automation",
    title: "Automation",
    summary: "API integrations and automated flows to reduce operational friction.",
    bullets: ["Connectors", "No-code / low-code", "Continuous support"],
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
    detail: "Atelier de cadrage, objectifs business, priorisation produit.",
  },
  {
    title: "Conception",
    detail: "Wireframes, design direction, parcours, architecture technique.",
  },
  {
    title: "Build",
    detail: "Developpement incremental, QA continue, demos hebdomadaires.",
  },
  {
    title: "Scale",
    detail: "Optimisation performance, SEO, analytics et evolutions roadmap.",
  },
];

const enProcess: ProcessStep[] = [
  {
    title: "Discovery",
    detail: "Alignment workshop, business goals and scope prioritization.",
  },
  {
    title: "Design",
    detail: "Wireframes, design direction, journeys and technical architecture.",
  },
  {
    title: "Build",
    detail: "Incremental implementation, continuous QA and weekly demos.",
  },
  {
    title: "Scale",
    detail: "Performance tuning, SEO, analytics and roadmap iterations.",
  },
];

const frGuarantees: GuaranteeItem[] = [
  { label: "Delai moyen MVP", value: "4 a 8 semaines" },
  { label: "Performance cible", value: "Lighthouse > 90" },
  { label: "Temps de reponse", value: "< 48h" },
  { label: "Maintenance", value: "Support evolutif" },
];

const enGuarantees: GuaranteeItem[] = [
  { label: "Average MVP timeline", value: "4 to 8 weeks" },
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

