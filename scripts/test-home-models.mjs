// Vérifie que la liste légère de l'accueil reste alignée sur vehicleDetails (prix, places, photo).
import fs from 'node:fs';
import assert from 'node:assert/strict';
const home = fs.readFileSync('src/components/HomeModelsSection.tsx', 'utf8');
const details = fs.readFileSync('src/data/vehicleDetails.ts', 'utf8');
const models = [...home.matchAll(/\{ slug: '([a-z0-9-]+)', name: '([^']+)', priceFrom: (\d+), seats: (\d+) \}/g)];
assert.equal(models.length, 6, 'HOME_MODELS : 6 modèles attendus');
for (const [, slug, name, price, seats] of models) {
  const start = details.indexOf(`slug: "${slug}"`);
  assert.ok(start > -1, `vehicleDetails : ${slug} introuvable`);
  const block = details.slice(start, details.indexOf('perfectFor', start));
  assert.ok(block.includes(`name: "${name}"`), `${slug} : nom différent`);
  assert.ok(new RegExp(`priceFrom: ${price}\\b`).test(block), `${slug} : prix ${price} différent de vehicleDetails`);
  assert.ok(new RegExp(`seats: ${seats}\\b`).test(block), `${slug} : places ${seats} différentes de vehicleDetails`);
  assert.ok(fs.existsSync(`public/vehicles/benatna/${slug}.webp`) && fs.existsSync(`public/vehicles/benatna/responsive/${slug}-480.webp`), `${slug} : photo manquante`);
}
console.log('home models OK');
