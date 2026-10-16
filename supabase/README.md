# Schéma applicatif Benatna

Projet courant : `ojbdzmrpbhoibqvoejbj`. Aucune clé, aucun utilisateur Auth ni aucune donnée de visiteur n’est versionné ici.

`schema-reference/schema-snapshot.json` conserve les métadonnées lues en production le 16 octobre 2026 : quatre tables, colonnes et contraintes, index, deux politiques de lecture analytics, droits et fonctions. Les deux RPC de collecte sont `insert_analytics_event` et `touch_analytics_session`. `has_role` vérifie les droits via `user_roles` et l’enum `app_role` (`admin`, `user`). La fonction de trigger de date de mise à jour est aussi versionnée.

Les migrations historiques ne sont pas réécrites. La nouvelle migration préalable crée les prérequis de rôles qui manquaient ; la migration de réconciliation du 16 octobre reproduit les métadonnées actuelles et ferme les anciennes politiques permissives. Appliquer la chaîne entière dans un projet Supabase neuf et isolé avant de connecter le frontend. Ne pas exposer l’état intermédiaire des anciennes migrations. Sur une base existante, sauvegarder et examiner les écarts avant application : des dates anciennes NULL provoquent un rollback, aucune correction implicite de données n’est effectuée.

La fonction et le trigger d’événement `rls_auto_enable` sont gérés par Supabase, pas par ces migrations applicatives. Les tables de `auth`, extensions et rôles de plateforme sont fournis par Supabase. Leur simulation dans le test local ne remplace pas une restauration complète de la plateforme.

## Reconstruction locale contrôlée

Le test utilise PostgreSQL embarqué PGlite dans un répertoire temporaire, sans nouvelle dépendance de production :

```sh
npm install --prefix /tmp/benatna-schema-check --no-audit --no-fund @electric-sql/pglite
PGLITE_ROOT=/tmp/benatna-schema-check node scripts/test-schema-rebuild.mjs
```

Ce test de référence applique les cinq migrations historiques jusqu’au relevé initial du 16 octobre sur une base vide avec un schéma Auth de test, compare les colonnes/contraintes/index/droits au relevé, vérifie la RLS, les ACL des fonctions, la collecte anonyme et la lecture administrateur. Les identités de test sont synthétiques. Aucune connexion à la base de production n’est utilisée. Rapport dans `docs/acquisition/2026-10-16/evidence/schema-rebuild-test.json`.

## Administrateur lors d’une reconstruction

Les migrations ne recréent pas le compte personnel ni son mot de passe, et ne donnent aucun droit d’auto-attribution de rôle. Le propriétaire du nouveau projet crée ou restaure son utilisateur Auth puis lui attribue le rôle `admin` depuis une session SQL privilégiée, en vérifiant qu’il reste le seul administrateur. Ne jamais publier son UUID, son adresse de connexion ou des jetons. L’administrateur existant n’a pas été modifié par ce travail de versionnement.

L’accès aux tables `rental_requests` et `user_roles` reste fermé aux visiteurs dans ce relevé. La collecte analytics passe exclusivement par les deux RPC validées ; la consultation analytics est réservée aux administrateurs via RLS. Aucun rôle ni droit en production n’est changé par une fusion Git.

## Mesure et suivi privé — étape R09

La sixième migration, `20261016010000_private_measurement_and_leads.sql`, prépare le filtre des événements, la déduplication de `whatsapp_handoff` et le suivi manuel des contacts. Les quatre tables sont conservées. `rental_requests` ajoute la date de réception déclarée, le motif de perte et la fiabilité de l’attribution ; ses dates peuvent rester inconnues pour un contact reçu. Seuls les stades qualifiée/proposition/confirmée/réalisée imposent Casablanca ou Rabat et trois jours à six mois. Un contact hors durée ou hors zone ne devient pas une offre de location.

Le rôle `authenticated` reçoit SELECT/INSERT/UPDATE sur cette table, avec trois politiques RLS exigeant le rôle `admin`. Aucun droit visiteur, aucune suppression de contact et aucun rôle administrateur supplémentaire. Une confirmation du propriétaire est nécessaire avant l’exécution réelle depuis le dashboard. Une fusion Git ou Vercel n’exécute pas ce SQL.

Le test complet de la chaîne actuelle utilise des identités synthétiques et vérifie les droits, contraintes et RPC :

```sh
PGLITE_ROOT=/tmp/benatna-schema-check npm run test:measurement-schema
```

`operations/20261016_sanitize_historical_analytics.sql` est une opération facultative distincte : elle enlève définitivement les champs libres et paramètres d’URL historiques tout en conservant événements, dates et décomptes. Elle n’est pas exécutée automatiquement et exige un accord explicite. Le relevé agrégé initial contient 437 événements, dont 21 avec des champs libres d’URL et 3 avec un paramètre texte WhatsApp ; aucun contenu de message n’a été exporté.

Après activation, `operations/20261016_verify_private_measurement_rollback.sql` vérifie les vraies règles PostgreSQL avec des fixtures synthétiques. Tous les inserts de test sont annulés par ROLLBACK. Il utilise l’administrateur existant sans exposer son UUID et ne crée aucun compte Auth.

Retour arrière des nouveaux droits : `rollback/20261016010000_disable_private_leads.sql`. Ce script ferme immédiatement l’accès applicatif aux contacts sans supprimer leurs données. Il ne restaure pas les champs historiques expurgés et ne force pas les anciennes dates NOT NULL. Revenir à un ancien commit Git ne rétablit pas des valeurs définitivement retirées de la base.
