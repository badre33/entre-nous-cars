import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.TEST_BASE||'http://127.0.0.1:4319';
const output=process.env.TEST_OUTPUT_DIR||'/tmp/benatna-support-guides';
const paths=['/prix-location-voiture-maroc-2026','/caution-location-voiture-maroc','/prise-en-charge-casablanca-rabat'];
await fs.mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const checks=[];
try {
 for(const width of [320,390,1280]) {
  const context=await browser.newContext({viewport:{width,height:900},serviceWorkers:'block'});
  await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const visit=async path=>{await page.goto(base+path,{waitUntil:'load',timeout:60000});await page.getByRole('heading',{level:1}).waitFor();const consent=page.getByRole('region',{name:'Cookies publicitaires',exact:true});if(await consent.isVisible())await consent.getByRole('button',{name:'Refuser',exact:true}).click();};
  const click=async locator=>{await locator.evaluate(e=>e.scrollIntoView({block:'center'}));await locator.click();};
  for(const path of paths) {
   await visit(path);assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://benatna.ma'+path);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   const body=await page.locator('body').innerText();
   const schemas=(await page.locator('script[type="application/ld+json"]').allTextContents()).map(s=>JSON.parse(s));
   const faq=schemas.find(s=>s['@type']==='FAQPage');assert(faq?.mainEntity.length>0);
   for(const q of faq.mainEntity){assert(body.includes(q.name));assert(body.includes(q.acceptedAnswer.text));}
   if(path!==paths[2]){
    const main=await page.locator('main').innerText();assert(!/Caution zéro|3-5 jours|12 mois|Marrakech|Wafacash|Cash Plus|7500|7 500/.test(main));
    const journey=page.getByRole('complementary',{name:'Préparer une location à Casablanca',exact:true});assert.equal(await journey.getByRole('link').count(),3);
    assert.equal(await page.getByRole('link',{name:'Choisir mes véhicules et mes dates',exact:true}).first().getAttribute('href'),'/louer?city=Casablanca');
   }else {
    assert.equal(await page.locator('main a[href*="pickup="]').count(),8);
    await page.getByRole('region',{name:'Prix, caution et choix du véhicule',exact:true}).waitFor();
   }
   if(width===390)await page.screenshot({path:`${output}/${path.slice(1)}-390.png`,fullPage:true});
   checks.push({path,width,check:'content-faq-canonical-links-mobile',passed:true});
  }
  for(const path of paths.slice(0,2)) {
   await visit(path);await click(page.getByRole('link',{name:'Choisir mes véhicules et mes dates',exact:true}).first());await page.waitForURL('**/louer?city=Casablanca');
   await page.locator('#catalogue-results h3').first().waitFor();await click(page.locator('#catalogue-results').getByRole('button',{name:'WhatsApp',exact:true}).first());
   await page.getByRole('button',{name:'Vérifier ma demande',exact:true}).click();
   assert.equal(await page.getByRole('button',{name:'Confirmer et ouvrir WhatsApp',exact:true}).count(),0);
   checks.push({path,width,check:'guide-to-qualified-request',passed:true});
  }
  for(const [city,pickup] of [['Casablanca','cmn'],['Rabat','rabat-agdal']]){
   await visit(paths[2]);await click(page.locator(`main a[href="/louer?city=${city}&pickup=${pickup}"]`));await page.waitForURL('**/louer?**');
   await page.locator('#catalogue-results h3').first().waitFor();await click(page.locator('#catalogue-results').getByRole('button',{name:'WhatsApp',exact:true}).first());
   assert.equal(await page.getByLabel('Lieu de prise en charge',{exact:true}).inputValue(),pickup);
   checks.push({width,pickup,check:'pickup-preserved-in-request',passed:true});
  }
  if(width===390){
   await visit(paths[0]);const guide=await page.locator('main').innerText();
   for(const [slug,name] of [['renault-clio','Renault Clio'],['dacia-duster','Dacia Duster'],['vw-golf','Volkswagen Golf'],['hyundai-tucson','Hyundai Tucson']]){
    const guidePrice=guide.match(new RegExp(name+' : (\\d+) DH/jour'));assert(guidePrice);
    await visit('/vehicule/'+slug);const detail=(await page.locator('body').innerText()).match(/(\d+)\s*DH\/jour/);assert(detail);assert.equal(detail[1],guidePrice[1],name+' price stays consistent');
    assert(await page.locator('a[href="/caution-location-voiture-maroc"]').count()>0);assert(await page.locator('a[href="/prix-location-voiture-maroc-2026"]').count()>0);
    checks.push({slug,width,check:'guide-detail-price-consistency-and-return-links',passed:true});
   }
  }
  assert.deepEqual(errors,[]);await context.close();console.log(`${width}px: guides, demandes qualifiées et points de remise validés.`);
 }
 await fs.writeFile(`${output}/verification.json`,JSON.stringify({base,checks,realMessagesSent:0},null,2));console.log(JSON.stringify({passed:true,checks:checks.length,realMessagesSent:0}));
}finally{await browser.close();}
