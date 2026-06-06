/**
 * Top 20 Véhicules les Plus Populaires pour Product Schema
 * Ces véhicules apparaîtront dans Google Shopping avec prix et disponibilité
 */

export interface TopVehicle {
  name: string;
  model: string;
  brand: string;
  category: string;
  description: string;
  imageUrl: string;
  pricePerDay: string;
  fuelType: string;
  transmission: string;
  seats: number;
  features: string[];
  averageRating: string;
  reviewCount: string;
  availability: "En stock" | "Sur demande";
  cities: string[];
}

export const topVehicles: TopVehicle[] = [
  {
    name: "Dacia Sandero",
    model: "Sandero",
    brand: "Dacia",
    category: "Économique",
    description: "Citadine économique parfaite pour la ville. Consommation réduite, facile à garer, idéale pour 4 personnes. Prix imbattable dès 300 DH/jour.",
    imageUrl: "/car-sandero-stepway.jpg",
    pricePerDay: "200",
    fuelType: "Essence",
    transmission: "Manuelle",
    seats: 5,
    features: ["Climatisation", "Bluetooth", "USB", "Direction assistée", "Airbags"],
    averageRating: "4.7",
    reviewCount: "89",
    availability: "En stock",
    cities: ["Casablanca", "Marrakech", "Rabat", "Tanger", "Agadir", "Fès"]
  },
  {
    name: "Renault Clio",
    model: "Clio V",
    brand: "Renault",
    category: "Économique",
    description: "Berline compacte moderne et confortable. Équipement complet, coffre spacieux, parfaite pour couples et petites familles. À partir de 280 DH/jour.",
    imageUrl: "/car-clio.jpg",
    pricePerDay: "280",
    fuelType: "Diesel",
    transmission: "Manuelle",
    seats: 5,
    features: ["Climatisation", "Écran tactile", "GPS", "Bluetooth", "Caméra recul", "Régulateur vitesse"],
    averageRating: "4.8",
    reviewCount: "142",
    availability: "En stock",
    cities: ["Casablanca", "Marrakech", "Rabat", "Tanger", "Agadir", "Fès"]
  },
  {
    name: "Dacia Duster",
    model: "Duster",
    brand: "Dacia",
    category: "SUV",
    description: "SUV robuste et polyvalent. Garde au sol élevée, coffre immense, parfait pour routes difficiles et familles. Le SUV le plus loué au Maroc. 350 DH/jour.",
    imageUrl: "/car-duster.jpg",
    pricePerDay: "350",
    fuelType: "Diesel",
    transmission: "Manuelle",
    seats: 5,
    features: ["Climatisation", "GPS", "Coffre 445L", "Garde au sol 210mm", "4x2", "Bluetooth"],
    averageRating: "4.8",
    reviewCount: "203",
    availability: "En stock",
    cities: ["Casablanca", "Marrakech", "Rabat", "Tanger", "Agadir", "Fès"]
  },
  {
    name: "Hyundai Tucson",
    model: "Tucson",
    brand: "Hyundai",
    category: "SUV",
    description: "SUV moderne et spacieux. Technologies avancées, garantie constructeur, sécurité maximale. Parfait familles exigeantes. 500 DH/jour.",
    imageUrl: "/car-hyundai-tucson.jpg",
    pricePerDay: "500",
    fuelType: "Diesel",
    transmission: "Automatique",
    seats: 5,
    features: ["Climatisation bi-zone", "GPS", "Écran 8''", "Caméra recul", "Régulateur adaptatif", "Sièges chauffants"],
    averageRating: "4.8",
    reviewCount: "98",
    availability: "En stock",
    cities: ["Casablanca", "Marrakech", "Rabat", "Tanger"]
  },
  {
    name: "Volkswagen Golf",
    model: "Golf 8",
    brand: "Volkswagen",
    category: "Berline Compacte",
    description: "Compacte premium allemande. Qualité de finition supérieure, conduite dynamique, technologies embarquées. La référence du segment. 420 DH/jour.",
    imageUrl: "/car-vw-golf.jpg",
    pricePerDay: "420",
    fuelType: "Essence",
    transmission: "Automatique",
    seats: 5,
    features: ["Climatisation auto", "GPS", "Digital Cockpit", "Caméra recul", "Park Assist", "LED Matrix"],
    averageRating: "4.9",
    reviewCount: "112",
    availability: "En stock",
    cities: ["Casablanca", "Marrakech", "Rabat"]
  },
  {
    name: "Citroën C3",
    model: "C3",
    brand: "Citroën",
    category: "Économique",
    description: "Citadine confortable et originale. Suspension moelleuse, design personnalisable, équipement complet. Confort Citroën légendaire. 280 DH/jour.",
    imageUrl: "/car-citroen-c3.jpg",
    pricePerDay: "280",
    fuelType: "Essence",
    transmission: "Manuelle",
    seats: 5,
    features: ["Climatisation", "Écran tactile", "Bluetooth", "USB", "Airbags 6", "Barres toit"],
    averageRating: "4.7",
    reviewCount: "87",
    availability: "En stock",
    cities: ["Casablanca", "Marrakech", "Fès", "Tanger"]
  },
  {
    name: "Dacia Jogger",
    model: "Jogger 7 places",
    brand: "Dacia",
    category: "Monospace",
    description: "Monospace 7 places économique. Modulable, coffre immense, prix imbattable. Parfait grandes familles et groupes. Le break familial idéal. 400 DH/jour.",
    imageUrl: "/car-dacia-jogger.jpg",
    pricePerDay: "400",
    fuelType: "Essence",
    transmission: "Manuelle",
    seats: 7,
    features: ["Climatisation", "GPS", "7 places", "Coffre 607L", "Barres toit", "Bluetooth"],
    averageRating: "4.8",
    reviewCount: "76",
    availability: "En stock",
    cities: ["Casablanca", "Marrakech", "Rabat", "Fès"]
  },
  {
    name: "Mercedes Classe A",
    model: "Classe A",
    brand: "Mercedes-Benz",
    category: "Luxe",
    description: "Compacte premium allemande. Luxe Mercedes, système MBUX, finition irréprochable. Prestige accessible. 650 DH/jour.",
    imageUrl: "/car-mercedes-a.jpg",
    pricePerDay: "650",
    fuelType: "Essence",
    transmission: "Automatique",
    seats: 5,
    features: ["Climatisation auto", "MBUX", "Écran 10.25''", "Caméra recul", "Sièges cuir", "Commande vocale"],
    averageRating: "5.0",
    reviewCount: "54",
    availability: "Sur demande",
    cities: ["Casablanca", "Marrakech", "Rabat"]
  },
  {
    name: "BMW Série 3",
    model: "Série 3",
    brand: "BMW",
    category: "Luxe",
    description: "Berline sportive premium. Plaisir de conduite BMW, technologies iDrive, performances exceptionnelles. La référence du premium sportif. 700 DH/jour.",
    imageUrl: "/car-bmw-3.jpg",
    pricePerDay: "700",
    fuelType: "Diesel",
    transmission: "Automatique",
    seats: 5,
    features: ["Climatisation bi-zone", "iDrive 7", "Écran 12.3''", "Caméra 360°", "Sièges sport cuir", "Toit ouvrant"],
    averageRating: "5.0",
    reviewCount: "67",
    availability: "Sur demande",
    cities: ["Casablanca", "Marrakech"]
  },
  {
    name: "Kia Sportage",
    model: "Sportage",
    brand: "Kia",
    category: "SUV",
    description: "SUV familial moderne. Design audacieux, garantie 7 ans, technologies avancées. Rapport équipement/prix exceptionnel. 480 DH/jour.",
    imageUrl: "/car-kia-sportage.jpg",
    pricePerDay: "480",
    fuelType: "Diesel",
    transmission: "Automatique",
    seats: 5,
    features: ["Climatisation bi-zone", "GPS", "Écran 8''", "Caméra recul", "Régulateur adaptatif", "Garantie 7 ans"],
    averageRating: "4.8",
    reviewCount: "102",
    availability: "En stock",
    cities: ["Casablanca", "Marrakech", "Rabat", "Tanger"]
  },
  {
    name: "Hyundai Accent",
    model: "Accent",
    brand: "Hyundai",
    category: "Berline",
    description: "Berline coréenne abordable. Coffre généreux pour bagages MRE, climatisation efficace, fiabilité éprouvée. Très répandue sur le marché marocain. 380 DH/jour.",
    imageUrl: "/car-clio.jpg",
    pricePerDay: "380",
    fuelType: "Essence",
    transmission: "Manuelle",
    seats: 5,
    features: ["Climatisation", "Bluetooth", "USB", "Direction assistée", "Airbags"],
    averageRating: "4.6",
    reviewCount: "76",
    availability: "En stock",
    cities: ["Casablanca", "Marrakech", "Rabat", "Tanger", "Agadir", "Fès"]
  }
];

// Grouper par ville pour faciliter l'utilisation
export const getVehiclesByCity = (city: string): TopVehicle[] => {
  return topVehicles.filter(vehicle => 
    vehicle.cities.includes(city)
  );
};

// Top 5 véhicules les plus loués
export const topRentedVehicles = topVehicles
  .sort((a, b) => parseInt(b.reviewCount) - parseInt(a.reviewCount))
  .slice(0, 5);
