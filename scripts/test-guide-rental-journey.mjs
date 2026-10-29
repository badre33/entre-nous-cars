import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.TEST_BASE||'http://127.0.0.1:4319';
const out=process.env.TEST_OUTPUT_DIR||'../benatna-new-project/guides-casablanca-2026-10-29';
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const checks=[];
try {
for(const width of [320,390,1280]) for(const slug of ['prix-essence-gasoil-maroc-2026','peages-autoroute-maroc-tarifs-2026']) {
 const context=await browser.newContext({viewport:{width,height:900},serviceWorkers:'block'});
 await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`${base}/${slug}`,{waitUntil:'networkidle'});
 const consent=page.getByRole('region',{name:'Cookies publicitaires',exact:true});
 if(await consent.isVisible())await consent.getByRole('button',{name:'Refuser',exact:true}).click();
 const region=page.getByRole('complementary',{name:'Préparer une location à Casablanca'});await region.waitFor();
 assert.equal(await region.getByRole('link').count(),3);
 for(const url of ['/location-voiture-casablanca','/location-voiture-aeroport-casablanca','/location-voiture-gare-casa-voyageurs'])assert.equal(await region.locator(`a[href="${url}"]`).count(),1);
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 const schema=await page.locator('script[type="application/ld+json"]').allTextContents();
 assert(!schema.some(s=>s.includes('Tarif Standard')||s.includes('Réduction 10%')));
 const cta=page.getByRole('link',{name:'Choisir mes véhicules et mes dates'}).first();
 assert.equal(await cta.getAttribute('href'),'/louer?city=Casablanca');
 await region.scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/${slug}-${width}.png`});
 await cta.click();await page.waitForURL('**/louer?city=Casablanca');
 await page.getByRole('heading',{level:1}).waitFor();assert.equal(await page.locator('main').count()>0,true);
 assert.deepEqual(errors,[]);checks.push({slug,width,passed:true});await context.close();
}
await fs.writeFile(`${out}/verification.json`,JSON.stringify({base,checks,realWhatsAppMessages:0},null,2));console.log(JSON.stringify({passed:true,checks:checks.length}));
}finally{await browser.close();}
