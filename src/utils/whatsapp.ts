import { BUSINESS_INFO } from "@/constants/businessInfo";

/**
 * Utilitaire WhatsApp centralisé
 * Génère des messages pré-remplis intelligents sans placeholders
 */

// Numéro WhatsApp depuis BUSINESS_INFO (source unique)
export const WHATSAPP_NUMBER = BUSINESS_INFO.whatsapp;

interface WhatsAppMessageParams {
  city?: string;
  pickupLocation?: "airport" | "city-center" | "hotel" | string;
  startDate?: Date;
  endDate?: Date;
  vehicleName?: string;
  vehicleCategory?: string;
  pricePerDay?: number;
}

/**
 * Formate une date en format lisible (ex: "15 janvier 2025")
 */
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

/**
 * Calcule le nombre de jours entre deux dates
 */
const calculateDays = (startDate: Date, endDate: Date): number => {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Traduit le lieu de prise en charge
 */
const getPickupLocationLabel = (location: string): string => {
  const labels: Record<string, string> = {
    "airport": "à l'aéroport",
    "city-center": "en centre-ville",
    "hotel": "à l'hôtel"
  };
  return labels[location] || location;
};

/**
 * Génère un message WhatsApp intelligent et complet
 */
export const generateWhatsAppMessage = (params: WhatsAppMessageParams = {}): string => {
  const { city, pickupLocation, startDate, endDate, vehicleName, vehicleCategory, pricePerDay } = params;
  
  let messageParts: string[] = ["Bonjour,"];
  
  // Base du message
  if (vehicleName) {
    messageParts.push(`Je suis intéressé(e) par la ${vehicleName}.`);
  } else if (vehicleCategory) {
    messageParts.push(`Je recherche un véhicule de catégorie ${vehicleCategory}.`);
  } else {
    messageParts.push("Je souhaite louer une voiture.");
  }
  
  // Lieu
  if (city && pickupLocation) {
    messageParts.push(`📍 Lieu : ${city} (${getPickupLocationLabel(pickupLocation)})`);
  } else if (city) {
    messageParts.push(`📍 Ville : ${city}`);
  }
  
  // Dates
  if (startDate && endDate) {
    const days = calculateDays(startDate, endDate);
    messageParts.push(`📅 Du ${formatDate(startDate)} au ${formatDate(endDate)} (${days} jour${days > 1 ? 's' : ''})`);
    
    // Prix estimé si disponible
    if (pricePerDay && days > 0) {
      const totalEstimate = pricePerDay * days;
      messageParts.push(`💰 Estimation : ${totalEstimate} MAD (${pricePerDay} MAD/jour)`);
    }
  }
  
  // Call to action
  messageParts.push("");
  messageParts.push("Pouvez-vous me confirmer la disponibilité et le tarif final ?");
  messageParts.push("Merci !");
  
  return messageParts.join("\n");
};

/**
 * Génère un message simple pour la homepage (sans dates spécifiques)
 */
export const generateSimpleMessage = (city?: string): string => {
  if (city) {
    return `Bonjour, je souhaite louer une voiture à ${city}.\n\nPouvez-vous me communiquer les véhicules disponibles et les tarifs ?\n\nMerci !`;
  }
  return "Bonjour, je souhaite louer une voiture au Maroc.\n\nPouvez-vous me communiquer les véhicules disponibles et les tarifs ?\n\nMerci !";
};

/**
 * Génère un message pour une demande groupée (comparaison)
 */
export const generateComparisonMessage = (vehicles: Array<{ name: string; city?: string }>): string => {
  const vehiclesList = vehicles.map(v => v.city ? `• ${v.name} - ${v.city}` : `• ${v.name}`).join('\n');
  return `Bonjour,\n\nJe souhaite comparer les véhicules suivants :\n\n${vehiclesList}\n\nPouvez-vous me communiquer les disponibilités et tarifs pour chacun ?\n\nMerci !`;
};

/**
 * Ouvre WhatsApp avec un message pré-rempli
 */
export const openWhatsApp = (message: string): void => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

/**
 * Génère l'URL WhatsApp complète
 */
export const getWhatsAppUrl = (message: string): string => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
