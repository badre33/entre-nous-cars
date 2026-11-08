/**
 * Données des Quartiers pour Pages Ultra-Locales SEO
 * Impact: Top 3 Google pour "location voiture [quartier]"
 * Concurrent: Sixt a 40+ pages locales par ville
 */

export interface Neighborhood {
  slug: string;
  name: string;
  city: string;
  citySlug: string;
  title: string;
  metaDescription: string;
  h1: string;
  description: string;
  highlights: string[];
  landmarks: string[];
  deliveryPoints: Array<{
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    description: string;
  }>;
  popularVehicles: string[];
  tips: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const neighborhoods: Neighborhood[] = [
  // CASABLANCA
  {
    slug: "location-voiture-ain-diab-casablanca",
    name: "Ain Diab",
    city: "Casablanca",
    citySlug: "casablanca",
    title: "Location voiture Ain Diab Casablanca dès 250 DH/jour | Benatna",
    metaDescription: "Louez une voiture de tourisme à Ain Diab dès 250 DH/jour : corniche, plages, Morocco Mall. Livraison gratuite convenue à l’avance, 3 jours minimum, demande sur WhatsApp.",
    h1: "Location de voiture à Ain Diab, sur la corniche de Casablanca",
    description: "Ain Diab, c’est la corniche de Casablanca : plages, restaurants face à l’océan, hôtels et le Morocco Mall au bout du boulevard. Pour un séjour de vacances, une voiture permet de passer de la plage au centre-ville, à la mosquée Hassan II ou à l’aéroport sans dépendre des taxis.",
    highlights: [
      "Corniche, plages et restaurants face à l’océan",
      "Morocco Mall et Anfa Place à proximité",
      "Hôtels et résidences de vacances",
      "Mosquée Hassan II accessible par la route côtière",
      "Aéroport Mohammed V rejoint par l’autoroute"
    ],
    landmarks: [
      "Boulevard de la Corniche",
      "Plages d’Ain Diab",
      "Morocco Mall",
      "Mosquée Hassan II",
      "Phare d’El Hank"
    ],
    deliveryPoints: [
      { name: "Votre hôtel ou résidence", address: "Ain Diab, Casablanca", latitude: "", longitude: "", description: "Remise à l’adresse de votre séjour, à convenir à l’avance avec le loueur." },
      { name: "Aéroport Mohammed V", address: "À votre arrivée", latitude: "", longitude: "", description: "Récupérez la voiture dès l’atterrissage, puis rejoignez la corniche." },
      { name: "Gare Casa-Voyageurs ou Casa-Port", address: "Si vous arrivez en train", latitude: "", longitude: "", description: "Remise en gare, à convenir à l’avance avec le loueur." }
    ],
    popularVehicles: ["Dacia Sandero", "Renault Clio", "Peugeot 208", "Dacia Duster", "Hyundai Tucson"],
    tips: [
      "Précisez l’adresse exacte de votre hôtel dans la demande",
      "La corniche est très fréquentée le soir et le week-end",
      "Une citadine se gare plus facilement près des plages",
      "Demandez au loueur les conditions de caution et de kilométrage"
    ],
    faqs: [
      { question: "Peut-on se faire livrer la voiture à Ain Diab ?", answer: "Oui. Le loueur partenaire peut remettre la voiture à votre hôtel ou résidence à Ain Diab, gratuitement, à condition de convenir du lieu et de l’heure à l’avance. Vous pouvez aussi la récupérer à l’aéroport Mohammed V à votre arrivée." },
      { question: "Quelle voiture choisir pour la corniche ?", answer: "Pour circuler et se garer facilement, une citadine comme la Dacia Sandero, la Renault Clio ou la Peugeot 208 suffit. Pour une famille avec bagages, un SUV comme le Dacia Duster ou le Hyundai Tucson est plus confortable." },
      { question: "Quelle est la durée minimum ?", answer: "Trois jours minimum. Les prix commencent à 250 DH par jour hors haute saison ; le tarif final, la disponibilité et les conditions sont confirmés par le loueur sur WhatsApp." }
    ]
  },
  {
    slug: "location-voiture-maarif-casablanca",
    name: "Maarif",
    city: "Casablanca",
    citySlug: "casablanca",
    title: "Location voiture Maarif Casablanca dès 250 DH/jour | Benatna",
    metaDescription: "Louez une voiture de tourisme au Maarif dès 250 DH/jour : Twin Center, boulevard Zerktouni, restaurants. Livraison gratuite convenue à l’avance, 3 jours minimum.",
    h1: "Location de voiture au Maarif, au cœur de Casablanca",
    description: "Le Maarif est le quartier central et commerçant de Casablanca, autour du Twin Center et du boulevard Zerktouni. C’est un bon point de départ pour un séjour : le centre-ville, la corniche d’Ain Diab et la route de l’aéroport sont accessibles rapidement en voiture.",
    highlights: [
      "Twin Center et boulevard Zerktouni",
      "Boutiques, cafés et restaurants",
      "Hôtels en plein centre",
      "Accès direct à la corniche et au centre-ville",
      "Départ facile vers l’autoroute de l’aéroport"
    ],
    landmarks: [
      "Twin Center",
      "Boulevard Zerktouni",
      "Parc de la Ligue arabe",
      "Corniche d’Ain Diab",
      "Place Mohammed V"
    ],
    deliveryPoints: [
      { name: "Votre hôtel au Maarif", address: "Maarif, Casablanca", latitude: "", longitude: "", description: "Remise à votre hôtel ou appartement, à convenir à l’avance avec le loueur." },
      { name: "Aéroport Mohammed V", address: "À votre arrivée", latitude: "", longitude: "", description: "Récupérez la voiture à l’aéroport et rejoignez le Maarif par l’autoroute." },
      { name: "Gare Casa-Voyageurs", address: "Si vous arrivez en train", latitude: "", longitude: "", description: "Remise en gare, à convenir à l’avance avec le loueur." }
    ],
    popularVehicles: ["Renault Clio", "Dacia Sandero", "Hyundai Accent", "Volkswagen Golf", "Mercedes Classe A"],
    tips: [
      "La circulation est dense en journée : prévoyez de la marge",
      "Demandez à votre hôtel s’il dispose d’un parking",
      "Une citadine reste le plus pratique en centre-ville",
      "Indiquez vos dates et l’adresse exacte dans la demande"
    ],
    faqs: [
      { question: "La livraison est-elle possible au Maarif ?", answer: "Oui. Le loueur partenaire peut remettre la voiture à votre hôtel ou appartement au Maarif, gratuitement, à condition de convenir du lieu et de l’heure à l’avance." },
      { question: "Quelle voiture pour circuler au Maarif ?", answer: "Une citadine (Renault Clio, Dacia Sandero) ou une berline compacte (Hyundai Accent, Volkswagen Golf). Elles se garent facilement et restent confortables pour les sorties hors de Casablanca." },
      { question: "Comment faire une demande ?", answer: "Choisissez un modèle, indiquez vos dates (trois jours minimum) et le lieu de remise, puis envoyez la demande sur WhatsApp. Le loueur confirme la disponibilité, le tarif final et les conditions." }
    ]
  },
  {
    slug: "location-voiture-anfa-casablanca",
    name: "Anfa",
    city: "Casablanca",
    citySlug: "casablanca",
    title: "Location voiture Anfa Casablanca dès 250 DH/jour | Benatna",
    metaDescription: "Louez une voiture de tourisme à Anfa dès 250 DH/jour, livrée à votre résidence ou à l’aéroport Mohammed V. Livraison gratuite convenue à l’avance, 3 jours minimum.",
    h1: "Location de voiture à Anfa, Casablanca",
    description: "Anfa est le quartier résidentiel et verdoyant de Casablanca, entre le centre-ville et la corniche. Beaucoup de visiteurs et de familles de MRE y séjournent ; une voiture livrée à la résidence simplifie les trajets vers la plage, les centres commerciaux et l’aéroport.",
    highlights: [
      "Quartier résidentiel calme et arboré",
      "Entre le centre-ville et la corniche",
      "Anfa Place et Morocco Mall à proximité",
      "Idéal pour un séjour en famille",
      "Remise possible à votre résidence"
    ],
    landmarks: [
      "Anfa Place",
      "Corniche d’Ain Diab",
      "Parc de la Ligue arabe",
      "Mosquée Hassan II",
      "Morocco Mall"
    ],
    deliveryPoints: [
      { name: "Votre résidence à Anfa", address: "Anfa, Casablanca", latitude: "", longitude: "", description: "Remise à votre adresse de séjour, à convenir à l’avance avec le loueur." },
      { name: "Aéroport Mohammed V", address: "À votre arrivée", latitude: "", longitude: "", description: "Récupérez la voiture à l’aéroport, bagages compris." },
      { name: "Gare Casa-Voyageurs", address: "Si vous arrivez en train", latitude: "", longitude: "", description: "Remise en gare, à convenir à l’avance avec le loueur." }
    ],
    popularVehicles: ["Dacia Duster", "Hyundai Tucson", "Dacia Jogger", "Renault Clio", "Mercedes Classe A"],
    tips: [
      "Pour une famille, pensez au Dacia Jogger 7 places",
      "Précisez le nombre de passagers et de bagages",
      "Demandez au loueur les conditions de caution",
      "Réservez tôt pendant les vacances d’été et de fin d’année"
    ],
    faqs: [
      { question: "Peut-on recevoir la voiture à sa résidence à Anfa ?", answer: "Oui. Le loueur partenaire peut remettre la voiture à votre adresse à Anfa, gratuitement, à condition de convenir du lieu et de l’heure à l’avance." },
      { question: "Quelle voiture pour une famille ?", answer: "Un SUV comme le Dacia Duster ou le Hyundai Tucson pour quatre ou cinq personnes avec bagages, ou le Dacia Jogger pour sept places." },
      { question: "Quelle durée de location ?", answer: "À partir de trois jours, pour des séjours et des vacances. Les prix commencent à 250 DH par jour hors haute saison ; le loueur confirme le tarif final." }
    ]
  },
  {
    slug: "location-voiture-sidi-maarouf-casablanca",
    name: "Sidi Maarouf",
    city: "Casablanca",
    citySlug: "casablanca",
    title: "Location voiture Sidi Maarouf dès 250 DH/jour | Benatna",
    metaDescription: "Louez une voiture de tourisme à Sidi Maarouf dès 250 DH/jour, sur la route de l’aéroport Mohammed V. Livraison gratuite convenue à l’avance, 3 jours minimum.",
    h1: "Location de voiture à Sidi Maarouf, sur la route de l’aéroport",
    description: "Sidi Maarouf se trouve au sud de Casablanca, sur l’axe qui relie la ville à l’aéroport Mohammed V. Ses hôtels proches de l’autoroute en font une étape pratique à l’arrivée ou avant un vol retour : la voiture peut vous attendre à l’aéroport ou à votre hôtel.",
    highlights: [
      "Sur l’axe Casablanca – aéroport Mohammed V",
      "Hôtels proches de l’autoroute",
      "Pratique pour une arrivée tardive ou un départ matinal",
      "Accès rapide au centre-ville et à la corniche",
      "Remise à l’aéroport ou à votre hôtel"
    ],
    landmarks: [
      "Aéroport Mohammed V",
      "Autoroute Casablanca – aéroport",
      "Morocco Mall",
      "Corniche d’Ain Diab",
      "Centre-ville de Casablanca"
    ],
    deliveryPoints: [
      { name: "Aéroport Mohammed V", address: "À votre arrivée", latitude: "", longitude: "", description: "Récupérez la voiture dès l’atterrissage, à convenir à l’avance avec le loueur." },
      { name: "Votre hôtel à Sidi Maarouf", address: "Sidi Maarouf, Casablanca", latitude: "", longitude: "", description: "Remise à votre hôtel, à convenir à l’avance avec le loueur." },
      { name: "Gare de l’Oasis", address: "Si vous arrivez en train", latitude: "", longitude: "", description: "Remise en gare, à convenir à l’avance avec le loueur." }
    ],
    popularVehicles: ["Dacia Logan", "Dacia Sandero", "Renault Clio", "Dacia Duster", "Dacia Jogger"],
    tips: [
      "Donnez votre numéro de vol pour une remise à l’aéroport",
      "Prévoyez la restitution avant votre vol retour",
      "Précisez le nombre de valises",
      "Trois jours minimum de location"
    ],
    faqs: [
      { question: "Peut-on récupérer la voiture à l’aéroport et loger à Sidi Maarouf ?", answer: "Oui. C’est la formule la plus simple : la voiture vous attend à l’aéroport Mohammed V, ou à votre hôtel à Sidi Maarouf. La livraison est gratuite et se convient à l’avance avec le loueur." },
      { question: "Quelle voiture pour un séjour avec bagages ?", answer: "La Dacia Logan offre un grand coffre à petit prix ; le Dacia Duster ou le Dacia Jogger 7 places conviennent aux familles." },
      { question: "Proposez-vous des utilitaires ou des locations professionnelles ?", answer: "Non. Benatna propose uniquement des voitures de tourisme pour des séjours et des vacances, à partir de trois jours." }
    ]
  },
  {
    slug: "location-voiture-hassan-casablanca",
    name: "Centre-ville (Hassan)",
    city: "Casablanca",
    citySlug: "casablanca",
    title: "Location voiture centre-ville Casablanca dès 250 DH/jour | Benatna",
    metaDescription: "Louez une voiture de tourisme au centre-ville de Casablanca dès 250 DH/jour : place Mohammed V, Casa-Port, médina. Livraison gratuite convenue à l’avance, 3 jours minimum.",
    h1: "Location de voiture au centre-ville de Casablanca",
    description: "Le centre-ville de Casablanca, autour de la place Mohammed V, réunit les immeubles Art déco, le Marché central, l’ancienne médina et la gare Casa-Port. La médina se visite à pied ; la voiture sert pour la mosquée Hassan II, la corniche et les excursions hors de la ville.",
    highlights: [
      "Place Mohammed V et immeubles Art déco",
      "Ancienne médina et Marché central",
      "Gare Casa-Port en plein centre",
      "Mosquée Hassan II à proximité",
      "Point de départ pour les excursions"
    ],
    landmarks: [
      "Place Mohammed V",
      "Ancienne médina",
      "Marché central",
      "Mosquée Hassan II",
      "Quartier des Habous"
    ],
    deliveryPoints: [
      { name: "Gare Casa-Port", address: "Centre-ville", latitude: "", longitude: "", description: "Remise en gare, à convenir à l’avance avec le loueur." },
      { name: "Votre hôtel au centre-ville", address: "Centre-ville, Casablanca", latitude: "", longitude: "", description: "Remise à votre hôtel, à convenir à l’avance avec le loueur." },
      { name: "Aéroport Mohammed V", address: "À votre arrivée", latitude: "", longitude: "", description: "Récupérez la voiture à l’aéroport et rejoignez le centre par l’autoroute." }
    ],
    popularVehicles: ["Dacia Sandero", "Renault Clio", "Peugeot 208", "Hyundai i20", "Dacia Duster"],
    tips: [
      "La médina se visite à pied : garez-vous à l’extérieur",
      "Circulation dense aux heures de pointe",
      "Demandez à votre hôtel s’il dispose d’un parking",
      "Une citadine est la plus pratique en centre-ville"
    ],
    faqs: [
      { question: "Peut-on récupérer la voiture à la gare Casa-Port ?", answer: "Oui. La remise en gare Casa-Port ou à votre hôtel du centre-ville est gratuite, à condition de la convenir à l’avance avec le loueur." },
      { question: "Faut-il une voiture pour visiter le centre ?", answer: "Pas pour la médina, qui se visite à pied. La voiture devient utile pour la mosquée Hassan II, la corniche d’Ain Diab et les sorties hors de Casablanca." },
      { question: "Quelle durée de location ?", answer: "Trois jours minimum, pour des séjours et des vacances. Les prix commencent à 250 DH par jour hors haute saison ; le loueur confirme le tarif final sur WhatsApp." }
    ]
  },
  // MARRAKECH (hors zone : pages en noindex)
  {
    slug: "location-voiture-gueliz-marrakech",
    name: "Guéliz",
    city: "Marrakech",
    citySlug: "marrakech",
    title: "Location Voiture Guéliz Marrakech | Ville Nouvelle - Benatna",
    metaDescription: "Location de voiture à Guéliz Marrakech. Livraison Avenue Mohammed V, Carré Eden, commerces. Prix dès 250 DH/jour. Idéal ville moderne.",
    h1: "Location de Voiture à Guéliz - Ville Nouvelle Marrakech",
    description: "Guéliz, la ville nouvelle européenne de Marrakech. Quartier moderne avec cafés, restaurants internationaux, boutiques de luxe, galeries d'art. Le Marrakech contemporain et cosmopolite.",
    highlights: [
      "Ville nouvelle moderne et animée",
      "Avenue Mohammed V - artère principale",
      "Carré Eden Shopping Center",
      "Nombreux restaurants et cafés",
      "Galeries d'art contemporain"
    ],
    landmarks: [
      "Place Abdel Moumen Ben Ali (0 km)",
      "Carré Eden Shopping (1 km)",
      "Jardins de la Koutoubia (2 km)",
      "Place Jemaa el-Fna (3 km)",
      "Jardin Majorelle (2 km)"
    ],
    deliveryPoints: [
      {
        name: "Place Abdel Moumen",
        address: "Avenue Mohammed V, Guéliz",
        latitude: "31.6350",
        longitude: "-8.0100",
        description: "Livraison place centrale Guéliz"
      },
      {
        name: "Carré Eden Shopping",
        address: "Avenue Mohammed VI",
        latitude: "31.6380",
        longitude: "-8.0080",
        description: "Livraison parking Carré Eden"
      },
      {
        name: "Hôtels Guéliz",
        address: "Zone hôtelière Guéliz",
        latitude: "31.6340",
        longitude: "-8.0120",
        description: "Livraison hôtels ville nouvelle"
      }
    ],
    popularVehicles: ["Renault Clio", "Toyota Yaris", "Dacia Duster", "Toyota Corolla", "Mercedes Classe A"],
    tips: [
      "Quartier moderne, circulation européenne",
      "Parkings payants 10 DH/heure",
      "Nombreux restaurants européens et marocains",
      "Base idéale pour explorer Marrakech"
    ],
    faqs: [
      {
        question: "Guéliz ou Médina pour louer voiture ?",
        answer: "Guéliz plus pratique ! Circulation moderne, parkings nombreux, hôtels avec parking. Médina piétonne, voiture inutile. Guéliz parfait base avec voiture."
      },
      {
        question: "Accès Médina depuis Guéliz ?",
        answer: "Très proche ! 2-3 km (10 min en voiture). Parking recommandé : Parking Jemaa el-Fna (20 DH/jour), puis Médina à pied. Éviter circuler dans Médina."
      },
      {
        question: "Restaurants à Guéliz ?",
        answer: "Excellent choix ! Avenue Mohammed V : restaurants français, italiens, marocains, asiatiques. Cafés terrasses type européen. Vie nocturne animée."
      }
    ]
  },
  {
    slug: "location-voiture-hivernage-marrakech",
    name: "Hivernage",
    city: "Marrakech",
    citySlug: "marrakech",
    title: "Location Voiture Hivernage Marrakech | Quartier Hôtelier Luxe - Benatna",
    metaDescription: "Location de voiture à Hivernage Marrakech. Livraison hôtels 5 étoiles, Palais des Congrès, casinos. Prix dès 250 DH/jour.",
    h1: "Location de Voiture à Hivernage - Quartier Hôtelier Marrakech",
    description: "Hivernage, le quartier hôtelier de luxe de Marrakech. Hôtels 5 étoiles, riads de prestige, Palais des Congrès, casinos, restaurants gastronomiques. Le Marrakech chic et touristique.",
    highlights: [
      "Hôtels 5 étoiles et riads de luxe",
      "Palais des Congrès de Marrakech",
      "Casinos (La Mamounia, Es Saadi)",
      "Restaurants gastronomiques étoilés",
      "Proche remparts et Médina"
    ],
    landmarks: [
      "La Mamounia (0.5 km)",
      "Palais des Congrès (1 km)",
      "Place Jemaa el-Fna (2 km)",
      "Jardins de la Koutoubia (1.5 km)",
      "Avenue Mohammed VI (3 km)"
    ],
    deliveryPoints: [
      {
        name: "Palais des Congrès",
        address: "Avenue de France, Hivernage",
        latitude: "31.6200",
        longitude: "-8.0180",
        description: "Livraison parking Palais des Congrès"
      },
      {
        name: "Hôtels 5 Étoiles Hivernage",
        address: "Zone hôtelière Hivernage",
        latitude: "31.6180",
        longitude: "-8.0200",
        description: "Livraison votre hôtel de luxe"
      },
      {
        name: "Avenue Echouhada",
        address: "Avenue Echouhada, Hivernage",
        latitude: "31.6190",
        longitude: "-8.0190",
        description: "Livraison artère principale Hivernage"
      }
    ],
    popularVehicles: ["Mercedes Classe A", "BMW Série 3", "Audi A3", "Nissan Qashqai", "Range Rover Evoque"],
    tips: [
      "Quartier haut standing, véhicules premium recommandés",
      "Hôtels avec voituriers et parkings privés",
      "Restaurants gastronomiques, réserver à l'avance",
      "Accès rapide Médina (5 min) et aéroport (20 min)"
    ],
    faqs: [
      {
        question: "Location voiture luxe pour Hivernage ?",
        answer: "Oui, véhicules premium disponibles : Mercedes Classe A, BMW Série 3, Audi A3, Range Rover. Parfaits pour standing hôtels 5 étoiles Hivernage. Livraison voiturier hôtel."
      },
      {
        question: "Parking à Hivernage ?",
        answer: "Hôtels disposent parkings privés sécurisés, souvent avec voiturier. En voirie, parkings payants gardiennés. Quartier très sûr."
      },
      {
        question: "Excursions depuis Hivernage ?",
        answer: "Position centrale idéale ! Vallée Ourika (1h), Essaouira (2h30), Atlas (1h), Agafay (45min) facilement accessibles. Voiture indispensable pour excursions."
      }
    ]
  },
  {
    slug: "location-voiture-medina-marrakech",
    name: "Médina",
    city: "Marrakech",
    citySlug: "marrakech",
    title: "Location Voiture Médina Marrakech | Jemaa el-Fna - Benatna",
    metaDescription: "Location de voiture près Médina Marrakech. Livraison Jemaa el-Fna, remparts, riads. Prix dès 250 DH/jour. Parking sécurisé.",
    h1: "Location de Voiture près de la Médina - Jemaa el-Fna Marrakech",
    description: "La Médina de Marrakech, cœur historique classé UNESCO. Souks labyrinthiques, Place Jemaa el-Fna, palais, riads. Bien que piétonne, une voiture est utile pour accéder et explorer alentours.",
    highlights: [
      "Place Jemaa el-Fna - cœur battant",
      "Souks traditionnels labyrinthiques",
      "Palais Bahia et Badi",
      "Riads authentiques",
      "Médina UNESCO piétonne"
    ],
    landmarks: [
      "Place Jemaa el-Fna (0 km)",
      "Souks de Marrakech (0.5 km)",
      "Palais Bahia (1 km)",
      "Jardins de la Koutoubia (0.5 km)",
      "Palais Badi (1.5 km)"
    ],
    deliveryPoints: [
      {
        name: "Parking Jemaa el-Fna",
        address: "Place Jemaa el-Fna",
        latitude: "31.6259",
        longitude: "-7.9893",
        description: "Parking principal Médina, 20 DH/jour"
      },
      {
        name: "Parking Bab Doukkala",
        address: "Bab Doukkala, entrée Médina",
        latitude: "31.6320",
        longitude: "-7.9950",
        description: "Parking nord Médina, proche souks"
      },
      {
        name: "Riads Médina (accès piéton)",
        address: "Dédales Médina",
        latitude: "31.6280",
        longitude: "-7.9900",
        description: "Livraison parking proche + porteur riad"
      }
    ],
    popularVehicles: ["Dacia Sandero", "Renault Clio", "Toyota Yaris", "Dacia Duster"],
    tips: [
      "Médina 100% piétonne, garer voiture parking",
      "Parking Jemaa el-Fna recommandé (20 DH/jour, sécurisé)",
      "Porteurs disponibles pour bagages vers riads",
      "Voiture utile pour excursions depuis Marrakech"
    ],
    faqs: [
      {
        question: "Peut-on circuler en voiture dans Médina ?",
        answer: "Non, Médina 100% piétonne. Voiture à garer parking périphérique (Jemaa el-Fna, Bab Doukkala, Koutoubia). Porteurs disponibles pour bagages vers riads (50-100 DH selon distance)."
      },
      {
        question: "Parking sécurisé près Médina ?",
        answer: "Parking Jemaa el-Fna le plus pratique : 20 DH/jour, gardienné 24/7, direct place. Autres : Parking Koutoubia, Bab Doukkala. Tous sécurisés."
      },
      {
        question: "Voiture utile si logement Médina ?",
        answer: "Oui pour excursions ! Vallée Ourika, Essaouira, Atlas, Agafay nécessitent voiture. En ville, Médina piétonne mais voiture utile Guéliz, aéroport, sorties."
      }
    ]
  },
  {
    slug: "location-voiture-palmeraie-marrakech",
    name: "Palmeraie",
    city: "Marrakech",
    citySlug: "marrakech",
    title: "Location Voiture Palmeraie Marrakech | Oasis Luxury - Benatna",
    metaDescription: "Location de voiture à la Palmeraie Marrakech. Livraison resorts 5*, golfs, villas. Prix dès 250 DH/jour. Idéal séjour luxe.",
    h1: "Location de Voiture à la Palmeraie - Oasis de Luxe Marrakech",
    description: "La Palmeraie, oasis de 15 000 palmiers au nord de Marrakech. Resorts ultra-luxe, golfs prestigieux, villas de stars. Cadre unique mêlant nature et grand luxe.",
    highlights: [
      "Oasis de 15 000 palmiers",
      "Resorts ultra-luxe 5 étoiles",
      "Golfs prestigieux (Palmeraie Golf Palace)",
      "Villas privées et riads exclusifs",
      "Activités quad et buggy"
    ],
    landmarks: [
      "Palmeraie Golf Palace (2 km)",
      "Palais Namaskar (3 km)",
      "Centre Marrakech (8 km)",
      "Aéroport Marrakech (15 km)",
      "Atlas Mountains vue (20 km)"
    ],
    deliveryPoints: [
      {
        name: "Resorts Palmeraie",
        address: "Route de la Palmeraie",
        latitude: "31.6800",
        longitude: "-8.0200",
        description: "Livraison resorts 5* avec voiturier"
      },
      {
        name: "Golfs Palmeraie",
        address: "Circuit de la Palmeraie",
        latitude: "31.6850",
        longitude: "-8.0150",
        description: "Livraison club houses des golfs"
      },
      {
        name: "Villas Privées Palmeraie",
        address: "Zone résidentielle Palmeraie",
        latitude: "31.6750",
        longitude: "-8.0250",
        description: "Livraison villa privée"
      }
    ],
    popularVehicles: ["Mercedes Classe A", "BMW Série 3", "Audi Q3", "Range Rover Evoque", "Porsche Macan"],
    tips: [
      "Voiture indispensable, Palmeraie éloignée (8 km centre)",
      "Routes calmes et agréables, cadre palmiers",
      "Resorts avec parkings privés et voituriers",
      "Parfait pour excursions Atlas et désert Agafay"
    ],
    faqs: [
      {
        question: "Voiture nécessaire à la Palmeraie ?",
        answer: "Absolument ! Palmeraie à 8 km du centre, taxis rares et chers. Voiture indispensable pour déplacements centre, restaurants, excursions. Resorts proposent navettes mais limitées."
      },
      {
        question: "Véhicules luxe pour Palmeraie ?",
        answer: "Oui, gamme premium disponible : Mercedes, BMW, Audi, Range Rover, Porsche. Adaptés au standing resorts Palmeraie. Livraison voiturier resort, service conciergerie."
      },
      {
        question: "Excursions depuis Palmeraie ?",
        answer: "Position Nord idéale ! Atlas proche (45 min), Ourika (1h), Agafay (30 min). Accès rapide autoroutes. Palmeraie parfaite base excursions nature."
      }
    ]
  },
  {
    slug: "location-voiture-route-ourika-marrakech",
    name: "Route de l'Ourika",
    city: "Marrakech",
    citySlug: "marrakech",
    title: "Location Voiture Route Ourika Marrakech | Vallée Atlas - Benatna",
    metaDescription: "Location de voiture Route Ourika Marrakech. Livraison route vallée, villages berbères. Prix dès 250 DH/jour. Idéal escapades nature vers l'Atlas.",
    h1: "Location de Voiture Route de l'Ourika - Vallée de l'Atlas",
    description: "Route de l'Ourika, porte d'entrée vers la vallée verdoyante de l'Atlas. Villages berbères, restaurants au bord de l'oued, artisanat, point de départ randonnées. Échappée nature à 30 min de Marrakech.",
    highlights: [
      "Vallée verdoyante Atlas",
      "Villages berbères authentiques",
      "Restaurants bord de l'oued",
      "Cascades Setti Fatma",
      "Artisanat berbère local"
    ],
    landmarks: [
      "Aghmat Village (10 km)",
      "Tnine Ourika Souk (25 km)",
      "Setti Fatma Cascades (60 km)",
      "Centre Marrakech (15 km)",
      "Oukaïmeden Ski (70 km)"
    ],
    deliveryPoints: [
      {
        name: "Début Route Ourika",
        address: "Route de l'Ourika RN9",
        latitude: "31.5800",
        longitude: "-7.9500",
        description: "Livraison départ route vallée"
      },
      {
        name: "Villages Route Ourika",
        address: "Aghmat / Tnine Ourika",
        latitude: "31.5200",
        longitude: "-7.8800",
        description: "Livraison villages vallée Ourika"
      },
      {
        name: "Hôtels Route Ourika",
        address: "Auberges vallée Ourika",
        latitude: "31.5500",
        longitude: "-7.9200",
        description: "Livraison auberges/hôtels vallée"
      }
    ],
    popularVehicles: ["Dacia Duster", "Dacia Duster", "Toyota RAV4", "Dacia Sandero", "Nissan Qashqai"],
    tips: [
      "SUV recommandé pour routes sinueuses vallée",
      "Route panoramique magnifique, prévoir pauses photo",
      "Restaurants bord oued pour déjeuner traditionnel",
      "Souk Tnine Ourika le lundi (grand souk hebdomadaire)"
    ],
    faqs: [
      {
        question: "Quel véhicule pour Route Ourika ?",
        answer: "SUV fortement recommandé ! Dacia Duster, Dacia Duster, Toyota RAV4 parfaits. Route sinueuse, pentes, confort nécessaire. Citadine possible mais moins confortable."
      },
      {
        question: "État de la route Ourika ?",
        answer: "Route N9 bien goudronnée et entretenue. Sinueuse avec virages mais praticable citadine. Derniers km vers Setti Fatma plus étroits, SUV préférable. Belle route panoramique."
      },
      {
        question: "Que faire Route Ourika ?",
        answer: "Déjeuner restaurants bord oued, visiter villages berbères, artisanat local, randonnée Setti Fatma cascades, souk Tnine (lundi), coopératives argan/safran. Journée complète idéale."
      }
    ]
  }
];

// Helper pour obtenir quartiers par ville
export const getNeighborhoodsByCity = (citySlug: string): Neighborhood[] => {
  return neighborhoods.filter(n => n.citySlug === citySlug);
};
