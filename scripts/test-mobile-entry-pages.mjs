import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.TEST_BASE||'http://127.0.0.1:4319';const output=process.env.TEST_OUTPUT_DIR||'/tmp/benatna-entry-after';await fs.mkdir(output,{recursive:true});
const routes=['/','/location-voiture-casablanca','/location-voiture-aeroport-casablanca','/location-voiture-gare-casa-voyageurs','/prise-en-charge-casablanca-rabat'];
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const future=new Date();future.setDate(future.getDate()+65);const start=future.toISOString().slice(0,10);future.setDate(future.getDate()+3);const end=future.toISOString().slice(0,10);
try{for(const width of [320,390,1280]){
 const page=await browser.newPage({viewport:{width,height:844},serviceWorkers:'block'});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.abort());
 for(const route of routes){await page.goto(base+route);await page.locator('h1').waitFor();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no overflow '+route);if(width===320||width===390)await page.screenshot({path:`${output}/${width}-${route.replaceAll('/','')||'home'}.png`});}
 await page.goto(base);const form=page.getByRole('form',{name:'Rechercher une voiture'});
 assert.equal(await form.locator('input[type=time]').count(),0);assert.equal(await form.locator('input[type=date]').count(),2);
 await form.getByLabel('Date de départ',{exact:true}).fill(start);await form.getByLabel('Date de retour',{exact:true}).fill(end);
 const input=form.getByLabel('Date de départ',{exact:true});assert(!(await input.getAttribute('max')),'no artificial 30-day limit');
 const short=new Date(start);short.setDate(short.getDate()+2);
 await form.getByLabel('Date de retour',{exact:true}).fill(short.toISOString().slice(0,10));await form.getByRole('button',{name:'Rechercher',exact:true}).click();assert((await form.getByRole('alert').innerText()).includes('3 jours'));assert.equal(new URL(page.url()).pathname,'/');
 const tooLong=new Date(start);tooLong.setFullYear(tooLong.getFullYear()+1);await form.getByLabel('Date de retour',{exact:true}).fill(tooLong.toISOString().slice(0,10));await form.getByRole('button',{name:'Rechercher',exact:true}).click();assert((await form.getByRole('alert').innerText()).includes('6 mois'));assert.equal(new URL(page.url()).pathname,'/');await form.getByLabel('Date de retour',{exact:true}).fill(end);
 const city=form.getByLabel('Ville de prise en charge',{exact:true});await city.selectOption('Rabat');
 await form.getByRole('button',{name:'Rechercher',exact:true}).click();await page.waitForURL('**/louer?**');const url=new URL(page.url());assert.equal(url.searchParams.get('startDate'),start);assert.equal(url.searchParams.get('endDate'),end);assert.equal(url.searchParams.get('city'),'Rabat');assert(!url.searchParams.has('startTime'),'no appointment time imposed');
 for(const [route,pickup] of [['/location-voiture-aeroport-casablanca','cmn'],['/location-voiture-gare-casa-voyageurs','casa-voyageurs']]){
  await page.goto(base+route);await page.getByRole('link',{name:'Voir les modèles et prix journaliers indicatifs',exact:true}).click();await page.waitForURL('**/louer?**');assert.equal(new URL(page.url()).searchParams.get('pickup'),pickup);
  await page.locator('#catalogue-results').getByRole('button',{name:'WhatsApp',exact:true}).first().click();assert.equal(await page.getByLabel('Lieu de prise en charge',{exact:true}).inputValue(),pickup);await page.getByRole('button',{name:'Fermer',exact:true}).click();
 }
 await page.goto(base+'/prise-en-charge-casablanca-rabat');const links=await page.locator('main a[href*="pickup="]').evaluateAll(es=>es.map(e=>e.getAttribute('href')));assert.equal(links.length,8);for(const href of links){const u=new URL(href,base);assert(['Casablanca','Rabat'].includes(u.searchParams.get('city')));assert(u.searchParams.get('pickup'));}
 if(width<768){await page.goto(base);assert.equal(await page.getByRole('button',{name:'Préparer une demande de location',exact:true}).count(),1,'single visible rental action on mobile home');const form=page.getByRole('form',{name:'Rechercher une voiture'});await form.getByLabel('Date de départ',{exact:true}).fill(start);await form.getByLabel('Date de retour',{exact:true}).fill(end);await form.getByRole('button',{name:'Préparer une demande de location',exact:true}).click();assert.equal(await page.getByLabel('Date de départ de la demande',{exact:true}).inputValue(),start);assert.equal(await page.getByLabel('Date de retour de la demande',{exact:true}).inputValue(),end);}
 assert.deepEqual(errors,[]);console.log(`${width}px: 5 pages sans débordement, recherche à +65 jours sans heure imposée, lieux CMN/Casa-Voyageurs conservés et 8 points du guide validés.`);await page.close();
}}finally{await browser.close();}
