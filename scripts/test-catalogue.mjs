import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.TEST_BASE||'http://127.0.0.1:4319';
const browser=await chromium.launch({...(process.env.TEST_CHROME_PATH ? {executablePath:process.env.TEST_CHROME_PATH} : {}),headless:true});
try {
 for(const width of [1280,390]) {
  const page=await browser.newPage({viewport:{width,height:900},serviceWorkers:'block'});const errors=[];page.setDefaultTimeout(15000);
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.abort());
  await page.goto(base+'/louer',{waitUntil:'domcontentloaded',timeout:60000});
  
  const cards=page.locator('#catalogue-results h3');
  await page.getByText('24 véhicules affichés sur',{exact:false}).waitFor();
  assert.equal(await cards.count(),24,'no duplicate hidden catalogue');
  const first=await cards.first().innerText();
  await page.getByRole('button',{name:'Afficher plus de véhicules',exact:true}).click();
  await page.getByText('48 véhicules affichés sur',{exact:false}).waitFor();
  assert.equal(await cards.count(),48);assert.equal(await cards.first().innerText(),first,'stable loaded order');
  await page.getByRole('combobox').first().click();await page.getByRole('option',{name:'Rabat',exact:true}).click();
  await page.getByText('24 véhicules affichés sur',{exact:false}).waitFor();assert.equal(await cards.count(),24);
  while(await page.getByRole('button',{name:'Afficher plus de véhicules',exact:true}).count())await page.getByRole('button',{name:'Afficher plus de véhicules',exact:true}).click();
  const count=await page.locator('#catalogue-results h2').innerText();
  assert.equal(await cards.count(),Number(count.match(/^\d+/)[0]),'full filtered catalogue reachable');
  await page.getByRole('combobox').first().click();await page.getByRole('option',{name:'Casablanca',exact:true}).click();
  await page.getByText('24 véhicules affichés sur',{exact:false}).waitFor();assert.equal(await cards.count(),24);
  if(width===1280){await page.locator('#catalogue-results [role=checkbox]').first().locator('..').click();await page.locator('#catalogue-results [role=checkbox][aria-checked=true]').first().waitFor();}
  if(width===390){for(const name of ['Vue liste','Vue carrousel','Vue grille']){await page.getByRole('button',{name,exact:true}).click();assert.equal(await cards.count(),24);}}
  if(process.env.TEST_OUTPUT_DIR)await page.screenshot({path:`${process.env.TEST_OUTPUT_DIR}/catalogue-${width}.png`,fullPage:false});
  const bytes=Buffer.byteLength(await page.content());if(process.env.TEST_OUTPUT_DIR)await fs.writeFile(`${process.env.TEST_OUTPUT_DIR}/catalogue-${width}.html`,await page.content());
  assert(bytes<350000,`HTML too big ${bytes}`);assert.deepEqual(errors,[]);
  console.log(`Viewport ${width}: 24→48, filtres réinitialisés, catalogue complet accessible, HTML ${bytes} octets.`);
  await page.close();
 }
}finally{await browser.close();}
