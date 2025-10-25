export interface BlogArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  content: string[];
}

export const blogArticles: BlogArticle[] = [
  {
    id: 1,
    slug: "conseils-conduite-maroc",
    title: "10 conseils essentiels pour conduire au Maroc",
    excerpt: "Découvrez les bonnes pratiques et règles de conduite pour rouler en toute sécurité sur les routes marocaines.",
    category: "Conduite",
    date: "15 janvier 2025",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=600&fit=crop",
    content: [
      "Conduire au Maroc est une expérience unique qui demande de l'adaptation. Que vous soyez touriste ou résident, ces conseils vous aideront à circuler en toute sécurité.",
      
      "## Les limites de vitesse à respecter",
      "- Autoroute : 120 km/h (payante, très bien entretenue)",
      "- Route nationale : 100 km/h",
      "- En agglomération : 60 km/h (parfois 40 km/h près des écoles)",
      "Les radars automatiques sont présents sur les autoroutes et certaines nationales. Les amendes sont envoyées par courrier au propriétaire du véhicule.",
      
      "## La conduite en ville",
      "La circulation urbaine au Maroc a ses particularités. Les priorités ne sont pas toujours respectées aux intersections, même quand elles sont clairement indiquées. Il faut être particulièrement vigilant aux ronds-points où la règle de priorité à droite n'est pas systématiquement appliquée.",
      
      "Les deux-roues circulent souvent entre les files et peuvent surgir de n'importe où. Vérifiez toujours vos rétroviseurs avant de changer de voie.",
      
      "Le klaxon est utilisé fréquemment, mais avec parcimonie. Un coup bref pour signaler votre présence est acceptable, mais évitez les klaxonnements agressifs.",
      
      "## Sur les routes rurales",
      "Les routes de campagne peuvent présenter des surprises : animaux (moutons, chèvres, ânes), charrettes, tracteurs lents, ou encore piétons marchant sur la chaussée. Réduisez votre vitesse et restez attentif.",
      
      "Évitez de conduire la nuit sur les routes secondaires. L'éclairage public est rare, et certains véhicules circulent avec des feux défaillants.",
      
      "## Les documents obligatoires",
      "Gardez toujours avec vous :",
      "- Votre permis de conduire (français ou international accepté)",
      "- La carte grise du véhicule (fournie par l'agence)",
      "- L'attestation d'assurance",
      "- Le contrat de location",
      
      "## Le stationnement",
      "Dans les villes, les gardiens de parking sont omniprésents. Ils portent généralement un gilet ou un badge. Donnez leur 2 à 5 MAD pour quelques heures, ou 5 à 10 MAD pour une journée. C'est une pratique courante et ils surveillent réellement votre voiture.",
      
      "Ne laissez jamais d'objets de valeur visibles dans l'habitacle, même avec un gardien.",
      
      "## Les autoroutes",
      "Le réseau autoroutier marocain est moderne et très bien entretenu. À l'entrée, prenez un ticket au péage. À la sortie, vous payez selon la distance parcourue (environ 0,80 MAD/km). Les cartes bancaires internationales sont acceptées.",
      
      "Des stations-service sont présentes tous les 50-70 km avec toilettes, cafés et boutiques.",
      
      "## En cas de problème",
      "Si vous avez une panne ou un accident :",
      "1. Contactez immédiatement votre agence de location",
      "2. En cas d'accident avec des tiers, appelez la police (190)",
      "3. Ne déplacez pas les véhicules avant l'arrivée de la police",
      "4. Remplissez un constat amiable si possible",
      "5. Prenez des photos des dégâts et de la scène",
      
      "## Le carburant",
      "Faites le plein dans les stations officielles (Total, Shell, Afriquia). Les prix sont fixes partout. Un pompiste fera le service, un petit pourboire de 2-5 MAD est apprécié.",
      
      "Sur les longs trajets vers le désert, faites le plein dès que possible car les stations peuvent être espacées de 100 km ou plus.",
      
      "## Les contrôles de police",
      "Les barrages de police sont fréquents, surtout à l'entrée et sortie des villes. Ralentissez, soyez poli et coopératif. Ayez vos documents à portée de main. Les contrôles sont généralement rapides si tout est en règle.",
      
      "## Dernier conseil",
      "Restez zen et patient. Le style de conduite marocain peut sembler chaotique au début, mais en étant attentif et prudent, vous vous adapterez rapidement. N'hésitez pas à conduire de manière défensive et à anticiper les comportements imprévisibles."
    ]
  },
  {
    id: 2,
    slug: "road-trips-maroc",
    title: "Les plus beaux road trips au Maroc en voiture",
    excerpt: "De Marrakech à Merzouga, découvrez les itinéraires incontournables pour explorer le Maroc en liberté.",
    category: "Tourisme",
    date: "10 janvier 2025",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop",
    content: [
      "Le Maroc est un pays qui se découvre merveilleusement bien en voiture. Voici trois itinéraires testés et approuvés qui vous feront découvrir la diversité du royaume.",
      
      "## Itinéraire 1 : La Route des Kasbahs (Marrakech - Merzouga)",
      "### Durée recommandée : 4 à 5 jours",
      "### Distance totale : environ 850 km",
      
      "Cet itinéraire mythique vous mène de Marrakech aux dunes de Merzouga en traversant l'Atlas et les vallées du Sud.",
      
      "### Jour 1 : Marrakech - Ouarzazate (190 km)",
      "Partez tôt de Marrakech pour franchir le col du Tizi n'Tichka (2 260m d'altitude). La route serpente à travers l'Atlas avec des panoramas spectaculaires. Arrêtez-vous à la kasbah d'Aït Benhaddou, classée UNESCO, avant d'arriver à Ouarzazate.",
      
      "Temps de trajet : 4h (avec arrêts photos)",
      
      "### Jour 2 : Ouarzazate - Gorges du Dadès (110 km)",
      "Traversez la Vallée des Roses et les palmeraies du Dadès. Les gorges offrent des paysages lunaires époustouflants. Nuitée dans un hôtel au cœur des gorges.",
      
      "### Jour 3 : Dadès - Merzouga (280 km)",
      "Visitez les Gorges du Todra le matin (canyon de 300m de haut), puis direction Merzouga. Arrivée en fin d'après-midi pour assister au coucher de soleil sur les dunes de l'Erg Chebbi.",
      
      "### Véhicule recommandé",
      "Un SUV ou 4x4 est idéal pour plus de confort sur certains tronçons sinueux, mais une berline passe très bien sur la route goudronnée principale.",
      
      "## Itinéraire 2 : La Côte Atlantique (Casablanca - Agadir)",
      "### Durée recommandée : 3 à 4 jours",
      "### Distance totale : environ 550 km",
      
      "Un parcours relaxant le long de l'océan, parfait pour les amateurs de plages et de fruits de mer frais.",
      
      "### Jour 1 : Casablanca - El Jadida (100 km)",
      "Visitez la Mosquée Hassan II à Casablanca le matin, puis direction El Jadida et sa cité portugaise fortifiée. Profitez de la plage et des restaurants de poisson frais.",
      
      "### Jour 2 : El Jadida - Essaouira (200 km)",
      "Arrêtez-vous à Oualidia pour déguster des huîtres fraîches directement dans les parcs ostréicoles. Arrivée à Essaouira, ville côtière aux remparts blancs et bleus, parfaite pour le surf.",
      
      "### Jour 3 : Essaouira - Agadir (175 km)",
      "Prenez votre temps le long de la côte. Arrêtez-vous dans les petits villages de pêcheurs. Agadir offre une longue promenade en bord de mer et des restaurants modernes.",
      
      "### Véhicule recommandé",
      "Une berline ou citadine suffit amplement. Les routes sont excellentes.",
      
      "## Itinéraire 3 : Le Nord Montagneux (Tanger - Fès)",
      "### Durée recommandée : 4 jours",
      "### Distance totale : environ 400 km",
      
      "Découvrez le Rif, Chefchaouen la ville bleue, et la médina impériale de Fès.",
      
      "### Jour 1 : Tanger - Chefchaouen (115 km)",
      "Quittez Tanger pour les montagnes du Rif. Arrivée à Chefchaouen, célèbre pour ses ruelles et maisons peintes en bleu. Deux nuits conseillées pour profiter de l'atmosphère unique.",
      
      "### Jour 2 : Journée à Chefchaouen",
      "Explorez la médina, randonnez jusqu'à la cascade d'Akchour (30 min en voiture + 1h de marche), et flânez dans les souks artisanaux.",
      
      "### Jour 3 : Chefchaouen - Fès (200 km via Ouazzane)",
      "Route panoramique à travers les collines. Arrivée à Fès en fin d'après-midi. Deux nuits pour découvrir la plus grande médina du monde.",
      
      "### Véhicule recommandé",
      "Berline confortable. Les routes sont bonnes mais sinueuses dans le Rif.",
      
      "## Conseils pratiques pour tous les road trips",
      
      "### Quand partir",
      "- Printemps (mars-mai) et automne (septembre-novembre) : températures idéales partout",
      "- Été : évitez le Sud en juillet-août (chaleur extrême), privilégiez la côte et le Nord",
      "- Hiver : possible mais froid dans l'Atlas et le désert la nuit",
      
      "### Budget quotidien",
      "- Location voiture : 300-600 MAD/jour selon catégorie",
      "- Essence : environ 200-300 MAD/jour selon distance",
      "- Hébergement : 300-800 MAD/nuit (guesthouse à hôtel moyen)",
      "- Repas : 150-300 MAD/personne/jour",
      "- Total pour 2 personnes : 1500-2500 MAD/jour",
      
      "### Réservations",
      "En haute saison (avril, mai, octobre, vacances), réservez hébergements et voiture à l'avance. En basse saison, vous pouvez être plus spontané.",
      
      "### Sécurité",
      "Tous ces itinéraires sont parfaitement sûrs. Les routes principales sont bien entretenues. Emportez de l'eau, des snacks, et gardez votre téléphone chargé.",
      
      "Bon road trip !"
    ]
  },
  {
    id: 3,
    slug: "assurance-voiture-maroc",
    title: "Comprendre l'assurance voiture au Maroc",
    excerpt: "Tout ce que vous devez savoir sur l'assurance, la franchise et la protection lors de votre location.",
    category: "Assurance",
    date: "5 janvier 2025",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop",
    content: [
      "L'assurance est souvent source de confusion lors d'une location de voiture. Voici tout ce que vous devez savoir pour louer en toute sérénité au Maroc.",
      
      "## Les types d'assurance disponibles",
      
      "### Assurance au tiers (obligatoire)",
      "C'est l'assurance minimale légale au Maroc. Elle couvre :",
      "- Les dommages matériels causés aux autres véhicules",
      "- Les blessures causées aux autres personnes",
      "- Elle ne couvre PAS les dommages à votre véhicule de location",
      
      "Prix : généralement incluse dans le tarif de base",
      
      "### Assurance tous risques (recommandée)",
      "C'est l'option la plus complète. Elle couvre :",
      "- Tous les dommages au véhicule loué (collision, accrochage)",
      "- Le vol du véhicule",
      "- L'incendie",
      "- Le bris de glace (pare-brise, vitres)",
      "- Les dommages causés aux tiers",
      
      "Prix : supplément de 80 à 150 MAD par jour selon le véhicule",
      
      "Notre conseil : prenez toujours l'assurance tous risques. Le surcoût est minimal comparé au risque financier.",
      
      "## La franchise : ce qui reste à votre charge",
      
      "### Qu'est-ce que la franchise ?",
      "Même avec une assurance tous risques, vous restez responsable d'une partie des dégâts en cas de sinistre. C'est la franchise.",
      
      "### Montants typiques",
      "- Citadine économique : 3 000 à 5 000 MAD",
      "- Berline : 5 000 à 7 000 MAD",
      "- SUV : 7 000 à 10 000 MAD",
      "- 4x4 premium : 10 000 à 15 000 MAD",
      
      "### Option rachat de franchise",
      "Certaines agences proposent de réduire ou supprimer la franchise moyennant un supplément de 50 à 100 MAD par jour. C'est intéressant pour les locations longues ou si vous n'êtes pas à l'aise au volant.",
      
      "## Ce qui est couvert",
      
      "### Avec l'assurance tous risques",
      "- Accidents de circulation (même si vous êtes responsable)",
      "- Collision avec un autre véhicule",
      "- Accrochage avec un obstacle (mur, poteau)",
      "- Vol du véhicule (si vous avez les clés et les papiers)",
      "- Incendie",
      "- Bris de glace du pare-brise et vitres",
      
      "### Cas particuliers souvent couverts",
      "- Crevaison : généralement couverte, roue de secours fournie",
      "- Panne mécanique : assistance dépannage incluse",
      "- Perte des clés : franchise spécifique (souvent 500-1000 MAD)",
      
      "## Ce qui n'est PAS couvert",
      
      "### Exclusions importantes",
      "- Négligence grave (oublier de fermer les portes, laisser les clés sur le contact)",
      "- Conduite en état d'ivresse ou sous stupéfiants",
      "- Conduite par une personne non déclarée sur le contrat",
      "- Dommages au bas de caisse sur pistes non autorisées",
      "- Rouler dans des oueds (rivières) ou zones inondées",
      "- Utilisation du véhicule pour des courses ou compétitions",
      "- Intérieur du véhicule (sièges, tableau de bord) sauf incendie",
      
      "### Cas réel à éviter",
      "Un client a endommagé le bas de caisse en prenant une piste rocailleuse non autorisée vers les cascades d'Ouzoud. L'assurance n'a pas couvert les 8 000 MAD de réparations car il n'avait pas loué un 4x4 et la piste était interdite aux véhicules standards.",
      
      "## Documents à avoir en cas d'accident",
      
      "### Le constat amiable",
      "Fourni par l'agence dans la boîte à gants. À remplir avec l'autre conducteur si possible, même pour un accrochage mineur.",
      
      "### Photos obligatoires",
      "Prenez des photos de :",
      "- La scène de l'accident (vue d'ensemble)",
      "- Les dégâts sur votre véhicule (tous les angles)",
      "- Les dégâts sur l'autre véhicule",
      "- La plaque d'immatriculation de l'autre véhicule",
      "- La carte grise de l'autre véhicule si possible",
      
      "### Coordonnées des témoins",
      "Si des témoins ont vu l'accident, notez leurs noms et numéros de téléphone.",
      
      "## Procédure en cas de sinistre",
      
      "### 1. Sécurisez la zone",
      "Allumez vos feux de détresse. Placez un triangle de signalisation si vous en avez un.",
      
      "### 2. Appelez l'agence immédiatement",
      "Le numéro d'urgence est sur votre contrat. Disponible 24h/24.",
      
      "### 3. Appelez la police si nécessaire",
      "- Accident avec blessés : obligatoire (190)",
      "- Dégâts importants : fortement recommandé",
      "- Désaccord avec l'autre partie : obligatoire",
      
      "### 4. Remplissez le constat",
      "Soyez précis mais factuel. Dessinez un schéma simple de l'accident.",
      
      "### 5. Ne reconnaissez pas votre responsabilité",
      "Soyez courtois mais ne signez rien que vous ne comprenez pas. Ne dites pas 'c'est ma faute', laissez l'assurance déterminer les responsabilités.",
      
      "## Vérification du véhicule avant départ",
      
      "### État extérieur (crucial !)",
      "Faites le tour complet du véhicule avec l'agent de l'agence :",
      "- Notez tous les petits coups, rayures, bosses existantes",
      "- Prenez des photos de chaque côté du véhicule",
      "- Vérifiez les rétroviseurs, les phares, les feux",
      "- Contrôlez l'état des pneus",
      
      "### État intérieur",
      "- Vérifiez la propreté des sièges",
      "- Testez la climatisation",
      "- Assurez-vous que tous les boutons fonctionnent",
      
      "### Documents dans le véhicule",
      "- Carte grise",
      "- Attestation d'assurance",
      "- Constat amiable vierge",
      "- Triangle de signalisation",
      "- Gilet de sécurité",
      
      "## Carte bancaire et caution",
      
      "### Préautorisation",
      "L'agence bloque généralement sur votre carte le montant de la franchise (3 000 à 15 000 MAD selon le véhicule). Cette somme n'est pas débitée, juste bloquée.",
      
      "### Déblocage",
      "Si vous rendez le véhicule sans dommage, le déblocage se fait sous 7 à 21 jours selon votre banque. Attention : ce délai dépend de votre banque, pas de l'agence.",
      
      "### Conseil",
      "Utilisez une carte de crédit, pas de débit. Certaines cartes bancaires Premium incluent une assurance location véhicule (vérifiez avant).",
      
      "## En résumé",
      
      "Pour louer sereinement :",
      "1. Prenez l'assurance tous risques (80-150 MAD/jour)",
      "2. Vérifiez minutieusement le véhicule et prenez des photos avant de partir",
      "3. Conduisez prudemment et respectez les limitations",
      "4. En cas de problème, contactez immédiatement l'agence",
      "5. Ne prenez pas de pistes non autorisées",
      
      "Avec ces précautions, vous profiterez de votre location en toute tranquillité !"
    ]
  },
  {
    id: 4,
    slug: "budget-location-maroc",
    title: "Budget location de voiture au Maroc : guide complet",
    excerpt: "Combien coûte vraiment une location de voiture ? Nos conseils pour optimiser votre budget.",
    category: "Budget",
    date: "28 décembre 2024",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=600&fit=crop",
    content: [
      "Louer une voiture au Maroc est plus abordable qu'en Europe, mais encore faut-il connaître tous les coûts pour bien budgéter son voyage. Voici un guide transparent et détaillé.",
      
      "## Prix de location par catégorie",
      
      "### Citadine économique (Renault Clio, Dacia Sandero, Hyundai i10)",
      "- Basse saison (nov-mars sauf vacances) : 200-280 MAD/jour",
      "- Moyenne saison : 280-350 MAD/jour",
      "- Haute saison (avril-mai, sept-oct, vacances) : 350-450 MAD/jour",
      
      "Idéal pour : ville, courts trajets, 2 personnes avec peu de bagages",
      
      "### Berline confort (Toyota Corolla, Volkswagen Jetta, Renault Mégane)",
      "- Basse saison : 350-450 MAD/jour",
      "- Moyenne saison : 450-550 MAD/jour",
      "- Haute saison : 550-700 MAD/jour",
      
      "Idéal pour : longs trajets, 4 personnes, confort supérieur",
      
      "### SUV compact (Dacia Duster, Peugeot 2008, Nissan Qashqai)",
      "- Basse saison : 450-600 MAD/jour",
      "- Moyenne saison : 600-750 MAD/jour",
      "- Haute saison : 750-1000 MAD/jour",
      
      "Idéal pour : road trips, routes sinueuses, 4-5 personnes avec bagages",
      
      "### 4x4 premium (Toyota Prado, Range Rover, Mercedes GLE)",
      "- Basse saison : 900-1200 MAD/jour",
      "- Moyenne saison : 1200-1500 MAD/jour",
      "- Haute saison : 1500-2000 MAD/jour",
      
      "Idéal pour : pistes désert, grand confort, groupes 5-6 personnes",
      
      "## Tarifs dégressifs selon la durée",
      
      "La plupart des agences appliquent des réductions pour les locations longues :",
      
      "- 1-2 jours : tarif plein",
      "- 3-6 jours : -5 à -10%",
      "- 7-13 jours : -10 à -15%",
      "- 14-20 jours : -15 à -20%",
      "- 21-29 jours : -20 à -25%",
      "- 30 jours et plus : -25 à -30% (tarif mensuel négociable)",
      
      "Exemple concret : Renault Clio",
      "- 3 jours en haute saison : 400 x 3 = 1200 MAD",
      "- 7 jours avec -15% : 400 x 7 x 0.85 = 2380 MAD (340 MAD/jour)",
      
      "## Frais additionnels à prévoir",
      
      "### Assurance tous risques",
      "- Citadine : +80-100 MAD/jour",
      "- Berline : +100-120 MAD/jour",
      "- SUV/4x4 : +120-150 MAD/jour",
      
      "Cette assurance est fortement recommandée (voir notre article dédié).",
      
      "### Conducteur supplémentaire",
      "- 50-100 MAD/jour selon l'agence",
      "- Parfois gratuit pour le conjoint, vérifiez !",
      "- Le conducteur additionnel doit avoir son permis depuis minimum 1 an",
      
      "### Jeune conducteur (moins de 25 ans)",
      "- Supplément de 50-100 MAD/jour",
      "- Permis requis depuis minimum 2 ans",
      "- Certaines agences refusent les moins de 21 ans",
      "- Franchise souvent majorée pour les jeunes conducteurs",
      
      "### Équipements optionnels",
      "- GPS : généralement gratuit ou 30-50 MAD/jour (votre smartphone fait l'affaire)",
      "- Siège bébé : 30-50 MAD/jour",
      "- Siège enfant : 30-50 MAD/jour",
      "- Chaînes à neige : gratuites en hiver sur demande",
      "- Porte-skis : 50 MAD/jour (rare au Maroc !)",
      
      "### Livraison/récupération",
      "- Aéroport : souvent gratuit",
      "- Hôtel en ville : 50-200 MAD selon la distance",
      "- Entre villes : 200-500 MAD selon distance",
      "- Restitution dans une autre ville : 500-1500 MAD selon les villes",
      
      "## Le carburant",
      
      "### Prix actuels (janvier 2025)",
      "- Essence sans plomb : environ 13,50 MAD/litre",
      "- Gasoil : environ 11,50 MAD/litre",
      
      "Ces prix sont fixes dans tout le Maroc (réglementés par l'État).",
      
      "### Consommation moyenne",
      "- Citadine : 6-7 L/100km = 78-95 MAD/100km",
      "- Berline : 7-8 L/100km = 95-108 MAD/100km",
      "- SUV : 8-10 L/100km = 108-135 MAD/100km",
      "- 4x4 : 10-13 L/100km = 135-175 MAD/100km",
      
      "### Estimation pour 1000 km",
      "- Citadine : 780-950 MAD",
      "- Berline : 950-1080 MAD",
      "- SUV : 1080-1350 MAD",
      "- 4x4 : 1350-1750 MAD",
      
      "### Plein pour plein",
      "La règle standard : vous récupérez le véhicule avec le plein, vous le rendez avec le plein. Faites le plein dans une station juste avant de rendre le véhicule. Si vous ne le faites pas, l'agence appliquera un tarif majoré de 15-18 MAD/litre.",
      
      "## Les péages autoroutiers",
      
      "Le Maroc dispose d'un excellent réseau autoroutier payant.",
      
      "### Tarifs par trajet (voiture légère)",
      "- Casablanca - Rabat (90 km) : 20 MAD",
      "- Rabat - Tanger (220 km) : 75 MAD",
      "- Casablanca - Marrakech (240 km) : 65 MAD",
      "- Casablanca - Agadir (480 km) : 115 MAD",
      "- Marrakech - Agadir (240 km) : 55 MAD",
      
      "Moyennement : comptez environ 0,30 à 0,35 MAD par kilomètre d'autoroute.",
      
      "## Le stationnement",
      
      "### Gardiens informels",
      "- Quelques heures : 2-5 MAD",
      "- Journée complète : 5-10 MAD",
      "- Nuit : 10-20 MAD",
      
      "### Parkings officiels surveillés",
      "- Heure : 5-10 MAD",
      "- Journée : 30-50 MAD",
      "- Nuit (hôtel) : 20-50 MAD",
      
      "### Zones bleues (horodateurs)",
      "- Centre-ville Casablanca, Rabat, Marrakech : 2-5 MAD/heure",
      
      "Budget parking moyen : 30-80 MAD/jour selon vos déplacements.",
      
      "## Estimation de budget complet",
      
      "### Exemple 1 : Week-end à Marrakech (3 jours)",
      "- Citadine en moyenne saison : 300 x 3 = 900 MAD",
      "- Assurance tous risques : 90 x 3 = 270 MAD",
      "- Carburant (200 km) : 150 MAD",
      "- Parking : 30 MAD",
      "**Total : 1 350 MAD (environ 125€)**",
      
      "### Exemple 2 : Road trip Marrakech-Merzouga (7 jours)",
      "- SUV en haute saison avec -10% : 850 x 7 x 0.9 = 5 355 MAD",
      "- Assurance tous risques : 130 x 7 = 910 MAD",
      "- Carburant (1 700 km) : 2 100 MAD",
      "- Parking : 150 MAD",
      "**Total : 8 515 MAD (environ 800€) soit 400€ par personne pour 2**",
      
      "### Exemple 3 : Mois complet pour digital nomad",
      "- Berline location mensuelle (-25%) : 500 x 30 x 0.75 = 11 250 MAD",
      "- Assurance tous risques : 110 x 30 = 3 300 MAD",
      "- Carburant (2 000 km) : 2 000 MAD",
      "- Parking mensuel : 500 MAD",
      "**Total : 17 050 MAD (environ 1 600€)**",
      
      "## Conseils pour économiser",
      
      "### 1. Réservez à l'avance",
      "Les prix augmentent à mesure que la date approche, surtout en haute saison. Réservez 2-3 semaines minimum à l'avance, idéalement 1-2 mois.",
      
      "### 2. Comparez sur Benatna",
      "Notre plateforme regroupe les offres de plusieurs agences locales fiables. Vous pouvez économiser 20-40% par rapport aux franchises internationales.",
      
      "### 3. Privilégiez les locations longues",
      "Si vous hésitez entre 6 ou 7 jours, prenez 7 jours. Le tarif dégressif rend souvent le jour supplémentaire très avantageux.",
      
      "### 4. Vérifiez ce qui est inclus",
      "- Kilométrage illimité (standard sur Benatna)",
      "- Deuxième conducteur gratuit",
      "- GPS/porte-téléphone fourni",
      "- Récupération/restitution aéroport gratuite",
      
      "### 5. Carte bancaire avec assurance",
      "Certaines cartes bancaires (Visa Premier, Mastercard Gold, Amex) incluent une assurance location voiture. Vérifiez les conditions et franchises auprès de votre banque avant de partir.",
      
      "### 6. Évitez les frais de retard",
      "Rendez le véhicule à l'heure prévue. Un retard de plus d'une heure entraîne généralement la facturation d'une journée supplémentaire.",
      
      "### 7. Faites le plein vous-même",
      "Toujours moins cher que de payer l'agence pour le faire (tarif majoré de 3-5 MAD/litre).",
      
      "## Paiement et caution",
      
      "### Modes de paiement acceptés",
      "- Carte bancaire (Visa, Mastercard) : le plus courant",
      "- Espèces : acceptées par certaines agences locales",
      "- Virement : pour les locations longues (à organiser à l'avance)",
      
      "### Caution (dépôt de garantie)",
      "Une préautorisation est faite sur votre carte bancaire pour le montant de la franchise :",
      "- Citadine : 3 000-5 000 MAD",
      "- Berline : 5 000-7 000 MAD",
      "- SUV : 7 000-10 000 MAD",
      "- 4x4 : 10 000-15 000 MAD",
      
      "Cette somme est bloquée, pas débitée. Elle est débloquée 7-21 jours après la restitution si le véhicule est rendu sans dommage (délai bancaire).",
      
      "## Récapitulatif : le vrai coût journalier",
      
      "Pour une location complète en haute saison avec assurance tous risques et utilisation normale (100 km/jour) :",
      
      "- **Citadine : 550-650 MAD/jour** (50-60€)",
      "- **Berline : 750-900 MAD/jour** (70-85€)",
      "- **SUV : 1 100-1 400 MAD/jour** (100-130€)",
      "- **4x4 : 1 800-2 300 MAD/jour** (170-215€)",
      
      "Ces tarifs incluent : location + assurance tous risques + carburant moyen + parking moyen.",
      
      "Avec ces informations, vous pouvez budgéter précisément votre location au Maroc !"
    ]
  },
  {
    id: 5,
    slug: "stationnement-maroc",
    title: "Stationnement au Maroc : tout ce qu'il faut savoir",
    excerpt: "Parkings surveillés, gardiens, zones bleues... Le guide pratique du stationnement dans les villes marocaines.",
    category: "Pratique",
    date: "20 décembre 2024",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1200&h=600&fit=crop",
    content: [
      "Le stationnement au Maroc a ses propres codes et spécificités. Ce guide vous explique comment vous garer en toute sécurité et sérénité.",
      
      "## Les gardiens de parking informels",
      
      "### Qui sont-ils ?",
      "Présents dans pratiquement toutes les rues des villes marocaines, les gardiens de parking sont des personnes qui surveillent votre véhicule en échange d'un petit pourboire. Ils portent généralement un gilet réfléchissant ou un badge fourni par la commune.",
      
      "### Comment ça fonctionne ?",
      "1. Vous vous garez dans une rue",
      "2. Un gardien s'approche (souvent il vous aide à vous garer)",
      "3. Il reste à proximité et surveille votre voiture",
      "4. Au retour, vous lui donnez un pourboire",
      
      "### Combien donner ?",
      "Les tarifs non officiels mais généralement pratiqués :",
      "- Quelques heures (courses rapides) : 2-5 MAD",
      "- Une demi-journée : 5-10 MAD",
      "- Toute la journée : 10-20 MAD",
      "- La nuit : 20-30 MAD",
      
      "Conseil : donnez plutôt 5 MAD que 2 MAD. C'est une différence minime pour vous (30 centimes), mais significative pour eux. Ils seront encore plus vigilants.",
      
      "### Est-ce obligatoire ?",
      "Non, légalement vous n'êtes pas obligé. Mais c'est une pratique très ancrée et il est fortement conseillé de participer. Les gardiens connaissent le quartier, dissuadent les voleurs, et peuvent vous aider en cas de problème.",
      
      "### Sont-ils efficaces ?",
      "Oui, dans l'ensemble. Les vols de voitures ou dans les voitures sont rares dans les zones surveillées par des gardiens. Ils sont présents et attentifs.",
      
      "### Le bon comportement",
      "- Soyez aimable, un sourire et un 'salam' sont appréciés",
      "- Acceptez leur aide pour vous garer si besoin",
      "- Payez-les en partant, pas en arrivant",
      "- Ayez de la petite monnaie (billets de 5, 10, 20 MAD)",
      "- Ne discutez pas le montant, c'est dérisoire pour vous",
      
      "## Les parkings surveillés officiels",
      
      "### Où les trouver ?",
      "- À proximité des centres commerciaux",
      "- Près des sites touristiques majeurs",
      "- Dans les zones d'affaires",
      "- Parfois en sous-sol dans les centres-villes",
      "- Aux abords des médinas",
      
      "### Comment ça marche ?",
      "- Vous prenez un ticket à l'entrée (barrière automatique)",
      "- Vous vous garez où vous voulez dans le parking",
      "- Au retour, vous payez à la caisse ou à une borne automatique",
      "- Vous sortez en présentant votre ticket payé",
      
      "### Tarifs moyens",
      "- Première heure : 5-10 MAD",
      "- Heure supplémentaire : 3-5 MAD",
      "- Forfait demi-journée : 20-30 MAD",
      "- Forfait journée : 30-60 MAD",
      "- Nuit (18h-8h) : 20-40 MAD",
      
      "### Avantages",
      "- Sécurité maximale (caméras, barrières, personnel)",
      "- Idéal pour les longues durées",
      "- Parfait si vous laissez des valeurs dans la voiture",
      "- Toilettes souvent disponibles",
      "- Ticket horodaté qui prouve où vous étiez (utile parfois !)",
      
      "### Modes de paiement",
      "La plupart acceptent :",
      "- Espèces",
      "- Cartes bancaires marocaines",
      "- Cartes internationales (pas toujours, vérifiez)",
      
      "Conseil : ayez toujours des espèces sur vous au Maroc.",
      
      "## Les zones bleues (stationnement payant)",
      
      "### Qu'est-ce que c'est ?",
      "Des zones de stationnement payant délimitées par des marquages au sol bleus, présentes dans les centres-villes de Casablanca, Rabat, Marrakech, Tanger, Fès.",
      
      "### Comment payer ?",
      "Deux systèmes coexistent selon les villes :",
      
      "#### 1. Horodateurs (parcmètres)",
      "- Vous vous garez",
      "- Vous allez à l'horodateur le plus proche (tous les 50-100m)",
      "- Vous payez et obtenez un ticket",
      "- Vous affichez le ticket derrière le pare-brise, côté intérieur",
      
      "#### 2. Tickets vendus par des agents",
      "- Vous vous garez",
      "- Un agent en uniforme vient vous vendre un ticket",
      "- Vous payez et affichez le ticket",
      
      "### Tarifs",
      "- 2-5 MAD par heure selon la ville",
      "- Souvent limité à 2-4 heures maximum",
      "- Gratuit le dimanche dans certaines villes",
      "- Gratuit après 19h-20h et les jours fériés",
      
      "### Que se passe-t-il si vous ne payez pas ?",
      "Vous risquez une amende (PV) :",
      "- Montant : généralement 100-200 MAD",
      "- Mise sous le pare-brise ou envoyée au propriétaire du véhicule",
      "- Pour une voiture de location, l'agence paiera et vous facturera l'amende + des frais de gestion (souvent 100-200 MAD supplémentaires)",
      
      "Notre conseil : payez toujours le stationnement. 5 MAD vs risquer 300 MAD, le calcul est vite fait.",
      
      "## Stationnement dans les médinas",
      
      "### Règle d'or : ne rentrez pas en voiture dans les médinas !",
      "Les médinas sont des villes anciennes avec des ruelles étroites, parfois inaccessibles aux voitures. Même si c'est techniquement possible, vous risquez de :",
      "- Vous perdre dans un dédale de ruelles",
      "- Rester coincé (passages de 2 mètres de large)",
      "- Endommager le véhicule (murs, escaliers, obstacles)",
      "- Bloquer les résidents",
      
      "### Où se garer ?",
      "Des parkings officiels sont aménagés aux principales portes d'entrée des médinas :",
      
      "#### Marrakech",
      "- Parking Jemaa el-Fna (place principale)",
      "- Parking de la Koutoubia",
      "- Parkings près de Bab Doukkala",
      "Tarif : 10-20 MAD pour quelques heures, 30-50 MAD la journée",
      
      "#### Fès",
      "- Parking Bab Boujloud (porte bleue, l'entrée principale)",
      "- Parking Bab Ftouh",
      "- Parking Rcif",
      "Tarif : 20-40 MAD la journée",
      
      "#### Essaouira",
      "- Grand parking à l'entrée de la médina (Bab Doukkala)",
      "Tarif : 5-10 MAD/h, 40-60 MAD/jour",
      
      "Vous explorez ensuite la médina à pied (c'est d'ailleurs bien plus agréable).",
      
      "### Si vous séjournez dans un riad",
      "La plupart des riads dans les médinas n'ont pas de parking. Ils vous indiquent généralement :",
      "- Le parking public le plus proche",
      "- Un gardien qu'ils connaissent",
      "- Possibilité qu'un employé du riad vous accompagne jusqu'au parking",
      
      "## Règles à respecter",
      
      "### Où vous NE devez PAS vous garer",
      "- Devant les entrées de garages ou d'immeubles",
      "- Sur les passages piétons",
      "- Aux arrêts de bus",
      "- Devant les bornes d'incendie",
      "- Sur les trottoirs (sauf si tout le monde le fait et qu'il reste un passage)",
      "- Dans les virages sans visibilité",
      "- Devant les mosquées le vendredi (prière)",
      
      "### Stationnement sur trottoir",
      "Vous verrez beaucoup de voitures garées partiellement ou totalement sur les trottoirs. C'est toléré dans certaines rues étroites si :",
      "- Un passage d'au moins 1 mètre reste libre pour les piétons",
      "- Vous ne bloquez pas d'entrée",
      "- Il n'y a pas d'interdiction spécifique",
      
      "Observez comment les autres sont garés et faites pareil.",
      
      "## Conseils de sécurité",
      
      "### Avant de quitter votre voiture",
      "1. **Ne laissez rien de visible** : ni sac, ni téléphone, ni vêtements, ni GPS. Même un simple câble peut donner envie.",
      "2. **Fermez toutes les portières** et le coffre",
      "3. **Vérifiez que les vitres sont bien remontées**",
      "4. **Activez l'alarme** si le véhicule en a une",
      "5. **Gardez vos papiers importants sur vous** (passeport, permis de conduire)",
      
      "### Que laisser dans la voiture ?",
      "Aucun problème pour :",
      "- Documents du véhicule (carte grise, assurance) dans la boîte à gants",
      "- Bouteilles d'eau dans les coffres ou portières",
      "- Triangle de signalisation et gilet",
      
      "À éviter :",
      "- Objets de valeur",
      "- Argent liquide",
      "- Appareils électroniques",
      "- Sacs visibles (même vides)",
      
      "### Le vol de voiture",
      "Très rare au Maroc, surtout pour les voitures de location récentes avec alarme et antidémarrage électronique. Les gardiens de parking et la présence de gens dans les rues constituent une dissuasion efficace.",
      
      "## Cas particuliers",
      
      "### Parking à l'aéroport",
      "#### Aéroport Mohammed V (Casablanca)",
      "- Courte durée (P1, P2) : 15 MAD/h",
      "- Longue durée : 50-80 MAD/jour selon le parking",
      "- Parking couvert : 100-120 MAD/jour",
      
      "#### Aéroport Marrakech-Menara",
      "- Courte durée : 10 MAD/h",
      "- Longue durée : 60-80 MAD/jour",
      
      "Astuce : certaines agences de location offrent le stationnement gratuit pendant votre location si vous louez et rendez à l'aéroport.",
      
      "### Parking d'hôtel",
      "- Hôtels 3-4 étoiles : souvent gratuit pour les clients",
      "- Hôtels de luxe : 50-150 MAD/nuit selon l'établissement",
      "- Vérifiez à la réservation si le parking est inclus",
      
      "### Stationnement longue durée",
      "Si vous partez plusieurs jours en randonnée ou excursion sans voiture :",
      "- Privilégiez un parking officiel surveillé",
      "- Ou demandez à votre hôtel s'ils peuvent garder la voiture (souvent moyennant 50-100 MAD/jour)",
      "- Informez l'agence de location si vous laissez le véhicule immobile plus de 5-7 jours",
      
      "## Que faire en cas de problème ?",
      
      "### Voiture endommagée sur un parking",
      "1. Prenez des photos immédiatement",
      "2. Cherchez des témoins ou caméras",
      "3. Appelez l'agence de location",
      "4. Faites une déclaration à la police si les dégâts sont importants",
      "5. Demandez un rapport écrit si vous étiez dans un parking officiel",
      
      "### Voiture bloquée",
      "Il arrive qu'une voiture mal garée vous bloque. Dans les quartiers animés, demandez autour de vous, quelqu'un connaît souvent le propriétaire. Sinon, klaxonnez brièvement (pas en continu, c'est mal vu). Le gardien de parking, s'il y en a un, peut aider à retrouver le conducteur.",
      
      "### Amende de stationnement",
      "Si vous trouvez un PV sur votre pare-brise :",
      "- Ne le jetez pas !",
      "- Informez l'agence de location dès que possible",
      "- Payez l'amende rapidement (réduction souvent appliquée sous 15 jours)",
      "- Gardez la preuve de paiement",
      "- Si l'agence paie pour vous, remboursez-les immédiatement pour éviter les frais de gestion",
      
      "## Récapitulatif : où et comment se garer selon la situation",
      
      "| Situation | Solution | Coût indicatif |",
      "|-----------|----------|----------------|",
      "| Courses rapides en ville | Gardien de parking | 2-5 MAD |",
      "| Visite d'une médina | Parking officiel à l'entrée | 20-50 MAD |",
      "| Shopping centre commercial | Parking du mall | 10-30 MAD |",
      "| Nuit à l'hôtel | Parking hôtel | 0-100 MAD |",
      "| Journée de travail en centre-ville | Parking surveillé | 30-60 MAD |",
      "| Quelques heures en centre | Zone bleue + horodateur | 5-20 MAD |",
      "| Aéroport plusieurs jours | Parking longue durée | 60-80 MAD/jour |",
      
      "Avec ce guide, vous saurez où et comment vous garer partout au Maroc. Le stationnement est vraiment l'un des aspects les plus simples une fois qu'on connaît les codes !"
    ]
  },
  {
    id: 6,
    slug: "carburant-maroc",
    title: "Carburant au Maroc : prix, stations-service et conseils",
    excerpt: "Où faire le plein, combien ça coûte et comment optimiser votre consommation de carburant.",
    category: "Pratique",
    date: "15 décembre 2024",
    image: "https://images.unsplash.com/photo-1545262810-77515befe149?w=1200&h=600&fit=crop",
    content: [
      "Comprendre le système de carburant au Maroc vous aidera à mieux gérer votre budget et éviter les mauvaises surprises. Voici tout ce que vous devez savoir.",
      
      "## Les types de carburant disponibles",
      
      "### Essence sans plomb (Super)",
      "- **Octane** : 95 ou 98 selon les stations",
      "- **Couleur du pistolet** : vert généralement",
      "- **Pour qui** : la grande majorité des voitures essence",
      "- **Prix actuel (janvier 2025)** : environ 13,50 MAD/litre",
      
      "C'est le carburant que vous utiliserez probablement pour votre location. Vérifiez sur votre contrat ou sur la trappe à carburant du véhicule.",
      
      "### Gasoil (Diesel)",
      "- **Couleur du pistolet** : noir ou jaune",
      "- **Pour qui** : véhicules diesel uniquement",
      "- **Prix actuel** : environ 11,50 MAD/litre",
      
      "Moins cher que l'essence, mais réservé aux moteurs diesel. **Attention : ne vous trompez pas de carburant !** Mettre du gasoil dans une essence (ou l'inverse) coûte très cher en réparations.",
      
      "### Gasoil 50 (Diesel premium)",
      "- Version améliorée du gasoil standard",
      "- Disponible dans certaines grandes stations",
      "- Environ 0,50-1 MAD plus cher que le gasoil normal",
      "- Meilleur pour le moteur sur le long terme",
      
      "## Les prix : ce qu'il faut savoir",
      
      "### Prix fixes dans tout le Maroc",
      "Les prix des carburants sont réglementés par l'État et donc **identiques dans toutes les stations** du pays. Que vous soyez à Casablanca ou dans un village isolé, le prix au litre est le même.",
      
      "Inutile donc de chercher la station la moins chère ou de faire des détours pour économiser quelques dirhams.",
      
      "### Évolution des prix",
      "Les prix sont ajustés mensuellement par le gouvernement selon les cours internationaux du pétrole. Vous pouvez consulter les tarifs officiels sur les sites d'actualité marocains ou directement affichés dans les stations.",
      
      "### Comparaison avec l'Europe",
      "Le carburant au Maroc est environ :",
      "- 20-30% moins cher qu'en France",
      "- 30-40% moins cher qu'en Belgique ou Pays-Bas",
      "- 40-50% moins cher qu'en Italie",
      
      "## Le réseau de stations-service",
      
      "### Les grandes enseignes",
      "- **Total** : réseau le plus dense, stations modernes",
      "- **Shell** : nombreuses stations, souvent bien équipées",
      "- **Afriquia** : enseigne marocaine, très répandue",
      "- **Winxo** : stations plus récentes, design moderne",
      "- **Petrom** : présent surtout dans le Nord",
      
      "Toutes sont fiables et proposent la même qualité de carburant.",
      
      "### Où les trouver ?",
      "- **En ville** : très nombreuses, tous les 2-3 km",
      "- **Sur autoroutes** : aires de service tous les 50-70 km",
      "- **Routes nationales** : généralement tous les 30-50 km",
      "- **Zones rurales/désert** : parfois espacées de 100 km ou plus",
      
      "### Services disponibles",
      "La plupart des stations proposent :",
      "- Boutique/épicerie",
      "- Toilettes (propreté variable)",
      "- Café/snack (surtout sur autoroutes)",
      "- Gonflage pneus (souvent gratuit, sinon 2-5 MAD)",
      "- Petit entretien (huile, liquides)",
      
      "## Comment se passe le plein ?",
      
      "### Service par pompiste",
      "Au Maroc, il n'y a pas de self-service. Un employé fait le plein pour vous.",
      
      "**Déroulement** :",
      "1. Vous vous arrêtez à une pompe",
      "2. Le pompiste s'approche",
      "3. Vous lui dites ce que vous voulez (voir phrases utiles ci-dessous)",
      "4. Il fait le plein pendant que vous restez dans la voiture (ou vous sortez)",
      "5. Vous payez à la caisse ou directement au pompiste",
      "6. Vous donnez un petit pourboire (optionnel mais très apprécié)",
      
      "### Phrases utiles en français",
      "- **"Le plein s'il vous plaît"** = remplir le réservoir complètement",
      "- **"100 dirhams d'essence s'il vous plaît"** = montant fixe",
      "- **"Essence sans plomb"** ou **"Gasoil"** = pour préciser si nécessaire",
      
      "En arabe marocain (darija) :",
      "- **"3ammar afak"** (ammar afak) = le plein s'il vous plaît",
      "- **"Mi dirkam dial l'essence"** (miya dirham dial lessence) = 100 dirhams d'essence",
      
      "### Le pourboire",
      "C'est une pratique courante mais non obligatoire. Montants habituels :",
      "- 2 MAD : acceptable",
      "- 5 MAD : généreux",
      "- 10 MAD : très généreux (si service exceptionnel)",
      
      "Le pompiste l'appréciera vraiment, d'autant qu'ils travaillent dehors par tous les temps.",
      
      "### Modes de paiement",
      "- **Espèces** : acceptées partout (ayez de la monnaie)",
      "- **Carte bancaire** : acceptée dans la plupart des grandes stations, pas toujours dans les petites",
      
      "Conseil : gardez toujours 200-300 MAD en espèces pour le carburant, on n'est jamais sûr à 100% que la carte fonctionnera.",
      
      "## Planifier ses pleins : conseils pratiques",
      
      "### En ville",
      "Aucun problème, des stations partout. Attendez que la jauge descende à 1/4 avant de refaire le plein.",
      
      "### Sur autoroute",
      "Aires de service tous les 50-70 km. Très confortable. Vous pouvez facilement circuler avec 1/4 de réservoir sans stress.",
      
      "### Routes nationales",
      "Stations généralement tous les 30-50 km dans les zones habitées. Soyez un peu plus prudent : ne laissez pas descendre sous 1/4 de réservoir.",
      
      "### Vers le désert et zones reculées",
      "**Attention : les distances entre stations peuvent atteindre 100-150 km** (par exemple entre Ouarzazate et Merzouga, ou Zagora et M'Hamid).",
      
      "**Règle d'or** : **Faites le plein dès que vous voyez une station** si vous partez vers le désert ou une zone peu peuplée.",
      
      "Ne faites jamais confiance uniquement à votre GPS ou smartphone pour trouver une station. Demandez aux locaux.",
      
      "### Cas particulier : pistes du désert",
      "Si vous comptez faire des pistes en 4x4, certains hôtels/bivouacs vendent du carburant (plus cher : 15-18 MAD/L). Certains guides transportent des jerricanes de secours moyennant paiement.",
      
      "## La règle du "plein pour plein"",
      
      "### Comment ça marche ?",
      "Lors de la prise en charge du véhicule :",
      "- Le réservoir est plein",
      "- Vous devez le rendre plein également",
      
      "C'est la règle standard. Elle est équitable et permet d'éviter les calculs compliqués.",
      
      "### Que faire le dernier jour ?",
      "**30 minutes à 1h avant de rendre le véhicule** :",
      "1. Trouvez une station-service proche du lieu de restitution",
      "2. Faites le plein complet",
      "3. Gardez le ticket (au cas où)",
      
      "### Et si vous oubliez ?",
      "L'agence vous facturera le carburant manquant à un tarif majoré :",
      "- Tarif normal : 13,50 MAD/L (essence)",
      "- Tarif agence : généralement 15-18 MAD/L",
      "- **Plus** des frais de gestion : 50-100 MAD",
      
      "Pour éviter de payer 200-300 MAD de plus, prenez 5 minutes pour faire le plein.",
      
      "## Économiser du carburant",
      
      "### Adoptez l'éco-conduite",
      "- **Accélérez progressivement** (pas à fond dès le feu vert)",
      "- **Anticipez les ralentissements** pour éviter les freinages brusques",
      "- **Maintenez une vitesse stable** sur autoroute (régulateur de vitesse si disponible)",
      "- **Roulez à 110 km/h au lieu de 120 km/h sur autoroute** : vous économiserez 10-15% de carburant pour seulement quelques minutes de trajet en plus",
      
      "### Climatisation",
      "La clim consomme environ 0,5-1 L/100km supplémentaire. Par forte chaleur, elle est indispensable pour la sécurité (fatigue, déshydratation). Mais :",
      "- En ville, aux allures basses, ouvrez les fenêtres si la température est supportable",
      "- Sur autoroute, utilisez la clim (fenêtres ouvertes = résistance aérodynamique = consommation accrue)",
      "- Réglez-la à 22-24°C, pas à 18°C",
      
      "### Pression des pneus",
      "Des pneus sous-gonflés augmentent la consommation de 5-10%.",
      "- Vérifiez la pression toutes les 2 semaines",
      "- Gonflage gratuit ou 2-5 MAD dans les stations",
      "- Pression recommandée : indiquée dans la portière conducteur",
      
      "### Ne surchargez pas le véhicule",
      "Chaque 100 kg supplémentaires augmente la consommation de 5-7%. Ne transportez que ce dont vous avez besoin.",
      
      "### Planifiez vos trajets",
      "Évitez les heures de pointe en ville où vous consommerez beaucoup à rouler au pas. Utilisez GPS/Waze pour éviter les embouteillages.",
      
      "## Que faire en cas de panne sèche ?",
      
      "### Vous êtes sur l'autoroute",
      "1. Allumez vos warnings",
      "2. Rangez-vous sur la bande d'arrêt d'urgence",
      "3. Sortez du véhicule (côté passager si possible) et mettez-vous derrière la glissière de sécurité",
      "4. Appelez l'agence de location (numéro d'urgence sur le contrat)",
      "5. Ou appelez le 5050 (assistance autoroute)",
      
      "Ne tentez pas d'aller chercher du carburant à pied sur l'autoroute. Un dépanneur viendra avec un bidon.",
      
      "### Sur route secondaire",
      "1. Rangez-vous le plus possible hors de la chaussée",
      "2. Warnings + triangle de signalisation si vous en avez un",
      "3. Appelez l'agence de location",
      "4. Si un conducteur s'arrête pour aider, ne montez pas dans sa voiture mais demandez-lui d'appeler votre agence ou d'aller prévenir à la prochaine station",
      
      "### Coûts d'une panne sèche",
      "- Dépannage : 300-800 MAD selon la distance",
      "- Carburant au tarif majoré",
      "- Parfois des frais supplémentaires de l'agence",
      
      "Total : 500-1500 MAD pour un oubli qui aurait coûté 5 minutes et 50 MAD de détour pour faire un plein. Ne prenez pas ce risque.",
      
      "## Quelques mythes à oublier",
      
      "### "Le matin, l'essence est plus dense donc j'en ai plus pour mon argent"",
      "Faux. Les réservoirs des stations sont enterrés à température stable. Aucun gain.",
      
      "### "Le carburant Total est meilleur que l'Afriquia"",
      "Faux. Tous les carburants au Maroc répondent aux mêmes normes strictes. La qualité est équivalente.",
      
      "### "Il ne faut jamais remplir complètement le réservoir, ça abîme le moteur"",
      "Faux. Les réservoirs sont conçus pour être remplis. Aucun risque.",
      
      "### "Rouler avec un réservoir à moitié vide use la pompe à carburant"",
      "Partiellement vrai sur de très vieux véhicules, mais pas sur les locations récentes. Ceci dit, ne roulez pas constamment avec moins d'1/4 de réservoir.",
      
      "## Récapitulatif : conseils pour bien gérer son carburant",
      
      "✅ **Vérifiez le type de carburant** de votre voiture (indiqué sur le contrat et la trappe)",
      "✅ **Faites le plein dans les stations officielles** reconnues",
      "✅ **Ne laissez jamais descendre sous 1/4 de réservoir**, surtout hors des villes",
      "✅ **Faites le plein avant les zones désertiques** (règle absolue)",
      "✅ **Gardez vos tickets de carburant** si l'agence les demande",
      "✅ **Faites le plein juste avant de rendre le véhicule** (règle plein pour plein)",
      "✅ **Donnez 2-5 MAD de pourboire au pompiste** (geste apprécié)",
      "✅ **Ayez toujours 200-300 MAD en liquide** pour le carburant",
      
      "Avec ces informations, le carburant au Maroc n'aura plus de secrets pour vous !"
    ]
  }
];
