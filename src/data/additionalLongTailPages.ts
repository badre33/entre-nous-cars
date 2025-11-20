/**
 * Générateur de contenu SEO pour pages longue traîne additionnelles
 * Template réutilisable avec variations selon mots-clés
 */

import { LongTailPageConfig } from "./longTailPages";

// Template pour aéroport
const createAeroportPage = (city: string, citySlug: string, airport: string): Partial<LongTailPageConfig> => ({
  slug: `location-voiture-aeroport-${citySlug}`,
  metaTitle: `Location Voiture Aéroport ${city} - Livraison Gratuite | Benatna`,
  metaDescription: `Louez une voiture directement à l'aéroport ${airport}. Livraison gratuite au terminal. Réservation en ligne, gain de temps, prix dès 150 DH/jour.`,
  keywords: `location voiture aéroport ${citySlug}, ${airport} location auto, louer voiture terminal ${city}`,
  h1: `Location de Voiture à l'Aéroport ${airport}`,
  heroSubtitle: `Livraison gratuite au terminal • Pas de file d'attente • Dès 150 DH/jour`,
  content: {
    intro: `Arrivez à l'aéroport ${airport} et récupérez votre voiture de location en quelques minutes avec Benatna. Notre service de livraison gratuite au terminal vous évite les files d'attente des comptoirs d'aéroport et vous fait économiser jusqu'à 40% par rapport aux tarifs pratiqués dans les kiosques du hall des arrivées. Réservez en ligne avant votre vol, et votre véhicule vous attend dès votre atterrissage. Simple, rapide et économique.`,
    sections: [
      {
        title: `Pourquoi Louer à l'Aéroport ${airport} avec Benatna ?`,
        content: `Les comptoirs de location dans les aéroports pratiquent des tarifs majorés (souvent 30-50% plus chers qu'en ville) en raison des frais de concession élevés qu'ils paient aux gestionnaires aéroportuaires. Benatna contourne ce système en vous livrant votre voiture gratuitement directement au terminal, vous faisant bénéficier de nos tarifs ville (dès 150 DH/jour pour une citadine). Plus besoin de faire la queue pendant 30-60 minutes aux comptoirs bondés : nous vous retrouvons dans le hall des arrivées avec votre véhicule prêt à partir. C'est particulièrement apprécié lors des arrivées tardives (vols de nuit) ou matinales où vous voulez gagner du temps. Notre service fonctionne 24h/24 et 7j/7 pour s'adapter à tous les horaires de vol. De plus, contrairement aux loueurs d'aéroport qui sous-traitent parfois la livraison du véhicule (navettes vers des parkings éloignés), nous vous remettons les clés directement au terminal : vous êtes sur la route 15 minutes après avoir récupéré vos bagages.`
      },
      {
        title: `Procédure de Récupération à l'Aéroport ${airport}`,
        content: `La récupération de votre véhicule est ultra-simple. Lors de votre réservation en ligne, vous indiquez votre numéro de vol et votre heure d'arrivée. Nous suivons votre vol en temps réel : en cas de retard, nous ajustons automatiquement l'heure de livraison, sans frais supplémentaires. Une fois atterri, récupérez vos bagages comme d'habitude. Avant de sortir du hall des arrivées, appelez ou envoyez un message WhatsApp au numéro indiqué dans votre confirmation de réservation. Notre agent, déjà sur place avec votre véhicule, vous rejoint en 5-10 minutes maximum au point de rendez-vous convenu (généralement la sortie du terminal, facilement identifiable). Il vous remet les clés, les papiers du véhicule (carte grise, attestation d'assurance) et vous fait un rapide tour du véhicule pour vous montrer les commandes essentielles (climatisation, GPS si inclus, comment ouvrir le coffre). Vous réglez le montant de la location (espèces, carte ou virement selon votre choix) et c'est parti : vous pouvez immédiatement prendre la route vers votre destination à ${city}. Comptez 15 minutes maximum entre votre sortie du hall et votre départ de l'aéroport.`
      },
      {
        title: `Types de Véhicules Disponibles à l'Aéroport ${airport}`,
        content: `Toute notre flotte est disponible en livraison aéroport. Citadines économiques (Clio, Sandero, 208) à 150-180 DH/jour : idéales si vous voyagez léger, parfaites pour ${city} et ses alentours, consommation réduite. Berlines confortables (Corolla, Jetta) à 250-300 DH/jour : recommandées pour familles avec bagages ou longs trajets vers autres villes, climatisation efficace, coffre spacieux. SUV tout-terrain (Duster, Qashqai, Tiguan) à 350-450 DH/jour : essentiels si vous prévoyez des excursions hors des sentiers battus, dans les montagnes ou le désert, hauteur de caisse adaptée aux pistes. Véhicules premium (Mercedes, BMW, Audi) à 800-1000 DH/jour : image professionnelle pour déplacements d'affaires ou occasions spéciales. Tous les véhicules ont moins de 3 ans, kilométrage illimité inclus, assurance tous risques comprise. Si vous avez des besoins spécifiques (siège bébé, GPS, chaînes neige en hiver), précisez-le lors de la réservation : nous préparons tout à l'avance.`
      }
    ],
    faq: [
      {
        question: `Y a-t-il des frais de livraison à l'aéroport ${airport} ?`,
        answer: "Non, la livraison à l'aéroport est totalement gratuite. Nous ne facturons aucun supplément, contrairement aux comptoirs d'aéroport qui intègrent des frais de concession dans leurs tarifs."
      },
      {
        question: "Que se passe-t-il si mon vol a du retard ?",
        answer: "Nous suivons votre vol en temps réel. En cas de retard, nous ajustons automatiquement l'heure de rendez-vous sans frais supplémentaires. Vous n'avez rien à faire."
      },
      {
        question: "Puis-je réserver une voiture pour une arrivée de nuit (après 23h) ?",
        answer: "Oui ! Notre service fonctionne 24h/24. Que votre vol arrive à minuit, 3h du matin ou 6h, nous serons là pour vous livrer votre véhicule."
      },
      {
        question: "Combien de temps faut-il entre ma sortie du terminal et mon départ de l'aéroport ?",
        answer: "Environ 15 minutes : 5-10 minutes pour que notre agent vous rejoigne avec le véhicule, puis 5 minutes pour la remise des clés et des documents. C'est beaucoup plus rapide que les files d'attente des comptoirs traditionnels."
      }
    ]
  },
  cta: {
    title: `Réservez Votre Voiture pour l'Aéroport ${city}`,
    subtitle: "Livraison gratuite • Service 24/7 • Tarifs transparents",
    buttonText: "Réserver Maintenant",
    buttonLink: `/louer?city=${city}`
  },
  relatedPages: [
    { title: `Location Voiture ${city}`, link: `/location-voiture-${citySlug}` }
  ]
});

// Export des nouvelles pages additionnelles
export const additionalLongTailPages: Partial<LongTailPageConfig>[] = [
  // Aéroports
  createAeroportPage("Casablanca", "casablanca", "Mohammed V"),
  createAeroportPage("Marrakech", "marrakech", "Menara"),
  createAeroportPage("Agadir", "agadir", "Al Massira"),
  createAeroportPage("Tanger", "tanger", "Ibn Battouta"),
  createAeroportPage("Fès", "fes", "Saïss"),
  createAeroportPage("Rabat", "rabat", "Rabat-Salé"),
];
