# Consignes du propriétaire — 22 octobre2026

Les publicités de popularité des comptes Facebook/Instagram sont volontaires. La location et la remise se font à Casablanca, Rabat sur demande depuis Casablanca. Le client peut ensuite voyager où il veut ; Marrakech, Essaouira, Atlas ou Merzouga dans un récit de voyage ne signifient pas une promesse de livraison dans ces villes. Ne pas qualifier ces deux choix de défaut publicitaire.

## Photos

Inventaire avant correction :24fiches pour16modèles, avec un doublon supplémentaire de Golf automatique sous le nom «VW Golf». Les autres répétitions de modèles correspondent aux versions automatique/manuelle. Retirer uniquement le vrai doublon conserve23variantes et les prix/conditions existants.

Le propriétaire valide Hyundai Accent, Kia Sportage et Dacia Duster. Il demande le retrait de la photo Renault Clio et signale Seat Ibiza/Dacia Logan comme mauvais modèles. Les trois images sont remplacées par une illustration neutre explicitement étiquetée, en attendant les nouvelles photos qu’il générera lui-même sur ChatGPT. Ne pas générer ni substituer d’autres photographies sans ses fichiers.

La fiche détaillée Seat Ibiza utilisait réellement la photo de la Sandero ; le catalogue utilisait une autre image. Photos originales de revue et galerie conservées localement dans output/benatna-new-project/photos-2026-10-22. Le manifeste JSON décrit les modèles et leurs liens. Les fichiers historiques de luxe/vans présents dans src/assets ne sont pas des véhicules proposés.

## Demandes WhatsApp

Le propriétaire refuse les demandes de location sans dates confirmées, choix de véhicule et lieu précis de remise. Le message générique de l’accueil avec champs vides doit disparaître. Un clic doit d’abord ouvrir un formulaire, puis un récapitulatif confirmé avant l’ouverture WhatsApp. Cela reste une demande de disponibilité, jamais une réservation confirmée. Minimum3jours et maximum6mois conservés. Pas de changement de prix ni d’horaires/frais inventés.

## Vérifications de cette PR photos

Prix et formules inchangés ; identifiants des autres fiches conservés ; retrait de la photo Clio publique et de ses références actives ; illustrations provisoires sans prétendre représenter les modèles. Build/prérendu et catalogue à vérifier avant fusion. Le changement du parcours WhatsApp est un sujet séparé.

## Livraison des corrections

Photos : PR #30 fusionnée (9c69159371525a3f30aca2ee3abe79e7e9aee57c), production Vercel dpl_ANwoXg7ZWBmWpuxcFXpv8HqrDgUj READY. Vérifications publiées :23variantes, image provisoire accessible, ancienne photo Clio publique404.

Qualification : le bouton accueil, le catalogue, les comparaisons, les fiches véhicule et les anciens liens de location passent par un formulaire commun. Dates futures valides (3jours à6mois), modèle connu et lieu précis obligatoires ; récapitulatif et case de confirmation avant ouverture WhatsApp. Les candidatures des loueurs sur /partenaires restent distinctes. Aucun changement de prix, de base de données ni de publicité.

Les liens HTML de location pointent vers /louer?demande=1 : ils ne peuvent plus ouvrir directement le message vide avant chargement de JavaScript. Une garde des anciens liens et window.open protège aussi les appels résiduels. Les analytics comptent le passage effectif à WhatsApp, pas l’ouverture du formulaire ; texte et dates restent exclus des événements.

Validation : build et prérendu73pages ; audit HTML sans JavaScript73pages sans lien direct de location WhatsApp ;20contrôles navigateur1280/390px ;15contrôles de mesure/confidentialité ;12contrôles de validation des demandes. Les sorties WhatsApp sont simulées et les réponses analytics isolées : aucun message réel envoyé, aucune réception sur téléphone prouvée. Le client conserve la possibilité de modifier son texte dans WhatsApp après ouverture.

Retour arrière : rétablir le commit de production photos9c69159371525a3f30aca2ee3abe79e7e9aee57c. Aucune migration à annuler.
