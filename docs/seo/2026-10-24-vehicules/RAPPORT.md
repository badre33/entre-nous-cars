# Indexabilité des 26 fiches véhicules — 24 octobre 2026

## Problème confirmé sur le site public
Sans exécuter JavaScript, 11 fiches premium sur 26 passaient les contrôles. Les 15 modèles classiques étaient absents du sitemap ; leur URL renvoyait un écran applicatif générique portant noindex, avec peu de contenu propre au véhicule. Une URL accessible dans un navigateur React ne prouve donc pas que sa fiche est indexable.

Google précise qu’un noindex présent dans le HTML initial peut l’amener à ne pas exécuter le JavaScript qui le retirerait : [documentation Google Search Central](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

## Corrections
- `src/data/sitemapPages.json` : conservation des 73 URL sélectionnées hors véhicules.
- `scripts/generate-sitemap.js:11` : génération des fiches depuis la même liste de 26 modèles approuvés que le formulaire et le catalogue. Le générateur obsolète qui pouvait réintroduire d’anciennes villes et des articles périmés est remplacé. Doublons, chemins privés et offres exclues font échouer la génération. Pas de date lastmod fabriquée.
- `public/sitemap.xml` : 99 URL uniques, dont les 26 modèles. Les 11 modèles premium existants restent présents ; ajout des 15 classiques.
- `package.json:13` : génération automatique du sitemap dans le build de production et contrôle des 26 fiches après prérendu.
- `scripts/prerender.mjs:72` et contrôle de complétude : seuil adapté aux fiches factuelles courtes (500 caractères) plutôt qu’aux articles, sans remplissage de texte. Contrôles de titre propre, métadonnées et stabilité conservés. Les 99 pages sont générées ; les 169 routes connues gardent leur politique, avec 70 réponses explicites hors sitemap au lieu de 85.
- `src/pages/VehicleDetail.tsx:44` : titre et description propres à chaque modèle et à Casablanca ; retrait du tarif de base figé du titre. Prix de la fiche inchangé, indicatif et à confirmer. Conditions visibles : prise en charge Casablanca, 3 jours à 6 mois, livraison gratuite convenue ; Rabat sur demande.
- `scripts/audit-vehicle-indexability.mjs` : contrôle sans JavaScript de chaque modèle, sitemap, HTTP 200 sur le site public, canonique unique, absence de noindex dans HTML/en-têtes, h1, prix, photo et lien HTML depuis le catalogue. Exécuté automatiquement sur les fichiers du build avant déploiement.

## Vérification avant publication
26/26 fiches valides dans le HTML généré, 26 titres Casablanca et 26 liens depuis le catalogue. Les 99 pages sont prérendues. TypeScript, lint ciblé et diff validés. Tests de fiches : 26 modèles à 320 px et trois modèles à 390/1280 px. Sélection de trois véhicules conservée jusqu’à la demande à 390 et 1280 px. Aucun message réel envoyé.

Le serveur Vite preview ne reproduit pas le routage de fichiers propres de Vercel pour le HTML sans JavaScript : l’audit brut local porte donc sur les fichiers dist. Les tests interactifs utilisent preview ; les codes HTTP et en-têtes réels seront recontrôlés sur benatna.ma après déploiement.

## Limites
Ce lot vérifie les 26 fiches approuvées et le contenu du sitemap, pas tout le contenu éditorial ni tous les balisages structurés du dépôt. « Indexable » ne signifie pas « indexé ». L’état Google Search Console de chaque fiche et leur présence dans les résultats ne sont pas attestés ici. Le sitemap facilite la découverte ; ni une soumission ni un signalement IndexNow ne garantissent l’exploration, l’indexation, un classement ou une citation par un moteur génératif. Le HTML lisible sans JavaScript sert les visiteurs et les moteurs ; aucun fichier ou balisage spécial IA n’est ajouté.

Référence complémentaire : [guide Google sur les fonctionnalités génératives et le référencement](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).
