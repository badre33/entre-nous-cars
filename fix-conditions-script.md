# Script pour corriger toutes les conditions des voitures

Il reste environ 110 conditions à corriger dans `src/pages/Louer.tsx`.

## Solution rapide avec regex

Utilisez votre éditeur de code (VS Code, etc.) pour faire un rechercher/remplacer global avec cette regex:

**Rechercher:**
```
conditions: \["Caution: [^"]+", "[^"]+km/jour inclus", "(Âge minimum: (\d+) ans)"\]
```

**Remplacer par:**
```
conditions: generateConditions($2)
```

Cette regex va:
1. Trouver toutes les conditions avec "Caution" et "km/jour inclus"
2. Extraire l'âge minimum (le nombre après "Âge minimum:")
3. Les remplacer par `generateConditions(X)` où X est l'âge minimum

## Alternative manuelle

Si vous préférez, vous pouvez aussi utiliser ce script Node.js:

```javascript
const fs = require('fs');

let content = fs.readFileSync('src/pages/Louer.tsx', 'utf8');

// Remplacer toutes les conditions
content = content.replace(
  /conditions: \["Caution: [^"]+", "[^"]+km\/jour inclus", "Âge minimum: (\d+) ans"\]/g,
  (match, age) => `conditions: generateConditions(${age})`
);

fs.writeFileSync('src/pages/Louer.tsx', content, 'utf8');
console.log('✅ Toutes les conditions ont été corrigées!');
```

Sauvegardez ce script dans `fix-conditions.js` et exécutez:
```bash
node fix-conditions.js
```
