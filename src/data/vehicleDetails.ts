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
import carDuster from "@/assets/car-duster.jpg";
import carJogger from "@/assets/car-dacia-jogger.jpg";
import carStepway from "@/assets/car-sandero-stepway.jpg";
import carBayon from "@/assets/car-hyundai-bayon.jpg";
import carAudiA4 from "@/assets/car-audi-a4.jpg";
import carAudiA6 from "@/assets/car-audi-a6.jpg";
import carAudiQ3 from "@/assets/car-audi-q3.jpg";
import carAudiQ5 from "@/assets/car-audi-q5.jpg";
import carAudiQ7 from "@/assets/car-audi-q7.jpg";
import carMercedesCLA from "@/assets/car-mercedes-cla.jpg";
import carMercedesGLA from "@/assets/car-mercedes-gla.jpg";
import carMercedesGLB from "@/assets/car-mercedes-glb.jpg";
import carMercedesGLC from "@/assets/car-mercedes-glc.jpg";
import carMercedesGLE from "@/assets/car-mercedes-gle.jpg";
import carHyundaiI20 from "@/assets/car-hyundai-i20.jpg";
import carVwTRoc from "@/assets/car-vw-troc.jpg";
import carHyundaiSantaFe from "@/assets/car-hyundai-santa-fe.jpg";

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
  "dacia-sandero": {
    slug: "dacia-sandero", name: "Dacia Sandero", brand: "Dacia",
    category: "Citadine Économique", priceFrom: 300, priceDisplay: "300 MAD/jour",
    photos: [carSandero],
    description: "La Dacia Sandero est la citadine la plus vendue en Europe et au Maroc. Confortable, fiable, économique. Le choix #1 des familles MRE budget-conscious.",
    options: { transmission: "Manuelle 5", seats: 5, doors: 5, luggage: "320L", fuel: "Essence", consumption: "5.8L/100km", enginePower: "90 ch", airConditioning: true, bluetooth: true, gps: false, cruiseControl: true, parkingSensors: false, rearCamera: false, sunroof: false, leatherSeats: false, keyless: false, androidAuto: true, appleCarPlay: true, isofix: true },
    highlights: ["Plus bas prix du marché", "Économique", "Facile à conduire"], perfectFor: ["Premier voyage Maroc", "Étudiants", "Budget court"]
  },
  "dacia-logan": {
    slug: "dacia-logan", name: "Dacia Logan", brand: "Dacia",
    category: "Berline Économique", priceFrom: 300, priceDisplay: "300 MAD/jour",
    photos: [carLogan],
    description: "La Dacia Logan offre l'espace d'une berline pour le prix d'une citadine. Idéale pour les longs trajets et les familles MRE.",
    options: { transmission: "Manuelle 5", seats: 5, doors: 4, luggage: "510L", fuel: "Essence", consumption: "5.5L/100km", airConditioning: true, bluetooth: true, isofix: true, androidAuto: true, appleCarPlay: true },
    highlights: ["Coffre énorme", "Confort longue distance", "Robuste"], perfectFor: ["Familles MRE", "Long séjour", "Casa-Marrakech"]
  },
  "dacia-sandero-stepway": {
    slug: "dacia-sandero-stepway", name: "Dacia Sandero Stepway", brand: "Dacia",
    category: "Crossover Économique", priceFrom: 350, priceDisplay: "350 MAD/jour",
    photos: [carStepway],
    description: "La Sandero Stepway combine l'esprit baroudeur d'un crossover avec le budget d'une citadine.",
    options: { transmission: "Manuelle 5", seats: 5, doors: 5, luggage: "328L", fuel: "Essence", airConditioning: true, bluetooth: true, isofix: true, androidAuto: true, appleCarPlay: true },
    highlights: ["Garde au sol surélevée", "Économique", "Polyvalent"], perfectFor: ["Routes secondaires", "Ourika", "Atlas"]
  },
  "dacia-jogger": {
    slug: "dacia-jogger", name: "Dacia Jogger", brand: "Dacia",
    category: "Monospace 7 Places", priceFrom: 380, priceDisplay: "380 MAD/jour",
    photos: [carJogger],
    description: "Le Dacia Jogger est le monospace 7 places le plus abordable du marché. Espace, économie et flexibilité.",
    options: { transmission: "Manuelle 6", seats: 7, doors: 5, luggage: "699L (3 places)", fuel: "Essence", airConditioning: true, bluetooth: true, isofix: true, androidAuto: true, appleCarPlay: true },
    highlights: ["7 vraies places", "Coffre modulable", "Économie carburant"], perfectFor: ["Grandes familles MRE", "Groupes touristes", "Mariages familiaux"]
  },
  "renault-clio": {
    slug: "renault-clio", name: "Renault Clio", brand: "Renault",
    category: "Citadine Premium", priceFrom: 350, priceDisplay: "350 MAD/jour",
    photos: [carClio],
    description: "La Renault Clio 5 est la citadine référence. Confortable, économique, technologique.",
    options: { transmission: "Manuelle 5 / Auto EDC", seats: 5, doors: 5, luggage: "391L", fuel: "Essence", consumption: "5.5L/100km", airConditioning: true, bluetooth: true, cruiseControl: true, parkingSensors: true, androidAuto: true, appleCarPlay: true, isofix: true },
    highlights: ["Économique", "Facile à garer", "Conduite urbaine fluide"], perfectFor: ["Visites Marrakech/Médinas", "Couples touristes", "Budget court"]
  },
  "hyundai-accent": {
    slug: "hyundai-accent", name: "Hyundai Accent", brand: "Hyundai",
    category: "Berline Confort", priceFrom: 350, priceDisplay: "350 MAD/jour",
    photos: [carAccent],
    description: "La Hyundai Accent offre le meilleur rapport confort/prix de sa catégorie. Berline moderne avec garantie 5 ans.",
    options: { transmission: "Automatique", seats: 5, doors: 4, luggage: "460L", fuel: "Essence", consumption: "6.0L/100km", airConditioning: true, bluetooth: true, cruiseControl: true, parkingSensors: true, rearCamera: true, androidAuto: true, appleCarPlay: true, isofix: true, keyless: true },
    highlights: ["Garantie 5 ans", "Boîte auto incluse", "Confort moderne"], perfectFor: ["MRE retour", "Visites multi-villes", "Première location"]
  },
  "hyundai-bayon": {
    slug: "hyundai-bayon", name: "Hyundai Bayon", brand: "Hyundai",
    category: "Crossover Urbain", priceFrom: 450, priceDisplay: "450 MAD/jour",
    photos: [carBayon],
    description: "Le Hyundai Bayon est le crossover urbain qui mixe design SUV et agilité citadine.",
    options: { transmission: "Manuelle / Auto", seats: 5, doors: 5, luggage: "411L", fuel: "Essence", airConditioning: true, bluetooth: true, cruiseControl: true, parkingSensors: true, rearCamera: true, androidAuto: true, appleCarPlay: true, isofix: true },
    highlights: ["Design SUV compact", "Tech avancée", "Conso modeste"], perfectFor: ["Couples", "Tourisme urbain", "Trajets courts"]
  },
  "kia-sportage": {
    slug: "kia-sportage", name: "Kia Sportage", brand: "Kia",
    category: "SUV Familial Confort", priceFrom: 470, priceDisplay: "470 MAD/jour",
    photos: [carSportage],
    description: "Le Kia Sportage nouvelle génération combine design audacieux, technologie embarquée et fiabilité légendaire Kia.",
    options: { transmission: "Automatique", seats: 5, doors: 5, luggage: "591L", fuel: "Diesel/Hybride", consumption: "5.6L/100km", enginePower: "180 ch", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, sunroof: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true, blindSpotMonitoring: true },
    highlights: ["Design moderne", "Garantie 7 ans", "Tech premium"], perfectFor: ["Familles MRE", "Tourisme premium", "Road trip"]
  },
  "range-rover-evoque": {
    slug: "range-rover-evoque", name: "Range Rover Evoque", brand: "Land Rover",
    category: "SUV Premium Compact", priceFrom: 1100, priceDisplay: "1100 MAD/jour",
    photos: [carEvoque],
    description: "Le Range Rover Evoque allie l'élégance britannique au format urbain. SUV premium pour clients exigeants.",
    options: { transmission: "Automatique 9 rapports", seats: 5, doors: 5, luggage: "591L", fuel: "Diesel/Hybride", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, sunroof: true, leatherSeats: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true, blindSpotMonitoring: true },
    highlights: ["Élégance Land Rover", "Confort premium", "Image de marque"], perfectFor: ["Couples luxe", "Mariages", "Hôtels 5 étoiles"]
  },
  "mercedes-classe-a": {
    slug: "mercedes-classe-a", name: "Mercedes Classe A", brand: "Mercedes-Benz",
    category: "Compacte Premium", priceFrom: 700, priceDisplay: "700 MAD/jour",
    photos: [carMercedesA],
    description: "La Mercedes Classe A version A200d offre l'expérience premium Mercedes en format compact. Idéale en ville.",
    options: { transmission: "Automatique 7G-DCT", seats: 5, doors: 5, luggage: "370L", fuel: "Diesel/Essence", consumption: "5.0L/100km", enginePower: "150 ch", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true },
    highlights: ["MBUX écran tactile", "AMG Line disponible", "Compacte premium"], perfectFor: ["Business courte durée", "Couples", "Tourisme urbain"]
  },
  "mercedes-classe-e": {
    slug: "mercedes-classe-e", name: "Mercedes Classe E", brand: "Mercedes-Benz",
    category: "Berline Executive", priceFrom: 1000, priceDisplay: "1000 MAD/jour",
    photos: [carMercedesE],
    description: "La Mercedes Classe E est la berline executive par excellence. Confort, prestige, technologie.",
    options: { transmission: "Automatique 9G-Tronic", seats: 5, doors: 4, luggage: "540L", fuel: "Diesel/Hybride", consumption: "5.2L/100km", enginePower: "265 ch", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, sunroof: true, leatherSeats: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true, blindSpotMonitoring: true },
    highlights: ["Prestige Mercedes", "Confort exceptionnel", "Tech embarquée"], perfectFor: ["Business VIP", "Mariages", "Voyages d affaires"]
  },
  "mercedes-classe-g": {
    slug: "mercedes-classe-g", name: "Mercedes Classe G", brand: "Mercedes-Benz",
    category: "SUV Ultra-Luxe Iconique", priceFrom: 2800, priceDisplay: "2800 MAD/jour",
    photos: [carMercedesG],
    description: "La Mercedes Classe G est le SUV iconique par excellence. Capacité tout-terrain absolue, finition luxe, présence inimitable.",
    options: { transmission: "Automatique 9G-Tronic", seats: 5, doors: 5, luggage: "454L", fuel: "Essence V8", enginePower: "585 ch (AMG)", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, sunroof: true, leatherSeats: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true, blindSpotMonitoring: true },
    highlights: ["Icône Mercedes", "V8 puissant", "Image absolue"], perfectFor: ["Mariages premium", "Évenements VIP", "Tournages"]
  },
  "mercedes-cla": {
    slug: "mercedes-cla", name: "Mercedes CLA", brand: "Mercedes-Benz",
    category: "Coupé 4 portes Sport", priceFrom: 880, priceDisplay: "880 MAD/jour",
    photos: [carMercedesCLA],
    description: "La Mercedes CLA combine ligne sportive de coupé et praticité d une berline 4 portes.",
    options: { transmission: "Automatique 7G-DCT", seats: 5, doors: 4, luggage: "460L", fuel: "Diesel/Essence", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, sunroof: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true },
    highlights: ["Design coupé", "AMG Line", "Premium accessible"], perfectFor: ["Jeunes pros", "Couples", "Image"]
  },
  "mercedes-gla": {
    slug: "mercedes-gla", name: "Mercedes GLA", brand: "Mercedes-Benz",
    category: "SUV Compact Premium", priceFrom: 780, priceDisplay: "780 MAD/jour",
    photos: [carMercedesGLA],
    description: "Le Mercedes GLA est le SUV compact premium. Format urbain, équipements Mercedes complets.",
    options: { transmission: "Automatique 8G-DCT", seats: 5, doors: 5, luggage: "435L", fuel: "Diesel/Hybride", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true },
    highlights: ["SUV compact", "MBUX intégré", "Polyvalent"], perfectFor: ["Familles urbaines", "Couples", "City breaks"]
  },
  "mercedes-glb": {
    slug: "mercedes-glb", name: "Mercedes GLB", brand: "Mercedes-Benz",
    category: "SUV 7 Places Premium", priceFrom: 820, priceDisplay: "820 MAD/jour",
    photos: [carMercedesGLB],
    description: "Le Mercedes GLB combine luxe premium et 7 places. SUV familial haut de gamme.",
    options: { transmission: "Automatique 8G-DCT", seats: 7, doors: 5, luggage: "565L (5 places)", fuel: "Diesel", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, sunroof: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true },
    highlights: ["7 places Mercedes", "Espace familial", "Premium"], perfectFor: ["Grandes familles MRE", "Tourisme premium"]
  },
  "mercedes-glc": {
    slug: "mercedes-glc", name: "Mercedes GLC", brand: "Mercedes-Benz",
    category: "SUV Premium", priceFrom: 1020, priceDisplay: "1020 MAD/jour",
    photos: [carMercedesGLC],
    description: "Le Mercedes GLC est le SUV premium de référence. Élégance, confort, technologie.",
    options: { transmission: "Automatique 9G-Tronic", seats: 5, doors: 5, luggage: "620L", fuel: "Diesel/Hybride", enginePower: "265 ch", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, sunroof: true, leatherSeats: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true, blindSpotMonitoring: true },
    highlights: ["SUV référence", "Confort premium", "Image Mercedes"], perfectFor: ["Familles premium", "Affaires"]
  },
  "mercedes-gle": {
    slug: "mercedes-gle", name: "Mercedes GLE", brand: "Mercedes-Benz",
    category: "SUV Premium Large", priceFrom: 1250, priceDisplay: "1250 MAD/jour",
    photos: [carMercedesGLE],
    description: "Le Mercedes GLE est le grand SUV premium. Espace, luxe, capacité tout-terrain.",
    options: { transmission: "Automatique 9G-Tronic", seats: 5, doors: 5, luggage: "825L", fuel: "Diesel/Hybride", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, sunroof: true, leatherSeats: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true, blindSpotMonitoring: true },
    highlights: ["Grand SUV luxe", "Espace exceptionnel", "Atlas/Désert"], perfectFor: ["Familles VIP", "Road trip premium", "Mariages"]
  },
  "bmw-5": {
    slug: "bmw-5", name: "BMW Série 5", brand: "BMW",
    category: "Berline Executive Sport", priceFrom: 950, priceDisplay: "950 MAD/jour",
    photos: [carBmw5],
    description: "La BMW Série 5 incarne le plaisir de conduire allemand au format executive. Sport et confort.",
    options: { transmission: "Automatique 8 rapports", seats: 5, doors: 4, luggage: "520L", fuel: "Diesel/Essence", enginePower: "265 ch", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, sunroof: true, leatherSeats: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true, blindSpotMonitoring: true },
    highlights: ["Plaisir de conduire", "Sport business", "M Sport disponible"], perfectFor: ["Business", "Couples premium", "Affaires"]
  },
  "bmw-x5": {
    slug: "bmw-x5", name: "BMW X5", brand: "BMW",
    category: "SUV Premium Large", priceFrom: 1100, priceDisplay: "1100 MAD/jour",
    photos: [carBmwX5],
    description: "Le BMW X5 est le grand SUV premium qui combine sportivité allemande et confort de voyage.",
    options: { transmission: "Automatique 8 rapports", seats: 5, doors: 5, luggage: "650L", fuel: "Diesel/Hybride", enginePower: "286 ch", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, sunroof: true, leatherSeats: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true, blindSpotMonitoring: true },
    highlights: ["SUV sportif", "Plaisir de conduire", "Tech BMW"], perfectFor: ["Familles premium", "Atlas", "Image business"]
  },
  "audi-a4": {
    slug: "audi-a4", name: "Audi A4", brand: "Audi",
    category: "Berline Premium", priceFrom: 800, priceDisplay: "800 MAD/jour",
    photos: [carAudiA4],
    description: "L Audi A4 est la berline premium de référence. Quality allemande, technologie, confort.",
    options: { transmission: "Automatique S-Tronic", seats: 5, doors: 4, luggage: "460L", fuel: "Diesel/Essence", enginePower: "204 ch", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, sunroof: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true, blindSpotMonitoring: true },
    highlights: ["Audi Virtual Cockpit", "Confort premium", "Quattro disponible"], perfectFor: ["Business", "Couples", "Affaires"]
  },
  "audi-a6": {
    slug: "audi-a6", name: "Audi A6", brand: "Audi",
    category: "Berline Executive", priceFrom: 920, priceDisplay: "920 MAD/jour",
    photos: [carAudiA6],
    description: "L Audi A6 est la grande berline executive Audi. Présence, technologie, confort longue distance.",
    options: { transmission: "Automatique Tiptronic", seats: 5, doors: 4, luggage: "530L", fuel: "Diesel/Hybride", enginePower: "286 ch", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, sunroof: true, leatherSeats: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true, blindSpotMonitoring: true },
    highlights: ["Grande berline luxe", "MMI Navigation Plus", "Quattro disponible"], perfectFor: ["VIP", "Affaires", "Voyages longue distance"]
  },
  "audi-q3": {
    slug: "audi-q3", name: "Audi Q3", brand: "Audi",
    category: "SUV Compact Premium", priceFrom: 760, priceDisplay: "760 MAD/jour",
    photos: [carAudiQ3],
    description: "L Audi Q3 est le SUV compact premium Audi. Format urbain, équipements premium, polyvalence.",
    options: { transmission: "Automatique S-Tronic", seats: 5, doors: 5, luggage: "530L", fuel: "Diesel/Essence", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, sunroof: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true },
    highlights: ["SUV compact", "Virtual Cockpit", "Polyvalent"], perfectFor: ["Couples", "City breaks", "Tourisme urbain"]
  },
  "audi-q5": {
    slug: "audi-q5", name: "Audi Q5", brand: "Audi",
    category: "SUV Premium", priceFrom: 1000, priceDisplay: "1000 MAD/jour",
    photos: [carAudiQ5],
    description: "L Audi Q5 est le SUV premium référence. Quattro, technologie embarquée, confort.",
    options: { transmission: "Automatique Tiptronic", seats: 5, doors: 5, luggage: "550L", fuel: "Diesel/Hybride", enginePower: "265 ch", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, sunroof: true, leatherSeats: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true, blindSpotMonitoring: true },
    highlights: ["Quattro 4 roues motrices", "S Line disponible", "Confort premium"], perfectFor: ["Familles premium", "Atlas", "Tourisme"]
  },
  "audi-q7": {
    slug: "audi-q7", name: "Audi Q7", brand: "Audi",
    category: "SUV 7 Places Premium", priceFrom: 1150, priceDisplay: "1150 MAD/jour",
    photos: [carAudiQ7],
    description: "L Audi Q7 est le grand SUV 7 places premium Audi. Espace, luxe, technologie.",
    options: { transmission: "Automatique Tiptronic", seats: 7, doors: 5, luggage: "770L (5 places)", fuel: "Diesel/Hybride", enginePower: "286 ch", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, sunroof: true, leatherSeats: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true, blindSpotMonitoring: true },
    highlights: ["7 places vraies", "Quattro premium", "Espace exceptionnel"], perfectFor: ["Grandes familles MRE", "Mariages", "Tournages"]
  },
  "audi-q8": {
    slug: "audi-q8", name: "Audi Q8", brand: "Audi",
    category: "SUV Coupé Luxe", priceFrom: 1500, priceDisplay: "1500 MAD/jour",
    photos: [carAudiQ8],
    description: "L Audi Q8 est le SUV coupé luxe d Audi. Ligne sportive, présence absolue, technologie embarquée.",
    options: { transmission: "Automatique Tiptronic", seats: 5, doors: 5, luggage: "605L", fuel: "Diesel/Hybride", enginePower: "286 ch", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, sunroof: true, leatherSeats: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true, blindSpotMonitoring: true },
    highlights: ["SUV coupé sport", "S Line", "Image absolue"], perfectFor: ["VIP", "Mariages", "Affaires premium"]
  },
  "porsche-cayenne": {
    slug: "porsche-cayenne", name: "Porsche Cayenne", brand: "Porsche",
    category: "SUV Ultra-Luxe Sport", priceFrom: 1900, priceDisplay: "1900 MAD/jour",
    photos: [carPorscheCayenne],
    description: "Le Porsche Cayenne combine performance Porsche et capacité SUV. Ultra-luxe sportif.",
    options: { transmission: "Automatique Tiptronic 8", seats: 5, doors: 5, luggage: "650L", fuel: "Essence/Hybride", enginePower: "340 ch", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, sunroof: true, leatherSeats: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true, blindSpotMonitoring: true },
    highlights: ["Performance Porsche", "Présence ultra-luxe", "Conduite sportive"], perfectFor: ["VIP", "Mariages prestige", "Évenements"]
  },
  "porsche-macan": {
    slug: "porsche-macan", name: "Porsche Macan", brand: "Porsche",
    category: "SUV Sport Compact", priceFrom: 1300, priceDisplay: "1300 MAD/jour",
    photos: [carPorscheMacan],
    description: "Le Porsche Macan est le SUV compact sportif Porsche. Compact, agile, ultra-premium.",
    options: { transmission: "Automatique PDK 7", seats: 5, doors: 5, luggage: "488L", fuel: "Essence", enginePower: "265 ch", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, sunroof: true, leatherSeats: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true, blindSpotMonitoring: true },
    highlights: ["Conduite Porsche", "Compact luxe", "PDK 7 rapports"], perfectFor: ["Couples premium", "Image", "Week-ends luxe"]
  },
  "vw-golf": {
    slug: "vw-golf", name: "Volkswagen Golf", brand: "Volkswagen",
    category: "Compacte Premium", priceFrom: 390, priceDisplay: "390 MAD/jour",
    photos: [carVwGolf],
    description: "La VW Golf est LA compacte de référence. Qualité allemande, agréable, polyvalente.",
    options: { transmission: "Manuelle/Auto DSG", seats: 5, doors: 5, luggage: "381L", fuel: "Essence/Diesel", consumption: "5.4L/100km", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true },
    highlights: ["Compacte référence", "Qualité allemande", "Polyvalente"], perfectFor: ["Tous publics", "Tourisme", "Famille"]
  },
  "opel-corsa": {
    slug: "opel-corsa", name: "Opel Corsa", brand: "Opel",
    category: "Citadine Économique", priceFrom: 310, priceDisplay: "310 MAD/jour",
    photos: [carCorsa],
    description: "L Opel Corsa est la citadine pratique pour les balades urbaines au Maroc.",
    options: { transmission: "Manuelle", seats: 5, doors: 5, luggage: "309L", fuel: "Essence", airConditioning: true, bluetooth: true, androidAuto: true, appleCarPlay: true, isofix: true },
    highlights: ["Économique", "Format urbain", "Facile à conduire"], perfectFor: ["Premier voyage", "Visites villes", "Budget court"]
  },
  "peugeot-208": {
    slug: "peugeot-208", name: "Peugeot 208", brand: "Peugeot",
    category: "Citadine Design", priceFrom: 320, priceDisplay: "320 MAD/jour",
    photos: [carPeugeot208],
    description: "La Peugeot 208 nouvelle génération est la citadine au design audacieux. i-Cockpit innovant.",
    options: { transmission: "Manuelle/Auto EAT8", seats: 5, doors: 5, luggage: "311L", fuel: "Essence/Diesel", airConditioning: true, bluetooth: true, cruiseControl: true, parkingSensors: true, androidAuto: true, appleCarPlay: true, isofix: true },
    highlights: ["Design audacieux", "i-Cockpit 3D", "Économique"], perfectFor: ["Couples", "Tourisme urbain", "Jeunes"]
  },
  "seat-ibiza": {
    slug: "seat-ibiza", name: "Seat Ibiza", brand: "Seat",
    category: "Citadine Sport", priceFrom: 290, priceDisplay: "290 MAD/jour",
    photos: [carSandero],
    description: "La Seat Ibiza combine design espagnol et fiabilité Volkswagen Group. Citadine sport accessible.",
    options: { transmission: "Manuelle/DSG", seats: 5, doors: 5, luggage: "355L", fuel: "Essence", airConditioning: true, bluetooth: true, cruiseControl: true, parkingSensors: true, androidAuto: true, appleCarPlay: true, isofix: true },
    highlights: ["Design espagnol", "Base VW", "Sport accessible"], perfectFor: ["Jeunes", "Couples", "Tourisme"]
  }
,
  "hyundai-i20": {
    slug: "hyundai-i20", name: "Hyundai i20", brand: "Hyundai",
    category: "Citadine Moderne", priceFrom: 320, priceDisplay: "320 MAD/jour",
    photos: [carHyundaiI20],
    description: "La Hyundai i20 nouvelle generation est la citadine moderne et stylee. Design audacieux, equipement complet, conso modeste.",
    options: { transmission: "Manuelle/Auto", seats: 5, doors: 5, luggage: "352L", fuel: "Essence", airConditioning: true, bluetooth: true, cruiseControl: true, parkingSensors: true, rearCamera: true, androidAuto: true, appleCarPlay: true, isofix: true },
    highlights: ["Design moderne", "Garantie 5 ans", "Citadine accessible"], perfectFor: ["Couples", "Visites urbaines", "Premier voyage"]
  },
  "volkswagen-troc": {
    slug: "volkswagen-troc", name: "Volkswagen T-Roc", brand: "Volkswagen",
    category: "SUV Compact", priceFrom: 510, priceDisplay: "510 MAD/jour",
    photos: [carVwTRoc],
    description: "Le VW T-Roc est le SUV compact stylise. Format urbain, technologie VW, agreable a conduire en ville et autoroute.",
    options: { transmission: "Automatique DSG", seats: 5, doors: 5, luggage: "445L", fuel: "Essence/Diesel", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, sunroof: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true },
    highlights: ["SUV compact VW", "Design dynamique", "Tech embarquee"], perfectFor: ["Jeunes pros", "Couples", "City breaks"]
  },
  "hyundai-santa-fe": {
    slug: "hyundai-santa-fe", name: "Hyundai Santa Fe", brand: "Hyundai",
    category: "SUV 7 Places Premium", priceFrom: 820, priceDisplay: "820 MAD/jour",
    photos: [carHyundaiSantaFe],
    description: "Le Hyundai Santa Fe est le grand SUV 7 places ideal pour familles MRE nombreuses. Espace, confort, equipements premium.",
    options: { transmission: "Automatique 8 rapports", seats: 7, doors: 5, luggage: "634L (5 places)", fuel: "Diesel/Hybride", consumption: "6.5L/100km", enginePower: "230 ch", airConditioning: true, bluetooth: true, gps: true, cruiseControl: true, parkingSensors: true, rearCamera: true, sunroof: true, keyless: true, androidAuto: true, appleCarPlay: true, isofix: true, automaticEmergencyBraking: true, laneAssist: true, blindSpotMonitoring: true },
    highlights: ["7 places vraies", "Garantie 5 ans", "Confort premium"], perfectFor: ["Grandes familles MRE", "Road trip groupe", "Mariages"]
  }

};

export const getVehicleDetail = (slug: string): VehicleDetail | undefined => {
  return vehicleDetails[slug];
};

export const getAllVehicleSlugs = (): string[] => {
  return Object.keys(vehicleDetails);
};
