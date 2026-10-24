# Fiches et images mobiles — 24 octobre 2026

## Constats et corrections
- Fiche Clio à 320 px : nom et prix après le descriptif, titre à 741 px du haut ; après réorganisation, titre à 365 px. La photo est suivie du bloc réservation, puis des onglets. Ordre du DOM et ordre visuel identiques sur mobile ; présentation à deux colonnes conservée sur ordinateur.
- Les 26 photos validées de 1536×1024 sont conservées intactes. 52 copies WebP (480 et 960 px) sont ajoutées, avec srcset et sizes réels sur le catalogue et les fiches. L'ancien srcset référençait deux fois le même fichier. La photo principale de la fiche se charge immédiatement avec priorité haute ; les miniatures restent différées.
- Originaux : 8 369 160 octets au total ; copies 480 : 1 193 446 (-85,7 %) ; copies 960 : 3 675 250 (-56,1 %). Le navigateur choisit selon la taille affichée et la densité de l'écran : ces pourcentages ne sont pas une mesure de gain global du site.
- Onglets des fiches et flèches de galerie : zones tactiles d'au moins 44 px.
- Ancien texte des conditions promettant la livraison à Marrakech, Tanger, Agadir et Fès corrigé : Casablanca, Rabat sur demande depuis Casablanca, restitution convenue avec le loueur. Aucun changement des destinations où le client peut voyager.

## Validation
- 26 fiches à 320 px ; Clio, Audi A3 et Range Rover Sport à 390 et 1280 px : images chargées, absence de débordement, ordre mobile, onglets et conditions vérifiés ; aucune erreur JavaScript.
- Trois modèles conservés de la sélection au formulaire, récapitulatif et URL WhatsApp à 390 et 1280 px ; aucun message envoyé.
- 52 fichiers décodés et dimensions contrôlées. TypeScript, lint ciblé et diff vérifiés.

Tests : scripts/test-mobile-vehicle-details.mjs et scripts/test-multiple-rental-browser.mjs. Génération reproductible : scripts/resize-vehicle-images.py (Pillow).

Limites : Chrome avec tailles mobiles, pas une validation physique Safari iOS ; aucun score Lighthouse ni gain Core Web Vitals prétendu. Réception WhatsApp déjà testée et confirmée par le propriétaire.
