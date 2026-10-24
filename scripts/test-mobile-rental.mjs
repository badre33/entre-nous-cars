import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base = process.env.TEST_BASE || 'http://127.0.0.1:4319';
const output = process.env.TEST_OUTPUT_DIR || '/tmp/benatna-mobile';
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({headless:true, executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
try {
  for (const [width,height] of [[320,568],[360,640],[390,844],[390,400]]) {
    const page = await browser.newPage({viewport:{width,height},serviceWorkers:'block'});
    await page.route('**/*', r => new URL(r.request().url()).origin === base ? r.continue() : r.abort());
    await page.addInitScript(() => { window.__outbound=[];window.open=url=>{window.__outbound.push(String(url));return {opener:null};}; });
    await page.goto(base+'/louer');
    await page.locator('#catalogue-results h3').first().waitFor();
    for (const index of [0,2,4]) await page.locator('#catalogue-results [role=checkbox]').nth(index).locator('..').click();
    await page.waitForTimeout(400);
    assert.equal(await page.getByRole('button',{name:'Contacter via WhatsApp',exact:true}).count(),0,'no duplicate floating CTA');
    const action=page.getByRole('button',{name:/Envoyer sur WhatsApp/});
    const rect=await action.boundingBox();
    const nav=await page.getByRole('navigation',{name:'Navigation mobile principale'}).boundingBox();
    assert(rect.x>=0 && rect.x+rect.width<=width && rect.y+rect.height<=nav.y,'CTA fits above navigation');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'no page overflow');
    if(height>500) await page.screenshot({path:`${output}/catalogue-${width}.png`});
    await action.click();
    const dialog=page.getByRole('dialog');
    await page.waitForTimeout(300);
    assert.equal(await page.locator('select[aria-label^="Véhicule souhaité"]').count(),3);
    const close=dialog.getByRole('button',{name:'Fermer',exact:true});
    const closeRect=await close.boundingBox();assert(closeRect.width>=44 && closeRect.height>=44,'44px close target');
    await page.getByLabel('Date de départ de la demande',{exact:true}).fill('2027-01-01');
    await page.getByLabel('Date de retour de la demande',{exact:true}).fill('2027-01-04');
    await page.getByLabel('Lieu de prise en charge',{exact:true}).selectOption('cmn');
    await page.getByRole('button',{name:'Vérifier ma demande',exact:true}).click();
    for(const name of ['Renault Clio','Dacia Duster','Volkswagen Golf'])assert((await dialog.innerText()).includes(name));
    const confirm=page.getByRole('button',{name:'Confirmer et ouvrir WhatsApp',exact:true});assert(await confirm.isDisabled());
    await page.getByRole('checkbox',{name:/Je confirme mes dates/}).check();
    await confirm.scrollIntoViewIfNeeded();
    assert(await dialog.evaluate(e=>e.scrollWidth<=e.clientWidth),'no dialog overflow');
    await page.screenshot({path:`${output}/confirmation-${width}-${height}.png`});
    await confirm.click();
    const urls=await page.evaluate(()=>window.__outbound);assert.equal(urls.length,1);assert.equal(new URL(urls[0]).pathname,'/212699024526');
    for(const name of ['Renault Clio','Dacia Duster','Volkswagen Golf'])assert(new URL(urls[0]).searchParams.get('text').includes(name));
    await page.close();console.log(`${width}x${height}: navigation, CTA unique, formulaire, 3 modèles et confirmation OK (envoi simulé).`);
  }
} finally {await browser.close();}
