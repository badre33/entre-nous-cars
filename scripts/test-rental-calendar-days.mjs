import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const output = await mkdtemp(path.join(tmpdir(), 'benatna-calendar-days-'));
try {
  const entry = path.join(output, 'dates.mjs');
  await build({stdin:{contents:"export {calculateDays} from './src/utils/priceCalculations'; export {parseLocalRentalDate} from './src/utils/rentalDate';",resolveDir:process.cwd()},bundle:true,platform:'node',format:'esm',outfile:entry,alias:{'@':path.resolve('src')}});
  const {calculateDays,parseLocalRentalDate} = await import(pathToFileURL(entry));
  for (const zone of ['Europe/Paris','America/Los_Angeles','Africa/Casablanca']) {
    process.env.TZ = zone;
    for (const [start,end] of [['2026-10-24','2026-10-27'],['2026-03-28','2026-03-31'],['2026-11-01','2026-11-04'],['2026-02-14','2026-02-17'],['2026-03-21','2026-03-24']]) {
      assert.equal(calculateDays(parseLocalRentalDate(start),parseLocalRentalDate(end)),3,`${zone}: ${start} → ${end}`);
    }
    assert.equal(parseLocalRentalDate('2027-02-30'),undefined);
    assert.equal(parseLocalRentalDate('not-a-date'),undefined);
    assert.equal(parseLocalRentalDate('2028-02-29').getDate(),29);
    assert.equal(calculateDays(undefined,new Date()),0);
    console.log(`${zone}: durées calendaires stables, dates impossibles rejetées.`);
  }
} finally {
  await rm(output,{recursive:true,force:true});
}
