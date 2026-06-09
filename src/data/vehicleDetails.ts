// Vehicle details data — multi-photo + options for /vehicule/:slug pages
import carRangeRoverSport1 from "@/assets/car-range-rover-sport-1.jpg";
import carRangeRoverSport2 from "@/assets/car-range-rover-sport-2.jpg";
import carRangeRoverSport3 from "@/assets/car-range-rover-sport-3.jpg";
import carVwTouareg1 from "@/assets/car-vw-touareg-1.jpg";
import carVwTouareg2 from "@/assets/car-vw-touareg-2.jpg";
import carVwTouareg3 from "@/assets/car-vw-touareg-3.jpg";
import carHyundaiTucson1 from "@/assets/car-hyundai-tucson-1.jpg";
import carHyundaiTucson3 from "@/assets/car-hyundai-tucson-3.jpg";
import carMercedesC1 from "@/assets/car-mercedes-c-1.jpg";
import carMercedesC2 from "@/assets/car-mercedes-c-2.jpg";
import carMercedesC3 from "@/assets/car-mercedes-c-3.jpg";
import carCupraFormentor1 from "@/assets/car-cupra-formentor-1.jpg";
import carCupraFormentor2 from "@/assets/car-cupra-formentor-2.jpg";
import carAudiA3_1 from "@/assets/car-audi-a3-1.jpg";
import carAudiA3_2 from "@/assets/car-audi-a3-2.jpg";
import carHyundaiStaria1 from "@/assets/car-hyundai-staria-1.jpg";
import carHyundaiStaria2 from "@/assets/car-hyundai-staria-2.jpg";
import carHyundaiStaria3 from "@/assets/car-hyundai-staria-3.jpg";
// Fallback single photos for models without multi-photo set
import carDuster from "@/assets/car-duster.jpg";
import carSandero from "@/assets/car-dacia-sandero.jpg";
import carLogan from "@/assets/car-dacia-logan.jpg";
import carClio from "@/assets/car-clio.jpg";
import carAccent from "@/assets/car-hyundai-accent.jpg";
import carSportage from "@/assets/car-kia-sportage.jpg";
import carEvoque from "@/assets/car-range-rover-evoque.jpg";
import carMercedesA from "@/assets/car-mercedes-a.jpg";
import carMercedesE from "@/assets/car-mercedes-e.jpg";
import carMercedesG from "@/assets/car-mercedes-g.jpg";
import carBmw5 from "@/assets/car-bmw-5.jpg";
import carBmwX5 from "@/assets/car-bmw-x5.jpg";
import carAudiQ8 from "@/assets/car-audi-q8.jpg";
import carPorscheMacan from "@/assets/car-porsche-macan.jpg";
import carPorscheCayenne from "@/assets/car-porsche-cayenne.jpg";
import carVwGolf from "@/assets/car-vw-golf.jpg";
import carCorsa from "@/assets/car-opel-corsa.jpg";
import carPeugeot208 from "@/assets/car-peugeot-208.jpg";

export interface VehicleOption {
  label: string;
  value: string | boolean;
  icon?: string;
}

export interface VehicleDetail {
  slug: string;
  name: string;
  brand: string;
  category: string;
  priceFrom: number;
  priceDisplay: string;
  photos: string[];
  description: string;
  options: {
    transmission: string;
    seats: number;
    doors: number;
    luggage: string;
    fuel: string;
    consumption?: string;
    enginePower?: string;
    acceleration?: string;
    // Features
    airConditioning: boolean;
    bluetooth: boolean;
    gps?: boolean;
    cruiseControl?: boolean;
    parkingSensors?: boolean;
    rearCamera?: boolean;
    sunroof?: boolean;
    leatherSeats?: boolean;
    keyless?: boolean;
    androidAuto?: boolean;
    appleCarPlay?: boolean;
    isofix?: boolean;
    automaticEmergencyBraking?: boolean;
    laneAssist?: boolean;
    blindSpotMonitoring?: boolean;
  };
  highlights: string[];
  perfectFor: string[];
}

export const vehicleDetails: Record<string, VehicleDetail> = {
  "range-rover-sport": {
    slug: "range-rover-sport",
    name: "Range Rover Sport",
    brand: "Land Rover",
    category: "SUV Ultra-Premium",
    priceFrom: 1850,
    priceDisplay: "1850 MAD/jour",
    photos: [carRangeRoverSport1, carRangeRoverSport2, carRangeRoverSport3],
    description: "Le Range Rover Sport allie élégance britannique, performance et capacité tout-terrain. Idéal pour les mariages, événements VIP et tourisme premium au Maroc. Modèle récent (moins de 2 ans), entretenu en concession officielle.",
    options: {
      transmission: "Automatique 8 rapports",
      seats: 5,
      doors: 5,
      luggage: "780L (extensible à 1860L)",
      fuel: "Diesel hybride",
      consumption: "7,5L/100km",
      enginePower: "350 ch",
      acceleration: "5,9s (0-100 km/h)",
      airConditioning: true,
      bluetooth: true,
      gps: true,
      cruiseControl: true,
      parkingSensors: true,
      rearCamera: true,
      sunroof: true,
      leatherSeats: true,
      keyless: true,
      androidAuto: true,
      appleCarPlay: true,
      isofix: true,
      automaticEmergencyBraking: true,
      laneAssist: true,
      blindSpotMonitoring: true,
    },
    highlights: ["Image de prestige absolue", "Capacité tout-terrain pour Atlas/désert", "Confort 5 étoiles"],
    perfectFor: ["Mariages et événements VIP", "Tourisme luxe", "MRE retour au pays"],
  },
  "vw-touareg": {
    slug: "vw-touareg",
    name: "Volkswagen Touareg",
    brand: "Volkswagen",
    category: "SUV Premium",
    priceFrom: 950,
    priceDisplay: "950 MAD/jour",
    photos: [carVwTouareg1, carVwTouareg2, carVwTouareg3],
    description: "Le VW Touareg offre l'équilibre parfait entre luxe allemand et capacité tout-terrain. Idéal pour les familles MRE qui veulent voyager confortablement entre Casablanca, Marrakech et le sud marocain.",
    options: {
      transmission: "Automatique 8 rapports",
      seats: 5,
      doors: 5,
      luggage: "810L",
      fuel: "Diesel",
      consumption: "7,2L/100km",
      enginePower: "286 ch",
      acceleration: "6,1s (0-100 km/h)",
      airConditioning: true,
      bluetooth: true,
      gps: true,
      cruiseControl: true,
      parkingSensors: true,
      rearCamera: true,
      sunroof: true,
      leatherSeats: true,
      keyless: true,
      androidAuto: true,
      appleCarPlay: true,
      isofix: true,
      automaticEmergencyBraking: true,
      laneAssist: true,
      blindSpotMonitoring: true,
    },
    highlights: ["Confort longue distance", "Fiabilité allemande", "Espace bagages MRE"],
    perfectFor: ["Familles MRE", "Road trip nord-sud", "Aéroport Mohammed V"],
  },
  "mercedes-classe-c": {
    slug: "mercedes-classe-c",
    name: "Mercedes Classe C",
    brand: "Mercedes-Benz",
    category: "Berline Premium",
    priceFrom: 850,
    priceDisplay: "850 MAD/jour",
    photos: [carMercedesC1, carMercedesC2, carMercedesC3],
    description: "La Mercedes Classe C 2025 incarne l'élégance et la sophistication allemande. Finition AMG Line disponible. Parfaite pour les déplacements business, mariages et clients VIP.",
    options: {
      transmission: "Automatique 9G-Tronic",
      seats: 5,
      doors: 4,
      luggage: "455L",
      fuel: "Hybride / Diesel",
      consumption: "5,5L/100km",
      enginePower: "204 ch",
      acceleration: "7,3s (0-100 km/h)",
      airConditioning: true,
      bluetooth: true,
      gps: true,
      cruiseControl: true,
      parkingSensors: true,
      rearCamera: true,
      sunroof: true,
      leatherSeats: true,
      keyless: true,
      androidAuto: true,
      appleCarPlay: true,
      isofix: true,
      automaticEmergencyBraking: true,
      laneAssist: true,
      blindSpotMonitoring: true,
    },
    highlights: ["Élégance AMG Line", "MBUX écran tactile", "Confort exceptionnel"],
    perfectFor: ["Business travelers", "Mariages", "Hôtels 5 étoiles"],
  },
  "cupra-formentor": {
    slug: "cupra-formentor",
    name: "Cupra Formentor",
    brand: "Cupra",
    category: "SUV Sport",
    priceFrom: 750,
    priceDisplay: "750 MAD/jour",
    photos: [carCupraFormentor1, carCupraFormentor2],
    description: "Le Cupra Formentor est le SUV sportif espagnol qui fait sensation. Design audacieux, sensations dynamiques, technologie de pointe. Pour ceux qui veulent se démarquer.",
    options: {
      transmission: "Automatique DSG 7",
      seats: 5,
      doors: 5,
      luggage: "450L",
      fuel: "Essence",
      consumption: "6,8L/100km",
      enginePower: "190 ch",
      acceleration: "7,9s (0-100 km/h)",
      airConditioning: true,
      bluetooth: true,
      gps: true,
      cruiseControl: true,
      parkingSensors: true,
      rearCamera: true,
      sunroof: false,
      leatherSeats: false,
      keyless: true,
      androidAuto: true,
      appleCarPlay: true,
      isofix: true,
      automaticEmergencyBraking: true,
      laneAssist: true,
      blindSpotMonitoring: true,
    },
    highlights: ["Design sportif unique", "DSG 7 ultra-rapide", "Conduite dynamique"],
    perfectFor: ["Jeunes professionnels", "Couples touristes", "City breaks Marrakech"],
  },
  "hyundai-tucson": {
    slug: "hyundai-tucson",
    name: "Hyundai Tucson",
    brand: "Hyundai",
    category: "SUV Familial",
    priceFrom: 510,
    priceDisplay: "510 MAD/jour",
    photos: [carHyundaiTucson1, carHyundaiTucson3],
    description: "Le Hyundai Tucson nouvelle génération combine design futuriste, technologie embarquée et fiabilité éprouvée. Le choix #1 des familles MRE qui veulent un SUV confortable sans se ruiner.",
    options: {
      transmission: "Automatique 8 rapports",
      seats: 5,
      doors: 5,
      luggage: "620L",
      fuel: "Diesel / Hybride",
      consumption: "5,2L/100km",
      enginePower: "180 ch",
      acceleration: "9,2s (0-100 km/h)",
      airConditioning: true,
      bluetooth: true,
      gps: true,
      cruiseControl: true,
      parkingSensors: true,
      rearCamera: true,
      sunroof: true,
      leatherSeats: false,
      keyless: true,
      androidAuto: true,
      appleCarPlay: true,
      isofix: true,
      automaticEmergencyBraking: true,
      laneAssist: true,
      blindSpotMonitoring: true,
    },
    highlights: ["Garantie 5 ans incluse", "Tech avancée", "Confort 5 places"],
    perfectFor: ["Familles MRE", "Road trip Atlas", "Aéroport CMN/RAK"],
  },
  "hyundai-staria": {
    slug: "hyundai-staria",
    name: "Hyundai Staria",
    brand: "Hyundai",
    category: "Van 9 Places Premium",
    priceFrom: 1200,
    priceDisplay: "1200 MAD/jour",
    photos: [carHyundaiStaria1, carHyundaiStaria2, carHyundaiStaria3],
    description: "Le Hyundai Staria est le van futuriste qui révolutionne le transport de groupe. 9 places spacieuses, design avant-gardiste. Idéal pour grandes familles MRE et groupes touristiques.",
    options: {
      transmission: "Automatique 8 rapports",
      seats: 9,
      doors: 5,
      luggage: "Énorme (jusqu'à 1303L)",
      fuel: "Diesel",
      consumption: "8,5L/100km",
      enginePower: "177 ch",
      acceleration: "12s (0-100 km/h)",
      airConditioning: true,
      bluetooth: true,
      gps: true,
      cruiseControl: true,
      parkingSensors: true,
      rearCamera: true,
      sunroof: false,
      leatherSeats: false,
      keyless: true,
      androidAuto: true,
      appleCarPlay: true,
      isofix: true,
      automaticEmergencyBraking: true,
      laneAssist: true,
      blindSpotMonitoring: true,
    },
    highlights: ["9 places vraies", "Design futuriste", "Climatisation 3 zones"],
    perfectFor: ["Grandes familles MRE", "Groupes touristiques", "Transferts aéroport groupe"],
  },
  "audi-a3": {
    slug: "audi-a3",
    name: "Audi A3 Sportback",
    brand: "Audi",
    category: "Berline Compacte Premium",
    priceFrom: 720,
    priceDisplay: "720 MAD/jour",
    photos: [carAudiA3_1, carAudiA3_2],
    description: "L'Audi A3 Sportback est la berline compacte premium par excellence. Finition allemande impeccable, technologies dernière génération, agréable à conduire en ville comme sur autoroute.",
    options: {
      transmission: "Automatique S-Tronic 7",
      seats: 5,
      doors: 5,
      luggage: "380L",
      fuel: "Essence / Diesel",
      consumption: "5,8L/100km",
      enginePower: "150 ch",
      acceleration: "8,4s (0-100 km/h)",
      airConditioning: true,
      bluetooth: true,
      gps: true,
      cruiseControl: true,
      parkingSensors: true,
      rearCamera: true,
      sunroof: false,
      leatherSeats: false,
      keyless: true,
      androidAuto: true,
      appleCarPlay: true,
      isofix: true,
      automaticEmergencyBraking: true,
      laneAssist: true,
      blindSpotMonitoring: false,
    },
    highlights: ["Compact premium", "Virtual Cockpit", "Conduite agile"],
    perfectFor: ["Voyages couples", "Business courte durée", "Tourisme urbain"],
  },
  "dacia-duster": {
    slug: "dacia-duster",
    name: "Dacia Duster",
    brand: "Dacia",
    category: "SUV Économique",
    priceFrom: 400,
    priceDisplay: "400 MAD/jour",
    photos: [carDuster],
    description: "Le Dacia Duster est le SUV le plus apprécié au Maroc. Robuste, économique, polyvalent — idéal pour découvrir tous les paysages marocains. Le meilleur rapport qualité-prix du marché.",
    options: {
      transmission: "Manuelle 6 / Auto disponible",
      seats: 5,
      doors: 5,
      luggage: "478L",
      fuel: "Diesel / Essence",
      consumption: "5,9L/100km",
      enginePower: "115 ch",
      airConditioning: true,
      bluetooth: true,
      gps: false,
      cruiseControl: true,
      parkingSensors: true,
      rearCamera: false,
      sunroof: false,
      leatherSeats: false,
      keyless: false,
      androidAuto: true,
      appleCarPlay: true,
      isofix: true,
    },
    highlights: ["Robuste tout-terrain", "Consommation modeste", "Prix imbattable"],
    perfectFor: ["Budget conscients", "Atlas et Ourika", "Familles touristes"],
  },
  "renault-clio": {
    slug: "renault-clio",
    name: "Renault Clio",
    brand: "Renault",
    category: "Citadine",
    priceFrom: 350,
    priceDisplay: "350 MAD/jour",
    photos: [carClio],
    description: "La Renault Clio 5 est la citadine référence en France et au Maroc. Confortable, économique, facile à garer dans les médinas et les centres-villes.",
    options: {
      transmission: "Manuelle 5 / Auto EDC disponible",
      seats: 5,
      doors: 5,
      luggage: "391L",
      fuel: "Essence",
      consumption: "5,5L/100km",
      enginePower: "100 ch",
      airConditioning: true,
      bluetooth: true,
      gps: false,
      cruiseControl: true,
      parkingSensors: true,
      rearCamera: false,
      sunroof: false,
      leatherSeats: false,
      keyless: false,
      androidAuto: true,
      appleCarPlay: true,
      isofix: true,
    },
    highlights: ["Économique", "Facile à garer", "Conduite urbaine fluide"],
    perfectFor: ["Visites Marrakech/Médinas", "Couples touristes", "Budget court"],
  },
};

export const getVehicleDetail = (slug: string): VehicleDetail | undefined => {
  return vehicleDetails[slug];
};

export const getAllVehicleSlugs = (): string[] => {
  return Object.keys(vehicleDetails);
};
