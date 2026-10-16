# Relecture Benatna — 16 octobre 2026

## Résultats et couverture

Les corrections des PR21–27 sont déployées. R09 : SQL activé et nettoyage autorisé exécuté ; PR28 fusionnée : 599e52cb76b5841aa46fa9d29052010552854ce2. Production READY, HTML73/73, métadonnées8/8, routes privées3/3 et vraie404, scénarios UI15/15 avec API simulées ; accès réel administrateur au suivi vide constaté. Aucun DNS ni formule de prix modifié.

| Point | Résultat | PR |
|---|---|---|
| R01 Avis et notes non verifies | 87/87 HTTP200 sans aggregateRating ni faux compte detecte | 21 |
| R02 HTML brut des routes retirees et vrais 404 | fait | 22 |
| R03 Offres contradictoires dans sitemap | fait | 23 |
| R04 Decisions inventaire URL par URL | fait_decisions_87_URL | 23 |
| R05 Titres et durees pages centrales | fait | 24 |
| R06 Fusion PR20 et archives de reprise sans donnees personnelles | fait_avec_captures_actuelles_expurgees | 25 |
| R07 Supabase configuration et reconstruction schema | fait_versionne_reconstruction_locale_validee | 26 |
| R08 Mise a jour cache PWA | fait | 27 |
| R09 A01 A02 A03 mesure et suivi prive | fait | 28 |
| R10 Archivage documentation obsolete | 28 documents originaux archives intacts; README et CLAUDE actifs à jour | 25 |
| R11 Verifier coefficient weekend sans changer prix | Majoration 5% uniquement si duree <=3 et depart vendredi/samedi/dimanche; minimum de location 3 jours, donc exactement 3 jours valides. Intention commerciale non confirmee. | — |

## Preuves

Les fichiers JSON de `docs/acquisition/2026-10-16/evidence/` contiennent les résultats, dates et contrôles. Le journal `docs/acquisition/journal.jsonl` précise fichiers, vérification, résultat, limites et retour arrière. Les commits de fusion sont consignés dans `RELECTURE.json`.

R09 : 37 contrôles PostgreSQL locaux et 15 scénarios navigateur avec API simulées. Le contrôle SQL réel, après activation, vérifie les restrictions anonymes/non-admin, le parcours administrateur, la qualification et la déduplication RPC. Il annule toutes les fixtures. Après nettoyage : 438 événements, 155 sessions, zéro champ libre ciblé, zéro référent brut, zéro paramètre de chemin. Un événement est arrivé entre le premier relevé (437) et le nettoyage ; aucune ligne historique supprimée.

## Limites et travail suivant

- Les 87 URL ont une décision explicite ; 73 restent au sitemap. Cette décision ne constitue pas une relecture exhaustive de chaque phrase de tous les guides.
- Huit pages centrales ont été contrôlées et trois réécrites. Nettoyage complémentaire des recommandations vers pages suspendues préparé dans une PR distincte.
- Les pages de véhicules hors sitemap restent des coques applicatives noindex en HTML brut. Leur référencement détaillé reste à traiter.
- Google : le test direct voit une page accessible et indexable, avec la bonne canonique. L’indexation finale et la consolidation avec www ne sont pas prouvées.
- Les contrôles de dépendances/lint historiques comportaient des problèmes hors périmètre ; ce rapport ne certifie pas tout le dépôt exempt de défaut.
- La migration PWA a été testée avec un ancien worker installé localement ; aucune promesse de fraîcheur hors connexion.
- Le coefficient week-end actuel reste +5% pour une location valide de trois jours avec départ vendredi/samedi/dimanche. Intention commerciale à confirmer avant tout changement.
- WhatsApp handoff signifie ouverture vers WhatsApp, jamais message envoyé ni location confirmée. Les demandes et étapes métier sont saisies manuellement par le seul administrateur.
- Aucun message réel, paiement ni campagne publicitaire lancé. Aucun inventaire réel de véhicules n’a été fabriqué.
- Sources synchronisées intactes. Les captures historiques contenant des identités restent privées ; copies actuelles sans bandeau et empreintes documentées.

## Reprise

PR28 est vérifiée en production. Corriger les liens vers les pages suspendues dans une PR distincte. Poursuivre la relecture des guides conservés et les contrôles Search Console/Bing sans annoncer une indexation non constatée.

## Repères de code R09

- `src/utils/analyticsTracker.ts:74` : ouverture WhatsApp observée ; ligne 86 : identifiant de geste et événement handoff.
- `src/pages/PrivateLeads.tsx:62` : garde administrateur ; ligne 91 : enregistrement manuel d’un contact reçu.
- `supabase/migrations/20261016010000_private_measurement_and_leads.sql:14` : filtrage des propriétés ; lignes 133–136 : droits et politiques administrateur.
- `supabase/operations/20261016_sanitize_historical_analytics.sql:6` : expurgation des champs, sans suppression de lignes.
- `vite.config.ts:95` : aucune navigation de secours vers un ancien document en cache ; ligne 106 : NetworkOnly.

Accord explicite du propriétaire : « Activer et nettoyer ». Empreintes des trois scripts vérifiées avant exécution et contenu collé vérifié identique aux fichiers. SQL d’activation et nettoyage réussis ; test réel RLS/RPC terminé par ROLLBACK.
