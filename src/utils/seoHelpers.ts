/**
 * Génère un attribut alt optimisé SEO pour les images de voitures
 * Format: "Location [Marque Modèle] [Ville] - [Type] dès [Prix] DH/jour - Benatna"
 */
export const generateCarImageAlt = (
  carName: string,
  city: string,
  category: string,
  priceDisplay: string
): string => {
  // Extraire le prix numérique du priceDisplay (ex: "350 MAD" -> "350")
  const price = priceDisplay.replace(/[^\d]/g, '');
  
  return `Location ${carName} ${city} - ${category} dès ${price} DH/jour - Benatna`;
};

/**
 * Génère un attribut alt pour les images de villes
 */
export const generateCityImageAlt = (cityName: string): string => {
  return `Location de voiture à ${cityName} - Prix dès 150 DH/jour - Benatna`;
};

/**
 * Génère un attribut alt pour l'image hero
 */
export const generateHeroImageAlt = (): string => {
  return "Benatna - Location de voitures au Maroc - Prix transparents dès 150 DH/jour";
};
