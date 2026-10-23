import {chromium} from 'playwright';import assert from 'node:assert/strict';import fs from 'node:fs/promises';
const base=process.env.TEST_BASE||'http://127.0.0.1:4319';const output=process.env.TEST_OUTPUT_DIR||'/tmp/benatna-multiple';await fs.mkdir(output,{recursive:true});
const expected=['Renault Clio','Dacia Duster','Volkswagen Golf'];
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
async function selected(page){return page.locator('select[aria-label^="Véhicule souhaité"]').evaluateAll(els=>els.flatMap(e=>e.value.split('|')).filter(Boolean));}
async function chooseThree(page){await page.goto(base+'/louer');await page.locator('#catalogue-results h3').first().waitFor();for(const i of [0,2,4])await page.locator('#catalogue-results [role=checkbox]').nth(i).locator('..').click();}
try{for(const width of [390,1280]){
 const page=await browser.newPage({viewport:{width,height:900},serviceWorkers:'block'});
 await page.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.abort());
 await page.addInitScript(()=>{window.__outbound=[];window.open=url=>{window.__outbound.push(String(url));return {opener:null};};});
 await chooseThree(page);
 if(width===390)await page.getByRole('button',{name:'Contacter via WhatsApp',exact:true}).click();else{await page.waitForTimeout(350);await page.getByRole('button',{name:/Envoyer sur WhatsApp/}).click();}
 assert.deepEqual(await selected(page),expected,'all three selected models must enter the request');
 const year=new Date().getFullYear()+1;await page.getByLabel('Date de départ de la demande',{exact:true}).fill(`${year}-01-01`);await page.getByLabel('Date de retour de la demande',{exact:true}).fill(`${year}-01-04`);await page.getByLabel('Lieu de prise en charge',{exact:true}).selectOption('cmn');
 await page.getByRole('button',{name:'Vérifier ma demande',exact:true}).click();for(const model of expected)assert((await page.getByRole('dialog').innerText()).includes(model));
 await page.getByRole('checkbox',{name:/Je confirme mes dates/}).check();await page.getByRole('button',{name:'Confirmer et ouvrir WhatsApp',exact:true}).click();
 const messages=await page.evaluate(()=>window.__outbound);assert.equal(messages.length,1);const text=new URL(messages[0]).searchParams.get('text');for(const model of expected)assert(text.includes(model),model+' must be in final WhatsApp text');
 // A detail-page button must preserve the same active three-model selection.
 await page.goto(base+'/louer'); // page navigation resets comparison; select again.
 for(const i of [0,2,4])await page.locator('#catalogue-results [role=checkbox]').nth(i).locator('..').click();
 await page.locator('#catalogue-results h3').first().click();await page.getByRole('button',{name:'Réserver ce véhicule',exact:true}).click();assert.deepEqual(await selected(page),expected,'detail handoff preserves selected models');
 await page.screenshot({path:output+`/multiple-${width}.png`});await page.close();console.log(`${width}: three selected models preserved in form, review, WhatsApp URL and detail handoff; no real message sent.`);
}}finally{await browser.close();}
