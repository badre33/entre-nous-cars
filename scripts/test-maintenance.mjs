import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const load = async (file) => {
  const source = fs.readFileSync(new URL(file, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } });
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

const { getAnalyticsDateRange, buildAnalyticsTimeSeries, fetchAnalyticsPages } = await load('../src/utils/analyticsData.ts');
const now = new Date(2026, 0, 3, 15, 30);
const today = getAnalyticsDateRange(1, now);
assert.equal(today.startDate.getDate(), 3);
assert.equal(today.startDate.getHours(), 0);
assert.equal(today.endDate.getTime(), now.getTime());
const week = getAnalyticsDateRange(7, now);
assert.equal(week.startDate.getFullYear(), 2025);
assert.equal(week.startDate.getMonth(), 11);
assert.equal(week.startDate.getDate(), 28);
assert.throws(() => getAnalyticsDateRange(0, now));
const series = buildAnalyticsTimeSeries([
 { created_at: '2026-01-01T12:00:00', event_name: 'page_view' },
 { created_at: '2025-12-31T12:00:00', event_name: 'page_view' },
 { created_at: '2025-01-01T12:00:00', event_name: 'cta_click' },
 { created_at: '2026-01-01T13:00:00', event_name: 'cta_click' },
]);
assert.deepEqual(series.map(row => [row.date, row.events, row.pageViews]), [['01/01',1,0],['31/12',1,1],['01/01',2,1]]);
const source = Array.from({length: 1205}, (_, id) => ({id}));
const ranges = [];
const full = await fetchAnalyticsPages(async (from, to) => { ranges.push([from,to]); return {data: source.slice(from,to+1),error:null}; });
assert.deepEqual(full, source);
assert.deepEqual(ranges, [[0,999],[1000,1999]]);
assert.deepEqual(await fetchAnalyticsPages(async () => ({data:[],error:null})), []);
await assert.rejects(() => fetchAnalyticsPages(async from => from===0 ? {data:source.slice(0,1000),error:null} : {data:null,error:new Error('network error')}), /network error/);
console.log('Périodes, ordre du graphique, pagination au-delà de 1 000 lignes et refus des résultats partiels vérifiés.');
