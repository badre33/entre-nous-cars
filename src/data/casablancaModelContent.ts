export interface CasablancaModelContent {
  name: string;
  summary: string;
  title: string;
  description: string;
  sections: { title: string; text: string }[];
  /** false : texte de fiche uniquement, absent du bloc de comparaison des pages commerciales */
  compare?: boolean;
}

// Editorial guidance for comparison, independent of stock and supplier-specific terms.
export const casablancaModelContent: Record<string, CasablancaModelContent> = {
  'dacia-sandero': {
    name: 'Dacia Sandero',
    summary: 'La citadine la moins chère du catalogue, pour un couple ou une petite famille avec peu de bagages.',
    title: 'Location Dacia Sandero Casablanca dès 250 DH/jour | Benatna',
    description: 'Louez une Dacia Sandero à Casablanca dès 250 DH/jour hors haute saison : livraison gratuite à l’aéroport Mohammed V ou en gare, 3 jours minimum, demande sur WhatsApp.',
    sections: [
      { title: 'La Sandero, le choix le plus économique à Casablanca', text: 'La Dacia Sandero est la voiture la plus abordable du catalogue : elle démarre à 250 DH par jour hors haute saison. C’est une citadine cinq places, simple à conduire et à garer, adaptée aux trajets en ville, à la corniche et aux sorties à la journée autour de Casablanca.' },
      { title: 'Pour qui ? Couples, petites familles, séjours courts', text: 'La Sandero convient bien à deux adultes, ou à une petite famille qui voyage avec des bagages raisonnables. Si vous arrivez avec plusieurs grandes valises, comparez-la avec la Dacia Logan, dont le coffre est plus grand, ou avec le Dacia Jogger si vous êtes plus de cinq.' },
      { title: 'Sandero ou Sandero Stepway ?', text: 'La Stepway reprend la base de la Sandero avec une garde au sol plus haute et un style de petit crossover. Pour la ville et l’autoroute, la Sandero suffit ; la Stepway est plus confortable sur les routes abîmées. Vous pouvez demander les deux dans une même demande et comparer les propositions du loueur.' },
    ],
  },
  'dacia-logan': {
    name: 'Dacia Logan',
    summary: 'Une berline économique au grand coffre, pratique pour une arrivée à l’aéroport avec des valises.',
    title: 'Location Dacia Logan Casablanca dès 250 DH/jour | Benatna',
    description: 'Louez une Dacia Logan à Casablanca dès 250 DH/jour hors haute saison : grand coffre, livraison gratuite à l’aéroport Mohammed V ou en gare, 3 jours minimum.',
    sections: [
      { title: 'Une berline économique avec un vrai coffre', text: 'La Dacia Logan est une berline quatre portes, au même prix de départ que la Sandero : 250 DH par jour hors haute saison. Son atout principal est son coffre, nettement plus grand que celui d’une citadine. C’est souvent le meilleur choix pour un retour au pays avec des valises.' },
      { title: 'Idéale pour une arrivée à Mohammed V', text: 'Si vous atterrissez à l’aéroport Mohammed V avec plusieurs bagages, la Logan évite de devoir passer à un SUV plus cher. Indiquez le nombre de valises dans votre demande pour que le loueur confirme que la voiture convient.' },
      { title: 'Logan, Sandero ou Accent ?', text: 'Même prix de départ pour la Logan et la Sandero : la Logan offre plus de coffre, la Sandero est plus compacte en ville. Si vous préférez une boîte automatique et plus d’équipements, comparez avec la Hyundai Accent. Vous pouvez réunir jusqu’à trois modèles dans une seule demande.' },
    ],
  },
  'dacia-sandero-stepway': {
    name: 'Dacia Sandero Stepway',
    summary: 'Une Sandero surélevée, un peu plus à l’aise sur les routes abîmées, au même prix de départ.',
    title: 'Location Dacia Sandero Stepway Casablanca dès 250 DH/jour | Benatna',
    description: 'Louez une Dacia Sandero Stepway à Casablanca dès 250 DH/jour hors haute saison : livraison gratuite à l’aéroport Mohammed V ou en gare, 3 jours minimum.',
    sections: [
      { title: 'La Stepway, une citadine au look crossover', text: 'La Sandero Stepway reprend la Sandero avec une garde au sol plus haute et des protections de carrosserie. Elle reste une citadine cinq places facile à conduire, mais plus confortable sur les routes en mauvais état ou les dos-d’âne.' },
      { title: 'Pour qui ?', text: 'Elle convient aux couples et aux petites familles qui veulent sortir de Casablanca pendant le séjour, sans payer le prix d’un SUV. Ce n’est pas une 4×4 : pour un usage hors route, demandez au loueur ce que le contrat autorise.' },
    ],
  },
  'hyundai-accent': {
    name: 'Hyundai Accent',
    summary: 'Une berline automatique et bien équipée, pour un séjour plus confortable qu’en citadine.',
    title: 'Location Hyundai Accent Casablanca dès 440 DH/jour | Benatna',
    description: 'Louez une Hyundai Accent automatique à Casablanca dès 440 DH/jour hors haute saison : livraison gratuite à l’aéroport Mohammed V ou en gare, 3 jours minimum.',
    sections: [
      { title: 'Une berline automatique pour circuler sans fatigue', text: 'La Hyundai Accent est une berline quatre portes proposée en boîte automatique. Dans la circulation de Casablanca, l’automatique rend la conduite plus reposante, surtout si vous n’êtes pas habitué à la ville.' },
      { title: 'Accent ou Logan ?', text: 'La Logan reste la berline la plus économique du catalogue. L’Accent coûte plus cher mais apporte la boîte automatique et davantage d’équipements. Si le budget prime, demandez la Logan ; si le confort prime, l’Accent. Vous pouvez demander les deux et comparer.' },
    ],
  },
  'dacia-jogger': {
    name: 'Dacia Jogger',
    summary: 'Le 7 places le plus abordable, pour les familles nombreuses et les retours au pays.',
    title: 'Location Dacia Jogger 7 places Casablanca dès 380 DH/jour | Benatna',
    description: 'Louez un Dacia Jogger 7 places à Casablanca dès 380 DH/jour hors haute saison : idéal familles, livraison gratuite à l’aéroport Mohammed V ou en gare, 3 jours minimum.',
    sections: [
      { title: 'Sept places pour toute la famille', text: 'Le Dacia Jogger est le modèle sept places du catalogue. C’est la solution la plus simple pour une famille nombreuse ou un groupe qui veut voyager dans une seule voiture plutôt que d’en louer deux.' },
      { title: 'Places ou bagages : à préciser', text: 'Avec les sept places occupées, le coffre devient petit. Si vous êtes sept avec beaucoup de valises, dites-le dans votre demande : le loueur vous indiquera si la configuration convient. À cinq, le Jogger offre au contraire un très grand coffre.' },
      { title: 'Jogger ou SUV ?', text: 'Un Dacia Duster ou un Hyundai Tucson suffit jusqu’à cinq personnes. Au-delà, le Jogger est le choix logique. Pour comparer, vous pouvez réunir jusqu’à trois modèles dans une seule demande. Les sept places sont très demandées en été et pendant les fêtes : faites votre demande tôt.' },
    ],
  },
  'renault-clio': {
    name: 'Renault Clio 5',
    summary: 'Une citadine à comparer pour les déplacements en ville et un séjour avec peu de bagages.',
    title: 'Location Renault Clio 5 à Casablanca | Benatna',
    description: 'Comparez la Renault Clio 5 à Casablanca : prix journalier indicatif, caution à confirmer et livraison gratuite à Mohammed V ou en gare. Minimum 3 jours.',
    sections: [
      { title: 'Pourquoi choisir une Clio 5 à Casablanca ?', text: 'Vous cherchez une citadine pour vos déplacements à Casablanca et vos sorties pendant les vacances ? La Clio 5 est une piste à comparer si vous privilégiez un format compact. Pour une arrivée avec plusieurs grandes valises, indiquez vos bagages au loueur avant de retenir ce modèle.' },
      { title: 'Clio manuelle ou automatique : préciser votre choix', text: 'Le nom Clio ne suffit pas à identifier la boîte de vitesses ou les équipements. Sélectionnez la transmission souhaitée dans le catalogue et faites confirmer la version proposée pour vos dates. Le modèle présenté est la Clio 5.' },
      { title: 'Clio, Golf ou Duster pour votre séjour ?', text: 'Comparez la Clio avec une Golf si vous recherchez une compacte, ou avec un Duster si vous préférez un SUV. Envoyez les mêmes dates, le même lieu et vos besoins en bagages pour obtenir des propositions comparables. Vous pouvez réunir jusqu’à trois modèles dans une seule demande.' },
    ],
  },
  'dacia-duster': {
    name: 'Dacia Duster',
    summary: 'Un SUV à comparer pour un séjour en famille, en précisant les passagers et les valises.',
    title: 'Location Dacia Duster à Casablanca | Benatna',
    description: 'Préparez votre location de Dacia Duster à Casablanca : prix indicatif, caution selon le loueur et livraison gratuite à Mohammed V ou en gare. Dès 3 jours.',
    sections: [
      { title: 'Un Duster pour un séjour au départ de Casablanca', text: 'Le Dacia Duster est une option SUV à comparer pour des vacances en famille ou un retour au pays. Précisez le nombre d’adultes, d’enfants et de valises pour vérifier que la version proposée convient à votre séjour. Le format SUV ne garantit ni une transmission 4×4 ni un usage hors route autorisé.' },
      { title: 'Comparer le Duster au Tucson', text: 'Si vous hésitez entre Duster et Tucson, demandez les deux modèles sur la même période. Comparez le tarif total, la boîte de vitesses, les bagages possibles et les conditions de caution. Les équipements et la motorisation dépendent du véhicule confirmé par le loueur.' },
      { title: 'Départ à Casablanca, itinéraire selon votre contrat', text: 'Vous pouvez préparer une prise en charge à Mohammed V ou dans une gare desservie de Casablanca. Indiquez ensuite votre itinéraire au loueur pour vérifier les conditions du contrat et organiser le retour. Une destination de voyage ne constitue pas un autre lieu de livraison proposé par Benatna.' },
    ],
  },
  'vw-golf': {
    name: 'Volkswagen Golf',
    summary: 'Une compacte à mettre en concurrence avec une citadine selon votre budget et votre usage.',
    title: 'Location Volkswagen Golf à Casablanca | Benatna',
    description: 'Comparez une Volkswagen Golf pour votre séjour à Casablanca : tarif indicatif, version et caution à confirmer, livraison gratuite aux points desservis. Dès 3 jours.',
    sections: [
      { title: 'Louer une Golf pour la ville et les étapes de votre séjour', text: 'Vous préférez une compacte à une citadine ou à un SUV ? La Volkswagen Golf permet de formuler ce choix dans votre demande à Casablanca. Précisez vos passagers, vos bagages et votre préférence de boîte plutôt que de vous appuyer uniquement sur la photo du catalogue.' },
      { title: 'Vérifier la version avant de confirmer', text: 'La génération, la motorisation et les équipements doivent être confirmés avec le loueur. Demandez également la transmission souhaitée : une illustration de Golf ne garantit pas une finition, une couleur ou une boîte précise pour vos dates.' },
      { title: 'Comparer la Golf avec la Clio ou le Tucson', text: 'Pour arbitrer votre budget, comparez une Golf et une Clio sur les mêmes dates. Si vous recherchez plutôt un SUV, ajoutez le Tucson à votre sélection. Le tarif de la période et les conditions de caution permettent de comparer les propositions au-delà du seul prix affiché par jour.' },
    ],
  },
  'hyundai-tucson': {
    name: 'Hyundai Tucson',
    summary: 'Un SUV à comparer au Duster pour préparer un séjour avec plusieurs passagers et des bagages.',
    title: 'Location Hyundai Tucson à Casablanca | Benatna',
    description: 'Demandez un Hyundai Tucson à Casablanca, à partir de 3 jours : prix indicatif, caution à confirmer et livraison gratuite à l’aéroport Mohammed V ou en gare.',
    sections: [
      { title: 'Un Tucson pour vos vacances depuis Casablanca', text: 'Le Hyundai Tucson est un choix SUV à étudier pour un séjour avec plusieurs passagers et des bagages. Indiquez le nombre de voyageurs et les valises prévues à l’arrivée. Le loueur vérifie avec vous l’adéquation de la version proposée avant votre accord.' },
      { title: 'Tucson ou Duster : comparer une proposition complète', text: 'Vous pouvez sélectionner le Tucson et le Duster dans une même demande pour comparer deux SUV. Demandez le tarif pour toute la période, la transmission, les équipements utiles et les conditions de caution. Précisez les équipements qui comptent pour votre séjour afin de faire confirmer la bonne version.' },
      { title: 'Organiser la remise du Tucson à Mohammed V ou en gare', text: 'Préparez votre lieu précis de prise en charge à Casablanca avant le voyage. La livraison est gratuite aux points desservis et le rendez-vous est convenu à l’avance avec le loueur. Pour Rabat, précisez votre besoin : la livraison est étudiée depuis Casablanca selon sa disponibilité.' },
    ],
  },
  'peugeot-208': {
    name: 'Peugeot 208',
    summary: 'Une citadine récente et bien équipée, proposée en manuelle ou en automatique selon les versions.',
    title: 'Location Peugeot 208 Casablanca dès 400 DH/jour | Benatna',
    description: 'Louez une Peugeot 208 à Casablanca dès 400 DH/jour hors haute saison : livraison gratuite à l’aéroport Mohammed V ou en gare, 3 jours minimum, demande sur WhatsApp.',
    compare: false,
    sections: [
      { title: 'Une citadine moderne pour Casablanca', text: 'La Peugeot 208 est une citadine cinq portes au style récent. Elle se faufile facilement en ville, se gare sans difficulté et reste confortable sur l’autoroute pour rejoindre l’aéroport ou sortir de Casablanca.' },
      { title: 'Manuelle ou automatique : à préciser', text: 'Selon les versions, la 208 existe en boîte manuelle ou automatique. Si l’automatique compte pour vous, indiquez-le clairement dans votre demande : le loueur confirme la version disponible pour vos dates.' },
      { title: '208, Clio ou Sandero ?', text: 'La 208 et la Clio sont dans la même gamme de prix, avec plus d’équipements qu’une Sandero. Si le budget prime, la Sandero démarre à 250 DH par jour. Vous pouvez demander jusqu’à trois modèles et comparer les propositions.' },
    ],
  },
  'seat-ibiza': {
    name: 'Seat Ibiza',
    summary: 'Une citadine au coffre généreux pour sa catégorie, agréable sur la route.',
    title: 'Location Seat Ibiza Casablanca dès 400 DH/jour | Benatna',
    description: 'Louez une Seat Ibiza à Casablanca dès 400 DH/jour hors haute saison : livraison gratuite à l’aéroport Mohammed V ou en gare, 3 jours minimum, demande sur WhatsApp.',
    compare: false,
    sections: [
      { title: 'Une citadine dynamique et pratique', text: 'La Seat Ibiza est une citadine cinq portes appréciée pour sa tenue de route et un coffre plutôt généreux pour sa taille. Elle convient aux couples et aux petites familles qui alternent ville et autoroute.' },
      { title: 'Pour quel séjour ?', text: 'L’Ibiza est un bon compromis si vous prévoyez des trajets hors de Casablanca pendant votre séjour, sans passer à un SUV. Indiquez vos bagages et votre préférence de boîte de vitesses dans la demande.' },
      { title: 'Ibiza, 208 ou Corsa ?', text: 'Ces trois citadines sont au même prix de départ. Le choix dépend surtout de la disponibilité et de la boîte de vitesses : demandez-en plusieurs dans la même demande pour obtenir la meilleure proposition.' },
    ],
  },
  'opel-corsa': {
    name: 'Opel Corsa',
    summary: 'Une citadine simple et compacte, facile à vivre en ville.',
    title: 'Location Opel Corsa Casablanca dès 400 DH/jour | Benatna',
    description: 'Louez une Opel Corsa à Casablanca dès 400 DH/jour hors haute saison : livraison gratuite à l’aéroport Mohammed V ou en gare, 3 jours minimum, demande sur WhatsApp.',
    compare: false,
    sections: [
      { title: 'Une citadine facile en ville', text: 'L’Opel Corsa est une citadine cinq portes compacte. Elle est facile à garer dans les rues de Casablanca et suffisante pour deux adultes ou une petite famille avec des bagages raisonnables.' },
      { title: 'À qui s’adresse-t-elle ?', text: 'La Corsa convient aux séjours centrés sur la ville et la corniche. Si vous arrivez avec plusieurs grandes valises, comparez-la avec la Dacia Logan, au coffre plus grand et au prix de départ plus bas.' },
    ],
  },
  'hyundai-i20': {
    name: 'Hyundai i20',
    summary: 'Une citadine récente et bien équipée, en manuelle ou en automatique selon les versions.',
    title: 'Location Hyundai i20 Casablanca dès 400 DH/jour | Benatna',
    description: 'Louez une Hyundai i20 à Casablanca dès 400 DH/jour hors haute saison : livraison gratuite à l’aéroport Mohammed V ou en gare, 3 jours minimum, demande sur WhatsApp.',
    compare: false,
    sections: [
      { title: 'Une citadine récente et bien équipée', text: 'La Hyundai i20 est une citadine cinq portes récente, avec un équipement souvent complet pour sa catégorie. Elle convient aux trajets en ville comme aux sorties sur autoroute pendant votre séjour.' },
      { title: 'Boîte manuelle ou automatique', text: 'Selon les versions, l’i20 existe en manuelle ou en automatique. Précisez votre préférence dans la demande pour que le loueur confirme la bonne version.' },
      { title: 'i20 ou Accent ?', text: 'L’i20 est une citadine compacte ; la Hyundai Accent est une berline, plus longue et plus spacieuse à l’arrière. Pour plus de place et la boîte automatique, comparez avec l’Accent.' },
    ],
  },
  'kia-sportage': {
    name: 'Kia Sportage',
    summary: 'Un SUV familial automatique et bien équipé, pour un séjour confortable avec bagages.',
    title: 'Location Kia Sportage Casablanca dès 640 DH/jour | Benatna',
    description: 'Louez un Kia Sportage automatique à Casablanca dès 640 DH/jour hors haute saison : SUV familial, livraison gratuite à l’aéroport Mohammed V ou en gare, 3 jours minimum.',
    compare: false,
    sections: [
      { title: 'Un SUV familial confortable', text: 'Le Kia Sportage est un SUV familial proposé en boîte automatique, avec un équipement complet. Il offre de la place pour cinq personnes et leurs bagages, et reste confortable sur les longs trajets.' },
      { title: 'Sportage, Tucson ou Duster ?', text: 'Le Duster est le SUV le plus économique du catalogue. Le Sportage et le Tucson se situent un cran au-dessus en confort et en équipement. Demandez deux ou trois SUV sur les mêmes dates pour comparer le tarif total et la caution.' },
    ],
  },
  'vw-t-roc': {
    name: 'Volkswagen T-Roc',
    summary: 'Un SUV compact automatique, plus facile à garer qu’un grand SUV.',
    title: 'Location Volkswagen T-Roc Casablanca dès 650 DH/jour | Benatna',
    description: 'Louez un Volkswagen T-Roc automatique à Casablanca dès 650 DH/jour hors haute saison : SUV compact, livraison gratuite à l’aéroport Mohammed V ou en gare, 3 jours minimum.',
    compare: false,
    sections: [
      { title: 'Un SUV compact pour la ville et la route', text: 'Le Volkswagen T-Roc est un SUV compact proposé en boîte automatique. Il offre la position de conduite haute d’un SUV avec un gabarit plus facile à garer qu’un grand modèle, pratique dans Casablanca.' },
      { title: 'Pour qui ?', text: 'Le T-Roc convient aux couples et aux familles de quatre qui veulent un SUV bien équipé sans passer au format familial. Pour cinq personnes avec beaucoup de bagages, comparez avec le Kia Sportage ou le Hyundai Tucson.' },
    ],
  },
};
