# Mesurer les leads, sans confondre les étapes

Spécification à mettre en œuvre, pas une instrumentation déjà validée. Administration réservée au propriétaire Benatna ; données opérationnelles séparées des statistiques agrégées.

## Constats vérifiables dans le dépôt

| Référence | Observation | Conséquence |
|---|---|---|
| `src/components/WhatsAppButton.tsx:62–65` et `:106` | Ouverture d’une URL WhatsApp suivie d’un événement nommé `whatsapp_message_sent` | Le nom laisse croire à un envoi que le navigateur ne prouve pas |
| `src/utils/analyticsTracker.ts:105–166` | Détection du clic puis interception de `window.open` | Un même geste peut produire plusieurs événements ; à reproduire et dédupliquer avant analyse |
| `src/utils/analyticsTracker.ts:45–66` | Source tirée du référent | La fonction inspectée ne lit pas les UTM ; attribution de campagne à compléter et tester |
| `src/utils/analyticsTracker.ts:123–124`, `:161–162` | Propriété `href` construite à partir d’URL WhatsApp, limitée en longueur | Une URL peut contenir un texte libre : retirer paramètres/textes et conserver un contexte contrôlé |
| `src/utils/analytics.ts:115` et suivantes | Transfert conditionnel dataLayer/gtag/fbq | Présence de code de transfert ≠ preuve qu’une balise est chargée, autorisée ou bien configurée |

Ces constats reposent sur lecture de code ; aucune donnée privée de visiteur n’a été consultée. Les doublons et le transport réel vers chaque outil restent à reproduire. Ce n’est pas un audit exhaustif du consentement ou de toutes les balises.

## Dictionnaire cible

| Étape | Nom cible | Déclencheur recevable | Ce que cela ne prouve pas |
|---|---|---|---|
| Visite | `page_view` | Affichage de page selon règles analytics retenues | Intention de louer |
| Préparation | `rental_request_prepared` | Dates valides, ville desservie, contexte sélectionné | Contact reçu |
| Sortie vers WhatsApp | `whatsapp_handoff` | Action utilisateur unique et ouverture/tentative de lien | Envoi ou réception du message |
| Contact reçu | `lead_received` | Message réellement reçu, saisi dans le suivi opérateur ou intégration vérifiée | Qualification ou réservation |
| Qualification | `lead_qualified` | Casablanca/Rabat, dates exploitables et durée compatible, demande personnelle pertinente | Véhicule confirmé |
| Proposition | `offer_sent` | Proposition réelle transmise par le loueur/opérateur | Accord client |
| Confirmation | `rental_confirmed` | Confirmation explicite obtenue | Location effectuée |
| Réalisation | `rental_completed` | Location effectivement réalisée et vérifiée | Paiement en ligne |
| Sortie | `lead_lost` | Motif choisi : hors zone, durée, indisponibilité, conditions, sans suite, autre | Mauvaise qualité automatique de la campagne |

Un événement de préparation ou de sortie doit avoir un identifiant dédupliquable ; les événements métier doivent être émis par une source autorisée, jamais acceptés comme vérité depuis un visiteur anonyme. Les noms actuels ne sont pas silencieusement réinterprétés dans les historiques : documenter la date du changement.

## Attribution

Convention proposée : minuscules, sans espaces, vocabulaire stable [S16].

```text
utm_source=instagram | facebook | partenaire_identifie
utm_medium=organic_social | paid_social | referral
utm_campaign=casa_arrivee_2026q4
utm_content=video_arrivee_v1 | carrousel_etapes_v1 | carte_gares_v1
```

Exemple de lien de travail, non publié :

`https://benatna.ma/prise-en-charge-casablanca-rabat?utm_source=instagram&utm_medium=organic_social&utm_campaign=casa_arrivee_2026q4&utm_content=carrousel_etapes_v1`

Ne pas ajouter d’UTM aux liens internes : ils déformeraient l’attribution. Conserver une canonique propre pour la page. Garder séparément premier point d’entrée et dernier point d’entrée connu ; une visite directe ultérieure ne doit pas effacer sans règle la provenance connue. Les règles de conservation et les traitements restent à implémenter.

Pour une publicité ouvrant directement WhatsApp, utiliser un code court de campagne dans le message préparé, sans croire que le code sera toujours envoyé. L’opérateur rapproche le code reçu et le lead ; si absent, classer la source comme inconnue ou déclarée par le prospect. Ne pas inventer une attribution certaine.

Paramètres analytics autorisés proposés : identifiant d’événement, page sans texte libre, source/campagne validée, ville, identifiant du point d’arrivée, catégorie du modèle et tranche de durée. Pas de message WhatsApp complet, téléphone de prospect, nom, document ou URL libre dans les événements transmis aux outils marketing. Les coordonnées nécessaires au suivi commercial restent dans un espace opérationnel privé.

## Indicateurs utiles

- Demandes reçues et qualifiées, par source/campagne, page et ville.
- Taux de qualification = demandes qualifiées / demandes reçues, hors doublons connus.
- Taux de proposition et taux de confirmation ; locations réalisées séparées.
- Délai entre contact reçu et première réponse réelle ; pas de promesse publique de disponibilité 24/7 ajoutée.
- Motifs de perte et part des demandes hors zone/hors durée.
- Coût par demande qualifiée si une dépense est effectivement connue ; sinon afficher « non disponible ».
- Search Console : impressions/clics et indexation, avec périmètre et période.
- Recherche IA : moteur, date, question exacte, pays/langue, présence/citation/URL, exactitude des faits et preuve. Aucune inférence de classement universel depuis un seul essai.

Ne pas additionner sessions, clics WhatsApp et leads. Ne pas afficher `0` à la place d’une donnée indisponible. Séparer les essais, les doublons et les visiteurs réels. Les visites issues d’un assistant peuvent perdre leur référent ; un total identifiable est une borne observée, pas toute l’influence de l’IA.

## Vérifications avant un test payant

1. Un geste WhatsApp produit un seul événement de sortie et aucun faux message reçu.
2. La navigation depuis un lien UTM conserve la provenance jusqu’à la demande, sans propager de texte libre.
3. Aucune information client n’est visible dans un événement marketing ou une URL de campagne.
4. L’administrateur peut rapprocher demande reçue, qualification et résultat ; un visiteur ne peut pas falsifier ces étapes métier.
5. Une demande invalide de deux jours ne peut pas être comptée comme demande qualifiée.

Gabarits `suivi-demandes-modele.csv` et `tests-ia-modele.csv` fournis vides. Ne pas remplir de données réelles sensibles dans ces fichiers locaux de référence : prévoir le stockage opérationnel privé approprié.
