import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base = process.env.TEST_BASE || 'http://127.0.0.1:4319';
const output = process.env.TEST_OUTPUT_DIR || '/tmp/benatna-second-lot';
const paths = ['/location-voiture-automatique-casablanca', '/location-voiture-gare-casa-voyageurs', '/location-voiture-gare-oncf-maroc'];
await fs.mkdir(output, {recursive:true});
const browser = await chromium.launch({headless:true, executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const checks = [];
try {
 for (const width of [320,390,1280]) {
  const context = await browser.newContext({viewport:{width,height:900},serviceWorkers:'block'});
  await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());
  const page = await context.newPage(); const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  const visit = async path => {
   await page.goto(base+path,{waitUntil:'load',timeout:60000});
   await page.getByRole('heading',{level:1}).waitFor();
   const consent=page.getByRole('region',{name:'Cookies publicitaires',exact:true});
   if(await consent.isVisible())await consent.getByRole('button',{name:'Refuser',exact:true}).click();
  };
  for(const path of paths) {
   await visit(path);
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://benatna.ma'+path);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),path+' overflow at '+width);
   const scripts=await page.locator('script[type="application/ld+json"]').allTextContents();
   const faq=scripts.map(s=>JSON.parse(s)).find(s=>s['@type']==='FAQPage');
   assert.equal(faq.mainEntity.length,3);
   const text=await page.locator('main').innerText();
   for(const entry of faq.mainEntity){assert(text.includes(entry.name));assert(text.includes(entry.acceptedAnswer.text));}
   const journey=page.getByRole('region',{name:'Organiser votre location à Casablanca',exact:true});
   assert(await journey.getByRole('link').count()>=3);
   if(width===390)await page.screenshot({path:`${output}/${path.slice(1)}-390.png`,fullPage:true});
   checks.push({width,path,check:'content-schema-links-mobile',passed:true});
  }
  await visit(paths[0]);
  await page.getByRole('link',{name:'Voir les modèles et prix journaliers indicatifs',exact:true}).click();
  await page.waitForURL('**/louer?**');
  assert.equal(new URL(page.url()).searchParams.get('transmission'),'Automatique');
  const results=page.locator('#catalogue-results');await results.locator('h3').first().waitFor();
  await page.waitForFunction(()=>document.querySelector('#catalogue-results')?.innerText.includes('Automatique')&&!document.querySelector('#catalogue-results')?.innerText.includes('Manuelle'));
  assert(!(await results.innerText()).includes('Manuelle'));
  await results.getByRole('button',{name:'WhatsApp',exact:true}).first().click();
  assert((await page.getByLabel('Véhicule souhaité',{exact:true}).inputValue()).length>0);
  await page.getByRole('button',{name:'Vérifier ma demande',exact:true}).click();
  assert.equal(await page.getByRole('button',{name:'Confirmer et ouvrir WhatsApp',exact:true}).count(),0);
  checks.push({width,check:'automatic-filter-and-incomplete-request',passed:true});
  await visit(paths[3]);
  for(const pickup of ['casa-voyageurs','casa-port','oasis','ain-sebaa']) {
   const region=page.getByRole('region',{name:'Choisir votre gare à Casablanca',exact:true});
   const link=region.locator(`a[href="/louer?city=Casablanca&pickup=${pickup}"]`);await link.evaluate(e=>e.scrollIntoView({block:'center'}));await link.click();
   await page.waitForURL('**/louer?**');await page.locator('#catalogue-results h3').first().waitFor();
   await page.locator('#catalogue-results').getByRole('button',{name:'WhatsApp',exact:true}).first().click();
   assert.equal(await page.getByLabel('Lieu de prise en charge',{exact:true}).inputValue(),pickup);
   checks.push({width,pickup,check:'station-preserved-in-request',passed:true});
   await visit(paths[3]);
  }
  await visit(paths[1]);await page.getByRole('link',{name:'Voir les modèles et prix journaliers indicatifs',exact:true}).click();await page.waitForURL('**/louer?**');
  await page.locator('#catalogue-results h3').first().waitFor();await page.locator('#catalogue-results').getByRole('button',{name:'WhatsApp',exact:true}).first().click();
  const year=new Date().getFullYear()+1;
  await page.getByLabel('Date de départ de la demande',{exact:true}).fill(`${year}-01-01`);
  await page.getByLabel('Date de retour de la demande',{exact:true}).fill(`${year}-04-01`);
  await page.getByLabel('Lieu de prise en charge',{exact:true}).selectOption('cmn');
  await page.getByRole('button',{name:'Vérifier ma demande',exact:true}).click();
  assert(await page.getByRole('button',{name:'Confirmer et ouvrir WhatsApp',exact:true}).isDisabled());
  checks.push({width,check:'three-month-request-still-requires-confirmation',passed:true});
  assert.deepEqual(errors,[]);await context.close();console.log(`${width}px: lot SEO, filtre automatique, quatre gares et séjour trois mois validés.`);
 }
 await fs.writeFile(`${output}/verification.json`,JSON.stringify({base,checks,realMessagesSent:0},null,2));
 console.log(JSON.stringify({passed:true,checks:checks.length,realMessagesSent:0}));
}finally{await browser.close();}
