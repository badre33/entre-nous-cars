# Parcours mobile — 24 octobre 2026

Problème reproduit : après sélection, deux grandes actions WhatsApp superposées occupaient environ 160 px au-dessus de la navigation sur un écran de 320 px. Le bouton de fermeture des dialogues mesurait 16 × 16 px.

Corrections : le catalogue affiche son action générale sans sélection, puis une seule action de sélection dès le premier véhicule. Cette action reste dans la largeur de l'écran, au-dessus de la navigation, avec prise en compte de la zone de sécurité. Champs du formulaire de 44 px minimum ; textes des boutons autorisés à revenir à la ligne ; zone de fermeture de 44 × 44 px et libellé français. Les conditions commerciales et validations sont conservées.

Validation : scripts/test-mobile-rental.mjs, tailles 320×568, 360×640, 390×844 et 390×400. Trois modèles conservés, dates et lieu obligatoires, confirmation explicite, absence de débordement horizontal et action au-dessus de la navigation. Ouverture WhatsApp simulée : aucun message envoyé. Test de sélection multiple également rejoué à 390 et 1280 px. TypeScript, lint ciblé et build validés.

Limites : tests Chrome sur dimensions mobiles, pas une validation sur tous les appareils physiques ni sur Safari iOS. La réception effective d'un message sur le téléphone n'est pas attestée. Ce lot concerne les actions du catalogue et le formulaire partagé ; il ne représente pas un audit exhaustif de toutes les pages ni une mesure des Core Web Vitals.
