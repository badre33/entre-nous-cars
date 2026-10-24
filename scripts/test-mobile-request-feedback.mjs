import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.TEST_BASE||'http://127.0.0.1:4319';
const output=process.env.TEST_OUTPUT_DIR||'/tmp/benatna-request-feedback';
await fs.mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const year=new Date().getFullYear()+1;
const start=`${year}-01-01`, end=`${year}-01-04`;
const address='Adresse '+ 'x'.repeat(180);
async function focusedAndVisible(page,locator){
 await page.waitForFunction(()=>document.activeElement?.matches('[role=alert],h2[tabindex="-1"]'));
 assert(await locator.evaluate(e=>document.activeElement===e),'feedback receives focus');
 const box=await locator.boundingBox(),dialog=await page.getByRole('dialog').boundingBox();
 assert(box.y>=dialog.y&&box.y+box.height<=dialog.y+dialog.height,'feedback is visible inside dialog');
}
try {
 for(const [width,height] of [[320,568],[390,400],[768,700],[1280,900]]){
  const page=await browser.newPage({viewport:{width,height},serviceWorkers:'block'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());
  await page.addInitScript(()=>{window.__blocked=true;window.__outbound=[];window.open=url=>{if(window.__blocked)return null;window.__outbound.push(String(url));return {opener:null};};});
  await page.goto(base+'/');
  await page.getByRole('button',{name:'Préparer une demande de location',exact:true}).click();
  const dialog=page.getByRole('dialog');
  await dialog.getByLabel('Véhicule souhaité',{exact:true}).selectOption('Renault Clio');
  await dialog.getByRole('button',{name:'Ajouter un véhicule (3 maximum)',exact:true}).click();
  await dialog.getByLabel('Véhicule souhaité 2',{exact:true}).selectOption('Dacia Duster');
  await dialog.getByRole('button',{name:'Ajouter un véhicule (3 maximum)',exact:true}).click();
  await dialog.getByLabel('Véhicule souhaité 3',{exact:true}).selectOption('Volkswagen Golf');
  await dialog.getByLabel('Date de départ de la demande',{exact:true}).fill(start);
  await dialog.getByLabel('Date de retour de la demande',{exact:true}).fill(`${year}-01-03`);
  await dialog.getByLabel('Lieu de prise en charge',{exact:true}).selectOption('other');
  await dialog.getByLabel('Adresse précise de prise en charge').fill(address);
  await dialog.getByRole('button',{name:'Vérifier ma demande',exact:true}).click();
  await focusedAndVisible(page,dialog.getByRole('alert'));
  await page.screenshot({path:`${output}/erreur-${width}.png`});
  await dialog.getByLabel('Date de retour de la demande',{exact:true}).fill(end);
  await dialog.getByRole('button',{name:'Vérifier ma demande',exact:true}).click();
  await focusedAndVisible(page,dialog.getByRole('heading',{name:'Vérifiez votre demande',exact:true}));
  assert(await dialog.evaluate(e=>e.scrollWidth<=e.clientWidth),'long address does not overflow');
  await page.screenshot({path:`${output}/recapitulatif-${width}.png`});
  await dialog.getByRole('checkbox',{name:/Je confirme mes dates/}).check();
  for(let attempt=0;attempt<2;attempt++){
   await dialog.getByRole('button',{name:'Confirmer et ouvrir WhatsApp',exact:true}).click();
   await focusedAndVisible(page,dialog.getByRole('alert'));
   assert((await dialog.locator('dl').innerText()).includes(address),'blocked opening retains address');
   assert.equal(await page.evaluate(()=>window.__outbound.length),0);
  }
  await dialog.getByRole('button',{name:'Modifier ma demande',exact:true}).click();
  await focusedAndVisible(page,dialog.getByRole('heading',{name:'Préparer ma demande de location',exact:true}));
  assert.equal(await dialog.getByLabel('Date de départ de la demande',{exact:true}).inputValue(),start);
  assert.equal(await dialog.getByLabel('Adresse précise de prise en charge').inputValue(),address);
  await dialog.getByLabel('Lieu de prise en charge',{exact:true}).selectOption('cmn');
  await dialog.getByRole('button',{name:'Vérifier ma demande',exact:true}).click();
  assert.equal(await dialog.getByRole('checkbox',{name:/Je confirme mes dates/}).isChecked(),false);
  assert(await dialog.getByRole('button',{name:'Confirmer et ouvrir WhatsApp',exact:true}).isDisabled());
  await dialog.getByRole('checkbox',{name:/Je confirme mes dates/}).check();
  await page.evaluate(()=>{window.__blocked=false;});
  await dialog.getByRole('button',{name:'Confirmer et ouvrir WhatsApp',exact:true}).click();
  const urls=await page.evaluate(()=>window.__outbound);assert.equal(urls.length,1);
  const url=new URL(urls[0]),text=url.searchParams.get('text');assert.equal(url.pathname,'/212699024526');
  for(const model of ['Renault Clio','Dacia Duster','Volkswagen Golf'])assert(text.includes(model));
  assert(text.includes(`01/01/${year}`)&&text.includes(`04/01/${year}`)&&text.includes('Mohammed'));
  assert.deepEqual(errors,[]);
  console.log(`${width}×${height}: erreur visible et focalisée, récapitulatif sans débordement, deux ouvertures bloquées sans perte, modification et trois modèles conservés.`);
  await page.close();
 }
}finally{await browser.close();}
