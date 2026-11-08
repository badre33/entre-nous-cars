export interface CasablancaModelContent {
  name: string;
  summary: string;
  title: string;
  description: string;
  sections: { title: string; text: string }[];
}

// Editorial guidance for comparison, independent of stock and supplier-specific terms.
export const casablancaModelContent: Record<string, CasablancaModelContent> = {
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
};
