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
    "Agence digitale premium : sites web, applications, automatisations et exp\u00E9riences immersives performantes.",
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
      "Les demandes envoy\u00E9es via le formulaire sont conserv\u00E9es le temps n\u00E9cessaire au traitement de la demande, puis supprim\u00E9es au plus tard 12 mois apr\u00E8s le dernier \u00E9change utile, sauf obligation l\u00E9gale contraire.",
    contactPurposes: [
      "R\u00E9pondre \u00E0 votre demande de contact.",
      "Pr\u00E9parer un \u00E9change commercial ou technique li\u00E9 \u00E0 votre projet.",
      "Assurer un suivi si vous poursuivez la discussion avec Pixel Prestige.",
    ],
    legalBasis:
      "Mesures pr\u00E9contractuelles prises \u00E0 votre demande et int\u00E9r\u00EAt l\u00E9gitime \u00E0 traiter les demandes entrantes de mani\u00E8re structur\u00E9e.",
    requiredFields: ["Nom", "E-mail", "Type de projet", "Message"],
    optionalFields: ["Entreprise"],
    recipients: [
      "Pixel Prestige",
      "Le prestataire de traitement du formulaire configur\u00E9 sur le site (Formspree au moment de ce d\u00E9p\u00F4t)",
      "Le prestataire de mesure d'audience si Google Analytics est activ\u00E9 apr\u00E8s consentement",
    ],
    internationalTransfers:
      "Le prestataire de formulaire et, le cas \u00E9ch\u00E9ant, le prestataire d'analytics peuvent traiter certaines donn\u00E9es hors de l'Union europ\u00E9enne selon leur propre infrastructure. V\u00E9rifiez leurs garanties contractuelles et leurs param\u00E8tres avant la mise en ligne.",
  },
};
