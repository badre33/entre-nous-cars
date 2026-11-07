import type { CoreRentalContent } from '@/components/CoreRentalLanding';

const rentalJourneyLinks = [
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


export const coreRentalPages: Record<'casablanca' | 'airport' | 'longStay' | 'casaVoyageurs' | 'automatic' | 'railway', CoreRentalContent> = {
  casablanca: {
    relatedLinks: rentalJourneyLinks,
    showModelComparison: true,
    path: '/location-voiture-casablanca',
    title: 'Location de voiture à Casablanca, minimum 3 jours | Benatna',
    description: 'Voitures classiques pour votre séjour à Casablanca. Minimum 3 jours, maximum 6 mois. Livraison gratuite aux gares et aéroports desservis. Rabat sur demande.',
    heading: 'Location de voiture à Casablanca pour votre séjour',
    intro: 'Vous arrivez pour des vacances, un retour au pays ou un séjour personnel ? Benatna vous permet de préparer une demande auprès de loueurs basés à Casablanca, puis de confirmer avec eux une voiture adaptée à votre séjour.',
    sections: [
      { title: 'Choisir une voiture de tourisme classique', text: 'Comparez les modèles du catalogue selon le nombre de passagers, les bagages et la transmission souhaitée. Une citadine peut convenir aux déplacements en ville ; une berline ou un SUV classique peut offrir davantage de place. Les modèles et prix journaliers affichés sont indicatifs : ils ne prouvent pas une disponibilité pour vos dates.' },
      { title: 'Organiser votre arrivée à Casablanca', text: 'La livraison est gratuite aux points desservis, notamment l’aéroport Mohammed V et les gares indiquées dans notre guide. Transmettez votre point d’arrivée avant le départ pour convenir du rendez-vous avec le loueur. La présence d’un point dans le guide ne signifie pas que Benatna y possède une agence ou un comptoir.' },
      { title: 'Recevoir une proposition pour vos dates', text: 'Choisissez une période de trois jours à six mois calendaires. Votre demande WhatsApp sert à préciser vos besoins ; le loueur vérifie le modèle, le tarif final et ses conditions. Il n’y a ni paiement en ligne sur Benatna ni réservation automatiquement confirmée en cliquant sur WhatsApp.' },
    ],
  },
  airport: {
    relatedLinks: rentalJourneyLinks,
    showModelComparison: true,
    pickupId: 'cmn',
    path: '/location-voiture-aeroport-casablanca',
    title: 'Location voiture aéroport Casablanca Mohammed V, 3 jours minimum | Benatna',
    description: 'Préparez votre voiture à l’aéroport Mohammed V de Casablanca. Livraison gratuite convenue à l’avance. Minimum 3 jours, maximum 6 mois. Demande WhatsApp.',
    heading: 'Location de voiture à l’aéroport Casablanca Mohammed V',
    intro: 'Pour une arrivée à Casablanca, préparez votre demande avant le voyage : dates de location, modèle souhaité, passagers et bagages. Le loueur confirme la disponibilité puis organise avec vous le point de rendez-vous à Mohammed V.',
    sections: [
      { title: 'Un rendez-vous convenu avant votre arrivée', text: 'La livraison à l’aéroport desservi est gratuite. Échangez avec le loueur pour préciser votre arrivée et le lieu de rencontre avant le déplacement. En cas de changement de voyage, contactez-le pour adapter l’organisation. Le point précis de remise du véhicule et les modalités du retour sont fixés avec lui avant votre accord.' },
      { title: 'Prix et caution pour une location à Mohammed V', text: 'Le prix journalier du catalogue sert de repère : transmettez les dates de départ et de retour pour obtenir le tarif de toute la période. La livraison aux points desservis est gratuite. La caution est distincte du prix de location : son montant, le moyen de dépôt et les conditions de restitution sont précisés par le loueur avant votre accord. Benatna ne propose pas de paiement en ligne.' },
      { title: 'Une voiture adaptée à votre séjour', text: 'Le catalogue présente des voitures de tourisme classiques. Comparez leur capacité et le type de boîte, puis faites confirmer le modèle et les conditions pour vos dates. La location dure au minimum trois jours et au maximum six mois calendaires. Les prix journaliers restent indicatifs jusqu’à la proposition du loueur.' },
      { title: 'Préparer la prise en charge et le retour', text: 'Le loueur vous précise les documents, la caution, les conditions contractuelles et l’organisation du retour avant votre accord. La demande WhatsApp ne remplace pas cette confirmation. Consultez le guide commun si votre arrivée se fait finalement dans une gare de Casablanca, ou si vous souhaitez demander une livraison à Rabat depuis Casablanca.' },
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
            "text": "Les prix journaliers sont indicatifs. Préparez une période de trois jours à six mois calendaires et demandez le tarif total pour les modèles retenus. Le loueur précise la caution, son moyen de dépôt, ses conditions de restitution et le contrat. Le choix automatique ne permet pas de déduire un montant de caution ni un supplément fixe."
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
            "answer": "Oui, la demande peut couvrir trois jours à six mois calendaires. Précisez vos dates pour faire confirmer le modèle, la version automatique et le tarif de toute la période."
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
            "text": "Le prix par jour du catalogue est indicatif. Demandez le montant de toute la période, la caution, les documents requis et les conditions d’assurance et de kilométrage. La location dure de trois jours à six mois calendaires. Le retour du véhicule se convient à l’avance avec le loueur."
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

};
