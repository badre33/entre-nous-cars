/**
 * Générateur de contenu SEO pour pages longue traîne additionnelles
 * Template réutilisable avec variations selon mots-clés
 */

import { LongTailPageConfig } from "./longTailPages";

// Données vraiment uniques par aéroport pour différencier le contenu SEO
// (résout le near-duplicate content qui empêchait Google d'indexer les 6 pages)
interface AirportData {
  iata: string;
  fullName: string;
  terminals: string;
  distanceFromCenter: string;
  travelTime: string;
  mainRoad: string;
  parkingInfo: string;
  practicalNotes: string;
  cityAttractions: string;
}

const AIRPORT_DATA: Record<string, AirportData> = {
  casablanca: {
    iata: "CMN",
    fullName: "Aéroport international Mohammed V",
    terminals: "2 terminaux passagers (T1 dédié aux compagnies low-cost et charters, T2 pour les compagnies régulières Air France, Royal Air Maroc, Lufthansa, etc.)",
    distanceFromCenter: "30 km au sud-est du centre-ville de Casablanca",
    travelTime: "35-50 minutes en heure de pointe, 25-30 min hors pointe",
    mainRoad: "Autoroute A7 (péage ~25 DH depuis Casablanca-centre) ou route N1 gratuite mais plus longue",
    parkingInfo: "P1 (très courte durée, 10 min gratuites), P2 (courte durée, premiers 30 min à 20 DH), P3-P4 (longue durée, 80 DH/jour, navette gratuite vers terminaux toutes les 15 min)",
    practicalNotes: "Le terminal 1 et le terminal 2 sont reliés par une passerelle couverte de 8 minutes à pied. Train ONCF direct vers Casa-Voyageurs (40 min, 43 DH) toutes les heures depuis le sous-sol du T1. Wi-Fi gratuit illimité. Zone arrivées : sortie centrale du hall pour récupération de véhicule sans gêner le flux.",
    cityAttractions: "Mosquée Hassan II (35 min), Médina de Casablanca (40 min), Corniche d'Aïn Diab (35 min), Morocco Mall (40 min). Pour Marrakech depuis CMN : A7 directe, 2h45."
  },
  marrakech: {
    iata: "RAK",
    fullName: "Aéroport international Marrakech-Menara",
    terminals: "1 grand terminal moderne unique (rénové en 2024), avec ailes A (arrivées) et B (départs)",
    distanceFromCenter: "6 km à l'ouest du centre-ville de Marrakech (l'un des aéroports les plus proches du centre au monde)",
    travelTime: "15-20 minutes vers Jemaa el-Fna, 10 min vers Guéliz/Hivernage",
    mainRoad: "Avenue Mohammed VI puis route P10. Pas d'autoroute nécessaire — trajet 100% gratuit",
    parkingInfo: "P1 (10 min gratuites), P2 (15 DH/h), parking longue durée P3 (60 DH/jour). Files de taxi régulées avec compteur obligatoire (70 DH jour, 100 DH nuit vers Médina)",
    practicalNotes: "Terminal climatisé indispensable en été (>40°C juin-août). Distributeurs ATM dans les arrivées (commission 25-40 DH selon banque). Bureau de change ouvert 24/7 mais taux moyen — préférer les banques en ville. Point de rencontre conseillé : sortie principale côté avenue, après les taxis.",
    cityAttractions: "Jemaa el-Fna (15 min), Jardin Majorelle (10 min), Palmeraie (20 min), Ourika Valley (50 min), Atlas (1h30). Essaouira en 3h par la N8."
  },
  agadir: {
    iata: "AGA",
    fullName: "Aéroport d'Agadir Al-Massira",
    terminals: "1 terminal récemment agrandi (capacité 3M passagers/an), bien dimensionné pour les flux touristiques saisonniers",
    distanceFromCenter: "25 km au sud-est d'Agadir, à côté de la commune de Aït Melloul",
    travelTime: "25-35 minutes vers la baie d'Agadir et la zone touristique",
    mainRoad: "Route nationale N10 puis sortie aéroport. Pas de péage. Attention au radar fixe à 90 km/h à 5 km de l'aéroport",
    parkingInfo: "P1 dépose-minute (15 min gratuites), P2 (50 DH/jour), P3 longue durée (35 DH/jour, parking sécurisé)",
    practicalNotes: "Aéroport saisonnier : très chargé novembre-mars (vols charters européens), plus calme en été. Climat doux toute l'année (15-28°C). Taxis grand bleu : 250-350 DH vers les hôtels de la zone touristique. Beaucoup de loueurs internationaux mais souvent comptoir fermé entre les vols.",
    cityAttractions: "Plage d'Agadir (25 min), Marina (28 min), Souk El Had (25 min), Taghazout (45 min, spot de surf), Paradise Valley (1h), Essaouira (2h30), Taroudant (1h)."
  },
  tanger: {
    iata: "TNG",
    fullName: "Aéroport international Ibn Battouta de Tanger",
    terminals: "1 terminal moderne réorganisé en 2023 (capacité 2.5M passagers/an), nommé en hommage au célèbre explorateur tangérois du XIVᵉ siècle",
    distanceFromCenter: "15 km au sud-ouest du centre de Tanger, près de Boukhalef",
    travelTime: "20-25 minutes vers la médina de Tanger, 30 min vers le port Tanger-Med",
    mainRoad: "Route N1 puis raccord rapide vers l'autoroute A4. Trajet aéroport-centre quasi entièrement à 2x2 voies",
    parkingInfo: "P1 (dépose 10 min gratuites), parking principal (30 DH les 2 premières heures, puis 10 DH/h), longue durée (60 DH/jour)",
    practicalNotes: "Aéroport en pleine croissance (+15% trafic/an), capte les flux européens vers l'Espagne du Sud. Climat océanique : prévoir un vêtement même en été. Possibilité train ONCF Al Boraq depuis Tanger Ville vers Casa/Rabat. Forte communauté espagnole et française résidente.",
    cityAttractions: "Médina de Tanger (20 min), Cap Spartel et grottes d'Hercule (40 min), Asilah (40 min), Tétouan (1h), Chefchaouen (2h depuis l'aéroport)."
  },
  fes: {
    iata: "FEZ",
    fullName: "Aéroport Fès-Saïss",
    terminals: "1 terminal de taille modeste (1.5M passagers/an), efficace et rapide à traverser",
    distanceFromCenter: "15 km au sud-ouest de la médina de Fès, plateau de Saïss",
    travelTime: "20-25 minutes vers Fès el-Bali (médina), 15 min vers Fès el-Jdid",
    mainRoad: "Route R713 puis N6. Pas d'autoroute mais trajet rapide via la rocade. Travaux d'élargissement en cours sur la route principale",
    parkingInfo: "Parking unique (P1) : 15 min gratuites, puis 25 DH les premières 4h, 60 DH/jour. Surveillance permanente",
    practicalNotes: "Aéroport beaucoup plus calme que Casa/Marrakech : récupération bagages en 10 min en moyenne. Peu de loueurs internationaux installés (avantage tarif pour Benatna). Idéal point d'entrée pour découvrir le Nord/Centre du Maroc. Train ONCF depuis Fès Ville vers Meknès/Tanger.",
    cityAttractions: "Médina de Fès (20 min, classée UNESCO), Meknès et Volubilis (1h), Moulay Idriss (50 min), Ifrane (1h), gorges du Ziz (3h)."
  },
  rabat: {
    iata: "RBA",
    fullName: "Aéroport international Rabat-Salé",
    terminals: "1 terminal compact (1M passagers/an), parmi les plus petits aéroports internationaux du Maroc — d'où sa rapidité",
    distanceFromCenter: "8 km au nord-est du centre de Rabat (de l'autre côté du Bouregreg, sur Salé)",
    travelTime: "15-25 minutes vers les ministères de Rabat-centre ou Agdal, 10 min vers Salé",
    mainRoad: "Route R401, puis pont Hassan II ou pont Moulay Hassan vers Rabat. Tramway envisagé à l'horizon 2027",
    parkingInfo: "Parking unique : 15 min gratuites, 20 DH/h, 50 DH/jour. Petite taille — saturé en heures d'affluence diplomatique",
    practicalNotes: "Aéroport principalement diplomatique et corporate : moins de touristes, plus de cadres et fonctionnaires. Vols limités (Air France, RAM, Lufthansa principalement). Service rapide grâce à la taille modeste. Capitale administrative : prévoir embouteillages 8h-9h et 17h-19h en semaine.",
    cityAttractions: "Tour Hassan et mausolée Mohammed V (15 min), Kasbah des Oudayas (20 min), Médina de Salé (10 min), plage des Nations (25 min). Rabat-Casa par autoroute A1 en 1h."
  }
};


// Template pour aéroport — avec sections vraiment uniques par aéroport (anti-duplicate content)
const createAeroportPage = (city: string, citySlug: string, airport: string): LongTailPageConfig => {
  const data = AIRPORT_DATA[citySlug];
  if (!data) throw new Error(`Missing AIRPORT_DATA for ${citySlug}`);

  return {
  slug: `location-voiture-aeroport-${citySlug}`,
  title: `Location Voiture Aéroport ${city} (${data.iata})`,
  metaTitle: `Location Voiture Aéroport ${city} ${data.iata} dès 200 DH/jour - Sans Carte de Crédit | Benatna`,
  metaDescription: `Location voiture ${data.fullName} (${data.iata}). Livraison gratuite au terminal, ${data.distanceFromCenter}. Réservation en ligne, prix dès 200 DH/jour.`,
  keywords: `location voiture aéroport ${citySlug}, ${data.iata} location auto, louer voiture terminal ${city}, ${data.fullName}`,
  h1: `Location de Voiture à l'${data.fullName} (${data.iata})`,
  heroSubtitle: `${data.distanceFromCenter} • Livraison gratuite au terminal • Dès 200 DH/jour`,
  category: {
    label: "Locations Aéroports",
    href: "/nos-services?category=aeroport"
  },
  content: {
    intro: `Arrivez à l'${data.fullName} (code IATA ${data.iata}) et récupérez votre voiture de location en quelques minutes avec Benatna. L'aéroport se situe à ${data.distanceFromCenter}, soit ${data.travelTime} en voiture. Notre service de livraison gratuite au terminal vous évite les files d'attente des comptoirs aéroportuaires et vous fait économiser jusqu'à 40% par rapport aux tarifs des kiosques. Réservez en ligne avant votre vol — votre véhicule vous attend dès votre atterrissage à ${city}.`,
    sections: [
      {
        title: `L'aéroport ${data.fullName} (${data.iata}) en pratique`,
        content: `Le ${data.fullName} compte ${data.terminals}. ${data.practicalNotes} Pour le stationnement : ${data.parkingInfo}. Si vous récupérez votre véhicule Benatna, vous évitez totalement la question parking puisque notre agent vous attend en dépose-minute (P1) avec votre voiture, juste avant les barrières — comptez 5 minutes maximum après votre sortie du hall.`
      },
      {
        title: `Comment rejoindre ${city} depuis l'aéroport ${data.iata}`,
        content: `Depuis l'${data.fullName}, l'accès au centre-ville se fait via ${data.mainRoad}. La distance de ${data.distanceFromCenter.split(' ').slice(0, 3).join(' ')} se parcourt en ${data.travelTime}. Une fois votre véhicule récupéré, vous êtes immédiatement autonome pour votre séjour. À proximité depuis l'aéroport : ${data.cityAttractions}`
      },
      {
        title: `Procédure de récupération à l'${data.fullName}`,
        content: `Lors de votre réservation en ligne, indiquez votre numéro de vol et heure d'arrivée. Nous suivons votre vol en temps réel : retard, avance, déroutement — l'heure de rendez-vous s'ajuste automatiquement sans frais. Une fois atterri à ${data.iata}, récupérez vos bagages comme d'habitude. Avant de sortir du hall des arrivées, contactez-nous via WhatsApp au numéro de votre confirmation. Notre agent, déjà sur place, vous rejoint en 5-10 minutes au point de rendez-vous. Remise des clés, signature de la carte grise et assistance, paiement (espèces, virement ou carte au choix), petit tour du véhicule — vous êtes en route vers ${city} en 15 minutes maximum après votre sortie du hall.`
      },
      {
        title: `Types de véhicules disponibles à l'aéroport ${city}`,
        content: `Toute notre flotte est livrable à ${data.fullName}. ${citySlug === 'agadir' || citySlug === 'marrakech' ? 'Compte tenu du climat chaud de la région, nous recommandons systématiquement la climatisation (incluse sur tous nos véhicules).' : ''} ${citySlug === 'marrakech' || citySlug === 'fes' || citySlug === 'agadir' ? 'Pour les excursions hors-ville (Atlas, désert, plages reculées), un SUV est conseillé.' : 'Pour les déplacements urbains et inter-villes (autoroutes A1/A7), une citadine ou berline est idéale.'} Citadines économiques (Clio, Sandero, 208) dès 200 DH/jour. Berlines confortables (Corolla, Jetta) à 250-300 DH/jour. SUV tout-chemin (Duster, Qashqai, Tiguan) à 350-450 DH/jour. Véhicules premium (Mercedes Classe C, BMW Série 3, Audi A4) à 800-1000 DH/jour. Tous nos véhicules ont moins de 3 ans, kilométrage illimité inclus, assurance tous risques comprise.`
      }
    ],
    faq: [
      {
        question: `Quelle est la distance entre l'${data.fullName} et le centre de ${city} ?`,
        answer: `${data.distanceFromCenter}, soit environ ${data.travelTime} de trajet en voiture via ${data.mainRoad}.`
      },
      {
        question: `Y a-t-il des frais de livraison à l'aéroport ${data.iata} ?`,
        answer: "Non, la livraison à l'aéroport est totalement gratuite. Nous ne facturons aucun supplément, contrairement aux comptoirs d'aéroport qui intègrent des frais de concession dans leurs tarifs."
      },
      {
        question: "Que se passe-t-il si mon vol a du retard ?",
        answer: "Nous suivons votre vol en temps réel via son numéro. En cas de retard, l'heure de rendez-vous est ajustée automatiquement sans frais supplémentaires. Vous n'avez rien à faire."
      },
      {
        question: `Puis-je réserver une voiture pour une arrivée de nuit à ${data.iata} ?`,
        answer: "Oui, notre service fonctionne 24h/24, 7j/7. Que votre vol arrive à minuit, 3h ou 6h du matin, nous serons là pour vous livrer votre véhicule au terminal."
      },
      {
        question: `Combien de temps entre l'atterrissage et le départ de l'aéroport ${city} ?`,
        answer: `Environ 15 minutes après votre sortie du hall : 5-10 min pour que notre agent vous rejoigne avec le véhicule, puis 5 min pour la remise des clés, signature des documents et présentation du véhicule. Plus rapide que les files d'attente aux comptoirs classiques (souvent 30-60 min).`
      }
    ]
  },
  cta: {
    title: `Réservez Votre Voiture pour l'Aéroport ${city} (${data.iata})`,
    subtitle: "Livraison gratuite • Service 24/7 • Tarifs transparents",
    buttonText: "Réserver Maintenant",
    buttonLink: `/louer?city=${city}`
  },
  relatedServices: citySlug === 'casablanca' ? [
    { title: 'Location Jeune Conducteur Casablanca', description: 'Dès 21 ans avec supplément raisonnable. Assurance adaptée incluse.', link: '/location-jeune-conducteur-casablanca' },
    { title: 'Location Longue Durée Casablanca', description: 'Tarifs mensuels dès 5 500 DH/mois tout compris.', link: '/location-longue-duree-casablanca' },
    { title: 'Location Voiture Électrique Casablanca', description: 'VW ID.3 et ID.4 avec recharge gratuite à nos bornes.', link: '/location-voiture-electrique-casablanca' }
  ] : citySlug === 'marrakech' ? [
    { title: 'Location Weekend Marrakech', description: 'Offre spéciale weekend : 2 jours facturés pour 3 jours de location.', link: '/location-weekend-marrakech' },
    { title: 'Location Jeune Conducteur Marrakech', description: 'Conditions transparentes pour jeunes conducteurs dès 21 ans.', link: '/location-jeune-conducteur-marrakech' },
    { title: 'Location Sans Carte Crédit Marrakech', description: 'Paiement flexible : espèces, virement ou autre accepté.', link: '/location-voiture-sans-carte-credit-marrakech' }
  ] : citySlug === 'agadir' ? [
    { title: 'Location Cabriolet Agadir', description: 'BMW Z4, Audi A5 Cabrio pour profiter du soleil d\'Agadir.', link: '/location-cabriolet-agadir' },
    { title: 'Location SUV Sud Marocain', description: 'SUV confortables pour road trip Essaouira-Agadir-Taroudant.', link: '/location-suv-sud-maroc' },
    { title: 'Location Voiture Casablanca', description: 'Service également disponible à Casablanca avec livraison gratuite.', link: '/location-voiture-casablanca' }
  ] : [
    { title: 'Location Aéroport Casablanca', description: 'Livraison gratuite au terminal Mohammed V, service 24/7.', link: '/location-voiture-aeroport-casablanca' },
    { title: 'Location Aéroport Marrakech', description: 'Récupération rapide au terminal Menara sans file d\'attente.', link: '/location-voiture-aeroport-marrakech' },
    { title: 'Location Jeune Conducteur', description: 'Locations accessibles dès 21 ans avec supplément raisonnable.', link: '/location-jeune-conducteur-casablanca' }
  ],
  relatedPages: [
    { title: `Location Voiture ${city}`, link: `/location-voiture-${citySlug}` }
  ]
  };
};

// Template pour mariage
const createMariagePage = (): LongTailPageConfig => ({
  slug: 'location-voiture-mariage-maroc',
  title: 'Location Voiture Mariage Maroc',
  metaTitle: 'Location Voiture Mariage Maroc - Véhicules de Luxe | Benatna',
  metaDescription: 'Louez une voiture de luxe pour votre mariage au Maroc. Mercedes, BMW, Audi disponibles. Décoration incluse, chauffeur optionnel. Tarifs dès 800 DH/jour.',
  keywords: 'location voiture mariage maroc, voiture luxe mariage, location auto mariage casablanca',
  h1: 'Location de Voiture de Luxe pour Mariage au Maroc',
  heroSubtitle: 'Véhicules premium • Décoration incluse • Chauffeur disponible',
  category: {
    label: "Véhicules Spéciaux",
    href: "/nos-services?category=special"
  },
  content: {
    intro: 'Faites de votre jour J un moment inoubliable avec notre service de location de voitures de luxe pour mariage. Benatna vous propose une sélection exclusive de véhicules premium (Mercedes Classe S, BMW Série 7, Audi A8) parfaitement entretenus et décorés selon vos souhaits. Nos forfaits mariage incluent la décoration florale, les rubans personnalisés et un service de nettoyage entre cérémonies. Option chauffeur professionnel en costume disponible pour vous permettre de profiter pleinement de votre journée sans stress. Réservation jusqu\'à 12 mois à l\'avance avec devis gratuit et visite des véhicules sur rendez-vous.',
    sections: [
      {
        title: 'Notre Flotte Premium pour Mariages',
        content: 'Mercedes Classe S (900 DH/jour) : L\'élégance incarnée, intérieur cuir beige, sièges massants, système audio Burmester. Capacité 4 passagers + mariés. BMW Série 7 (850 DH/jour) : Sportivité et raffinement, toit panoramique, éclairage d\'ambiance personnalisable, écran arrière. Audi A8 (880 DH/jour) : Technologie de pointe, conduite autonome niveau 3, sièges ventilés, réfrigérateur intégré. Range Rover Velar (950 DH/jour) : Pour mariages champêtres ou en montagne, toit ouvrant, système audio Meridian. Tous nos véhicules ont moins de 2 ans, kilométrage faible (moins de 30 000 km), révision complète avant chaque mariage. Nous proposons aussi des combos : voiture mariés + 2 berlines cortège à tarif réduit. Décoration standard incluse : nœuds de portières, bouquet capot, rubans personnalisés à vos couleurs. Décoration premium en supplément (200 DH) : composition florale naturelle, voilage intérieur, tapis rouge.'
      },
      {
        title: 'Forfaits et Services Mariage',
        content: 'Forfait Essentiel (demi-journée 4h) : Location véhicule, décoration standard, 100 km inclus, carburant à votre charge. Idéal pour mariage intime ou civil. Forfait Classique (journée complète 12h) : Location, décoration standard, 200 km inclus, plein d\'essence offert, assistance 24/7. Le plus populaire. Forfait Prestige (2 jours) : Location 48h, décoration premium, km illimités, chauffeur professionnel 10h, champagne à bord, nettoyage entre cérémonies. Pour mariages somptueux ou destination. Service chauffeur professionnel : 300 DH/jour (minimum 6h), costume élégant, discrétion absolue, connaissance parfaite des sites de réception au Maroc. Nos chauffeurs sont formés au protocole mariage : ouverture de porte, gestion du timing, photos de couple. Extension horaire possible : 100 DH/heure supplémentaire au-delà du forfait. Réservation conseillée 6 mois minimum avant le mariage (1 an pour haute saison mai-septembre).'
      },
      {
        title: 'Pourquoi Choisir Benatna pour Votre Mariage ?',
        content: 'Expérience : Plus de 500 mariages accompagnés depuis 2015, notes 4.9/5 sur Google Reviews. Nous connaissons toutes les salles de réception, les timings serrés, les contraintes logistiques. Flexibilité : Modification de dernière minute acceptée (changement d\'horaire, de lieu) sans frais jusqu\'à 48h avant. Annulation remboursée à 80% jusqu\'à 30 jours avant. Garantie : Véhicule de remplacement identique garanti en cas de problème technique (jamais arrivé en 8 ans). Assurance tous risques incluse, aucune franchise en cas d\'incident. Personnalisation : Décoration à vos couleurs (envoyez-nous échantillon tissu), playlist Spotify de votre choix, parfum d\'ambiance personnalisé. Service clé en main : Livraison du véhicule décoré à votre domicile ou hôtel le matin, récupération le lendemain. Vous n\'avez rien à gérer. Photos : Séance photo professionnelle de 30 minutes avec le véhicule offerte (valeur 500 DH) pour immortaliser ce moment. Album numérique haute résolution livré sous 7 jours.'
      }
    ],
    faq: [
      {
        question: 'Peut-on essayer le véhicule avant de réserver ?',
        answer: 'Oui ! Sur rendez-vous dans nos locaux à Casablanca ou Marrakech, vous pouvez visiter les véhicules, tester l\'espace intérieur, voir la décoration type. Gratuit et sans engagement.'
      },
      {
        question: 'Le chauffeur reste-t-il disponible toute la journée ?',
        answer: 'Avec le forfait Prestige, le chauffeur reste à disposition 10h continues. Il peut faire des pauses entre cérémonies mais reste joignable. Pour le forfait Classique, le chauffeur est optionnel (supplément 300 DH).'
      },
      {
        question: 'Que se passe-t-il en cas de retard dans le planning du mariage ?',
        answer: 'Nous prévoyons toujours une marge de 1h dans nos forfaits. Au-delà, 100 DH/heure supplémentaire. Mais en 8 ans, nous avons toujours trouvé une solution flexible pour ne pas gâcher votre jour J.'
      },
      {
        question: 'La décoration peut-elle être personnalisée à nos couleurs de mariage ?',
        answer: 'Absolument ! Envoyez-nous un échantillon de tissu ou votre palette de couleurs, nous adaptons rubans, nœuds et fleurs. Délai de préparation : 7 jours. Service de décoration personnalisée inclus dans tous nos forfaits.'
      }
    ]
  },
  cta: {
    title: 'Réservez Votre Voiture de Mariage',
    subtitle: 'Devis gratuit • Visite des véhicules • Service clé en main',
    buttonText: 'Demander un Devis',
    buttonLink: '/contact'
  },
  relatedServices: [
    { title: 'Location Voiture Luxe Événement', description: 'Flotte premium pour événements professionnels avec chauffeur.', link: '/location-voiture-luxe-evenement' },
    { title: 'Location Cabriolet Agadir', description: 'BMW Z4, Audi A5 Cabrio pour occasions spéciales.', link: '/location-cabriolet-agadir' },
    { title: 'Location Van Familial 7-9 Places', description: 'Mercedes Vito pour groupes, idéal cortèges mariage.', link: '/location-van-famille-maroc' }
  ],
  relatedPages: [
    { title: 'Location Voiture Luxe', link: '/location-voiture-luxe-evenement' },
    { title: 'Location Casablanca', link: '/location-voiture-casablanca' }
  ]
});

// Template pour longue durée
const createLongueDureePage = (city: string, citySlug: string): LongTailPageConfig => ({
  slug: `location-longue-duree-${citySlug}`,
  title: `Location Longue Durée ${city}`,
  metaTitle: `Location Voiture Longue Durée ${city} - Tarifs Mensuels | Benatna`,
  metaDescription: `Location de voiture longue durée à ${city}. Entretien et assurance inclus. Dès 5 500 DH/mois tout compris.`,
  keywords: `location longue durée ${citySlug}, leasing voiture ${city}, location mensuelle auto`,
  h1: `Location de Voiture Longue Durée à ${city}`,
  heroSubtitle: 'Tarifs mensuels • Entretien inclus • Flexibilité maximale',
  category: {
    label: "Formules Longue Durée",
    href: "/nos-services?category=longue-duree"
  },
  content: {
    intro: `Besoin d'un véhicule pour plusieurs mois à ${city} ? Benatna propose des formules de location longue durée ultra-flexibles avec tarifs dégressifs : plus vous louez longtemps, moins vous payez. Nos forfaits mensuels incluent l'entretien complet (vidanges, pneus, révisions), l'assurance tous risques sans franchise, l'assistance 24/7 et le remplacement immédiat en cas de panne. Contrairement au leasing classique qui vous engage sur 3-5 ans, nos contrats sont résiliables avec seulement 1 mois de préavis. Idéal pour expatriés, missions longues, startups ou tout simplement pour éviter l'achat et la revente d'un véhicule. Kilométrage illimité inclus dans tous nos forfaits longue durée.`,
    sections: [
      {
        title: 'Tarifs Longue Durée Dégressifs',
        content: `Catégorie Économique (Sandero) : 5 500 DH/mois, tout compris. Catégorie Économique (Clio manuelle) : 6 000 DH/mois. Clio automatique : 6 500 DH/mois. Catégorie Berline (Corolla, Jetta) : 9 500 DH/mois. Idéale pour usage professionnel ou famille. Catégorie SUV (Duster, Qashqai) : 10 500 DH/mois. Robustesse et confort pour longs trajets. Catégorie Premium (Mercedes, BMW) : Sur devis selon modèle et durée. À partir de 15 000 DH/mois pour Classe C ou Série 3. Tous ces tarifs incluent : assurance tous risques (0 DH franchise), entretien complet selon planning constructeur, assistance et dépannage 24/7, remplacement véhicule en cas de panne (sous 4h), kilométrage illimité (pas de surcoût même si vous faites 5000 km/mois). Modes de paiement : mensuel par prélèvement automatique (carte ou virement).`
      },
      {
        title: 'Ce Qui Est Inclus dans Nos Forfaits Longue Durée',
        content: `Entretien mécanique : Nous prenons rendez-vous pour vous dans nos garages partenaires agréés constructeurs, toutes les vidanges (selon kilométrage ou 6 mois), changements de filtres, plaquettes de frein si nécessaire, contrôles techniques payés. Pneus : Remplacement si usure > 1.6mm de profondeur, permutation tous les 10 000 km pour usure uniforme, pneus neige en option pour régions montagneuses (50 DH/mois supplément). Assurance : Tous risques conducteur principal + 1 conducteur secondaire gratuit, pas de franchise en cas d'accident responsable, bris de glace inclus, vol avec effraction couvert. Assistance : Panne mécanique ou crevaison : dépannage ou remorquage gratuit vers garage le plus proche, accident : gestion complète du dossier assurance par nos équipes, vous ne vous occupez de rien, véhicule de remplacement équivalent livré sous 4h maximum si immobilisation > 24h (en 8 ans, temps moyen de remplacement : 2h30). Flexibilité : Changement de catégorie possible en cours de contrat (upgrade ou downgrade) avec ajustement tarifaire au prorata, pause de 1 mois possible si vous quittez temporairement le Maroc (gel du contrat), résiliation avec 1 mois de préavis uniquement, aucune pénalité.`
      },
      {
        title: 'Qui Choisit la Location Longue Durée ?',
        content: `Expatriés et détachés : Vous travaillez au Maroc pour une mission de 6 mois à 2 ans ? La location longue durée évite l'achat d'un véhicule local, l'immatriculation complexe et surtout la revente difficile au moment du départ. Nos clients expatriés apprécient la flexibilité : un mois de préavis suffit si votre mission est écourtée. Nous gérons aussi la facturation mensuelle avec TVA récupérable pour les entreprises. Entrepreneurs et startups : Optimisez votre trésorerie ! Au lieu d'immobiliser 200 000 DH dans l'achat d'un véhicule, payez 6 000 DH/mois charges comprises. Les mensualités sont déductibles fiscalement comme charge d'exploitation. Plus besoin de budget entretien surprise (pneus, révisions) : tout est inclus. Particuliers sans apport : Pas les 50 000 DH d'apport pour un crédit auto ? La location longue durée ne demande qu'un mois de caution (remboursable à la restitution). Vous roulez immédiatement dans un véhicule récent sans endettement bancaire. Travailleurs saisonniers : Vous travaillez 6 mois à ${city} puis 6 mois ailleurs ? Nos contrats flexibles avec possibilité de gel sont parfaits. Pas besoin de laisser un véhicule dormir dans un garage pendant votre absence.`
      }
    ],
    faq: [
      {
        question: 'Puis-je résilier mon contrat longue durée avant la fin ?',
        answer: 'Oui, avec 1 mois de préavis seulement. Contrairement au leasing qui vous engage sur toute la durée, nos contrats sont flexibles. Aucune pénalité de résiliation.'
      },
      {
        question: 'Que se passe-t-il si je dépasse le kilométrage prévu ?',
        answer: 'Nos forfaits longue durée incluent le kilométrage ILLIMITÉ. Vous pouvez faire 2000 km/mois ou 8000 km/mois, le prix reste le même. Pas de mauvaise surprise.'
      },
      {
        question: 'Qui paie les réparations en cas d\'accident responsable ?',
        answer: 'L\'assurance tous risques couvre TOUT, avec 0 DH de franchise. Même si vous êtes responsable à 100%, vous ne payez rien. Nous gérons le dossier et vous fournissons un véhicule de remplacement immédiatement.'
      },
      {
        question: 'Peut-on changer de véhicule en cours de contrat ?',
        answer: 'Oui ! Si vos besoins évoluent (bébé en route = besoin SUV, fin de chantier = retour citadine), changement possible avec ajustement du tarif mensuel au prorata. Délai : 7 jours pour préparer le nouveau véhicule.'
      }
    ]
  },
  cta: {
    title: `Demandez Votre Devis Longue Durée à ${city}`,
    subtitle: 'Tarifs dégressifs • Sans engagement long • Tout inclus',
    buttonText: 'Obtenir un Devis',
    buttonLink: '/contact'
  },
  relatedServices: citySlug === 'casablanca' ? [
    { title: 'Location Aéroport Casablanca', description: 'Livraison gratuite au terminal Mohammed V pour commencer votre longue durée.', link: '/location-voiture-aeroport-casablanca' },
    { title: 'Location Voiture Électrique Casablanca', description: 'VW ID.3 et ID.4 en formule mensuelle, recharge gratuite.', link: '/location-voiture-electrique-casablanca' },
    { title: 'Location Utilitaire Casablanca', description: 'Fiat Ducato, Mercedes Sprinter en location mensuelle.', link: '/location-utilitaire-demenagement-casablanca' }
  ] : [
    { title: 'Location Longue Durée Casablanca', description: 'Même service à Casablanca dès 5 500 DH/mois tout compris.', link: '/location-longue-duree-casablanca' },
    { title: 'Location Jeune Conducteur Marrakech', description: 'Formules longue durée adaptées aux jeunes conducteurs.', link: '/location-jeune-conducteur-marrakech' },
    { title: 'Location SUV Atlas', description: 'SUV 4x4 en forfait mensuel pour usage régulier montagne.', link: '/location-suv-atlas' }
  ],
  relatedPages: [
    { title: `Location ${city}`, link: `/location-voiture-${citySlug}` }
  ]
});

// Template pour jeune conducteur
const createJeuneConducteurPage = (city: string, citySlug: string): LongTailPageConfig => ({
  slug: `location-jeune-conducteur-${citySlug}`,
  title: `Location Jeune Conducteur ${city}`,
  metaTitle: `Location Voiture Jeune Conducteur ${city} -21 ans | Benatna`,
  metaDescription: `Location voiture pour jeunes conducteurs à ${city}. Dès 21 ans avec 1 an de permis. Assurance jeune incluse. Tarifs dès 180 DH/jour sans supplément abusif.`,
  keywords: `location jeune conducteur ${citySlug}, location -25 ans ${city}, louer voiture 21 ans`,
  h1: `Location de Voiture pour Jeune Conducteur à ${city}`,
  heroSubtitle: 'Dès 21 ans • Assurance adaptée • Pas de supplément abusif',
  category: {
    label: "Jeune Conducteur",
    href: "/nos-services?category=jeune"
  },
  content: {
    intro: `Jeune conducteur à ${city} ? Benatna facilite votre location de voiture avec des conditions adaptées et transparentes. Contrairement aux grandes enseignes qui facturent des suppléments de 150-300 DH/jour pour les moins de 25 ans, nous appliquons une majoration raisonnable de 50 DH/jour seulement, assurance jeune conducteur incluse. Conditions : 21 ans minimum (20 ans pour citadines), permis depuis au moins 1 an, pièce d'identité et permis valides. Nous acceptons les permis marocains, français, européens et internationaux. Pas de caution astronomique : 3000 DH bloqués sur carte bancaire (débloqués 7 jours après restitution). Notre objectif : rendre la mobilité accessible aux jeunes sans les pénaliser financièrement.`,
    sections: [
      {
        title: 'Conditions et Tarifs Jeune Conducteur',
        content: `Âge minimum : 21 ans pour berlines et SUV, 20 ans pour citadines (Clio, Sandero, 208), 25 ans pour véhicules premium (Mercedes, BMW, Audi). Permis : Minimum 1 an de permis (2 ans pour SUV et premium), permis probatoire accepté, carte rose jeune conducteur pas obligatoire au Maroc. Supplément jeune conducteur : 50 DH/jour pour 21-24 ans (vs 150-300 DH chez les concurrents), 0 DH à partir de 25 ans. Ce supplément couvre l'assurance spécifique jeune conducteur avec surprime. Caution : 3000 DH préautorisation carte bancaire pour 21-24 ans (bloquée mais non débitée), 2000 DH à partir de 25 ans, débloquée 7 jours après restitution si aucun dommage. Exemple de tarif réel jeune conducteur : Clio 3 jours = (280 DH/jour + 50 DH supplément jeune) × 3 = 990 DH total. Chez les concurrents : (350 DH/jour + 200 DH supplément) × 3 = 1650 DH. Vous économisez 660 DH ! Documents requis : Carte d\'identité nationale ou passeport, permis de conduire (recto-verso en couleur), justificatif de domicile de moins de 3 mois (facture eau/électricité ou attestation hébergement), carte bancaire au nom du locataire pour caution.`
      },
      {
        title: 'Assurance et Couverture Jeune Conducteur',
        content: `Assurance incluse : Responsabilité civile obligatoire (dommages causés aux tiers), protection du conducteur (frais médicaux jusqu\'à 50 000 DH en cas d\'accident), vol avec effraction (remboursement valeur vénale du véhicule), assistance dépannage 24/7 sur tout le Maroc. Franchise en cas de sinistre responsable : 5000 DH pour jeunes conducteurs 21-24 ans (vs 3000 DH pour +25 ans), 0 DH si accident non responsable avec constat signé par les deux parties, réduction de franchise à 3000 DH après 1 an sans sinistre avec Benatna (programme fidélité). Option rachat de franchise : +30 DH/jour pour ramener la franchise à 0 DH même en cas d\'accident responsable. Recommandé pour jeunes conducteurs peu expérimentés ou trajets montagne/pistes. Exclusions standard (jeunes et tous conducteurs) : Conduite sous influence alcool ou stupéfiants = perte totale couverture + amende pénale, conduite hors route sur véhicule non adapté (berline dans oued), prêt du volant à personne non déclarée sur contrat. Conseil : Si vous partez en road trip avec des amis, déclarez tous les conducteurs (gratuit pour le 2e conducteur, 20 DH/jour par conducteur supplémentaire). En cas d\'accident avec conducteur non déclaré, assurance refusera de couvrir.`
      },
      {
        title: 'Conseils pour Jeunes Conducteurs au Maroc',
        content: `Choisissez le bon véhicule : Pour ville (${city} centre) : citadine type Clio, facile à garer, consommation réduite (5L/100km). Pour longs trajets ou montagne : SUV type Duster, garde au sol importante pour routes dégradées, coffre spacieux pour bagages. Évitez les premium pour débuter : puissance élevée, réparations coûteuses en cas d\'accrochage (carrosserie Audi = 3× prix Renault). Anticipez les péages : Axe Casablanca-Marrakech = 65 DH, Rabat-Tanger = 90 DH. Budget 200-300 DH de péages pour road trip 1 semaine. Carburant : Essence = 14 DH/L, gasoil = 11 DH/L. Citadine essence = 35 DH/100km, SUV diesel = 55 DH/100km. Stationnement : ${city} dispose de parkings surveillés (5-10 DH/h). Ne laissez JAMAIS objets de valeur visibles dans l\'habitacle (vols à la portière fréquents dans zones touristiques). Code de la route local : Radars automatiques nombreux sur autoroutes (limitation 120 km/h stricte), contrôles police fréquents : ayez TOUJOURS carte grise, attestation assurance et permis sur vous, rond-points : priorité à gauche (inverse de la France), klaxon utilisé intensément : pas d\'agressivité, juste communication. En cas d\'accident : Ne déplacez pas les véhicules avant constat (sauf danger immédiat), appelez notre assistance 24/7 (numéro sur contrat + carte grise), prenez photos des dommages + plaques + contexte, remplissez constat amiable avec l\'autre partie (même si pas d\'accord sur responsabilité, chacun expose sa version).`
      }
    ],
    faq: [
      {
        question: 'Puis-je louer avec un permis probatoire (moins de 2 ans) ?',
        answer: 'Oui ! Nous acceptons les jeunes conducteurs dès 1 an de permis (permis probatoire accepté). Le supplément jeune conducteur de 50 DH/jour s\'applique jusqu\'à vos 25 ans, quelle que soit votre ancienneté de permis.'
      },
      {
        question: 'Que se passe-t-il si j\'ai un accident responsable ?',
        answer: 'La franchise de 5000 DH s\'applique (montant maximum que vous payez). L\'assurance couvre le reste. Si vous avez pris l\'option rachat de franchise (+30 DH/jour), vous ne payez rien du tout. Notre assistance gère tout le dossier.'
      },
      {
        question: 'Mes parents peuvent-ils se porter garants pour la caution ?',
        answer: 'Non, la carte bancaire pour la caution doit être au nom du conducteur principal. Mais si vos parents vous prêtent leur carte le temps de la réservation (avec leur accord écrit), c\'est possible. Ou vous pouvez payer la caution en espèces (3000 DH remboursables).'
      },
      {
        question: 'Y a-t-il une limite de kilomètres pour les jeunes conducteurs ?',
        answer: 'Non ! Kilométrage illimité comme pour tous nos clients, quel que soit votre âge. Vous payez juste le supplément jeune conducteur de 50 DH/jour, mais vous pouvez rouler autant que vous voulez.'
      }
    ]
  },
  cta: {
    title: `Réservez Votre Voiture Jeune Conducteur à ${city}`,
    subtitle: 'Dès 21 ans • Supplément raisonnable • Assurance incluse',
    buttonText: 'Voir les Véhicules Disponibles',
    buttonLink: `/louer?city=${city}`
  },
  relatedServices: citySlug === 'casablanca' ? [
    { title: 'Location Sans Carte Crédit Casablanca', description: 'Paiement flexible sans carte bancaire, idéal jeunes conducteurs.', link: '/location-voiture-sans-carte-credit-casablanca' },
    { title: 'Location Aéroport Casablanca', description: 'Récupération directe au terminal pour jeunes voyageurs.', link: '/location-voiture-aeroport-casablanca' },
    { title: 'Location Weekend Marrakech', description: 'Offre spéciale weekend accessible aux jeunes conducteurs.', link: '/location-weekend-marrakech' }
  ] : citySlug === 'marrakech' ? [
    { title: 'Location Sans Carte Crédit Marrakech', description: 'Louez sans carte bancaire avec caution adaptée.', link: '/location-voiture-sans-carte-credit-marrakech' },
    { title: 'Location Jeune Conducteur Casablanca', description: 'Même service à Casablanca avec conditions transparentes.', link: '/location-jeune-conducteur-casablanca' },
    { title: 'Location Aéroport Marrakech', description: 'Livraison au terminal Menara pour jeunes voyageurs.', link: '/location-voiture-aeroport-marrakech' }
  ] : [
    { title: 'Location Jeune Conducteur Casablanca', description: 'Dès 21 ans avec supplément raisonnable à Casablanca.', link: '/location-jeune-conducteur-casablanca' },
    { title: 'Location Jeune Conducteur Marrakech', description: 'Conditions équitables pour jeunes à Marrakech.', link: '/location-jeune-conducteur-marrakech' },
    { title: 'Location Weekend Marrakech', description: 'Tarif spécial weekend accessible aux jeunes conducteurs.', link: '/location-weekend-marrakech' }
  ],
  relatedPages: [
    { title: `Location ${city}`, link: `/location-voiture-${citySlug}` }
  ]
});

// Template pour SUV / 4x4 spécialisé
const createSUVSpecialPage = (region: string, slug: string): LongTailPageConfig => ({
  slug,
  title: `Location SUV 4x4 ${region}`,
  metaTitle: `Location SUV 4x4 ${region} - Duster, Qashqai, Tiguan | Benatna`,
  metaDescription: `Louez un SUV ou 4x4 pour ${region}. Véhicules tout-terrain adaptés. GPS et équipement inclus. Dès 350 DH/jour avec assurance complète.`,
  keywords: `location suv ${slug}, 4x4 ${region}, location duster ${slug}`,
  h1: `Location SUV et 4x4 pour ${region}`,
  heroSubtitle: 'Tout-terrain • GPS inclus • Assurance tous chemins',
  content: {
    intro: `Partez à la découverte de ${region} au volant d'un SUV robuste parfaitement adapté aux pistes et routes de montagne. Benatna vous propose une sélection de véhicules 4x4 et SUV (Duster, Qashqai, Tiguan, Prado) récents, équipés GPS, avec assurance tous risques couvrant les chemins non goudronnés. Nos SUV sont préparés spécifiquement pour les conditions difficiles : pneus tout-terrain récents, contrôle technique renforcé, kit de dépannage complet (corde, pelle, planche désensablement). Idéal pour road trips Atlas, excursions désert, ou simplement pour la tranquillité d'esprit sur les routes marocaines parfois dégradées.`,
    sections: [
      {
        title: 'Notre Flotte SUV et 4x4',
        content: `Dacia Duster (350 DH/jour) : Le champion du rapport qualité/prix. 4x4 véritable avec modes 2WD/4WD/4WD Lock, garde au sol 21 cm, coffre 445L. Consommation raisonnable 7L/100km diesel. Parfait pour ${region} sans se ruiner. Kilométrage illimité. Nissan Qashqai (420 DH/jour) : Crossover confortable avec transmission intégrale intelligente. Plus urbain que le Duster mais très capable sur pistes sèches. Intérieur premium, GPS écran tactile, caméra recul. Pour ceux qui veulent confort + polyvalence. VW Tiguan (500 DH/jour) : SUV allemand robuste, 4Motion intégrale permanente. Équipement complet : régulateur adaptatif, sièges chauffants, coffre 615L. Moteur diesel 150ch avec couple généreux en montagne. Top pour familles. Toyota Land Cruiser Prado (800 DH/jour) : Le vrai 4x4 baroudeur. Châssis échelle, pont arrière rigide, réducteur. Indestructible, franchissement exceptionnel. Pour Atlas profond, dunes du désert ou expéditions exigeantes. Tous nos SUV incluent : GPS Garmin avec cartes Maroc actualisées (POI, pistes, ravitaillements), kit de dépannage (câble remorquage 5T, pelle, planche, gonfleur 12V), assurance pistes et chemins (franchise normale 3000 DH même hors bitume), assistance 4x4 spécialisée (remorquage adapté, partenaires dans tout l\'Atlas). Âge minimum conducteur : 23 ans et 2 ans de permis pour SUV, 25 ans et 3 ans de permis pour Prado (puissance + difficulté technique).`
      },
      {
        title: 'Assurance et Couverture Tout-Terrain',
        content: `Assurance étendue incluse : Notre assurance tous risques couvre les dommages survenus sur pistes et chemins non goudronnés (contrairement aux assurances standard qui excluent le hors-bitume). Cela inclut : impacts de pierres sous caisse, crevaisons sur épines ou roches, dommages train roulant (amortisseurs, bras suspension), bris de glace dû à projections. Franchise standard : 3000 DH en cas de sinistre responsable même sur piste (vs 5000-10 000 DH chez concurrents pour hors-bitume). Option rachat franchise +50 DH/jour : franchise ramenée à 0 DH, recommandé si vous prévoyez pistes difficiles Atlas ou dunes désert. Exclusions : Conduite dans oueds en crue (eau au-dessus du capot), franchissement obstacles extrêmes type rochers > 50cm (usage rallye), ensablement par imprudence manifeste après plusieurs avertissements locaux. Mais 99% des pistes touristiques et routes dégradées sont couvertes ! Assistance 4x4 spécialisée : En cas d\'ensablement ou d\'enlisement : partenaire local avec treuil ou chameau (!) sous 2h dans Atlas, sous 4h dans désert. Panne mécanique : remorquage vers ville la plus proche même si piste de 50 km, véhicule de remplacement envoyé ou rapatriement selon situation. Crevaison : nous fournissons 2 roues de secours gonflées sur Prado (1 roue sur autres SUV). Notre équipe assistance connaît parfaitement ${region}, les zones difficiles, les garages partenaires fiables.`
      },
      {
        title: 'Conseils pour Road Trip ${region} en SUV',
        content: `Planification : Étudiez votre itinéraire : certaines pistes Atlas nécessitent vraiment le Prado (Tizi n\'Test en hiver), d\'autres passent bien avec Duster. Prévoyez large sur les temps de trajet : pistes = 30 km/h de moyenne (vs 80 km/h route). Téléchargez cartes GPS offline (zones montagnes sans réseau). Préparation du véhicule : Vérifiez pression pneus avant départ (nous faisons contrôle mais double-check), dégonflage léger conseillé pour sable (2.0 bars au lieu de 2.5). Regonfler ensuite en ville. Testez le mode 4x4 sur parking avant de partir (levier ou bouton selon modèle). Repérez emplacement roue de secours, cric, manivelle. Sur la route : Anticipez : freinage plus long sur graviers, ornières peuvent déporter le véhicule. En montée raide : passez en mode 4WD Lock (Duster) ou Low (Prado), 1re ou 2e vitesse, régime moteur élevé. Ne vous arrêtez jamais en pleine pente ! En descente : frein moteur, pas de roue libre, 1re vitesse, vitesse < 15 km/h. Si ça glisse, ne braquez pas, accompagnez. Traversée de gués : Profondeur max 40cm pour Duster/Qashqai, 70cm pour Prado. Vitesse lente constante (10 km/h), ne vous arrêtez pas au milieu. Si moteur cale dans l\'eau, n\'insistez pas : appelez assistance immédiatement (risque destruction moteur). Ravitaillement : Réservoir SUV = 50-60L. Autonomie ~700 km en mixte. Stations essence rares en montagne : faites le plein dès 1/2 réservoir. Ayez toujours 20L d\'eau potable, fruits secs, couverture (nuits froides Atlas même en été).`
      }
    ],
    faq: [
      {
        question: `Le Duster suffit-il pour ${region} ou faut-il un vrai 4x4 comme le Prado ?`,
        answer: 'Le Duster couvre 95% des besoins touristiques : routes Atlas, pistes vallées, désert Merzouga. Le Prado est nécessaire uniquement pour expéditions hors sentiers battus, dunes hautes du Sahara, ou pistes extrêmes après fortes pluies. Pour un road trip classique, le Duster est parfait et 2× moins cher.'
      },
      {
        question: 'L\'assurance couvre-t-elle vraiment les pistes de montagne ?',
        answer: 'Oui ! Notre assurance tous risques couvre les chemins non goudronnés et pistes touristiques (Tizi n\'Tichka, pistes vallées berbères, désert). La franchise reste 3000 DH même sur piste. Les assurances standard excluent le hors-bitume, pas la nôtre.'
      },
      {
        question: 'Que faire si on crève un pneu sur une piste isolée ?',
        answer: 'Appelez notre assistance 24/7. Si vous êtes capable, changez la roue avec la roue de secours (on vous montre avant départ). Sinon, notre partenaire local vient vous aider sous 2h dans Atlas, sous 4h dans désert. Service inclus dans la location.'
      },
      {
        question: 'Peut-on camper à côté du SUV loué ?',
        answer: 'Oui, c\'est autorisé et fréquent au Maroc (bivouac). Assurez-vous de verrouiller le véhicule, ne laissez rien de visible à l\'intérieur. L\'assurance vol avec effraction fonctionne même en bivouac. Conseil : campez près de villages berbères, les locaux sont accueillants et sécurisent naturellement la zone.'
      }
    ]
  },
  cta: {
    title: `Réservez Votre SUV pour ${region}`,
    subtitle: 'Tout-terrain • GPS inclus • Assistance 4x4',
    buttonText: 'Choisir Mon SUV',
    buttonLink: '/louer?category=suv'
  },
  relatedServices: slug === 'location-suv-atlas' ? [
    { title: 'Location 4x4 Désert Merzouga', description: 'Véhicules tout-terrain Toyota Prado et Land Cruiser pour expéditions.', link: '/location-4x4-desert' },
    { title: 'Location SUV Sud Marocain', description: 'SUV confortables pour road trip côte Atlantique et Anti-Atlas.', link: '/location-suv-sud-maroc' },
    { title: 'Location Van Familial 7-9 Places', description: 'Mercedes Vito pour groupes en excursion montagne.', link: '/location-van-famille-maroc' }
  ] : slug === 'location-4x4-desert' ? [
    { title: 'Location SUV Atlas Marocain', description: 'SUV 4x4 pour routes de montagne avec GPS et équipement inclus.', link: '/location-suv-atlas' },
    { title: 'Location SUV Sud Marocain', description: 'SUV pour road trip Agadir-Ouarzazate-Merzouga.', link: '/location-suv-sud-maroc' },
    { title: 'Location Van Familial 7-9 Places', description: 'Vans spacieux pour expéditions désert en groupe.', link: '/location-van-famille-maroc' }
  ] : [
    { title: 'Location Cabriolet Agadir', description: 'BMW Z4, Audi A5 Cabrio pour profiter des routes côtières.', link: '/location-cabriolet-agadir' },
    { title: 'Location 4x4 Désert', description: 'Véhicules tout-terrain pour pousser vers Merzouga et dunes.', link: '/location-4x4-desert' },
    { title: 'Location Aéroport Agadir', description: 'Livraison gratuite au terminal Al Massira pour débuter votre road trip.', link: '/location-voiture-aeroport-agadir' }
  ],
  relatedPages: [
    { title: 'Location SUV Maroc', link: '/louer?category=suv' }
  ]
});

// Template pour voiture de luxe événement
const createLuxeEvenementPage = (): LongTailPageConfig => ({
  slug: 'location-voiture-luxe-evenement',
  title: 'Location Voiture Luxe Événement',
  metaTitle: 'Location Voiture Luxe Événement Maroc - Mercedes, BMW, Audi | Benatna',
  metaDescription: 'Louez une voiture de prestige pour vos événements professionnels ou privés. Mercedes, BMW, Audi avec chauffeur. Service premium dès 900 DH/jour.',
  keywords: 'location voiture luxe maroc, voiture prestige événement, location mercedes bmw',
  h1: 'Location de Voiture de Luxe pour Événements',
  heroSubtitle: 'Flotte premium • Chauffeur professionnel • Service sur-mesure',
  category: {
    label: "Véhicules Spéciaux",
    href: "/nos-services?category=special"
  },
  content: {
    intro: 'Offrez-vous ou à vos invités une expérience haut de gamme avec notre flotte de véhicules de luxe. Benatna propose des Mercedes Classe S, BMW Série 7, Audi A8 et Range Rover pour tous vos événements professionnels (conférences, séminaires, accueil clients VIP) ou privés (mariages, anniversaires, soirées). Nos véhicules premium sont livrés impeccables avec chauffeur professionnel en costume, discret et ponctuel. Service personnalisé : eau, rafraîchissements, presse du jour, WiFi 4G, prises USB. Réservation événementielle avec devis détaillé et garantie véhicule de secours identique.',
    sections: [
      {
        title: 'Flotte Prestige Disponible',
        content: 'Mercedes Classe S (900 DH/jour) : La référence de l\'élégance automobile. Intérieur cuir Nappa, sièges massants et ventilés, éclairage d\'ambiance 64 couleurs, sono Burmester 3D. Moteur V6 essence ou diesel, conduite d\'une douceur exceptionnelle. Image professionnelle garantie. BMW Série 7 (880 DH/jour) : Sportivité et technologie de pointe. Écrans arrière tactiles, toit panoramique Sky Lounge à LED, sièges lounge avec repose-pieds. Moteur 6 cylindres en ligne, accélérations impressionnantes. Pour clients qui aiment dynamisme et modernité. Audi A8 (920 DH/jour) : Technologie Quattro intégrale, conduite semi-autonome niveau 3, sièges relax avec massage shiatsu, réfrigérateur et verres champagne intégrés. Le summum du raffinement allemand. Range Rover Velar (950 DH/jour) : SUV de luxe britannique. Design épuré, intérieur cuir Windsor, double écran tactile Touch Pro Duo, système audio Meridian 1600W. Parfait pour événements outdoor chic ou arrivées remarquées. Tous nos véhicules premium : moins de 2 ans et moins de 30 000 km, révision complète toutes les 5000 km, nettoyage extérieur/intérieur complet avant chaque événement, essence premium (98 octanes) ou diesel excellium. Options événementielles : chauffeur professionnel bilingue FR/EN en costume (300 DH/jour), décoration florale personnalisée (à partir de 200 DH), champagne Moët & Chandon à bord (500 DH la bouteille), photographe pour capturer l\'arrivée (1000 DH/2h).'
      },
      {
        title: 'Service Chauffeur Premium',
        content: 'Nos chauffeurs événementiels : Profil : 5+ ans d\'expérience conduite VIP, formation protocole et discrétion, maîtrise français, arabe, anglais (espagnol pour certains), présentation irréprochable (costume sombre, cravate, chaussures cirées). Ponctualité absolue : Repérage des lieux la veille si nécessaire, arrivée 15 minutes avant l\'heure prévue, suivi trafic temps réel pour éviter retards. Service pendant trajet : Ouverture/fermeture de portière côté passager arrière droit (place d\'honneur), réglage température et musique selon vos préférences, conduite souple et anticipée (pas de freinages brusques), discrétion totale (ne parle que si on lui adresse la parole). Connaissances locales : Tous les hôtels 5 étoiles, palais de congrès, salles de réception du Maroc, itinéraires optimaux avec alternatives en cas d\'embouteillages, bonnes adresses restaurants gastronomiques pour recommandations. Disponibilité : Planning événementiel flexible : 4h minimum (300 DH forfait), puis 75 DH/heure supplémentaire, forfait journée 10h = 600 DH (plus rentable pour événement long), service multi-jours avec tarif dégressif (5 jours congrès = 2500 DH au lieu de 3000 DH). Gestion de groupe : Possibilité de coordonner plusieurs véhicules premium pour délégation (3+ véhicules = -10% sur chauffeurs), communication talkie-walkie entre chauffeurs pour convois, point de rendez-vous unique pour prises en charge groupées aéroport.'
      },
      {
        title: 'Cas d\'Usage Événements',
        content: 'Événements professionnels : Accueil clients VIP : Réservation de notre Mercedes Classe S pour récupérer vos clients importants à l\'aéroport Mohammed V ou Menara. Notre chauffeur les accueille avec pancarte nominative dans le hall, gère leurs bagages, les conduit à leur hôtel ou directement à vos bureaux. Impression premium garantie dès la première minute. Séminaires et congrès : Location de 3-10 véhicules premium pour navettes VIP entre hôtel et palais des congrès. Coordination parfaite des chauffeurs, ponctualité militaire. Clients satisfaits = image entreprise valorisée. Tournages et productions : Notre flotte est régulièrement louée pour tournages publicitaires, clips musicaux, films. Véhicules impeccables, disponibilité plateaux tournage, tarifs spéciaux production (devis sur mesure). Événements privés : Mariages : La voiture des mariés doit être exceptionnelle. Notre Range Rover Velar ou Mercedes Classe S décorée selon vos couleurs. Chauffeur pour conduire les mariés de leur domicile à la salle, puis à l\'hôtel le soir. Photos avec le véhicule offertes. Anniversaires marquants : 40 ans, 50 ans, 60 ans... Offrez une journée de rêve à la personne célébrée : chauffeur privé toute la journée dans une BMW Série 7, parcours surprise vers restaurant gastronomique, retour en fin de soirée. Cadeau inoubliable ! Demandes en mariage : Vous prévoyez LA grande demande ? Location Audi A8 avec chauffeur qui vous conduit vers un lieu romantique (Anfa Park Casa, Jardin Majorelle Marrakech), champagne et roses préparés dans le coffre. On vous laisse seuls au moment clé, puis retour triomphal. Taux de réussite : 100% depuis 8 ans !'
      }
    ],
    faq: [
      {
        question: 'Le chauffeur peut-il rester à disposition toute la journée ?',
        answer: 'Oui ! Forfait journée 10h = 600 DH. Le chauffeur reste à votre disposition avec le véhicule, fait les trajets que vous souhaitez, attend entre deux rendez-vous. Au-delà de 10h, supplément 75 DH/heure.'
      },
      {
        question: 'Les véhicules de luxe peuvent-ils être loués sans chauffeur ?',
        answer: 'Oui, mais sous conditions strictes : âge minimum 30 ans, 5 ans de permis, caution 10 000 DH, assurance tous risques avec franchise 8000 DH. Nous recommandons fortement l\'option chauffeur pour tranquillité et prestige.'
      },
      {
        question: 'Peut-on demander un parcours spécifique au chauffeur ?',
        answer: 'Absolument ! Lors de la réservation, indiquez-nous votre programme : aéroport > hôtel > restaurant > retour hôtel, ou toute autre combinaison. Le chauffeur suivra votre planning à la minute près.'
      },
      {
        question: 'Y a-t-il une garantie si le véhicule tombe en panne le jour J ?',
        answer: 'Garantie remplacement : Véhicule identique ou gamme supérieure sous 60 minutes dans les grandes villes (Casa, Marrakech, Rabat). Nous avons toujours un véhicule premium de secours prêt. En 8 ans, 0 défaillance le jour d\'un événement.'
      }
    ]
  },
  cta: {
    title: 'Réservez Votre Véhicule de Luxe',
    subtitle: 'Flotte premium • Chauffeur professionnel • Devis personnalisé',
    buttonText: 'Demander un Devis Événement',
    buttonLink: '/contact'
  },
  relatedPages: [
    { title: 'Location Mariage', link: '/location-voiture-mariage-maroc' },
    { title: 'Location Casablanca', link: '/location-voiture-casablanca' }
  ]
});

// Export des nouvelles pages additionnelles
export const additionalLongTailPages: LongTailPageConfig[] = [
  // Aéroports (6 pages existantes)
  createAeroportPage("Casablanca", "casablanca", "Mohammed V"),
  createAeroportPage("Marrakech", "marrakech", "Menara"),
  createAeroportPage("Agadir", "agadir", "Al Massira"),
  createAeroportPage("Tanger", "tanger", "Ibn Battouta"),
  createAeroportPage("Fès", "fes", "Saïss"),
  createAeroportPage("Rabat", "rabat", "Rabat-Salé"),
  
  // Nouvelles pages (15 pages)
  createMariagePage(),
  createLongueDureePage("Casablanca", "casablanca"),
  createLongueDureePage("Marrakech", "marrakech"),
  createJeuneConducteurPage("Casablanca", "casablanca"),
  createJeuneConducteurPage("Marrakech", "marrakech"),
  createJeuneConducteurPage("Rabat", "rabat"),
  createSUVSpecialPage("Atlas Marocain", "location-suv-atlas"),
  createSUVSpecialPage("Désert Merzouga", "location-4x4-desert"),
  createSUVSpecialPage("Sud Marocain", "location-suv-sud-maroc"),
  createLuxeEvenementPage(),
  
  // 5 pages bonus variées
  {
    slug: 'location-weekend-marrakech',
    title: 'Location Weekend Marrakech',
    metaTitle: 'Location Voiture Weekend Marrakech - Tarifs 2-3 Jours | Benatna',
    metaDescription: 'Louez une voiture pour le weekend à Marrakech. Tarifs spéciaux 2-3 jours. Dès 280 DH/jour, kilométrage illimité inclus.',
    keywords: 'location weekend marrakech, location 2 jours marrakech, location courte durée',
    h1: 'Location de Voiture Weekend à Marrakech',
    heroSubtitle: 'Tarifs spéciaux 2-3 jours • Départ vendredi soir • Retour lundi matin',
    category: {
      label: "Formules Longue Durée",
      href: "/nos-services?category=longue-duree"
    },
    content: {
      intro: 'Weekend prolongé à Marrakech ? Profitez de nos tarifs spéciaux 2-3 jours ! Réservez du vendredi soir 18h au lundi matin 9h pour 2 jours de facturation seulement (au lieu de 3). Idéal pour découvrir Marrakech et ses environs (Atlas, Essaouira) sans se ruiner. Toutes catégories disponibles avec kilométrage illimité.',
      sections: [
        {
          title: 'Forfaits Weekend',
          content: 'Forfait Essentiel (2 jours) : Citadine 280 DH/jour, retrait vendredi après-midi, retour dimanche soir, 400 km inclus. Forfait Exploration (3 jours) : SUV 380 DH/jour, retrait vendredi soir, retour lundi matin, kilométrage illimité pour road trip Atlas ou Essaouira. Forfait VIP (weekend luxe) : Berline premium 750 DH/jour, service conciergerie inclus (recommandations restaurants, réservations riads).'
        }
      ],
      faq: []
    },
    cta: {
      title: 'Réservez Votre Weekend à Marrakech',
      subtitle: 'Tarifs dégressifs • Kilométrage flexible',
      buttonText: 'Réserver',
      buttonLink: '/louer?city=Marrakech'
    },
    relatedPages: [
      { title: 'Location Marrakech', link: '/location-voiture-marrakech' }
    ]
  },
  {
    slug: 'location-voiture-electrique-casablanca',
    title: 'Location Voiture Électrique Casablanca',
    metaTitle: 'Location Voiture Électrique Casablanca - VW ID.3, ID.4 | Benatna',
    metaDescription: 'Louez une voiture électrique à Casablanca. VW ID.3 et ID.4 disponibles. Recharge incluse, écologique et économique. Dès 450 DH/jour.',
    keywords: 'location voiture électrique casablanca, location VW ID casablanca, voiture ecologique',
    h1: 'Location de Voiture Électrique à Casablanca',
    heroSubtitle: 'VW ID.3 & ID.4 • Recharge gratuite • 100% écologique',
    content: {
      intro: 'Roulez électrique à Casablanca avec nos VW ID.3 et ID.4 ! Autonomie réelle 350-400 km, recharge gratuite dans nos locaux ou bornes partenaires. Économisez sur le carburant (0 DH vs 140 DH/jour d\'essence) et profitez d\'une conduite silencieuse et moderne. Stationnement gratuit dans certaines zones vertes de Casa. Idéal pour usage urbain et trajets Casablanca-Rabat.',
      sections: [
        {
          title: 'Véhicules Électriques Disponibles',
          content: 'VW ID.3 (450 DH/jour) : Compacte électrique, autonomie 420 km WLTP (350 km réel), recharge rapide 30 min 10-80%, intérieur futuriste digital. VW ID.4 (550 DH/jour) : SUV électrique familial, autonomie 520 km WLTP (400 km réel), spacieux, 4 roues motrices optionnelles. Les deux modèles incluent : recharge gratuite illimitée dans nos locaux Casablanca (borne 11 kW, plein en 6h), accès bornes partenaires Maroc (Afriquia, Inwi) avec carte fournie, câble de recharge domestique (prise classique 8h pour plein), assurance batterie incluse.'
        }
      ],
      faq: [
        {
          question: 'Autonomie suffisante pour aller à Marrakech ?',
          answer: 'Casablanca-Marrakech = 240 km. Autonomie ID.3/ID.4 = 350-400 km réel. Oui, ça passe large ! Et il y a des bornes rapides à El Jadida (mi-chemin) et Marrakech centre.'
        }
      ]
    },
    cta: {
      title: 'Essayez l\'Électrique à Casablanca',
      subtitle: 'Recharge gratuite • Économique • Écologique',
      buttonText: 'Réserver',
      buttonLink: '/louer?city=Casablanca'
    },
    relatedServices: [
      { title: 'Location Longue Durée Casablanca', description: 'VW ID.3 et ID.4 en formule mensuelle avec recharge gratuite.', link: '/location-longue-duree-casablanca' },
      { title: 'Location Aéroport Casablanca', description: 'Récupération de véhicules électriques au terminal Mohammed V.', link: '/location-voiture-aeroport-casablanca' },
      { title: 'Location Jeune Conducteur Casablanca', description: 'Véhicules électriques accessibles aux jeunes conducteurs.', link: '/location-jeune-conducteur-casablanca' }
    ],
    relatedPages: []
  },
  {
    slug: 'location-van-famille-maroc',
    title: 'Location Van Famille Maroc',
    metaTitle: 'Location Van Familial Maroc - 7-9 Places | Benatna',
    metaDescription: 'Louez un van ou minibus pour famille nombreuse au Maroc. Véhicules 7-9 places spacieux. Idéal road trips en famille. Dès 600 DH/jour.',
    keywords: 'location van maroc, minibus 9 places, location familiale maroc',
    h1: 'Location Van et Minibus Familial au Maroc',
    heroSubtitle: '7-9 places • Coffre XXL • Clim arrière',
    category: {
      label: "Véhicules Spéciaux",
      href: "/nos-services?category=special"
    },
    content: {
      intro: 'Famille nombreuse ou groupe d\'amis ? Louez notre van Mercedes Vito ou Volkswagen Multivan pour voyager tous ensemble. 7-9 places assises confortables, climatisation avant/arrière, coffre géant pour tous les bagages. Parfait pour road trips familiaux Atlas, Merzouga ou côte Atlantique. Conduite facile malgré la taille (gabarit similaire à un SUV).',
      sections: [
        {
          title: 'Vans Disponibles',
          content: 'Mercedes Vito (600 DH/jour) : Van 9 places robuste, moteur diesel 150ch, coffre modulable 1200L-4000L selon configuration sièges. VW Multivan (750 DH/jour) : Van premium 7 places, sièges cuir pivotants, table intégrée, stores électriques. Confort berline dans un volume van. Inclus : porte-vélos ou coffre de toit sur demande (50 DH/jour), GPS grand écran 9 pouces, sièges bébé/rehausseurs gratuits (sur réservation).'
        }
      ],
      faq: []
    },
    cta: {
      title: 'Réservez Votre Van Familial',
      subtitle: 'Espace maximal • Confort assuré',
      buttonText: 'Réserver',
      buttonLink: '/louer'
    },
    relatedServices: [
      { title: 'Location SUV Atlas', description: 'Alternative SUV 5-7 places pour familles en montagne.', link: '/location-suv-atlas' },
      { title: 'Location Utilitaire Casablanca', description: 'Mercedes Sprinter pour transports volumineux familiaux.', link: '/location-utilitaire-demenagement-casablanca' },
      { title: 'Location Longue Durée Casablanca', description: 'Vans en formule mensuelle pour familles expatriées.', link: '/location-longue-duree-casablanca' }
    ],
    relatedPages: []
  },
  {
    slug: 'location-cabriolet-agadir',
    title: 'Location Cabriolet Agadir',
    metaTitle: 'Location Cabriolet Agadir - BMW Z4, Audi A5 Cabrio | Benatna',
    metaDescription: 'Louez un cabriolet à Agadir. BMW Z4, Audi A5 Cabrio, Mercedes. Profitez du soleil et de la côte atlantique. Dès 700 DH/jour.',
    keywords: 'location cabriolet agadir, location decapotable maroc, bmw z4 agadir',
    h1: 'Location de Cabriolet à Agadir',
    heroSubtitle: 'BMW Z4 • Audi A5 Cabrio • Soleil d\'Agadir',
    content: {
      intro: '300 jours de soleil par an à Agadir = conditions parfaites pour rouler cheveux au vent ! Benatna vous propose des cabriolets sportifs (BMW Z4, Audi A5 Cabrio) pour profiter pleinement de la corniche, des plages et de la route vers Essaouira. Conduite plaisir garantie avec le bruit de l\'océan et la capote ouverte.',
      sections: [
        {
          title: 'Cabriolets Disponibles',
          content: 'BMW Z4 (700 DH/jour) : Roadster 2 places pur plaisir, moteur 6 cylindres 260ch, capote électrique 10 secondes, sono Harman Kardon. Pour couple romantique. Audi A5 Cabrio (750 DH/jour) : Cabriolet 4 vraies places, capote toile acoustique, Quattro intégrale, design élégant. Polyvalent et chic. Tous cabriolets livrés : lavés et aspirés minutieusement, plein d\'essence, tapis de coffre protection sable, crème solaire offerte !'
        }
      ],
      faq: []
    },
    cta: {
      title: 'Louez Votre Cabriolet à Agadir',
      subtitle: 'Soleil • Liberté • Sensations',
      buttonText: 'Réserver',
      buttonLink: '/louer?city=Agadir'
    },
    relatedPages: []
  },
  {
    slug: 'location-utilitaire-demenagement-casablanca',
    title: 'Location Utilitaire Casablanca',
    metaTitle: 'Location Utilitaire Déménagement Casablanca - Camion 20m³ | Benatna',
    metaDescription: 'Louez un utilitaire ou camion pour déménagement à Casablanca. Véhicules 10-20m³ avec hayon. Tarifs journée ou weekend. Dès 400 DH/jour.',
    keywords: 'location utilitaire casablanca, camion demenagement casa, location camionnette',
    h1: 'Location Utilitaire et Camion Déménagement Casablanca',
    heroSubtitle: '10-20m³ • Hayon élévateur • Couvertures fournies',
    category: {
      label: "Véhicules Spéciaux",
      href: "/nos-services?category=special"
    },
    content: {
      intro: 'Déménagement, transport de meubles ou gros achats ? Louez notre utilitaire ou camion à Casablanca. Véhicules 10m³ à 20m³ avec hayon élévateur, idéal pour chargement/déchargement sans effort. Couvertures de protection fournies gratuitement. Permis B suffit (pas besoin permis poids lourd).',
      sections: [
        {
          title: 'Utilitaires et Camions',
          content: 'Fiat Ducato 10m³ (400 DH/jour) : L2H2, charge utile 1200 kg, largeur portes 1.42m (canapé passe), permis B. Idéal studio ou petit appartement. Mercedes Sprinter 15m³ (500 DH/jour) : L3H2, charge 1500 kg, rampe hayon 500 kg, volume optimal T3. Iveco Daily 20m³ (650 DH/jour) : L4H3, charge 2000 kg, hayon 750 kg, déménage villa entière. Tous incluent : 10 couvertures matelassées épaisses, 20 sangles d\'arrimage professionnelles, diable/chariot si disponible, assurance marchandise transportée (30 000 DH).'
        }
      ],
      faq: []
    },
    cta: {
      title: 'Réservez Votre Utilitaire',
      subtitle: 'Permis B • Hayon • Équipement inclus',
      buttonText: 'Réserver',
      buttonLink: '/contact'
    },
    relatedServices: [
      { title: 'Location Van Familial 7-9 Places', description: 'Alternative vans passagers pour déménagements légers.', link: '/location-van-famille-maroc' },
      { title: 'Location Longue Durée Casablanca', description: 'Utilitaires en formule mensuelle pour professionnels.', link: '/location-longue-duree-casablanca' },
      { title: 'Location Aéroport Casablanca', description: 'Livraison d\'utilitaires au terminal pour déménagements internationaux.', link: '/location-voiture-aeroport-casablanca' }
    ],
    relatedPages: []
  }
];
