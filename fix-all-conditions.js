const fs = require('fs');

// Lire le fichier
let content = fs.readFileSync('src/pages/Louer.tsx', 'utf8');

// Remplacer toutes les conditions avec Caution et km/jour
content = content.replace(
  /conditions: \["Caution: [^"]+", "[^"]+km\/jour inclus", "Âge minimum: (\d+) ans"\]/g,
  (match, age) => `conditions: generateConditions(${age})`
);

// Sauvegarder
fs.writeFileSync('src/pages/Louer.tsx', content, 'utf8');

console.log('✅ Toutes les conditions ont été corrigées!');
console.log('Tous les véhicules ont maintenant un kilométrage illimité et pas de caution.');
