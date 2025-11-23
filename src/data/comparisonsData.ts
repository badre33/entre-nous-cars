export interface ComparisonItem {
  name: string;
  image: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
  price?: string;
  specs?: Record<string, string>;
}

export interface Comparison {
  id: string;
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  category: 'vehicules' | 'services' | 'villes' | 'categories';
  introduction: string;
  item1: ComparisonItem;
  item2: ComparisonItem;
  verdict: {
    winner?: 'item1' | 'item2' | 'tie';
    summary: string;
    recommendation: string;
  };
  faq: Array<{
    question: string;
    answer: string;
  }>;
  relatedComparisons?: string[];
}

export const comparisons: Comparison[] = [
  // COMPARAISONS VÉHICULES
  {
    id: 'duster-vs-captur',
    title: 'Dacia Duster vs Renault Captur',
    slug: 'dacia-duster-vs-renault-captur-maroc',
    metaTitle: 'Dacia Duster vs Renault Captur - Comparatif Location Maroc 2024 | Benatna',
    metaDescription: 'Comparatif complet Dacia Duster vs Renault Captur pour location au Maroc : prix, espace, consommation, confort. Quel SUV choisir pour vos vacances ?',
    category: 'vehicules',
    introduction: 'Le Dacia Duster et le Renault Captur sont les deux SUV les plus loués au Maroc. Tous deux populaires, économiques et polyvalents, ils s\'adressent pourtant à des profils différents. Notre comparatif détaillé vous aide à choisir le SUV idéal selon vos besoins de location.',
    item1: {
      name: 'Dacia Duster',
      image: '/car-duster.jpg',
      price: '250-350 DH/jour',
      specs: {
        'Passagers': '5 places',
        'Coffre': '478 L',
        'Consommation': '6.5 L/100km',
        'Transmission': 'Manuelle',
        'Type': 'SUV robuste'
      },
      pros: [
        '✅ Prix le plus économique (250-300 DH/jour)',
        '✅ Garde au sol élevée (210mm) - idéal routes marocaines',
        '✅ Robustesse légendaire et fiabilité',
        '✅ Excellent rapport qualité-prix',
        '✅ Coffre spacieux (478L)',
        '✅ Faible consommation (6.5L/100km)',
        '✅ Disponibilité 4x4 sur demande'
      ],
      cons: [
        '❌ Finitions intérieures basiques',
        '❌ Insonorisation moyenne',
        '❌ Équipements de confort limités',
        '❌ Design plus utilitaire que premium'
      ],
      bestFor: [
        '🎯 Familles budget-conscient',
        '🎯 Routes et pistes marocaines',
        '🎯 Longs trajets économiques',
        '🎯 Excursions Atlas/Désert',
        '🎯 Location longue durée'
      ]
    },
    item2: {
      name: 'Renault Captur',
      image: '/car-renault-captur.jpg',
      price: '300-400 DH/jour',
      specs: {
        'Passagers': '5 places',
        'Coffre': '422 L',
        'Consommation': '5.8 L/100km',
        'Transmission': 'Manuelle/Auto',
        'Type': 'SUV urbain'
      },
      pros: [
        '✅ Design moderne et élégant',
        '✅ Confort intérieur supérieur',
        '✅ Technologie embarquée (GPS, Bluetooth)',
        '✅ Excellente tenue de route',
        '✅ Insonorisation optimale',
        '✅ Consommation très économique (5.8L)',
        '✅ Disponible en boîte automatique'
      ],
      cons: [
        '❌ Prix 15-20% plus élevé',
        '❌ Garde au sol moyenne (174mm)',
        '❌ Moins adapté aux pistes difficiles',
        '❌ Coffre légèrement plus petit (422L)'
      ],
      bestFor: [
        '🎯 Conduite urbaine (Casa, Rabat)',
        '🎯 Confort sur autoroutes',
        '🎯 Voyages d\'affaires',
        '🎯 Location courte durée premium',
        '🎯 Couples et petites familles'
      ]
    },
    verdict: {
      winner: 'tie',
      summary: 'Pas de vainqueur absolu : le choix dépend de votre usage et budget.',
      recommendation: '**Choisissez le Duster si** : Vous recherchez le meilleur rapport qualité-prix, prévoyez des routes variées (pistes, montagnes) ou une location longue durée économique.\n\n**Choisissez le Captur si** : Vous privilégiez le confort et le design moderne, conduirez principalement en ville/autoroute, ou recherchez une expérience de conduite plus premium.'
    },
    faq: [
      {
        question: 'Quelle est la différence de prix entre Duster et Captur au Maroc ?',
        answer: 'Le Dacia Duster coûte entre 250-350 DH/jour tandis que le Renault Captur se loue entre 300-400 DH/jour, soit environ 15-20% plus cher. Sur une semaine, l\'écart peut atteindre 350-500 DH.'
      },
      {
        question: 'Quel SUV consomme le moins de carburant ?',
        answer: 'Le Renault Captur est légèrement plus économique avec 5.8L/100km contre 6.5L/100km pour le Duster. Sur 1000km, cela représente environ 7L d\'économie (≈110 DH).'
      },
      {
        question: 'Quel véhicule choisir pour un road trip dans l\'Atlas ?',
        answer: 'Le Dacia Duster est recommandé pour l\'Atlas grâce à sa garde au sol élevée (210mm vs 174mm), sa robustesse et sa disponibilité en version 4x4. Idéal pour les routes de montagne.'
      },
      {
        question: 'Le Captur est-il disponible en boîte automatique ?',
        answer: 'Oui, le Renault Captur est disponible en boîte automatique chez Benatna (supplément ~50 DH/jour). Le Duster est principalement proposé en manuelle.'
      }
    ],
    relatedComparisons: ['clio-vs-sandero', 'location-aeroport-vs-centre']
  },
  {
    id: 'clio-vs-sandero',
    title: 'Renault Clio vs Dacia Sandero',
    slug: 'renault-clio-vs-dacia-sandero-maroc',
    metaTitle: 'Renault Clio vs Dacia Sandero - Comparatif Location Maroc | Benatna',
    metaDescription: 'Comparatif Renault Clio vs Dacia Sandero pour location au Maroc : quelle citadine choisir ? Prix, confort, équipements - Guide complet 2024.',
    category: 'vehicules',
    introduction: 'Renault Clio et Dacia Sandero : deux citadines best-sellers au Maroc, partageant la même plateforme mais avec des positionnements différents. Compactes, économiques et faciles à conduire, elles dominent le marché de la location économique.',
    item1: {
      name: 'Renault Clio',
      image: '/car-clio.jpg',
      price: '180-250 DH/jour',
      specs: {
        'Passagers': '5 places',
        'Coffre': '391 L',
        'Consommation': '5.2 L/100km',
        'Transmission': 'Manuelle/Auto',
        'Type': 'Citadine premium'
      },
      pros: [
        '✅ Design élégant et moderne',
        '✅ Excellent confort intérieur',
        '✅ Technologie embarquée',
        '✅ Tenue de route sportive',
        '✅ Finitions soignées',
        '✅ Coffre généreux (391L)',
        '✅ Boîte automatique disponible'
      ],
      cons: [
        '❌ Prix 20-30% supérieur au Sandero',
        '❌ Coûts d\'entretien plus élevés',
        '❌ Moins robuste pour routes difficiles'
      ],
      bestFor: [
        '🎯 Déplacements urbains premium',
        '🎯 Couples et voyageurs solo',
        '🎯 Courts séjours ville',
        '🎯 Image de marque'
      ]
    },
    item2: {
      name: 'Dacia Sandero',
      image: '/car-dacia-sandero.jpg',
      price: '150-200 DH/jour',
      specs: {
        'Passagers': '5 places',
        'Coffre': '328 L',
        'Consommation': '5.5 L/100km',
        'Transmission': 'Manuelle',
        'Type': 'Citadine économique'
      },
      pros: [
        '✅ Prix imbattable (150-180 DH/jour)',
        '✅ Robustesse et fiabilité',
        '✅ Entretien économique',
        '✅ Habitabilité excellente',
        '✅ Simplicité d\'utilisation',
        '✅ Meilleur rapport qualité-prix Maroc'
      ],
      cons: [
        '❌ Finitions basiques',
        '❌ Équipements limités',
        '❌ Design plus fonctionnel',
        '❌ Pas de boîte automatique',
        '❌ Coffre plus petit (328L)'
      ],
      bestFor: [
        '🎯 Budget minimal',
        '🎯 Location longue durée',
        '🎯 Familles économes',
        '🎯 Déplacements quotidiens'
      ]
    },
    verdict: {
      winner: 'item2',
      summary: 'Pour un usage location au Maroc, le Dacia Sandero l\'emporte sur le rapport qualité-prix.',
      recommendation: '**Choisissez la Clio si** : Le confort, le design et l\'image sont importants, ou si vous recherchez une boîte automatique.\n\n**Choisissez la Sandero si** (recommandé) : Vous voulez le meilleur tarif, une location longue durée, ou privilégiez l\'aspect pratique et économique.'
    },
    faq: [
      {
        question: 'Quelle est la différence de prix entre Clio et Sandero ?',
        answer: 'Le Sandero coûte 150-200 DH/jour contre 180-250 DH/jour pour la Clio, soit 20-30% moins cher. Sur un mois de location, l\'économie peut atteindre 900-1500 DH.'
      },
      {
        question: 'Quelle citadine a le coffre le plus grand ?',
        answer: 'La Renault Clio offre un coffre de 391L contre 328L pour le Sandero. La Clio est plus avantageuse pour les bagages, mais le Sandero reste très correct pour 2-3 personnes.'
      },
      {
        question: 'Le Sandero est-il fiable pour longue durée ?',
        answer: 'Oui, le Dacia Sandero est réputé pour sa robustesse et fiabilité au Maroc. C\'est un choix excellent pour location longue durée (1-12 mois) grâce à ses faibles coûts d\'entretien.'
      }
    ],
    relatedComparisons: ['duster-vs-captur', 'location-economique-vs-premium']
  },

  // COMPARAISONS SERVICES
  {
    id: 'location-aeroport-vs-centre',
    title: 'Location Aéroport vs Centre-Ville',
    slug: 'location-aeroport-vs-centre-ville-maroc',
    metaTitle: 'Location Voiture Aéroport vs Centre-Ville Maroc - Où Louer ? | Benatna',
    metaDescription: 'Faut-il louer à l\'aéroport ou en centre-ville au Maroc ? Comparatif complet : prix, disponibilité, horaires, avantages. Guide pratique 2024.',
    category: 'services',
    introduction: 'Louer une voiture à l\'aéroport ou en centre-ville : un choix stratégique qui impacte votre budget et votre confort. Ce comparatif détaille tous les critères pour vous aider à décider selon votre situation.',
    item1: {
      name: 'Location à l\'Aéroport',
      image: '/city-casablanca.jpg',
      price: 'Standard + 0-10%',
      specs: {
        'Disponibilité': '24h/24 - 7j/7',
        'Délai récupération': '10-30 minutes',
        'Parking gratuit': 'Inclus',
        'Navette': 'Non nécessaire',
        'Villes': 'Casa, Marrakech, Rabat, Agadir, Fès, Tanger'
      },
      pros: [
        '✅ Gain de temps énorme (pas de taxi/navette)',
        '✅ Service 24h/24 pour vols de nuit',
        '✅ Large choix de véhicules',
        '✅ Parking inclus à l\'aéroport',
        '✅ Idéal pour démarrer road trip immédiatement',
        '✅ Restitution simplifiée avant vol',
        '✅ Accueil personnalisé comptoir'
      ],
      cons: [
        '❌ Supplément aéroport possible (0-10%)',
        '❌ Affluence aux heures de pointe',
        '❌ Parfois queue au comptoir',
        '❌ Conduite immédiate après vol (fatigue)'
      ],
      bestFor: [
        '🎯 Touristes arrivant de l\'étranger',
        '🎯 Road trips dès l\'arrivée',
        '🎯 Vols tôt/tard (24h/24)',
        '🎯 Séjours hors centre-ville',
        '🎯 Gain de temps maximum'
      ]
    },
    item2: {
      name: 'Location Centre-Ville',
      image: '/city-marrakech.jpg',
      price: 'Standard',
      specs: {
        'Disponibilité': '8h-20h généralement',
        'Délai récupération': '30-60 minutes',
        'Parking': 'À prévoir',
        'Navette': 'Taxi/transport nécessaire',
        'Villes': 'Tous quartiers Casa, Marrakech, Rabat'
      },
      pros: [
        '✅ Prix standard (pas de supplément)',
        '✅ Multiples points de retrait',
        '✅ Livraison hôtel souvent gratuite',
        '✅ Moins d\'affluence',
        '✅ Conseils locaux personnalisés',
        '✅ Restitution flexible quartiers',
        '✅ Idéal si déjà installé'
      ],
      cons: [
        '❌ Nécessite transport aéroport → ville',
        '❌ Horaires limités (8h-20h souvent)',
        '❌ Délai de livraison si hôtel',
        '❌ Moins de choix véhicules premium',
        '❌ Complique logistique arrivée'
      ],
      bestFor: [
        '🎯 Voyageurs déjà en ville',
        '🎯 Besoin ponctuel après installation',
        '🎯 Budget strict (éviter supplément)',
        '🎯 Horaires flexibles',
        '🎯 Livraison hôtel souhaitée'
      ]
    },
    verdict: {
      winner: 'item1',
      summary: 'Pour la majorité des touristes, la location à l\'aéroport est la solution optimale.',
      recommendation: '**Choisissez l\'Aéroport si** (recommandé) : Vous arrivez en avion, voulez démarrer immédiatement, avez un vol tôt/tard, ou prévoyez un road trip.\n\n**Choisissez le Centre-Ville si** : Vous êtes déjà installé en ville, avez besoin d\'une voiture quelques jours après arrivée, ou souhaitez éviter tout supplément.'
    },
    faq: [
      {
        question: 'Quel est le supplément pour location à l\'aéroport au Maroc ?',
        answer: 'Chez Benatna, le supplément aéroport est de 0-10% selon la ville. À Casablanca et Marrakech, il est souvent inclus dans le tarif de base. Le gain de temps justifie largement ce léger surcoût.'
      },
      {
        question: 'La livraison en centre-ville est-elle gratuite ?',
        answer: 'Oui, Benatna offre la livraison gratuite dans de nombreux quartiers de Casablanca (Maarif, Anfa, Ain Diab), Marrakech (Guéliz, Hivernage) et Rabat (Hassan, Agdal). Vérifiez la zone lors de la réservation.'
      },
      {
        question: 'Peut-on louer à l\'aéroport et restituer en centre-ville ?',
        answer: 'Oui absolument ! Benatna propose la restitution flexible : vous pouvez prendre à l\'aéroport de Casablanca et rendre à Marrakech centre-ville par exemple. Pratique pour circuits multi-villes.'
      },
      {
        question: 'Quels sont les horaires de location en centre-ville ?',
        answer: 'Les agences centre-ville sont généralement ouvertes de 8h à 20h en semaine, et 9h-18h le week-end. Pour des besoins hors horaires, la location aéroport 24h/24 est préférable.'
      }
    ],
    relatedComparisons: ['location-courte-vs-longue-duree', 'avec-vs-sans-chauffeur']
  },
  {
    id: 'location-courte-vs-longue-duree',
    title: 'Location Courte Durée vs Longue Durée',
    slug: 'location-courte-duree-vs-longue-duree-maroc',
    metaTitle: 'Location Voiture Courte vs Longue Durée Maroc - Quel Tarif ? | Benatna',
    metaDescription: 'Comparatif location courte durée vs longue durée au Maroc : économies, flexibilité, services. Quand choisir chaque formule ? Guide tarifaire 2024.',
    category: 'services',
    introduction: 'La durée de location impacte fortement votre tarif et vos services. Entre location courte durée (1-6 jours) et longue durée (7+ jours), les différences sont importantes. Découvrez quelle formule correspond à votre besoin.',
    item1: {
      name: 'Location Courte Durée',
      image: '/hero-rent.jpg',
      price: '150-450 DH/jour',
      specs: {
        'Durée': '1-6 jours',
        'Tarif journalier': 'Standard',
        'Engagement': 'Aucun',
        'Caution': '3000-8000 DH',
        'Modifications': 'Flexibles'
      },
      pros: [
        '✅ Aucun engagement long terme',
        '✅ Flexibilité maximale',
        '✅ Annulation facile (24h)',
        '✅ Idéal week-ends et courts séjours',
        '✅ Large choix véhicules',
        '✅ Pas de contrat complexe',
        '✅ Solution ponctuelle parfaite'
      ],
      cons: [
        '❌ Tarif journalier standard (pas de dégressif)',
        '❌ Coût total élevé sur plusieurs semaines',
        '❌ Pas de services additionnels inclus',
        '❌ Renouvellement fréquent si répété'
      ],
      bestFor: [
        '🎯 Touristes (1 semaine)',
        '🎯 Week-ends prolongés',
        '🎯 Déplacements ponctuels',
        '🎯 Mariages/événements',
        '🎯 Essai avant longue durée'
      ]
    },
    item2: {
      name: 'Location Longue Durée',
      image: '/hero-partners.jpg',
      price: '100-300 DH/jour',
      specs: {
        'Durée': '7-365+ jours',
        'Tarif journalier': '-30% à -50%',
        'Engagement': 'Souple',
        'Caution': '2000-5000 DH',
        'Modifications': 'Sur demande'
      },
      pros: [
        '✅ Économies massives (-30 à -50%)',
        '✅ Entretien souvent inclus',
        '✅ Assurance renforcée',
        '✅ Renouvellement automatique possible',
        '✅ Caution réduite',
        '✅ Véhicule dédié stable',
        '✅ Services premium (assistance 24h)'
      ],
      cons: [
        '❌ Engagement minimum (7-30 jours)',
        '❌ Moins de flexibilité changement véhicule',
        '❌ Pénalités si résiliation anticipée',
        '❌ Contrat plus formel'
      ],
      bestFor: [
        '🎯 Expatriés et résidents',
        '🎯 Missions professionnelles',
        '🎯 Étudiants (semestre/année)',
        '🎯 Projets longs (1-12 mois)',
        '🎯 Remplacement véhicule perso'
      ]
    },
    verdict: {
      winner: 'tie',
      summary: 'Le choix dépend de votre durée de séjour et budget. Seuil de rentabilité : 7 jours.',
      recommendation: '**Choisissez Courte Durée si** : Vous restez moins d\'1 semaine, voulez une flexibilité totale, ou testez une première location.\n\n**Choisissez Longue Durée si** (dès 7+ jours) : Vous restez 1 semaine ou plus, voulez économiser 30-50%, ou avez un besoin récurrent.'
    },
    faq: [
      {
        question: 'À partir de combien de jours la longue durée est-elle rentable ?',
        answer: 'Dès 7 jours de location, les tarifs dégressifs de longue durée deviennent intéressants avec 15-20% d\'économie. À partir de 30 jours, l\'économie atteint 40-50% par rapport au tarif journalier standard.'
      },
      {
        question: 'Peut-on passer d\'une location courte à longue durée ?',
        answer: 'Oui ! Si vous décidez de prolonger votre location courte durée au-delà de 7 jours, Benatna recalcule automatiquement le tarif en longue durée avec remboursement du différentiel.'
      },
      {
        question: 'Quels services sont inclus en longue durée ?',
        answer: 'En longue durée chez Benatna : entretien préventif inclus, assistance 24h/7j, remplacement véhicule en panne sous 24h, et parfois kilométrage illimité étendu selon contrat.'
      },
      {
        question: 'Y a-t-il une durée minimum pour la longue durée ?',
        answer: 'La longue durée démarre à partir de 7 jours. Chez Benatna, pas d\'engagement maximum : vous pouvez louer de 1 semaine à 12 mois selon vos besoins, avec flexibilité de prolongation.'
      }
    ],
    relatedComparisons: ['location-aeroport-vs-centre', 'avec-vs-sans-assurance-tous-risques']
  },

  // COMPARAISONS VILLES
  {
    id: 'casablanca-vs-marrakech',
    title: 'Location Casablanca vs Marrakech',
    slug: 'location-voiture-casablanca-vs-marrakech',
    metaTitle: 'Location Voiture Casablanca vs Marrakech - Où Louer ? | Benatna',
    metaDescription: 'Casablanca ou Marrakech pour louer votre voiture au Maroc ? Comparatif prix, disponibilité, routes, avantages. Guide complet 2024.',
    category: 'villes',
    introduction: 'Casablanca et Marrakech sont les deux principales villes de location au Maroc, chacune avec ses spécificités. Entre capitale économique et destination touristique, voici un comparatif complet pour optimiser votre choix.',
    item1: {
      name: 'Casablanca',
      image: '/city-casablanca.jpg',
      price: 'Standard',
      specs: {
        'Population': '3.7M habitants',
        'Aéroport': 'Mohammed V (1er Maroc)',
        'Type': 'Business & Économique',
        'Points retrait': '15+ agences',
        'Routes principales': 'Rabat, Marrakech, El Jadida'
      },
      pros: [
        '✅ Plus grande offre véhicules Maroc',
        '✅ Prix compétitifs (volume)',
        '✅ Aéroport n°1 connexions internationales',
        '✅ Infrastructure routière moderne',
        '✅ Centre économique - business',
        '✅ Disponibilité immédiate',
        '✅ Point de départ circuits Nord'
      ],
      cons: [
        '❌ Trafic dense centre-ville',
        '❌ Parking parfois difficile',
        '❌ Moins touristique que Marrakech',
        '❌ Ambiance plus urbanisée'
      ],
      bestFor: [
        '🎯 Voyages d\'affaires',
        '🎯 Circuits Nord (Rabat, Tanger, Fès)',
        '🎯ongs trajets autoroutes',
        '🎯 Arrivées aéroport Mohammed V',
        '🎯 Résidents locaux'
      ]
    },
    item2: {
      name: 'Marrakech',
      image: '/city-marrakech.jpg',
      price: 'Standard +5-10%',
      specs: {
        'Population': '1M habitants',
        'Aéroport': 'Marrakech-Ménara (2ème)',
        'Type': 'Touristique & Loisirs',
        'Points retrait': '10+ agences',
        'Routes principales': 'Atlas, Essaouira, Ouarzazate'
      },
      pros: [
        '✅ Destination touristique #1',
        '✅ Point de départ Atlas et Sahara',
        '✅ Ambiance unique médina/souks',
        '✅ Excellent pour road trips Sud',
        '✅ Aéroport bien connecté Europe',
        '✅ Services touristiques développés',
        '✅ Climat agréable toute l\'année'
      ],
      cons: [
        '❌ Légèrement plus cher (+5-10%)',
        '❌ Circulation médina complexe',
        '❌ Moins d\'agences que Casa',
        '❌ Forte demande haute saison'
      ],
      bestFor: [
        '🎯 Touristes internationaux',
        '🎯 Road trips Sud (Sahara, Ouarzazate)',
        '🎯 Excursions Atlas/ski',
        '🎯ééjours loisirs',
        '🎯 Mariages/événements'
      ]
    },
    verdict: {
      winner: 'tie',
      summary: 'Casablanca pour business/Nord, Marrakech pour tourisme/Sud - les deux excellents.',
      recommendation: '**Choisissez Casablanca si** : Voyage d\'affaires, circuit Nord du Maroc (Rabat, Fès, Tanger), recherche meilleur prix, ou arrivée aéroport Mohammed V.\n\n**Choisissez Marrakech si** : Séjour touristique, road trip Sud (Atlas, Sahara, Ouarzazate), ou arrivée aéroport Marrakech-Ménara.'
    },
    faq: [
      {
        question: 'Quelle ville est moins chère pour louer au Maroc ?',
        answer: 'Casablanca est généralement 5-10% moins chère que Marrakech grâce à une offre plus importante et une concurrence accrue. Pour une semaine, l\'économie peut atteindre 150-300 DH.'
      },
      {
        question: 'Peut-on louer à Casablanca et rendre à Marrakech ?',
        answer: 'Oui absolument ! Benatna propose l\'aller simple Casablanca-Marrakech (ou inverse) sans frais supplémentaires pour locations de 3+ jours. Idéal pour circuits.'
      },
      {
        question: 'Quelle ville choisir pour visiter le désert du Sahara ?',
        answer: 'Marrakech est le meilleur point de départ pour le Sahara (Merzouga, Zagora). Comptez 6-7h de route via Ouarzazate. Depuis Casablanca, ajoutez 3-4h supplémentaires.'
      }
    ],
    relatedComparisons: ['location-aeroport-vs-centre', 'duster-vs-captur']
  },

  // COMPARAISONS CATÉGORIES
  {
    id: 'location-economique-vs-premium',
    title: 'Location Économique vs Premium',
    slug: 'location-economique-vs-premium-maroc',
    metaTitle: 'Location Voiture Économique vs Premium Maroc - Quel Budget ? | Benatna',
    metaDescription: 'Voiture économique ou premium pour votre location au Maroc ? Comparatif prix, confort, équipements. Optimisez votre budget selon vos besoins.',
    category: 'categories',
    introduction: 'Catégorie économique ou premium : un choix qui peut doubler votre budget location. Entre Dacia Sandero à 150 DH/jour et Mercedes Classe E à 800 DH/jour, explorons les différences réelles pour vous aider à choisir judicieusement.',
    item1: {
      name: 'Catégorie Économique',
      image: '/car-dacia-sandero.jpg',
      price: '150-250 DH/jour',
      specs: {
        'Exemples': 'Sandero, Clio, Peugeot 208',
        'Budget semaine': '1050-1750 DH',
        'Consommation': '5-6 L/100km',
        'Passagers': '4-5',
        'Équipements': 'Basiques'
      },
      pros: [
        '✅ Prix imbattable (150-250 DH/jour)',
        '✅ Faible consommation carburant',
        '✅ Facilité de stationnement',
        '✅ Assurance moins chère',
        '✅ Parfait trajets courts ville',
        '✅ Large disponibilité',
        '✅ Budget total maîtrisé'
      ],
      cons: [
        '❌ Confort basique',
        '❌ Équipements limités',
        '❌ Puissance moteur réduite',
        '❌ Moins prestigieux',
        '❌ Insonorisation moyenne'
      ],
      bestFor: [
        '🎯 Budget serré',
        '🎯 Trajets urbains courts',
        '🎯 Solo ou couple',
        '🎯 Location longue durée économique',
        '🎯 Jeunes conducteurs'
      ]
    },
    item2: {
      name: 'Catégorie Premium',
      image: '/car-mercedes-e.jpg',
      price: '500-1200 DH/jour',
      specs: {
        'Exemples': 'Mercedes E, BMW 5, Audi A6',
        'Budget semaine': '3500-8400 DH',
        'Consommation': '7-9 L/100km',
        'Passagers': '5',
        'Équipements': 'Complets'
      },
      pros: [
        '✅ Confort maximal',
        '✅ Équipements haut de gamme',
        '✅ Prestige et image',
        '✅ Puissance et performances',
        '✅ Sécurité renforcée',
        '✅ Technologie embarquée',
        '✅ Expérience de conduite exceptionnelle'
      ],
      cons: [
        '❌ Prix élevé (500-1200 DH/jour)',
        '❌ Consommation supérieure',
        '❌ Assurance plus chère',
        '❌ Stationnement parfois complexe',
        '❌ Budget total x3 à x5'
      ],
      bestFor: [
        '🎯 Voyages d\'affaires VIP',
        '🎯 Mariages et événements',
        '🎯ongs trajets confort',
        '🎯 Clients exigeants',
        '🎯 Occasions spéciales'
      ]
    },
    verdict: {
      winner: 'item1',
      summary: 'Pour 90% des locations au Maroc, la catégorie économique suffit amplement.',
      recommendation: '**Choisissez Économique si** (recommandé) : Budget limité, trajets urbains/moyens, ou location longue durée. Le confort est correct pour la majorité des usages.\n\n**Choisissez Premium si** : Budget confortable, événement spécial (mariage, business VIP), ou longs trajets où le confort est primordial.'
    },
    faq: [
      {
        question: 'Quelle est la différence de prix entre économique et premium ?',
        answer: 'Une voiture économique coûte 150-250 DH/jour contre 500-1200 DH/jour pour du premium, soit 3 à 5 fois plus cher. Sur une semaine, l\'écart est de 2500-6500 DH.'
      },
      {
        question: 'Les voitures économiques sont-elles fiables au Maroc ?',
        answer: 'Oui absolument ! Les Dacia, Renault et Peugeot économiques sont parfaitement adaptées aux routes marocaines, fiables, et largement utilisées localement. Excellent rapport qualité-prix.'
      },
      {
        question: 'Vaut-il la peine de payer pour du premium ?',
        answer: 'Pour des occasions spéciales (mariage, business VIP, anniversaire) ou longs trajets autoroutiers (500+ km), oui. Pour usage courant ville/région, la catégorie économique suffit largement.'
      }
    ],
    relatedComparisons: ['location-courte-vs-longue-duree', 'clio-vs-sandero']
  }
];

export const comparisonCategories = [
  { id: 'vehicules', label: 'Véhicules', icon: 'car' },
  { id: 'services', label: 'Services', icon: 'briefcase' },
  { id: 'villes', label: 'Villes', icon: 'map-pin' },
  { id: 'categories', label: 'Catégories', icon: 'layers' },
] as const;
