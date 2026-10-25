import {chromium} from 'playwright';import assert from 'node:assert/strict';import fs from 'node:fs/promises';
const base=process.env.TEST_BASE||'http://127.0.0.1:4319',output=process.env.TEST_OUTPUT_DIR||'/tmp/benatna-comparison-images';await fs.mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
try{for(const [width,deviceScaleFactor] of [[320,2],[390,1],[1280,1]]){
 const page=await browser.newPage({viewport:{width,height:844},deviceScaleFactor,serviceWorkers:'block'});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());
 for(const route of ['/comparatifs','/comparatif/location-courte-duree-vs-longue-duree-maroc']){
  await page.goto(base+route);await page.locator('main h1').waitFor();const imgs=page.locator('main img');assert(await imgs.count()>=2);
  for(const img of await imgs.all()){await img.scrollIntoViewIfNeeded();const state=await img.evaluate(async e=>{await e.decode();return {width:e.naturalWidth,src:e.currentSrc,srcset:e.srcset};});assert(state.width>0);if(state.srcset)assert(/responsive\/.*-(480|960)\.webp/.test(state.src),'responsive vehicle file selected');}
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  if(route.includes('/comparatif/')){const text=await page.locator('main').innerText();assert(text.includes('trois jours')&&text.includes('six mois'));assert(!/365|12 mois|30-50|Mariages|Missions professionnelles|remboursement du différentiel|1-6 jours/.test(text));const faqs=await page.locator('script[type="application/ld+json"]').evaluateAll(els=>els.map(e=>JSON.parse(e.textContent)).filter(x=>x['@type']==='FAQPage'));assert.equal(faqs.length,1);for(const item of faqs[0].mainEntity)assert(text.includes(item.acceptedAnswer.text));}
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:`${output}/${route.replaceAll('/','_')}-${width}.png`});
 }
 assert.deepEqual(errors,[]);console.log(`${width}px DPR${deviceScaleFactor}: images décodées, variantes480/960 sélectionnées, pages sans débordement et durée3jours/6mois cohérente.`);await page.close();
}}finally{await browser.close();}
