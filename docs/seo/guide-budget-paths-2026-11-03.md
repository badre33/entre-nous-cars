# Parcours depuis les guides carburant et péages — 3 novembre 2026

Le relevé Bing AI Performance du 3 novembre (filtre 30 D) affiche 321 citations pour le guide carburant et 161 pour les péages, contre une faible présence des pages commerciales. Ce sont des citations historiques et échantillonnées, pas des demandes reçues. Les preuves sont conservées dans `output/benatna-new-project/bing-ai-2026-11-03` du dossier de travail partagé.

Les deux guides possédaient déjà un bloc de liens vers Casablanca, Mohammed V et Casa-Voyageurs, placé entre l’introduction et la première réponse pratique. Ce lot déplace ce bloc après la première section, afin que le lecteur trouve d’abord où vérifier les prix du carburant ou les premiers repères de péage. Deux liens explicites vers le prix de location et la caution rejoignent les trois liens existants. Sur mobile, les liens restent sur une colonne et mesurent au moins 44 px de haut ; à partir de 640 px, le bloc utilise deux colonnes.

La configuration `rentalJourney.afterSection` indique un index de section à partir de zéro. Seuls les deux guides l’activent avec la valeur 0. Les autres pages gardent leur placement et leur disposition habituels. Le composant réutilise le même bloc, sans deuxième copie dans le HTML.

Les URL, titres, réponses FAQ, prix routiers cités, sources et dates de vérification ne changent pas. En particulier, le relevé routier reste daté du 29 octobre : aucune nouvelle vérification de tarif n’est prétendue. Les CTA conduisent toujours au catalogue Casablanca et au formulaire qualifié. Le minimum de trois jours, maximum six mois, choix d’un à trois modèles et confirmation du lieu restent applicables.

## Fiabilité du pré-rendu

Le premier pré-rendu local a échoué à l’audit d’identité sur 12 pages : le HTML capturé ne contenait pas l’Organization globale. Un contrôle du même build dans Chrome confirme que l’identité apparaît ensuite à l’exécution. Le critère de disponibilité du pré-rendu attend désormais cette identité avant de capturer le HTML, en complément des contrôles de titre, contenu et canonique existants. L’audit final reste obligatoire ; aucun schéma ni résultat d’audit n’est supprimé pour masquer le défaut.

## Vérification avant publication

- TypeScript et lint ciblé du composant et du test existant.
- Pré-rendu des 99 pages et audits du dépôt (fiches, maillage, images, identité, données structurées).
- Test existant `test-guide-rental-journey.mjs` renforcé : ordre réel du contenu et du bloc, cinq destinations, cibles tactiles, sources datées, retrait des anciens schémas commerciaux, débordement à 320/390/1280 px, arrivée au catalogue et demande incomplète bloquée avant WhatsApp.
- Test des trois guides prix/caution/prise en charge pour vérifier que le placement par défaut et les points de remise sont conservés.
- Aperçu Vercel puis vérification publique après fusion. Aucun message réel nécessaire.

## Repli

En cas de régression de placement, navigation ou qualification, rétablir le commit précédent via un revert de cette PR. Aucun changement de base de données, compte ou variable d’environnement.

La publication et les résultats effectifs des vérifications sont consignés dans le suivi du projet et les preuves `guide-budget-paths-2026-11-03`. Aucun gain de clics, de citations ou de demandes n’est revendiqué sur la base de ce changement seul.
