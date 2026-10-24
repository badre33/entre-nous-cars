import {chromium} from 'playwright';
import {build} from 'esbuild';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const base=process.env.TEST_BASE||'http://127.0.0.1:4319';
const output=process.env.TEST_OUTPUT_DIR||'/tmp/benatna-current-offer';
await fs.mkdir(output,{recursive:true});
const temp=await fs.mkdtemp(path.join(os.tmpdir(),'benatna-editorial-'));
await build({stdin:{contents:"export {glossaryTerms} from './src/data/glossaryTerms';",resolveDir:process.cwd()},bundle:true,platform:'node',format:'esm',outfile:path.join(temp,'glossary.mjs')});
const {glossaryTerms}=await import(pathToFileURL(path.join(temp,'glossary.mjs')));
assert.equal(glossaryTerms.length,56);
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const routes=['/glossaire','/location-voiture-automatique-casablanca','/location-voiture-gare-oncf-maroc','/comparatif/location-aeroport-vs-centre-ville-maroc'];
try {
 for(const width of [320,390,1280]){
  const page=await browser.newPage({viewport:{width,height:844},serviceWorkers:'block'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());
  for(const route of routes){
   await page.goto(base+route);await page.locator('main h1').waitFor();
   const text=await page.locator('main').innerText();
   assert(!/24h\/24|6h-23h|2-5 minutes|30 min la nuit|Marrakech|Tanger|Agadir|Fès|\bvan\b|\bvans\b/i.test(text),'outdated service promises absent');
   assert(/Casablanca/.test(text));
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'page fits viewport');
   const schemas=await page.locator('script[type="application/ld+json"]').evaluateAll(els=>els.map(e=>JSON.parse(e.textContent)));
   const faq=schemas.find(x=>x['@type']==='FAQPage');assert(faq&&faq.mainEntity.length>0);
   for(const question of faq.mainEntity){assert(text.includes(question.name));assert(text.includes(question.acceptedAnswer.text));}
   if(route==='/glossaire'){
    assert.equal(faq.mainEntity.length,56);
    for(const term of glossaryTerms)assert(text.includes(term.definition));
    await page.getByLabel('Rechercher dans le glossaire').fill('caution');
    assert(await page.locator('main h3').count()>0);
    await page.getByLabel('Rechercher dans le glossaire').fill('aucun-terme-inexistant');
    assert((await page.locator('main').innerText()).includes('Aucun terme trouvé'));
    await page.getByLabel('Rechercher dans le glossaire').fill('');
   }else if(route.includes('/comparatif/')){
    assert(!schemas.some(x=>x['@type']==='ComparisonTable'&&x.item.some(item=>item.offers)),'no invented comparison price offer');
   }
   await page.screenshot({path:`${output}/${route.replaceAll('/','_')}-${width}.png`});
  }
  assert.deepEqual(errors,[]);
  console.log(`${width}px: 4 pages cohérentes, sans débordement ; 56 définitions visibles et FAQ identiques ; recherche du glossaire et comparatif sans offre tarifaire inventée.`);
  await page.close();
 }
}finally{await browser.close();await fs.rm(temp,{recursive:true,force:true});}
