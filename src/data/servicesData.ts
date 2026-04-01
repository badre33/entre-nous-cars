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
  // Aéroports
  {
    id: 'aeroport-casablanca',
    title: 'Location Aéroport Mohammed V Casablanca',
    slug: '/location-voiture-aeroport-casablanca',
    category: 'aeroport',
    shortDescription: 'Livraison gratuite au terminal. Évitez les files d\'attente et économisez jusqu\'à 40% vs comptoirs aéroport.',
    features: ['Livraison gratuite', 'Service 24/7', 'Pas de file d\'attente', 'Dès 200 DH/jour'],
    priceFrom: '200 DH',
    image: '/city-casablanca.jpg',
    popular: true,
  },
  {
    id: 'aeroport-marrakech',
    title: 'Location Aéroport Menara Marrakech',
    slug: '/location-voiture-aeroport-marrakech',
    category: 'aeroport',
    shortDescription: 'Récupérez votre véhicule directement au terminal Menara. Service rapide et tarifs transparents.',
    features: ['Livraison gratuite', 'Suivi vol temps réel', 'Sans supplément', 'Toutes catégories'],
    priceFrom: '200 DH',
    image: '/city-marrakech.jpg',
    popular: true,
  },
  {
    id: 'aeroport-rabat',
    title: 'Location Aéroport Rabat-Salé',
    slug: '/location-voiture-aeroport-rabat',
    category: 'aeroport',
    shortDescription: 'Service de livraison à l\'aéroport de Rabat. Démarrez votre séjour en toute sérénité.',
    features: ['Livraison terminal', 'Flexible', 'Km illimités', 'Assistance 24/7'],
    priceFrom: '200 DH',
    image: '/city-rabat.jpg',
  },
  {
    id: 'aeroport-agadir',
    title: 'Location Aéroport Al Massira Agadir',
    slug: '/location-voiture-aeroport-agadir',
    category: 'aeroport',
    shortDescription: 'Profitez d\'Agadir dès votre arrivée. Livraison gratuite aéroport Al Massira.',
    features: ['Livraison gratuite', 'Service plage', 'Cabriolets disponibles', 'Prix fixes'],
    priceFrom: '200 DH',
    image: '/city-agadir.jpg',
  },
  {
    id: 'aeroport-tanger',
    title: 'Location Aéroport Ibn Battouta Tanger',
    slug: '/location-voiture-aeroport-tanger',
    category: 'aeroport',
    shortDescription: 'Votre voiture vous attend à Tanger. Service rapide et véhicules récents.',
    features: ['Livraison rapide', 'Nord du Maroc', 'Essence incluse', 'Support FR/ES'],
    priceFrom: '200 DH',
    image: '/city-tanger.jpg',
  },
  {
    id: 'aeroport-fes',
    title: 'Location Aéroport Saïss Fès',
    slug: '/location-voiture-aeroport-fes',
    category: 'aeroport',
    shortDescription: 'Découvrez Fès et sa région. Livraison aéroport Saïss sans frais supplémentaires.',
    features: ['Sans supplément', 'Ville impériale', 'GPS offert', 'Conseils locaux'],
    priceFrom: '200 DH',
    image: '/city-fes.jpg',
  },

  // Jeune Conducteur
  {
    id: 'jeune-casablanca',
    title: 'Location Jeune Conducteur Casablanca',
    slug: '/location-jeune-conducteur-casablanca',
    category: 'jeune',
    shortDescription: 'Dès 21 ans avec supplément raisonnable de 50 DH/jour. Assurance adaptée incluse.',
    features: ['Dès 21 ans', '+50 DH/jour seulement', 'Assurance incluse', 'Caution réduite 3000 DH'],
    priceFrom: '200 DH',
    image: '/car-clio.jpg',
    popular: true,
  },
  {
    id: 'jeune-marrakech',
    title: 'Location Jeune Conducteur Marrakech',
    slug: '/location-jeune-conducteur-marrakech',
    category: 'jeune',
    shortDescription: 'Location accessible aux jeunes à Marrakech. Conditions transparentes et équitables.',
    features: ['1 an de permis', 'Pas de discrimination', 'Km illimités', 'Citadines et SUV'],
    priceFrom: '200 DH',
    image: '/car-sandero-stepway.jpg',
  },
  {
    id: 'jeune-rabat',
    title: 'Location Jeune Conducteur Rabat',
    slug: '/location-jeune-conducteur-rabat',
    category: 'jeune',
    shortDescription: 'Louez jeune à Rabat sans supplément abusif. Accompagnement personnalisé.',
    features: ['Conseils conduite', 'Support dédié', 'Franchise raisonnable', 'Permis probatoire OK'],
    priceFrom: '200 DH',
    image: '/car-peugeot-208.jpg',
  },

  // Longue Durée
  {
    id: 'longue-duree-casa',
    title: 'Location Longue Durée Casablanca',
    slug: '/location-longue-duree-casablanca',
    category: 'longue-duree',
    shortDescription: 'Tarifs mensuels dégressifs. Entretien, assurance et assistance inclus. Dès 5 500 DH/mois.',
    features: ['Dès 5 500 DH/mois', 'Entretien inclus', 'Km illimités', 'Résiliable 1 mois préavis'],
    priceFrom: '5 500 DH/mois',
    image: '/car-corolla.jpg',
    popular: true,
  },
  {
    id: 'longue-duree-marrakech',
    title: 'Location Longue Durée Marrakech',
    slug: '/location-longue-duree-marrakech',
    category: 'longue-duree',
    shortDescription: 'Forfaits mensuels flexibles à Marrakech. Idéal expatriés et missions longues.',
    features: ['3-6-12 mois', 'Tout compris', 'Véhicule remplacement', 'Déductible fiscalement'],
    priceFrom: '5 500 DH/mois',
    image: '/car-duster.jpg',
  },
  {
    id: 'weekend-marrakech',
    title: 'Location Weekend Marrakech',
    slug: '/location-weekend-marrakech',
    category: 'longue-duree',
    shortDescription: 'Offre spéciale weekend : vendredi soir au lundi matin = 2 jours facturés seulement.',
    features: ['Tarif spécial', '2 jours facturés', 'Km illimités', 'Départ 18h vendredi'],
    priceFrom: '280 DH/jour',
    image: '/car-captur-orange.jpg',
  },
  {
    id: 'sans-carte-marrakech',
    title: 'Location Sans Carte Crédit Marrakech',
    slug: '/location-voiture-sans-carte-credit-marrakech',
    category: 'longue-duree',
    shortDescription: 'Louez sans carte bancaire. Paiement espèces, virement ou flexible accepté.',
    features: ['Sans CB', 'Paiement flexible', 'Espèces OK', 'Caution adaptée'],
    priceFrom: '200 DH',
    image: '/car-clio-white.jpg',
  },

  // SUV & Aventure
  {
    id: 'suv-atlas',
    title: 'Location SUV Atlas Marocain',
    slug: '/location-suv-atlas',
    category: 'suv',
    shortDescription: 'SUV 4x4 pour routes de montagne. GPS, équipement et assurance pistes inclus.',
    features: ['Duster, Qashqai, Tiguan', 'GPS inclus', 'Assurance pistes', 'Kit dépannage 4x4'],
    priceFrom: '350 DH',
    image: '/car-duster-gray.jpg',
    popular: true,
  },
  {
    id: '4x4-desert',
    title: 'Location 4x4 Désert Merzouga',
    slug: '/location-4x4-desert',
    category: 'suv',
    shortDescription: 'Véhicules tout-terrain pour désert et dunes. Toyota Prado, Land Cruiser disponibles.',
    features: ['Vrai 4x4', 'Prado & Land Cruiser', 'Expédition désert', 'Assistance 24/7'],
    priceFrom: '800 DH',
    image: '/car-toyota-rav4.jpg',
  },
  {
    id: 'suv-sud-maroc',
    title: 'Location SUV Sud Marocain',
    slug: '/location-suv-sud-maroc',
    category: 'suv',
    shortDescription: 'Road trip Sud : Essaouira, Agadir, Taroudant. SUV confortables et robustes.',
    features: ['Routes côtières', 'Coffre spacieux', 'Confort famille', 'Pistes OK'],
    priceFrom: '350 DH',
    image: '/car-nissan-qashqai.jpg',
  },

  // Véhicules Spéciaux
  {
    id: 'mariage-maroc',
    title: 'Location Voiture Mariage Maroc',
    slug: '/location-voiture-mariage-maroc',
    category: 'special',
    shortDescription: 'Mercedes, BMW, Audi pour votre mariage. Décoration incluse, chauffeur optionnel.',
    features: ['Mercedes Classe S', 'Décoration incluse', 'Chauffeur dispo', 'Photos offertes'],
    priceFrom: '900 DH',
    image: '/car-mercedes-e.jpg',
    popular: true,
  },
  {
    id: 'luxe-evenement',
    title: 'Location Voiture Luxe Événement',
    slug: '/location-voiture-luxe-evenement',
    category: 'special',
    shortDescription: 'Flotte premium pour événements pro ou privés. Service sur-mesure avec chauffeur.',
    features: ['BMW, Mercedes, Audi', 'Chauffeur bilingue', 'Service VIP', 'Devis personnalisé'],
    priceFrom: '900 DH',
    image: '/car-bmw-5.jpg',
  },
  {
    id: 'electrique-casa',
    title: 'Location Voiture Électrique Casablanca',
    slug: '/location-voiture-electrique-casablanca',
    category: 'special',
    shortDescription: 'VW ID.3 et ID.4 électriques. Recharge gratuite à nos bornes. Écologique et économique.',
    features: ['VW ID.3 & ID.4', 'Recharge gratuite', '400 km autonomie', 'Silencieux'],
    priceFrom: '450 DH',
    image: '/car-vw-id3.jpg',
  },
  {
    id: 'van-famille',
    title: 'Location Van Familial 7-9 Places',
    slug: '/location-van-famille-maroc',
    category: 'special',
    shortDescription: 'Mercedes Vito, VW Multivan pour groupes. Coffre XXL, climatisation arrière.',
    features: ['7-9 places', 'Coffre géant', 'Sièges bébé gratuits', 'Road trips famille'],
    priceFrom: '600 DH',
    image: '/car-renault-captur.jpg',
  },
  {
    id: 'cabriolet-agadir',
    title: 'Location Cabriolet Agadir',
    slug: '/location-cabriolet-agadir',
    category: 'special',
    shortDescription: 'BMW Z4, Audi A5 Cabrio. Profitez du soleil d\'Agadir cheveux au vent.',
    features: ['BMW Z4, Audi A5', 'Capote électrique', 'Sono premium', 'Crème solaire offerte'],
    priceFrom: '700 DH',
    image: '/car-bmw-z4.jpg',
  },
  {
    id: 'utilitaire-casa',
    title: 'Location Utilitaire Déménagement',
    slug: '/location-utilitaire-demenagement-casablanca',
    category: 'special',
    shortDescription: 'Fiat Ducato, Mercedes Sprinter 10-20m³. Hayon, couvertures et sangles fournis.',
    features: ['10-20m³', 'Hayon élévateur', 'Couvertures fournies', 'Permis B suffit'],
    priceFrom: '400 DH',
    image: '/car-renault-captur.jpg',
  },
];
