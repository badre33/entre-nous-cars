# Images publiques et comparatif de durée — 25 octobre 2026

## Défauts reproduits

Les 99 pages du sitemap référencent 37 images locales de base. Deux fichiers sont absents et répondent HTTP404 en production : /hero-rent.jpg et /hero-partners.jpg. Sources : /comparatifs et /comparatif/location-courte-duree-vs-longue-duree-maroc. Avec les variantes srcset, le nouveau contrôle recense 89 fichiers avant correction, dont ces deux absences.

Les deux références sont remplacées par les photos déjà approuvées de Renault Clio et Dacia Duster. Les composants liste/comparatif utilisent désormais le srcset 480/960/1536 existant pour les photographies du catalogue, avec sizes adapté à leurs grilles, décodage asynchrone et chargement différé. Les autres images conservent leur source.

Le comparatif concerné promettait 1 à 6 jours, 7 à 365+ jours, 30 à 50 % de remise, mariages et missions professionnelles, prolongation avec remboursement automatique et prestations garanties. Il est réécrit à URL constante : séjour personnel de 3 jours minimum à 6 mois calendaires maximum, prix indicatifs à confirmer, livraison gratuite aux points desservis de Casablanca et Rabat sur demande depuis Casablanca. Aucun nouveau modèle ni nouvelle photo générée ; photos illustratives, disponibilité à confirmer.

## Contrôle préventif

`scripts/audit-rendered-images.mjs` est ajouté à prerender:safe. Il contrôle les chemins locaux img/src et img|source/srcset des pages du sitemap et leurs signatures de fichiers ; il bloque les fichiers absents ou non reconnus. Mode --base disponible pour contrôle HTTP200, type image et signature sur le site publié. Échec sur les deux fichiers manquants avant correction confirmé.

Limites : images présentes dans le HTML rendu des pages du sitemap, variantes responsives incluses. Arrière-plans CSS, états uniquement JavaScript images intégrées data et images externes exclus. Une signature valide n’atteste pas à elle seule la précision visuelle d’un modèle ; les 26 photos de véhicules restent celles précédemment approuvées.

## Vérification

`test-comparison-images.mjs` passe à 320 px/DPR2, 390 px/DPR1 et 1280 px/DPR1 sur la liste et le comparatif concerné. Les images se décodent ; les photographies à srcset sélectionnent les copies 480 ou 960 px. Pas de débordement horizontal ni erreur JavaScript détectée. Durée 3 jours/6 mois cohérente, anciennes offres exclues absentes et FAQ structurée identique au texte visible sur le comparatif.

TypeScript, ESLint ciblé, build et diff validés. Contrôles du prérendu, liens, images et publication consignés dans le suivi avant clôture. Chrome simulé, sans appareil physique ; aucun gain de temps d’affichage, d’indexation ni de demandes revendiqué. Autres comparatifs non réécrits dans ce lot.
