# Démarrage mobile — 24 octobre 2026

## Résultat mesurable

| Mesure | Avant | Après |
|---|---:|---:|
| Fichier JavaScript principal, brut | 787 588 octets | 633 885 octets (-19,5 %) |
| Même fichier, gzip calculé | 246 132 octets | 206 647 octets (-16,0 %) |
| Modules Supabase dans ce fichier | 73 | 0 |
| JavaScript chargé avant le formulaire prêt, décodé | 815 244 octets | 661 641 octets (-18,8 %) |
| Préchargement PWA, nombre de fichiers | 161 | 9 |
| Préchargement PWA, taille brute générée | 2 452,55 Kio | 738,58 Kio (-69,9 %) |

Le SDK complet reste utilisé pour l’authentification et les pages privées, chargées à la demande. Les analytics visiteurs appellent les mêmes deux RPC existantes par HTTP, avec les mêmes paramètres filtrés. Aucune migration, permission ou règle RLS changée. Le transport reste anonyme : pas de session administrateur lue pour mesurer un visiteur.

Le service worker précharge le point d’entrée JavaScript, les styles et les polices. Les modules des pages effectivement visitées conservent leur cache d’exécution NetworkFirst ; les pages administrateur et les pages non visitées ne sont plus téléchargées par cette liste de préchargement. La navigation des documents reste NetworkOnly, comme auparavant : aucune nouvelle promesse de site entièrement utilisable hors connexion.

## Temps mesurés : gain non établi

Chrome, 390×844, densité 2, ralentissement CPU ×4, réseau simulé 200 000 octets/s et 150 ms de latence ; cache froid et service worker bloqué pour isoler le démarrage. HTML prérendu, build local en mode new-project pour les deux versions. Services tiers bloqués.

Trois essais avant : formulaire prêt en médiane 2,387 s, LCP de laboratoire 1,060 s. Deux séries de trois essais après : formulaire prêt 2,697 s puis 2,304 s ; LCP 1,460 s puis 1,324 s. La médiane combinée des six essais après est d’environ 2,391 s pour le formulaire et 1,382 s pour le LCP. **La baisse du poids est établie ; aucune accélération chronométrée n’est démontrée. Le LCP observé est moins bon dans ces essais, sans preuve que la différence vient du changement.** Les observations sont conservées, sans sélectionner seulement la meilleure série.

Ces mesures ne sont ni des Core Web Vitals de visiteurs réels ni un score Lighthouse. Le temps bloquant collecté par PerformanceObserver n’est pas le TBT officiel de Lighthouse. L’ouverture du formulaire est contrôlée après la mesure de démarrage.

## Vérifications

- Test unitaire du transport : deux RPC, clés publiques modernes et JWT anon hérités, requêtes keepalive, absence de cookies, erreurs HTTP et configuration invalide ; aucun réseau réel dans ce test.
- Deux appels réels volontairement invalides : HTTP 400 / code PostgreSQL 22023 sur les deux RPC ; validation atteinte et rejet avant écriture. Aucun événement synthétique valide ajouté à la base.
- 15 contrôles navigateur de mesure, confidentialité et accès privés réussis avec réponses Supabase et utilisateurs simulés.
- Test PWA : neuf ressources en préchargement ; aucune page administrateur, SDK client ou catalogue préchargé ; module du catalogue stocké dans le cache d’exécution après visite. Lecture du contenu en cache et requête fetch du module déjà visité vérifiées avec le navigateur hors ligne ; pas une validation de navigation hors ligne complète. Le test a révélé une différence Vary: Origin entre une requête module et fetch : recherche du cache rendue indépendante de Vary uniquement pour les fichiers JavaScript publics avec nom haché. Aucune API privée concernée.
- TypeScript, lint ciblé, build et prérendu de 84 pages / politique de 169 routes validés.

Scripts : measure-mobile-startup.mjs, build-bundle-report.mjs, test-public-analytics-rpc.mjs, test-startup-pwa.mjs, test-measurement-browser.mjs. Les réponses privées sont simulées ; aucun message WhatsApp réel envoyé.

Transport HTTP conforme à la [documentation Data API Supabase](https://supabase.com/docs/guides/api/creating-routes) et aux [en-têtes des clés API](https://supabase.com/docs/guides/getting-started/api-keys). Les clés publiables restent dans apikey ; Authorization est conservé uniquement pour les anciennes clés anon au format JWT.

Les 20 contrôles du parcours de demande et les cinq pages d’entrée à 320/390/1280 px ont également été rejoués avec succès.
