import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE||'http://127.0.0.1:4319';
const b=await chromium.launch({...(process.env.TEST_CHROME_PATH?{executablePath:process.env.TEST_CHROME_PATH}:{}),headless:true});
try {
 const p=await b.newPage({serviceWorkers:'block'});p.setDefaultTimeout(20000);const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.abort());
 await p.addInitScript(()=>{window.open=url=>{window.__testWhatsApp=String(url);return {opener:null};};});
 await p.goto(base+'/prise-en-charge-casablanca-rabat',{waitUntil:'domcontentloaded'});
 await p.getByRole('heading',{level:1,name:'Votre voiture à l’arrivée à Casablanca'}).waitFor();
 assert.equal(await p.getByRole('link',{name:/Préparer une demande —/}).count(),8);
 const faq=await p.locator('script[type="application/ld+json"]').evaluateAll(es=>es.map(e=>JSON.parse(e.textContent)).find(x=>x['@type']==='FAQPage'));
 assert.equal(faq.mainEntity.length,8);
 for(const q of faq.mainEntity){await p.getByRole('heading',{name:q.name,exact:true}).waitFor();assert((await p.locator('body').innerText()).includes(q.acceptedAnswer.text));}
 await p.getByRole('link',{name:'Préparer une demande — Aéroport Mohammed V',exact:true}).click();
 await p.getByText('Point demandé : Aéroport Mohammed V — rendez-vous et frais à confirmer.',{exact:true}).waitFor();
 await p.goto(base+'/louer?city=Rabat&pickup=rba&startDate=2026-11-10&endDate=2026-11-17',{waitUntil:'domcontentloaded'});
 await p.getByText('24 véhicules affichés sur 50',{exact:true}).waitFor();
 await p.getByRole('button',{name:'WhatsApp',exact:true}).first().click();await p.waitForFunction(()=>Boolean(window.__testWhatsApp));
 const text=await p.evaluate(()=>new URL(window.__testWhatsApp).searchParams.get('text'));
 assert(text.includes('Aéroport Rabat-Salé')&&text.includes('frais depuis Casablanca'));
 await p.goto(base+'/louer?city=Casablanca&pickup=cmn&startDate=2026-11-10&endDate=2026-11-12',{waitUntil:'domcontentloaded'});
 await p.getByText('24 véhicules affichés sur 50',{exact:true}).waitFor();await p.getByRole('button',{name:'WhatsApp',exact:true}).first().click();await p.getByText('Choisissez vos dates',{exact:true}).waitFor();assert.equal(await p.evaluate(()=>window.__testWhatsApp),undefined);
 for(const path of ['/location-van-famille-maroc','/location-voiture-mariage-maroc','/vehicule/hyundai-staria']){
  await p.goto(base+path,{waitUntil:'domcontentloaded'});await p.getByRole('heading',{name:'Voitures de tourisme pour vos séjours — minimum trois jours'}).waitFor();assert.equal(await p.locator('meta[name=robots]').getAttribute('content'),'noindex,follow');
 }
 await p.goto(base+'/faq',{waitUntil:'domcontentloaded'});await p.getByRole('heading',{name:'Questions fréquentes — Casablanca et Rabat'}).waitFor();await p.getByText('Le site permet de préparer une demande, puis de la transmettre par WhatsApp.',{exact:false}).waitFor();
 await p.goto(base+'/',{waitUntil:'domcontentloaded'});await p.getByRole('heading',{level:1,name:/Casablanca/}).waitFor();assert(!/1200\+ avis|1,247 avis|1247 avis/.test(await p.locator('body').innerText()));
 assert.deepEqual(errors,[]);console.log('8 points d’arrivée, FAQ/JSON-LD cohérents, rendez-vous dans demande simulée, minimum 3 jours et offres exclues validés. Aucun envoi WhatsApp ni paiement.');
} finally {await b.close();}
