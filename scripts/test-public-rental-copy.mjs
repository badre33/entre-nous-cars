import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.TEST_BASE||'http://127.0.0.1:4319';
const out=process.env.TEST_OUTPUT_DIR||'/tmp/benatna-public-copy';await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});const checks=[];
const paths=['/','/nos-services','/location-voiture-mre-maroc','/louer-voiture-maroc-faq-complete','/en','/es'];
const homeTitles={'/':'Préparez une proposition adaptée à votre séjour','/en':'Prepare a proposal for your stay','/es':'Prepara una propuesta para tu estancia'};
const forbidden=/Avis Maroc|Zéro caution CB|7 000 DH|9 000 DH|Prix garantis sans frais cachés|assurance tous risques incluse|all-risk insurance included|seguro a todo riesgo incluido|no paperwork|sin papeleo|21\+ services|24\/7|40 Questions|5000\+ conversations|Tanger Med|attente illimitee/i;
try{
 for(const width of [320,390,1280])for(const path of paths){
  const context=await browser.newContext({viewport:{width,height:900},serviceWorkers:'block'});
  await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const visit=async url=>{await page.goto(base+url,{waitUntil:'load',timeout:60000});await page.getByRole('heading',{level:1}).waitFor();const consent=page.getByRole('region',{name:'Cookies publicitaires',exact:true});if(await consent.isVisible())await consent.getByRole('button',{name:'Refuser',exact:true}).click();};
  const click=async l=>{await l.evaluate(e=>e.scrollIntoView({block:'center'}));await l.click();};
  await visit(path);if(homeTitles[path])await page.getByRole('heading',{name:homeTitles[path],exact:true}).waitFor();
  assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://benatna.ma'+(path==='/'?'/':path));
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert(!forbidden.test(await page.locator('body').innerText()),'old promise at '+path);
  if(path.includes('mre')||path.includes('faq')){
   const scripts=(await page.locator('script[type="application/ld+json"]').allTextContents()).map(s=>JSON.parse(s));const faq=scripts.find(s=>s['@type']==='FAQPage');assert.equal(faq.mainEntity.length,path.includes('mre')?4:8);const text=await page.locator('body').innerText();for(const q of faq.mainEntity){assert(text.includes(q.name));assert(text.includes(q.acceptedAnswer.text));}
  }
  if(path==='/nos-services')assert.equal(await page.getByRole('region',{name:'Choisir votre parcours de location',exact:true}).getByRole('link').count(),6);
  if(width===390&&['/','/nos-services'].includes(path))await page.screenshot({path:`${out}/${path==='/'?'home':'services'}-390.png`,fullPage:true});
  checks.push({width,path,check:'copy-canonical-mobile',passed:true});
  if(path==='/'){
   const form=page.getByRole('form',{name:'Rechercher une voiture',exact:true});const year=new Date().getFullYear()+1;
   await form.getByLabel('Date de départ',{exact:true}).fill(`${year}-01-01`);await form.getByLabel('Date de retour',{exact:true}).fill(`${year}-01-08`);
   if(width<768){await form.getByRole('button',{name:'Réserver une voiture',exact:true}).click();assert.equal(await page.getByLabel('Date de départ de la demande',{exact:true}).inputValue(),`${year}-01-01`);await page.getByRole('button',{name:'Vérifier ma réservation',exact:true}).click();assert.equal(await page.getByRole('button',{name:'Réserver sur WhatsApp',exact:true}).count(),0);}
   else{await form.getByRole('button',{name:'Rechercher',exact:true}).click();await page.waitForURL('**/louer?**');assert.equal(new URL(page.url()).searchParams.get('startDate'),`${year}-01-01`);}
   checks.push({width,path,check:'home-dates-handoff',passed:true});
  }
  if(['/nos-services','/location-voiture-mre-maroc','/louer-voiture-maroc-faq-complete'].includes(path)){
   await click(page.getByRole('link',{name:'Choisir mes véhicules et mes dates',exact:true}).first());await page.waitForURL('**/louer?city=Casablanca');await page.locator('#catalogue-results h3').first().waitFor();await click(page.locator('#catalogue-results').getByRole('button',{name:'WhatsApp',exact:true}).first());await page.getByRole('button',{name:'Vérifier ma réservation',exact:true}).click();assert.equal(await page.getByRole('button',{name:'Réserver sur WhatsApp',exact:true}).count(),0);checks.push({width,path,check:'qualified-catalogue-request',passed:true});
  }
  if(width===390&&path==='/nos-services'){
   for(const target of ['/location-voiture-casablanca','/location-voiture-aeroport-casablanca','/location-voiture-gare-casa-voyageurs','/location-voiture-gare-oncf-maroc','/location-voiture-automatique-casablanca']){
    await visit(path);await click(page.getByRole('region',{name:'Choisir votre parcours de location',exact:true}).locator(`a[href="${target}"]`));await page.waitForURL(base+target);await page.getByRole('heading',{level:1}).waitFor();checks.push({width,path,target,check:'hub-destination',passed:true});
   }
  }
  assert.deepEqual(errors,[]);await context.close();console.log(`${width}px ${path}: validé`);
 }
 await fs.writeFile(`${out}/verification.json`,JSON.stringify({base,checks,realMessagesSent:0},null,2));console.log(JSON.stringify({passed:true,checks:checks.length,realMessagesSent:0}));
}finally{await browser.close();}
