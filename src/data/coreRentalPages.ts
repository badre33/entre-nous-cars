import type { CoreRentalContent } from '@/components/CoreRentalLanding';

const rentalJourneyLinks = [
  { "to": "/location-voiture-pas-cher-casablanca", "label": "Voitures pas chères dès 250 DH", "text": "Sandero, Logan, Stepway, Clio et 208 : comparer les modèles économiques." },
  { "to": "/location-suv-casablanca", "label": "SUV dès 380 DH", "text": "Duster, Tucson, Sportage et T-Roc pour la famille et les bagages." },
  { "to": "/location-voiture-7-places-casablanca", "label": "Voiture 7 places et familiale", "text": "Dacia Jogger 7 places et SUV familiaux pour arriver à plusieurs." },
  { "to": "/location-voiture-semaine-casablanca", "label": "Prix à la semaine", "text": "Le prix de 7 jours modèle par modèle, dès 1 750 DH." },
  {
    "to": "/location-voiture-automatique-casablanca",
    "label": "Voitures automatiques à Casablanca",
    "text": "Comparer les versions automatiques et préparer une demande pour vos dates."
  },
  {
    "to": "/location-voiture-gare-oncf-maroc",
    "label": "Prise en charge dans les gares de Casablanca",
    "text": "Choisir Casa-Voyageurs, Casa-Port, Oasis ou Aïn Sebaâ avant de préparer votre demande."
  },
  {
    "to": "/location-voiture-aeroport-casablanca",
    "label": "Arrivée à l’aéroport Mohammed V",
    "text": "Organiser la livraison gratuite et le rendez-vous avec le loueur avant votre vol."
  }
];


const tourismPriceRows = [
  { category: 'Citadine', models: 'Dacia Sandero, Sandero Stepway', from: 250 },
  { category: 'Berline', models: 'Dacia Logan', from: 250 },
  { category: 'SUV', models: 'Dacia Duster, manuelle ou automatique', from: 380 },
  { category: 'Familiale 7 places', models: 'Dacia Jogger', from: 380 },
];

const tourismAudience = [
  { title: 'MRE en vacances au pays', text: 'Vous atterrissez à Mohammed V avec la famille et les valises : la voiture vous attend à l’aéroport, sans frais de livraison, pour toute la durée de votre séjour.' },
  { title: 'Touristes et voyageurs', text: 'Visitez Casablanca et ses environs à votre rythme. Citadine pour la ville, SUV ou 7 places pour les trajets à plusieurs.' },
  { title: 'Résidents au Maroc', text: 'Un séjour en famille, des invités à transporter, une voiture en panne : même service et mêmes prix, à partir de trois jours.' },
];

const tourismExclusions = 'Benatna propose uniquement des voitures de tourisme : pas de van, d’utilitaire, de minibus, de voiture de mariage ni de location professionnelle.';

export const coreRentalPages: Record<'casablanca' | 'airport' | 'longStay' | 'casaVoyageurs' | 'automatic' | 'railway' | 'budget' | 'suv' | 'family' | 'week', CoreRentalContent> = {
  casablanca: {
    relatedLinks: rentalJourneyLinks,
    showModelComparison: true,
    path: '/location-voiture-casablanca',
    title: 'Location voiture Casablanca dès 250 DH/jour | Benatna',
    description: 'Louez une voiture à Casablanca dès 250 DH/jour pour vos vacances : citadine, berline, SUV ou 7 places. Livraison gratuite à l’aéroport Mohammed V et en gare. 3 jours minimum, réponse sur WhatsApp.',
    heading: 'Location de voiture à Casablanca dès 250 DH/jour',
    intro: 'Vous arrivez à Casablanca pour les vacances, pour voir la famille ou pour découvrir le Maroc ? Benatna interroge des loueurs basés à Casablanca et vous trouve une voiture de tourisme à partir de 250 DH par jour. Envoyez vos dates sur WhatsApp, recevez une proposition, puis récupérez la voiture à l’aéroport ou en gare sans frais de livraison.',
    priceRows: tourismPriceRows,
    audience: tourismAudience,
    exclusions: tourismExclusions,
    sections: [
      { title: 'Comment se passe votre location', text: 'Choisissez un ou plusieurs modèles et vos dates dans le catalogue, puis envoyez votre demande sur WhatsApp. Le loueur vous confirme le modèle, le prix total, la caution et les documents à prévoir. Vous recevez la voiture au point convenu : aéroport Mohammed V, gare Casa-Voyageurs, Casa-Port ou un autre point desservi, sans frais de livraison.' },
      { title: 'Ce qui fait le prix', text: 'Les prix de départ s’appliquent hors périodes de forte demande. En juillet-août et autour des fêtes (Aïd, fin d’année), le tarif journalier augmente ; à partir de 15 jours, il baisse légèrement. Le loueur confirme le montant total de votre période avant tout accord. La caution est séparée du prix de location et vous est précisée à l’avance.' },
      { title: 'En famille : SUV et 7 places', text: 'Pour une famille avec bagages, comparez le Dacia Duster et le Dacia Jogger 7 places, dès 380 DH par jour. Indiquez le nombre de passagers et de valises dans votre demande : le loueur vous oriente vers le modèle adapté.' },
    ],
    faqs: [
      { question: 'Quel est le prix d’une location de voiture à Casablanca ?', answer: 'À partir de 250 DH par jour pour une citadine ou une berline (Dacia Sandero, Logan) et dès 380 DH pour un SUV ou un 7 places, hors haute saison. Le loueur confirme le prix total pour vos dates.' },
      { question: 'Quelle est la durée minimum ?', answer: 'Trois jours. Un week-end de deux jours ne peut pas être demandé.' },
      { question: 'La livraison à l’aéroport est-elle payante ?', answer: 'Non. La remise de la voiture est gratuite à l’aéroport Mohammed V et dans les gares desservies de Casablanca. Le lieu et l’heure sont convenus à l’avance avec le loueur.' },
      { question: 'Comment réserver ?', answer: 'Par WhatsApp : indiquez vos dates, le modèle souhaité et votre lieu d’arrivée. Il n’y a pas de paiement en ligne ; la location est confirmée après l’accord du loueur et le vôtre.' },
      { question: 'Proposez-vous des vans ou de la location professionnelle ?', answer: 'Non. Benatna propose uniquement des voitures de tourisme pour des séjours personnels : pas de van, d’utilitaire, de minibus, de voiture de mariage ni de location professionnelle.' },
    ],
  },
  airport: {
    alternates: { fr: '/location-voiture-aeroport-casablanca', en: '/en/car-rental-casablanca-airport', es: '/es/alquiler-coche-aeropuerto-casablanca' },
    relatedLinks: rentalJourneyLinks,
    showModelComparison: true,
    pickupId: 'cmn',
    path: '/location-voiture-aeroport-casablanca',
    title: 'Location voiture aéroport Casablanca dès 250 DH/jour | Benatna',
    description: 'Votre voiture de location livrée gratuitement à l’aéroport Mohammed V de Casablanca, dès 250 DH/jour. Citadine, SUV ou 7 places pour vos vacances. 3 jours minimum, demande sur WhatsApp.',
    heading: 'Location de voiture à l’aéroport Mohammed V de Casablanca dès 250 DH/jour',
    intro: 'Vous atterrissez à Casablanca avec la famille et les valises ? Envoyez vos dates et votre vol sur WhatsApp avant de partir : un loueur basé à Casablanca vous attend à l’aéroport Mohammed V avec la voiture, sans frais de livraison. Citadine dès 250 DH par jour, SUV et 7 places dès 380 DH.',
    priceRows: tourismPriceRows,
    audience: tourismAudience,
    exclusions: tourismExclusions,
    sections: [
      { title: 'Une voiture qui vous attend à l’arrivée', text: 'Indiquez votre date et votre heure d’arrivée dans votre demande. Le loueur convient avec vous du point de rendez-vous à l’aéroport Mohammed V. En cas de retard ou de changement de vol, prévenez-le sur WhatsApp pour adapter la remise.' },
      { title: 'Ce qui fait le prix', text: 'Les prix de départ s’appliquent hors périodes de forte demande. En juillet-août et autour des fêtes, le tarif journalier augmente. La livraison à l’aéroport est gratuite. Le loueur confirme le prix total, la caution et les documents avant votre accord.' },
      { title: 'Retour de la voiture', text: 'Vous rendez la voiture à l’aéroport avant votre vol retour, ou à un autre point desservi de Casablanca convenu avec le loueur. Précisez votre date et votre heure de départ dès la demande.' },
    ],
    faqs: [
      { question: 'Combien coûte une voiture de location à l’aéroport de Casablanca ?', answer: 'À partir de 250 DH par jour pour une citadine ou une berline et dès 380 DH pour un SUV ou un 7 places, hors haute saison. La livraison à l’aéroport est gratuite.' },
      { question: 'Y a-t-il un comptoir Benatna à l’aéroport ?', answer: 'Non. Le loueur vous retrouve à un point de rendez-vous convenu à l’avance : pas de file d’attente au comptoir.' },
      { question: 'Quelle est la durée minimum ?', answer: 'Trois jours.' },
      { question: 'Comment réserver avant mon vol ?', answer: 'Par WhatsApp : envoyez vos dates, votre heure d’arrivée et le modèle souhaité. Le loueur vous confirme la disponibilité et le prix total. Aucun paiement en ligne.' },
    ],
  },
  longStay: {
    "path": "/location-longue-duree-casablanca",
    "title": "Location voiture au mois à Casablanca, jusqu’à 6 mois | Benatna",
    "description": "Location de voiture au mois à Casablanca pour votre séjour personnel. Jusqu’à 6 mois, prix et caution confirmés par le loueur, livraison gratuite aux points desservis.",
    "heading": "Location de voiture au mois à Casablanca",
    "intro": "Vous revenez au pays pour plusieurs semaines ou prévoyez un séjour prolongé ? Comparez les voitures de tourisme du catalogue, puis demandez au loueur un tarif pour toute votre période à Casablanca. La durée se définit avec vos dates, jusqu’à six mois calendaires.",
    "showModelComparison": true,
    "sections": [
        {
            "title": "Une location pour un mois, deux mois ou un séjour plus long",
            "text": "Renseignez une date de départ et une date de retour précises, y compris pour plusieurs mois. La période demandée reste comprise entre trois jours et six mois calendaires. Si vous envisagez de prolonger votre séjour, contactez le loueur avant la date de retour pour vérifier le véhicule et obtenir son accord."
        },
        {
            "title": "Comparer le coût de toute la période",
            "text": "Le prix par jour affiché dans le catalogue est un repère indicatif. Demandez une proposition couvrant vos dates et comparez les modèles sur cette même période. Faites préciser le montant total, les modalités de règlement, le kilométrage prévu au contrat et les conditions d’assurance. Un séjour au mois ne correspond pas automatiquement à un forfait ou à une remise."
        },
        {
            "title": "Choisir votre modèle pour le quotidien",
            "text": "Une citadine comme la Clio 5 peut être comparée pour des déplacements en ville ; une Golf permet d’étudier une compacte. Pour un séjour en famille avec des valises, ajoutez un Duster ou un Tucson à votre comparaison et précisez les passagers et bagages. La transmission, la version et les équipements sont confirmés par le loueur."
        },
        {
            "title": "Prévoir la caution, la remise et le retour",
            "text": "La caution est distincte du prix de location : faites confirmer son montant, le moyen de dépôt accepté et les conditions de restitution. La livraison est gratuite aux points desservis de Casablanca, notamment Mohammed V et les gares indiquées dans le guide. Convenez du lieu de retour avant votre accord. Une livraison à Rabat peut être étudiée depuis Casablanca selon la disponibilité du loueur."
        }
    ],
    "faqs": [
        {
            "question": "Peut-on demander une voiture pour un ou plusieurs mois ?",
            "answer": "Oui, pour un séjour personnel à partir de trois jours et jusqu’à six mois calendaires. Précisez vos dates de départ et de retour pour que le loueur vérifie le modèle et propose un tarif couvrant toute la période."
        },
        {
            "question": "Le prix mensuel est-il le prix journalier multiplié par trente ?",
            "answer": "Le catalogue affiche des prix journaliers indicatifs. Le tarif de votre séjour doit être confirmé pour vos dates par le loueur ; aucune formule mensuelle ni réduction systématique n’est garantie."
        },
        {
            "question": "Quand ma location est-elle confirmée ?",
            "answer": "Après votre demande avec dates, modèles et lieu, le loueur vérifie la disponibilité et vous communique le tarif et ses conditions. La location est confirmée après son accord et le vôtre. Benatna ne propose pas de paiement en ligne."
        }
    ],
    relatedLinks: rentalJourneyLinks
},
  casaVoyageurs: {
    "path": "/location-voiture-gare-casa-voyageurs",
    "pickupId": "casa-voyageurs",
    "title": "Location voiture gare Casa-Voyageurs à Casablanca | Benatna",
    "description": "Demandez une voiture à la gare Casa-Voyageurs de Casablanca. Livraison gratuite convenue à l’avance, minimum 3 jours. Choisissez vos dates et jusqu’à 3 modèles.",
    "heading": "Location de voiture à la gare Casa-Voyageurs",
    "intro": "Vous arrivez en train à Casa-Voyageurs pour vos vacances ou votre retour au pays ? Préparez une voiture avant le voyage. Le catalogue s’ouvre avec Casa-Voyageurs comme lieu demandé ; renseignez vos dates et les modèles souhaités pour échanger avec le loueur.",
    "showModelComparison": true,
    "sections": [
        {
            "title": "Organiser votre arrivée à Casa-Voyageurs",
            "text": "La livraison est gratuite et le rendez-vous est convenu à l’avance avec le loueur. Communiquez les informations utiles sur votre train, le nombre de voyageurs et les bagages. Demandez-lui le point précis de rencontre et prévenez-le si votre voyage change pour adapter l’organisation."
        },
        {
            "title": "Choisir une citadine, une compacte ou un SUV",
            "text": "Pour un séjour avec peu de bagages, comparez la Clio 5 et la Golf. Si vous voyagez en famille avec plusieurs valises, indiquez-le avant de comparer un Duster et un Tucson. Vous pouvez retenir jusqu’à trois modèles dans une demande ; le loueur confirme la version et la transmission adaptées à vos dates."
        },
        {
            "title": "Prix, caution et retour du véhicule",
            "text": "Le tarif journalier affiché reste indicatif. Demandez le prix de la période complète, les documents requis, la caution et les conditions du contrat avant votre accord. La durée est de trois jours minimum à six mois calendaires maximum. Le lieu de restitution du véhicule se fixe à l’avance avec le loueur."
        },
        {
            "title": "Casa-Voyageurs ou une autre gare de Casablanca ?",
            "text": "Vérifiez le nom de votre gare avant de préparer la demande. Casa-Port, Oasis et Aïn Sebaâ sont également proposés dans notre sélection de lieux à Casablanca. Utilisez la page des gares pour choisir le bon point ; si vous arrivez en avion, choisissez plutôt l’aéroport Mohammed V."
        }
    ],
    "faqs": [
        {
            "question": "La livraison à Casa-Voyageurs est-elle gratuite ?",
            "answer": "Oui. Le lieu précis de rencontre et les modalités de remise du véhicule sont convenus avec le loueur avant votre arrivée. Contactez-le si les informations de votre train changent."
        },
        {
            "question": "Que préciser pour demander une voiture à Casa-Voyageurs ?",
            "answer": "Choisissez Casa-Voyageurs, vos dates et un à trois modèles. Indiquez ensuite au loueur les informations utiles sur votre arrivée, vos passagers et vos bagages pour organiser le rendez-vous."
        },
        {
            "question": "Quand ma location est-elle confirmée ?",
            "answer": "Après votre demande avec dates, modèles et lieu, le loueur vérifie la disponibilité et vous communique le tarif et ses conditions. La location est confirmée après son accord et le vôtre. Benatna ne propose pas de paiement en ligne."
        }
    ],
    relatedLinks: rentalJourneyLinks
},
  automatic: {
    "path": "/location-voiture-automatique-casablanca",
    "transmission": "Automatique",
    "title": "Location voiture automatique à Casablanca | Benatna",
    "description": "Comparez les voitures automatiques à Casablanca : Clio 5, Golf, Duster et Tucson selon version. Dès 3 jours, livraison gratuite aux points desservis, tarif à confirmer.",
    "heading": "Location de voiture automatique à Casablanca",
    "intro": "Vous souhaitez une boîte automatique pour vos vacances ou votre retour au pays ? Ouvrez le catalogue avec le filtre automatique déjà activé, comparez les modèles et préparez votre demande pour vos dates. Le loueur confirme la version proposée avant votre accord.",
    "showModelComparison": true,
    "sections": [
        {
            "title": "Quelle voiture automatique comparer pour votre séjour ?",
            "text": "Le catalogue propose notamment des variantes automatiques de Clio, Golf, Duster et Tucson. Comparez une citadine ou une compacte pour vos déplacements en ville ; si vous recherchez un SUV, précisez vos passagers et vos valises avant de retenir Duster ou Tucson. La disponibilité de chaque version dépend des dates demandées."
        },
        {
            "title": "Vérifier la transmission et les équipements",
            "text": "Un même modèle peut exister en boîte manuelle et automatique. Le filtre permet de distinguer les variantes du catalogue ; indiquez aussi votre préférence au loueur. La photo illustre le modèle et ne garantit pas une finition, une motorisation ou des équipements précis. Faites confirmer la version avant votre accord."
        },
        {
            "title": "Comparer le prix et la caution sur les mêmes dates",
            "text": "Les prix journaliers sont indicatifs. Préparez une période à partir de trois jours et demandez le tarif total pour les modèles retenus. Le loueur précise la caution, son moyen de dépôt, ses conditions de restitution et le contrat. Le choix automatique ne permet pas de déduire un montant de caution ni un supplément fixe."
        },
        {
            "title": "Une automatique à Mohammed V ou en gare",
            "text": "La livraison est gratuite aux points desservis de Casablanca, notamment à l’aéroport Mohammed V et aux gares du guide. Choisissez le lieu précis avec vos dates et jusqu’à trois modèles. Le rendez-vous est convenu à l’avance avec le loueur ; Rabat reste une livraison sur demande depuis Casablanca selon sa disponibilité."
        }
    ],
    "faqs": [
        {
            "question": "Le catalogue s’ouvre-t-il sur les voitures automatiques ?",
            "answer": "Oui, le bouton de cette page ouvre le catalogue avec le filtre Automatique. Vous pouvez ensuite comparer les modèles et adapter les filtres. La disponibilité et la version exacte restent à confirmer avec le loueur."
        },
        {
            "question": "Peut-on demander une automatique pour plusieurs semaines ?",
            "answer": "Oui, à partir de trois jours et pour plusieurs semaines. Précisez vos dates pour faire confirmer le modèle, la version automatique et le tarif de toute la période."
        },
        {
            "question": "Quand ma location est-elle confirmée ?",
            "answer": "Après votre demande avec dates, modèles et lieu, le loueur vérifie la disponibilité et vous communique le tarif et ses conditions. La location est confirmée après son accord et le vôtre. Benatna ne propose pas de paiement en ligne."
        }
    ],
    relatedLinks: rentalJourneyLinks
},
  railway: {
    "path": "/location-voiture-gare-oncf-maroc",
    "title": "Location voiture gares de Casablanca, livraison gratuite | Benatna",
    "description": "Choisissez Casa-Voyageurs, Casa-Port, Oasis ou Aïn Sebaâ pour votre location de voiture à Casablanca. Livraison gratuite convenue à l’avance, minimum 3 jours.",
    "heading": "Location de voiture dans les gares de Casablanca",
    "intro": "Vous arrivez en train à Casablanca ? Choisissez votre gare ci-dessous pour préparer une voiture au bon lieu. Les loueurs sont basés à Casablanca et organisent avec vous la livraison gratuite avant votre arrivée, après confirmation du véhicule et de vos dates.",
    "pickupIds": [
        "casa-voyageurs",
        "casa-port",
        "oasis",
        "ain-sebaa"
    ],
    "sections": [
        {
            "title": "Casa-Voyageurs, Casa-Port, Oasis ou Aïn Sebaâ",
            "text": "Sélectionnez la gare qui figure sur votre trajet. Le lien conserve ce lieu dans le catalogue et dans la demande de location. Préparez les informations utiles sur votre train pour convenir d’un point précis de rencontre avec le loueur. Les gares présentées sont des lieux de remise à organiser, sans comptoir Benatna sur place."
        },
        {
            "title": "Votre train, vos bagages et le modèle demandé",
            "text": "Choisissez vos dates et jusqu’à trois modèles, puis précisez vos voyageurs et bagages au loueur. Une citadine, une compacte ou un SUV peuvent répondre à des besoins différents : faites confirmer la version et l’espace adapté à votre séjour. Signalez un changement de train pour adapter le rendez-vous."
        },
        {
            "title": "Préparer le prix, la caution et le retour",
            "text": "Le prix par jour du catalogue est indicatif. Demandez le montant de toute la période, la caution, les documents requis et les conditions d’assurance et de kilométrage. La location dure au minimum trois jours. Le retour du véhicule se convient à l’avance avec le loueur."
        },
        {
            "title": "Une arrivée à Rabat ou à l’aéroport ?",
            "text": "Si vous arrivez finalement à Mohammed V, utilisez la page aéroport et sélectionnez ce lieu. Pour Rabat-Ville ou Rabat-Agdal, consultez le guide des lieux desservis : une livraison gratuite peut être étudiée depuis Casablanca, selon la disponibilité du loueur. Votre lieu de prise en charge doit être confirmé avant votre accord."
        }
    ],
    "faqs": [
        {
            "question": "Quelles gares de Casablanca peut-on sélectionner ?",
            "answer": "Casa-Voyageurs, Casa-Port, Oasis et Aïn Sebaâ figurent dans la sélection. Choisissez le lieu correspondant à votre trajet ; le loueur confirme le rendez-vous et le véhicule pour vos dates."
        },
        {
            "question": "Peut-on demander une livraison à une gare de Rabat ?",
            "answer": "Rabat-Ville et Rabat-Agdal sont des possibilités sur demande depuis Casablanca. Le loueur confirme sa disponibilité et convient avec vous du rendez-vous. La livraison est gratuite."
        },
        {
            "question": "Quand ma location est-elle confirmée ?",
            "answer": "Après votre demande avec dates, modèles et lieu, le loueur vérifie la disponibilité et vous communique le tarif et ses conditions. La location est confirmée après son accord et le vôtre. Benatna ne propose pas de paiement en ligne."
        }
    ],
    relatedLinks: [...rentalJourneyLinks, {"to": "/location-voiture-gare-casa-voyageurs", "label": "Préparer une arrivée à Casa-Voyageurs", "text": "Les informations utiles pour votre arrivée, votre modèle et la remise du véhicule."}]
},


  budget: {
    path: '/location-voiture-pas-cher-casablanca',
    title: 'Location voiture pas cher Casablanca dès 250 DH/jour | Benatna',
    description: 'Location de voiture pas chère à Casablanca : Dacia Sandero, Logan et Stepway dès 250 DH/jour, Clio et 208 dès 400 DH. Livraison gratuite aéroport et gare, 3 jours minimum, réponse sur WhatsApp.',
    heading: 'Location de voiture pas chère à Casablanca dès 250 DH/jour',
    intro: 'Vous cherchez une voiture économique pour vos vacances à Casablanca ? Les citadines et berlines Dacia sont proposées dès 250 DH par jour, la Clio, la 208 ou l’i20 dès 400 DH. Comparez les modèles ci-dessous, puis envoyez vos dates sur WhatsApp pour recevoir le prix total de votre séjour.',
    models: ['dacia-sandero', 'dacia-logan', 'dacia-sandero-stepway', 'renault-clio', 'peugeot-208', 'opel-corsa', 'hyundai-i20', 'seat-ibiza'],
    audience: tourismAudience,
    exclusions: tourismExclusions,
    relatedLinks: rentalJourneyLinks,
    sections: [
      { title: 'Payer moins cher sa location à Casablanca', text: 'Les prix les plus bas s’appliquent hors juillet-août et hors périodes de fêtes. Réservez plusieurs semaines avant votre arrivée, choisissez une citadine ou une berline Dacia et regroupez vos dates : à partir de 15 jours, le tarif journalier baisse légèrement. La livraison à l’aéroport Mohammed V et dans les gares desservies est gratuite.' },
      { title: 'Citadine ou berline ?', text: 'La Sandero et la Stepway sont faciles à garer en ville. La Logan offre un coffre plus grand pour les valises, au même prix de départ. Pour une boîte automatique, comparez la Clio, la 208 ou l’i20 selon la version disponible.' },
    ],
    faqs: [
      { question: 'Quelle est la voiture de location la moins chère à Casablanca ?', answer: 'La Dacia Sandero, la Dacia Logan et la Sandero Stepway, à partir de 250 DH par jour hors haute saison, pour une location de trois jours minimum.' },
      { question: 'Peut-on louer à 100, 150 ou 200 DH par jour ?', answer: 'Nos prix de départ sont de 250 DH par jour. Le loueur confirme le prix total pour vos dates ; les longues périodes de location peuvent bénéficier d’un tarif légèrement inférieur.' },
      { question: 'Y a-t-il des frais de livraison ?', answer: 'Non. La remise est gratuite à l’aéroport Mohammed V et dans les gares desservies de Casablanca.' },
      { question: 'Comment réserver ?', answer: 'Par WhatsApp : envoyez vos dates, le modèle souhaité et votre lieu d’arrivée. Aucun paiement en ligne.' },
    ],
  },
  suv: {
    path: '/location-suv-casablanca',
    title: 'Location SUV Casablanca dès 380 DH/jour | Benatna',
    description: 'Louez un SUV à Casablanca : Dacia Duster dès 380 DH/jour, Hyundai Tucson et Kia Sportage dès 640 DH. Livraison gratuite aéroport et gare, 3 jours minimum, demande sur WhatsApp.',
    heading: 'Location de SUV à Casablanca dès 380 DH/jour',
    intro: 'Un SUV pour les routes du Maroc, la famille et les bagages ? Le Dacia Duster est proposé dès 380 DH par jour, en boîte manuelle ou automatique ; le Hyundai Tucson, le Kia Sportage et le VW T-Roc offrent plus de confort. Comparez les modèles, puis demandez le prix de votre séjour sur WhatsApp.',
    models: ['dacia-duster', 'hyundai-tucson', 'kia-sportage', 'vw-t-roc'],
    audience: tourismAudience,
    exclusions: tourismExclusions,
    relatedLinks: rentalJourneyLinks,
    sections: [
      { title: 'Pourquoi choisir un SUV', text: 'Plus de place pour les passagers et les valises, une position de conduite haute et un meilleur confort sur les routes secondaires. Pour un trajet en famille depuis l’aéroport Mohammed V ou un circuit au départ de Casablanca, c’est le choix le plus courant.' },
      { title: 'Duster, Tucson ou Sportage ?', text: 'Le Duster est le SUV le plus abordable, dès 380 DH par jour. Le Tucson et le Sportage, dès 640 DH, sont automatiques et plus spacieux. Indiquez le nombre de passagers et de bagages dans votre demande : le loueur vous oriente vers le modèle adapté.' },
    ],
    faqs: [
      { question: 'Combien coûte la location d’un SUV à Casablanca ?', answer: 'À partir de 380 DH par jour pour un Dacia Duster et dès 640 DH pour un Hyundai Tucson ou un Kia Sportage, hors haute saison, pour trois jours minimum.' },
      { question: 'Existe-t-il des SUV automatiques ?', answer: 'Oui : le Duster en version automatique, le Tucson, le Sportage et le T-Roc. Précisez la boîte souhaitée dans votre demande.' },
      { question: 'Le SUV peut-il m’attendre à l’aéroport ?', answer: 'Oui, la remise est gratuite à l’aéroport Mohammed V et dans les gares desservies, à un point convenu à l’avance avec le loueur.' },
    ],
  },
  family: {
    path: '/location-voiture-7-places-casablanca',
    title: 'Location voiture 7 places Casablanca dès 380 DH/jour | Benatna',
    description: 'Location de voiture 7 places à Casablanca : Dacia Jogger dès 380 DH/jour. SUV familiaux Duster, Tucson et Sportage. Livraison gratuite à l’aéroport Mohammed V, 3 jours minimum.',
    heading: 'Location de voiture 7 places et familiale à Casablanca',
    intro: 'Vous arrivez à plusieurs, avec les enfants et les valises ? Le Dacia Jogger 7 places est proposé dès 380 DH par jour. Pour cinq passagers avec beaucoup de bagages, comparez aussi le Duster, le Tucson et le Sportage. La voiture vous attend à l’aéroport ou en gare, sans frais de livraison.',
    models: ['dacia-jogger', 'dacia-duster', 'hyundai-tucson', 'kia-sportage'],
    audience: tourismAudience,
    exclusions: tourismExclusions,
    relatedLinks: rentalJourneyLinks,
    sections: [
      { title: 'Le Dacia Jogger 7 places', text: 'Trois rangées de sièges pour sept personnes. Avec tous les sièges occupés, le coffre devient plus petit : pour sept passagers et de grosses valises, précisez le nombre de bagages dans votre demande pour que le loueur confirme que tout rentre.' },
      { title: 'Préparer une arrivée en famille', text: 'Indiquez votre heure d’arrivée, le nombre d’adultes et d’enfants et le nombre de valises. Si vous avez besoin d’un siège enfant, demandez-le au loueur : la disponibilité et le prix éventuel sont confirmés avant votre accord.' },
    ],
    faqs: [
      { question: 'Quel est le prix d’une voiture 7 places à Casablanca ?', answer: 'Le Dacia Jogger 7 places est proposé à partir de 380 DH par jour hors haute saison, pour trois jours minimum.' },
      { question: 'Proposez-vous des vans 9 places ?', answer: 'Non. Benatna propose uniquement des voitures de tourisme ; la plus grande capacité est le Dacia Jogger 7 places.' },
      { question: 'La livraison à l’aéroport est-elle gratuite ?', answer: 'Oui, à l’aéroport Mohammed V et dans les gares desservies de Casablanca.' },
    ],
  },
  week: {
    path: '/location-voiture-semaine-casablanca',
    title: 'Location voiture 1 semaine Casablanca dès 1 750 DH | Benatna',
    description: 'Louez une voiture une semaine à Casablanca : Dacia Sandero dès 1 750 DH les 7 jours, Duster dès 2 660 DH. Livraison gratuite aéroport et gare, demande sur WhatsApp.',
    heading: 'Location de voiture pour une semaine à Casablanca',
    intro: 'Une semaine de vacances à Casablanca ou au Maroc ? Voici le prix de départ pour 7 jours, modèle par modèle : dès 1 750 DH pour une Dacia Sandero, 2 660 DH pour un Duster ou un Jogger 7 places. Envoyez vos dates sur WhatsApp pour recevoir le prix total confirmé par le loueur.',
    models: ['dacia-sandero', 'dacia-logan', 'renault-clio', 'dacia-duster', 'dacia-jogger', 'hyundai-tucson'],
    weekly: true,
    audience: tourismAudience,
    exclusions: tourismExclusions,
    relatedLinks: rentalJourneyLinks,
    sections: [
      { title: 'Ce que comprend le prix à la semaine', text: 'Le prix affiché correspond à sept jours au tarif de départ, hors juillet-août et hors périodes de fêtes. La livraison à l’aéroport Mohammed V et dans les gares desservies est gratuite. La caution est séparée du prix et vous est précisée par le loueur avant votre accord.' },
      { title: 'Prolonger ou raccourcir', text: 'Vous pouvez demander de trois jours à plusieurs semaines. À partir de 15 jours, le tarif journalier baisse légèrement. Pour prolonger pendant le séjour, prévenez le loueur à l’avance afin qu’il confirme la disponibilité de la voiture.' },
    ],
    faqs: [
      { question: 'Combien coûte une voiture pour une semaine à Casablanca ?', answer: 'À partir de 1 750 DH pour 7 jours avec une Dacia Sandero ou Logan, 2 660 DH avec un Duster ou un Jogger 7 places, hors haute saison.' },
      { question: 'Peut-on louer pour un week-end ?', answer: 'La durée minimum est de trois jours. Un week-end de deux jours ne peut pas être demandé.' },
      { question: 'Comment réserver ?', answer: 'Par WhatsApp : envoyez vos dates, le modèle souhaité et votre lieu d’arrivée. Le loueur confirme la disponibilité et le prix total. Aucun paiement en ligne.' },
    ],
  },
};
