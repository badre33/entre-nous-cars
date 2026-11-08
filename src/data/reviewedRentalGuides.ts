import type { LongTailPageConfig } from './longTailPages';

export const roadSafetySource = { title: 'NARSA — Réagir face à un accident', url: 'https://www.narsa-securiteroutiere.ma/fr/vous-etes-temoin-dun-accident-que-faire/' };
export const insuranceSource = { title: 'ACAPS — Kit du conducteur', url: 'https://www.acaps.ma/sites/default/files/2025-04/ACAPS_Kit%20du%20conducteur%20FR.pdf' };
const materialSource = { title: 'ACAPS — Accident avec dégâts matériels', url: 'https://www.acaps.ma/sites/default/files/vf_step_degats_materiels_accidentvoiture.pdf' };
const rentalJourney = {
  intro: 'Pour un séjour à Casablanca, préparez vos dates, jusqu’à trois modèles et votre lieu. Location à partir de trois jours, livraison gratuite aux points desservis, Rabat sur demande depuis Casablanca.',
  links: [
    { title: 'Comparer les voitures à Casablanca', link: '/location-voiture-casablanca' },
    { title: 'Préparer une arrivée à Mohammed V', link: '/location-voiture-aeroport-casablanca' },
    { title: 'Choisir votre gare à Casablanca', link: '/location-voiture-gare-oncf-maroc' },
  ],
};
const cta = { title: 'Préparer votre location à Casablanca', subtitle: 'Dates, modèles et lieu • Conditions confirmées par le loueur', buttonText: 'Choisir mes véhicules et mes dates', buttonLink: '/louer?city=Casablanca' };
const relatedServices = [
  { title: 'Prix de location à Casablanca', description: 'Repères indicatifs et tarif pour votre période.', link: '/prix-location-voiture-maroc-2026' },
  { title: 'Questions sur la caution', description: 'Montant, moyen de dépôt et restitution à confirmer.', link: '/caution-location-voiture-maroc' },
  { title: 'Gares et aéroports desservis', description: 'Préparer la remise et le retour avec le loueur.', link: '/prise-en-charge-casablanca-rabat' },
];
const category = { label: 'Location à Casablanca', href: '/location-voiture-casablanca' };
export const reviewedRentalGuides: Record<'young' | 'planning' | 'checks' | 'accident', LongTailPageConfig> = {
  young: {
    slug: 'location-jeune-conducteur-casablanca', title: 'Jeune conducteur : préparer sa demande',
    metaTitle: 'Location jeune conducteur à Casablanca : conditions | Benatna',
    metaDescription: 'Jeune conducteur à Casablanca : faites confirmer vos critères d’accès, documents, caution, assurance et tarif avant votre accord. Minimum 3 jours.',
    keywords: 'location jeune conducteur casablanca, conditions permis location casablanca',
    h1: 'Jeune conducteur à Casablanca : vérifier les conditions avant de louer',
    heroSubtitle: 'Dossier • Modèle • Caution • Conditions du contrat', category, rentalJourney, cta, relatedServices,
    content: {
      intro: 'Vous avez un permis récent ou souhaitez louer pour la première fois à Casablanca ? Préparez votre demande avant le voyage pour faire vérifier votre dossier par le loueur. Cette page ne fixe pas un âge, une ancienneté de permis ou un supplément identiques pour tous les véhicules.',
      sections: [
        { title: 'Présenter votre situation au loueur', content: 'Indiquez vos dates, le modèle souhaité et les informations utiles sur votre permis et les conducteurs prévus. Demandez les critères applicables au véhicule proposé et la liste des documents requis avant votre accord. La validation d’un dossier par un loueur ne prouve pas que tous les autres appliquent les mêmes conditions.' },
        { title: 'Comparer une proposition complète', content: 'Demandez le montant de toute la période, les éventuelles conditions liées au conducteur et le montant de la caution. Faites préciser séparément les garanties d’assurance, la franchise et le kilométrage. Les prix journaliers du catalogue sont indicatifs ; ils ne garantissent ni l’acceptation du dossier ni une assurance particulière.' },
        { title: 'Choisir une voiture adaptée à votre séjour', content: 'Comparez une citadine, une compacte ou un SUV selon vos passagers, vos bagages et votre préférence de transmission. Faites confirmer la version proposée pour vos dates. Prenez le temps de repérer les commandes du véhicule avant de partir et demandez au loueur les explications nécessaires.' },
        { title: 'Préparer la remise à Casablanca', content: 'La location dure au minimum trois jours. Sélectionnez un point desservi à Casablanca ; la livraison est gratuite et le rendez-vous est convenu à l’avance. Rabat reste une livraison sur demande depuis Casablanca selon la disponibilité du loueur. La demande WhatsApp nécessite ensuite son accord et le vôtre.' },
      ],
      faq: [
        { question: 'Un permis récent est-il accepté ?', answer: 'Le loueur vérifie votre situation et les critères du véhicule proposé. Faites confirmer l’acceptation de votre dossier et les documents nécessaires avant votre accord.' },
        { question: 'Y a-t-il un supplément jeune conducteur fixe ?', answer: 'Aucun supplément uniforme n’est annoncé sur cette page. Demandez au loueur le tarif complet et les conditions applicables pour vos dates et votre dossier.' },
        { question: 'L’assurance ou la caution sont-elles identiques pour tous ?', answer: 'Non. Les garanties, la franchise, le montant de caution et ses modalités sont à confirmer avec le loueur pour le véhicule proposé.' },
      ],
    },
  },
  planning: {
    slug: 'guide-maroc', title: 'Préparer sa location à Casablanca',
    metaTitle: 'Guide location voiture à Casablanca : préparer son séjour | Benatna',
    metaDescription: 'Un parcours pour préparer votre location à Casablanca : dates, modèles, prix, caution, lieu et confirmation. Liens vers les guides utiles à votre séjour.',
    keywords: 'guide location voiture casablanca, préparer location voiture maroc',
    h1: 'Préparer votre location de voiture à Casablanca',
    heroSubtitle: 'Choisir • Comparer • Vérifier • Confirmer', category, rentalJourney, cta, relatedServices,
    content: {
      intro: 'Vous arrivez à Casablanca pour des vacances ou un retour au pays ? Ce guide organise les étapes d’une demande Benatna et vous oriente vers les pages détaillées. Il ne remplace pas la vérification de vos documents auprès des autorités compétentes ni les conditions confirmées par le loueur.',
      sections: [
        { title: 'Définir votre période et votre lieu', content: 'Choisissez une date de départ et de retour, à partir de trois jours. Précisez votre arrivée : ville, aéroport Mohammed V ou gare desservie de Casablanca. Une livraison gratuite à Rabat peut être étudiée depuis Casablanca selon la disponibilité du loueur. Le point précis de rencontre et le retour se conviennent à l’avance.' },
        { title: 'Comparer les modèles sur les mêmes dates', content: 'Indiquez vos voyageurs, vos bagages et votre préférence de boîte. Retenez jusqu’à trois modèles pour comparer des propositions sur une période identique. Les photos illustrent les modèles ; la version, les équipements et la disponibilité sont confirmés par le loueur.' },
        { title: 'Vérifier le budget et les conditions', content: 'Demandez le prix de toute la période, puis faites préciser la caution, les moyens de dépôt et de règlement acceptés, les garanties d’assurance, la franchise et le kilométrage. Le carburant, les péages et le stationnement dépendent de votre itinéraire et de votre usage ; vérifiez les informations auprès des opérateurs ou points de vente concernés.' },
        { title: 'Préparer la remise et garder les informations utiles', content: 'Faites confirmer la liste des documents et les critères des conducteurs. À la remise, examinez le véhicule avec le loueur et conservez les documents, l’état des lieux et vos photos utiles. Repérez les contacts de location et d’assistance prévus au contrat avant de partir.' },
        { title: 'Envoyer une demande puis obtenir un accord', content: 'Vérifiez les dates, les modèles et le lieu dans le récapitulatif avant d’ouvrir WhatsApp. La demande ne confirme pas une réservation. Aucun paiement en ligne n’est proposé sur Benatna : le loueur vérifie la proposition et les conditions avant votre accord.' },
      ],
      faq: [
        { question: 'Quel guide consulter pour les prix ?', answer: 'Le guide prix donne des repères indicatifs cohérents avec les fiches de quatre modèles. Le tarif final de votre période reste à confirmer avec le loueur.' },
        { question: 'Comment choisir un lieu de remise ?', answer: 'Le guide des gares et aéroports permet de sélectionner un point desservi. La livraison est gratuite et le rendez-vous est convenu à l’avance avec le loueur.' },
        { question: 'La demande WhatsApp vaut-elle réservation ?', answer: 'Non. Il faut la confirmation de disponibilité et des conditions par le loueur, puis votre accord. Le site ne propose pas de paiement en ligne.' },
      ],
    },
    relatedPages: [
      { title: 'Vérifications avant une location', link: '/eviter-arnaques-location-voiture-maroc' },
      { title: 'Préparer son budget carburant', link: '/prix-essence-gasoil-maroc-2026' },
      { title: 'Consulter les repères de péage', link: '/peages-autoroute-maroc-tarifs-2026' },
    ],
  },
  checks: {
    slug: 'eviter-arnaques-location-voiture-maroc', title: 'Vérifications avant de louer',
    metaTitle: 'Location voiture : vérifier prix, caution et contrat | Benatna',
    metaDescription: 'Avant de louer à Casablanca, vérifiez le prix total, la caution, les documents et l’état des lieux. Conservez les échanges et faites préciser les conditions du loueur.',
    keywords: 'vérifier location voiture maroc, caution contrat location casablanca, éviter malentendus location',
    h1: 'Location de voiture : les vérifications avant votre accord',
    heroSubtitle: 'Proposition écrite • Conditions • État des lieux • Documents conservés', category, rentalJourney, cta, relatedServices,
    content: {
      intro: 'Un prix attractif ne suffit pas à comparer deux locations. Pour limiter les malentendus à Casablanca, préparez une demande complète et vérifiez la proposition avec le loueur. Ce guide fournit des points de contrôle ; il ne promet pas l’absence de litige ni un résultat de recours.',
      sections: [
        { title: 'Avant de donner votre accord', content: 'Faites préciser le véhicule ou la version proposée, les dates, le lieu de remise et de retour, le montant total et les modalités de règlement. Demandez les documents et coordonnées du loueur nécessaires à votre échange. Conservez la proposition et les confirmations au lieu de vous appuyer uniquement sur une photo ou un prix journalier.' },
        { title: 'Séparer prix, caution et assurance', content: 'Demandez le montant de caution, le moyen de dépôt accepté, ses conditions et son délai de restitution. Vérifiez également les garanties d’assurance, la franchise et le kilométrage du contrat. Aucune caution supprimée, restitution immédiate ou assurance uniforme n’est garantie par Benatna pour tous les véhicules.' },
        { title: 'Lors de la remise du véhicule', content: 'Prenez le temps d’examiner le véhicule avec le loueur et de comprendre les documents avant de signer. Vérifiez les éléments consignés sur l’état des lieux et conservez vos propres photos et échanges utiles. Si une différence apparaît avec la proposition, demandez une clarification avant d’accepter les nouvelles conditions.' },
        { title: 'Au retour ou en cas de désaccord', content: 'Convenez du lieu de retour à l’avance. Conservez l’état des lieux de restitution et les justificatifs qui vous sont remis. Si un montant ou une retenue vous paraît différent de ce qui était convenu, demandez une explication et les éléments correspondants au loueur. Les démarches dépendent de la situation ; ce guide ne fixe pas une conclusion juridique.' },
      ],
      faq: [
        { question: 'Comment comparer deux propositions ?', answer: 'Utilisez les mêmes dates et le même lieu, puis comparez le prix total, la version, la caution et les conditions du contrat. Le seul prix par jour ne suffit pas.' },
        { question: 'Benatna garantit-il une restitution immédiate de caution ?', answer: 'Non. Demandez au loueur les conditions, le moyen et le délai de restitution pour le dépôt retenu avant votre accord.' },
        { question: 'Que conserver pendant la location ?', answer: 'Gardez la proposition, les confirmations, les documents de location, les états des lieux, vos photos utiles et les justificatifs de règlement qui vous sont remis.' },
      ],
    },
  },
  accident: {
    slug: 'accident-voiture-location-maroc-que-faire', title: 'Accident avec une voiture de location',
    metaTitle: 'Accident voiture de location au Maroc : repères officiels | Benatna',
    metaDescription: 'Sécurité, autorités, constat, loueur et assureur : repères NARSA et ACAPS après un accident avec une voiture de location. Sources et date de vérification visibles.',
    keywords: 'accident voiture location maroc, constat assurance voiture location maroc',
    h1: 'Accident avec une voiture de location : qui contacter et quoi vérifier ?',
    heroSubtitle: 'Sécurité des personnes • Secours • Loueur et assureur • Documents', category,
    deferRentalActions: true,
    safetyNotice: { title: 'Une urgence ne se traite pas sur WhatsApp Benatna', text: 'En présence de blessés ou de danger, contactez les services de secours compétents. Précisez le lieu et la situation. La sécurité des personnes passe avant les démarches de location.' },
    cta: { ...cta, title: 'Pour préparer une future location à Casablanca' }, relatedServices,
    editorialSources: { checkedOn: '2026-11-03', note: 'Repères généraux issus des sources officielles ci-dessous. L’assistance, les garanties et les démarches propres au véhicule doivent être confirmées avec le loueur et l’assureur.', links: [roadSafetySource, insuranceSource, materialSource] },
    content: {
      intro: 'Après un accident, distinguez la sécurité immédiate des personnes, l’intervention des autorités et les démarches auprès du loueur et de l’assureur. Cette page ne promet ni dépannage Benatna ni véhicule de remplacement à délai fixe. Utilisez les contacts d’assistance prévus pour votre véhicule.',
      sections: [
        { title: 'D’abord, éviter une nouvelle mise en danger', content: 'Ne vous exposez pas à la circulation pour prendre des photos ou régler les démarches de location. La NARSA recommande de protéger, alerter et secourir sans prendre de risques. En situation urgente, appelez les secours et suivez leurs instructions. Ne retardez pas cette alerte pour envoyer une demande commerciale.' },
        { title: 'Constat et autorités selon la situation', content: 'Le kit ACAPS distingue les circonstances du sinistre : en cas de blessés, il indique d’alerter la police ou la gendarmerie pour établir un procès-verbal. En cas de refus du constat ou de désaccord nécessitant leur intervention, contactez les autorités compétentes. Pour les dégâts matériels, demandez l’accompagnement prévu par votre assistance et renseignez les faits avec soin.' },
        { title: 'Informer rapidement le loueur et l’assureur', content: 'Contactez le loueur et l’assistance désignés dans les documents du véhicule pour connaître les démarches et les pièces à transmettre. L’ACAPS rappelle de déclarer l’accident à l’assureur au plus vite, au plus tard dans les cinq jours. Ce repère ne justifie pas d’attendre : informez les interlocuteurs concernés sans délai et vérifiez les modalités de votre dossier.' },
        { title: 'Conserver les informations utiles sans vous exposer', content: 'L’ACAPS conseille de conserver des éléments utiles à l’examen des dégâts matériels, notamment des photos des lieux et dommages. Faites-le seulement si la situation le permet en sécurité. Conservez les documents et échanges avec le loueur, l’assistance et l’assureur. Demandez leurs instructions avant d’organiser une réparation ou la suite de la location.' },
        { title: 'Franchise, indemnisation et remplacement', content: 'Les garanties mobilisables, une éventuelle franchise, les conditions d’indemnisation et la suite de la location dépendent du contrat et de l’examen du dossier. Faites préciser ces éléments par le loueur et l’assureur. Cette page ne fixe ni montant universel, ni option d’assurance, ni engagement de remplacement ou de prise en charge.' },
      ],
      faq: [
        { question: 'Faut-il attendre une réponse WhatsApp Benatna en urgence ?', answer: 'Non. En cas de blessés ou de danger, contactez les services de secours compétents. Pour le véhicule, utilisez ensuite les contacts de location et d’assistance prévus au contrat.' },
        { question: 'Un véhicule de remplacement est-il garanti ?', answer: 'Cette page ne garantit aucun remplacement à délai fixe. Vérifiez les dispositions du contrat et la solution confirmée par le loueur ou l’assistance.' },
        { question: 'Quel montant de franchise vais-je payer ?', answer: 'Le montant applicable et la couverture dépendent du contrat et du dossier. Faites-les préciser par le loueur et l’assureur ; aucun montant uniforme n’est annoncé ici.' },
      ],
    },
  },
};
