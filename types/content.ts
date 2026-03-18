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

export type FitItem = {
  title: string;
  detail: string;
};

export type DifferentiatorItem = {
  title: string;
  detail: string;
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
    ctaCalendly: string;
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

