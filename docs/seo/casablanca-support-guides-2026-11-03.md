# Guides prix, caution et livraison — 3 novembre 2026

## Problème constaté et correction

Les réponses HTTP publiques avant modification confirmaient des affirmations héritées : caution zéro et restitution sous 3–5 jours sur le guide caution ; forfaits mensuels, durée12mois et livraisons Marrakech sur le guide prix. Ces conditions ne sont pas établies pour l’offre actuelle. Les captures HTML avant changement sont conservées hors dépôt dans support-guides-2026-11-03.

Les URL existantes `/prix-location-voiture-maroc-2026` et `/caution-location-voiture-maroc` sont conservées. Deux configurations remplacent les anciens objets dans `additionalLongTailPages.ts` ; les composants de route et le template restent utilisés. Les textes portent sur Casablanca, Rabat sur demande depuis Casablanca, minimum3jours et maximum6mois calendaires. Aucun montant de caution, délai de restitution, assurance uniforme, rabais ni stock n’est inventé.

Les exemples de prix Clio, Duster, Golf et Tucson utilisent `getVehicleDetail` et `currentDailyPrice`, comme les fiches correspondantes. Ils sont indicatifs, pas un relevé du marché marocain ni un tarif final pour les dates du visiteur. Les deux guides donnent accès aux modèles, à Casablanca, MohammedV et aux gares ; leurs CTA ouvrent `/louer?city=Casablanca`. Les six pages commerciales et quatre fiches classiques renvoient vers les guides prix/caution. Le guide de prise en charge conserve ses huit lieux et ajoute des liens contextuels prix/caution/aéroport/gares.

## Validation et limites

TypeScript et lint des nouveaux fichiers et composants ciblés ; le gros fichier historique `additionalLongTailPages.ts` a76 erreurs `no-useless-escape` avant et après, sans nouvelle règle ni augmentation. Ce lot ne prétend pas corriger ce lint historique. Build, pré-rendu99pages et audits techniques du dépôt ; test navigateur `scripts/test-rental-support-guides.mjs` sur320/390/1280 : concordance FAQ visible/JSON-LD, canoniques, débordement, retrait des promesses ciblées, parcours vers demande incomplète bloquée, lieux CMN/Rabat-Agdal conservés et cohérence des quatre prix guide/fiches. Aucun message réel envoyé.

Le contrôle porte sur ces trois guides et leurs liens, pas sur toutes les promesses historiques des99pages. Des textes hérités existent ailleurs et dans des composants non routés, par exemple `GuideCautionLocation.tsx`, qui n’est pas utilisé par App.tsx. Ils ne sont pas certifiés par ce lot. Aucun nouvel accès aux statistiques GSC ni amélioration de trafic n’est revendiqué ; la référence disponible reste l’extraction du1er novembre. Suivre les clics utiles et demandes sur des périodes comparables après réexploration.

## Recherche de référence

- Google, guide actuel des fonctionnalités génératives : https://developers.google.com/search/docs/fundamentals/ai-optimization-guide (consulté3novembre). Il privilégie les fondations SEO et un contenu utile et original ; la qualité technique ne garantit pas une citation. Le réglage d’inclusion Search generative AI de Search Console n’a pas été vérifié dans ce lot.
- Google, éligibilité des pages : https://developers.google.com/search/docs/appearance/ai-features (consulté3novembre) : indexation et affichage d’extrait nécessaires à l’éligibilité, sans garantie de sélection.
- Avis Maroc, informations légales : https://www.avis.ma/informations-legales (consulté3novembre), utilisé uniquement pour vérifier le vocabulaire caution/préautorisation/franchise. Les conditions de ce fournisseur ne sont pas présentées comme celles de Benatna, ni comme une règle générale au Maroc. Aucun chiffre ou moyen de paiement de ce concurrent n’est repris.
