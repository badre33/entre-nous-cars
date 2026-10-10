# Benatna

Marketplace de location de voitures au Maroc pour MRE, touristes et particuliers : de 3 jours à 6 mois.

## Développement

```sh
npm ci
npm run dev
npm run build
```

React 18, TypeScript, Vite, Supabase et Vercel. Le dépôt utilise npm et `package-lock.json`.
Les variables frontend nécessaires sont décrites dans `.env.example` et configurées dans Vercel ; ne pas committer de secrets.
Le déploiement sur main déclenche la publication : vérifier d’abord les changements sur une branche et une prévisualisation.

## Fonctions serveur

`generate-og-image` conserve son contrat JSON et retourne l’image publique de marque.
`chat-assistant` requiert `AI_CHAT_COMPLETIONS_URL` (HTTPS), `AI_API_KEY` et `AI_MODEL` configurés côté Supabase. L’API choisie doit accepter le contrat chat completions en streaming et les outils. Aucun fournisseur n’est configuré par défaut ; sans configuration, la fonction répond 503 avec le contact WhatsApp. Le frontend actuel n’appelle pas cet assistant.
