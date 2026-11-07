import type { LongTailPageConfig } from './longTailPages';

const questions = [
  { question: 'Où peut-on demander la remise du véhicule ?', answer: 'Les loueurs sont basés à Casablanca. Choisissez un point desservi à Casablanca, notamment Mohammed V ou une gare du guide. Rabat reste une livraison sur demande depuis Casablanca selon la disponibilité du loueur.' },
  { question: 'Quelle durée de location peut-on demander ?', answer: 'De trois jours minimum à six mois calendaires maximum. Indiquez des dates précises, y compris pour plusieurs semaines ou mois. Une prolongation demande l’accord du loueur.' },
  { question: 'La livraison est-elle gratuite ?', answer: 'Oui, aux points desservis de Casablanca et, sur demande, de Rabat. Le rendez-vous et le lieu précis de remise et de retour sont convenus à l’avance avec le loueur.' },
  { question: 'Le prix du catalogue est-il le tarif final ?', answer: 'Les prix journaliers affichés sont indicatifs. Transmettez vos dates pour faire confirmer le tarif de toute la période, le modèle et les conditions avant votre accord.' },
  { question: 'Quel montant de caution et quel moyen de paiement prévoir ?', answer: 'Le loueur précise le montant de caution, le moyen de dépôt accepté, les conditions et le délai de restitution, ainsi que les modalités de règlement. Aucun montant unique ou moyen de paiement n’est garanti pour tous les véhicules.' },
  { question: 'Peut-on choisir une boîte automatique ?', answer: 'Le catalogue permet de filtrer les variantes automatiques. Précisez également votre préférence au loueur, qui confirme la version proposée pour vos dates. La photo illustre le modèle et ne garantit pas une finition ou une couleur.' },
  { question: 'Comment confirmer une location ?', answer: 'Préparez vos dates, jusqu’à trois modèles et votre lieu, puis vérifiez le récapitulatif avant d’ouvrir WhatsApp. La demande ne confirme pas une réservation : il faut l’accord du loueur et le vôtre. Benatna ne propose pas de paiement en ligne.' },
  { question: 'Quels documents et quelles conditions vérifier ?', answer: 'Demandez au loueur les documents requis, ses critères pour les conducteurs, les conditions de kilométrage, les garanties d’assurance et la franchise du contrat. Ces modalités sont à confirmer pour le véhicule proposé avant votre accord.' },
];
const rentalJourney = {
  intro: 'Préparez une demande complète pour un séjour personnel de trois jours à six mois : dates, modèles et lieu. La livraison est gratuite aux points desservis et le rendez-vous est convenu à l’avance.',
  links: [
    { title: 'Location de voiture à Casablanca', link: '/location-voiture-casablanca' },
    { title: 'Préparer une arrivée à Mohammed V', link: '/location-voiture-aeroport-casablanca' },
    { title: 'Choisir votre gare à Casablanca', link: '/location-voiture-gare-oncf-maroc' },
  ],
};
const cta = { title: 'Préparer votre demande à Casablanca', subtitle: 'Dates, modèles et lieu • Disponibilité et conditions confirmées par le loueur', buttonText: 'Choisir mes véhicules et mes dates', buttonLink: '/louer?city=Casablanca' };
const relatedServices = [
  { title: 'Prix de location à Casablanca', description: 'Repères indicatifs et tarif pour vos dates.', link: '/prix-location-voiture-maroc-2026' },
  { title: 'Préparer les questions sur la caution', description: 'Montant, moyen de dépôt et restitution à confirmer.', link: '/caution-location-voiture-maroc' },
  { title: 'Gares et aéroports desservis', description: 'Casablanca et Rabat sur demande depuis Casablanca.', link: '/prise-en-charge-casablanca-rabat' },
];
export const rentalAudiencePages: Record<'mre' | 'faq', LongTailPageConfig> = {
  mre: {
    slug: 'location-voiture-mre-maroc', title: 'Location pour les MRE à Casablanca',
    metaTitle: 'Location voiture MRE à Casablanca pour votre séjour | Benatna',
    metaDescription: 'MRE : préparez une voiture à Casablanca pour votre retour au pays. Minimum 3 jours, jusqu’à 6 mois, livraison gratuite aux points desservis. Rabat sur demande.',
    keywords: 'location voiture mre casablanca, voiture retour au maroc, location voiture vacances casablanca',
    h1: 'MRE : préparer votre location de voiture à Casablanca',
    heroSubtitle: 'Retour au pays • Vacances • Dates et lieu préparés avant le voyage',
    category: { label: 'Location à Casablanca', href: '/location-voiture-casablanca' }, rentalJourney, cta, relatedServices,
    content: {
      intro: 'Vous rentrez au Maroc pour des vacances ou un séjour auprès de vos proches ? Benatna vous aide à préparer une demande auprès de loueurs basés à Casablanca. Comparez les modèles et leurs prix indicatifs, puis convenez du véhicule et des conditions avec le loueur avant votre arrivée.',
      sections: [
        { title: 'Avant le départ : vos dates, vos passagers et vos valises', content: 'Choisissez les dates de départ et de retour, de trois jours à six mois calendaires. Précisez au loueur le nombre de voyageurs et les bagages prévus. Une citadine, une compacte et un SUV répondent à des besoins différents : vous pouvez réunir jusqu’à trois modèles dans une demande pour comparer les propositions.' },
        { title: 'Arrivée à Mohammed V ou en gare de Casablanca', content: 'Sélectionnez votre point de remise dans le guide : Mohammed V, Casa-Voyageurs, Casa-Port, Oasis ou Aïn Sebaâ. La livraison est gratuite et le rendez-vous est convenu à l’avance. Communiquez les informations utiles sur votre arrivée au loueur et prévenez-le si votre voyage change.' },
        { title: 'Prix, caution et contrat avant votre accord', content: 'Demandez le montant de toute la période, puis faites préciser séparément la caution et ses modalités de restitution. Vérifiez les documents requis, les critères pour les conducteurs, le kilométrage, l’assurance et la franchise avec le loueur. Les moyens de règlement acceptés dépendent de sa proposition ; aucun paiement en ligne n’est proposé sur Benatna.' },
        { title: 'Un séjour prolongé ou une livraison à Rabat', content: 'Pour plusieurs semaines ou mois, demandez un tarif couvrant vos dates, sans supposer un forfait mensuel. Le retour se convient à l’avance. Une livraison gratuite à Rabat peut être étudiée depuis Casablanca selon la disponibilité du loueur ; choisissez le lieu exact avant votre accord.' },
      ], faq: [questions[0], questions[1], questions[4], questions[6]],
    },
    relatedPages: [{ title: 'Voitures automatiques à Casablanca', link: '/location-voiture-automatique-casablanca' }, { title: 'Location au mois pour votre séjour', link: '/location-voiture-casablanca' }],
  },
  faq: {
    slug: 'louer-voiture-maroc-faq-complete', title: 'Questions avant une location à Casablanca',
    metaTitle: 'Location voiture à Casablanca : questions pratiques | Benatna',
    metaDescription: 'Dates, modèles, prix, caution et livraison à Casablanca : les réponses pour préparer votre demande. Tarif, version et conditions confirmés par le loueur.',
    keywords: 'faq location voiture casablanca, questions location voiture casablanca, prix caution livraison casablanca',
    h1: 'Vos questions avant de louer une voiture à Casablanca',
    heroSubtitle: 'Durée • Prix • Caution • Livraison • Demande et confirmation',
    category: { label: 'Location à Casablanca', href: '/location-voiture-casablanca' }, rentalJourney, cta, relatedServices,
    content: {
      intro: 'Cette page rassemble les informations utiles pour une demande Benatna à Casablanca. Prix, caution et livraison permettent de comparer les propositions pour votre séjour. Les réponses ci-dessous distinguent le fonctionnement du site des modalités que le loueur doit confirmer pour votre véhicule.',
      sections: [
        { title: 'Commencer par une demande comparable', content: 'Utilisez les mêmes dates et le même lieu pour comparer vos modèles. Précisez les voyageurs, les bagages et la transmission souhaitée. Les photos illustrent les modèles ; le loueur confirme la version et la disponibilité avant votre accord.' },
        { title: 'Lire le tarif et les conditions ensemble', content: 'Comparez le montant de toute la période avec les conditions de caution, d’assurance et de kilométrage. Les prix journaliers du catalogue sont indicatifs. Un montant affiché ne permet pas de supposer une couverture d’assurance ou une absence de caution.' },
        { title: 'Convenir de la remise et du retour', content: 'La livraison est gratuite aux points desservis de Casablanca et, sur demande, de Rabat depuis Casablanca. Le rendez-vous et le retour se préparent avec le loueur. Le site ne fixe pas un horaire uniforme, un délai de réponse ou un délai de remplacement de véhicule.' },
      ], faq: questions,
    },
  },
};
