import type { Locale } from "@/lib/i18n";
import type {
  AboutPageContent,
  CaseStudy,
  DetailCardItem,
  Dictionary,
  FaqItem,
  FitItem,
  ProcessPageContent,
  ProcessStep,
  SeoContent,
  ServiceItem,
  ServicesPageContent,
} from "@/types/content";

type LocaleContent = {
  dictionary: Dictionary;
  services: ServiceItem[];
  cases: CaseStudy[];
  process: ProcessStep[];
  fitItems: FitItem[];
  servicesPageContent: ServicesPageContent;
  processPageContent: ProcessPageContent;
  aboutPageContent: AboutPageContent;
};

const frHomeSeo: SeoContent = {
  title: "Pixel Prestige | Agence de développement web et d'applications à Rouen",
  description:
    "Pixel Prestige, agence de développement à Rouen : sites web sur mesure, applications web, applications métier, SEO technique et stratégie digitale pour renforcer votre présence en ligne.",
  keywords: [
    "agence développement web Rouen",
    "agence application web Rouen",
    "site internet sur mesure",
    "application métier",
    "application web",
    "SEO technique",
    "stratégie digitale",
    "présence en ligne",
    "Pixel Prestige",
    "développement web",
  ],
  openGraphTitle: "Pixel Prestige - Agence de développement web et d'applications à Rouen",
  openGraphDescription:
    "Sites web sur mesure, applications web, SEO technique et stratégie digitale : un partenaire technique pour construire votre présence en ligne.",
  twitterTitle: "Pixel Prestige - Agence de développement web",
  twitterDescription:
    "Sites web, applications web, applications métier et stratégie digitale pour les entreprises qui veulent une présence en ligne solide.",
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
    // { href: "/realisations", label: "Réalisations" },
    { href: "/process", label: "Méthode" },
    { href: "/a-propos", label: "À propos" },
    { href: "/contact", label: "Contact" },
  ],
  footerText: "Pixel Prestige - Développement web, applications web et présence digitale.",
  home: {
    hero: {
      kicker: "Agence de développement de solutions et de stratégie digitale",
      title: "Solutions digitales sur mesure",
      subtitle:
        "Nous concevons des solutions web claires, performantes et utiles pour renforcer votre présence en ligne et faire avancer votre activité.",
      primaryCta: "Parler de mon projet",
      secondaryCta: "Voir les services",
    },
    seo: frHomeSeo,
    trustLine: ["Sites sur mesure", "Applications métier", "SEO technique", "Stratégie digitale", "Maintenance évolutive"],
    servicesTitle: "Un partenaire technique pour construire, lancer et faire évoluer votre présence en ligne",
    servicesLead:
      "Du site vitrine à l'application web métier, nous combinons développement, expérience utilisateur et stratégie digitale pour livrer des outils utiles, rapides et durables.",
    casesTitle: "Réalisations récentes",
    casesLead: "Des projets menés avec exigence technique, lisibilité produit et impact business concret.",
    differentiatorsTitle: "Pourquoi travailler avec Pixel Prestige",
    differentiatorsLead:
      "Une agence technique à taille humaine, avec un cadre clair, des livrables propres et une attention réelle à l'impact business.",
    differentiators: [
      {
        title: "Un seul partenaire pour cadrer et produire",
        detail:
          "Cadrage, expérience utilisateur, développement, mise en ligne et suivi sont reliés dans le même flux pour éviter les pertes de contexte.",
      },
      {
        title: "Des choix utiles avant des effets gratuits",
        detail:
          "Chaque page, composant et automatisation sert un objectif concret : clarifier l'offre, convertir ou faire gagner du temps.",
      },
      {
        title: "Des fondations propres pour evoluer",
        detail:
          "Performance, SEO technique, mesure d'audience, maintenabilité et évolutions futures sont prises en compte dès le départ.",
      },
    ],
    processTitle: "Une méthode claire, du cadrage à la mise en ligne",
    processLead: "Cadrage, conception, développement et lancement dans un flux de travail simple et transparent.",
    fitTitle: "Quand faire appel à Pixel Prestige",
    fitLead:
      "Quand vous avez besoin d'un partenaire technique capable de cadrer, produire et faire évoluer votre présence en ligne sans multiplier les intermédiaires.",
    finalCtaTitle: "Besoin d'un site, d'une application web ou d'une stratégie digitale plus claire ?",
    finalCtaLead: "Expliquez votre contexte, vos objectifs et vos priorités. Nous revenons avec une recommandation concrète, un périmètre et une feuille de route.",
    finalCtaButton: "Parler de votre projet",
  },
  servicesPage: {
    title: "Développement web, applications web et stratégie digitale",
    lead: "Sites web sur mesure, applications web métier, présence en ligne et optimisation continue : nous construisons des outils utiles, rapides et évolutifs.",
  },
  casesPage: {
    title: "Réalisations web et cas clients",
    lead: "Une sélection de projets web et applicatifs livrés avec exigence technique, performance et impact métier.",
  },
  processPage: {
    title: "Notre méthode de travail",
    lead: "Une méthode structurée pour cadrer, développer, lancer et faire évoluer chaque projet.",
  },
  aboutPage: {
    title: "À propos de Pixel Prestige",
    lead: "Pixel Prestige accompagne les entreprises qui ont besoin d'un partenaire capable de concevoir, développer et faire vivre leur présence en ligne, du site vitrine à l'application web métier.",
    values: [
      "Développement propre, fiable et maintenable",
      "Interfaces pensées pour l'usage et la conversion",
      "Vision business, SEO et présence en ligne",
      "Accompagnement durable après la mise en production",
    ],
    stackTitle: "Socle technique et standards",
    stackItems: [
      "Next.js, TypeScript et architectures web sur mesure",
      "API, automatisation et outils métier connectés",
      "SEO technique, performance et fondations de mesure d'audience",
      "Maintenance, évolutions produit et accompagnement continu",
    ],
  },
  contactPage: {
    title: "Parlons de votre prochain projet",
    lead: "Décrivez le site, l'application web ou la stratégie digitale que vous voulez lancer ou remettre à niveau.",
    responseInfo: "Réponse sous 48 h ouvrées.",
  },
  legalPage: {
    title: "Mentions légales",
  },
  privacyPage: {
    title: "Politique de confidentialité",
  },
  common: {
    ctaProject: "Explorer les services",
    ctaCases: "Voir nos cas",
    ctaContact: "Nous contacter",
    ctaCalendly: "Prendre rendez-vous",
    localeSwitch: "Langue",
  },
  form: {
    name: "Nom",
    email: "E-mail",
    company: "Entreprise",
    projectType: "Type de projet",
    message: "Message",
    submit: "Envoyer la demande",
    success: "Message envoyé. Nous revenons vers vous rapidement.",
    error: "Impossible d'envoyer pour le moment. Merci de réessayer.",
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
    // { href: "/realisations", label: "Work" },
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
      secondaryCta: "See services",
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
    fitTitle: "When to bring in Pixel Prestige",
    fitLead:
      "When you need one technical partner to scope, build and improve your digital presence without multiplying handoffs.",
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
    summary: "Sites vitrines, institutionnels et pages d'atterrissage pensés pour la crédibilité, la performance et la conversion.",
    bullets: ["Conception d'interface", "Développement sur mesure", "SEO technique"],
  },
  {
    id: "webapp",
    title: "Applications web et applications métier",
    summary: "Applications web, extranets, tableaux de bord et outils internes conçus pour vos usages quotidiens.",
    bullets: ["Espace client", "Tableaux de bord", "Architecture évolutive"],
  },
  {
    id: "growth",
    title: "Présence en ligne et stratégie digitale",
    summary: "Structuration de votre présence digitale pour gagner en lisibilité, acquisition et cohérence globale.",
    bullets: ["Positionnement", "Parcours et contenu", "Stratégie digitale"],
  },
  {
    id: "support",
    title: "Maintenance et optimisation",
    summary: "Suivi technique, corrections, évolutions et optimisation continue après la mise en ligne.",
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
    challenge: "Repositionner l'image et augmenter les leads qualifiés.",
    impact: "+37 % de demandes qualifiées en 3 mois.",
    stack: ["Next.js", "Shopify API", "GA4"],
  },
  {
    slug: "nova-saas",
    title: "Nova SaaS",
    domain: "Plateforme B2B",
    challenge: "Fluidifier le parcours onboarding et clarifier l'offre.",
    impact: "Temps de prise en main réduit de 42 %.",
    stack: ["React", "Node", "Design System"],
  },
  {
    slug: "healthflow",
    title: "HealthFlow",
    domain: "Automatisation métier",
    challenge: "Connecter CRM, facturation et support sans erreurs manuelles.",
    impact: "12 h gagnées par semaine et par équipe.",
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
    title: "Cadrage",
    detail: "Atelier de cadrage, objectifs business, priorités fonctionnelles et positionnement digital.",
  },
  {
    title: "Conception",
    detail: "Architecture, interface, expérience utilisateur, contenus clés et parcours de conversion.",
  },
  {
    title: "Développement",
    detail: "Développement web ou applicatif, contrôle qualité continu et validations itératives.",
  },
  {
    title: "Lancement et optimisation",
    detail: "Mise en ligne, SEO technique, performance et évolutions continues.",
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

const frFitItems: FitItem[] = [
  {
    title: "Votre offre n'est pas assez claire en ligne",
    detail:
      "Positionnement flou, contenus dispersés, parcours peu lisible ou site qui ne reflète plus votre niveau d'exigence.",
  },
  {
    title: "Vous devez lancer ou refondre un site",
    detail: "Besoin d'un site vitrine propre, rapide, crédible et pensé pour mieux présenter l'offre et convertir.",
  },
  {
    title: "Vous avez un besoin métier plus spécifique",
    detail:
      "Espace client, extranet, automatisation, outil interne ou application web sur mesure à cadrer et développer proprement.",
  },
  {
    title: "Vous cherchez un partenaire durable",
    detail: "Maintenance, optimisation, SEO technique et évolutions continues après la mise en ligne.",
  },
];

const enFitItems: FitItem[] = [
  {
    title: "Your offer is not clear enough online",
    detail:
      "Unclear positioning, scattered content, confusing journeys or a site that no longer reflects your level of quality.",
  },
  {
    title: "You need to launch or rebuild a website",
    detail: "A clean, fast and credible marketing site built to present the offer clearly and convert better.",
  },
  {
    title: "You have a more specific business need",
    detail: "Client area, extranet, automation, internal tool or custom web app that needs proper scoping and execution.",
  },
  {
    title: "You want a long-term technical partner",
    detail: "Maintenance, optimisation, technical SEO and continuous evolution after launch.",
  },
];

const frServicesSituationItems: DetailCardItem[] = [
  {
    eyebrow: "Refonte",
    title: "Vous devez lancer ou refaire un site",
    detail:
      "Un site vitrine ou institutionnel doit mieux présenter l'activité, rassurer plus vite et soutenir le contact commercial.",
    bullets: ["Refonte complète", "Pages d'atterrissage", "Site institutionnel"],
  },
  {
    eyebrow: "Produit",
    title: "Vous avez un besoin d'application web ou d'outil métier",
    detail:
      "Espace client, extranet, tableau de bord, outil interne ou automatisation à cadrer et à produire proprement.",
    bullets: ["Application web sur mesure", "Automatisation", "Interface métier"],
  },
  {
    eyebrow: "Positionnement",
    title: "Votre présence en ligne manque de clarté",
    detail:
      "Offre mal formulée, pages trop faibles, discours dispersé ou site qui ne porte plus votre niveau d'exigence.",
    bullets: ["Clarifier l'offre", "Restructurer les parcours", "Renforcer la crédibilité"],
  },
  {
    eyebrow: "Continuité",
    title: "Vous cherchez un partenaire sur la durée",
    detail:
      "Le projet ne s'arrête pas à la mise en ligne : maintenance, optimisation, SEO technique et évolutions doivent rester pilotables.",
    bullets: ["Maintenance", "Optimisation continue", "Support évolutif"],
  },
];

const enServicesSituationItems: DetailCardItem[] = [
  {
    eyebrow: "Redesign",
    title: "You need to launch or rebuild a site",
    detail:
      "A showcase or corporate website needs to present the business more clearly, reassure faster and support commercial contact.",
    bullets: ["Full redesign", "Landing pages", "Corporate site"],
  },
  {
    eyebrow: "Product",
    title: "You need a web app or business tool",
    detail:
      "Client area, extranet, dashboard, internal tool or automation flow that needs proper scoping and clean execution.",
    bullets: ["Custom web app", "Automation", "Business interface"],
  },
  {
    eyebrow: "Positioning",
    title: "Your digital presence lacks clarity",
    detail:
      "An offer that is poorly framed, weak pages, scattered messaging or a site that no longer reflects your level of quality.",
    bullets: ["Clarify the offer", "Restructure journeys", "Strengthen credibility"],
  },
  {
    eyebrow: "Continuity",
    title: "You want a long-term partner",
    detail:
      "Launch is not the finish line: maintenance, optimisation, technical SEO and future iterations must stay manageable.",
    bullets: ["Maintenance", "Continuous optimisation", "Long-term support"],
  },
];

const frServicesDeliveryItems: DetailCardItem[] = [
  {
    title: "Un cadrage solide",
    detail:
      "Périmètre, priorités, objectifs, parcours et arbitrages sont clarifiés avant de produire pour éviter les décisions floues.",
    bullets: ["Atelier de cadrage", "Priorités réelles", "Feuille de route lisible"],
  },
  {
    title: "Un développement propre et cohérent",
    detail:
      "Interface, développement, structure de pages, composants et contenus avancent dans le même sens au lieu d'être traités en silos.",
    bullets: ["Interface cohérente", "Code maintenable", "Flux de production clair"],
  },
  {
    title: "Du SEO et des performances",
    detail:
      "Structure, rapidité, balisage, métadonnées et lisibilité technique sont travaillés tôt pour ne pas être rajoutés à la fin.",
    bullets: ["SEO technique", "Performance web", "Base de mesure"],
  },
  {
    title: "Une suite exploitable après lancement",
    detail:
      "Le site ou l'application web doit rester évolutif, observable et simple à faire progresser, que vous soyez à Rouen, en Normandie ou ailleurs.",
    bullets: ["Maintenance", "Évolutions", "Pilotage durable"],
  },
];

const enServicesDeliveryItems: DetailCardItem[] = [
  {
    title: "Solid scoping",
    detail:
      "Scope, priorities, goals, journeys and tradeoffs are clarified before production so the project does not drift on vague decisions.",
    bullets: ["Scoping workshop", "Real priorities", "Clear roadmap"],
  },
  {
    title: "Clean and coherent execution",
    detail:
      "UI, development, page structure, components and content move in the same direction instead of being handled as disconnected workstreams.",
    bullets: ["Consistent interface", "Maintainable code", "Clear production flow"],
  },
  {
    title: "SEO and performance",
    detail:
      "Structure, speed, markup, metadata and technical readability are handled early instead of being bolted on at the end.",
    bullets: ["Technical SEO", "Web performance", "Analytics baseline"],
  },
  {
    title: "A launch that remains workable after release",
    detail:
      "The site or web app should stay easy to evolve, monitor and improve whether you are based in Rouen, Normandy or elsewhere.",
    bullets: ["Maintenance", "Iterations", "Long-term steering"],
  },
];

const frServicesFaq: FaqItem[] = [
  {
    question: "Quels services Pixel Prestige couvre concrètement ?",
    answer:
      "Pixel Prestige intervient sur les sites web sur mesure, les applications web, les parcours utilisateurs, le SEO technique, la performance, les automatisations et la maintenance évolutive.",
  },
  {
    question: "A qui s'adresse la page services ?",
    answer:
      "À des entreprises qui ont besoin soit de mieux présenter leur offre en ligne, soit de lancer un outil web plus spécifique, soit de fiabiliser et faire évoluer un existant.",
  },
  {
    question: "Travaillez-vous seulement à Rouen ou en Normandie ?",
    answer:
      "Non. Pixel Prestige est ancré à Rouen et en Normandie, mais l'accompagnement est pensé pour des projets plus larges, partout en France, tant que le besoin demande un partenaire technique exigeant.",
  },
  {
    question: "Est-ce seulement du développement ?",
    answer:
      "Non. Le travail couvre aussi le cadrage, la clarté de l'offre, la structure des pages, les parcours, la conversion, le SEO technique et les évolutions après mise en ligne.",
  },
];

const enServicesFaq: FaqItem[] = [
  {
    question: "What does Pixel Prestige actually cover?",
    answer:
      "Pixel Prestige covers custom websites, web apps, journey UX, technical SEO, performance, automation and ongoing maintenance.",
  },
  {
    question: "Who is the services page for?",
    answer:
      "It is for companies that need to present their offer more clearly online, launch a more specific web product, or stabilise and improve an existing setup.",
  },
  {
    question: "Do you only work in Rouen or Normandy?",
    answer:
      "No. Pixel Prestige is based in Rouen, Normandy, but the offer is designed for broader projects across France whenever a company needs a demanding technical partner.",
  },
  {
    question: "Is this only about development?",
    answer:
      "No. The work also covers scoping, offer clarity, page structure, user journeys, conversion, technical SEO and post-launch evolution.",
  },
];

const frProcessPhaseItems: DetailCardItem[] = [
  {
    eyebrow: "Étape 1",
    title: "Cadrage : clarifier avant de produire",
    detail:
      "Cette phase sert à comprendre l'activité, les priorités, les contraintes et la place du projet dans la présence en ligne globale.",
    bullets: ["Objectifs business", "Périmètre utile", "Points de friction identifiés"],
  },
  {
    eyebrow: "Étape 2",
    title: "Conception : rendre le projet lisible",
    detail:
      "Architecture, parcours, contenus clés et logique d'interface sont travaillés pour que l'outil ou le site gagne en clarté avant le développement.",
    bullets: ["Arborescence", "Interface et expérience utilisateur", "Parcours de conversion"],
  },
  {
    eyebrow: "Étape 3",
    title: "Développement : produire sans perdre le fil",
    detail:
      "Le développement avance sur une base claire, avec validations itératives et attention continue à la qualité du rendu comme du code.",
    bullets: ["Développement sur mesure", "Contrôle qualité continu", "Validations progressives"],
  },
  {
    eyebrow: "Étape 4",
    title: "Lancement : mettre en ligne puis faire évoluer",
    detail:
      "Le lancement prépare aussi l'après : SEO technique, performance, suivi, maintenance et prochaines évolutions.",
    bullets: ["Mise en ligne", "Optimisation", "Suite du projet"],
  },
];

const enProcessPhaseItems: DetailCardItem[] = [
  {
    eyebrow: "Step 1",
    title: "Discovery: scope before building",
    detail:
      "This phase clarifies the business, priorities, constraints and the exact role of the project in the wider digital presence.",
    bullets: ["Business goals", "Useful scope", "Known friction points"],
  },
  {
    eyebrow: "Step 2",
    title: "Design: make the project legible",
    detail:
      "Architecture, journeys, key content and interface logic are shaped before build so the product becomes clear before it becomes complex.",
    bullets: ["Information architecture", "UX/UI", "Conversion journeys"],
  },
  {
    eyebrow: "Step 3",
    title: "Build: execute without losing the thread",
    detail:
      "Development moves forward on a clear basis, with iterative validation and ongoing attention to both output quality and code quality.",
    bullets: ["Custom development", "Continuous QA", "Progressive validation"],
  },
  {
    eyebrow: "Step 4",
    title: "Launch: release, then improve",
    detail:
      "Launch also prepares what comes next: technical SEO, performance, analytics, maintenance and the next product iterations.",
    bullets: ["Release", "Optimisation", "Next steps"],
  },
];

const frProcessCollaborationItems: DetailCardItem[] = [
  {
    title: "Les arbitrages sont posés tôt",
    detail:
      "Le projet avance mieux quand les priorités réelles sont tranchées tôt : ce qui est critique, ce qui peut attendre, ce qui ne sert pas le résultat.",
  },
  {
    title: "Le client garde de la visibilité",
    detail:
      "Vous savez où en est le projet, ce qui est validé, ce qui reste à produire et quels sujets demandent une décision.",
  },
  {
    title: "Le rythme doit rester tenable",
    detail:
      "L'objectif n'est pas de complexifier la méthode, mais de garder un flux simple, lisible et praticable pour les deux parties.",
  },
];

const enProcessCollaborationItems: DetailCardItem[] = [
  {
    title: "Tradeoffs are made early",
    detail:
      "Projects move better when real priorities are settled early: what is critical, what can wait and what does not serve the outcome.",
  },
  {
    title: "The client keeps visibility",
    detail:
      "You know where the project stands, what is validated, what remains to be produced and which points need a decision.",
  },
  {
    title: "The pace must stay workable",
    detail:
      "The goal is not to over-process the work, but to keep a workflow that stays clear, simple and practical for both sides.",
  },
];

const frProcessStandardsItems: DetailCardItem[] = [
  {
    title: "Des livrables reliés entre eux",
    detail:
      "Cadrage, conception, développement, SEO technique et lancement ne sont pas traités comme des couches séparées, mais comme un même système.",
  },
  {
    title: "Une exécution maintenable",
    detail:
      "Le projet doit pouvoir être relu, corrigé, optimisé et faire l'objet d'évolutions sans repartir de zéro à chaque nouveau besoin.",
  },
  {
    title: "Une mise en ligne préparée",
    detail:
      "La performance, les métadonnées, le suivi et la propreté générale du rendu font partie de la méthode, pas d'une liste de dernière minute.",
  },
];

const enProcessStandardsItems: DetailCardItem[] = [
  {
    title: "Deliverables that connect together",
    detail:
      "Scoping, design, development, technical SEO and launch are not treated as isolated layers but as one coherent system.",
  },
  {
    title: "Maintainable execution",
    detail:
      "The project should stay readable, fixable, optimisable and extensible without restarting from zero every time a new need appears.",
  },
  {
    title: "A prepared launch",
    detail:
      "Performance, metadata, tracking and overall delivery quality are part of the process, not a last-minute checklist.",
  },
];

const frProcessFaq: FaqItem[] = [
  {
    question: "Pourquoi dédier une page complète à la méthode ?",
    answer:
      "Parce que la méthode fait partie de la valeur perçue du projet. Un bon résultat vient autant de la façon de cadrer et d'exécuter que de la qualité du développement lui-même.",
  },
  {
    question: "Le client doit-il tout préparer avant de commencer ?",
    answer:
      "Non. Justement, la phase de cadrage sert à clarifier le besoin, identifier les zones floues et poser ce qu'il faut décider avant d'entrer en développement.",
  },
  {
    question: "La méthode change-t-elle selon un site ou une application web ?",
    answer:
      "La structure générale reste la même, mais le niveau de cadrage, la profondeur fonctionnelle et les validations varient selon la nature du projet.",
  },
  {
    question: "Comment le SEO s'intègre-t-il dans la méthode ?",
    answer:
      "Le SEO technique est pris en compte tôt dans la structure, la performance, les métadonnées et la propreté globale du site, plutôt qu'ajouté après coup.",
  },
];

const enProcessFaq: FaqItem[] = [
  {
    question: "Why dedicate a full page to the process?",
    answer:
      "Because process is part of the project value. Strong outcomes depend as much on how scoping and execution are handled as on development quality itself.",
  },
  {
    question: "Does the client need to prepare everything before starting?",
    answer:
      "No. Discovery is precisely there to clarify the need, surface uncertainties and identify what must be decided before build starts.",
  },
  {
    question: "Does the process change for a site versus a web app?",
    answer:
      "The overall structure stays the same, but the scoping depth, functional complexity and validation rhythm change depending on the project.",
  },
  {
    question: "How does SEO fit into the process?",
    answer:
      "Technical SEO is considered early through structure, performance, metadata and overall technical cleanliness instead of being added later.",
  },
];

const frAboutPositioningItems: DetailCardItem[] = [
  {
    title: "Un partenaire unique pour cadrer et produire",
    detail:
      "Pixel Prestige relie cadrage, expérience utilisateur, développement, SEO technique et lancement pour éviter les ruptures de contexte entre plusieurs prestataires.",
  },
  {
    title: "Une approche plus utile que démonstrative",
    detail:
      "L'objectif n'est pas d'accumuler des effets, mais de clarifier l'offre, rendre le parcours plus lisible et soutenir le développement réel de l'activité.",
  },
  {
    title: "Une exigence qui continue après la mise en ligne",
    detail:
      "Le niveau de qualité attendu doit tenir dans la durée : maintenance, évolution, optimisation et accompagnement restent dans le périmètre.",
  },
];

const enAboutPositioningItems: DetailCardItem[] = [
  {
    title: "One partner to scope and deliver",
    detail:
      "Pixel Prestige connects scoping, UX, development, technical SEO and launch so the project does not suffer from repeated handoff losses.",
  },
  {
    title: "A more useful approach than a performative one",
    detail:
      "The goal is not to stack visual tricks, but to clarify the offer, improve journey readability and support actual business progress.",
  },
  {
    title: "Standards that continue after launch",
    detail:
      "The expected level of quality has to survive launch: maintenance, evolution, optimisation and follow-up remain part of the picture.",
  },
];

const frAboutStandardsItems: DetailCardItem[] = [
  {
    title: "Socle technique moderne et maintenable",
    detail:
      "Next.js, TypeScript et des architectures pensées pour tenir dans le temps plutôt que pour impressionner sur une courte démonstration.",
  },
  {
    title: "Performance, SEO technique et structure",
    detail:
      "Le travail vise des pages rapides, propres, lisibles par les moteurs et faciles à faire évoluer ensuite.",
  },
  {
    title: "Logique produit et logique business",
    detail:
      "Une page ou une fonctionnalité n'est pas jugée seulement sur son rendu, mais sur sa capacité à mieux servir l'offre et l'usage.",
  },
];

const enAboutStandardsItems: DetailCardItem[] = [
  {
    title: "A modern and maintainable web stack",
    detail:
      "Next.js, TypeScript and architectures designed to last instead of only looking impressive during a short demo.",
  },
  {
    title: "Performance, technical SEO and structure",
    detail:
      "The work aims for fast pages, clean foundations, search-friendly structure and systems that stay easy to evolve later.",
  },
  {
    title: "Product thinking tied to business goals",
    detail:
      "A page or feature is not judged only on visuals, but on how well it supports the offer and the real user workflow.",
  },
];

const frAboutTerritoryItems: DetailCardItem[] = [
  {
    title: "Un ancrage clair à Rouen",
    detail:
      "Pixel Prestige assume un point d'ancrage local à Rouen, utile pour les entreprises qui veulent un partenaire proche et compréhensible.",
  },
  {
    title: "Une présence plus large en Normandie",
    detail:
      "L'agence peut naturellement travailler avec des structures basées en Normandie qui cherchent un niveau d'exécution plus exigeant sur le web.",
  },
  {
    title: "Un cadre qui fonctionne aussi à distance",
    detail:
      "Le mode de travail reste adapté à des projets hors région, tant que la relation, le périmètre et les priorités sont bien posés.",
  },
];

const enAboutTerritoryItems: DetailCardItem[] = [
  {
    title: "A clear base in Rouen",
    detail:
      "Pixel Prestige has a local base in Rouen, which matters for companies that want a nearby partner who understands their context.",
  },
  {
    title: "A broader presence in Normandy",
    detail:
      "The agency can naturally support businesses across Normandy looking for stronger technical and strategic execution on the web.",
  },
  {
    title: "A workflow that also works remotely",
    detail:
      "The collaboration model also fits projects outside the region as long as scope, priorities and the working relationship are clearly framed.",
  },
];

const frAboutFaq: FaqItem[] = [
  {
    question: "Qu'est-ce qui différencie Pixel Prestige d'une agence web plus classique ?",
    answer:
      "Le positionnement est plus resserré : moins de dispersion, plus de cadrage, plus de cohérence entre stratégie, réalisation web, SEO technique et suite du projet.",
  },
  {
    question: "Travaillez-vous uniquement avec des entreprises locales ?",
    answer:
      "Non. L'ancrage à Rouen et en Normandie compte, mais l'offre n'est pas limitée à ce territoire. Le niveau d'exigence et la clarté du besoin priment.",
  },
  {
    question: "Est-ce que Pixel Prestige convient a une petite structure ?",
    answer:
      "Oui, si le besoin demande un vrai cadrage, une exécution propre et une volonté de construire quelque chose de durable plutôt qu'un simple site vite posé.",
  },
  {
    question: "Peut-on vous confier seulement une partie du projet ?",
    answer:
      "Oui, mais la valeur la plus forte apparaît quand cadrage, développement et optimisation restent reliés. Sinon le travail porte au minimum sur un périmètre clair et responsabilisant.",
  },
];

const enAboutFaq: FaqItem[] = [
  {
    question: "What makes Pixel Prestige different from a more typical web agency?",
    answer:
      "The positioning is tighter: less dispersion, more scoping discipline and stronger coherence between strategy, web execution, technical SEO and what happens after launch.",
  },
  {
    question: "Do you only work with local businesses?",
    answer:
      "No. The Rouen and Normandy base matters, but the offer is not restricted to that territory. The level of need and the quality of the collaboration matter more.",
  },
  {
    question: "Is Pixel Prestige a fit for a smaller business?",
    answer:
      "Yes, if the need requires real scoping, clean execution and the intention to build something durable instead of a quickly assembled site.",
  },
  {
    question: "Can you take only one part of a project?",
    answer:
      "Yes, but the strongest value usually appears when scoping, build and optimisation remain connected. Otherwise the engagement still needs a clear and accountable scope.",
  },
];

const frServicesPageContent: ServicesPageContent = {
  seo: {
    title: "Services web sur mesure, applications web et SEO technique",
    description:
      "Sites web sur mesure, applications web, SEO technique, automatisation et accompagnement durable pour les entreprises qui veulent une présence digitale claire et crédible. Basé à Rouen, intervention en Normandie et partout en France.",
    keywords: [
      "services développement web",
      "création site sur mesure",
      "application web sur mesure",
      "seo technique",
      "agence web Rouen",
      "agence digitale Normandie",
      "maintenance site web",
    ],
    openGraphTitle: "Services Pixel Prestige: sites web, applications web et SEO technique",
    openGraphDescription:
      "Une page services plus détaillée pour comprendre ce que Pixel Prestige prend en charge, pour quels besoins et avec quel niveau d'exigence.",
    twitterTitle: "Services Pixel Prestige",
    twitterDescription:
      "Sites web sur mesure, applications web, SEO technique et accompagnement durable depuis Rouen vers la Normandie et au-delà.",
    image: "/assets/img/logo_complet.png",
  },
  catalogTitle: "Les interventions principales",
  catalogLead:
    "Le point commun entre ces services : clarifier l'offre, produire proprement et laisser un socle qui reste utile après la mise en ligne.",
  situationsTitle: "Quand faire appel à Pixel Prestige devient la bonne solution",
  situationsLead:
    "Elle s'adresse à des entreprises qui ont un besoin concret.",
  situationItems: frServicesSituationItems,
  deliveryTitle: "Ce que vous obtenez au-delà du livrable final",
  deliveryLead:
    "Un livrable, c'est bien, mais une bonne exécution et de la maintenabilité, c'est encore mieux.",
  deliveryItems: frServicesDeliveryItems,
  faqTitle: "Questions fréquentes sur les services",
  faqLead:
    "Quelques réponses utiles pour comprendre le périmètre réel des interventions Pixel Prestige.",
  faq: frServicesFaq,
  ctaTitle: "Besoin de clarifier le bon périmètre avant de lancer ?",
  ctaLead:
    "Partez d'un besoin, d'un blocage ou d'un objectif. Pixel Prestige revient avec un cadrage plus net et une direction exploitable.",
  ctaPrimary: "Parler de votre projet",
  ctaSecondary: "Voir la méthode",
};

const enServicesPageContent: ServicesPageContent = {
  seo: {
    title: "Custom web services, web apps and technical SEO",
    description:
      "Custom websites, web apps, technical SEO, automation and long-term support for companies that need a clearer and more credible digital presence. Based in Rouen, working across Normandy and France.",
    keywords: [
      "custom web services",
      "custom website development",
      "business web app",
      "technical SEO",
      "web agency Rouen",
      "digital agency Normandy",
      "website maintenance",
    ],
    openGraphTitle: "Pixel Prestige services: websites, web apps and technical SEO",
    openGraphDescription:
      "A detailed services page explaining what Pixel Prestige covers, for which kinds of needs, and with what level of execution.",
    twitterTitle: "Pixel Prestige services",
    twitterDescription:
      "Custom websites, web apps, technical SEO and long-term support from Rouen to Normandy and beyond.",
    image: "/assets/img/logo_complet.png",
  },
  catalogTitle: "Core interventions",
  catalogLead:
    "The common thread across these services is simple: clarify the offer, execute cleanly and leave a foundation that stays useful after launch.",
  situationsTitle: "When bringing in Pixel Prestige becomes the right move",
  situationsLead:
    "This page is for companies with a concrete need.",
  situationItems: enServicesSituationItems,
  deliveryTitle: "What you get beyond the final deliverable",
  deliveryLead:
    "A deliverable is good, but strong execution and maintainability are even better.",
  deliveryItems: enServicesDeliveryItems,
  faqTitle: "Frequently asked questions about the services",
  faqLead: "A few useful answers to clarify the real scope of Pixel Prestige engagements.",
  faq: enServicesFaq,
  ctaTitle: "Need to define the right scope before moving?",
  ctaLead:
    "Start from a need, a blocker or an objective. Pixel Prestige can come back with a sharper scope and a workable direction.",
  ctaPrimary: "Discuss your project",
  ctaSecondary: "See the process",
};

const frProcessPageContent: ProcessPageContent = {
  seo: {
    title: "Méthode web et application web : cadrage, développement et lancement",
    description:
      "Découvrez comment Pixel Prestige cadre, conçoit, développe et lance un site web ou une application web, avec une méthode claire, orientée exécution, SEO technique et évolutions durables.",
    keywords: [
      "méthode agence web",
      "cadrage projet web",
      "méthode développement application web",
      "lancement site web",
      "seo technique projet web",
      "agence web Rouen",
    ],
    openGraphTitle: "La méthode Pixel Prestige : cadrage, conception, développement et lancement",
    openGraphDescription:
      "Une page dédiée à la méthode pour comprendre comment un projet web avance de façon claire, maintenable et orientée résultat.",
    twitterTitle: "La méthode Pixel Prestige",
    twitterDescription:
      "Cadrage, conception, développement et lancement avec une méthode claire, depuis Rouen vers des projets en Normandie et partout en France.",
    image: "/assets/img/logo_complet.png",
  },
  timelineTitle: "La méthode en 4 temps",
  timelineLead:
    "Ce découpage donne la structure générale. Les sections suivantes expliquent ce que chaque phase produit vraiment et comment la collaboration reste lisible.",
  phaseTitle: "Ce que chaque phase fait avancer",
  phaseLead:
    "La méthode n'est pas une vitrine. Chaque étape a une fonction concrète dans la qualité finale du site ou de l'application web.",
  phaseItems: frProcessPhaseItems,
  collaborationTitle: "Comment la collaboration reste tenable",
  collaborationLead:
    "Une bonne méthode doit apporter de la clarté, pas de la lourdeur supplémentaire.",
  collaborationItems: frProcessCollaborationItems,
  standardsTitle: "Ce qui garde le projet propre",
  standardsLead:
    "Ces points font la différence entre un projet qui tient dans le temps et un projet qui se dégrade dès la mise en ligne.",
  standardsItems: frProcessStandardsItems,
  faqTitle: "Questions fréquentes sur la méthode",
  faqLead: "Les points qui reviennent le plus souvent avant de lancer un projet web ou applicatif.",
  faq: frProcessFaq,
  ctaTitle: "Vous voulez un projet mieux cadré avant même de produire ?",
  ctaLead:
    "Le meilleur moyen de gagner du temps n'est pas d'aller plus vite au hasard, mais de clarifier les décisions critiques dès le départ.",
  ctaPrimary: "Parler de votre projet",
  ctaSecondary: "Explorer les services",
};

const enProcessPageContent: ProcessPageContent = {
  seo: {
    title: "Web and web app process: scope, build and launch",
    description:
      "See how Pixel Prestige scopes, designs, builds and launches websites or web apps through a clear method shaped around execution quality, technical SEO and long-term evolution.",
    keywords: [
      "web agency process",
      "web project scoping",
      "web app delivery process",
      "website launch process",
      "technical SEO workflow",
      "web agency Rouen",
    ],
    openGraphTitle: "The Pixel Prestige process: scope, design, build and launch",
    openGraphDescription:
      "A dedicated process page explaining how a web project moves forward with clarity, maintainability and business focus.",
    twitterTitle: "The Pixel Prestige process",
    twitterDescription:
      "Scope, design, build and launch with a clear method from Rouen to Normandy and broader French projects.",
    image: "/assets/img/logo_complet.png",
  },
  timelineTitle: "The process in 4 stages",
  timelineLead:
    "The timeline gives the global structure. The next sections explain what each phase actually produces and how the collaboration stays readable.",
  phaseTitle: "What each phase moves forward",
  phaseLead:
    "The process is not there for show. Each stage has a concrete role in the final quality of the website or web app.",
  phaseItems: enProcessPhaseItems,
  collaborationTitle: "How the collaboration stays workable",
  collaborationLead:
    "A good process should create clarity, not add unnecessary weight on top of the project.",
  collaborationItems: enProcessCollaborationItems,
  standardsTitle: "What keeps the project clean",
  standardsLead:
    "These are the points that separate a project that lasts from one that starts degrading right after launch.",
  standardsItems: enProcessStandardsItems,
  faqTitle: "Frequently asked questions about the process",
  faqLead: "The questions that tend to come up before starting a web or application project.",
  faq: enProcessFaq,
  ctaTitle: "Want a better-scoped project before production even starts?",
  ctaLead:
    "The best way to save time is not to move faster blindly, but to clarify the critical decisions from the start.",
  ctaPrimary: "Discuss your project",
  ctaSecondary: "Explore services",
};

const frAboutPageContent: AboutPageContent = {
  seo: {
    title: "À propos de Pixel Prestige, agence web et applications web à Rouen",
    description:
      "Découvrez le positionnement de Pixel Prestige : une agence web et applications web basée à Rouen, active en Normandie et au-delà, avec une approche exigeante du cadrage, du développement et du SEO technique.",
    keywords: [
      "à propos agence web Rouen",
      "agence web Rouen",
      "agence digitale Normandie",
      "application web sur mesure",
      "seo technique",
      "partenaire technique",
    ],
    openGraphTitle: "À propos de Pixel Prestige",
    openGraphDescription:
      "Une page À propos plus détaillée pour comprendre le positionnement, les standards et l'ancrage de Pixel Prestige.",
    twitterTitle: "À propos de Pixel Prestige",
    twitterDescription:
      "Agence web et applications web basée à Rouen, avec un positionnement exigeant sur le cadrage, le développement et l'accompagnement durable.",
    image: "/assets/img/logo_complet.png",
  },
  positioningTitle: "Le type de partenaire que Pixel Prestige veut être",
  positioningLead:
    "Pas une agence qui multiplie les couches, les intermédiaires et les pertes de contexte, mais un partenaire technique capable de cadrer, produire et faire évoluer un projet utile.",
  positioningItems: frAboutPositioningItems,
  standardsTitle: "Les standards qui structurent le travail",
  standardsLead:
    "Le niveau d'exigence ne se joue pas seulement sur le rendu final, mais sur la solidité de l'ensemble : structure, code, SEO et capacité à évoluer.",
  standardsItems: frAboutStandardsItems,
  territoryTitle: "Depuis Rouen, avec une lecture plus large du territoire",
  territoryLead:
    "L'ancrage local compte, mais il ne limite pas l'offre. Il sert surtout à donner un point de contact crédible à Rouen et en Normandie.",
  territoryItems: frAboutTerritoryItems,
  faqTitle: "Questions fréquentes sur Pixel Prestige",
  faqLead: "Pour mieux comprendre le positionnement de l'agence et sa façon de travailler.",
  faq: frAboutFaq,
  ctaTitle: "Si vous voulez juger Pixel Prestige sur sa méthode, commencez par la page dédiée",
  ctaLead:
    "La page dédiée à la méthode montre comment les décisions se prennent et comment un projet web ou une application web avance de façon plus propre.",
  ctaPrimary: "Parler de votre projet",
  ctaSecondary: "Voir la méthode",
};

const enAboutPageContent: AboutPageContent = {
  seo: {
    title: "About Pixel Prestige, web and web app agency based in Rouen",
    description:
      "Learn more about Pixel Prestige: a web and web app agency based in Rouen, active across Normandy and beyond, with a demanding approach to scoping, build quality and technical SEO.",
    keywords: [
      "about web agency Rouen",
      "web agency Rouen",
      "digital agency Normandy",
      "custom web app",
      "technical SEO",
      "technical partner",
    ],
    openGraphTitle: "About Pixel Prestige",
    openGraphDescription:
      "A richer about page explaining the positioning, standards and geographic base of Pixel Prestige.",
    twitterTitle: "About Pixel Prestige",
    twitterDescription:
      "A Rouen-based web and web app agency with high standards on scoping, build quality and long-term support.",
    image: "/assets/img/logo_complet.png",
  },
  positioningTitle: "The kind of partner Pixel Prestige aims to be",
  positioningLead:
    "Not an agency model built on too many layers and handoffs, but a technical partner able to scope, deliver and evolve a useful digital project.",
  positioningItems: enAboutPositioningItems,
  standardsTitle: "The standards shaping the work",
  standardsLead:
    "Quality is not only about the final design. It depends on the strength of the whole system: structure, code, SEO and capacity to evolve.",
  standardsItems: enAboutStandardsItems,
  territoryTitle: "From Rouen, with a broader territorial view",
  territoryLead:
    "The local base matters, but it does not limit the offer. It mainly gives companies in Rouen and Normandy a credible point of contact.",
  territoryItems: enAboutTerritoryItems,
  faqTitle: "Frequently asked questions about Pixel Prestige",
  faqLead: "Useful answers to better understand the agency positioning and way of working.",
  faq: enAboutFaq,
  ctaTitle: "If you want to judge Pixel Prestige on method, start with the process",
  ctaLead:
    "The process page shows how decisions are made and how a website or web app project moves forward in a cleaner way.",
  ctaPrimary: "Discuss your project",
  ctaSecondary: "See the process",
};

const contentByLocale: Record<Locale, LocaleContent> = {
  fr: {
    dictionary: frDictionary,
    services: frServices,
    cases: frCases,
    process: frProcess,
    fitItems: frFitItems,
    servicesPageContent: frServicesPageContent,
    processPageContent: frProcessPageContent,
    aboutPageContent: frAboutPageContent,
  },
  en: {
    dictionary: enDictionary,
    services: enServices,
    cases: enCases,
    process: enProcess,
    fitItems: enFitItems,
    servicesPageContent: enServicesPageContent,
    processPageContent: enProcessPageContent,
    aboutPageContent: enAboutPageContent,
  },
};

export function getLocaleContent(locale: Locale): LocaleContent {
  return contentByLocale[locale];
}
