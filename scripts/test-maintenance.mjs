import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const load = async (file) => {
  const source = fs.readFileSync(new URL(file, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
  return import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'));
};
const { isValidRentalPeriod } = await load('../src/utils/rentalPeriod.ts');
const cases = [
  ['trois jours acceptés', ['2026-10-10', '2026-10-13'], true],
  ['deux jours refusés', ['2026-10-10', '2026-10-12'], false],
  ['même jour refusé', ['2026-10-10', '2026-10-10'], false],
  ['dates inversées refusées', ['2026-10-13', '2026-10-10'], false],
  ['six mois calendaires acceptés', ['2026-10-10', '2027-04-10'], true],
  ['six mois et un jour refusés', ['2026-10-10', '2027-04-11'], false],
  ['fin de mois bornée février', ['2026-08-31', '2027-02-28'], true],
  ['dépassement après février', ['2026-08-31', '2027-03-01'], false],
  ['année bissextile', ['2027-08-31', '2028-02-29'], true],
  ['date impossible refusée', ['2026-02-30', '2026-03-10'], false],
  ['date manquante refusée', ['', '2026-10-13'], false],
  ['moins de trois jours avec heures', ['2026-10-10', '2026-10-13', '10:00', '09:59'], false],
  ['trois jours avec heures', ['2026-10-10', '2026-10-13', '10:00', '10:00'], true],
  ['dépassement six mois avec heures', ['2026-10-10', '2027-04-10', '10:00', '10:01'], false],
  ['heure impossible refusée', ['2026-10-10', '2026-10-13', '24:00', '10:00'], false],
];
for (const [name, args, expected] of cases) assert.equal(isValidRentalPeriod(...args), expected, name);
console.log(`${cases.length} cas de validation des locations réussis.`);

const { isAppCache } = await load('../src/utils/appCaches.ts');
assert(isAppCache('pages-cache', 'https://benatna.ma/'));
assert(isAppCache('workbox-precache-v2-https://benatna.ma/', 'https://benatna.ma/'));
assert(!isAppCache('other-cache', 'https://benatna.ma/'));
assert(!isAppCache('workbox-precache-v2-https://benatna.ma/other/', 'https://benatna.ma/'));
console.log('4 cas de nettoyage ciblé des caches réussis.');
