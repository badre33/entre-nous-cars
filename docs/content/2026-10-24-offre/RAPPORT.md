# Cohérence de l’offre — 24 octobre 2026

## Couverture et constats

Un balayage ciblé des 99 pages du sitemap a recherché les anciennes promesses de disponibilité24h/24, livraison payante, annulation gratuite et remises fixes. Des contradictions commerciales ont été confirmées dans le glossaire, les pages automatique Casablanca et gare ONCF, ainsi que le comparatif aéroport/centre-ville. Des occurrences dans des guides touristiques décrivent des lieux ou un marché général : elles ne sont pas assimilées automatiquement à une prise en charge Benatna.

## Modifications

- `glossaryTerms.ts` : 56 définitions réécrites, identifiants conservés. Suppression des montants fixes non confirmés de caution, options, franchises et remises ; retrait des conditions automatiques d’annulation, de paiement et de kilométrage. Livraison gratuite aux points desservis de Casablanca, Rabat sur demande depuis Casablanca ; rendez-vous convenu à l’avance ; trois jours à six mois calendaires. Les définitions de motorisation ne promettent pas une disponibilité. Les anciens liens vers des offres hors périmètre sont retirés de ce fichier.
- `Glossaire.tsx` : rappel de l’offre et liens officiels ACAPS/NARSA ; recherche nommée pour les aides techniques. Les mêmes définitions alimentent le contenu visible et la FAQ structurée.
- `coreRentalPages.ts` et les deux pages concernées : contenu factuel pour boîte automatique et arrivée en gare. Plus d’horaires fixes, livraison hors zone, délai de réponse de quelques minutes, moyens de paiement garantis ou garantie universelle de modèle. Les anciennes configurations de ces deux pages sont retirées de `additionalLongTailPages.ts` et archivées dans ce dossier comme preuve.
- `comparisonsData.ts` : même URL conservée pour le comparatif aéroport/centre-ville, centré sur Casablanca et le choix du point de rendez-vous. Livraison gratuite dans les deux cas, tarif final confirmé, Rabat sur demande. Anciennes majorations aéroport, délais, horaires, villes de prise en charge et classement arbitraire retirés.
- Commentaire de `FAQSchemaEnriched.tsx` : anciennes promesses chiffrées de visibilité et CTR supprimées ; le composant publie les questions/réponses fournies, sans garantie de résultat de recherche.

Les clients peuvent organiser leurs déplacements de séjour avec le loueur selon le contrat ; aucun interdit de voyage vers une autre ville n’est créé.

## Sources

Les consignes commerciales viennent du propriétaire dans cette conversation. Pour les notions d’assurance, l’[ACAPS](https://www.acaps.ma/fr/grand-public/biens/assurance-automobile) distingue les garanties et leurs limites contractuelles. Pour l’information routière, la [NARSA](https://www.narsa-securiteroutiere.ma/fr/la-plateforme-infractions-routieres-consultation-simple-et-rapide-des-infractions-commises/) présente son service officiel. Les anciens seuils et sanctions non vérifiés sont remplacés par des définitions générales et une orientation vers les autorités compétentes ; aucune condition propre à un loueur n’est inventée.

## Vérification et limites

`test-current-offer-editorial.mjs` : quatre pages à320/390/1280px ; aucune promesse de prise en charge hors zone ni horaire fixe détectée dans leur texte principal ; aucune largeur excessive ; 56 définitions visibles et FAQ structurée identiques ; recherche et état vide du glossaire fonctionnels ; comparatif sans prix d’offre inventé dans ses données structurées. Aucun appel externe ni message réel envoyé.

TypeScript et ESLint des sept autres fichiers modifiés passent. `additionalLongTailPages.ts` conserve76erreurs préexistantes no-useless-escape, contre90avant retrait des deux anciennes configurations ; aucune nouvelle erreur de cette règle introduite. Le build passe. Les contrôles de prérendu, liens et publication sont consignés avant clôture.

Portée : ces quatre pages et leurs données actives ; le balayage initial est ciblé par expressions, pas une revue exhaustive de toutes les affirmations dans les99pages ou les contenus archivés. Autres guides et comparatifs non réécrits dans ce lot. Tests Chrome simulés, sans appareil physique. Aucune indexation effective, citation IA ou augmentation de leads revendiquée.
