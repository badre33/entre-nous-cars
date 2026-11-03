# Révision des huit contenus signalés — 3 novembre 2026

## Périmètre

Les huit URL de l’inventaire précédent sont conservées : jeune conducteur Casablanca, guide général, vérifications avant location (ancienne page arnaques), accident, et quatre articles de blog (conduite, pourquoi Benatna, préparation du séjour, sans carte de crédit). Les copies HTTP avant révision sont dans output/benatna-new-project/review-eight-guides-2026-11-03, hors dépôt.

Quatre configurations dédiées remplacent trois anciens objets et l’appel du générateur jeune conducteur pour Casablanca. Les autres appels historiques ne sont pas réécrits. Quatre articles conservent leur ID, URL, catégorie, image et date de publication ; le contenu et les métadonnées sont révisés, une date de mise à jour3novembre est visible et portée dans BlogPosting/dateModified. Pas de date de publication réinventée.

Retrait des garanties non établies de prix, caution, assurance, assistance, remplacement, documents, âge ou délai uniformes. Les conseils de conduite et de prévention deviennent des points de préparation reliés aux sources et au contrat, sans tarif d’amende, règle de priorité ou numéro d’urgence non vérifié. Casablanca prioritaire, Rabat sur demande depuis Casablanca, livraison gratuite aux points desservis convenue à l’avance, durée3jours–6mois, demande qualifiée et accord du loueur conservés.

## Sécurité et sources

Sur la page accident, un encadré précède le hero ; les actions commerciales du hero sont différées après le contenu. La page distingue secours, autorités, loueur et assureur. La source ACAPS est reprise uniquement pour les repères de constat/déclaration ; elle ne prouve pas les garanties d’un loueur. La sécurité NARSA n’est pas présentée comme un service d’urgence Benatna. Sources visibles, datées et consultées le3novembre :

- https://www.narsa-securiteroutiere.ma/fr/vous-etes-temoin-dun-accident-que-faire/
- https://www.acaps.ma/sites/default/files/2025-04/ACAPS_Kit%20du%20conducteur%20FR.pdf
- https://www.acaps.ma/sites/default/files/vf_step_degats_materiels_accidentvoiture.pdf

Le blog conduite affiche aussi son lien officiel. Les autres articles traitent du fonctionnement déclaré par le propriétaire, sans comparaison tarifaire de concurrents ni moyen de paiement garanti.

## Validation

TypeScript et lint ciblé ; build/pré-rendu99 et audits techniques. `scripts/test-reviewed-eight-guides.mjs` : huit URL à320/390/1280, retrait des promesses ciblées, H1/canonique, FAQ visible/schema, dates de publication préservées et mise à jour visible/schema des quatre blogs, encadré sécurité avant le hero, sources3liens, actions différées, puis accès au catalogue et demande incomplète bloquée. Aucun message réel envoyé ; appels externes bloqués. Le gros fichier additionnel conserve46 erreurs historiques no-useless-escape, contre72 avant retrait des anciens objets ; ne pas confondre lint ciblé et lint global. Le fichier blogArticles.ts ne présente pas d’erreur de lint.

Le même scan textuel appliqué aux99pages passe de8URL signalées à0après build. Ce résultat concerne uniquement les motifs recherchés et ne certifie pas toutes les autres affirmations.

## Limites

Le scan textuel des99pages utilisé pour sélectionner ces contenus n’est pas une certification juridique ou éditoriale de tout le site. Les autres pages, y compris d’autres guides sur permis, âge, assurances et durée, peuvent encore contenir des textes à relire. Aucun gain de classement, trafic ou location n’est établi par cette publication. Les sources sont des repères généraux, pas un calcul d’indemnisation ou la validation d’un dossier individuel. Le réglage d’inclusion IA de Search Console n’est pas vérifié dans ce lot.
