import type { LongTailPageConfig } from './longTailPages';
import { getVehicleDetail } from './vehicleDetails';
import { currentDailyPrice } from '@/utils/priceCalculations';

// Same indicative daily prices as the four existing vehicle pages, not a market survey.
const indicativePrices = ['renault-clio', 'dacia-duster', 'vw-golf', 'hyundai-tucson'].map(slug => {
  const vehicle = getVehicleDetail(slug);
  if (!vehicle) throw new Error(`Missing guide model: ${slug}`);
  return `${vehicle.name} : ${currentDailyPrice(vehicle.priceFrom)} DH/jour`;
}).join(' ; ');
const rentalJourney = {
  intro: 'Choisissez vos dates, jusqu’à trois modèles et votre lieu de prise en charge. La location dure au minimum trois jours. Benatna vous confirme la voiture, le prix total et les documents sous 1 heure. Sans caution.',
  links: [
    { title: 'Comparer les voitures à Casablanca', link: '/location-voiture-casablanca' },
    { title: 'Arriver à l’aéroport Mohammed V', link: '/location-voiture-aeroport-casablanca' },
    { title: 'Choisir votre gare à Casablanca', link: '/location-voiture-gare-oncf-maroc' },
  ],
};
const cta = {
  title: 'Préparer votre location à Casablanca',
  subtitle: 'Dates, modèles et lieu • Confirmation sous 1 heure • Sans caution',
  buttonText: 'Choisir mes véhicules et mes dates',
  buttonLink: '/louer?city=Casablanca',
};

export const rentalSupportPages: Record<'prices' | 'deposit', LongTailPageConfig> = {
  prices: {
    slug: 'prix-location-voiture-maroc-2026',
    title: 'Prix de location à Casablanca',
    metaTitle: 'Prix location voiture à Casablanca : repères et devis | Benatna',
    metaDescription: 'Comparez les prix journaliers indicatifs à Casablanca : Clio, Duster, Golf et Tucson. Sans caution, tarif total confirmé sous 1 heure, livraison gratuite aux points desservis.',
    keywords: 'prix location voiture casablanca, tarif location voiture casablanca, prix clio duster golf tucson',
    h1: 'Prix de location de voiture à Casablanca : préparer votre budget',
    heroSubtitle: 'Prix journaliers indicatifs • Tarif pour vos dates • Livraison gratuite aux points desservis',
    category: { label: 'Location à Casablanca', href: '/location-voiture-casablanca' },
    rentalJourney, cta,
    content: {
      intro: 'Vous comparez les prix pour vos vacances ou votre retour au pays ? Benatna présente des modèles et des prix indicatifs de loueurs basés à Casablanca. Pour connaître le montant de votre location, choisissez les mêmes dates et le même lieu pour les modèles comparés, puis faites confirmer une proposition par le loueur. Cette page concerne l’offre Benatna à Casablanca ; elle n’est pas une grille de prix de tout le marché marocain.',
      sections: [
        { title: 'Repères journaliers pour quatre modèles du catalogue', content: `${indicativePrices}. Ces repères reprennent les prix indicatifs des fiches véhicules. Ils ne constituent ni un stock confirmé ni un tarif garanti pour vos dates. Consultez le catalogue pour les autres modèles et faites préciser la version et la transmission proposées.` },
        { title: 'Comparer le prix total sur les mêmes dates', content: 'Pour comparer deux propositions, indiquez une date de départ et une date de retour identiques, le lieu de remise et vos besoins en passagers et bagages. Demandez au loueur le montant de toute la période et ce que prévoit le contrat : kilométrage, assurance, franchise et modalités de règlement. Un prix journalier isolé ne permet pas de déduire toutes les conditions.' },
        { title: 'Sans caution : deux façons de régler', content: 'Vous ne laissez pas de caution. Deux options au choix : régler 100 % du prix par virement avant la location, sans supplément, ou verser à la réservation un acompte de 30 % plus 500 DH. Votre choix figure dans le récapitulatif et dans le message de réservation.' },
        { title: 'Livraison gratuite à Casablanca, Rabat sur demande', content: 'La livraison est gratuite aux points desservis de Casablanca, notamment Mohammed V et les gares du guide. Le rendez-vous est convenu à l’avance avec le loueur. Une livraison à Rabat peut être étudiée depuis Casablanca selon sa disponibilité. Choisissez le lieu précis dans votre demande pour organiser la remise et le retour.' },
        { title: 'Une semaine, un mois ou un séjour prolongé', content: 'La durée minimum est de trois jours. Pour plusieurs semaines ou mois, demandez une proposition couvrant toute la période. Le catalogue sert de repère ; le tarif final reste à confirmer par le loueur. La location n’est pas confirmée par le simple envoi d’une demande WhatsApp et Benatna ne propose pas de paiement en ligne.' },
      ],
      faq: [
        { question: 'Quel prix prévoir pour louer une voiture à Casablanca ?', answer: 'Comparez les prix journaliers indicatifs des modèles du catalogue, puis transmettez vos dates pour obtenir le tarif de toute la période. Le loueur confirme le véhicule, la version et le prix avant votre accord.' },
        { question: 'La livraison à Mohammed V ou en gare est-elle payante ?', answer: 'La livraison est gratuite aux points desservis de Casablanca. Le lieu précis et le rendez-vous sont convenus à l’avance avec le loueur. Rabat reste une livraison sur demande depuis Casablanca, selon sa disponibilité.' },
        { question: 'Faut-il prévoir une caution en plus du prix ?', answer: 'Non. Vous réglez 100 % du prix avant la location, sans supplément, ou un acompte de 30 % plus 500 DH à la réservation. Aucune caution n’est demandée.' },
        { question: 'Y a-t-il un forfait mensuel garanti ?', answer: 'Demandez un tarif pour vos dates, à partir de trois jours. Aucun montant mensuel fixe ni réduction systématique n’est garanti par cette page.' },
      ],
    },
    relatedServices: [
      { title: 'Louer sans caution', description: 'Les deux options de paiement et ce que précise le contrat.', link: '/caution-location-voiture-maroc' },
      { title: 'Location de voiture à Casablanca', description: 'Louer une voiture de tourisme pour votre séjour.', link: '/location-voiture-casablanca' },
      { title: 'Livraison : gares et aéroports', description: 'Choisir un lieu desservi et préparer la remise du véhicule.', link: '/prise-en-charge-casablanca-rabat' },
    ],
    relatedPages: [
      { title: 'Renault Clio 5 à Casablanca', link: '/vehicule/renault-clio' },
      { title: 'Dacia Duster à Casablanca', link: '/vehicule/dacia-duster' },
      { title: 'Volkswagen Golf à Casablanca', link: '/vehicule/vw-golf' },
      { title: 'Hyundai Tucson à Casablanca', link: '/vehicule/hyundai-tucson' },
    ],
  },
  deposit: {
    slug: 'caution-location-voiture-maroc',
    title: 'Caution de location à Casablanca',
    metaTitle: 'Caution location voiture Casablanca : louer sans caution | Benatna',
    metaDescription: 'Louez une voiture à Casablanca sans caution : 100 % du prix avant la location ou acompte de 30 % plus 500 DH. Assurance et franchise précisées à la confirmation.',
    keywords: 'caution location voiture casablanca, dépôt garantie voiture casablanca, caution location voiture maroc',
    h1: 'Caution de location de voiture : louer sans caution à Casablanca',
    heroSubtitle: 'Sans caution • Deux options de paiement • Confirmation sous 1 heure • Annulation 48 h',
    category: { label: 'Location à Casablanca', href: '/location-voiture-casablanca' },
    rentalJourney, cta,
    content: {
      intro: 'La caution est l’une des questions qui reviennent le plus, avec le prix et la livraison. Chez Benatna, vous n’en laissez pas : vous choisissez de régler 100 % du prix avant la location, sans supplément, ou de verser un acompte de 30 % plus 500 DH à la réservation. Cette page détaille ces deux options et ce que le contrat précise encore.',
      sections: [
        { title: 'Option 1 : tout régler avant la location', content: 'Vous payez 100 % du prix de la période par virement avant la remise du véhicule, sans supplément. Aucune caution n’est demandée. Le montant exact figure dans la confirmation que Benatna vous envoie sur WhatsApp sous 1 heure.' },
        { title: 'Option 2 : acompte de 30 % plus 500 DH', content: 'Vous versez à la réservation, par virement, un acompte de 30 % du prix de la période plus 500 DH. Aucune caution n’est demandée. Aucune carte bancaire n’est nécessaire pour réserver : Benatna ne prend aucun paiement en ligne sur le site.' },
        { title: 'Annulation et remboursement', content: 'L’acompte est remboursé à 100 % en cas d’annulation jusqu’à 48 h avant le départ, à 50 % moins de 48 h avant, et n’est plus remboursé après le début de la location.' },
        { title: 'Sans caution ne veut pas dire sans assurance', content: 'Les garanties d’assurance, la franchise et les exclusions prévues au contrat sont précisées pour le véhicule confirmé. Une caution et une franchise ne désignent pas la même chose : la franchise concerne la part restant à votre charge dans les cas prévus au contrat. Lisez ces conditions avant la remise du véhicule.' },
        { title: 'Préparer la remise et le retour du véhicule', content: 'Convenez du lieu de remise et de restitution avant votre accord, puis vérifiez avec le loueur l’état du véhicule et les éléments portés aux documents de location. Vous pouvez conserver vos propres photos et les échanges utiles. La livraison est gratuite aux points desservis de Casablanca ; Rabat peut être demandé depuis Casablanca selon la disponibilité du loueur.' },
      ],
      faq: [
        { question: 'Quel est le montant de la caution chez Benatna ?', answer: 'Aucun. Vous louez sans caution, en réglant 100 % du prix avant la location ou un acompte de 30 % plus 500 DH à la réservation.' },
        { question: 'Peut-on louer sans caution ou sans carte de crédit ?', answer: 'Oui. Aucune caution n’est demandée et le paiement se fait par virement : aucune carte de crédit n’est nécessaire pour réserver.' },
        { question: 'Que se passe-t-il si j’annule ?', answer: 'L’acompte est remboursé à 100 % jusqu’à 48 h avant le départ, à 50 % moins de 48 h avant, et n’est plus remboursé après le début de la location.' },
        { question: 'Peut-on comparer plusieurs modèles avant de décider ?', answer: 'Oui. Sélectionnez jusqu’à trois modèles, vos dates et le lieu. Benatna vous confirme sous 1 heure la voiture disponible, le prix total et les documents requis. La durée minimum est de trois jours.' },
      ],
    },
    relatedServices: [
      { title: 'Comparer les prix à Casablanca', description: 'Prix journaliers indicatifs et tarif pour votre période.', link: '/prix-location-voiture-maroc-2026' },
      { title: 'Livraison : gares et aéroports', description: 'Préparer la remise du véhicule aux points desservis.', link: '/prise-en-charge-casablanca-rabat' },
      { title: 'Voitures automatiques à Casablanca', description: 'Préciser la version souhaitée dans votre échange avec le loueur.', link: '/location-voiture-automatique-casablanca' },
    ],
    relatedPages: [{ title: 'Location de voiture à Casablanca', link: '/location-voiture-casablanca' }],
  },
};
