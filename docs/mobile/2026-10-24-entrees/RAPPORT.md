# Accueil et pages d’arrivée — 24 octobre 2026

Périmètre : accueil, Casablanca, aéroport Mohammed V, gare Casa-Voyageurs, guide commun des gares et aéroports Casablanca/Rabat.

## Corrections
- Ancien formulaire mobile limité à une liste de 30 jours et à des heures de rendez-vous : remplacé par des dates natives, sans limite artificielle de réservation à 30 jours et sans heure imposée. Durée conservée : 3 jours minimum à 6 mois calendaires. Les dates et la ville sont transmises au catalogue.
- Fond du formulaire explicitement blanc et texte sombre ; l’ancienne classe bg-white/98 ne produisait pas de fond opaque. Formulaire commun aux écrans mobiles et ordinateurs, labels et champs tactiles de 48 px.
- Action de demande WhatsApp intégrée dans le formulaire sur mobile ; bouton flottant masquant les champs retiré uniquement sur l’accueil mobile. Dates saisies reprises dans le formulaire de demande. Bouton flottant conservé sur ordinateur et sur les autres pages compatibles.
- Bloc promotionnel secondaire masqué sur mobile pour rapprocher la recherche ; contenu conservé sur les grands écrans. Photo d’accueil existante de 44 Ko conservée, pas de recompression inutile.
- Marges mobiles des pages Casablanca/aéroport et du guide réduites ; CTA principal enveloppant et texte blanc sur fond primaire.
- Page Casa-Voyageurs migrée vers le composant commun : suppression des anciennes promesses de 250 DH/jour, horaires et point de rendez-vous précis, délais ou modalités non confirmés. Conditions actuelles, livraison gratuite convenue à l’avance ; pas de restriction sur les villes où le client peut voyager.
- Liens depuis les pages aéroport et Casa-Voyageurs préremplissent le point de prise en charge dans le catalogue, conservé dans la demande. Les 8 points du guide gardent leurs liens Casablanca/Rabat.

## Vérification
scripts/test-mobile-entry-pages.mjs : 5 pages à 320, 390 et 1280 px, sans débordement ; recherche à +65 jours, périodes de 2 jours et d’un an refusées, ville Rabat conservée, absence d’heure imposée, point CMN/Casa-Voyageurs conservé, huit liens du guide présents et bouton unique sur l’accueil mobile. Dates de recherche reprises dans la demande mobile. Pas d’erreur JavaScript.

scripts/test-qualified-rental-browser.mjs : contrôle de la ville ciblé dans le dialogue ouvert pour éviter de confondre le formulaire de recherche en arrière-plan avec la demande.

Limites : Chrome sur dimensions simulées, pas tous les appareils physiques ni Safari iOS. Pas de score Lighthouse ou de gain Core Web Vitals prétendu. Réception WhatsApp confirmée auparavant par le propriétaire ; aucun nouvel envoi réel nécessaire.
