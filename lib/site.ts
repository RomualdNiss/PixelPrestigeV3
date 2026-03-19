type PostalAddress = {
  street: string;
  postalCode: string;
  city: string;
  country: string;
};

type HostingProvider = {
  companyName: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website: string;
};

export function hasSiteValue(value: string | null | undefined): value is string {
  return Boolean(value?.trim());
}

export const siteConfig = {
  name: "Pixel Prestige",
  shortName: "Pixel Prestige",
  url: "https://pixelprestige.fr",
  description:
    "Agence digitale premium : sites web, applications, automatisations et expériences immersives performantes.",
  contact: {
    email: "contact@pixelprestige.fr",
    phone: "0665184249",
    calendly: "https://calendly.com/pixel-prestige/discovery",
  },
  legal: {
    entityName: "Pixel Prestige",
    legalForm: "Entreprise individuelle",
    shareCapital: "",
    registrationLabel: "RCS / RNE / SIREN / SIRET",
    registrationNumber: "93085611700013",
    vatNumber: "FR55930856117",
    publicationDirector: "Romuald Niss",
    address: {
      street: "1 Venelle Leila Alaoui",
      postalCode: "76100",
      city: "Rouen",
      country: "France",
    } satisfies PostalAddress,
    host: {
      companyName: "HOSTINGER INTERNATIONAL LIMITED",
      street: "61 Lordou Vironos str.",
      postalCode: "6023",
      city: "Larnaca",
      country: "Cyprus",
      phone: "+37064503378",
      email: "support@hostinger.com",
      website: "https://www.hostinger.com",
    } satisfies HostingProvider,
  },
  privacy: {
    controllerName: "Pixel Prestige",
    contactFormRetention:
      "Les demandes envoyées via le formulaire sont conservées le temps nécessaire au traitement de la demande, puis supprimées au plus tard 12 mois après le dernier échange utile, sauf obligation légale contraire.",
    contactPurposes: [
      "Répondre à votre demande de contact.",
      "Préparer un échange commercial ou technique lié à votre projet.",
      "Assurer un suivi si vous poursuivez la discussion avec Pixel Prestige.",
    ],
    legalBasis:
      "Mesures précontractuelles prises à votre demande et intérêt légitime à traiter les demandes entrantes de manière structurée.",
    requiredFields: ["Nom", "E-mail", "Type de projet", "Message"],
    optionalFields: ["Entreprise"],
    recipients: [
      "Pixel Prestige",
      "Le prestataire de traitement du formulaire configuré sur le site (Formspree au moment de ce dépôt)",
      "Le prestataire de mesure d'audience si Google Analytics est activé après consentement",
    ],
    internationalTransfers:
      "Le prestataire de formulaire et, le cas échéant, le prestataire d'analytics peuvent traiter certaines données hors de l'Union européenne selon leur propre infrastructure. Vérifiez leurs garanties contractuelles et leurs paramètres avant la mise en ligne.",
  },
};
