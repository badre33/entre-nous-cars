import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.TEST_BASE||'http://127.0.0.1:4319';
const out=process.env.TEST_OUTPUT_DIR||'../benatna-new-project/meta-consent-2026-10-29';
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.TEST_CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const checks=[];const key='benatna_advertising_consent_v1';const canary='PRIVATE_CANARY_9821';
try {
for(const width of [320,390,1280]){
 const c=await browser.newContext({viewport:{width,height:900},serviceWorkers:'block'});const hits=[];const errors=[];
 await c.addInitScript(()=>{window.open=()=>({closed:false});});
 await c.route('**/*',async r=>{
  const u=new URL(r.request().url());
  if(u.hostname==='www.facebook.com'&&u.pathname==='/tr/') {hits.push({url:u.toString(),headers:r.request().headers()});return r.fulfill({status:200,contentType:'image/gif',body:Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7','base64')});}
  if(u.origin===new URL(base).origin)return r.continue();
  if(u.hostname.endsWith('.supabase.co'))return r.fulfill({status:200,contentType:'application/json',headers:{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*'},body:'null'});
  return r.abort();
 });
 const p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base+'/?email='+canary+'#'+canary,{waitUntil:'networkidle'});
 const banner=p.getByRole('region',{name:'Cookies publicitaires',exact:true});await banner.waitFor();
 assert.equal(hits.length,0);assert.equal(await p.locator('link[href*="connect.facebook.net"]').count(),0);
 assert(await banner.getByRole('button',{name:'Accepter',exact:true}).isVisible());
 assert(await banner.getByRole('button',{name:'Refuser',exact:true}).isVisible());
 assert(await banner.evaluate(e=>e.scrollWidth<=e.clientWidth));
 await banner.getByRole('button',{name:'Refuser',exact:true}).click();
 await p.reload({waitUntil:'networkidle'});assert.equal(hits.length,0);assert.equal(await banner.count(),0);
 await p.getByRole('button',{name:'Cookies publicitaires',exact:true}).click();await banner.getByRole('button',{name:'Accepter',exact:true}).click();
 await p.waitForTimeout(150);assert.equal(hits.length,1);assert.equal(new URL(hits[0].url).searchParams.get('ev'),'PageView');
 await p.getByRole('button',{name:'Préparer une demande de location',exact:true}).click();
 await p.getByLabel('Véhicule souhaité',{exact:true}).selectOption('Renault Clio');
 const year=new Date().getFullYear()+1;
 await p.getByLabel('Date de départ de la demande',{exact:true}).fill(`${year}-01-01`);
 await p.getByLabel('Date de retour de la demande',{exact:true}).fill(`${year}-01-04`);
 await p.getByRole('dialog').getByLabel('Ville de prise en charge',{exact:true}).selectOption('Casablanca');
 await p.getByLabel('Lieu de prise en charge',{exact:true}).selectOption('other');
 await p.getByLabel('Adresse précise de prise en charge',{exact:true}).fill(canary);
 await p.getByRole('button',{name:'Vérifier ma demande',exact:true}).click();
 assert.equal(hits.length,1);
 await p.getByRole('checkbox',{name:'Je confirme mes dates, mon véhicule et mon lieu de prise en charge.',exact:true}).check();
 await p.getByRole('button',{name:'Confirmer et ouvrir WhatsApp',exact:true}).click();await p.waitForTimeout(150);
 assert.equal(hits.filter(h=>new URL(h.url).searchParams.get('ev')==='WhatsAppOpened').length,1);
 for(const h of hits){const u=new URL(h.url);assert.equal(u.searchParams.get('id'),'302125897604671');assert.equal(u.searchParams.get('dl'),'https://benatna.ma/');assert(!JSON.stringify(h).includes(canary));assert(!h.headers.referer);assert.deepEqual([...u.searchParams.keys()].sort(),['dl','ev','id','noscript','ts']);}
 const before=hits.length;await p.goto(base+'/auth?email='+canary,{waitUntil:'networkidle'});await p.waitForTimeout(150);assert.equal(hits.length,before);assert.equal(await banner.count(),0);
 await p.goto(base+'/louer?startDate='+year+'-01-01&notes='+canary,{waitUntil:'networkidle'});assert.equal(new URL(hits.at(-1).url).searchParams.get('dl'),'https://benatna.ma/louer');
 await p.getByRole('button',{name:'Cookies publicitaires',exact:true}).click();await banner.getByRole('button',{name:'Refuser',exact:true}).click();const stopped=hits.length;
 await p.evaluate(()=>window.dispatchEvent(new CustomEvent('benatna:whatsapp-handoff')));await p.reload({waitUntil:'networkidle'});assert.equal(hits.length,stopped);
 await p.getByRole('button',{name:'Cookies publicitaires',exact:true}).click();await p.screenshot({path:out+`/consent-${width}.png`,fullPage:false});
 assert.deepEqual(errors,[]);checks.push({width,passed:true,metaRequests:hits.length,checks:['no request before consent','refusal persists','safe page URL only','real confirmed WhatsApp handoff once','no form text or dates','no referrer','no private page event','withdrawal stops future requests','responsive controls']});await c.close();
}
// Expired consent and blocked storage must fail closed before any Meta request.
for (const mode of ['expired', 'blocked']) {
 const c=await browser.newContext({serviceWorkers:'block'});let requests=0;
 await c.addInitScript(({mode,key})=>{
  if(mode==='expired')localStorage.setItem(key,JSON.stringify({choice:'accepted',at:Date.now()-181*86400000}));
  else {const get=Storage.prototype.getItem;const set=Storage.prototype.setItem;Storage.prototype.getItem=function(k){if(k===key)throw new Error('Storage blocked');return get.call(this,k);};Storage.prototype.setItem=function(k,v){if(k===key)throw new Error('Storage blocked');return set.call(this,k,v);};}
 },{mode,key});
 await c.route('**/*',r=>{const u=new URL(r.request().url());if(u.hostname==='www.facebook.com')requests++;return u.origin===new URL(base).origin?r.continue():r.abort();});
 const p=await c.newPage();await p.goto(base+'/',{waitUntil:'networkidle'});await p.getByRole('region',{name:'Cookies publicitaires',exact:true}).waitFor();assert.equal(requests,0);
 checks.push({mode,passed:true});await c.close();
}
await fs.writeFile(out+'/tests.json',JSON.stringify({base,checks,realMetaEvents:0,realWhatsAppMessages:0},null,2));console.log(JSON.stringify({passed:true,formats:3,additionalPrivacyChecks:2,realMetaEvents:0}));
}finally{await browser.close();}
