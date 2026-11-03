import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.TEST_BASE||'http://127.0.0.1:4319';const out=process.env.TEST_OUTPUT_DIR||'/tmp/benatna-eight-guides';await fs.mkdir(out,{recursive:true});
const guides=['location-jeune-conducteur-casablanca','guide-maroc','eviter-arnaques-location-voiture-maroc','accident-voiture-location-maroc-que-faire'];
const dates={'conseils-conduite-maroc':'2025-01-20','pourquoi-benatna':'2025-01-05','guide-complet-location-voiture-maroc-2025':'2025-01-15','louer-voiture-maroc-sans-carte-credit-mre':'2026-08-11'};
const paths=[...guides.map(s=>'/'+s),...Object.keys(dates).map(s=>'/blog/'+s)];
const oldPromises=/24\/7|24-48|3-5 jours|assurance tous risques incluse|20 à 40%|5000\+|50 DH\/jour seulement|3000-8000|7 500 DH|7500 DH/i;
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});const checks=[];
try{
 for(const width of [320,390,1280])for(const path of paths){
  const context=await browser.newContext({viewport:{width,height:900},serviceWorkers:'block'});await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+path,{waitUntil:'load',timeout:60000});await page.getByRole('heading',{level:1}).waitFor();
  const consent=page.getByRole('region',{name:'Cookies publicitaires',exact:true});if(await consent.isVisible())await consent.getByRole('button',{name:'Refuser',exact:true}).click();
  assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://benatna.ma'+path);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const text=await page.locator('body').innerText();assert(!oldPromises.test(text),path+' old promise');
  const scripts=(await page.locator('script[type="application/ld+json"]').allTextContents()).map(s=>JSON.parse(s));
  const slug=path.split('/').pop();
  if(path.startsWith('/blog/')){
   const schema=scripts.find(s=>s['@type']==='BlogPosting');assert.equal(schema.datePublished,dates[slug]);assert.equal(schema.dateModified,'2026-11-03');assert.equal(await page.locator('time[datetime="2026-11-03"]').count(),1);
   assert(await page.locator('article a[href="/location-voiture-casablanca"], article a[href="/prise-en-charge-casablanca-rabat"]').count()>0);
  }else{
   const faq=scripts.find(s=>s['@type']==='FAQPage');assert.equal(faq.mainEntity.length,3);for(const entry of faq.mainEntity){assert(text.includes(entry.name));assert(text.includes(entry.acceptedAnswer.text));}
  }
  if(slug==='accident-voiture-location-maroc-que-faire'){
   const note=page.getByRole('note',{name:'Une urgence ne se traite pas sur WhatsApp Benatna',exact:true});await note.waitFor();assert((await note.boundingBox()).y<(await page.locator('h1').boundingBox()).y);
   const hero=page.locator('section').filter({has:page.locator('h1')});assert.equal(await hero.getByRole('link').count(),0,'commercial actions not presented as emergency assistance');
   const sources=page.getByRole('region',{name:'Sources et vérification',exact:true});assert.equal(await sources.getByRole('link').count(),3);assert.equal(await sources.locator('time').getAttribute('datetime'),'2026-11-03');
  }
  if(width===390&&[guides[3],'conseils-conduite-maroc'].includes(slug))await page.screenshot({path:`${out}/${slug}-390.png`,fullPage:true});
  checks.push({width,path,check:'content-canonical-schema-mobile',passed:true});
  const cta=path.startsWith('/blog/')?page.getByRole('link',{name:'Voir les véhicules',exact:true}):page.getByRole('link',{name:'Choisir mes véhicules et mes dates',exact:true}).first();
  await cta.evaluate(e=>e.scrollIntoView({block:'center'}));await cta.click();await page.waitForURL('**/louer**');await page.locator('#catalogue-results h3').first().waitFor();
  const request=page.locator('#catalogue-results').getByRole('button',{name:'WhatsApp',exact:true}).first();await request.evaluate(e=>e.scrollIntoView({block:'center'}));await request.click();await page.getByRole('button',{name:'Vérifier ma demande',exact:true}).click();assert.equal(await page.getByRole('button',{name:'Confirmer et ouvrir WhatsApp',exact:true}).count(),0);
  checks.push({width,path,check:'qualified-request',passed:true});assert.deepEqual(errors,[]);await context.close();console.log(`${width}px ${path}: validé`);
 }
 await fs.writeFile(`${out}/verification.json`,JSON.stringify({base,checks,realMessagesSent:0},null,2));console.log(JSON.stringify({passed:true,checks:checks.length,realMessagesSent:0}));
}finally{await browser.close();}
