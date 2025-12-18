/**
 * Générateur de contenu SEO pour pages longue traîne additionnelles
 * Template réutilisable avec variations selon mots-clés
 */

import { LongTailPageConfig } from "./longTailPages";

// Template pour aéroport
const createAeroportPage = (city: string, citySlug: string, airport: string): LongTailPageConfig => ({
  slug: `location-voiture-aeroport-${citySlug}`,
  title: `Location Voiture Aéroport ${city}`,
  metaTitle: `Location voiture aéroport ${city} | Benatna – Loueurs locaux`,
  metaDescription: `Louez une voiture à l'aéroport ${airport}. Livraison gratuite au terminal, pas de file d'attente. Dès 150 DH/jour, réservez par WhatsApp.`,
  keywords: `location voiture aéroport ${citySlug}, ${airport} location auto, louer voiture terminal ${city}`,
  h1: `Location de Voiture à l'Aéroport ${airport}`,
  heroSubtitle: `Livraison gratuite au terminal • Pas de file d'attente • Dès 150 DH/jour`,
  category: {
    label: "Locations Aéroports",
    href: "/nos-services?category=aeroport"
  },
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
  relatedServices: citySlug === 'casablanca' ? [
    { title: 'Location Jeune Conducteur Casablanca', description: 'Dès 21 ans avec supplément raisonnable. Assurance adaptée incluse.', link: '/location-jeune-conducteur-casablanca' },
    { title: 'Location Longue Durée Casablanca', description: 'Tarifs mensuels dégressifs dès 3500 DH/mois tout compris.', link: '/location-longue-duree-casablanca' },
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
});

// Template pour mariage
const createMariagePage = (): LongTailPageConfig => ({
  slug: 'location-voiture-mariage-maroc',
  title: 'Location Voiture Mariage Maroc',
  metaTitle: 'Location voiture mariage Maroc | Benatna – Loueurs locaux',
  metaDescription: 'Louez une voiture de luxe pour votre mariage au Maroc. Mercedes, BMW, Audi décorées. Chauffeur disponible. Dès 800 DH/jour.',
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
  metaTitle: `Location longue durée ${city} | Benatna – Loueurs locaux`,
  metaDescription: `Location longue durée à ${city}. Tarifs dégressifs, entretien et assurance inclus. Dès 3500 DH/mois. Résiliable avec 1 mois de préavis.`,
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
        content: `Catégorie Économique (Sandero, Clio) : 3 mois = 4200 DH/mois, 6 mois = 3800 DH/mois, 12 mois = 3500 DH/mois. Soit jusqu'à 700 DH d'économie par mois sur un an vs location classique. Catégorie Berline (Corolla, Jetta) : 3 mois = 5500 DH/mois, 6 mois = 5000 DH/mois, 12 mois = 4500 DH/mois. Idéale pour usage professionnel ou famille. Catégorie SUV (Duster, Qashqai) : 3 mois = 6500 DH/mois, 6 mois = 6000 DH/mois, 12 mois = 5500 DH/mois. Robustesse et confort pour longs trajets. Catégorie Premium (Mercedes, BMW) : Sur devis selon modèle et durée. À partir de 12 000 DH/mois pour Classe C ou Série 3. Tous ces tarifs incluent : assurance tous risques (0 DH franchise), entretien complet selon planning constructeur, assistance et dépannage 24/7, remplacement véhicule en cas de panne (sous 4h), kilométrage illimité (pas de surcoût même si vous faites 5000 km/mois). Modes de paiement : mensuel par prélèvement automatique (carte ou virement), ou paiement trimestriel avec 5% de remise supplémentaire.`
      },
      {
        title: 'Ce Qui Est Inclus dans Nos Forfaits Longue Durée',
        content: `Entretien mécanique : Nous prenons rendez-vous pour vous dans nos garages partenaires agréés constructeurs, toutes les vidanges (selon kilométrage ou 6 mois), changements de filtres, plaquettes de frein si nécessaire, contrôles techniques payés. Pneus : Remplacement si usure > 1.6mm de profondeur, permutation tous les 10 000 km pour usure uniforme, pneus neige en option pour régions montagneuses (50 DH/mois supplément). Assurance : Tous risques conducteur principal + 1 conducteur secondaire gratuit, pas de franchise en cas d'accident responsable, bris de glace inclus, vol avec effraction couvert. Assistance : Panne mécanique ou crevaison : dépannage ou remorquage gratuit vers garage le plus proche, accident : gestion complète du dossier assurance par nos équipes, vous ne vous occupez de rien, véhicule de remplacement équivalent livré sous 4h maximum si immobilisation > 24h (en 8 ans, temps moyen de remplacement : 2h30). Flexibilité : Changement de catégorie possible en cours de contrat (upgrade ou downgrade) avec ajustement tarifaire au prorata, pause de 1 mois possible si vous quittez temporairement le Maroc (gel du contrat), résiliation avec 1 mois de préavis uniquement, aucune pénalité.`
      },
      {
        title: 'Qui Choisit la Location Longue Durée ?',
        content: `Expatriés et détachés : Vous travaillez au Maroc pour une mission de 6 mois à 2 ans ? La location longue durée évite l'achat d'un véhicule local, l'immatriculation complexe et surtout la revente difficile au moment du départ. Nos clients expatriés apprécient la flexibilité : un mois de préavis suffit si votre mission est écourtée. Nous gérons aussi la facturation mensuelle avec TVA récupérable pour les entreprises. Entrepreneurs et startups : Optimisez votre trésorerie ! Au lieu d'immobiliser 200 000 DH dans l'achat d'un véhicule, payez 4500 DH/mois charges comprises. Les mensualités sont déductibles fiscalement comme charge d'exploitation. Plus besoin de budget entretien surprise (pneus, révisions) : tout est inclus. Particuliers sans apport : Pas les 50 000 DH d'apport pour un crédit auto ? La location longue durée ne demande qu'un mois de caution (remboursable à la restitution). Vous roulez immédiatement dans un véhicule récent sans endettement bancaire. Travailleurs saisonniers : Vous travaillez 6 mois à ${city} puis 6 mois ailleurs ? Nos contrats de 6 mois avec possibilité de gel sont parfaits. Pas besoin de laisser un véhicule dormir dans un garage pendant votre absence.`
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
    { title: 'Location Longue Durée Casablanca', description: 'Même service à Casablanca avec tarifs dégressifs dès 3500 DH/mois.', link: '/location-longue-duree-casablanca' },
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
  metaTitle: `Location jeune conducteur ${city} | Benatna – Loueurs locaux`,
  metaDescription: `Location voiture jeune conducteur à ${city}. Dès 21 ans, assurance incluse, supplément 50 DH/jour seulement. Réservez par WhatsApp.`,
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
        content: `Âge minimum : 21 ans pour berlines et SUV, 20 ans pour citadines (Clio, Sandero, 208), 25 ans pour véhicules premium (Mercedes, BMW, Audi). Permis : Minimum 1 an de permis (2 ans pour SUV et premium), permis probatoire accepté, carte rose jeune conducteur pas obligatoire au Maroc. Supplément jeune conducteur : 50 DH/jour pour 21-24 ans (vs 150-300 DH chez les concurrents), 0 DH à partir de 25 ans. Ce supplément couvre l'assurance spécifique jeune conducteur avec surprime. Caution : 3000 DH préautorisation carte bancaire pour 21-24 ans (bloquée mais non débitée), 2000 DH à partir de 25 ans, débloquée 7 jours après restitution si aucun dommage. Exemple de tarif réel jeune conducteur : Clio 3 jours = (150 DH/jour + 50 DH supplément jeune) × 3 = 600 DH total. Chez les concurrents : (200 DH/jour + 200 DH supplément) × 3 = 1200 DH. Vous économisez 600 DH ! Documents requis : Carte d\'identité nationale ou passeport, permis de conduire (recto-verso en couleur), justificatif de domicile de moins de 3 mois (facture eau/électricité ou attestation hébergement), carte bancaire au nom du locataire pour caution.`
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
  metaTitle: `Location SUV 4x4 ${region} | Benatna – Loueurs locaux`,
  metaDescription: `Louez un SUV ou 4x4 pour ${region}. Véhicules tout-terrain, GPS inclus, assurance pistes. Dès 350 DH/jour. Réservez maintenant.`,
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
  metaTitle: 'Location voiture luxe événement Maroc | Benatna – Loueurs locaux',
  metaDescription: 'Louez une voiture de prestige pour vos événements. Mercedes, BMW, Audi avec chauffeur. Service premium dès 900 DH/jour.',
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
    metaTitle: 'Location weekend Marrakech | Benatna – Loueurs locaux',
    metaDescription: 'Louez une voiture pour le weekend à Marrakech. Offre 3 jours pour le prix de 2. Dès 280 DH/jour, km illimités.',
    keywords: 'location weekend marrakech, location 2 jours marrakech, location courte durée',
    h1: 'Location de Voiture Weekend à Marrakech',
    heroSubtitle: 'Tarifs spéciaux 2-3 jours • Départ vendredi soir • Retour lundi matin',
    category: {
      label: "Formules Courte Durée",
      href: "/nos-services?category=courte-duree"
    },
    content: {
      intro: 'Weekend prolongé à Marrakech ? Profitez de nos tarifs spéciaux 2-3 jours ! Réservez du vendredi soir 18h au lundi matin 9h pour 2 jours de facturation seulement (au lieu de 3). Idéal pour découvrir Marrakech et ses environs (Atlas, Essaouira, désert d\'Agafay) sans se ruiner. Toutes catégories disponibles avec kilométrage illimité. Nos offres weekend sont conçues pour les escapades romantiques en couple, les sorties entre amis ou les week-ends en famille à la découverte de la ville ocre et de ses trésors.',
      sections: [
        {
          title: 'Pourquoi Louer une Voiture pour le Weekend à Marrakech ?',
          content: 'Marrakech offre un potentiel d\'exploration immense en seulement 2-3 jours. Sans voiture, vous êtes limité à la Médina et Guéliz, dépendant des taxis ou des excursions organisées coûteuses. Avec votre propre véhicule, le champ des possibles s\'ouvre : la vallée de l\'Ourika à 1h (cascades, villages berbères), Essaouira à 2h30 (ville côtière UNESCO), le désert d\'Agafay à 40 minutes (coucher de soleil spectaculaire), ou encore les cascades d\'Ouzoud à 2h30. Vous partez quand vous voulez, vous vous arrêtez où vous voulez, vous rentrez à votre rythme. C\'est la liberté totale pour maximiser votre court séjour. De plus, nos tarifs weekend dégressifs vous permettent d\'économiser jusqu\'à 30% par rapport à une location classique, rendant l\'option voiture encore plus attractive financièrement.'
        },
        {
          title: 'Forfaits Weekend Disponibles',
          content: 'Forfait Essentiel (2 jours) : Citadine (Clio, Sandero, 208) à 280 DH/jour, retrait vendredi 14h, retour dimanche 20h. 400 km inclus, parfait pour Marrakech + une excursion (Ourika ou Agafay). Assurance tous risques incluse. Forfait Exploration (3 jours) : SUV (Duster, Qashqai) à 380 DH/jour, retrait vendredi soir 18h, retour lundi matin 9h. Kilométrage illimité pour road trip Atlas ou Essaouira. GPS inclus, assurance pistes. Idéal familles et groupes d\'amis. Forfait VIP (weekend luxe) : Berline premium (Mercedes, BMW) à 750 DH/jour, service conciergerie inclus avec recommandations restaurants gastronomiques, réservations riads de charme, itinéraires personnalisés. Pour occasions spéciales : anniversaires, demandes en mariage, lunes de miel. Tous nos forfaits incluent : livraison/récupération gratuite à votre hôtel ou riad, assurance tous risques, assistance 24/7, annulation gratuite jusqu\'à 48h avant.'
        },
        {
          title: 'Itinéraires Weekend Recommandés depuis Marrakech',
          content: 'Weekend Nature (vallée de l\'Ourika) : Samedi matin départ vers Ourika (1h), balade villages berbères, déjeuner tajine en terrasse vue montagne, baignade cascades Setti Fatma (été). Retour Marrakech fin d\'après-midi. Dimanche : Jardin Majorelle + Médina + Jemaa el-Fna. Total ~150 km. Weekend Côte (Essaouira) : Samedi départ tôt vers Essaouira (2h30), découverte médina fortifiée, déjeuner fruits de mer au port, plage Sidi Kaouki (surfeurs). Nuit dans un riad. Dimanche retour tranquille via route des arganiers. Total ~400 km. Weekend Désert (Agafay) : Samedi après-midi départ vers désert Agafay (45 min), coucher de soleil, dîner camp de luxe, nuit sous les étoiles. Dimanche : lac Takerkoust + retour Marrakech via Palmeraie. Total ~120 km. Weekend Atlas (montagne) : Samedi route Tizi n\'Tichka jusqu\'à Aït Ben Haddou (3h), visite kasbah UNESCO, nuit sur place. Dimanche retour via vallée du Draa ou route directe. Total ~380 km. SUV recommandé.'
        },
        {
          title: 'Comment Réserver Votre Voiture Weekend avec Benatna ?',
          content: 'Étape 1 : Choisissez votre véhicule sur notre catalogue en ligne ou contactez-nous par WhatsApp pour conseils personnalisés selon votre itinéraire prévu. Étape 2 : Indiquez vos dates (vendredi-dimanche ou vendredi-lundi) et lieu de livraison (aéroport Menara, hôtel, riad Médina). Étape 3 : Validez votre réservation en 2 minutes, paiement flexible (carte, espèces, virement). Aucune carte de crédit obligatoire. Étape 4 : Le jour J, nous livrons le véhicule à l\'heure et à l\'endroit convenus. Briefing rapide sur le véhicule, remise des clés, et c\'est parti ! Étape 5 : Profitez de votre weekend. Notre assistance 24/7 reste joignable en cas de besoin. Étape 6 : Retour du véhicule à l\'heure convenue au même point ou ailleurs (sans supplément dans Marrakech). Réservation conseillée 1 semaine à l\'avance pour les weekends de haute saison (vacances scolaires, ponts, festivals).'
        }
      ],
      faq: [
        {
          question: 'Comment fonctionne l\'offre 3 jours pour le prix de 2 ?',
          answer: 'Si vous récupérez le véhicule vendredi après 18h et le rendez lundi avant 9h, vous ne payez que 2 jours de location au lieu de 3. C\'est notre façon de rendre les weekends accessibles à tous. Cette offre s\'applique à toutes les catégories de véhicules.'
        },
        {
          question: 'Puis-je partir vers Essaouira ou l\'Atlas avec le forfait weekend ?',
          answer: 'Absolument ! Le forfait Exploration inclut le kilométrage illimité, parfait pour Essaouira (400 km aller-retour) ou l\'Atlas. Nous recommandons un SUV pour les routes de montagne, inclus dans ce forfait à 380 DH/jour.'
        },
        {
          question: 'Que se passe-t-il si je rends la voiture en retard le lundi ?',
          answer: 'Nous offrons une tolérance de 1h gratuite. Au-delà, un supplément de 50 DH/heure s\'applique jusqu\'à 4h de retard. Après 4h, une journée complète est facturée. Prévenez-nous en cas de retard prévisible, nous sommes flexibles !'
        },
        {
          question: 'Livrez-vous dans les riads de la Médina de Marrakech ?',
          answer: 'Oui ! Nous livrons à l\'entrée la plus proche accessible en voiture de votre riad (Bab Doukkala, Bab Laksour, etc.). Notre agent vous accompagne jusqu\'au véhicule. Service gratuit inclus dans tous les forfaits weekend.'
        }
      ]
    },
    cta: {
      title: 'Réservez Votre Weekend à Marrakech',
      subtitle: 'Tarifs dégressifs • Kilométrage illimité • Livraison gratuite',
      buttonText: 'Réserver Mon Weekend',
      buttonLink: '/louer?city=Marrakech'
    },
    relatedServices: [
      { title: 'Location Aéroport Marrakech', description: 'Récupérez votre voiture dès l\'atterrissage au terminal Menara.', link: '/location-voiture-aeroport-marrakech' },
      { title: 'Location Jeune Conducteur Marrakech', description: 'Forfaits weekend accessibles dès 21 ans.', link: '/location-jeune-conducteur-marrakech' },
      { title: 'Location SUV Atlas', description: 'Véhicules tout-terrain pour excursions montagne.', link: '/location-suv-atlas' }
    ],
    relatedPages: [
      { title: 'Location Marrakech', link: '/location-voiture-marrakech' }
    ]
  },
  {
    slug: 'location-voiture-electrique-casablanca',
    title: 'Location Voiture Électrique Casablanca',
    metaTitle: 'Location voiture électrique Casablanca | Benatna – Loueurs locaux',
    metaDescription: 'Louez une voiture électrique à Casablanca. VW ID.3 et ID.4, recharge gratuite, autonomie 400 km. Dès 450 DH/jour.',
    keywords: 'location voiture électrique casablanca, location VW ID casablanca, voiture ecologique',
    h1: 'Location de Voiture Électrique à Casablanca',
    heroSubtitle: 'VW ID.3 & ID.4 • Recharge gratuite • 100% écologique',
    category: {
      label: "Véhicules Écologiques",
      href: "/nos-services?category=electrique"
    },
    content: {
      intro: 'Roulez électrique à Casablanca avec nos VW ID.3 et ID.4 ! Autonomie réelle 350-400 km, recharge gratuite dans nos locaux ou bornes partenaires. Économisez sur le carburant (0 DH vs 140 DH/jour d\'essence) et profitez d\'une conduite silencieuse, fluide et moderne. Stationnement gratuit dans certaines zones vertes de Casa. Idéal pour usage urbain quotidien, trajets Casablanca-Rabat ou déplacements professionnels éco-responsables. Rejoignez la mobilité du futur dès aujourd\'hui avec Benatna, pionnier de la location électrique au Maroc.',
      sections: [
        {
          title: 'Pourquoi Louer une Voiture Électrique à Casablanca ?',
          content: 'Casablanca est la ville idéale pour découvrir la mobilité électrique. La métropole dispose d\'un réseau croissant de bornes de recharge (Afriquia, Inwi, centres commerciaux) et ses distances quotidiennes typiques (domicile-travail, courses, sorties) représentent rarement plus de 50-80 km, soit une fraction de l\'autonomie de nos véhicules. Économiquement, l\'électrique est imbattable : 0 DH de carburant vs 140 DH/jour en essence pour un usage similaire. L\'entretien est quasi-nul (pas de vidange, pas de filtres). Sur le plan pratique, la conduite électrique est un pur bonheur : accélération instantanée et linéaire, silence de fonctionnement, absence de vibrations, climatisation efficace. Dans les embouteillages casablancais, vous apprécierez le confort acoustique et le mode « une pédale » qui rend la conduite fluide et reposante. Enfin, rouler électrique c\'est contribuer à réduire la pollution atmosphérique de Casablanca, enjeu de santé publique majeur dans cette métropole de 4 millions d\'habitants.'
        },
        {
          title: 'Véhicules Électriques Disponibles',
          content: 'VW ID.3 (450 DH/jour) : Compacte électrique de référence, autonomie 420 km WLTP (350 km réel en conduite mixte), recharge rapide 30 min 10-80% sur borne 100 kW, intérieur futuriste tout digital, coffre 385L. Parfaite pour usage urbain solo ou couple. VW ID.4 (550 DH/jour) : SUV électrique familial premium, autonomie 520 km WLTP (400 km réel), espace généreux 5 places + coffre 543L, toit panoramique, écran tactile 12 pouces. 4 roues motrices optionnelles pour escapades montagneuses. Idéal familles ou professionnels. Les deux modèles incluent : recharge gratuite illimitée dans nos locaux Casablanca (borne 11 kW AC, plein en 6h de nuit), carte d\'accès bornes partenaires Maroc (Afriquia, Inwi, Morocco Mall) avec tarifs réduits, câble de recharge domestique Type 2 (prise renforcée 8h pour plein), application VW ID pour localiser bornes et suivre autonomie, assurance batterie et composants électriques incluse (garantie 8 ans/160 000 km).'
        },
        {
          title: 'Réseau de Recharge à Casablanca et au Maroc',
          content: 'Le réseau de bornes marocain se développe rapidement. À Casablanca, vous trouverez des bornes dans tous les grands centres commerciaux (Morocco Mall, Anfa Place, Casanearshore), les stations Afriquia équipées (corniche, Maarif, Sidi Maarouf), et les parkings de certains hôtels 4-5 étoiles. Pour les trajets inter-villes : Casablanca-Rabat (90 km) se fait sans recharge, Casablanca-Marrakech (240 km) également avec ID.4 (prévoir borne à l\'arrivée), Casablanca-El Jadida (100 km) aller-retour sans souci. Nous fournissons une carte détaillée des bornes avec codes d\'accès. En cas de doute, notre assistance 24/7 vous guide vers la borne la plus proche. Conseil : rechargez la nuit à notre borne gratuite, vous partez chaque matin avec 100% de batterie. Temps de recharge : borne rapide 100 kW = 30 min 10-80%, borne AC 11 kW = 6h plein, prise domestique = 8-10h plein.'
        },
        {
          title: 'Comment Louer une Voiture Électrique avec Benatna ?',
          content: 'Étape 1 : Réservez en ligne ou par WhatsApp en précisant « véhicule électrique ». Indiquez votre usage prévu (urbain, inter-villes) pour conseils personnalisés. Étape 2 : Livraison du véhicule à votre domicile, hôtel ou bureau avec batterie 100%. Notre agent vous fait une démonstration complète : branchement des câbles, utilisation de l\'application VW ID, localisation des bornes, mode conduite « B » (récupération d\'énergie). Étape 3 : Pendant votre location, rechargez gratuitement dans nos locaux (Sidi Maarouf) ou utilisez votre carte bornes partenaires. L\'application VW ID affiche l\'autonomie restante en temps réel. Étape 4 : Retour du véhicule. Aucune exigence de niveau de batterie au retour (contrairement au plein d\'essence). Nous rechargeons pour le client suivant. Conseil pro : activez le préchauffage/climatisation depuis l\'application VW ID 10 minutes avant de partir. La voiture sera à température idéale et la batterie ne sera pas sollicitée pendant votre trajet.'
        }
      ],
      faq: [
        {
          question: 'L\'autonomie est-elle suffisante pour aller à Marrakech ?',
          answer: 'Casablanca-Marrakech = 240 km. Autonomie ID.3 = 350 km réel, ID.4 = 400 km réel. Oui, ça passe largement ! Vous arriverez avec 30-40% de batterie restante. Bornes de recharge disponibles à Marrakech centre (Morocco Mall, hôtels) pour le retour.'
        },
        {
          question: 'Que se passe-t-il si je tombe en panne de batterie ?',
          answer: 'Nos véhicules affichent l\'autonomie restante en temps réel et alertent dès 20% de batterie. En cas d\'immobilisation (très rare), notre assistance 24/7 vous envoie un dépanneur avec générateur mobile ou vous remorque vers la borne la plus proche. Service inclus dans la location.'
        },
        {
          question: 'La recharge chez vous est-elle vraiment gratuite ?',
          answer: 'Oui, 100% gratuite et illimitée ! Nos locaux à Sidi Maarouf sont équipés de bornes 11 kW. Vous pouvez laisser le véhicule branché toute la nuit, nous ne facturons rien. C\'est notre façon de promouvoir la mobilité électrique au Maroc.'
        },
        {
          question: 'Les véhicules électriques sont-ils adaptés aux jeunes conducteurs ?',
          answer: 'Absolument ! L\'ID.3 et l\'ID.4 sont accessibles dès 23 ans avec 2 ans de permis. La conduite électrique est même plus facile (pas de boîte de vitesses, réponse linéaire). Supplément jeune conducteur standard de 50 DH/jour applicable.'
        }
      ]
    },
    cta: {
      title: 'Essayez l\'Électrique à Casablanca',
      subtitle: 'Recharge gratuite • 0 DH de carburant • Conduite silencieuse',
      buttonText: 'Réserver Mon Véhicule Électrique',
      buttonLink: '/louer?city=Casablanca'
    },
    relatedServices: [
      { title: 'Location Longue Durée Casablanca', description: 'VW ID.3 et ID.4 en formule mensuelle avec recharge gratuite illimitée.', link: '/location-longue-duree-casablanca' },
      { title: 'Location Aéroport Casablanca', description: 'Récupération de véhicules électriques au terminal Mohammed V.', link: '/location-voiture-aeroport-casablanca' },
      { title: 'Location Jeune Conducteur Casablanca', description: 'Véhicules électriques accessibles aux jeunes conducteurs dès 23 ans.', link: '/location-jeune-conducteur-casablanca' }
    ],
    relatedPages: [
      { title: 'Location Casablanca', link: '/location-voiture-casablanca' }
    ]
  },
  {
    slug: 'location-van-famille-maroc',
    title: 'Location Van Famille Maroc',
    metaTitle: 'Location van familial Maroc | Benatna – Loueurs locaux',
    metaDescription: 'Louez un van familial 7-9 places au Maroc. Mercedes Vito, VW Multivan. Road trip en famille. Dès 600 DH/jour.',
    keywords: 'location van maroc, minibus 9 places, location familiale maroc',
    h1: 'Location Van et Minibus Familial au Maroc',
    heroSubtitle: '7-9 places • Coffre XXL • Clim arrière',
    category: {
      label: "Véhicules Familiaux",
      href: "/nos-services?category=famille"
    },
    content: {
      intro: 'Famille nombreuse, groupe d\'amis ou équipe professionnelle ? Louez notre van Mercedes Vito ou Volkswagen Multivan pour voyager tous ensemble dans le confort. 7-9 places assises véritables avec ceintures, climatisation avant/arrière indépendante, coffre géant pour tous les bagages et équipements. Parfait pour road trips familiaux Atlas, Merzouga ou côte Atlantique, mais aussi pour navettes aéroport, séminaires d\'entreprise ou événements familiaux. Conduite facile malgré la taille grâce au gabarit raisonnable (similaire à un gros SUV) et aux aides à la conduite modernes.',
      sections: [
        {
          title: 'Pourquoi Louer un Van Familial au Maroc ?',
          content: 'Le Maroc est une destination idéale pour les voyages en groupe. Entre les médinas fascinantes, les montagnes de l\'Atlas, le désert de Merzouga et les plages atlantiques, les distances peuvent être importantes. Voyager à 6-9 personnes dans 2-3 voitures séparées pose de nombreux problèmes : coût multiplié, coordination difficile, séparation du groupe, ambiance de road trip perdue. Avec un van familial, tout le monde voyage ensemble, partage les découvertes en temps réel, joue aux cartes pendant les longs trajets, et crée des souvenirs communs inoubliables. Économiquement, le van est imbattable : 600 DH/jour pour 9 personnes = 67 DH/personne/jour, moins cher que les transports en commun ! Vous économisez également sur l\'essence (un seul véhicule), le stationnement, les péages. Et vous gagnez une flexibilité totale : pas de contraintes d\'horaires de bus, possibilité de s\'arrêter où vous voulez, itinéraires personnalisés. Pour les familles avec enfants, le van offre l\'espace nécessaire pour les poussettes, sièges auto, jouets et bagages sans compromis sur le confort.'
        },
        {
          title: 'Vans Familiaux Disponibles',
          content: 'Mercedes Vito Tourer (600 DH/jour) : Van 9 places configuration « long », sièges face route avec ceintures 3 points, climatisation bi-zone puissante, vitres teintées arrière, coffre 1200L (configuration 9 places) à 4000L (sièges rabattus). Moteur diesel 150ch économique, consommation 7-8L/100km. Fiable et robuste pour routes marocaines. Guidage GPS intégré. Volkswagen Multivan (750 DH/jour) : Van premium 7 places « business », sièges cuir pivotants 180°, table centrale amovible, stores électriques latéraux, éclairage d\'ambiance. Coffre 700L + rangements malins partout. Moteur essence ou diesel 204ch, conduite silencieuse type berline. Pour familles exigeantes ou voyages d\'affaires. Équipements inclus dans tous nos vans : GPS grand écran 9 pouces avec cartographie Maroc, sièges bébé et rehausseurs (gratuits sur réservation, précisez âges enfants), porte-vélos attelage ou coffre de toit XXL (50 DH/jour), glacière 12V (25L), prises USB arrière pour recharger tous les appareils, couvertures pique-nique. Option chauffeur : 350 DH/jour pour profiter pleinement du voyage sans conduire.'
        },
        {
          title: 'Itinéraires Road Trip Famille au Maroc',
          content: 'Circuit Impérial (7-10 jours) : Casablanca → Rabat → Meknès → Fès → Marrakech. 800 km au total. Découverte des 4 villes impériales, médinas UNESCO, palais et jardins. Étapes 150-200 km/jour adaptées aux enfants. Hébergements riads familiaux. Le Vito 9 places est parfait pour ce circuit. Circuit Grand Sud (10-14 jours) : Marrakech → Ouarzazate → Gorges du Dadès → Merzouga (désert) → Agadir → Essaouira → retour Marrakech. 1200 km. Kasbahs, désert, oasis, plages. Prévoir 3-4h de route max par jour pour le confort des enfants. Le Multivan avec sièges pivotants permet aux enfants de jouer pendant les trajets. Circuit Côte Atlantique (5-7 jours) : Casablanca → El Jadida → Essaouira → Agadir → retour. 600 km. Plages, surf, ports de pêche, détente balnéaire. Idéal familles avec ados qui surfent. Prévoir planches sur le toit (rack fourni). Circuit Express Weekend (3 jours) : Marrakech → Atlas (Ourika) → Essaouira → Marrakech. 400 km. Montagne + mer en un weekend. Parfait pour découvrir le Maroc en famille sur court séjour.'
        },
        {
          title: 'Comment Louer un Van Familial avec Benatna ?',
          content: 'Étape 1 : Contactez-nous par WhatsApp ou formulaire en précisant le nombre de passagers, les âges des enfants (pour sièges adaptés), vos dates et itinéraire prévu. Nous vous conseillons le véhicule idéal. Étape 2 : Validation de la réservation avec versement d\'acompte 30% (remboursable si annulation 7 jours avant). Solde le jour de la prise en charge. Paiement carte, virement ou espèces. Étape 3 : Livraison du van à votre hôtel, aéroport ou adresse. Notre agent installe les sièges enfants, configure le GPS avec votre itinéraire, vous montre les commandes spécifiques (portes coulissantes électriques, clim arrière, rangements). Étape 4 : Pendant le road trip, notre assistance 24/7 reste joignable. En cas de crevaison ou problème, nous intervenons ou envoyons dépannage partenaire rapidement partout au Maroc. Étape 5 : Retour du van au point convenu (même endroit ou autre ville moyennant supplément inter-villes). Restitution rapide 10 minutes. Sièges enfants récupérés par nous. Conseil pro : réservez 3-4 semaines à l\'avance pour les vacances scolaires et l\'été (forte demande familles européennes).'
        }
      ],
      faq: [
        {
          question: 'Faut-il un permis spécial pour conduire un van 9 places ?',
          answer: 'Non ! Nos vans Mercedes Vito et VW Multivan sont homologués « transport de personnes jusqu\'à 9 places ». Un simple permis B français, marocain ou international suffit. Aucune formation spéciale requise.'
        },
        {
          question: 'Les sièges bébé et rehausseurs sont-ils inclus ?',
          answer: 'Oui, gratuits ! Précisez les âges des enfants lors de la réservation (0-9 mois = coque, 9 mois-4 ans = siège, 4-10 ans = rehausseur). Nous installons les sièges aux normes avant votre arrivée.'
        },
        {
          question: 'Le van est-il adapté pour les routes de montagne (Atlas) ?',
          answer: 'Absolument. Nos vans ont des moteurs puissants (150-204ch) qui grimpent les cols sans effort. La garde au sol est suffisante pour les routes goudronnées de l\'Atlas (Tizi n\'Tichka, Ourika). Pour les pistes, nous recommandons notre SUV 4x4.'
        },
        {
          question: 'Peut-on dormir dans le van ?',
          answer: 'Le Multivan peut être configuré en couchage 2 adultes (banquette arrière dépliable). Ce n\'est pas un camping-car mais ça dépanne pour une nuit en bivouac. Nous fournissons couvertures sur demande. Le Vito standard n\'a pas cette option.'
        }
      ]
    },
    cta: {
      title: 'Réservez Votre Van Familial au Maroc',
      subtitle: '7-9 places • Sièges enfants gratuits • GPS inclus',
      buttonText: 'Demander un Devis Famille',
      buttonLink: '/contact'
    },
    relatedServices: [
      { title: 'Location SUV Atlas', description: 'Alternative SUV 5-7 places pour familles en montagne.', link: '/location-suv-atlas' },
      { title: 'Location Utilitaire Casablanca', description: 'Mercedes Sprinter pour transports volumineux.', link: '/location-utilitaire-demenagement-casablanca' },
      { title: 'Location Longue Durée Casablanca', description: 'Vans en formule mensuelle pour familles expatriées.', link: '/location-longue-duree-casablanca' }
    ],
    relatedPages: [
      { title: 'Location Casablanca', link: '/location-voiture-casablanca' },
      { title: 'Location Marrakech', link: '/location-voiture-marrakech' }
    ]
  },
  {
    slug: 'location-cabriolet-agadir',
    title: 'Location Cabriolet Agadir',
    metaTitle: 'Location cabriolet Agadir | Benatna – Loueurs locaux',
    metaDescription: 'Louez un cabriolet à Agadir. BMW Z4, Audi A5 Cabrio. Profitez du soleil et de la côte atlantique. Dès 700 DH/jour.',
    keywords: 'location cabriolet agadir, location decapotable maroc, bmw z4 agadir',
    h1: 'Location de Cabriolet à Agadir',
    heroSubtitle: 'BMW Z4 • Audi A5 Cabrio • Soleil d\'Agadir',
    category: {
      label: "Véhicules Premium",
      href: "/nos-services?category=premium"
    },
    content: {
      intro: '300 jours de soleil par an à Agadir = conditions parfaites pour rouler cheveux au vent ! Benatna vous propose des cabriolets sportifs (BMW Z4, Audi A5 Cabrio) pour profiter pleinement de la corniche, des plages et de la route côtière vers Essaouira. Conduite plaisir garantie avec le bruit de l\'océan, le soleil sur le visage et la capote ouverte. Que ce soit pour un weekend romantique, une lune de miel, un anniversaire ou simplement pour le plaisir de conduire, nos cabriolets transforment chaque kilomètre en moment d\'exception.',
      sections: [
        {
          title: 'Pourquoi Louer un Cabriolet à Agadir ?',
          content: 'Agadir bénéficie du climat le plus doux du Maroc : 300 jours de soleil, températures douces toute l\'année (18-28°C), vent océanique rafraîchissant. C\'est l\'endroit rêvé pour profiter d\'un cabriolet ! La route côtière entre Agadir et Essaouira (180 km) est considérée comme l\'une des plus belles du Maroc : falaises ocres, plages désertes, villages de pêcheurs, arganiers. Capote ouverte, vous ressentez pleinement cette nature sauvage. La corniche d\'Agadir offre également un cadre idéal pour les balades en décapotable : 6 km de front de mer, restaurants, clubs, couchers de soleil sur l\'Atlantique. Et pour les occasions spéciales (demande en mariage, anniversaire, lune de miel), arriver en BMW Z4 ou Audi A5 Cabrio fait toute la différence. C\'est l\'expérience de conduite ultime sous le soleil marocain.'
        },
        {
          title: 'Cabriolets Disponibles',
          content: 'BMW Z4 (700 DH/jour) : Roadster 2 places pur plaisir de conduire. Moteur 6 cylindres 260ch, 0-100 km/h en 5.4 secondes. Capote rigide électrique (10 secondes), sono Harman Kardon premium, sièges sport chauffants. Coffre 280L (suffisant pour weekend). Design iconique. Pour couples en quête de sensations. Audi A5 Cabriolet (750 DH/jour) : Cabriolet 4 vraies places adultes. Moteur TFSI 252ch, transmission Quattro intégrale (sécurité sur routes humides). Capote toile acoustique (silence à 130 km/h), éclairage Matrix LED, Virtual Cockpit digital. Coffre 380L. Polyvalent et élégant, idéal couples avec enfants ou groupe d\'amis. Équipements inclus : GPS intégré avec Points d\'Intérêt Agadir, lunettes de soleil offertes, crème solaire indice 50, tapis coffre protection sable, chargeur USB, plein d\'essence au départ.'
        },
        {
          title: 'Itinéraires Cabriolet depuis Agadir',
          content: 'Route côtière Agadir-Essaouira (180 km, 3h avec arrêts) : Départ tôt le matin, capote ouverte. Arrêt Taghazout (café surfeurs), Tamri (bananes et surf), Cap Ghir (phare panoramique), arrivée Essaouira déjeuner. Retour fin d\'après-midi coucher de soleil. Circuit légendaire. Corniche sunset (20 km, 1h) : Balade en fin d\'après-midi le long de la corniche d\'Agadir. Arrêt Marina, vue sur Kasbah, coucher de soleil depuis restaurant panoramique. Romantique et accessible. Paradise Valley express (70 km, 2h) : Route vers les gorges et piscines naturelles. Attention : derniers km piste non goudronnée, à éviter avec cabriolet (préférer SUV). Mais la route jusqu\'à Immouzer est magnifique en décapotable. Tiznit et portes du désert (180 km, 4h) : Découverte ville fortifiée, bijouterie traditionnelle, début de l\'Anti-Atlas. Routes larges et peu fréquentées, parfaites pour rouler cheveux au vent.'
        },
        {
          title: 'Conseils Conduite Cabriolet à Agadir',
          content: 'Protection solaire : Le soleil marocain est puissant. Crème indice 50 fournie, mais portez chapeau/casquette et lunettes. Hydratez-vous régulièrement. Meilleur moment : tôt le matin (lumière magique, fraîcheur) ou fin d\'après-midi (golden hour, températures douces). Évitez 12h-16h en été (trop chaud même avec vent). Vent : Les jours de Chergui (vent de sable venant du Sahara), gardez la capote fermée. Climatisation efficace dans nos modèles. Sable : Ne laissez pas le cabriolet capote ouverte stationné près des plages (sable s\'infiltre partout). Fermez la capote même pour courte pause. Nous fournissons tapis coffre protection sable. Sécurité : Ne laissez jamais objets de valeur visibles dans habitacle (même capote fermée). Utilisez coffre verrouillé. Parkings surveillés recommandés (10-20 DH).'
        }
      ],
      faq: [
        {
          question: 'La capote se ferme-t-elle facilement en cas de pluie soudaine ?',
          answer: 'Oui ! Sur BMW Z4 (capote rigide) et Audi A5 (capote toile), la fermeture est 100% électrique et prend 10-15 secondes. Vous pouvez même la fermer à l\'arrêt au feu rouge si besoin. Étanchéité parfaite.'
        },
        {
          question: 'Puis-je emmener le cabriolet jusqu\'à Marrakech ?',
          answer: 'Absolument ! Agadir-Marrakech = 260 km, route excellente. Kilométrage illimité inclus. Seule précaution : route de montagne (col Tizi n\'Test) en hiver peut être froide, prévoyez veste.'
        },
        {
          question: 'Le cabriolet est-il adapté aux jeunes conducteurs ?',
          answer: 'Nos cabriolets sont réservés aux conducteurs de 25 ans minimum avec 3 ans de permis (véhicules puissants). Caution majorée à 8000 DH. Assurance tous risques incluse avec franchise 5000 DH.'
        }
      ]
    },
    cta: {
      title: 'Louez Votre Cabriolet à Agadir',
      subtitle: 'Soleil • Liberté • Sensations',
      buttonText: 'Réserver Mon Cabriolet',
      buttonLink: '/louer?city=Agadir'
    },
    relatedServices: [
      { title: 'Location Voiture Luxe Événement', description: 'Mercedes, BMW pour occasions spéciales avec chauffeur.', link: '/location-voiture-luxe-evenement' },
      { title: 'Location Aéroport Agadir', description: 'Récupérez votre cabriolet dès l\'atterrissage à Al Massira.', link: '/location-voiture-aeroport-agadir' }
    ],
    relatedPages: [
      { title: 'Location Agadir', link: '/location-voiture-agadir' }
    ]
  },
  {
    slug: 'location-utilitaire-demenagement-casablanca',
    title: 'Location Utilitaire Casablanca',
    metaTitle: 'Location utilitaire Casablanca | Benatna – Loueurs locaux',
    metaDescription: 'Louez un utilitaire pour déménagement à Casablanca. Véhicules 10-20m³ avec hayon. Permis B suffit. Dès 400 DH/jour.',
    keywords: 'location utilitaire casablanca, camion demenagement casa, location camionnette',
    h1: 'Location Utilitaire et Camion Déménagement Casablanca',
    heroSubtitle: '10-20m³ • Hayon élévateur • Couvertures fournies',
    category: {
      label: "Véhicules Utilitaires",
      href: "/nos-services?category=utilitaire"
    },
    content: {
      intro: 'Déménagement, transport de meubles, gros achats ou livraisons professionnelles ? Louez notre utilitaire ou camion à Casablanca. Véhicules 10m³ à 20m³ avec hayon élévateur, idéal pour chargement/déchargement sans effort et sans risque de blessure. Couvertures de protection et sangles d\'arrimage fournies gratuitement. Permis B suffit pour tous nos modèles (pas besoin permis poids lourd). Que vous déménagiez un studio, un appartement T4 ou une villa entière, nous avons le véhicule adapté à vos besoins.',
      sections: [
        {
          title: 'Pourquoi Louer un Utilitaire avec Benatna ?',
          content: 'Déménager à Casablanca peut vite devenir un casse-tête : circulation dense, stationnement limité, escaliers sans ascenseur dans les anciens immeubles. Nos utilitaires sont sélectionnés pour s\'adapter au contexte casablancais : gabarit urbain (passent dans les ruelles du centre-ville), hayon élévateur (indispensable pour meubles lourds sans se casser le dos), motorisation diesel économique. Contrairement aux déménageurs professionnels qui facturent 3000-5000 DH minimum, vous économisez jusqu\'à 80% en louant vous-même : 400 DH le Ducato + quelques amis motivés = déménagement réussi ! Nous fournissons tout l\'équipement : couvertures matelassées pour protéger vos meubles, sangles d\'arrimage professionnelles, diable si disponible. Vous n\'avez rien à acheter. Et si vous n\'avez jamais conduit d\'utilitaire, pas d\'inquiétude : nos véhicules sont modernes, avec direction assistée, caméra de recul et radar de stationnement. Conduite similaire à un gros monospace.'
        },
        {
          title: 'Utilitaires et Camions Disponibles',
          content: 'Fiat Ducato 10m³ (400 DH/jour) : Fourgon L2H2 compact, charge utile 1200 kg, largeur portes arrière 1.42m (un canapé 3 places passe), hauteur intérieure 1.90m. Permis B. Idéal studio ou petit appartement T2. Facile à garer, passe partout. Mercedes Sprinter 15m³ (500 DH/jour) : Fourgon L3H2 polyvalent, charge utile 1500 kg, hayon élévateur 500 kg inclus, hauteur intérieure 2.10m (armoires debout). Permis B. Volume optimal pour T3-T4 standard. Le plus demandé. Iveco Daily 20m³ (650 DH/jour) : Grand fourgon L4H3, charge utile 2000 kg, hayon élévateur 750 kg, hauteur intérieure 2.40m. Permis B. Déménage villa entière ou gros volumes professionnels. Puissant et robuste. Équipements inclus dans tous nos utilitaires : 10 couvertures matelassées épaisses (protection meubles bois, électroménager), 20 sangles d\'arrimage à cliquet (sécurisation charge), diable professionnel (si disponible, sur réservation), rampe ou hayon selon modèle, assurance marchandise transportée jusqu\'à 30 000 DH.'
        },
        {
          title: 'Comment Organiser Votre Déménagement ?',
          content: 'J-7 : Réservez votre utilitaire Benatna (surtout fin de mois, forte demande). Précisez volume à déménager pour conseil sur taille véhicule. Commencez à faire vos cartons. J-1 : Récupérez le véhicule en fin de journée (tarif identique, profitez de la soirée pour premier chargement tranquille). Vérifiez équipement fourni (couvertures, sangles). Protégez les meubles fragiles avec les couvertures. Jour J : Chargement stratégique : meubles lourds au fond près de la cabine (meilleure répartition du poids), cartons au-dessus, objets fragiles en dernier. Sanglez tout ! Route vers nouvelle adresse. Déchargement dans l\'ordre inverse. J+1 matin : Retour du véhicule propre (balayé sommairement). Restitution équipement. Caution débloquée sous 7 jours. Conseil pro : commencez tôt le matin (6h-7h) pour éviter la circulation casablancaise et la chaleur. Prévoyez eau et snacks pour les porteurs. Stationnement temporaire en double file toléré le temps du chargement (mettez les warnings).'
        },
        {
          title: 'Tarifs et Conditions de Location',
          content: 'Tarifs journée (24h) : Ducato 10m³ = 400 DH, Sprinter 15m³ = 500 DH, Daily 20m³ = 650 DH. Kilométrage : 200 km/jour inclus (largement suffisant pour déménagement intra-Casablanca), km supplémentaire = 2 DH/km. Tarifs weekend (vendredi 18h → lundi 9h) : 2 jours facturés pour 3 jours d\'utilisation. Idéal pour déménagements tranquilles. Tarifs semaine (7 jours) : -20% sur tarif journalier. Pour déménagements inter-villes ou gros chantiers. Caution : 2000 DH (Ducato), 3000 DH (Sprinter/Daily), bloquée sur carte ou espèces, restituée 7 jours après retour si pas de dommage. Carburant : véhicule fourni plein, à rendre plein (gasoil ~11 DH/L, consommation 10-12 L/100km). Conducteur : âge minimum 23 ans, permis B depuis 2 ans minimum. Documents : CIN/passeport + permis + justificatif domicile.'
        }
      ],
      faq: [
        {
          question: 'Puis-je conduire l\'utilitaire 20m³ avec un permis B ?',
          answer: 'Oui ! Tous nos utilitaires sont homologués PTAC < 3.5 tonnes, donc accessibles avec un simple permis B. Pas besoin de permis poids lourd (C) même pour le Daily 20m³.'
        },
        {
          question: 'Le hayon élévateur est-il inclus dans le prix ?',
          answer: 'Oui, le hayon est inclus sur le Sprinter 15m³ et le Daily 20m³ sans supplément. Le Ducato 10m³ dispose d\'une rampe de chargement. Capacité hayon : 500-750 kg selon modèle.'
        },
        {
          question: 'Que se passe-t-il si j\'abîme un meuble pendant le transport ?',
          answer: 'Notre assurance marchandise transportée couvre les dommages jusqu\'à 30 000 DH. Pour les objets de valeur (œuvres d\'art, antiquités), déclarez-les à la réservation pour couverture adaptée. Les couvertures fournies minimisent les risques de chocs.'
        },
        {
          question: 'Puis-je garder l\'utilitaire plusieurs jours pour un déménagement inter-villes ?',
          answer: 'Oui, tarif semaine disponible (-20%). Casablanca → Marrakech ou Rabat, pas de problème. Précisez l\'itinéraire pour adapter le kilométrage inclus. Supplément one-way (aller simple) possible sur demande.'
        }
      ]
    },
    cta: {
      title: 'Réservez Votre Utilitaire Déménagement',
      subtitle: 'Permis B suffit • Hayon inclus • Équipement fourni',
      buttonText: 'Réserver Mon Utilitaire',
      buttonLink: '/contact'
    },
    relatedServices: [
      { title: 'Location Van Familial 7-9 Places', description: 'Alternative pour petits déménagements ou transports légers.', link: '/location-van-famille-maroc' },
      { title: 'Location Longue Durée Casablanca', description: 'Utilitaires en formule mensuelle pour professionnels.', link: '/location-longue-duree-casablanca' }
    ],
    relatedPages: [
      { title: 'Location Casablanca', link: '/location-voiture-casablanca' }
    ]
  }
];
