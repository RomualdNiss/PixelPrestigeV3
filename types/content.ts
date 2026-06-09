export type NavItem = {
  href: string;
  label: string;
};

export type HeroContent = {
  kicker: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
};

export type SeoContent = {
  title: string;
  description: string;
  keywords?: string[];
  openGraphTitle?: string;
  openGraphDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  image?: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  domain: string;
  challenge: string;
  impact: string;
  stack: string[];
};

export type ProcessStep = {
  title: string;
  detail: string;
};

export type Testimonial = {
  author: string;
  role?: string; // fonction et/ou société, ex. "Gérant, Consult Rénov"
  quote: string;
  rating?: number; // note sur 5
  source?: string; // ex. "Google"
  sourceUrl?: string; // lien vers l'avis d'origine
};

export type ClientLogo = {
  name: string; // nom du client (sert d'alt accessible)
  src: string; // chemin du logo dans /public
};

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string } // rendu en <h2>
  | { type: "subheading"; text: string } // rendu en <h3>
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string; // chapô + meta description
  date: string; // ISO, ex. "2026-06-02"
  readingMinutes?: number;
  keywords?: string[];
  image?: string; // visuel OG dédié (optionnel ; sinon fallback global)
  body: ArticleBlock[];
};

export type FitItem = {
  title: string;
  detail: string;
};

export type DetailCardItem = {
  eyebrow?: string;
  title: string;
  detail: string;
  bullets?: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type DifferentiatorItem = {
  title: string;
  detail: string;
};

export type ServicesPageContent = {
  seo: SeoContent;
  catalogTitle: string;
  catalogLead: string;
  situationsTitle: string;
  situationsLead: string;
  situationItems: DetailCardItem[];
  deliveryTitle: string;
  deliveryLead: string;
  deliveryItems: DetailCardItem[];
  faqTitle: string;
  faqLead: string;
  faq: FaqItem[];
  ctaTitle: string;
  ctaLead: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export type ProcessPageContent = {
  seo: SeoContent;
  timelineTitle: string;
  timelineLead: string;
  phaseTitle: string;
  phaseLead: string;
  phaseItems: DetailCardItem[];
  collaborationTitle: string;
  collaborationLead: string;
  collaborationItems: DetailCardItem[];
  standardsTitle: string;
  standardsLead: string;
  standardsItems: DetailCardItem[];
  faqTitle: string;
  faqLead: string;
  faq: FaqItem[];
  ctaTitle: string;
  ctaLead: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export type AboutPageContent = {
  seo: SeoContent;
  positioningTitle: string;
  positioningLead: string;
  positioningItems: DetailCardItem[];
  standardsTitle: string;
  standardsLead: string;
  standardsItems: DetailCardItem[];
  territoryTitle: string;
  territoryLead: string;
  territoryItems: DetailCardItem[];
  faqTitle: string;
  faqLead: string;
  faq: FaqItem[];
  ctaTitle: string;
  ctaLead: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export type Dictionary = {
  localeLabel: string;
  nav: NavItem[];
  footerText: string;
  home: {
    hero: HeroContent;
    seo?: SeoContent;
    trustLine: string[];
    servicesTitle: string;
    servicesLead: string;
    casesTitle: string;
    casesLead: string;
    logosTitle: string;
    testimonialsTitle: string;
    testimonialsLead: string;
    differentiatorsTitle: string;
    differentiatorsLead: string;
    differentiators: DifferentiatorItem[];
    processTitle: string;
    processLead: string;
    fitTitle: string;
    fitLead: string;
    finalCtaTitle: string;
    finalCtaLead: string;
    finalCtaButton: string;
  };
  servicesPage: {
    title: string;
    lead: string;
  };
  casesPage: {
    title: string;
    lead: string;
  };
  blogPage: {
    title: string;
    lead: string;
    readMore: string;
    backToList: string;
    minutesLabel: string; // ex. "min de lecture"
    empty: string; // message quand aucun article
    related: string; // titre section "À lire aussi"
    ctaTitle: string; // CTA de fin d'article
    ctaText: string;
  };
  processPage: {
    title: string;
    lead: string;
  };
  aboutPage: {
    title: string;
    lead: string;
    values: string[];
    stackTitle: string;
    stackItems: string[];
  };
  contactPage: {
    title: string;
    lead: string;
    responseInfo: string;
  };
  legalPage: {
    title: string;
  };
  privacyPage: {
    title: string;
  };
  common: {
    ctaProject: string;
    ctaCases: string;
    ctaContact: string;
    localeSwitch: string;
  };
  form: {
    name: string;
    email: string;
    company: string;
    projectType: string;
    message: string;
    submit: string;
    success: string;
    error: string;
    projectTypes: Record<"web" | "app" | "automation" | "other", string>;
  };
};

