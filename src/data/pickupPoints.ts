export const pickupPoints = [
  { id: 'cmn', city: 'Casablanca', name: 'Aéroport Mohammed V', detail: 'Indiquez le numéro de vol, l’heure d’arrivée et le terminal si connu. Le loueur confirme le point de rendez-vous et les frais.' },
  { id: 'casa-voyageurs', city: 'Casablanca', name: 'Gare Casa-Voyageurs', detail: 'Indiquez le train et l’heure d’arrivée. La sortie et le point de remise sont convenus avec le loueur.' },
  { id: 'casa-port', city: 'Casablanca', name: 'Gare Casa-Port', detail: 'Précisez votre heure d’arrivée et vos bagages. Le loueur confirme où la remise du véhicule peut s’organiser.' },
  { id: 'oasis', city: 'Casablanca', name: 'Gare de l’Oasis', detail: 'Le rendez-vous à proximité de la gare est à convenir avec le loueur selon vos horaires.' },
  { id: 'ain-sebaa', city: 'Casablanca', name: 'Gare d’Aïn Sebaâ', detail: 'Communiquez votre train et votre heure d’arrivée pour faire confirmer la remise du véhicule.' },
  { id: 'rba', city: 'Rabat', name: 'Aéroport Rabat-Salé', detail: 'Livraison depuis Casablanca sur demande. Faisabilité, horaire, frais et restitution doivent être confirmés.' },
  { id: 'rabat-agdal', city: 'Rabat', name: 'Gare Rabat-Agdal', detail: 'Livraison depuis Casablanca sur demande, après confirmation du loueur et des frais.' },
  { id: 'rabat-ville', city: 'Rabat', name: 'Gare Rabat-Ville', detail: 'Indiquez votre train. Le loueur étudie la livraison depuis Casablanca et confirme le rendez-vous et les frais.' },
] as const;
export const rentalFacts = [
  { question: 'Où Benatna propose-t-il la prise en charge ?', answer: 'Nos loueurs sont basés à Casablanca. La remise peut être demandée en ville, à l’aéroport Mohammed V ou près d’une gare de Casablanca. Le point exact, les horaires et les éventuels frais sont confirmés par le loueur. Rabat reste une livraison sur demande depuis Casablanca.' },
  { question: 'Quelle est la durée minimum de location ?', answer: 'La location dure au minimum trois jours et au maximum six mois. Les dates, la disponibilité et le tarif final doivent être confirmés par le loueur.' },
  { question: 'À qui s’adresse Benatna ?', answer: 'Benatna s’adresse en priorité aux Marocains résidant à l’étranger (MRE), aux touristes et aux vacanciers qui recherchent une voiture de tourisme pour leur séjour. Les demandes locales restent possibles dans la même zone et aux mêmes conditions.' },
  { question: 'Peut-on demander une voiture à Rabat ?', answer: 'Oui, une livraison à Rabat, à ses gares ou à l’aéroport Rabat-Salé peut être étudiée depuis Casablanca. Elle n’est pas garantie : le loueur confirme sa faisabilité, les frais et les conditions de restitution.' },
  { question: 'Benatna propose-t-il des vans, mariages ou locations professionnelles ?', answer: 'Non. Benatna ne propose pas de vans, minibus, utilitaires, prestations de mariage, événementielles ou locations professionnelles. L’offre porte sur des voitures de tourisme pour des séjours et vacances, à partir de trois jours.' },
  { question: 'Peut-on payer et confirmer la réservation sur le site ?', answer: 'Le site permet de préparer une demande, puis de la transmettre par WhatsApp. Il n’y a pas de paiement en ligne. Une demande envoyée n’est pas une réservation confirmée : le loueur doit confirmer disponibilité, prix et conditions.' },
  { question: 'Que faut-il préciser pour une arrivée en avion ou en train ?', answer: 'Indiquez le lieu de prise en charge, les dates et heures de location, le vol ou le train, le nombre de passagers et les bagages. Demandez au loueur de confirmer les documents requis, l’assurance, la caution, le kilométrage, le lieu de remise et les frais éventuels.' },
  { question: 'La livraison à Marrakech ou Tanger est-elle proposée ?', answer: 'Non. La prise en charge se concentre actuellement sur Casablanca, avec Rabat sur demande. Aucune livraison à Marrakech, Tanger ou dans une autre ville n’est proposée actuellement.' },
];
