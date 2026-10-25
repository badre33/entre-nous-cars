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
    metaTitle: 'Dacia Duster vs Renault Captur : quel SUV louer au Maroc ?',
    metaDescription: 'Duster ou Captur pour vos vacances au Maroc ? Coffre, consommation, confort sur piste et prix par jour comparés. Le bon choix selon votre itinéraire.',
    category: 'vehicules',
    introduction: 'Le Dacia Duster et le Renault Captur sont les deux SUV compacts les plus demandés en location au Maroc. Tous deux économiques et polyvalents, ils ne s\'adressent pourtant pas au même voyage : l\'un encaisse les pistes de l\'Atlas et du Sud, l\'autre privilégie le confort sur route et en ville. Voici comment choisir selon votre itinéraire.',
    item1: {
      name: 'Dacia Duster',
      image: '/vehicles/benatna/dacia-duster.webp',
      price: '400-500 DH/jour',
      specs: {
        'Passagers': '5 places',
        'Coffre': '478 L',
        'Consommation': '6.5 L/100km',
        'Transmission': 'Manuelle',
        'Type': 'SUV robuste'
      },
      pros: [
        '✅ Prix le plus économique (400-500 DH/jour)',
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
        answer: 'Le Dacia Duster coûte entre 400-500 DH/jour tandis que le Dacia Duster se loue entre 300-400 DH/jour, soit environ 15-20% plus cher. Sur une semaine, l\'écart peut atteindre 500-700 DH.'
      },
      {
        question: 'Quel SUV consomme le moins de carburant ?',
        answer: 'Le Dacia Duster est légèrement plus économique avec 5.8L/100km contre 6.5L/100km pour le Duster. Sur 1000km, cela représente environ 7L d\'économie (≈110 DH).'
      },
      {
        question: 'Quel véhicule choisir pour un road trip dans l\'Atlas ?',
        answer: 'Le Dacia Duster est recommandé pour l\'Atlas grâce à sa garde au sol élevée (210mm vs 174mm), sa robustesse et sa disponibilité en version 4x4. Idéal pour les routes de montagne.'
      },
      {
        question: 'Le Captur est-il disponible en boîte automatique ?',
        answer: 'Oui, le Dacia Duster est disponible en boîte automatique chez Benatna (supplément ~50 DH/jour). Le Duster est principalement proposé en manuelle.'
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
      image: '/vehicles/benatna/renault-clio.webp',
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
      image: '/vehicles/benatna/dacia-sandero.webp',
      price: '150-300 DH/jour',
      specs: {
        'Passagers': '5 places',
        'Coffre': '328 L',
        'Consommation': '5.5 L/100km',
        'Transmission': 'Manuelle',
        'Type': 'Citadine économique'
      },
      pros: [
        '✅ Prix imbattable (300-350 DH/jour)',
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
        answer: 'Le Sandero coûte 150-300 DH/jour contre 180-250 DH/jour pour la Clio, soit 20-30% moins cher. Sur un mois de location, l\'économie peut atteindre 900-1500 DH.'
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
    "id": "location-aeroport-vs-centre",
    "title": "Aéroport ou centre-ville à Casablanca",
    slug: "location-aeroport-vs-centre-ville-maroc",
    "metaTitle": "Location voiture : aéroport ou centre-ville à Casablanca | Benatna",
    "metaDescription": "Choisir votre prise en charge à Casablanca : Mohammed V ou point en ville convenu avec le loueur. Livraison gratuite aux points desservis, minimum 3 jours.",
    "category": "services",
    "introduction": "Choisissez le point de prise en charge selon votre arrivée à Casablanca et l’organisation de votre séjour. Dans les deux cas, la livraison aux points desservis est gratuite et le rendez-vous est convenu à l’avance avec le loueur. La location dure de trois jours à six mois calendaires.",
    "item1": {
        "name": "Arrivée à Mohammed V",
        "image": "/city-casablanca.jpg",
        "price": "Tarif à confirmer",
        "specs": {
            "Lieu": "Aéroport Mohammed V, Casablanca",
            "Rendez-vous": "Convenu à l’avance",
            "Livraison": "Gratuite au point desservi",
            "Durée": "3 jours à 6 mois"
        },
        "pros": [
            "Prise en charge adaptée à une arrivée en avion",
            "Lieu de rencontre convenu avant le déplacement",
            "Retour organisé avec le loueur"
        ],
        "cons": [
            "Prévenir le loueur si votre voyage change",
            "Vérifier le lieu précis avant votre arrivée"
        ],
        "bestFor": [
            "MRE et touristes arrivant en avion",
            "Voyageurs souhaitant préparer leur voiture avant le départ"
        ]
    },
    "item2": {
        "name": "Point convenu à Casablanca",
        "image": "/city-casablanca.jpg",
        "price": "Tarif à confirmer",
        "specs": {
            "Lieu": "Point desservi à Casablanca",
            "Rendez-vous": "Convenu à l’avance",
            "Livraison": "Gratuite au point desservi",
            "Durée": "3 jours à 6 mois"
        },
        "pros": [
            "Prise en charge adaptée à un séjour déjà commencé",
            "Possibilité de choisir une gare ou une adresse à confirmer",
            "Organisation du retour avec le loueur"
        ],
        "cons": [
            "Faire confirmer que l’adresse est desservie",
            "Prévoir votre trajet jusqu’au rendez-vous convenu"
        ],
        "bestFor": [
            "Voyageurs déjà installés à Casablanca",
            "Arrivées en gare",
            "Séjours personnels et vacances"
        ]
    },
    "verdict": {
        "winner": "tie",
        "summary": "Le meilleur point est celui qui correspond à votre arrivée et au rendez-vous confirmé par le loueur.",
        "recommendation": "Choisissez Mohammed V si vous arrivez en avion et souhaitez y organiser la prise en charge. Si vous êtes déjà à Casablanca ou arrivez en train, choisissez un point desservi adapté à votre séjour. Dans les deux cas, vérifiez le modèle, le tarif final et les conditions avec le loueur avant votre accord."
    },
    "faq": [
        {
            "question": "La livraison à l’aéroport est-elle payante ?",
            "answer": "La livraison au point desservi de Mohammed V est gratuite et convenue à l’avance avec le loueur. Le prix de location du véhicule est confirmé pour vos dates."
        },
        {
            "question": "Comment choisir une prise en charge en ville ?",
            "answer": "Indiquez la gare ou l’adresse souhaitée à Casablanca. Le loueur confirme le point desservi et le rendez-vous avant votre déplacement. La livraison au point convenu est gratuite."
        },
        {
            "question": "Puis-je demander Rabat ?",
            "answer": "Une livraison à Rabat peut être demandée depuis Casablanca, selon la disponibilité du loueur. Confirmez avec lui le lieu de prise en charge et l’organisation du retour avant votre accord."
        },
        {
            "question": "Quand le rendez-vous est-il fixé ?",
            "answer": "Il est convenu à l’avance avec le loueur en fonction de votre arrivée. Préparez une demande avec vos dates, un à trois modèles et le lieu précis ; le loueur confirme ensuite le véhicule, le tarif et les conditions."
        }
    ],
    "relatedComparisons": []
},
  {
    "id": "location-courte-vs-longue-duree",
    "title": "Court séjour ou séjour prolongé à Casablanca",
    slug: "location-courte-duree-vs-longue-duree-maroc",
    "metaTitle": "Location voiture à Casablanca : court séjour ou jusqu’à 6 mois | Benatna",
    "metaDescription": "Comparez une location pour quelques jours ou plusieurs semaines à Casablanca. De 3 jours à 6 mois, livraison gratuite aux points desservis, tarif confirmé par le loueur.",
    "category": "services",
    "introduction": "La bonne durée dépend des dates de votre séjour personnel. Benatna permet de demander une voiture de trois jours minimum à six mois calendaires maximum. Comparez les prix journaliers indicatifs, puis faites confirmer le véhicule, le montant total et les conditions par le loueur.",
    "item1": {
        "name": "Court séjour — dès 3 jours",
        "image": "/vehicles/benatna/renault-clio.webp",
        "price": "Tarif à confirmer",
        "specs": {
            "Durée": "3 jours minimum",
            "Usage": "Vacances et séjours personnels",
            "Tarif": "Selon modèle et dates",
            "Livraison": "Gratuite aux points desservis"
        },
        "pros": [
            "Adapté à un séjour de quelques jours",
            "Choix de modèles dans le catalogue",
            "Rendez-vous convenu avant votre arrivée"
        ],
        "cons": [
            "Faire confirmer le véhicule pour vos dates",
            "Vérifier les conditions de modification et de retour"
        ],
        "bestFor": [
            "Vacanciers",
            "MRE en court séjour",
            "Touristes à Casablanca"
        ]
    },
    "item2": {
        "name": "Séjour prolongé — jusqu’à 6 mois",
        "image": "/vehicles/benatna/dacia-duster.webp",
        "price": "Tarif à confirmer",
        "specs": {
            "Durée": "6 mois calendaires maximum",
            "Usage": "Séjours personnels prolongés",
            "Tarif": "Proposition du loueur",
            "Livraison": "Gratuite aux points desservis"
        },
        "pros": [
            "Dates adaptées à votre séjour personnel",
            "Conditions discutées avant votre accord",
            "Même véhicule demandé pour la durée prévue, à confirmer"
        ],
        "cons": [
            "Vérifier le montant total pour la période",
            "Faire préciser entretien, kilométrage et conditions de prolongation"
        ],
        "bestFor": [
            "MRE en séjour prolongé",
            "Vacanciers restant plusieurs semaines",
            "Séjours personnels de plusieurs mois"
        ]
    },
    "verdict": {
        "winner": "tie",
        "summary": "Choisissez les dates correspondant à votre séjour, puis comparez la proposition complète du loueur.",
        "recommendation": "Pour quelques jours comme pour plusieurs mois, la demande reste comprise entre trois jours et six mois calendaires. Nos loueurs sont basés à Casablanca ; Rabat peut être demandé depuis Casablanca. La livraison aux points desservis est gratuite et le rendez-vous convenu à l’avance. Les photos illustrent des modèles du catalogue et ne garantissent pas leur disponibilité pour vos dates."
    },
    "faq": [
        {
            "question": "Quelle durée peut-on demander sur Benatna ?",
            "answer": "Au minimum trois jours et au maximum six mois calendaires. Indiquez vos dates dans la demande ; le loueur confirme la disponibilité du véhicule et le tarif final."
        },
        {
            "question": "Une longue durée donne-t-elle automatiquement droit à une remise ?",
            "answer": "Le tarif dépend du véhicule, de la période et de la proposition du loueur. Comparez le montant total pour vos dates ; une remise éventuelle doit être confirmée dans cette proposition."
        },
        {
            "question": "Comment prolonger un séjour ?",
            "answer": "Contactez le loueur avant le retour prévu. Il vérifie la disponibilité et confirme les nouvelles dates, le tarif et les conditions. La durée maximale proposée sur Benatna reste de six mois calendaires."
        },
        {
            "question": "Quels points de prise en charge sont proposés ?",
            "answer": "Les points desservis de Casablanca, notamment Mohammed V et les gares du guide commun. Rabat peut être demandé depuis Casablanca, à confirmer avec le loueur. La livraison est gratuite et le rendez-vous convenu à l’avance."
        }
    ],
    "relatedComparisons": [
        "location-aeroport-vs-centre"
    ]
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
    introduction: 'Catégorie économique ou premium : un choix qui peut doubler votre budget location. Entre Dacia Sandero à 300 DH/jour et Mercedes Classe A à 650 DH/jour, explorons les différences réelles pour vous aider à choisir judicieusement.',
    item1: {
      name: 'Catégorie Économique',
      image: '/vehicles/benatna/dacia-sandero.webp',
      price: '150-250 DH/jour',
      specs: {
        'Exemples': 'Sandero, Clio, Toyota Yaris',
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
      price: '500-1300 DH/jour',
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
        '❌ Prix élevé (500-1300 DH/jour)',
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
        answer: 'Une voiture économique coûte 150-250 DH/jour contre 500-1300 DH/jour pour du premium, soit 3 à 5 fois plus cher. Sur une semaine, l\'écart est de 2500-6500 DH.'
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
