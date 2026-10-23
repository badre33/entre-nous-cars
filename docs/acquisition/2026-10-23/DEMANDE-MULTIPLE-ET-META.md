# Demandes multiples et boutique Meta

Reproduction publique : trois modèles cochés (Clio, Duster, Golf), puis bouton mobile général ; le formulaire reprenait zéro modèle et obligeait à n'en choisir qu'un. Le calendrier de disponibilité transmettait aussi uniquement le modèle de la fiche. Le bouton d'envoi spécifique de la sélection conservait correctement plusieurs modèles, expliquant que les anciens tests aient passé.

Correction : tous les chemins utilisent la sélection active, y compris bouton mobile, calendrier et navigation vers une fiche. Le formulaire partage maintenant le contexte de sélection et propose de vrais champs pour un à trois modèles, avec ajout/retrait et prévention des doublons. Récapitulatif, dates, lieu, confirmation et message final conservent les modèles choisis.

Tests : reproduction avant correction, puis scénarios ordinateur/mobile vérifiant les trois modèles dans le formulaire, le récapitulatif et le texte WhatsApp final, ainsi que la navigation via fiche. Les ouvertures WhatsApp et services externes sont neutralisés. Les 20 scénarios existants sont conservés.

Meta : export préparé des 26 modèles, une offre par modèle, photos JPG pour la compatibilité catalogue. Les textes indiquent clairement location (pas vente), prix indicatif par jour, trois jours minimum, disponibilité à confirmer et photos illustratives. Le champ `available for order` signifie demande possible, pas stock réel confirmé. Il ne faut pas l'interpréter comme un inventaire. Export ponctuel régénérable par `node scripts/export-meta-catalogue.mjs`, pas synchronisation automatique des tarifs. Les sources/photos publiques sont celles du site. Ne pas supprimer l'ancien catalogue ou reconnecter WhatsApp, que le propriétaire confirme déjà connecté.

La boutique existante comporte des modifications non publiées datées du 4 avril 2025 et des blocs pour d'anciennes offres (dont Vito et Mégane). Ne pas publier ce brouillon en l'état. Actualiser la sélection avant publication. Toute demande de nouvelles conditions contractuelles dans l'interface doit être laissée au propriétaire.
