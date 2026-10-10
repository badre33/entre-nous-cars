# Assistant de Benatna

La fonction Supabase `chat-assistant` est un point d’entrée optionnel ; aucun composant du frontend actuel ne l’appelle.
Elle valide les messages user/assistant et conserve le format SSE de chat completions.
Configurer côté serveur `AI_CHAT_COMPLETIONS_URL`, `AI_API_KEY` et `AI_MODEL` pour un service compatible choisi par le propriétaire. Sans ces paramètres, elle renvoie une indisponibilité explicite et le contact WhatsApp.
Les limites en mémoire par instance ne remplacent pas une limitation centralisée des requêtes.
