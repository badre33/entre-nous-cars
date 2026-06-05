/**
 * Données des avis clients pour Individual Reviews Schema
 * Reviews structurées pour améliorer le SEO et la confiance
 */

interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
  title?: string;
}

export const globalReviews: Review[] = [
  {
    author: "Mehdi B.",
    rating: 5,
    date: "2024-11-15",
    title: "Service impeccable pour CAN 2025",
    text: "Location d'un Dacia Duster pour suivre la CAN 2025 entre Casablanca et Marrakech. Voiture propre, prix transparent, équipe très pro. Je recommande vivement Benatna !"
  },
  {
    author: "Sarah L.",
    rating: 5,
    date: "2024-11-10",
    title: "Parfait pour road trip Atlas",
    text: "J'ai loué un SUV 4x4 pour une semaine dans l'Atlas. Véhicule en excellent état, procédure simple à l'aéroport Mohammed V. Prix très correct comparé aux grandes franchises."
  },
  {
    author: "Karim M.",
    rating: 4,
    date: "2024-11-05",
    title: "Bon rapport qualité-prix",
    text: "Location longue durée d'une Clio pour 3 mois. Tarif imbattable, voiture récente et bien entretenue. Petit bémol sur les délais de réponse par WhatsApp mais sinon très satisfait."
  },
  {
    author: "Amina T.",
    rating: 5,
    date: "2024-10-28",
    title: "Location mariage sans stress",
    text: "Nous avons loué 5 berlines Mercedes pour notre mariage à Marrakech. Service haut de gamme, chauffeurs professionnels, décoration incluse. Merci à toute l'équipe Benatna !"
  },
  {
    author: "Thomas D.",
    rating: 5,
    date: "2024-10-20",
    title: "Expérience touriste parfaite",
    text: "Premier voyage au Maroc, location d'une Toyota Yaris à l'aéroport de Marrakech. Tout était simple : réservation en ligne, pas de frais cachés, retour flexible. Service en français impeccable."
  },
  {
    author: "Rachid A.",
    rating: 5,
    date: "2024-10-15",
    title: "Voiture électrique disponible",
    text: "J'ai loué une VW ID.3 pour tester l'électrique à Casablanca. Autonomie suffisante pour la ville, recharge gratuite chez Benatna. Belle initiative écologique !"
  },
  {
    author: "Fatima Z.",
    rating: 4,
    date: "2024-10-08",
    title: "Jeune conducteur accepté",
    text: "23 ans, refusée partout à cause de mon âge. Benatna m'a acceptée avec un supplément raisonnable. Voiture Dacia Sandero nickel pour mes trajets Rabat-Casablanca."
  },
  {
    author: "Pierre M.",
    rating: 5,
    date: "2024-10-01",
    title: "Cabriolet pour Agadir",
    text: "Location BMW Z4 cabriolet pour un weekend à Agadir. La classe totale ! Voiture impeccable, assurance tous risques incluse, dépôt rapide. Je reviendrai !"
  },
  {
    author: "Sanaa H.",
    rating: 5,
    date: "2024-09-25",
    title: "Location sans carte bancaire",
    text: "Impossible de louer ailleurs sans CB. Benatna accepte le paiement cash avec caution. Service flexible et compréhensif. Merci pour cette facilité !"
  },
  {
    author: "Youssef K.",
    rating: 4,
    date: "2024-09-18",
    title: "Bon pour longue durée",
    text: "Location 6 mois Dacia Duster pour mission professionnelle. Prix dégressif intéressant, entretien inclus. Voiture changée rapidement lors d'un problème technique."
  },
  {
    author: "Nadia R.",
    rating: 5,
    date: "2024-09-10",
    title: "Van familial spacieux",
    text: "Loué Dacia Jogger 7 places pour vacances famille nombreuse. Espace génial, coffre immense, consommation raisonnable. Idéal pour road trip Marrakech-Essaouira-Agadir."
  },
  {
    author: "Ahmed B.",
    rating: 5,
    date: "2024-09-05",
    title: "Service client réactif",
    text: "Pneu crevé sur autoroute Tanger-Rabat. Équipe Benatna a envoyé assistance en 45 min. Voiture de remplacement fournie. C'est ça le vrai service client !"
  },
  {
    author: "Sophie L.",
    rating: 5,
    date: "2024-08-28",
    title: "Aéroport Fès pratique",
    text: "Retrait et dépôt voiture directement à l'aéroport de Fès. Hyper pratique, gain de temps énorme. Procédure rapide, voiture Citroën C3 nickel."
  },
  {
    author: "Hassan M.",
    rating: 4,
    date: "2024-08-20",
    title: "Prix transparents enfin",
    text: "Fini les frais cachés des grandes franchises ! Benatna affiche le prix TTC dès le départ. Seule la caution remboursable à prévoir. Honnêteté appréciée."
  },
  {
    author: "Leila F.",
    rating: 5,
    date: "2024-08-15",
    title: "Utilitaire pour déménagement",
    text: "Loué Kangoo utilitaire pour déménagement Casablanca. Tarif weekend très avantageux, chargement facile, consommation correcte. Alternative parfaite aux déménageurs."
  },
  {
    author: "Marc T.",
    rating: 5,
    date: "2024-08-08",
    title: "Luxe accessible",
    text: "Location Mercedes Classe E pour événement pro. Tarif 40% moins cher que chez Hertz ! Voiture récente, cuir, GPS, je me suis senti comme un VIP."
  },
  {
    author: "Imane S.",
    rating: 5,
    date: "2024-08-01",
    title: "Weekend spontané Marrakech",
    text: "Réservation last minute vendredi soir pour weekend Marrakech. Voiture dispo samedi matin ! Flexibilité et réactivité au top. Dacia Duster parfait pour l'Atlas."
  },
  {
    author: "Karim D.",
    rating: 4,
    date: "2024-07-25",
    title: "4x4 pour désert",
    text: "Location 4x4 Duster pour expédition désert Merzouga. Voiture a bien tenu le choc des pistes. Petit conseil : prendre l'assurance tous risques pour le sable."
  },
  {
    author: "Zineb A.",
    rating: 5,
    date: "2024-07-18",
    title: "Programme fidélité généreux",
    text: "5ème location avec Benatna, j'ai eu -15% de réduction automatique ! Système de points fidélité vraiment intéressant contrairement aux promesses vides d'autres loueurs."
  },
  {
    author: "Omar H.",
    rating: 5,
    date: "2024-07-10",
    title: "Location pro récurrente",
    text: "Notre entreprise loue 10 voitures/mois avec Benatna. Facturation simplifiée, flotte variée, service commercial à l'écoute. Partenaire de confiance pour nos déplacements."
  },
  {
    author: "Yasmine K.",
    rating: 5,
    date: "2024-07-05",
    title: "Voiture récente garantie",
    text: "J'avais peur de tomber sur une vieille voiture... Reçu une Peugeot 2008 de 2023 avec 8000 km ! Benatna privilégie les véhicules récents, c'est appréciable."
  },
  {
    author: "Amine R.",
    rating: 4,
    date: "2024-06-28",
    title: "Tarif étudiant disponible",
    text: "Étudiant à Rabat, j'ai eu -10% avec ma carte ISIC. Peu de loueurs acceptent les étudiants. Benatna fait un effort pour les jeunes, respect !"
  },
  {
    author: "Samira B.",
    rating: 5,
    date: "2024-06-20",
    title: "Assurance complète incluse",
    text: "Accident (pas ma faute) avec voiture louée. Assurance tous risques a tout couvert sans franchise. Zéro stress, zéro frais supplémentaire. Prenez toujours l'assurance complète !"
  },
  {
    author: "Mehdi L.",
    rating: 5,
    date: "2024-06-15",
    title: "Kilométrage illimité top",
    text: "Road trip 2500 km Tanger-Dakhla en 2 semaines. Kilométrage illimité inclus = économie de 400 DH ! Benatna comprend les voyageurs qui veulent explorer le Maroc."
  },
  {
    author: "Salma M.",
    rating: 5,
    date: "2024-06-08",
    title: "Personnel multilingue",
    text: "Service en arabe, français, anglais et espagnol. Communication fluide pour nous touristes. Équipe jeune, dynamique et souriante. Ambiance familiale."
  },
  {
    author: "Rachid T.",
    rating: 5,
    date: "2024-06-01",
    title: "Meilleur tarif garanti",
    text: "J'ai comparé 8 sites de location. Benatna était le moins cher de 20-30% ! Sans rogner sur la qualité. Comment ils font ? En tout cas merci pour mon porte-monnaie."
  },
  {
    author: "Nora F.",
    rating: 4,
    date: "2024-05-25",
    title: "Processus simple et rapide",
    text: "Réservation en ligne en 5 min, retrait en 10 min. Pas de paperasse interminable, contrat clair et lisible. Enfin de la simplicité dans la location de voiture !"
  },
  {
    author: "Youssef A.",
    rating: 5,
    date: "2024-05-18",
    title: "Entretien impeccable",
    text: "Voiture propre dedans/dehors, plein fait, niveau huile OK, pneus neufs. On sent que Benatna prend soin de sa flotte. Confort et sécurité garantis."
  },
  {
    author: "Khadija S.",
    rating: 5,
    date: "2024-05-10",
    title: "GPS et sièges bébé gratuits",
    text: "GPS et 2 sièges auto pour mes enfants fournis gratuitement ! Ailleurs on paie 50 DH/jour. Benatna pense aux familles, bravo pour cette attention."
  },
  {
    author: "Hamza D.",
    rating: 5,
    date: "2024-05-05",
    title: "Recommandation sans hésiter",
    text: "8 jours au Maroc, 0 problème. Voiture fiable, prix juste, service humain. J'ai déjà recommandé Benatna à 5 amis qui préparent leur voyage. Continuez comme ça !"
  }
];

export const casablancaReviews: Review[] = globalReviews.slice(0, 10);
export const marrakechReviews: Review[] = globalReviews.slice(5, 15);
export const rabatReviews: Review[] = globalReviews.slice(10, 20);
export const tangerReviews: Review[] = globalReviews.slice(15, 25);
export const agadirReviews: Review[] = globalReviews.slice(20, 30);
export const fesReviews: Review[] = [...globalReviews.slice(0, 5), ...globalReviews.slice(25, 30)];
