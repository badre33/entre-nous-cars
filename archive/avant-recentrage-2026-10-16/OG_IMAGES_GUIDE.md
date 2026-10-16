# Images de partage

Le site utilise l’image publique `https://benatna.ma/og-image.png`.
La fonction optionnelle `generate-og-image` conserve la réponse `{ imageUrl, cached }`, valide les entrées et retourne cette image sans appel à un service externe ni écriture dans Storage.
Les images individuelles existantes peuvent rester dans Storage ; cette modification ne les efface pas.
Les balises Open Graph et Twitter doivent fournir des URLs publiques absolues.
