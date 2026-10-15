/**
 * Données structurées des services de location pour la page Nos Services
 */

export interface Service {
  id: string;
  title: string;
  slug: string;
  category: 'aeroport' | 'jeune' | 'longue-duree' | 'suv' | 'special';
  shortDescription: string;
  features: string[];
  priceFrom: string;
  image: string;
  popular?: boolean;
}

export const serviceCategories = [
  { id: 'all', label: 'Tous les services', icon: 'Grid3x3' },
  { id: 'aeroport', label: 'Locations Aéroports', icon: 'Plane' },
  { id: 'jeune', label: 'Jeune Conducteur', icon: 'UserCheck' },
  { id: 'longue-duree', label: 'Longue Durée', icon: 'Calendar' },
  { id: 'suv', label: 'SUV & Aventure', icon: 'Mountain' },
  { id: 'special', label: 'Véhicules Spéciaux', icon: 'Sparkles' },
] as const;

export const services: Service[] = [
  {
    id: 'aeroport-casablanca',
    title: 'Location Aéroport Mohammed V Casablanca',
    slug: '/location-voiture-aeroport-casablanca',
    category: 'aeroport',
    shortDescription: 'Livraison gratuite au terminal. Évitez les files d\'attente et économisez jusqu\'à 40% vs comptoirs aéroport.',
    features: ['Livraison gratuite par le loueur', 'Demande WhatsApp 2 min', 'Pas de file d\'attente', 'Dès 250 DH/jour'],
    priceFrom: '250 DH',
    image: '/city-casablanca.jpg',
    popular: true,
  },
  {
    id: 'jeune-casablanca',
    title: 'Location Jeune Conducteur Casablanca',
    slug: '/location-jeune-conducteur-casablanca',
    category: 'jeune',
    shortDescription: 'Dès 21 ans avec supplément raisonnable de 50 DH/jour. Assurance adaptée incluse.',
    features: ['Dès 21 ans', '+50 DH/jour seulement', 'Assurance incluse', 'Caution réduite 3000 DH'],
    priceFrom: '250 DH',
    image: '/car-clio.jpg',
    popular: true,
  },
  {
    id: 'longue-duree-casa',
    title: 'Location Longue Durée Casablanca',
    slug: '/location-longue-duree-casablanca',
    category: 'longue-duree',
    shortDescription: 'Tarifs mensuels tout compris. Entretien, assurance et assistance inclus. Dès 7 000 DH/mois.',
    features: ['Dès 7 000 DH/mois', 'Entretien inclus', 'Km illimités', 'Résiliable 1 mois préavis'],
    priceFrom: '7 000 DH/mois',
    image: '/car-corolla.jpg',
    popular: true,
  },
  {
    id: 'electrique-casa',
    title: 'Location Voiture Électrique Casablanca',
    slug: '/location-voiture-electrique-casablanca',
    category: 'special',
    shortDescription: 'VW ID.3 et ID.4 électriques. Recharge gratuite aux bornes partenaires. Écologique et économique.',
    features: ['VW ID.3 & ID.4', 'Recharge gratuite', '400 km autonomie', 'Silencieux'],
    priceFrom: '450 DH',
    image: '/car-vw-id3.jpg',
  },
];
