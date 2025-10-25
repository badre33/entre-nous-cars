#!/bin/bash
# Script to fix all car conditions in Louer.tsx

# Backup the original file
cp src/pages/Louer.tsx src/pages/Louer.tsx.backup

# Replace all conditions using sed
# Pattern: conditions: ["Caution: ... MAD", "... km/jour inclus", "Âge minimum: XX ans"]
# Replace with: conditions: ["Kilométrage illimité", "Âge minimum: XX ans"]

sed -i '' -E 's/conditions: \["Caution: [^"]+", "[^"]+km\/jour inclus", "(Âge minimum: [^"]+)"\]/conditions: ["Kilométrage illimité", "\1"]/g' src/pages/Louer.tsx

echo "✅ All conditions have been fixed!"
echo "Original file backed up to: src/pages/Louer.tsx.backup"
