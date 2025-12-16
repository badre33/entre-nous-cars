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
 * Formate une date en format lisible selon la langue
 */
const formatDate = (date: Date, lang: Language = 'fr'): string => {
  const locales: Record<Language, string> = { fr: 'fr-FR', en: 'en-US', es: 'es-ES' };
  return date.toLocaleDateString(locales[lang], {
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
 * Traduit le lieu de prise en charge selon la langue
 */
const getPickupLocationLabel = (location: string, lang: Language = 'fr'): string => {
  const labels: Record<Language, Record<string, string>> = {
    fr: { "airport": "à l'aéroport", "city-center": "en centre-ville", "hotel": "à l'hôtel" },
    en: { "airport": "at the airport", "city-center": "city center", "hotel": "at the hotel" },
    es: { "airport": "en el aeropuerto", "city-center": "en el centro", "hotel": "en el hotel" }
  };
  return labels[lang][location] || location;
};

/**
 * Messages multilingues
 */
const messages = {
  fr: {
    greeting: "Bonjour,",
    interestedIn: "Je suis intéressé(e) par la",
    lookingFor: "Je recherche un véhicule de catégorie",
    wantToRent: "Je souhaite louer une voiture.",
    location: "📍 Lieu",
    city: "📍 Ville",
    dates: "📅 Du",
    to: "au",
    days: "jour",
    estimate: "💰 Estimation",
    perDay: "/jour",
    confirmAvailability: "Pouvez-vous me confirmer la disponibilité et le tarif final ?",
    thanks: "Merci !",
    wantToRentIn: "je souhaite louer une voiture à",
    wantToRentMorocco: "je souhaite louer une voiture au Maroc.",
    availabilityAndRates: "Pouvez-vous me communiquer les véhicules disponibles et les tarifs ?",
    compareVehicles: "Je souhaite comparer les véhicules suivants :",
    availabilityForEach: "Pouvez-vous me communiquer les disponibilités et tarifs pour chacun ?"
  },
  en: {
    greeting: "Hello,",
    interestedIn: "I am interested in the",
    lookingFor: "I am looking for a vehicle in the category",
    wantToRent: "I would like to rent a car.",
    location: "📍 Location",
    city: "📍 City",
    dates: "📅 From",
    to: "to",
    days: "day",
    estimate: "💰 Estimate",
    perDay: "/day",
    confirmAvailability: "Can you confirm availability and the final rate?",
    thanks: "Thank you!",
    wantToRentIn: "I would like to rent a car in",
    wantToRentMorocco: "I would like to rent a car in Morocco.",
    availabilityAndRates: "Can you send me available vehicles and rates?",
    compareVehicles: "I would like to compare the following vehicles:",
    availabilityForEach: "Can you send me availability and rates for each?"
  },
  es: {
    greeting: "Hola,",
    interestedIn: "Estoy interesado/a en el",
    lookingFor: "Busco un vehículo de categoría",
    wantToRent: "Me gustaría alquilar un coche.",
    location: "📍 Lugar",
    city: "📍 Ciudad",
    dates: "📅 Del",
    to: "al",
    days: "día",
    estimate: "💰 Estimación",
    perDay: "/día",
    confirmAvailability: "¿Pueden confirmar la disponibilidad y el precio final?",
    thanks: "¡Gracias!",
    wantToRentIn: "me gustaría alquilar un coche en",
    wantToRentMorocco: "me gustaría alquilar un coche en Marruecos.",
    availabilityAndRates: "¿Pueden enviarme los vehículos disponibles y las tarifas?",
    compareVehicles: "Me gustaría comparar los siguientes vehículos:",
    availabilityForEach: "¿Pueden enviarme disponibilidad y tarifas para cada uno?"
  }
};

type Language = 'fr' | 'en' | 'es';

/**
 * Récupère la langue depuis localStorage
 */
const getLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem("benatna-language");
    if (saved === 'en' || saved === 'es' || saved === 'fr') return saved;
  }
  return 'fr';
};

/**
 * Génère un message WhatsApp intelligent et multilingue
 */
export const generateWhatsAppMessage = (params: WhatsAppMessageParams = {}): string => {
  const { city, pickupLocation, startDate, endDate, vehicleName, vehicleCategory, pricePerDay } = params;
  const lang = getLanguage();
  const t = messages[lang];
  
  let messageParts: string[] = [t.greeting];
  
  // Base du message
  if (vehicleName) {
    messageParts.push(`${t.interestedIn} ${vehicleName}.`);
  } else if (vehicleCategory) {
    messageParts.push(`${t.lookingFor} ${vehicleCategory}.`);
  } else {
    messageParts.push(t.wantToRent);
  }
  
  // Lieu
  if (city && pickupLocation) {
    messageParts.push(`${t.location} : ${city} (${getPickupLocationLabel(pickupLocation, lang)})`);
  } else if (city) {
    messageParts.push(`${t.city} : ${city}`);
  }
  
  // Dates
  if (startDate && endDate) {
    const days = calculateDays(startDate, endDate);
    const plural = days > 1 ? 's' : '';
    messageParts.push(`${t.dates} ${formatDate(startDate, lang)} ${t.to} ${formatDate(endDate, lang)} (${days} ${t.days}${plural})`);
    
    // Prix estimé si disponible
    if (pricePerDay && days > 0) {
      const totalEstimate = pricePerDay * days;
      messageParts.push(`${t.estimate} : ${totalEstimate} MAD (${pricePerDay} MAD${t.perDay})`);
    }
  }
  
  // Call to action
  messageParts.push("");
  messageParts.push(t.confirmAvailability);
  messageParts.push(t.thanks);
  
  return messageParts.join("\n");
};

/**
 * Génère un message simple multilingue pour la homepage (sans dates spécifiques)
 */
export const generateSimpleMessage = (city?: string): string => {
  const lang = getLanguage();
  const t = messages[lang];
  
  if (city) {
    return `${t.greeting} ${t.wantToRentIn} ${city}.\n\n${t.availabilityAndRates}\n\n${t.thanks}`;
  }
  return `${t.greeting} ${t.wantToRentMorocco}\n\n${t.availabilityAndRates}\n\n${t.thanks}`;
};

/**
 * Génère un message multilingue pour une demande groupée (comparaison)
 */
export const generateComparisonMessage = (vehicles: Array<{ name: string; city?: string }>): string => {
  const lang = getLanguage();
  const t = messages[lang];
  
  const vehiclesList = vehicles.map(v => v.city ? `• ${v.name} - ${v.city}` : `• ${v.name}`).join('\n');
  return `${t.greeting}\n\n${t.compareVehicles}\n\n${vehiclesList}\n\n${t.availabilityForEach}\n\n${t.thanks}`;
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
