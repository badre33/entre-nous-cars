import {chromium} from 'playwright';
import {build} from 'esbuild';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const compiled=await build({entryPoints:['src/data/premiumVehicles.ts'],bundle:true,platform:'node',format:'esm',write:false});
const {approvedPremiumVehicles:models}=await import('data:text/javascript;base64,'+Buffer.from(compiled.outputFiles[0].text).toString('base64'));
const base=process.env.TEST_BASE||'http://127.0.0.1:4319';
const browser=await chromium.launch({headless:true,executablePath:process.env.TEST_CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
try{for(const width of [1280,390]){
 const page=await browser.newPage({viewport:{width,height:900},serviceWorkers:'block'});const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.abort());
 await page.goto(base+'/louer');await page.getByRole('button',{name:'Afficher plus de véhicules',exact:true}).click();
 assert.equal(await page.locator('#catalogue-results h3').count(),33);
 for(const model of models){
  assert.equal(await page.locator('#catalogue-results h3').filter({hasText:new RegExp('^'+model.name+'$')}).count(),1,model.name+' unique card');
  await page.goto(base+'/vehicule/'+model.slug);await page.getByRole('heading',{name:model.name,exact:true}).waitFor();
  const photo=page.locator(`img[src="${model.image}"]`).first();await photo.waitFor();
  await page.waitForFunction(url=>Array.from(document.images).some(i=>new URL(i.src).pathname===url&&i.complete&&i.naturalWidth>0),model.image);
  assert.equal(await page.locator('link[rel=canonical]').last().getAttribute('href'),'https://benatna.ma/vehicule/'+model.slug);
  await page.getByRole('button',{name:'Réserver ce véhicule',exact:true}).click();
  assert.equal(await page.getByLabel('Véhicule souhaité',{exact:true}).inputValue(),model.name);
  assert.equal(await page.getByLabel('Date de départ de la demande',{exact:true}).inputValue(),'');
  await page.getByRole('button',{name:'Vérifier ma demande',exact:true}).click();assert(await page.getByLabel('Véhicule souhaité',{exact:true}).isVisible());
  await page.goto(base+'/louer');await page.getByRole('button',{name:'Afficher plus de véhicules',exact:true}).click();
 }
 assert.deepEqual(errors,[]);if(process.env.TEST_OUTPUT_DIR){await fs.mkdir(process.env.TEST_OUTPUT_DIR,{recursive:true});await page.screenshot({path:process.env.TEST_OUTPUT_DIR+`/premium-${width}.png`});}
 console.log(`${width}: 11 premium cards, photos, details, canonical URLs and qualified rental prefills passed; no real message sent.`);await page.close();
}}finally{await browser.close();}
