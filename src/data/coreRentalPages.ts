import type { CoreRentalContent } from '@/components/CoreRentalLanding';

export const coreRentalPages: Record<'casablanca' | 'airport' | 'longStay' | 'casaVoyageurs' | 'automatic' | 'railway', CoreRentalContent> = {
  casablanca: {
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
    pickupId: 'cmn',
    path: '/location-voiture-aeroport-casablanca',
    title: 'Location voiture aéroport Casablanca Mohammed V, 3 jours minimum | Benatna',
    description: 'Préparez votre voiture à l’aéroport Mohammed V de Casablanca. Livraison gratuite convenue à l’avance. Minimum 3 jours, maximum 6 mois. Demande WhatsApp.',
    heading: 'Votre voiture à l’aéroport Mohammed V de Casablanca',
    intro: 'Pour une arrivée à Casablanca, préparez votre demande avant le voyage : dates de location, modèle souhaité, passagers et bagages. Le loueur confirme la disponibilité puis organise avec vous le point de rendez-vous à Mohammed V.',
    sections: [
      { title: 'Un rendez-vous convenu avant votre arrivée', text: 'La livraison à l’aéroport desservi est gratuite. Échangez avec le loueur pour préciser votre arrivée et le lieu de rencontre avant le déplacement. En cas de changement de voyage, contactez-le pour adapter l’organisation. Aucun terminal précis, guichet Benatna ou délai de remise des clés n’est garanti par cette page.' },
      { title: 'Une voiture adaptée à votre séjour', text: 'Le catalogue présente des voitures de tourisme classiques. Comparez leur capacité et le type de boîte, puis faites confirmer le modèle et les conditions pour vos dates. La location dure au minimum trois jours et au maximum six mois calendaires. Les prix journaliers restent indicatifs jusqu’à la proposition du loueur.' },
      { title: 'Préparer la prise en charge et le retour', text: 'Le loueur vous précise les documents, la caution, les conditions contractuelles et l’organisation du retour avant votre accord. La demande WhatsApp ne remplace pas cette confirmation. Consultez le guide commun si votre arrivée se fait finalement dans une gare de Casablanca, ou si vous souhaitez demander une livraison à Rabat depuis Casablanca.' },
    ],
  },
  longStay: {
    path: '/location-longue-duree-casablanca',
    title: 'Location voiture pour un séjour à Casablanca, jusqu’à 6 mois | Benatna',
    description: 'Voiture de tourisme pour un séjour personnel à Casablanca, de 3 jours à 6 mois calendaires. Prix à confirmer avec le loueur. Livraison gratuite aux points desservis.',
    heading: 'Une voiture pour un séjour prolongé à Casablanca',
    intro: 'Vous prévoyez plusieurs semaines ou plusieurs mois à Casablanca ? Préparez une demande pour une voiture touristique classique et échangez avec le loueur sur vos dates, votre usage personnel et les conditions adaptées à votre séjour.',
    sections: [
      { title: 'Une durée définie par vos dates', text: 'Benatna traite les demandes de trois jours minimum à six mois calendaires maximum. Précisez les dates de départ et de retour, même pour un séjour de plusieurs mois. Une prolongation dépend de l’accord du loueur ; elle ne doit pas être supposée automatique.' },
      { title: 'Un tarif à confirmer pour la période', text: 'Les prix journaliers existants du catalogue permettent de comparer les modèles à titre indicatif. Demandez au loueur une proposition couvrant toute votre période ainsi que ses conditions de caution et de contrat. Aucune remise mensuelle, mensualité fixe ou assurance particulière n’est promise sur cette page.' },
      { title: 'Des séjours personnels depuis Casablanca', text: 'L’offre vise d’abord les MRE, touristes et vacanciers, avec des demandes locales possibles aux mêmes conditions. Il ne s’agit pas d’une offre de flotte d’entreprise ou de location professionnelle. La prise en charge se prépare à Casablanca ; une livraison gratuite à Rabat peut être demandée depuis Casablanca, selon la disponibilité du loueur.' },
    ],
  },
  casaVoyageurs: {
    path: '/location-voiture-gare-casa-voyageurs',
    pickupId: 'casa-voyageurs',
    title: 'Location voiture gare Casa-Voyageurs, minimum 3 jours | Benatna',
    description: 'Préparez une voiture à la gare Casa-Voyageurs à Casablanca. Livraison gratuite convenue à l’avance, de 3 jours à 6 mois. Tarif et disponibilité à confirmer.',
    heading: 'Votre voiture à la gare Casa-Voyageurs',
    intro: 'Vous arrivez à Casablanca en train ? Préparez vos dates et votre choix de voiture avant le voyage. Le loueur confirme la disponibilité, le tarif et le point de rendez-vous près de la gare Casa-Voyageurs.',
    sections: [
      { title: 'Préparer votre arrivée en gare', text: 'La livraison est gratuite et convenue à l’avance avec le loueur. Précisez votre train et les informations utiles à votre arrivée pour organiser le rendez-vous. Cette page ne garantit ni guichet Benatna, ni emplacement précis, ni délai de remise des clés.' },
      { title: 'Choisir le véhicule pour votre séjour', text: 'Comparez les modèles, la transmission et le nombre de places dans le catalogue. Vous pouvez retenir jusqu’à trois modèles pour votre demande. La location dure au minimum trois jours et au maximum six mois calendaires ; les prix journaliers sont indicatifs jusqu’à confirmation du loueur.' },
      { title: 'Une autre gare ou une arrivée à l’aéroport ?', text: 'Le guide présente aussi Casa-Port, Oasis, Aïn Sebaâ et l’aéroport Mohammed V. Choisissez le lieu précis dans votre demande. Nos loueurs sont basés à Casablanca ; Rabat reste une livraison sur demande depuis Casablanca, à confirmer avec le loueur.' },
    ],
  },
  automatic: {
    "path": "/location-voiture-automatique-casablanca",
    "title": "Location voiture automatique à Casablanca, 3 jours minimum | Benatna",
    "description": "Comparez les voitures automatiques pour votre séjour à Casablanca. De 3 jours à 6 mois, livraison gratuite aux points desservis. Tarif et modèle confirmés par le loueur.",
    "heading": "Une voiture automatique pour votre séjour à Casablanca",
    "intro": "Vous préférez une boîte automatique pour vos vacances ou votre retour au pays ? Comparez les modèles du catalogue et utilisez le filtre de transmission. Votre demande permet au loueur de confirmer une version adaptée à vos dates, vos passagers et vos bagages.",
    "sections": [
        {
            "title": "Faire confirmer la version automatique",
            "text": "Un même modèle peut exister en boîte manuelle ou automatique. Vérifiez la transmission de la version présentée, puis précisez votre préférence dans votre échange avec le loueur. Les photos et les prix journaliers du catalogue sont indicatifs ; le véhicule et le tarif final sont confirmés avant votre accord."
        },
        {
            "title": "Une prise en charge à Casablanca",
            "text": "La livraison est gratuite aux points desservis, notamment Mohammed V et les gares de Casablanca indiquées dans le guide. Le lieu précis et le rendez-vous sont convenus à l’avance. Rabat reste une livraison demandée depuis Casablanca, selon la disponibilité du loueur. Votre itinéraire de séjour peut ensuite être discuté avec lui selon le contrat."
        },
        {
            "title": "Préparer une demande complète",
            "text": "Choisissez vos dates, un à trois modèles et votre lieu de prise en charge. La durée est de trois jours minimum à six mois calendaires maximum. Vérifiez le récapitulatif avant d’ouvrir WhatsApp. Le loueur précise les documents, la caution et les modalités de règlement ; la demande ne confirme pas automatiquement une réservation."
        }
    ]
},
  railway: {
    "path": "/location-voiture-gare-oncf-maroc",
    "title": "Location voiture en gare de Casablanca, Rabat sur demande | Benatna",
    "description": "Préparez votre voiture à votre arrivée en gare de Casablanca. Livraison gratuite convenue à l’avance, 3 jours à 6 mois. Rabat sur demande depuis Casablanca.",
    "heading": "Votre voiture à l’arrivée en gare de Casablanca",
    "intro": "Vous arrivez en train pour un séjour à Casablanca ? Préparez votre demande avec vos dates, le modèle souhaité et votre gare d’arrivée. Les loueurs sont basés à Casablanca ; ils confirment avec vous le véhicule, le tarif et le rendez-vous avant le déplacement.",
    "sections": [
        {
            "title": "Choisir la gare de prise en charge",
            "text": "Le guide commun présente Casa-Voyageurs, Casa-Port, Oasis et Aïn Sebaâ. Choisissez le point précis dans votre demande et échangez avec le loueur pour organiser votre arrivée. La livraison est gratuite aux points desservis. La présence d’une gare dans le guide ne correspond pas à un guichet ou un comptoir Benatna."
        },
        {
            "title": "Préparer un rendez-vous avant votre train",
            "text": "Communiquez les informations utiles à votre arrivée pour convenir du lieu de rencontre avec le loueur. En cas de changement de voyage, contactez-le pour adapter l’organisation. Les modalités de remise du véhicule et de retour sont fixées à l’avance ; aucun délai de réponse ou de remise des clés n’est imposé par cette page."
        },
        {
            "title": "Demander Rabat depuis Casablanca",
            "text": "Rabat-Ville et Rabat Agdal figurent dans le guide comme possibilités de livraison depuis Casablanca, à confirmer avec le loueur. La durée reste de trois jours minimum à six mois calendaires maximum. Comparez les modèles du catalogue, puis préparez une demande qualifiée avec vos dates et le point d’arrivée choisi."
        }
    ]
},
};
