// Vérifie que la table de prix du formulaire de réservation suit le catalogue.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const louer = fs.readFileSync('src/pages/Louer.tsx', 'utf8');
const table = fs.readFileSync('src/data/rentalVehiclePrices.ts', 'utf8');
const names = fs.readFileSync('src/data/rentalVehicleNames.ts', 'utf8');
const catalogue = {};
for (const m of louer.matchAll(/name: "([^"]+)",[\s\S]*?price: (\d+)/g)) catalogue[m[1]] = +m[2];
const prices = Object.fromEntries([...table.matchAll(/"([^"]+)": (\d+),/g)].map(m => [m[1], +m[2]]));
for (const [name, price] of Object.entries(catalogue)) assert.equal(prices[name], price, `${name} : prix ${prices[name]} au lieu de ${price} (catalogue)`);
const selectable = [...names.split("] as const")[0].matchAll(/"([^"]+)"/g)].map(m => m[1]);
assert.ok(selectable.length > 20, 'liste des modèles introuvable');
for (const name of selectable) assert.ok(prices[name], `${name} : prix manquant pour le formulaire`);
console.log('rental prices OK');
