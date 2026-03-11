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

export type GuaranteeItem = {
  label: string;
  value: string;
};

export type Dictionary = {
  localeLabel: string;
  nav: NavItem[];
  footerText: string;
  home: {
    hero: HeroContent;
    trustLine: string[];
    servicesTitle: string;
    servicesLead: string;
    casesTitle: string;
    casesLead: string;
    processTitle: string;
    processLead: string;
    guaranteesTitle: string;
    guaranteesLead: string;
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
    budget: string;
    message: string;
    submit: string;
    success: string;
    error: string;
    projectTypes: Record<"web" | "app" | "automation" | "other", string>;
  };
};

