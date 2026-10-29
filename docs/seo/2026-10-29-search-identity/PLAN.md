# Benatna — SEO et recherche générative

Analyse du 29 octobre 2026. Objectif : des demandes de location qualifiées au départ de Casablanca ; Rabat en livraison sur demande. Une seule demande réelle rapportée par le propriétaire. Ne pas confondre trafic, sortie WhatsApp, message reçu et réservation.

## Fondements officiels

- Google : une page doit être indexée et admissible avec un extrait pour pouvoir servir de lien dans AI Overviews ou AI Mode. Pas de fichier, balisage ou schéma spécial « IA » obligatoire. llms.txt n’est pas un facteur de visibilité Google.
  https://developers.google.com/search/docs/appearance/ai-features
  https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Bing : découverte, indexation, clarté et fiabilité soutiennent aussi Copilot. Données structurées exactes, contenu vérifiable, liens internes et notifications IndexNow pertinentes ; aucune citation garantie.
  https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a
- OpenAI : OAI-SearchBot concerne ChatGPT Search ; GPTBot concerne l’entraînement. Les choix sont indépendants. Ne pas modifier les droits d’entraînement sous prétexte d’améliorer la recherche.
  https://developers.openai.com/api/docs/bots

## Lot de correction immédiat

Constats confirmés dans les fichiers et le site public : llms.txt annonce encore six villes, 300 véhicules, 1 200 avis, réponse/réservation en deux minutes et conditions générales non établies. Le schéma Organization global ajoute un ancien catalogue caché, une disponibilité InStock, des prix, horaires et profils non confirmés. D’autres composants partagés injectent promotions à 150/170/180 MAD, remises fixes et HowTo en cinq minutes.

Corrections préparées : résumé descriptif exact avec liens vers les pages actuelles ; Organization global limité à l’identité et à la zone servie ; service de mise en relation sans prix fixe ; suppression des promotions et délais non étayés dans les composants partagés ; suppression de FAQ cachées et de dates d’article automatiquement fabriquées ; retrait du SearchAction qui ciblait un paramètre non implémenté. Aucune URL publique supprimée, aucun modèle ni tarif visible modifié.

llms.txt est corrigé parce qu’il existe déjà et doit être exact, pas pour promettre un gain Google. Aucun texte demandant aux modèles de recommander la marque n’est conservé. Nouveau contrôle des 99 pages et des liens du résumé dans prerender:safe.

## Ordre de travail après ce lot

1. **Indexation des pages commerciales.** Contrôler Google et Bing pour accueil, Casablanca, Mohammed V, Casa-Voyageurs, guide des points desservis, automatique, longue durée et fiches des modèles. Vérifier canoniques, dernière exploration et état réel. La redirection www permanente et les deux anciens chemins véhicules ont été corrigés dans les lots précédents. Relancer les soumissions seulement quand l’interface confirme leur acceptation ; IndexNow n’est pas une preuve d’indexation Google.
2. **Questions concrètes des locataires.** Améliorer les pages existantes, sans multiplier les variantes presque identiques : arrivée aéroport ou gare, choix selon bagages/passagers, boîte automatique, préparation depuis l’étranger, durée de séjour, fonctionnement de la proposition du loueur. Rester sur Casablanca et Rabat conditionnel. Ajouter des réponses précises quand les faits sont connus, sans inventer terminal, guichet, caution, âge ou délai garantis.
3. **Liens vers la demande.** Depuis les articles déjà visités (carburant, péages, stationnement), proposer un lien contextuel vers Casablanca et le catalogue, en gardant le contenu utile de l’article. Mesurer les passages vers le catalogue puis la demande confirmée ; une vue informative ne correspond pas à une intention de louer.
4. **Confiance vérifiable.** Identité et profils cohérents, fonctionnement de la plateforme expliqué, vrais avis publiés avec accord, mentions et liens obtenus auprès de partenaires réels. Pas de faux avis, chiffres de flotte inventés, liens achetés ou pages de comparaisons qui s’autoproclament gagnantes.
5. **Mesure distincte.** Google/Bing : impressions, clics et pages indexées. IA : citations et URL citées quand les rapports Google/Bing le permettent ; visites référentes ChatGPT/Copilot/Perplexity quand identifiables. Conversion : catalogue, étapes du formulaire, sorties WhatsApp, demandes réellement reçues et demandes qualifiées. Les sources des graphiques actuels comptent des événements et ne sont pas un tableau de visiteurs distincts par canal.

## Architecture ciblée

Accueil → Casablanca → [aéroport Mohammed V, gares, automatique, séjour jusqu’à six mois] → catalogue → fiche modèle → demande avec dates, modèles et lieu.
Le guide commun des points desservis relie les gares et aéroports de Casablanca et Rabat. Les articles utiles renvoient à cette architecture lorsqu’un lien aide le lecteur. Conserver les adresses existantes ; éviter la duplication de pages par synonymes.

## Contrôle de visibilité IA à établir

Choisir un petit jeu stable de questions : location touristique au départ de Casablanca, livraison gratuite à Mohammed V, arrivée Casa-Voyageurs, automatique et séjour d’un mois. Pour chaque moteur et date, relever réponse réelle, mention de Benatna, URL citée et exactitude de l’offre. Aucun score de visibilité ne sera attribué sans ces observations. Vérifier aussi les paramètres Google de participation à la recherche générative lorsque disponibles.

## Limites

Ce lot corrige des composants partagés et un résumé existant. Il ne certifie pas tous les textes, tous les schémas Product/AutoRental et toutes les fiches historiques. Les dates, conditions et disponibilités des autres balisages doivent encore être examinées par rapport au contenu visible. Les accès robots autorisés ne prouvent ni exploration réelle, ni indexation, ni citation. Aucun résultat commercial immédiat garanti.

## Validation du lot

TypeScript et ESLint ciblé réussis. Build et prérendu99/99 ; politique169routes,26fiches,2861liensinterneset87imagesvalides. Nouveau audit-search-identity :99pages,10liensdu résumé,0anomalie. Les références légitimes au même @id sont distinguées de la définition complète de l’organisation. Schémas Product/AutoRental des pages non modifiés dans ce lot restent hors de cette attestation.
