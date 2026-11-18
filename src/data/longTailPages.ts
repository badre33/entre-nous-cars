/**
 * Configuration des landing pages SEO longue traîne
 * Chaque page cible un mot-clé spécifique avec contenu unique 500+ mots
 */

export interface LongTailPageConfig {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  h1: string;
  heroSubtitle: string;
  category?: {
    label: string;
    href: string;
  };
  content: {
    intro: string;
    sections: Array<{
      title: string;
      content: string;
    }>;
    faq: Array<{
      question: string;
      answer: string;
    }>;
  };
  cta: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
  };
  safetyNotice?: { title: string; text: string };
  deferRentalActions?: boolean;
  editorialSources?: {
    checkedOn: string;
    note: string;
    links: Array<{ title: string; url: string }>;
  };
  rentalJourney?: {
    /** Zero-based section after which to show the rental links; omitted keeps them after the intro. */
    afterSection?: number;
    intro: string;
    links: Array<{ title: string; link: string }>;
  };
  relatedPages?: Array<{
    title: string;
    link: string;
  }>;
  relatedServices?: Array<{
    title: string;
    description: string;
    link: string;
  }>;
}

export const longTailPages: LongTailPageConfig[] = [
  // Sans carte de crédit
  {
    slug: "location-voiture-sans-carte-credit-marrakech",
    title: "Location Voiture Sans Carte Crédit Marrakech",
    metaTitle: "Location Voiture Sans Carte de Crédit Marrakech - Cash Accepté dès 300 DH/jour | Benatna",
    metaDescription: "Louez une voiture à Marrakech sans carte de crédit avec Benatna. Paiement flexible en espèces ou virement. Prix dès 300 DH/jour. Réservation simple et rapide.",
    keywords: "location voiture sans carte crédit marrakech, louer auto sans cb marrakech, location véhicule espèces marrakech",
    h1: "Location de Voiture Sans Carte de Crédit à Marrakech",
    heroSubtitle: "Louez votre véhicule facilement • Paiement en espèces accepté • Dès 300 DH/jour",
    category: {
      label: "Formules Flexibles",
      href: "/nos-services"
    },
    content: {
      intro: "Vous cherchez à louer une voiture à Marrakech mais vous n'avez pas de carte de crédit ? Benatna révolutionne la location de voiture au Maroc en vous permettant de réserver votre véhicule sans carte bancaire. Contrairement aux agences traditionnelles qui exigent systématiquement une carte de crédit pour la caution, nos loueurs partenaires acceptent le paiement en espèces, par virement bancaire ou par d'autres moyens flexibles. Cette approche inclusive permet à tous les voyageurs, qu'ils soient Marocains, touristes internationaux, jeunes conducteurs ou personnes sans carte de crédit, de profiter de la liberté qu'offre une voiture de location à Marrakech.",
      sections: [
        {
          title: "Pourquoi Choisir une Location Sans Carte de Crédit ?",
          content: "De nombreux voyageurs se trouvent bloqués lorsqu'ils veulent louer une voiture au Maroc car les agences traditionnelles imposent une carte de crédit pour bloquer une caution (souvent entre 3 000 et 10 000 DH selon le véhicule). Cette exigence exclut de nombreuses personnes : ceux qui n'ont qu'une carte de débit, les jeunes qui n'ont pas encore de carte de crédit, les touristes dont la banque bloque les transactions à l'étranger, ou simplement ceux qui préfèrent gérer leur budget en espèces. Benatna a compris cette problématique et propose une alternative simple : vous payez la location en espèces ou par virement directement auprès du loueur partenaire, qui établit une caution raisonnable sans bloquer de fonds sur une carte de crédit. Cela vous permet de garder le contrôle total de votre budget vacances tout en profitant de la liberté de mouvement qu'offre une voiture à Marrakech."
        },
        {
          title: "Comment Fonctionne la Location Sans Carte de Crédit chez Benatna ?",
          content: "Le processus est simple et transparent. Envoyez votre demande en 2 minutes sur WhatsApp (+212 699 024 526) en précisant que vous souhaitez payer sans carte de crédit : le loueur partenaire vous confirme directement. À la récupération du véhicule (à l'aéroport Marrakech-Menara, à votre hôtel ou à l'agence du loueur), vous présentez simplement votre permis de conduire valide, une pièce d'identité et payez le montant de la location en espèces (dirhams marocains ou euros acceptés) ou présentez une preuve de virement bancaire. Pour la caution, au lieu de bloquer des fonds sur une carte de crédit, le loueur partenaire établit un document de caution que vous signez. Cette caution couvre les éventuels dommages au véhicule et le loueur vous la restitue intégralement à la fin de la location si la voiture est rendue en parfait état. Le montant de la caution varie selon le véhicule choisi : environ 2 000 DH pour une citadine économique (Clio, Sandero), 3 500 DH pour un SUV (Duster, Qashqai) et 5 000 DH pour un véhicule premium. Cette approche flexible rend la location accessible à tous tout en protégeant les véhicules de nos loueurs partenaires."
        },
        {
          title: "Véhicules Disponibles en Location Sans Carte de Crédit à Marrakech",
          content: "Tous les véhicules de nos loueurs partenaires sont disponibles en location sans carte de crédit. Leur flotte à Marrakech comprend plus de 50 voitures récentes et bien entretenues. Pour les petits budgets et la conduite urbaine, vous trouverez des citadines économiques comme la Renault Clio, Dacia Sandero, Toyota Yaris ou Hyundai i10 à partir de 300 DH/jour. Ces véhicules sont parfaits pour circuler dans Marrakech, se garer facilement près de la Médina et consomment peu de carburant. Pour les familles ou groupes, les berlines spacieuses (Toyota Corolla, Volkswagen Jetta, Volkswagen Golf) offrent confort et espace bagages à partir de 300 DH/jour. Si vous prévoyez des excursions vers l'Atlas, Paradise Valley ou le désert d'Agafay, les SUV (Dacia Duster, Nissan Qashqai, Dacia Duster) sont recommandés à partir de 350 DH/jour grâce à leur garde au sol élevée et leur robustesse sur pistes. Pour les occasions spéciales (mariages, événements professionnels, voyage de luxe), vous trouverez aussi des véhicules premium (Mercedes Classe C, BMW Série 3, Audi A4) à partir de 800 DH/jour. Tous les véhicules sont climatisés, assurés tous risques et bénéficient d'un kilométrage illimité. L'âge minimum pour louer est de 21 ans avec au moins 1 an de permis."
        },
        {
          title: "Avantages de Louer Sans Carte de Crédit à Marrakech",
          content: "Louer une voiture sans carte de crédit avec Benatna présente de nombreux avantages. Premièrement, vous conservez votre pouvoir d'achat : pas de blocage de plusieurs milliers de dirhams sur votre carte pendant toute la durée de la location, ce qui peut être contraignant si vous avez un plafond limité. Deuxièmement, vous évitez les frais bancaires : certaines banques facturent des commissions sur les opérations de blocage/déblocage de caution, surtout pour les cartes étrangères. Troisièmement, c'est plus simple pour les groupes : si plusieurs amis ou membres de la famille partagent les frais de location, payer en espèces est beaucoup plus pratique que de gérer les remboursements de carte de crédit. Quatrièmement, cela convient aux touristes internationaux dont la carte bancaire pourrait être bloquée par leur banque pour des raisons de sécurité lors de transactions au Maroc. Cinquièmement, c'est idéal pour les jeunes conducteurs (21-25 ans) qui n'ont souvent pas encore de carte de crédit mais ont le permis requis. Enfin, c'est parfait pour ceux qui gèrent leur budget vacances en espèces et préfèrent éviter les transactions bancaires internationales. Chez Benatna, nous pensons que la location de voiture doit être accessible à tous, pas seulement à ceux qui possèdent une carte de crédit."
        },
        {
          title: "Conseils pour Votre Location Sans Carte de Crédit à Marrakech",
          content: "Pour que votre expérience de location sans carte de crédit se passe au mieux, voici quelques conseils pratiques. Prévoyez le montant exact en espèces : vérifiez le coût total de votre location (nombre de jours x tarif journalier + options éventuelles) et ajoutez le montant de la caution pour être sûr d'avoir suffisamment de liquidités. Plusieurs devises acceptées : les loueurs partenaires acceptent les dirhams marocains (MAD) et les euros (EUR) - si vous payez en euros, le loueur applique un taux de change équitable du jour. Pour les locations longues durée (7 jours ou plus), le virement bancaire peut être plus pratique que de transporter beaucoup d'espèces - contactez le loueur à l'avance sur WhatsApp pour obtenir ses coordonnées bancaires. Envoyez votre demande à l'avance sur WhatsApp : même si aucune carte de crédit n'est nécessaire, réserver tôt vous garantit la disponibilité du véhicule et vous fait bénéficier des meilleurs tarifs. Lors de la récupération, inspectez soigneusement le véhicule avec l'agent du loueur et signalez tout dommage préexistant sur le formulaire d'état des lieux - cela protège votre caution. Prenez des photos du véhicule avant de partir, notamment des éventuelles rayures ou impacts existants. Conservez tous les reçus : celui du paiement de la location et celui de la caution, que le loueur vous restituera intégralement au retour du véhicule en bon état."
        }
      ],
      faq: [
        {
          question: "Puis-je vraiment louer une voiture à Marrakech sans carte de crédit ?",
          answer: "Oui, absolument ! Avec Benatna, vous payez le loueur partenaire en espèces (dirhams ou euros) ou par virement bancaire. Vous n'avez pas besoin de carte de crédit, uniquement un permis de conduire valide et une pièce d'identité."
        },
        {
          question: "Comment fonctionne la caution sans carte de crédit ?",
          answer: "Au lieu de bloquer des fonds sur une carte de crédit, vous signez un document de caution (2 000 à 5 000 DH selon le véhicule). Le loueur vous restitue cette caution intégralement si vous rendez le véhicule sans dommage. Aucun argent n'est prélevé ou bloqué."
        },
        {
          question: "Quels documents sont nécessaires pour louer sans carte de crédit ?",
          answer: "Vous avez besoin d'un permis de conduire valide (depuis au moins 1 an), d'une pièce d'identité (carte nationale ou passeport) et du montant de la location en espèces. C'est tout !"
        },
        {
          question: "Puis-je payer en euros si je n'ai pas de dirhams ?",
          answer: "Oui, les loueurs partenaires acceptent les euros en espèces, avec un taux de change équitable du jour. Vous pouvez également effectuer un virement bancaire avant votre arrivée."
        },
        {
          question: "Y a-t-il des frais supplémentaires pour location sans carte de crédit ?",
          answer: "Non, aucun frais supplémentaire. Les tarifs sont identiques que vous payiez par carte ou en espèces. Nous croyons en la transparence totale des prix."
        }
      ]
    },
    cta: {
      title: "Réservez Votre Voiture Sans Carte de Crédit Maintenant",
      subtitle: "Paiement flexible • Plus de 50 véhicules disponibles • Livraison gratuite",
      buttonText: "Voir les Véhicules Disponibles",
      buttonLink: "/louer?city=Marrakech"
    },
    relatedPages: [
      { title: "Location Voiture Marrakech", link: "/location-voiture-marrakech" },
      { title: "Location Sans Carte Crédit Casablanca", link: "/location-voiture-sans-carte-credit-casablanca" }
    ]
  },
  
  {
    slug: "location-voiture-sans-carte-credit-casablanca",
    title: "Location voiture sans carte de crédit à Casablanca",
    metaTitle: "Location voiture sans carte de crédit Casablanca | Benatna",
    metaDescription: "Louez une voiture à Casablanca sans carte de crédit et sans caution : paiement par virement, livraison gratuite à Mohammed V et en gare. Dès 3 jours.",
    keywords: "location voiture sans carte crédit casablanca, louer voiture sans cb casablanca, location voiture sans caution casablanca",
    h1: "Location de voiture sans carte de crédit à Casablanca",
    heroSubtitle: "Sans caution • Paiement par virement • Livraison gratuite • Dès 3 jours",
    category: {
      label: "Location à Casablanca",
      href: "/location-voiture-casablanca"
    },
    content: {
      intro: "Beaucoup d’agences demandent une carte de crédit pour bloquer une caution au départ. Chez Benatna, vous réservez une voiture de tourisme à Casablanca sans carte de crédit et sans caution : le paiement se fait par virement, et Benatna vous confirme la voiture, le prix total et les documents requis sous 1 heure sur WhatsApp.",
      sections: [
        {
          title: "Deux façons de payer, aucune caution",
          content: "Option 1 : vous réglez 100 % du prix de la période par virement avant la location, sans supplément. Option 2 : vous versez à la réservation un acompte de 30 % plus 500 DH. Dans les deux cas, aucune caution n’est demandée et aucune carte bancaire n’est nécessaire pour réserver. Votre choix figure dans le récapitulatif et dans le message de réservation."
        },
        {
          title: "Réserver en quelques minutes",
          content: "Choisissez jusqu’à trois voitures par ordre de préférence, vos dates (trois jours minimum) et votre lieu de prise en charge. Le récapitulatif affiche le prix total estimé. Vous envoyez la réservation sur WhatsApp avec son numéro BN, et Benatna vous répond sous 1 heure avec la voiture confirmée et les coordonnées du virement."
        },
        {
          title: "Livraison gratuite à l’aéroport et en gare",
          content: "La voiture vous est remise gratuitement aux points desservis de Casablanca, notamment à l’aéroport Mohammed V, à Casa-Voyageurs et à Casa-Port. Le rendez-vous est convenu à l’avance. Une livraison à Rabat peut être étudiée sur demande depuis Casablanca."
        },
        {
          title: "Ce que le contrat précise encore",
          content: "Sans caution ne veut pas dire sans conditions : les documents requis, les garanties d’assurance, la franchise et le kilométrage sont précisés pour le véhicule confirmé. Lisez-les avant la remise de la voiture. En cas d’annulation, l’acompte est remboursé à 100 % jusqu’à 48 h avant le départ et à 50 % moins de 48 h avant."
        }
      ],
      faq: [
        {
          question: "Peut-on louer une voiture à Casablanca sans carte de crédit ?",
          answer: "Oui. Le paiement se fait par virement : 100 % avant la location, ou un acompte de 30 % plus 500 DH à la réservation. Aucune carte de crédit n’est nécessaire pour réserver."
        },
        {
          question: "Faut-il laisser une caution ?",
          answer: "Non. Les deux options de paiement remplacent la caution : aucun montant n’est bloqué ni déposé au départ."
        },
        {
          question: "Puis-je récupérer la voiture à l’aéroport Mohammed V ?",
          answer: "Oui. La livraison est gratuite à l’aéroport Mohammed V et aux autres points desservis de Casablanca, avec un rendez-vous convenu à l’avance."
        },
        {
          question: "Quelle est la durée minimum ?",
          answer: "Trois jours. Indiquez vos dates exactes dans la réservation pour obtenir le prix total."
        }
      ]
    },
    cta: {
      title: "Réserver sans carte de crédit à Casablanca",
      subtitle: "Sans caution • Confirmation sous 1 heure • Livraison gratuite",
      buttonText: "Choisir ma voiture et mes dates",
      buttonLink: "/louer?city=Casablanca"
    }
  },

  // Plus de pages suivent...
];
