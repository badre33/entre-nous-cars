export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: 'assurance' | 'contrat' | 'vehicule' | 'conduite' | 'financier' | 'reglementation';
  relatedTerms?: string[];
  relatedPages?: { label: string; url: string }[];
}

export const glossaryTerms: GlossaryTerm[] = [
  // ASSURANCE
  {
    id: 'assurance-tous-risques',
    term: 'Assurance Tous Risques',
    definition: "Ensemble de garanties d’assurance pouvant couvrir des dommages au véhicule. La couverture reste définie par le contrat : garanties, exclusions et franchise sont à vérifier avec le loueur avant votre accord.",
    category: 'assurance',
    relatedTerms: ['franchise', 'responsabilite-civile', 'rachat-franchise'],
    relatedPages: [{ label: 'Nos Services', url: '/nos-services' }]
  },
  {
    id: 'franchise',
    term: 'Franchise',
    definition: "Part du dommage pouvant rester à la charge du locataire selon les garanties et le contrat. Le loueur précise son montant et les situations concernées avant votre accord.",
    category: 'assurance',
    relatedTerms: ['rachat-franchise', 'assurance-tous-risques', 'caution'],
  },
  {
    id: 'rachat-franchise',
    term: 'Rachat de Franchise',
    definition: "Option contractuelle pouvant réduire la franchise pour certains dommages. Sa disponibilité, son prix, ses limites et ses exclusions sont à confirmer avec le loueur.",
    category: 'assurance',
    relatedTerms: ['franchise', 'assurance-tous-risques'],
  },
  {
    id: 'responsabilite-civile',
    term: 'Responsabilité Civile',
    definition: "Garantie d’assurance couvrant la responsabilité pour des dommages causés à des tiers, selon le contrat. Vérifiez avec le loueur les garanties applicables au véhicule proposé.",
    category: 'assurance',
    relatedTerms: ['assurance-tous-risques'],
  },
  {
    id: 'protection-personnelle',
    term: 'Protection Personnelle du Conducteur',
    definition: "Garantie portant sur les dommages corporels des personnes désignées au contrat. Les personnes couvertes, les montants et les conditions doivent être vérifiés dans les documents d’assurance du loueur.",
    category: 'assurance',
    relatedTerms: ['assurance-tous-risques', 'responsabilite-civile'],
  },

  // CONTRAT
  {
    id: 'caution',
    term: 'Caution (Dépôt de Garantie)',
    definition: "Dépôt de garantie demandé par le loueur. Son montant, le moyen de dépôt et les conditions de restitution sont précisés avant votre accord ; ils dépendent du véhicule et du contrat proposé.",
    category: 'contrat',
    relatedTerms: ['franchise', 'etat-lieux'],
  },
  {
    id: 'etat-lieux',
    term: 'État des Lieux',
    definition: "Description de l’état du véhicule à la prise en charge puis au retour. Vérifiez les dommages déjà présents et les équipements avec le loueur, et conservez le document accepté ainsi que vos photos.",
    category: 'contrat',
    relatedTerms: ['caution', 'constat-amiable'],
  },
  {
    id: 'conducteur-additionnel',
    term: 'Conducteur Additionnel',
    definition: "Autre personne autorisée à conduire le véhicule et inscrite au contrat. Son acceptation, les documents nécessaires et les éventuelles conditions tarifaires sont à confirmer avec le loueur.",
    category: 'contrat',
    relatedTerms: ['permis-conduire', 'age-minimum'],
  },
  {
    id: 'duree-location',
    term: 'Durée de Location',
    definition: "Période comprise entre les dates de départ et de retour. Sur Benatna, la location dure au minimum trois jours et au maximum six mois calendaires. Le loueur confirme le tarif pour vos dates.",
    category: 'contrat',
    relatedTerms: ['location-longue-duree', 'tarif-journalier'],
    relatedPages: [{ label: 'Location Longue Durée', url: '/location-longue-duree-casablanca' }]
  },
  {
    id: 'prolongation',
    term: 'Prolongation de Location',
    definition: "Demande de modification de la date de retour. Contactez le loueur avant la fin prévue ; la prolongation dépend de sa disponibilité et d’un nouvel accord sur les dates et le tarif.",
    category: 'contrat',
    relatedTerms: ['duree-location', 'retard-restitution'],
  },
  {
    id: 'retard-restitution',
    term: 'Retard de Restitution',
    definition: "Retour après le rendez-vous convenu avec le loueur. Prévenez-le dès que possible pour adapter l’organisation et vérifier les conditions prévues au contrat.",
    category: 'contrat',
    relatedTerms: ['prolongation', 'duree-location'],
  },
  {
    id: 'livraison-vehicule',
    term: 'Livraison du Véhicule',
    definition: "Remise du véhicule au point convenu à l’avance. La livraison est gratuite aux points desservis de Casablanca. Une livraison à Rabat peut être demandée depuis Casablanca, sous réserve de confirmation du loueur.",
    category: 'contrat',
    relatedTerms: ['location-aeroport', 'point-rendez-vous'],
    relatedPages: [
      { label: 'Aéroport Casablanca', url: '/location-voiture-aeroport-casablanca' },
    ]
  },
  {
    id: 'point-rendez-vous',
    term: 'Point de Rendez-vous',
    definition: "Lieu précis convenu avec le loueur pour la remise ou le retour du véhicule. Choisissez un point desservi de Casablanca ; Rabat est proposé sur demande depuis Casablanca. Les modalités sont fixées avant le déplacement.",
    category: 'contrat',
    relatedTerms: ['livraison-vehicule', 'location-aeroport'],
  },

  // VÉHICULE
  {
    id: 'categorie-vehicule',
    term: 'Catégorie de Véhicule',
    definition: "Groupe de voitures aux caractéristiques proches : citadines, berlines ou SUV, par exemple. Comparez les modèles du catalogue selon les passagers, les bagages et la transmission, puis faites confirmer le véhicule pour vos dates.",
    category: 'vehicule',
    relatedTerms: ['suv', '4x4', 'berline'],
    relatedPages: [{ label: 'Modèles du catalogue', url: '/louer' }]
  },
  {
    id: 'kilometrage-illimite',
    term: 'Kilométrage Illimité',
    definition: "Condition contractuelle permettant de rouler sans quota de kilomètres. Vérifiez si elle figure dans la proposition du loueur ; sa présence n’est pas déduite du seul modèle affiché au catalogue.",
    category: 'vehicule',
    relatedTerms: ['kilometrage-limite', 'carburant'],
  },
  {
    id: 'kilometrage-limite',
    term: 'Kilométrage Limité',
    definition: "Condition fixant un nombre de kilomètres inclus dans la location. Le quota et les conditions applicables au-delà sont précisés par le loueur avant votre accord.",
    category: 'vehicule',
    relatedTerms: ['kilometrage-illimite'],
  },
  {
    id: 'carburant',
    term: 'Politique de Carburant',
    definition: "Règle concernant le niveau de carburant à la remise et au retour du véhicule. Vérifiez la règle du loueur et notez le niveau lors de l’état des lieux.",
    category: 'vehicule',
    relatedTerms: ['kilometrage-illimite'],
  },
  {
    id: 'boite-automatique',
    term: 'Boîte Automatique',
    definition: "Transmission qui change les rapports sans passage manuel des vitesses par le conducteur. Utilisez le filtre de transmission du catalogue et faites confirmer la version proposée par le loueur.",
    category: 'vehicule',
    relatedTerms: ['boite-manuelle', 'categorie-vehicule'],
  },
  {
    id: 'boite-manuelle',
    term: 'Boîte Manuelle',
    definition: "Transmission dont les rapports sont sélectionnés par le conducteur. Le catalogue permet de comparer les versions ; le loueur confirme la transmission du véhicule proposé.",
    category: 'vehicule',
    relatedTerms: ['boite-automatique'],
  },
  {
    id: 'climatisation',
    term: 'Climatisation',
    definition: "Équipement permettant de rafraîchir l’habitacle. Vérifiez les équipements du véhicule proposé et leur fonctionnement lors de la prise en charge.",
    category: 'vehicule',
    relatedTerms: ['gps', 'siege-enfant'],
  },
  {
    id: 'gps',
    term: 'GPS (Système de Navigation)',
    definition: "Système de navigation intégré ou appareil d’aide à l’itinéraire. Si cet équipement est important pour votre séjour, demandez au loueur ce qui est disponible sur le véhicule proposé.",
    category: 'vehicule',
    relatedTerms: ['climatisation', 'siege-enfant'],
  },
  {
    id: 'siege-enfant',
    term: 'Siège Enfant',
    definition: "Équipement de retenue adapté à l’enfant. Précisez votre besoin au loueur avant le déplacement pour confirmer la disponibilité, le modèle adapté et les conditions de mise à disposition.",
    category: 'vehicule',
    relatedTerms: ['gps', 'conducteur-additionnel'],
  },
  {
    id: 'suv',
    term: 'SUV (Sport Utility Vehicle)',
    definition: "Voiture à carrosserie surélevée, par exemple un Dacia Duster ou un Hyundai Tucson. Un SUV n’a pas nécessairement quatre roues motrices ; faites confirmer les caractéristiques du véhicule proposé.",
    category: 'vehicule',
    relatedTerms: ['4x4', 'categorie-vehicule'],
    relatedPages: []
  },
  {
    id: '4x4',
    term: '4x4 (Quatre Roues Motrices)',
    definition: "Véhicule dont la transmission peut entraîner les quatre roues. Cette caractéristique ne constitue pas une autorisation de rouler sur une piste : les usages autorisés restent définis par le contrat du loueur.",
    category: 'vehicule',
    relatedTerms: ['suv', 'categorie-vehicule'],
    relatedPages: []
  },
  {
    id: 'berline',
    term: 'Berline',
    definition: "Voiture de tourisme offrant un espace pour les passagers et les bagages. Comparez la capacité et les équipements du modèle pour choisir un véhicule adapté à votre séjour personnel.",
    category: 'vehicule',
    relatedTerms: ['categorie-vehicule', 'voiture-economique'],
  },
  {
    id: 'voiture-economique',
    term: 'Voiture Économique',
    definition: "Catégorie de petites voitures adaptées aux déplacements du séjour, comme la Renault Clio ou la Dacia Sandero. Le prix journalier du catalogue est indicatif ; le loueur confirme le tarif pour vos dates.",
    category: 'vehicule',
    relatedTerms: ['categorie-vehicule', 'berline'],
    relatedPages: [{ label: 'Louer une voiture', url: '/louer' }]
  },
  {
    id: 'voiture-electrique',
    term: 'Voiture Électrique',
    definition: "Voiture propulsée par un moteur électrique alimenté par une batterie rechargeable. Ce terme décrit une motorisation ; il ne confirme pas la disponibilité d’un modèle électrique dans le catalogue Benatna.",
    category: 'vehicule',
    relatedTerms: ['voiture-hybride', 'borne-recharge'],
    relatedPages: [{ label: 'Modèles du catalogue', url: '/louer' }]
  },
  {
    id: 'voiture-hybride',
    term: 'Voiture Hybride',
    definition: "Voiture combinant un moteur thermique et un moteur électrique. Les caractéristiques et le fonctionnement dépendent de la version exacte proposée par le loueur.",
    category: 'vehicule',
    relatedTerms: ['voiture-electrique', 'carburant'],
  },
  {
    id: 'borne-recharge',
    term: 'Borne de Recharge',
    definition: "Installation permettant de recharger un véhicule électrique compatible. Vérifiez le connecteur, l’accès et le fonctionnement de la borne avant de planifier une recharge.",
    category: 'vehicule',
    relatedTerms: ['voiture-electrique'],
  },

  // CONDUITE
  {
    id: 'permis-conduire',
    term: 'Permis de Conduire',
    definition: "Document autorisant la conduite des catégories de véhicules indiquées. Avant votre accord, transmettez au loueur les informations utiles pour confirmer les documents acceptés et ses conditions de location.",
    category: 'conduite',
    relatedTerms: ['age-minimum', 'permis-international', 'conducteur-additionnel'],
  },
  {
    id: 'permis-international',
    term: 'Permis de Conduire International',
    definition: "Document accompagnant un permis national dans certaines situations de conduite à l’étranger. Vérifiez les documents nécessaires auprès des autorités compétentes et du loueur avant le voyage.",
    category: 'conduite',
    relatedTerms: ['permis-conduire'],
  },
  {
    id: 'age-minimum',
    term: 'Âge Minimum de Location',
    definition: "Condition d’âge appliquée par le loueur au conducteur. Elle peut dépendre du véhicule et du contrat ; demandez les conditions de votre proposition avant de confirmer la location.",
    category: 'conduite',
    relatedTerms: ['permis-conduire', 'jeune-conducteur'],
    relatedPages: [{ label: 'Jeune Conducteur Casablanca', url: '/location-jeune-conducteur-casablanca' }]
  },
  {
    id: 'jeune-conducteur',
    term: 'Jeune Conducteur',
    definition: "Profil pouvant relever de conditions particulières selon l’âge et l’ancienneté du permis. Le loueur confirme l’acceptation du conducteur et les conditions du véhicule proposé.",
    category: 'conduite',
    relatedTerms: ['age-minimum', 'permis-conduire'],
    relatedPages: [
      { label: 'Conditions à confirmer', url: '/faq' }
    ]
  },
  {
    id: 'constat-amiable',
    term: 'Constat Amiable',
    definition: "Document décrivant les circonstances d’un accident. Contactez le loueur et suivez les démarches indiquées par les autorités et l’assureur pour la situation rencontrée.",
    category: 'conduite',
    relatedTerms: ['assurance-tous-risques', 'etat-lieux'],
  },
  {
    id: 'peage-autoroute',
    term: 'Péage Autoroutier',
    definition: "Paiement lié à l’utilisation d’un tronçon autoroutier. Vérifiez les tarifs et moyens de paiement auprès de l’exploitant pour votre itinéraire.",
    category: 'conduite',
    relatedTerms: ['carte-jawaz'],
  },
  {
    id: 'carte-jawaz',
    term: 'Carte Jawaz',
    definition: "Dispositif de télépéage utilisé sur le réseau autoroutier concerné. Si vous souhaitez en disposer, faites confirmer l’équipement et ses conditions d’utilisation par le loueur.",
    category: 'conduite',
    relatedTerms: ['peage-autoroute'],
  },
  {
    id: 'franchise-kilometrique',
    term: 'Franchise Kilométrique',
    definition: "Nombre de kilomètres inclus dans la formule proposée. Vérifiez au contrat le quota éventuel et les conditions au-delà, ou la présence d’un kilométrage illimité.",
    category: 'conduite',
    relatedTerms: ['kilometrage-illimite', 'kilometrage-limite'],
  },

  // FINANCIER
  {
    id: 'tarif-journalier',
    term: 'Tarif Journalier',
    definition: "Prix indicatif de location par jour affiché au catalogue. Il dépend du véhicule, de la période et de la durée ; le loueur confirme le montant final avant votre accord. Aucun paiement en ligne n’est proposé sur Benatna.",
    category: 'financier',
    relatedTerms: ['tarif-longue-duree', 'tarif-weekend'],
    relatedPages: [{ label: 'Louer une voiture', url: '/louer' }]
  },
  {
    id: 'tarif-longue-duree',
    term: 'Tarif Longue Durée',
    definition: "Tarif proposé pour un séjour prolongé. Sur Benatna, la durée totale reste limitée à six mois calendaires. Une éventuelle remise dépend de la proposition du loueur et n’est pas garantie par le glossaire.",
    category: 'financier',
    relatedTerms: ['tarif-journalier', 'location-longue-duree'],
    relatedPages: [
      { label: 'Location Longue Durée Casablanca', url: '/location-longue-duree-casablanca' },
    ]
  },
  {
    id: 'tarif-weekend',
    term: 'Tarif Week-end',
    definition: "Tarif correspondant à des dates comprenant un week-end. La location reste de trois jours minimum ; aucune réduction automatique n’est promise. Comparez les prix indicatifs puis demandez le tarif final.",
    category: 'financier',
    relatedTerms: ['tarif-journalier'],
    relatedPages: []
  },
  {
    id: 'frais-carburant',
    term: 'Frais de Carburant',
    definition: "Coût du carburant consommé pendant votre séjour. La règle de restitution du niveau de carburant est convenue avec le loueur ; les prix à la pompe varient.",
    category: 'financier',
    relatedTerms: ['carburant', 'kilometrage-illimite'],
  },
  {
    id: 'carte-bancaire',
    term: 'Carte Bancaire',
    definition: "Moyen pouvant être demandé par le loueur pour le règlement ou le dépôt de garantie. Les cartes acceptées et les conditions sont confirmées avant votre accord. Benatna ne propose pas de paiement en ligne.",
    category: 'financier',
    relatedTerms: ['caution', 'paiement-especes'],
  },
  {
    id: 'paiement-especes',
    term: 'Paiement en Espèces',
    definition: "Moyen de règlement dont l’acceptation doit être confirmée avec le loueur, pour la location comme pour la caution. Le site ne prélève aucun paiement en ligne.",
    category: 'financier',
    relatedTerms: ['carte-bancaire', 'caution'],
  },
  {
    id: 'facture',
    term: 'Facture',
    definition: "Document détaillant la prestation facturée par le loueur. Demandez-lui les informations nécessaires à son établissement lors de la préparation de votre location.",
    category: 'financier',
    relatedTerms: ['recu'],
  },
  {
    id: 'recu',
    term: 'Reçu',
    definition: "Justificatif attestant un règlement. Conservez le document remis par le loueur avec les autres pièces de votre location.",
    category: 'financier',
    relatedTerms: ['facture', 'paiement-especes'],
  },

  // RÉGLEMENTATION
  {
    id: 'code-route-maroc',
    term: 'Code de la Route Marocain',
    definition: "Règles de circulation applicables au Maroc. Consultez les informations officielles de la NARSA et respectez la signalisation ainsi que les règles en vigueur pendant votre trajet.",
    category: 'reglementation',
    relatedTerms: ['amende', 'radar'],
  },
  {
    id: 'amende',
    term: 'Amende',
    definition: "Sanction financière liée à une infraction. Les démarches dépendent de l’infraction et de la situation ; consultez les informations officielles et prévenez le loueur si son véhicule est concerné.",
    category: 'reglementation',
    relatedTerms: ['code-route-maroc', 'pv'],
  },
  {
    id: 'pv',
    term: 'PV (Procès-Verbal)',
    definition: "Document constatant une infraction. Si le véhicule loué est concerné, contactez le loueur pour identifier les démarches à effectuer auprès de l’autorité compétente.",
    category: 'reglementation',
    relatedTerms: ['amende', 'code-route-maroc'],
  },
  {
    id: 'radar',
    term: 'Radar Automatique',
    definition: "Dispositif de contrôle utilisé dans le cadre de la sécurité routière. Respectez les limitations signalées et consultez les informations officielles pour toute infraction vous concernant.",
    category: 'reglementation',
    relatedTerms: ['amende', 'code-route-maroc'],
  },
  {
    id: 'assurance-frontiere',
    term: 'Assurance Frontière',
    definition: "Garantie relative à la circulation dans un autre pays, lorsqu’elle est prévue au contrat. Toute sortie du territoire avec un véhicule loué nécessite de vérifier les autorisations, garanties et formalités avant le déplacement.",
    category: 'reglementation',
    relatedTerms: ['responsabilite-civile'],
  },
  {
    id: 'location-aeroport',
    term: 'Location à l\'Aéroport',
    definition: "Prise en charge du véhicule à un point convenu près de l’aéroport. Benatna propose la livraison gratuite à Mohammed V à Casablanca ; Rabat reste une demande depuis Casablanca à confirmer avec le loueur. Le rendez-vous est fixé à l’avance.",
    category: 'reglementation',
    relatedTerms: ['livraison-vehicule', 'point-rendez-vous'],
    relatedPages: [
      { label: 'Gares et aéroports desservis', url: '/prise-en-charge-casablanca-rabat' }
    ]
  },
  {
    id: 'location-longue-duree',
    term: 'Location Longue Durée (LLD)',
    definition: "Location pour un séjour personnel de plusieurs semaines ou mois. La durée maximale sur Benatna est de six mois calendaires. Le loueur précise le tarif et les conditions adaptées aux dates demandées.",
    category: 'contrat',
    relatedTerms: ['tarif-longue-duree', 'duree-location'],
    relatedPages: [
      { label: 'Longue Durée Casablanca', url: '/location-longue-duree-casablanca' },
    ]
  },
  {
    id: 'location-sans-carte',
    term: 'Location sans Carte Bancaire',
    definition: "Demande pour une location sans carte bancaire. L’acceptation et les modalités de règlement et de caution dépendent du loueur et du véhicule ; faites-les confirmer avant votre accord.",
    category: 'contrat',
    relatedTerms: ['carte-bancaire', 'caution'],
    relatedPages: [
      { label: 'Sans Carte Casablanca', url: '/location-voiture-sans-carte-credit-casablanca' },
    ]
  },
  {
    id: 'reservation',
    term: 'Réservation',
    definition: "Accord de location après confirmation du loueur et acceptation de ses conditions. Préparer une demande ou ouvrir WhatsApp ne confirme pas automatiquement une réservation ; aucun paiement en ligne n’est proposé sur Benatna.",
    category: 'contrat',
    relatedTerms: ['annulation', 'modification-reservation'],
  },
  {
    id: 'annulation',
    term: 'Annulation',
    definition: "Demande visant à mettre fin à une réservation. Contactez le loueur et vérifiez les conditions d’annulation acceptées lors de votre accord ; aucune gratuité ni échéance universelle n’est promise par Benatna.",
    category: 'contrat',
    relatedTerms: ['reservation', 'modification-reservation'],
  },
  {
    id: 'modification-reservation',
    term: 'Modification de Réservation',
    definition: "Demande de changement des dates, du véhicule ou du point de rendez-vous. Le loueur confirme la possibilité de modification, le nouveau tarif éventuel et les conditions avant votre accord.",
    category: 'contrat',
    relatedTerms: ['reservation', 'annulation'],
  },
];

export const categories = [
  { id: 'assurance', label: 'Assurance', icon: 'shield' },
  { id: 'contrat', label: 'Contrat & Location', icon: 'file-text' },
  { id: 'vehicule', label: 'Véhicule & Équipements', icon: 'car' },
  { id: 'conduite', label: 'Conduite', icon: 'navigation' },
  { id: 'financier', label: 'Financier', icon: 'credit-card' },
  { id: 'reglementation', label: 'Réglementation', icon: 'book-open' },
] as const;
