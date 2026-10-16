> Journal historique expurgé : les étapes décrivent l’état à leur date, pas l’état actuel. Voir `../2026-10-16/RELECTURE.json` et le journal courant. Identités personnelles retirées ; aucun mot de passe ni jeton inclus.

# Benatna — découverte et recherche IA, 15 octobre 2026

## Google Search Console
Sitemap accepté, 87 pages découvertes. Demandes individuelles confirmées : accueil, /location-voiture-casablanca, /louer, /prise-en-charge-casablanca-rabat et /faq. La demande de l’accueil a finalement réussi après une erreur temporaire Google. Les confirmations signifient mise en file d’exploration, pas indexation effective du nouveau contenu.

## Robots et moteurs génératifs
Neuf requêtes publiques contrôlées : trois pages (accueil, Casablanca, guide arrivées), chacune avec les agents Bingbot, OAI-SearchBot et PerplexityBot. Réponses HTTP 200, exploration permise par robots.txt, canonique correcte, texte lisible dans le HTML et absence de noindex. Voir ai-search-access-check.json. Les contrôles proviennent de notre client HTTP : ils ne prouvent ni accès depuis les adresses IP réelles des robots, ni passage réel, ni recommandation.

La règle générale existante autorise les robots de recherche publics, tout en excluant API/admin/analytics/auth. Aucune modification des préférences d’entraînement ni des protections réseau. OAI-SearchBot et PerplexityBot concernent la recherche ; ce travail ne consiste pas à demander l’entraînement d’un modèle.

## IndexNow
Ajout vérifiable PR #19 : fichier de preuve public et commande manuelle, mode simulation par défaut, validation du fichier en ligne obligatoire avant envoi. Les URL proviennent uniquement du sitemap public ; aucune donnée visiteur ou privée n’est transmise. La réponse de soumission sera ajoutée après mise en production.

IndexNow partage les signalements entre moteurs participants (notamment Bing, Naver, Seznam, Yandex, Yep et Amazon selon sa documentation actuelle). Il ne remplace pas Google Search Console et n’est pas une soumission directe à ChatGPT ou Perplexity.

## Accès Bing
Le connecteur GSC Wizard nécessite un abonnement actif et n’est pas utilisable actuellement. Accès direct Bing ouvert ; connexion refusée par le contrôle automatique faute d’autorisation explicite pour le compte. Autorisation demandée pour [adresse du compte retirée]. Aucun accès Google supplémentaire accordé, aucun import de propriétés effectué, aucun compte créé.

Après connexion autorisée : vérifier/ajouter uniquement Benatna, soumettre le sitemap, examiner le rapport AI Performance (Bing/Copilot et partenaires documentés). Ne pas extrapoler ce rapport à tous les assistants IA. Toute extension de permissions OAuth doit être examinée avant validation.

## Limites et suites
Aucun score IA inventé et aucune garantie de classement/citation. Pas de mesure réelle de présence dans des réponses ChatGPT, Gemini ou Perplexity à ce stade. Prochain contrôle : indexation finale, consolidation www/non-www et domaines secondaires, puis données réelles de clics/citations/demandes. Les avertissements anciens de données structurées produits/avis restent à examiner séparément.

## Références officielles
- https://www.indexnow.org/documentation
- https://www.indexnow.org/faq
- https://developers.openai.com/api/docs/bots
- https://docs.perplexity.ai/docs/resources/perplexity-crawlers
- https://developers.google.com/search/docs/appearance/ai-features
- https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/

## Résultat de publication et de soumission
PR #19 fusionnée (5ca42c4d61dd67141c7e354c54fb576fc6b773f0) ; production dpl_HRiAXpbBZKdqb8JfmXGfZYgPxXr9 READY. Fichier de preuve public vérifié. Lot de 87 URL envoyé à IndexNow, HTTP 202 : réception et vérification de clé côté moteurs en attente, sans confirmation d’indexation finale. Voir indexnow-submission-2026-10-15.json.

## Résolution de l’accès Bing dans la session suivante
Le 15 octobre, autorisation utilisateur explicite reçue ; connexion réussie au compte Google demandé. Benatna déjà présent. Sitemap soumis, confirmation de réussite et état Processing. Rapport AI Performance historique accessible : référence enregistrée dans bing-ai-baseline-2026-10-15.json et bing-ai-pages-2026-10-15.json. L’ancienne mention d’autorisation en attente est donc dépassée. Le nouveau plan d’acquisition et ses décisions sont dans output/acquisition et la PR privée #20.
