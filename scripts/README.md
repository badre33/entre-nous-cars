# Scripts de génération

## generate-sitemap.js

Script pour générer automatiquement le sitemap.xml à partir des pages statiques et des articles de blog.

### Utilisation

```bash
node scripts/generate-sitemap.js
```

### Quand l'utiliser ?

- **Après avoir ajouté un nouvel article de blog** : Ajouter le slug et la date dans le tableau `blogArticles` du script, puis exécuter le script
- **Avant chaque déploiement** : Pour s'assurer que le sitemap est à jour
- **Après avoir ajouté une nouvelle page** : Ajouter l'URL dans le tableau `staticPages`, puis exécuter le script

### Configuration

Les URLs et priorités sont définies dans le script :
- `staticPages` : Pages principales du site
- `blogArticles` : Articles de blog avec leurs slugs et dates de publication

### Automatisation future

Pour automatiser complètement, il faudrait :
1. Parser directement `src/data/blogArticles.ts` (nécessite un build step)
2. Ou intégrer ce script au processus de build Vite
3. Ou créer un hook pre-commit Git

Pour l'instant, il suffit d'exécuter manuellement le script après chaque ajout d'article.
