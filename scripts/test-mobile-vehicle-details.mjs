import {chromium} from 'playwright';
import {build} from 'esbuild';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const result=await build({entryPoints:['src/data/rentalVehicleNames.ts'],bundle:true,platform:'node',format:'esm',write:false});
const {rentalVehicleSlugs:models}=await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
const base=process.env.TEST_BASE||'http://127.0.0.1:4319';
const output=process.env.TEST_OUTPUT_DIR||'/tmp/benatna-mobile-details';await fs.mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
try {
for(const width of [320,390,1280]) {
 const page=await browser.newPage({viewport:{width,height:844},deviceScaleFactor:1,serviceWorkers:'block'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.abort());
 const entries=width===320?Object.entries(models):Object.entries(models).filter(([slug])=>['renault-clio','audi-a3','range-rover-sport'].includes(slug));
 for(const [slug,name] of entries){
  await page.goto(base+'/vehicule/'+slug);await page.getByRole('heading',{name,exact:true}).waitFor();
  const photo=page.locator('img[fetchpriority=high]').first();await photo.scrollIntoViewIfNeeded();await photo.evaluate(e=>e.decode());
  const info=await photo.evaluate(e=>({src:e.currentSrc,loaded:e.complete&&e.naturalWidth>0,loading:e.loading}));
  assert(info.loaded && info.loading==='eager');if(width<768)assert(info.src.includes('/responsive/'),'mobile uses actual resized photo');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no horizontal page overflow: '+slug);
  const summary=page.getByRole('heading',{name,exact:true});const tabs=page.getByRole('tablist');
  if(width<768)assert((await summary.boundingBox()).y<(await tabs.boundingBox()).y,'name and price before detailed tabs');
  for(const tab of await page.getByRole('tab').all()) {const bounds=await tab.boundingBox();assert(bounds.height>=44,'touch-friendly tabs');assert(await tab.evaluate(e=>e.scrollWidth<=e.clientWidth),'tab text fits');}
  await page.getByRole('tab',{name:'Conditions',exact:true}).click();const conditions=await page.getByRole('tabpanel').innerText();assert(!/RAK|TNG|AGA|FEZ|Marrakech|Tanger Ville/.test(conditions),'no delivery promises outside coverage');assert(conditions.includes('Rabat sur demande'));
  await page.getByRole('tab',{name:'Présentation',exact:true}).click();
  if(slug==='renault-clio'){await page.screenshot({path:`${output}/clio-${width}.png`,fullPage:true});}
 }
 assert.deepEqual(errors,[]);console.log(`${width}px: ${entries.length} fiches, photos adaptées, prix avant descriptif sur mobile, onglets 44px et livraison Casablanca/Rabat validés.`);
 await page.close();
}
}finally{await browser.close();}
