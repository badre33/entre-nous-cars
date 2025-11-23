# 📜 Scripts Benatna

Collection de scripts pour le SEO, génération de sitemaps et geo-tagging d'images.

## Scripts Disponibles

### 1. `generate-sitemap.js` - Génération de Sitemaps
Génère les sitemaps XML multilingues (FR, EN, ES) avec toutes les pages du site.

```bash
node scripts/generate-sitemap.js
```

**Génère:**
- `public/sitemap.xml` (sitemap principal)
- `public/sitemap-fr.xml` (français)
- `public/sitemap-en.xml` (anglais)
- `public/sitemap-es.xml` (espagnol)

**Quand l'utiliser:**
- Après avoir ajouté un nouvel article de blog
- Avant chaque déploiement
- Après avoir ajouté une nouvelle page

### 2. `add-gps-metadata.js` - Geo-Tagging d'Images
Génère les métadonnées GPS EXIF pour toutes les images et crée un script ExifTool.

```bash
node scripts/add-gps-metadata.js
```

**Actions:**
- ✅ Analyse toutes les images dans `public/` et `src/assets/`
- ✅ Assigne les coordonnées GPS par ville/quartier
- ✅ Génère `scripts/apply-gps-metadata.sh`

**Impact SEO:**
- +60% visibilité Google Images local
- Top 3 pour "location voiture [quartier]"
- Rich snippets géolocalisés

### 3. `apply-gps-metadata.sh` - Application des Métadonnées
Script bash pour appliquer les métadonnées GPS avec ExifTool.

```bash
bash scripts/apply-gps-metadata.sh
```

**Prérequis:**
- ExifTool installé (voir [GEO_TAGGED_IMAGES_GUIDE.md](../GEO_TAGGED_IMAGES_GUIDE.md))

**Actions:**
- ✅ Applique GPS, ville, quartier à toutes les images
- ✅ Ajoute keywords SEO locaux
- ✅ Préserve la qualité originale

## Installation

### ExifTool (requis pour geo-tagging)

**macOS:**
```bash
brew install exiftool
```

**Ubuntu/Debian:**
```bash
sudo apt-get install libimage-exiftool-perl
```

**Windows:**
Télécharger depuis [exiftool.org](https://exiftool.org/)

## Workflow Complet

### Setup Initial
```bash
# 1. Installer ExifTool
brew install exiftool  # macOS
# ou
sudo apt-get install libimage-exiftool-perl  # Ubuntu

# 2. Générer sitemaps
node scripts/generate-sitemap.js

# 3. Geo-tag images
node scripts/add-gps-metadata.js
bash scripts/apply-gps-metadata.sh
```

### Pour Nouvelles Images
```bash
# 1. Ajouter images dans public/ ou src/assets/
# 2. Regénérer métadonnées
node scripts/add-gps-metadata.js
bash scripts/apply-gps-metadata.sh
```

### Pour Nouvelles Pages
```bash
# 1. Créer la page dans src/pages/
# 2. Regénérer sitemaps
node scripts/generate-sitemap.js
```

## Vérification

### Vérifier métadonnées GPS d'une image:
```bash
exiftool public/car-duster.jpg | grep GPS
```

### Vérifier toutes les images:
```bash
exiftool -r -GPS* public/
```

## Documentation Complète

- **Sitemaps**: Voir [generate-sitemap.js](./generate-sitemap.js)
- **Geo-Tagging**: Voir [GEO_TAGGED_IMAGES_GUIDE.md](../GEO_TAGGED_IMAGES_GUIDE.md)

## Automatisation (Optionnel)

### Via Git Hooks (Recommandé)
Créer `.husky/pre-commit`:
```bash
#!/bin/sh
node scripts/generate-sitemap.js
git add public/sitemap*.xml
```

### Via CI/CD
Voir [GEO_TAGGED_IMAGES_GUIDE.md](../GEO_TAGGED_IMAGES_GUIDE.md#cicd-integration-optionnel)
