export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: 'assurance' | 'contrat' | 'vehicule' | 'conduite' | 'financier' | 'reglementation';
  relatedTerms?: string[];
  relatedPages?: { label: string; url: string }[];
}

export const glossaryTerms: GlossaryTerm[] = [
  // ASSURANCE
  {
    id: 'assurance-tous-risques',
    term: 'Assurance Tous Risques',
    definition: "Assurance automobile la plus complète qui couvre tous les dommages au véhicule loué, même en cas de responsabilité du locataire. Recommandée pour une tranquillité d'esprit maximale au Maroc.",
    category: 'assurance',
    relatedTerms: ['franchise', 'responsabilite-civile', 'rachat-franchise'],
    relatedPages: [{ label: 'Nos Services', url: '/nos-services' }]
  },
  {
    id: 'franchise',
    term: 'Franchise',
    definition: "Montant qui reste à la charge du locataire en cas de sinistre ou de vol, même avec une assurance. Au Maroc, la franchise standard varie généralement entre 3000 et 8000 DH selon le véhicule.",
    category: 'assurance',
    relatedTerms: ['rachat-franchise', 'assurance-tous-risques', 'caution'],
  },
  {
    id: 'rachat-franchise',
    term: 'Rachat de Franchise',
    definition: "Option permettant de réduire ou supprimer totalement la franchise en cas de sinistre moyennant un supplément journalier (généralement 50-150 DH/jour).",
    category: 'assurance',
    relatedTerms: ['franchise', 'assurance-tous-risques'],
  },
  {
    id: 'responsabilite-civile',
    term: 'Responsabilité Civile',
    definition: "Assurance obligatoire au Maroc qui couvre les dommages causés à des tiers (personnes ou biens). Incluse systématiquement dans toute location de véhicule.",
    category: 'assurance',
    relatedTerms: ['assurance-tous-risques'],
  },
  {
    id: 'protection-personnelle',
    term: 'Protection Personnelle du Conducteur',
    definition: "Assurance couvrant les blessures corporelles du conducteur et des passagers en cas d'accident. Souvent proposée en option au Maroc.",
    category: 'assurance',
    relatedTerms: ['assurance-tous-risques', 'responsabilite-civile'],
  },

  // CONTRAT
  {
    id: 'caution',
    term: 'Caution (Dépôt de Garantie)',
    definition: "Somme bloquée sur carte bancaire lors de la prise du véhicule (généralement 3000-10000 DH au Maroc). Restituée au retour si le véhicule est en bon état.",
    category: 'contrat',
    relatedTerms: ['franchise', 'etat-lieux'],
  },
  {
    id: 'etat-lieux',
    term: 'État des Lieux',
    definition: "Inspection détaillée du véhicule à la prise en charge et au retour, documentant tous dommages existants. Essentiel pour éviter les litiges au Maroc.",
    category: 'contrat',
    relatedTerms: ['caution', 'constat-amiable'],
  },
  {
    id: 'conducteur-additionnel',
    term: 'Conducteur Additionnel',
    definition: "Personne supplémentaire autorisée à conduire le véhicule loué moyennant un supplément (environ 50-100 DH/jour au Maroc). Doit présenter un permis valide.",
    category: 'contrat',
    relatedTerms: ['permis-conduire', 'age-minimum'],
  },
  {
    id: 'duree-location',
    term: 'Durée de Location',
    definition: "Période contractuelle de mise à disposition du véhicule. Au Maroc, des tarifs dégressifs s'appliquent généralement à partir de 7 jours (longue durée).",
    category: 'contrat',
    relatedTerms: ['location-longue-duree', 'tarif-journalier'],
    relatedPages: [{ label: 'Location Longue Durée', url: '/location-longue-duree-casablanca' }]
  },
  {
    id: 'prolongation',
    term: 'Prolongation de Location',
    definition: "Extension de la période de location initiale. Doit être demandée avant la date de retour prévue pour éviter des frais supplémentaires importants.",
    category: 'contrat',
    relatedTerms: ['duree-location', 'retard-restitution'],
  },
  {
    id: 'retard-restitution',
    term: 'Retard de Restitution',
    definition: "Restitution du véhicule après l'heure prévue. Une franchise d'1 heure est généralement tolérée au Maroc, au-delà une journée supplémentaire peut être facturée.",
    category: 'contrat',
    relatedTerms: ['prolongation', 'duree-location'],
  },
  {
    id: 'livraison-vehicule',
    term: 'Livraison du Véhicule',
    definition: "Service de remise du véhicule à une adresse spécifiée (hôtel, aéroport, domicile). Gratuit dans certaines zones au Maroc, payant selon la distance pour d'autres.",
    category: 'contrat',
    relatedTerms: ['location-aeroport', 'point-rendez-vous'],
    relatedPages: [
      { label: 'Aéroport Casablanca', url: '/location-aeroport-casablanca' },
      { label: 'Aéroport Marrakech', url: '/location-aeroport-marrakech' }
    ]
  },
  {
    id: 'point-rendez-vous',
    term: 'Point de Rendez-vous',
    definition: "Lieu convenu pour la remise et la restitution du véhicule (agence, aéroport, gare, hôtel). Benatna propose plusieurs points à Casablanca, Marrakech, Rabat, etc.",
    category: 'contrat',
    relatedTerms: ['livraison-vehicule', 'location-aeroport'],
  },

  // VÉHICULE
  {
    id: 'categorie-vehicule',
    term: 'Catégorie de Véhicule',
    definition: "Classification des voitures par taille et standing : Économique, Compacte, Berline, SUV, 4x4, Luxe. Chaque catégorie correspond à des besoins et budgets différents au Maroc.",
    category: 'vehicule',
    relatedTerms: ['suv', '4x4', 'berline'],
    relatedPages: [
      { label: 'Location SUV', url: '/location-suv-sud-maroc' },
      { label: 'Location 4x4 Désert', url: '/location-4x4-desert' }
    ]
  },
  {
    id: 'kilometrage-illimite',
    term: 'Kilométrage Illimité',
    definition: "Formule permettant de rouler sans limitation de distance. Standard chez Benatna pour toutes les locations au Maroc, idéal pour les circuits et road trips.",
    category: 'vehicule',
    relatedTerms: ['kilometrage-limite', 'carburant'],
  },
  {
    id: 'kilometrage-limite',
    term: 'Kilométrage Limité',
    definition: "Formule où un quota de kilomètres est fixé (ex: 200 km/jour), avec facturation des km supplémentaires. Peu courante au Maroc mais existe pour certaines voitures de luxe.",
    category: 'vehicule',
    relatedTerms: ['kilometrage-illimite'],
  },
  {
    id: 'carburant',
    term: 'Politique de Carburant',
    definition: "Règle de gestion du carburant : 'Plein à Plein' (standard au Maroc) signifie prendre et rendre le véhicule avec le plein. Le locataire paie son carburant.",
    category: 'vehicule',
    relatedTerms: ['kilometrage-illimite'],
  },
  {
    id: 'boite-automatique',
    term: 'Boîte Automatique',
    definition: "Transmission automatique facilitant la conduite, particulièrement appréciée dans les embouteillages de Casablanca. Généralement 10-20% plus chère que la boîte manuelle au Maroc.",
    category: 'vehicule',
    relatedTerms: ['boite-manuelle', 'categorie-vehicule'],
  },
  {
    id: 'boite-manuelle',
    term: 'Boîte Manuelle',
    definition: "Transmission manuelle, standard sur la majorité des véhicules de location au Maroc. Plus économique et largement disponible.",
    category: 'vehicule',
    relatedTerms: ['boite-automatique'],
  },
  {
    id: 'climatisation',
    term: 'Climatisation',
    definition: "Équipement essentiel au Maroc en été (température jusqu'à 45°C). Incluse de série sur tous les véhicules Benatna.",
    category: 'vehicule',
    relatedTerms: ['gps', 'siege-enfant'],
  },
  {
    id: 'gps',
    term: 'GPS (Système de Navigation)',
    definition: "Dispositif de navigation par satellite. Disponible en option chez Benatna (environ 50 DH/jour) ou utilisez votre smartphone avec Google Maps.",
    category: 'vehicule',
    relatedTerms: ['climatisation', 'siege-enfant'],
  },
  {
    id: 'siege-enfant',
    term: 'Siège Enfant',
    definition: "Équipement obligatoire pour les enfants de moins de 10 ans au Maroc. Disponible en location (environ 30-50 DH/jour). Réservation recommandée.",
    category: 'vehicule',
    relatedTerms: ['gps', 'conducteur-additionnel'],
  },
  {
    id: 'suv',
    term: 'SUV (Sport Utility Vehicle)',
    definition: "Véhicule spacieux et surélevé, idéal pour les familles et les routes marocaines. Combine confort urbain et capacités routières (ex: Dacia Duster, Peugeot 3008).",
    category: 'vehicule',
    relatedTerms: ['4x4', 'categorie-vehicule'],
    relatedPages: [{ label: 'Location SUV', url: '/location-suv-sud-maroc' }]
  },
  {
    id: '4x4',
    term: '4x4 (Quatre Roues Motrices)',
    definition: "Véhicule tout-terrain avec transmission intégrale, indispensable pour le désert marocain et les pistes de montagne. Plus robuste qu'un SUV standard.",
    category: 'vehicule',
    relatedTerms: ['suv', 'categorie-vehicule'],
    relatedPages: [{ label: 'Location 4x4 Désert', url: '/location-4x4-desert' }]
  },
  {
    id: 'berline',
    term: 'Berline',
    definition: "Voiture à 4 portes avec coffre séparé, offrant confort et espace pour 4-5 passagers. Idéale pour déplacements professionnels et trajets longue distance au Maroc.",
    category: 'vehicule',
    relatedTerms: ['categorie-vehicule', 'voiture-economique'],
  },
  {
    id: 'voiture-economique',
    term: 'Voiture Économique',
    definition: "Véhicule compact à faible consommation, parfait pour la ville (ex: Dacia Sandero, Renault Clio). Tarif dès 200 DH/jour au Maroc.",
    category: 'vehicule',
    relatedTerms: ['categorie-vehicule', 'berline'],
    relatedPages: [{ label: 'Louer une voiture', url: '/louer' }]
  },
  {
    id: 'voiture-electrique',
    term: 'Voiture Électrique',
    definition: "Véhicule à moteur électrique rechargeable. Disponibilité croissante au Maroc (ex: Dacia Spring, VW ID.3) avec bornes de recharge à Casablanca, Rabat, Marrakech.",
    category: 'vehicule',
    relatedTerms: ['voiture-hybride', 'borne-recharge'],
    relatedPages: [{ label: 'Location Électrique Casablanca', url: '/location-electrique-casablanca' }]
  },
  {
    id: 'voiture-hybride',
    term: 'Voiture Hybride',
    definition: "Véhicule combinant moteur thermique et électrique pour réduire la consommation. Alternative écologique au Maroc avec autonomie longue distance.",
    category: 'vehicule',
    relatedTerms: ['voiture-electrique', 'carburant'],
  },
  {
    id: 'borne-recharge',
    term: 'Borne de Recharge',
    definition: "Station de recharge pour véhicules électriques. Réseau en développement au Maroc, surtout dans les grandes villes et axes autoroutiers principaux.",
    category: 'vehicule',
    relatedTerms: ['voiture-electrique'],
  },

  // CONDUITE
  {
    id: 'permis-conduire',
    term: 'Permis de Conduire',
    definition: "Document officiel obligatoire pour louer et conduire au Maroc. Les permis français, européens et internationaux sont acceptés. Validité minimum 1 an requise.",
    category: 'conduite',
    relatedTerms: ['age-minimum', 'permis-international', 'conducteur-additionnel'],
  },
  {
    id: 'permis-international',
    term: 'Permis de Conduire International',
    definition: "Traduction officielle du permis national. Recommandé mais non obligatoire pour les touristes au Maroc si le permis est en alphabet latin (français, espagnol).",
    category: 'conduite',
    relatedTerms: ['permis-conduire'],
  },
  {
    id: 'age-minimum',
    term: 'Âge Minimum de Location',
    definition: "Âge requis pour louer un véhicule au Maroc : généralement 21 ans (23-25 ans pour SUV/luxe). Les -25 ans peuvent avoir un supplément jeune conducteur.",
    category: 'conduite',
    relatedTerms: ['permis-conduire', 'jeune-conducteur'],
    relatedPages: [{ label: 'Jeune Conducteur Casablanca', url: '/location-jeune-conducteur-casablanca' }]
  },
  {
    id: 'jeune-conducteur',
    term: 'Jeune Conducteur',
    definition: "Conducteur de moins de 25 ans. Peut être soumis à un supplément (environ 50-100 DH/jour) et restrictions sur certaines catégories de véhicules au Maroc.",
    category: 'conduite',
    relatedTerms: ['age-minimum', 'permis-conduire'],
    relatedPages: [
      { label: 'Jeune Conducteur Marrakech', url: '/location-jeune-conducteur-marrakech' },
      { label: 'Jeune Conducteur Rabat', url: '/location-jeune-conducteur-rabat' }
    ]
  },
  {
    id: 'constat-amiable',
    term: 'Constat Amiable',
    definition: "Document à remplir en cas d'accident avec un tiers au Maroc. Essentiel pour déclaration d'assurance. Fourni dans le véhicule, à remettre immédiatement à l'agence.",
    category: 'conduite',
    relatedTerms: ['assurance-tous-risques', 'etat-lieux'],
  },
  {
    id: 'peage-autoroute',
    term: 'Péage Autoroutier',
    definition: "Taxe pour utilisation des autoroutes au Maroc. Tarif modéré (ex: Casa-Marrakech ~80 DH). À la charge du locataire, paiement en espèces ou Jawaz (télépéage).",
    category: 'conduite',
    relatedTerms: ['carte-jawaz'],
  },
  {
    id: 'carte-jawaz',
    term: 'Carte Jawaz',
    definition: "Système de télépéage marocain permettant un passage rapide aux péages autoroutiers. Disponible en option chez certains loueurs.",
    category: 'conduite',
    relatedTerms: ['peage-autoroute'],
  },
  {
    id: 'franchise-kilometrique',
    term: 'Franchise Kilométrique',
    definition: "Nombre de kilomètres inclus par jour dans le tarif de base. Chez Benatna: kilométrage illimité sur toutes les locations au Maroc.",
    category: 'conduite',
    relatedTerms: ['kilometrage-illimite', 'kilometrage-limite'],
  },

  // FINANCIER
  {
    id: 'tarif-journalier',
    term: 'Tarif Journalier',
    definition: "Prix de location pour 24 heures. Varie selon le véhicule, la saison et la durée. Chez Benatna: dès 200 DH/jour pour une économique au Maroc.",
    category: 'financier',
    relatedTerms: ['tarif-longue-duree', 'tarif-weekend'],
    relatedPages: [{ label: 'Louer une voiture', url: '/louer' }]
  },
  {
    id: 'tarif-longue-duree',
    term: 'Tarif Longue Durée',
    definition: "Tarif dégressif pour locations de 7 jours ou plus au Maroc. Économies substantielles : jusqu'à -30% par rapport au tarif journalier standard.",
    category: 'financier',
    relatedTerms: ['tarif-journalier', 'location-longue-duree'],
    relatedPages: [
      { label: 'Location Longue Durée Casablanca', url: '/location-longue-duree-casablanca' },
      { label: 'Location Longue Durée Marrakech', url: '/location-longue-duree-marrakech' }
    ]
  },
  {
    id: 'tarif-weekend',
    term: 'Tarif Week-end',
    definition: "Forfait spécial pour locations de vendredi à lundi au Maroc. Généralement 15-20% moins cher que 3 jours au tarif journalier classique.",
    category: 'financier',
    relatedTerms: ['tarif-journalier'],
    relatedPages: [{ label: 'Location Week-end Marrakech', url: '/location-weekend-marrakech' }]
  },
  {
    id: 'frais-carburant',
    term: 'Frais de Carburant',
    definition: "Coût de l'essence ou diesel consommé. À la charge du locataire avec politique 'Plein à Plein'. Prix au Maroc: ~14 DH/L diesel, ~16 DH/L essence (2024).",
    category: 'financier',
    relatedTerms: ['carburant', 'kilometrage-illimite'],
  },
  {
    id: 'carte-bancaire',
    term: 'Carte Bancaire',
    definition: "Moyen de paiement requis pour la caution et souvent pour le règlement final. Visa/Mastercard acceptées. Doit être au nom du conducteur principal.",
    category: 'financier',
    relatedTerms: ['caution', 'paiement-especes'],
  },
  {
    id: 'paiement-especes',
    term: 'Paiement en Espèces',
    definition: "Règlement en dirhams marocains (MAD). Accepté chez Benatna pour le montant de la location, mais carte bancaire obligatoire pour la caution.",
    category: 'financier',
    relatedTerms: ['carte-bancaire', 'caution'],
  },
  {
    id: 'tva',
    term: 'TVA (Taxe sur la Valeur Ajoutée)',
    definition: "Taxe de 20% appliquée sur les services de location au Maroc. Généralement incluse dans les tarifs affichés chez Benatna (TTC).",
    category: 'financier',
    relatedTerms: ['tarif-journalier'],
  },
  {
    id: 'facture',
    term: 'Facture',
    definition: "Document comptable remis en fin de location détaillant tous les frais. Essentielle pour remboursement employeur ou déclaration fiscale professionnelle.",
    category: 'financier',
    relatedTerms: ['tva', 'recu'],
  },
  {
    id: 'recu',
    term: 'Reçu',
    definition: "Justificatif de paiement remis lors du règlement. Moins détaillé que la facture mais suffisant pour les locations personnelles.",
    category: 'financier',
    relatedTerms: ['facture', 'paiement-especes'],
  },

  // RÉGLEMENTATION
  {
    id: 'code-route-maroc',
    term: 'Code de la Route Marocain',
    definition: "Réglementation routière au Maroc : limitation 120 km/h autoroute, 100 km/h route, 60 km/h ville. Port ceinture obligatoire, alcool tolérance 0, téléphone interdit.",
    category: 'reglementation',
    relatedTerms: ['amende', 'radar'],
  },
  {
    id: 'amende',
    term: 'Amende',
    definition: "Sanction pécuniaire pour infraction routière. Le locataire est responsable des amendes reçues pendant la location. Montants: 300-1400 DH selon gravité au Maroc.",
    category: 'reglementation',
    relatedTerms: ['code-route-maroc', 'pv'],
  },
  {
    id: 'pv',
    term: 'PV (Procès-Verbal)',
    definition: "Constat d'infraction routière établi par la police. En cas de PV pendant la location, le locataire doit le régler et en informer l'agence Benatna.",
    category: 'reglementation',
    relatedTerms: ['amende', 'code-route-maroc'],
  },
  {
    id: 'radar',
    term: 'Radar Automatique',
    definition: "Dispositif de contrôle de vitesse. Nombreux radars fixes et mobiles au Maroc, surtout sur autoroutes. Amendes envoyées au loueur puis refacturées au locataire.",
    category: 'reglementation',
    relatedTerms: ['amende', 'code-route-maroc'],
  },
  {
    id: 'assurance-frontiere',
    term: 'Assurance Frontière',
    definition: "Extension d'assurance nécessaire pour sortir du Maroc (Espagne via ferry, Mauritanie, Algérie). Demande préalable obligatoire, généralement non autorisée pour locations standard.",
    category: 'reglementation',
    relatedTerms: ['responsabilite-civile'],
  },
  {
    id: 'location-aeroport',
    term: 'Location à l\'Aéroport',
    definition: "Service de mise à disposition du véhicule directement à l'arrivée aéroportuaire. Benatna dessert tous les aéroports majeurs du Maroc 24h/24.",
    category: 'reglementation',
    relatedTerms: ['livraison-vehicule', 'point-rendez-vous'],
    relatedPages: [
      { label: 'Aéroport Agadir', url: '/location-aeroport-agadir' },
      { label: 'Aéroport Fès', url: '/location-aeroport-fes' },
      { label: 'Aéroport Tanger', url: '/location-aeroport-tanger' },
      { label: 'Aéroport Rabat', url: '/location-aeroport-rabat' }
    ]
  },
  {
    id: 'location-longue-duree',
    term: 'Location Longue Durée (LLD)',
    definition: "Formule de location supérieure à 1 mois, souvent utilisée par entreprises et expatriés au Maroc. Tarifs très dégressifs avec services inclus (entretien, assurance).",
    category: 'contrat',
    relatedTerms: ['tarif-longue-duree', 'duree-location'],
    relatedPages: [
      { label: 'Longue Durée Casablanca', url: '/location-longue-duree-casablanca' },
      { label: 'Longue Durée Marrakech', url: '/location-longue-duree-marrakech' }
    ]
  },
  {
    id: 'location-sans-carte',
    term: 'Location sans Carte Bancaire',
    definition: "Service permettant de louer avec caution en espèces au lieu de carte. Montant supérieur requis. Disponible sur demande chez Benatna pour clients marocains.",
    category: 'contrat',
    relatedTerms: ['carte-bancaire', 'caution'],
    relatedPages: [
      { label: 'Sans Carte Casablanca', url: '/location-sans-carte-casablanca' },
      { label: 'Sans Carte Marrakech', url: '/location-sans-carte-marrakech' }
    ]
  },
  {
    id: 'reservation',
    term: 'Réservation',
    definition: "Acte de réserver un véhicule à l'avance. Recommandé en haute saison au Maroc (juillet-août, vacances). Réservation gratuite et flexible chez Benatna jusqu'à 24h avant.",
    category: 'contrat',
    relatedTerms: ['annulation', 'modification-reservation'],
  },
  {
    id: 'annulation',
    term: 'Annulation',
    definition: "Résiliation de la réservation avant la prise du véhicule. Chez Benatna: annulation gratuite jusqu'à 24h avant la location prévue.",
    category: 'contrat',
    relatedTerms: ['reservation', 'modification-reservation'],
  },
  {
    id: 'modification-reservation',
    term: 'Modification de Réservation',
    definition: "Changement des dates, heures ou véhicule réservé. Possible gratuitement chez Benatna jusqu'à 24h avant la prise en charge.",
    category: 'contrat',
    relatedTerms: ['reservation', 'annulation'],
  },
];

export const categories = [
  { id: 'assurance', label: 'Assurance', icon: 'shield' },
  { id: 'contrat', label: 'Contrat & Location', icon: 'file-text' },
  { id: 'vehicule', label: 'Véhicule & Équipements', icon: 'car' },
  { id: 'conduite', label: 'Conduite', icon: 'navigation' },
  { id: 'financier', label: 'Financier', icon: 'credit-card' },
  { id: 'reglementation', label: 'Réglementation', icon: 'book-open' },
] as const;
