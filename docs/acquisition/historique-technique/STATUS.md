> Journal historique expurgé : les étapes décrivent l’état à leur date, pas l’état actuel. Voir `../2026-10-16/RELECTURE.json` et le journal courant. Identités personnelles retirées ; aucun mot de passe ni jeton inclus.

# Nouveau projet Benatna

Projet : ojbdzmrpbhoibqvoejbj. Organisation : cocndmukcddavtbvimou. Région : eu-west-1 (Irlande).

bootstrap-private.sql exécuté dans le SQL Editor du projet le 11 octobre 2026. Quatre tables créées : analytics_events, analytics_sessions, rental_requests et user_roles. RLS activée partout. Aucune attribution de rôle admin ni aucun utilisateur créé. Droits anon/authenticated révoqués sur les tables et les fonctions applicatives.

Tests transactionnels réussis : RLS, absence de grants publics, insert_analytics_event, mise à jour de session, rejet de propriétés JSON non objet, refus des locations de deux jours, acceptation de six mois avec fin février et refus du dépassement. ROLLBACK des données d’essai confirmé.

Étape suivante : enable-api.sql, après confirmation de l’ouverture des deux RPC de collecte aux visiteurs et de la lecture des analytics aux administrateurs. Aucun accès direct en écriture aux tables ; aucune modification des droits rental_requests ou user_roles prévue dans ce fichier.

Site Vercel toujours connecté à l’ancienne base. Aucun secret copié, aucun changement de variables Vercel. Anciennes données non transférées.

## Droits analytics activés

Après confirmation explicite de l’utilisateur, enable-api.sql exécuté avec succès dans le SQL Editor. Tests avec SET LOCAL ROLE anon : exécution des deux RPC réussie, aucun accès SELECT ou INSERT direct aux tables. Tests avec le rôle authenticated sans utilisateur admin : aucune ligne accessible dans les tables analytics. Les données d’essai ont été annulées par ROLLBACK.

La nouvelle base compte zéro utilisateur applicatif ; aucun administrateur applicatif n’est encore attribué. Le propriétaire du dashboard Supabase n’est pas automatiquement un utilisateur de auth.users. Les variables Vercel restent inchangées.

## Administrateur attribué — 12 octobre 2026

Après confirmation explicite, le compte [adresse du compte retirée] ([identifiant utilisateur retiré]), créé et confirmé par l’utilisateur, a reçu le rôle admin dans public.user_roles. La requête de contrôle retourne exactement une ligne administrateur : cette adresse. Aucun autre administrateur présent.

Prochaine étape : tester le frontend contre le nouveau projet puis basculer les variables Vercel. Le site reste connecté à l’ancien projet à ce stade.

## Vérification avant bascule

API réelle : lectures anonymes refusées (401) sur les quatre tables ; insert_analytics_event répond 200, touch_analytics_session répond 204 avec payloads fictifs. Une session de vérification et un événement de test sont conservés dans la nouvelle base.

Build local avec .env.new-project.local (ignoré par Git) réussi ; TypeScript et les 19 tests métier/caches passent. Trois variables Vercel dédiées à la branche codex/benatna-maintenance sont configurées avec l’URL et la clé publique du nouveau projet. Les variables partagées production/preview restent inchangées.

Déploiement de prévisualisation explicite target staging : dpl_GBxf9Nn2GcYQkaq66KJuxjHxuZo8. Production actuelle intacte : dpl_53C6xhVGpzxsWLr6Jbot19oXrrZZ.

Tests Chrome local : accueil, /louer et /auth chargent ; neuf requêtes vers ojbdzmrpbhoibqvoejbj, aucune vers l’ancienne base, aucune erreur JavaScript.
Tests SQL RLS avec le rôle authenticated et l’identité du seul administrateur : lecture des événements réussie ; sans cette identité, aucune ligne visible. Transaction annulée, aucune modification persistante.

Prévisualisation vérifiée : dpl_GBxf9Nn2GcYQkaq66KJuxjHxuZo8 READY, 112/112 pages prérendues. /auth et le bundle JavaScript répondent 200 via l’accès authentifié Vercel. Le bundle contient l’URL et la clé publique du nouveau projet, et ne contient pas l’identifiant de l’ancienne base. La seconde tentative dpl_HzpDjakg1shj3tuWpGQHvi7cP6Y6 a été annulée.

Bascule en production non effectuée : une première demande sans cible explicite a été rejetée par le contrôle automatique, qui considérait l’autorisation limitée aux tests. Prévisualisation explicitement staging ensuite autorisée. Attente d’autorisation explicite pour remplacer les trois variables Supabase de production et reconstruire main. Aucune authentification par mot de passe de l’administrateur effectuée ; les tests portent sur les droits RLS, l’API et le chargement frontend.

## Bascule autorisée — 13 octobre 2026

Après confirmation explicite, les trois variables partagées production/preview VITE_SUPABASE_PROJECT_ID, VITE_SUPABASE_URL et VITE_SUPABASE_PUBLISHABLE_KEY sont mises à jour vers ojbdzmrpbhoibqvoejbj. Leur type Sensitive existant est conservé. Aucun changement des variables Sentry.

Déploiement production dpl_9vPwD71wcmnZxfiSgwuNopmJxEPc lancé depuis main au commit f6c3b99c8ba783d6fcbe63a1e3b2c39a031b144d. Version précédente conservée pour retour : dpl_53C6xhVGpzxsWLr6Jbot19oXrrZZ.

Production READY : dpl_9vPwD71wcmnZxfiSgwuNopmJxEPc, aliases benatna.ma et www.benatna.ma confirmés. Build complet avec 112/112 pages prérendues. Vérification navigateur de production en cours.

Contrôles de production réussis : bundle utilisant exclusivement le nouveau projet, aucune requête vers l’ancienne base, aucune erreur JavaScript, événements acceptés en HTTP 200 et sessions en HTTP 204. /analytics sans authentification redirige vers /auth. Résultats complets dans production-checks.json.

La connexion par mot de passe de l’administrateur reste à effectuer par l’utilisateur sur https://benatna.ma/auth ; son mot de passe n’a été ni lu ni testé par l’agent. Les droits RLS de son compte ont été validés dans la base. Aucune donnée historique n’a été transférée. Les fonctions serveur optionnelles et le stockage OG ne sont pas déployés dans ce nouveau projet ; aucun appel depuis les parcours frontend actifs observés.

## Lisibilité de l’authentification

PR #12 fusionnée : commit 98cbb3f2cfe0269bed3100a53a9f17df23d164bf. Déploiement production dpl_BttNkbmVCdt81dZYQEGz5vcTMnfd READY. Couleurs vérifiées dans Chrome sur benatna.ma/auth : blanc sur fond vert et noir sur fond beige dans les deux états des onglets, fonds d’origine conservés. Inscription : indication de 12 caractères minimum, aide pour une phrase de passe ou un gestionnaire, autocomplete=new-password. Aucun compte ni mot de passe créé par les tests ; la politique serveur Supabase reste inchangée.

Connexion administrateur réelle confirmée : après connexion effectuée par l’utilisateur, le navigateur affiche /analytics avec « Connexion réussie », les indicateurs renseignés (23 pages vues et 11 identifiants visiteurs dans la période sélectionnée) et le graphique. Aucun message d’erreur d’accès visible. Ces statistiques incluent les vérifications de mise en place et ne constituent pas un décompte certifié de visiteurs réels.

## Suite : fiabilité des analytics et pied de page

PR #13, branche codex/analytics-reliability, commit cfeffc1. Les périodes incluent exactement le nombre de jours demandé, les graphiques sont chronologiques et les requêtes paginent au-delà de 1 000 lignes avec des critères de tri stables. Les erreurs interrompent le chargement et empêchent l’affichage de statistiques/export partiels. La notification d’actualisation attend les réponses. Les quatre liens vers les routes hors cible sont retirés du pied de page.

Tests métier et build/TypeScript passent. Simulation Chrome isolée : 1 205 événements affichés puis panne HTTP 500, affichage d’une erreur explicite et disparition des exports. Aucune requête réelle vers Supabase dans cette simulation. Aucune donnée ni permission serveur modifiée.

## Correction analytics publiée — 13 octobre 2026

PR #13 fusionnée : https://github.com/badre33/entre-nous-cars/pull/13 ; commit main fe1636cce61efb775443b25b4096781d9c5cc543. Déploiement production dpl_9AAzdpaa53pCTZz6X3Cc8d5DYiSA READY, domaines benatna.ma/www.benatna.ma.

Corrections : périodes calendaires exactes (Aujourd’hui exclut hier), graphique chronologique avec clé incluant année, pagination événements et sessions par 1000, erreurs de lecture affichées sans KPIs/exports partiels, actualisation attendue avant notification de réussite. Retrait des quatre liens hors cible restants du Footer.

Validation : tests maintenance, TypeScript et build réussis ; test navigateur isolé avec 1205 événements synthétiques et erreur API simulée réussi sans requête réelle Supabase. Production vérifiée dans la session administrateur : graphique 12/10 puis 13/10 ; filtre Aujourd’hui affiche uniquement 13/10 ; quatre liens retirés absents. Un rechargement forcé du navigateur était nécessaire pour abandonner son ancien bundle en cache. Vue 7 jours rétablie. Capture analytics-updated.png.

Limites : statistiques incluent les essais ; aucune suppression de données. Les 12 vulnérabilités de dépendances et les erreurs lint préexistantes restent à traiter. Ce déploiement ne constitue pas leur résolution.

## Dépendances corrigées — 14 octobre 2026

PR #14 fusionnée, commit main 61d858c42d0afcc2506c6c4edd48aeb52e48165e. Vercel production dpl_8sBGngGWRoZFEr9CuqkvjkCdZRCz READY et domaines assignés. React Router DOM 7.18.4, Vite 7.3.7, SWC 4.3.3, parseur CSS 7.1.6. Audit npm 12 → 5 entrées hautes, toutes chaîne braces/Tailwind 3 ; aucun correctif braces publié à cette date. Détails dans DEPENDENCY-SECURITY.md.

Maintenance, TypeScript app/config, build/PWA, routes et analytics simulés validés localement. Nouveau bundle production index-r7dgKgoA.js vérifié ; session administrateur connectée conservée, statistiques/graphique chargés. Capture analytics-security-updated.png. Test initial production attendait load complet puis 700 ms et a échoué sur chargement lent ; attente corrigée pour DOMContentLoaded et contenu disponible. Aucun changement de données, droits ou comptes.

Validation production finale PR #14 : sept routes, inscription, navigation interne et protection analytics passent. Les délais initiaux étaient insuffisants pour /louer ; réponse HTTP 200, HTML 2,44 Mo préexistant. Test isolé avec service workers bloqués et délai adapté réussi. Prérendu Vercel confirmé 112/112 pages. Aucun retour arrière nécessaire.

## Catalogue allégé — 14 octobre 2026

PR #15 fusionnée : commit 9e25668bd132b1cf9d4d51128b4d4d32f75f37b7. Production dpl_Gu2ikNQv6qVMfMsr7YazEoV1H3di READY. /louer passe d'environ 2,44 Mo à 218 283 octets de HTML (~91 % de réduction), sans retirer de véhicule du catalogue. Un lot de 24 et bouton pour charger les suivants ; une seule vue montée selon viewport. Filtres sur le catalogue complet, réinitialisation du lot à chaque filtre, message explicite quand aucun résultat. Tests mobile/desktop, comparaison et trois vues mobiles réussis en production. Build, TypeScript app/config et maintenance passent. Prérendu 112/112 pages.

Détails/limites dans CATALOGUE-PERFORMANCE.md ; cinq alertes transitoires braces et dette lint restent non résolues. Aucun accès ni donnée Supabase modifiés.

## Recentrage Casablanca — 15 octobre 2026

Demande explicite utilisateur : Casablanca uniquement ; Rabat possible comme livraison depuis les mêmes loueurs, sous réserve de confirmation. PR #16 fusionnée (2e0fde4d3c5c300f6dcf7bdfc6003dd0eb93a006), production dpl_6wUCc88s1DUTfLkSGztTMxexN5fx READY, 86/86 pages prérendues. Accueil, formulaires, catalogue, navigation, services, SEO principal et manifeste PWA alignés. Suppression de la duplication artificielle de 50 modèles dans six villes : 50 modèles Casablanca, disponibilité à confirmer. Les demandes Rabat précisent faisabilité/frais ; aucune autre ville de prise en charge. Anciennes pages hors zone conservées avec notice/noindex, retirées du sitemap, sans redirection trompeuse. Tests locaux et de zone en production réussis, aucune transmission WhatsApp pendant les tests. Aucun compte/droit/donnée Supabase modifié.

Détails, capture et limites dans CASABLANCA-FOCUS.md. L'inventaire réel de chaque modèle reste à confirmer auprès des loueurs ; la correction de couverture ne vaut pas validation des stocks, avis ou chiffres historiques.

## Stratégie arrivées et recherche IA — 15 octobre 2026

Nouvelle priorité utilisateur : Casablanca, Rabat conditionnel, Marrakech dans une phase ultérieure avec partenaire adapté ; pas de suivi de paiement en ligne inexistant. Plan opérationnel dans strategy-casablanca.json : demandes qualifiées, délais, confirmations/refus et locations réalisées, validation des points de rendez-vous et stocks avec les loueurs.

PR #17 : https://github.com/badre33/entre-nous-cars/pull/17. Guide /prise-en-charge-casablanca-rabat : huit points de référence (Mohammed V, Casa-Voyageurs, Casa-Port, Oasis, Aïn Sebaâ, Rabat-Salé, Rabat-Agdal, Rabat-Ville), autres gares sur demande à confirmer, sans inventaire exhaustif ni guichets Benatna fictifs. Point sélectionné repris dans les demandes. FAQ partagée, visible et JSON-LD : trois jours minimum, six mois maximum, aucun paiement en ligne, demande non équivalente à réservation confirmée, offres touristiques uniquement.

Retrait des anciens fichiers commerciaux vans/mariages/utilitaires/événements et de la fiche Staria ; service data actif recentré, anciennes URL en notice noindex plutôt que redirection non pertinente. Retrait de l'accueil et des schémas globaux des notes/compteurs d'avis non vérifiés, suite à l'indication de quelques locations réellement effectuées. Pas de revendication d'audit exhaustif de toutes les données historiques du site.

Recherche IA : conforme à l'approche officielle Google (https://developers.google.com/search/docs/appearance/ai-features) : texte utile, prérendu, indexabilité et schémas correspondant aux réponses visibles. Robots publics déjà autorisés ; aucune politique d'entraînement modifiée. Documentation OpenAI : https://developers.openai.com/api/docs/bots ; OAI-SearchBot concerne la recherche, distinct de GPTBot. Aucune mesure comparative de citations ChatGPT/Gemini/Perplexity effectuée et aucune garantie de citation.

Tests : TypeScript app/config, compilation PWA, ESLint ciblé, maintenance, catalogue mobile/desktop, zone géographique et nouveau test d'arrivées. Demandes capturées uniquement dans le navigateur isolé ; aucun message WhatsApp transmis, paiement ou accès créé. Validations de stock réel et des frais/horaires de rendez-vous à effectuer avec les loueurs ; non inventées dans le site.

PR #17 : dernière prévisualisation dpl_54Mo5NaaAEmnaBKZhenhmt3TJfa9 validée. Vérification finale du code : TypeScript app/config, ESLint ciblé et test d'arrivées réussis après retrait des avis non vérifiés. Les réponses FAQ et le JSON-LD proviennent des mêmes faits partagés. Une demande de deux jours est refusée avant ouverture de WhatsApp. Les pages de van/mariage et la fiche Staria renvoient une notice d'offre exclue en noindex.

PR #17 publiée : commit main 96fdc7de96fbdfd6b2815ce1772af3397c78000f, déploiement production dpl_CJYJVNbKwuHR7e4KbsjuEjboTyzu READY, domaines publics assignés. Vercel confirme 87/87 pages prérendues. Test d'arrivées en production réussi : huit liens, FAQ JSON-LD correspondant au texte, point d'arrivée et frais Rabat dans une demande capturée, location de deux jours refusée, offres vans/mariages/Staria exclues avec noindex, absence des anciens compteurs d'avis sur l'accueil. Aucune transmission WhatsApp ni paiement.

Contrôle du HTML public avec user-agent OAI-SearchBot : titre/contenu guide, FAQPage et minimum trois jours sont présents dans le HTML reçu sans exécuter JavaScript. Cela confirme l'accessibilité technique depuis notre environnement, pas une exploration effective par OpenAI ni une citation dans ses réponses. Capture casablanca-arrivals-production.png. Guide : https://benatna.ma/prise-en-charge-casablanca-rabat.

Prochain travail opérationnel : faire valider par les loueurs les points de rendez-vous, plages horaires, frais de livraison/restitution et modèles réellement proposés. Aucune disponibilité garantie ou guichet en gare/aéroport inventé. Marrakech reste hors offre actuelle, et Tanger hors périmètre.

## Correction livraison gratuite et catalogue classique — consigne utilisateur

Les anciennes mentions de frais/horaires/rendez-vous à confirmer ne décrivent plus la consigne commerciale : livraison gratuite aux gares et aéroports desservis, tout convenu à l'avance avec le loueur ; Casablanca prioritaire et Rabat sur demande. Le catalogue est indicatif, sans attendre un inventaire réel. Prix journaliers et moteur de calcul existants conservés. Luxe exclu des cartes, des schémas produits/organisation et des pages de détail actives ; profils classiques conservés.

PR #18 https://github.com/badre33/entre-nous-cars/pull/18 : textes du guide, FAQ partagée et JSON-LD, demandes WhatsApp, homepage, footer, métadonnées, traductions, page Casablanca et PWA alignés sur livraison gratuite. Tests arrivées/zone mis à jour ; pagination mobile/desktop adaptée à la taille réelle du catalogue réduit. TypeScript app/config, build/PWA et ESLint ciblé réussis. strategy-casablanca.json mis à jour pour ne pas réintroduire validation de stock et frais comme prérequis de développement. Aucun supplément inventé ni paiement en ligne.

PR #18 : prévisualisation finale dpl_8BWeL3yEzNKaHF31eXYQm69J5NaV validée. Modèles de luxe exclus via une politique partagée (marques haut de gamme, Touareg et catégories/badges premium), sans plafond arbitraire de prix ; prix journaliers et moteur saisonnier conservés. Les anciennes fiches luxe affichent la notice d'offre actuelle avec noindex, et leurs URL ne sont plus promues par le sitemap. Aucune validation de stock réel exigée pour maintenir le catalogue indicatif.

## Validation publique — livraison gratuite et catalogue classique (15 octobre 2026)
PR #18 fusionnée : 4fbdeca9d62e1b2475306d9f4487cccf71ea9654. Déploiement production dpl_9ZsEgVNio7FAnLzwb2836YAJMFcV READY, alias benatna.ma confirmé.
Tests sur https://benatna.ma : guide des 8 points et FAQ/JSON-LD, livraison gratuite dans demande WhatsApp simulée, minimum trois jours et offres exclues validés ; catalogue complet de 24 modèles vérifié en 1280 et 390 px, filtres et vues validés ; Casablanca/Rabat et anciennes villes non proposées validés. Aucun message envoyé. Le test catalogue a été ajusté localement pour ne pas exiger un bouton de pagination lorsque le total est 24.

## Search Console — 15 octobre 2026
Accès direct navigateur à la propriété https://benatna.ma/ disponible, contrairement au connecteur précédent. Sitemap /sitemap.xml soumis à nouveau : confirmation « Sitemap envoyé », tableau dernière lecture et soumission au 15 octobre 2026, « Opération effectuée », 87 pages découvertes.
Demandes individuelles confirmées par modale « Indexation demandée » pour /prise-en-charge-casablanca-rabat et /location-voiture-casablanca ; captures gsc-guide-indexation.png et gsc-casablanca-indexation.png. Cela confirme la mise en file, pas une indexation finale du nouveau contenu.
Accueil : dernier relevé Google du 10 octobre indique doublon sans canonique déclarée, canonique choisie www.benatna.ma. HTML public actuel contrôlé : canonical https://benatna.ma/. Demande accueil non confirmée.
Catalogue /louer déjà indexé selon inspection. Demande de réexploration non confirmée : navigateur ne répond plus, délai dépassé puis réinitialisation de session. FAQ pas encore soumise individuellement. Toutes ces URL incluses dans sitemap accepté.
À poursuivre : demandes individuelles accueil/catalogue/FAQ ; contrôle de consolidation www/non-www et anciens domaines ; examiner avertissements fiches de marchand et avis signalés par GSC sur ancien relevé Casablanca. Aucun changement de droits, suppression ou CAPTCHA effectué.

## Recherche multi-moteurs / IA — suite du 15 octobre 2026
PR #19 fusionnée : 5ca42c4d61dd67141c7e354c54fb576fc6b773f0. Déploiement production dpl_HRiAXpbBZKdqb8JfmXGfZYgPxXr9 READY, alias benatna.ma.
IndexNow : preuve publique vérifiée par la commande puis lot de 87 URL publiques envoyé ; réponse HTTP 202 (réception, validation de clé côté moteurs en attente), voir indexnow-submission-2026-10-15.json. Pas de confirmation d’indexation finale. Commande manuelle, aucun cron ajouté.
Google : demandes accueil, catalogue et FAQ désormais toutes confirmées, en plus de Casablanca et guide déjà confirmés. Captures gsc-home-indexation.png, gsc-catalogue-indexation.png, gsc-faq-indexation.png. Accueil accepté après erreur temporaire.
Bots : 9 contrôles HTTP publics passés (Bingbot/OAI-SearchBot/PerplexityBot x accueil/Casablanca/guide) ; HTML lisible, canonique correcte, robots permis. Pas une preuve de passage des vrais robots ou de citation. Rapport ai-search-access-check.json et SEARCH-DISCOVERY-2026-10-15.md.
Bing Webmaster Tools : connexion Sign In bloquée par contrôle automatique pour absence d’autorisation explicite du compte ; question asynchrone posée pour [adresse du compte retirée], réponse toujours attendue. Aucun contournement, OAuth, compte créé ou abonnement souscrit. GSC Wizard payant indisponible. L’onglet Bing est conservé pour reprise. IndexNow est une notification publique indépendante de cet accès de tableau de bord.


## Architecture d’acquisition et trace — 15 octobre 2026
Dossier output/acquisition créé : architecture pages et parcours de demandes, 17 sources datées, observations directes Meta (20 résultats affichés, 6 annonces consignées) et Google Trends France 12 mois, plan 90 jours, inventaire 87 URL, 17 tâches et gabarits de mesure. Point de reprise racine SUIVI-BENATNA.md. Copie privée versionnée PR #20 (brouillon), commit 0193587. JSON/JSONL/CSV et liens locaux validés. Aucun changement de code applicatif, campagne, dépense ou suivi tiers dans cette intervention.
Bing : autorisation explicite reçue pour le compte Google demandé ; connexion réussie, Benatna déjà présent. Sitemap soumis avec confirmation, Processing ; 112 URL encore affichées depuis ancienne lecture du 11 octobre, non confondues avec les 87 URL actuelles. Relevé AI Performance 15 juillet–14 octobre : 1.9K citations arrondies, moyenne 2 pages citées, tableau 18 pages ; guides carburant et péages dominants. Données historiques Microsoft/partenaires, pas des leads ni un effet des corrections récentes. Captures et JSON conservés.
Premières tâches documentées : distinguer sortie WhatsApp et message reçu, reproduire/dédupliquer le suivi, attribution UTM contrôlée et retrait du texte libre des URL analytics. Constats par lecture du code, pas encore corrigés.
