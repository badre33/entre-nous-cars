# Catalogue et navigation — 24 octobre 2026

## Corrections

- `src/components/Header.tsx` : à 768 px, le menu de bureau débordait (1011 px de contenu dans 768 px). Menu compact jusqu’à 1024 px ; commandes du menu et des langues nommées pour les lecteurs d’écran. Fermeture de panneau de 44 × 44 px dans `ui/sheet.tsx`.
- `src/pages/Louer.tsx` : dates natives comme sur l’accueil ; suppression des deux heures 10:00 sans effet. Durée de 3 jours à 6 mois et rendez-vous convenu rappelés. Grille adaptée aux écrans de 320 px.
- `src/utils/rentalDate.ts` : lecture stricte des dates de l’URL comme jours locaux ; une date absente, mal formée ou impossible est ignorée. Évite le décalage d’un jour dû à la lecture UTC pour les visiteurs américains. Les anciens paramètres d’heures n’influencent plus la durée.
- `src/components/FilterBottomSheet.tsx` : liste défilante bornée, bouton Appliquer fixe et accessible ; suppression du geste de fermeture supplémentaire qui interférait avec le défilement. Le geste natif du tiroir reste disponible hors de la liste.
- `src/components/AvailabilityCalendar.tsx` : calendrier contenu à 320 px, résumé et actions repliables ; jour courant sélectionnable en comparant à minuit local.

## Vérification

`test-mobile-catalogue-navigation.mjs` : 320×568, 390×844, 768×700 et 1280×900, fuseaux Los Angeles, Casablanca et Paris. Dates invalides tolérées, dates valides inchangées, aucune heure, menu sans débordement et fermeture tactile 44 px. Sur mobile, défilement jusqu’à la dernière marque et action Appliquer à l’écran. Dates et gare de Rabat transmises au formulaire puis à l’URL WhatsApp après confirmation. Calendrier sans débordement. Aucune erreur JavaScript détectée. Captures jointes.

Régression : cinq pages d’entrée à 320/390/1280 px et sélection de trois modèles à 390/1280 px réussies. TypeScript, ESLint ciblé et build réussis. Les ouvertures WhatsApp sont interceptées : aucun message réel envoyé.

Les contrôles du prérendu et de la production sont consignés dans SUIVI-BENATNA.md et le rapport de publication. Chrome avec dimensions mobiles simulées ; aucun essai sur appareil physique Safari/iPhone. Aucun gain de vitesse ni d’indexation revendiqué.

## Durée tarifaire et changement d’heure

`priceCalculations.calculateDays` utilisait l’arrondi supérieur d’un écart en millisecondes. Trois jours comprenant un recul d’horloge de 1 h pouvaient devenir quatre jours affichés. Le calcul utilise maintenant les dates civiles locales normalisées en UTC, sans changer les coefficients tarifaires. `test-rental-calendar-days.mjs` contrôle cinq périodes de trois jours dans chacun des fuseaux Paris, Los Angeles et Casablanca, ainsi que les dates impossibles et le 29 février valide. Les 15 durées passent. Les 20 contrôles existants de qualification passent aussi.
