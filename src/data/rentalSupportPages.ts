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
  intro: 'Choisissez vos dates, jusqu’à trois modèles et votre lieu de prise en charge. La location dure de trois jours à six mois calendaires. Le loueur confirme disponibilité, tarif et conditions avant votre accord.',
  links: [
    { title: 'Comparer les voitures à Casablanca', link: '/location-voiture-casablanca' },
    { title: 'Arriver à l’aéroport Mohammed V', link: '/location-voiture-aeroport-casablanca' },
    { title: 'Choisir votre gare à Casablanca', link: '/location-voiture-gare-oncf-maroc' },
  ],
};
const cta = {
  title: 'Préparer votre location à Casablanca',
  subtitle: 'Dates, modèles et lieu avant envoi • Tarif et conditions confirmés par le loueur',
  buttonText: 'Choisir mes véhicules et mes dates',
  buttonLink: '/louer?city=Casablanca',
};

export const rentalSupportPages: Record<'prices' | 'deposit', LongTailPageConfig> = {
  prices: {
    slug: 'prix-location-voiture-maroc-2026',
    title: 'Prix de location à Casablanca',
    metaTitle: 'Prix location voiture à Casablanca : repères et devis | Benatna',
    metaDescription: 'Comparez les prix journaliers indicatifs à Casablanca : Clio, Duster, Golf et Tucson. Tarif total et caution confirmés par le loueur, livraison gratuite aux points desservis.',
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
        { title: 'La caution est distincte du prix de location', content: 'Faites préciser séparément le prix à régler et la caution demandée. Le montant de la caution, son moyen de dépôt et les conditions de restitution dépendent du loueur et du véhicule confirmé. Demandez ces informations avant votre accord plutôt que de supposer un montant uniforme ou une absence de caution.' },
        { title: 'Livraison gratuite à Casablanca, Rabat sur demande', content: 'La livraison est gratuite aux points desservis de Casablanca, notamment Mohammed V et les gares du guide. Le rendez-vous est convenu à l’avance avec le loueur. Une livraison à Rabat peut être étudiée depuis Casablanca selon sa disponibilité. Choisissez le lieu précis dans votre demande pour organiser la remise et le retour.' },
        { title: 'Une semaine, un mois ou un séjour prolongé', content: 'La durée va de trois jours à six mois calendaires. Pour plusieurs semaines ou mois, demandez une proposition couvrant toute la période. Le catalogue sert de repère ; le tarif final reste à confirmer par le loueur. La location n’est pas confirmée par le simple envoi d’une demande WhatsApp et Benatna ne propose pas de paiement en ligne.' },
      ],
      faq: [
        { question: 'Quel prix prévoir pour louer une voiture à Casablanca ?', answer: 'Comparez les prix journaliers indicatifs des modèles du catalogue, puis transmettez vos dates pour obtenir le tarif de toute la période. Le loueur confirme le véhicule, la version et le prix avant votre accord.' },
        { question: 'La livraison à Mohammed V ou en gare est-elle payante ?', answer: 'La livraison est gratuite aux points desservis de Casablanca. Le lieu précis et le rendez-vous sont convenus à l’avance avec le loueur. Rabat reste une livraison sur demande depuis Casablanca, selon sa disponibilité.' },
        { question: 'La caution fait-elle partie du prix annoncé ?', answer: 'Le prix de location et la caution sont deux éléments à faire préciser séparément. Demandez au loueur le montant de la caution, le moyen de dépôt accepté et ses conditions de restitution.' },
        { question: 'Y a-t-il un forfait mensuel garanti ?', answer: 'Demandez un tarif pour vos dates, jusqu’à six mois calendaires. Aucun montant mensuel fixe ni réduction systématique n’est garanti par cette page.' },
      ],
    },
    relatedServices: [
      { title: 'Comprendre la caution', description: 'Les questions à poser au loueur avant votre accord.', link: '/caution-location-voiture-maroc' },
      { title: 'Location de voiture à Casablanca', description: 'Préparer un séjour personnel jusqu’à six mois.', link: '/location-voiture-casablanca' },
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
    metaTitle: 'Caution location voiture à Casablanca : quoi vérifier | Benatna',
    metaDescription: 'Préparez votre location à Casablanca : montant de caution, moyen de dépôt, restitution et franchise à confirmer avec le loueur avant votre accord.',
    keywords: 'caution location voiture casablanca, dépôt garantie voiture casablanca, caution location voiture maroc',
    h1: 'Caution de location de voiture : préparer votre demande à Casablanca',
    heroSubtitle: 'Montant • Moyen de dépôt • Conditions de restitution • Accord avec le loueur',
    category: { label: 'Location à Casablanca', href: '/location-voiture-casablanca' },
    rentalJourney, cta,
    content: {
      intro: 'La caution est l’une des questions qui reviennent dans les demandes Benatna, avec le prix et la livraison. Pour votre location à Casablanca, faites préciser ses modalités par le loueur avant votre accord. Cette page vous aide à préparer les questions ; elle ne fixe pas un montant commun à tous les véhicules ou à tous les loueurs.',
      sections: [
        { title: 'Quel montant demander au loueur ?', content: 'Indiquez vos dates et les modèles souhaités, puis demandez le montant exact de la caution pour le véhicule proposé. Si vous comparez plusieurs voitures, vérifiez la caution de chacune en plus du prix total. Le nom d’une catégorie ou la photo d’un modèle ne suffit pas à connaître les conditions du loueur.' },
        { title: 'Quel moyen de dépôt est accepté ?', content: 'Demandez au loueur quels moyens sont acceptés pour votre dossier et les documents à présenter. Vérifiez les modalités avant votre arrivée. Une caution en espèces, un virement, une carte bancaire ou une absence de caution ne doivent pas être supposés possibles pour tous les véhicules. Benatna ne demande pas de paiement en ligne sur le site.' },
        { title: 'Quand et comment la caution est-elle restituée ?', content: 'Faites confirmer le mode de restitution, les conditions à respecter et le délai annoncé par le loueur pour le moyen de dépôt retenu. Conservez les documents et échanges utiles. Cette page ne promet pas de restitution immédiate ni de délai bancaire uniforme.' },
        { title: 'Caution, assurance et franchise : poser trois questions distinctes', content: 'Demandez les conditions de caution, les garanties d’assurance et la franchise prévues au contrat. Une caution et une franchise ne désignent pas la même chose : la franchise concerne la part restant à votre charge dans les cas prévus au contrat. Faites préciser les garanties, les exclusions et les modalités applicables au véhicule plutôt que de déduire la couverture du seul montant de caution.' },
        { title: 'Préparer la remise et le retour du véhicule', content: 'Convenez du lieu de remise et de restitution avant votre accord, puis vérifiez avec le loueur l’état du véhicule et les éléments portés aux documents de location. Vous pouvez conserver vos propres photos et les échanges utiles. La livraison est gratuite aux points desservis de Casablanca ; Rabat peut être demandé depuis Casablanca selon la disponibilité du loueur.' },
      ],
      faq: [
        { question: 'Quel est le montant de la caution chez Benatna ?', answer: 'Le loueur confirme le montant pour le véhicule et les dates demandés. Aucun montant unique n’est fixé par cette page pour tous les modèles.' },
        { question: 'Peut-on louer sans caution ou sans carte de crédit ?', answer: 'Demandez au loueur les modalités acceptées pour votre dossier avant votre accord. L’absence de caution ou de carte de crédit ne peut pas être garantie pour tous les véhicules.' },
        { question: 'La caution est-elle rendue immédiatement ?', answer: 'Le mode, les conditions et le délai de restitution sont à confirmer avec le loueur pour le moyen de dépôt retenu. Cette page ne promet pas de délai uniforme.' },
        { question: 'Peut-on comparer plusieurs modèles avant de décider ?', answer: 'Oui. Sélectionnez jusqu’à trois modèles, vos dates et le lieu. Demandez ensuite au loueur de préciser pour les véhicules proposés le prix total, la caution et les conditions du contrat. La durée va de trois jours à six mois calendaires.' },
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
