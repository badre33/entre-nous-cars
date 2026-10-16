# Mesure et suivi privé : implantation du 16 octobre

État : activation SQL et nettoyage historique exécutés après accord explicite du propriétaire. Contrôle réel RLS/RPC réussi, toutes les fixtures annulées. Préversion frontend vérifiée ; fusion et contrôle production à suivre dans RELECTURE.json.

Le circuit de mesure est Supabase. Les chargements automatiques GTM, GA4, Meta Pixel et Vercel Analytics/Speed Insights ont été retirés du code préparé pour éviter les circuits concurrents et les URL non contrôlées. Aucune campagne ni nouvelle balise publicitaire n’est activée. Une future réactivation marketing demande une vérification de ses événements, des données transmises et de son autorisation.

- `whatsapp_widget_open` : affichage du panneau ; aucun contact reçu.
- `whatsapp_handoff` : geste de sortie vers WhatsApp ; identifiant unique partagé entre observateurs d’un même geste, puis idempotence côté RPC. Ce n’est ni un message envoyé ni une réservation.
- `vehicle_view` et `vehicle_compare` : consultation/sélection de modèles classiques ; aucun faux panier ou paiement.
- Les étapes métier sont enregistrées manuellement dans la table privée ; la RPC publique refuse `lead_received`, `lead_qualified`, `rental_confirmed` et les autres affirmations métier.

Les anciens `whatsapp_click` restent identifiés comme anciens clics non dédupliqués, séparés de la nouvelle mesure. Aucun recalcul historique prétend identifier avec certitude des messages envoyés. Les visites des routes privées et les événements marqués `is_test` sont exclus des statistiques de consultation.

## Attribution contrôlée

Registre initial dans `src/data/acquisitionCampaigns.ts` : trois campagnes de travail C01/C02/C03, aucun lancement. Seuls les codes source/medium/campagne/contenu autorisés sont conservés. Les autres paramètres, messages, téléphones, emails et URL libres sont exclus des événements. Les chemins sont limités à un vocabulaire de routes connues, sans query ni fragment ; le référent brut et le user-agent brut ne sont plus envoyés par la nouvelle collecte.

La première et la dernière campagne UTM valides sont conservées dans une fenêtre de trente jours. Une visite directe ne les efface pas. Un point expiré est remplacé ou supprimé à la lecture suivante. Il s’agit d’une attribution de campagnes connues, pas d’une mesure exhaustive de toutes les interactions ni de tous les assistants IA. En l’absence de campagne connue, la source est classée à partir du référent disponible ; celui-ci peut manquer.

Le code court est ajouté au message WhatsApp préparé. Le prospect peut modifier ou ne pas envoyer ce message. L’opérateur choisit ensuite « code reçu », « déclarée » ou « inconnue » ; la présence d’un UTM dans le navigateur n’est pas une preuve de contact reçu.

## Suivi des contacts

`/demandes` est réservé à l’administrateur. Saisie d’un contact réellement reçu, puis suivi : reçue, contactée, qualifiée, proposition envoyée, réservation confirmée, location réalisée, perdue ou indésirable. Le statut ancien `won` est conservé pour compatibilité et signalé comme ancien, sans interprétation automatique.

Un contact sans dates ou hors zone peut être conservé comme non qualifié/perdu. Les stades qualifiée et suivants exigent Casablanca/Rabat et trois jours à six mois. Cela ne modifie pas l’offre publique ni la formule de prix. Une perte exige un motif ; une attribution « code reçu » exige une campagne connue. Les coordonnées et notes restent dans la table privée et ne sont pas envoyées aux analytics.

Ce suivi est manuel. Il ne prouve pas automatiquement la réception dans WhatsApp, le délai de réponse, la signature d’un contrat ou la réalisation d’une location. Les états sont déclarés par l’administrateur. Aucun paiement en ligne ni coût publicitaire inconnu n’est calculé.

## Validation et activation

Les tests PostgreSQL appliquent les six migrations sur une base vide, contrôlent anonymes/non-admin/admin, limites de qualification, filtrage et idempotence. Ils vérifient aussi le nettoyage historique et le script de contrôle intégralement annulé. Les quinze contrôles navigateur utilisent des API simulées et des contacts synthétiques ; aucun message réel n’est envoyé. Ces deux niveaux ne sont pas présentés comme une activation de production.

L’activation réelle exige les scripts versionnés dans supabase/, une prévisualisation contrôlée et des vérifications de production. Le nettoyage des anciens champs libres est distinct et irréversible ; lignes, dates et décomptes restent conservés. Voir les preuves et la limite dans le suivi courant.
