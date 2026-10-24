# Demande mobile : erreurs et récapitulatif — 24 octobre 2026

## Problèmes reproduits

Sur 320 × 568 px, après saisie d’une période de deux jours, le message d’erreur se trouvait hors de la zone visible (haut à -261 px), sans focus. Une adresse synthétique contenant un long segment sans espace élargissait le récapitulatif : 1340 px de contenu pour 318 px de panneau. Captures avant jointes.

## Correction

`src/components/RentalRequestDialog.tsx` place le focus sur les erreurs et les fait défiler dans la zone visible. Chaque tentative échouée déclenche cette action, même si le texte reste identique. Le passage au récapitulatif et le retour à la modification placent le focus sur le titre de l’étape. Le formulaire peut rétrécir ; le récapitulatif coupe les longues chaînes à la largeur disponible.

Aucun champ, validation de durée, numéro WhatsApp ni stockage modifié. Les dates, le lieu et les trois modèles restent présents après une ouverture bloquée, puis peuvent être modifiés. La confirmation doit être renouvelée après modification.

## Vérification

`test-mobile-request-feedback.mjs` : 320×568, 390×400, 768×700, 1280×900. Dans chaque format : erreur focalisée et entièrement visible ; récapitulatif sans débordement avec adresse longue et trois modèles ; deux ouvertures WhatsApp bloquées successives sans perte ; retour au formulaire avec focus et valeurs conservées ; nouvelle confirmation nécessaire ; URL finale avec les trois véhicules, les dates et le lieu. Aucune erreur JavaScript détectée.

Les ouvertures sont interceptées et les appels externes bloqués : aucun message réel envoyé. Chrome avec dimensions simulées ; aucun essai physique Safari/iPhone. Les contrôles de qualification, build, prérendu et publication sont consignés dans le suivi du projet avant clôture.
