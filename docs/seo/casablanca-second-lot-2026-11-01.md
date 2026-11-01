# Deuxième lot de captation à Casablanca — 1er novembre 2026

## Objectif et périmètre

Servir quatre intentions commerciales existantes avec des contenus distincts : voiture automatique, location au mois pour séjour personnel, arrivée à Casa-Voyageurs, choix d’une gare de Casablanca. Les URL sont conservées ; aucune nouvelle page de ville ou variante indexable n’est créée.

- `/location-voiture-automatique-casablanca` : choix de modèle et version, prix/caution, arrivée ; le bouton active réellement le filtre Automatique du catalogue.
- `/location-longue-duree-casablanca` : dates précises, tarif pour toute la période, prolongation sur accord, caution et retour. Le titre explicite la location au mois, jusqu’à six mois calendaires.
- `/location-voiture-gare-casa-voyageurs` : préparation du train, passagers/bagages, choix de modèle, prix et retour.
- `/location-voiture-gare-oncf-maroc` : liens directs Casa-Voyageurs, Casa-Port, Oasis, Aïn Sebaâ ; le lieu est conservé jusque dans le formulaire.

Les pages Casablanca et Mohammed V donnent accès à ce groupe. Des liens contextuels relient les quatre intentions, les modèles et les lieux. Les modèles sont proposés tôt dans la page ; la page générale des gares privilégie le choix de gare. Trois questions propres à chaque page sont visibles et reprises à l’identique dans son FAQPage.

## Fonctionnement conservé

Trois jours minimum, six mois calendaires maximum. Livraison gratuite aux points desservis de Casablanca, rendez-vous convenu à l’avance. Rabat sur demande depuis Casablanca selon le loueur. Tarifs indicatifs et disponibilité/version/contrat/caution à confirmer. Aucun nouveau prix, stock, comptoir, horaire ou forfait mensuel promis. Pas de paiement en ligne. Dates, modèles et lieu requis avant confirmation explicite et ouverture WhatsApp.

Le paramètre `transmission` du catalogue accepte seulement Automatique ou Manuelle ; une autre valeur remet le filtre à tous les types. Ce paramètre ne crée pas de nouvelle URL canonique. La préférence de transmission doit également être précisée au loueur ; le mécanisme des messages WhatsApp n’est pas modifié dans ce lot.

## Vérification

TypeScript et lint ciblé ; build et pré-rendu des 99 URL ; audits des 26 fiches, liens, images, identité et balisages commerciaux. `scripts/test-casablanca-second-lot.mjs` contrôle les quatre pages à 320/390/1280, concordance FAQ visible/JSON-LD, maillage et canoniques, filtre automatique réel, préremplissage des quatre gares et demande de trois mois soumise à confirmation explicite. Aucune confirmation finale WhatsApp n’est cliquée et les appels externes sont bloqués.

## Mesure et limites

Les données historiques GSC lues le 1er novembre comportaient des recherches de longue durée à Casablanca (6 clics/75 impressions et 4/23 pour deux formulations dans la fenêtre Web du 3–30 octobre). Ces lignes sans filtre par page ne prouvent pas quelle URL a reçu tous ces clics. Aucun volume ou classement concurrent n’est mesuré ici.

Comparer à J14/J28 les quatre URL séparément, leurs requêtes et pays/appareils constants, puis les ouvertures WhatsApp et demandes réellement reçues. Le contenu est destiné au HTML initial consultable par les moteurs ; aucune citation IA, indexation ou hausse de trafic n’est garantie. Ce lot n’est pas un audit éditorial intégral des 99 pages.
