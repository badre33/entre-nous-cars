import type { CoreRentalContent } from '@/components/CoreRentalLanding';

export const coreRentalPages: Record<'casablanca' | 'airport' | 'longStay', CoreRentalContent> = {
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
};
