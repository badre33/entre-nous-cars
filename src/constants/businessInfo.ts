/**
 * Informations NAP (Name, Address, Phone) centralisées
 * CRITIQUE pour le SEO local: Ces informations doivent être EXACTEMENT identiques partout
 */

export const BUSINESS_INFO = {
  // Nom de l'entreprise
  name: "Benatna Location de Voiture",
  legalName: "Benatna SARL",
  
  // Contact (formatage identique partout)
  phone: "+212 699 024 526",
  phoneRaw: "+212699024526", // Pour les liens tel:
  email: "contact@benatna.ma",
  whatsapp: "+212699024526",
  
  // Adresse principale (siège social)
  address: {
    street: "Boulevard Mohammed V",
    city: "Casablanca",
    postalCode: "20000",
    country: "MA",
    countryName: "Maroc"
  },
  
  // Coordonnées géographiques (Casablanca)
  geo: {
    latitude: "33.5731",
    longitude: "-7.5898"
  },
  
  // Horaires d'ouverture
  openingHours: "24/7",
  
  // Réseaux sociaux
  social: {
    facebook: "https://www.facebook.com/benatna",
    instagram: "https://www.instagram.com/benatna",
    linkedin: "https://www.linkedin.com/company/benatna"
  },
  
  // URLs
  website: "https://benatna.ma",
  
  // Notation moyenne
  rating: {
    value: "4.8",
    count: "1247",
    best: "5",
    worst: "1"
  },
  
  // Description
  description: "Service de location de voiture au Maroc. Véhicules neufs et récents, prix transparents, sans carte de crédit. Livraison gratuite et assistance 24/7."
} as const;

// Fonction helper pour formater l'adresse complète
export const getFullAddress = () => {
  const { street, city, postalCode, country } = BUSINESS_INFO.address;
  return `${street}, ${city} ${postalCode}, ${country}`;
};
