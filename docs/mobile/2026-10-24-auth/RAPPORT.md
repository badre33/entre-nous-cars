# Connexion et inscription mobiles — 24 octobre 2026

## Défauts et corrections

`Auth.tsx` annonçait un accès immédiat au tableau de bord après toute réponse réussie d’inscription, même lorsque Supabase retournait un utilisateur sans session. Dans le SDK auth installé (2.76.1), `signUp` retourne une session lorsque l’auto-confirmation est activée, sinon un utilisateur à confirmer. La page affiche désormais la confirmation par email sans redirection dans ce second cas. L’accès administrateur dépend toujours du rôle existant ; aucune permission ni configuration Supabase n’est changée.

Onglet actif vert/texte blanc, onglet inactif beige/texte noir, palette conservée en thème sombre. Transition de couleur retirée sur ces deux commandes pour éviter le contraste transitoire insuffisant relevé pendant le test. Onglets, champs, soumission et affichage du mot de passe mesurent au minimum 44 px ; les boutons d’affichage sont nommés et exposent leur état.

`strongPassword.ts` propose 20 caractères à partir d’un alphabet de 64 caractères avec `crypto.getRandomValues`, en exigeant majuscule, minuscule, chiffre et symbole. Les deux champs sont remplis sans changement de focus. Aucun stockage applicatif ni journalisation ajouté pour ce secret. Le gestionnaire de mots de passe reste proposé via les attributs autocomplete et le texte d’aide. Le minimum existant de 12 caractères est conservé.

Erreurs persistantes en français : identifiants invalides, email non confirmé, mot de passe refusé et limite de tentatives. Le message reçoit le focus et est centré immédiatement ; le défilement animé global ne le laisse plus temporairement hors écran. La confirmation par email reste visible dans la page. Les onglets sont bloqués pendant la requête en cours.

## Validation

`test-mobile-auth.mjs` passe à 320 × 568, 390 × 400, 390 × 844 et 1280 × 900. Contraste des onglets actif/inactif ≥4,5 dans les thèmes clair et sombre ; commandes 44 px ; visibilité des erreurs ; mot de passe généré 20 caractères avec quatre groupes et confirmation identique ; aucune requête d’inscription avant validation ; secret absent des stockages applicatifs du contexte de test ; attributs autocomplete/minimum 12 présents. Réponse d’inscription sans session : message de confirmation visible, maintien sur /auth. Refus de mot de passe et limitation de tentatives simulés et traduits.

Les 15 contrôles existants de mesure/accès privés passent aussi. TypeScript, ESLint ciblé et build réussis. Les réponses d’authentification sont simulées avec les en-têtes attendus par le SDK. Aucun compte réel créé, aucun email ni message WhatsApp envoyé, aucune connexion réelle effectuée, aucune donnée administrateur réelle lue. La réception des emails et l’enregistrement effectif par un gestionnaire de mots de passe ne sont pas validés par ces tests. Chrome avec formats simulés, sans appareil Safari/iPhone physique.

Prérendu, liens et publication suivis dans SUIVI-BENATNA.md avant clôture. Aucun changement aux rôles, politiques de données, identifiants du compte administrateur ou mécanisme de session.
