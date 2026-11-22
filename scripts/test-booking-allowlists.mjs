// Concordance entre les listes du site et celles de la migration submit_booking :
// un modèle ou un lieu ajouté au site doit l'être aussi en base, sinon la réservation est refusée.
// Usage : node scripts/test-booking-allowlists.mjs [chemin/vers/migration.sql]
import { readFileSync, readdirSync, existsSync } from 'node:fs';
const sqlPath = process.argv[2] || (existsSync('supabase/migrations') && readdirSync('supabase/migrations').filter(f => /submit_booking/.test(f)).map(f => `supabase/migrations/${f}`).pop());
if (!sqlPath) { console.log('Aucune migration submit_booking dans le dépôt : contrôle ignoré.'); process.exit(0); }
const sql = readFileSync(sqlPath, 'utf8');
const block = table => { const m = sql.match(new RegExp(`INSERT INTO booking_intake_private\\.${table}\\([^)]*\\) VALUES([\\s\\S]*?);`)); if (!m) throw new Error(`${table} introuvable dans ${sqlPath}`); return [...m[1].matchAll(/\('([^']+)','([^']+)'\)/g)].map(x => [x[1], x[2]]); };
const sqlVehicles = block('vehicle_allowlist').map(([name]) => name).sort();
const sqlPickups = block('pickup_allowlist').map(([id, city]) => `${id}:${city}`).sort();
const siteVehicles = [...readFileSync('src/data/rentalVehicleNames.ts', 'utf8').split(']')[0].matchAll(/"([^"]+)"/g)].map(m => m[1]).sort();
const sitePickups = [...readFileSync('src/data/pickupPoints.ts', 'utf8').split('export const rentalFacts')[0].matchAll(/id: '([^']+)', city: '([^']+)'/g)].map(m => `${m[1]}:${m[2]}`).sort();
const diff = (a, b) => ({ manquants_en_base: a.filter(x => !b.includes(x)), en_trop_en_base: b.filter(x => !a.includes(x)) });
const v = diff(siteVehicles, sqlVehicles), p = diff(sitePickups, sqlPickups);
const ok = !v.manquants_en_base.length && !v.en_trop_en_base.length && !p.manquants_en_base.length && !p.en_trop_en_base.length;
console.log(JSON.stringify({ migration: sqlPath, voitures: { site: siteVehicles.length, base: sqlVehicles.length, ...v }, lieux: { site: sitePickups.length, base: sqlPickups.length, ...p } }));
if (!ok) { console.error('Listes divergentes entre le site et submit_booking.'); process.exit(1); }
console.log('Listes voitures et lieux identiques.');
