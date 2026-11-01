# Premier lot de captation organique — 1er novembre 2026

Objectif : améliorer les portes d’entrée commerciales existantes pour les recherches de location à Casablanca, en particulier Mohammed V et quatre modèles classiques. L’analyse publique de OneClickDrive montre une architecture par ville, modèle et lieu d’arrivée ; aucun volume de trafic ni classement concurrent n’a été mesuré. Les textes de ce lot sont originaux et reposent sur le fonctionnement déclaré de Benatna.

## Périmètre publié dans ce lot

- `/location-voiture-casablanca` : comparaison et liens explicites vers les quatre modèles, placés avant les sections explicatives pour faciliter le choix sur mobile.
- `/location-voiture-aeroport-casablanca` : titre principal explicite, explication prix/caution/livraison, liens vers les quatre modèles.
- `/vehicule/renault-clio`, `/vehicule/dacia-duster`, `/vehicule/vw-golf`, `/vehicule/hyundai-tucson` : titres et descriptions propres, conseils de choix distincts, comparaison de modèles, liens de retour vers Casablanca, Mohammed V et Casa-Voyageurs. Clio 5 conservée.
- Composant partagé des 26 fiches : bouton « Préparer ma demande », conditions de caution, assurance, kilométrage et annulation à confirmer avec le loueur au lieu de garanties uniformes non établies. Les caractéristiques restent des repères indicatifs à confirmer selon la version.

Les six URL canoniques existantes sont conservées. Aucune nouvelle page de ville, aucun prix ni stock ajouté. Pas de modification de campagne Meta, de consentement, de paiement ou de numéro WhatsApp. Prise en charge à Casablanca, livraison Rabat sur demande depuis Casablanca, minimum trois jours et maximum six mois calendaires. Le formulaire avec dates, modèle et lieu reste obligatoire avant WhatsApp.

## Architecture

`Casablanca ↔ Mohammed V ↔ fiches modèles`, avec liens entre modèles comparables et retour vers Casa-Voyageurs. Le nouveau contenu est visible dans le HTML pré-rendu, sans ouverture d’onglet. Aucun balisage d’offre ou de produit n’est ajouté. Cette accessibilité profite également aux moteurs génératifs capables de consulter ces pages ; elle ne garantit pas une citation.

## Validation

- TypeScript, lint des cinq fichiers applicatifs modifiés/créés et contrôle du diff.
- Build et pré-rendu des 99 URL ; audits d’indexabilité des 26 fiches, liens internes, images et balisages.
- `scripts/test-casablanca-acquisition.mjs` : six pages × trois largeurs (320/390/1280), canonique unique, H1 unique, liens de comparaison, absence de débordement, conservation du modèle dans la demande et blocage d’une demande incomplète. Appels externes bloqués ; aucun message réellement envoyé.
- Les trois tests historiques utilisant le libellé de l’ancien bouton ont leur sélecteur actualisé.

## Mesure après publication

Référence GSC observée le 1er novembre : Web, tous pays et appareils, 3–30 octobre, filtre page contenant `/vehicule/` : 2 clics, 73 impressions, position moyenne 41,9. Ce sont les fiches véhicules visibles dans GSC, pas les visites du site ni les demandes reçues. Seule Clio figure parmi les quatre modèles de ce lot dans les lignes visibles (0 clic, 5 impressions) ; l’absence des trois autres dans ce tableau ne prouve pas une non-indexation.

Comparer après 14 puis 28 jours les impressions/clics/requêtes de chacune des six URL avec une fenêtre précédente de même durée et des filtres pays/appareil constants. Suivre séparément les ouvertures WhatsApp internes et les demandes effectivement reçues et qualifiées. Aucune amélioration de trafic ou de classement ne peut être constatée au moment de publier ce lot.

Suite proposée après lecture des données : automatique, séjour prolongé et gares. Ce lot ne constitue pas une révision éditoriale exhaustive des 99 pages ni une certification de chaque équipement du catalogue.
