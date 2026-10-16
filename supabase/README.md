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

Il applique les cinq migrations sur une base vide avec un schéma Auth de test, compare les colonnes/contraintes/index/droits au relevé, vérifie la RLS, les ACL des fonctions, la collecte anonyme et la lecture administrateur. Les identités de test sont synthétiques. Aucune connexion à la base de production n’est utilisée. Rapport dans `docs/acquisition/2026-10-16/evidence/schema-rebuild-test.json`.

## Administrateur lors d’une reconstruction

Les migrations ne recréent pas le compte personnel ni son mot de passe, et ne donnent aucun droit d’auto-attribution de rôle. Le propriétaire du nouveau projet crée ou restaure son utilisateur Auth puis lui attribue le rôle `admin` depuis une session SQL privilégiée, en vérifiant qu’il reste le seul administrateur. Ne jamais publier son UUID, son adresse de connexion ou des jetons. L’administrateur existant n’a pas été modifié par ce travail de versionnement.

L’accès aux tables `rental_requests` et `user_roles` reste fermé aux visiteurs dans ce relevé. La collecte analytics passe exclusivement par les deux RPC validées ; la consultation analytics est réservée aux administrateurs via RLS. Aucun rôle ni droit en production n’est changé par une fusion Git.
