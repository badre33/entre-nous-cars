import { chromium } from 'playwright';import assert from 'node:assert/strict';import fs from 'node:fs/promises';
const base=process.env.TEST_BASE||'http://127.0.0.1:4319';const project='ojbdzmrpbhoibqvoejbj';const checks=[];const pass=name=>checks.push({name,passed:true});
const evidence='docs/acquisition/2026-10-22/evidence';await fs.mkdir(evidence,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.TEST_CHROME_PATH?{executablePath:process.env.TEST_CHROME_PATH}:process.platform==='darwin'?{executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'}:{})});
const canary='PRIVATE_CANARY_881122';const syntheticUser='00000000-0000-0000-0000-000000000001';
async function contextFor(actor='public'){
 const context=await browser.newContext({serviceWorkers:'block'});const events=[];const calls=[];const vendors=[];let leads=[];let privateReads=0;let patches=0;
 await context.addInitScript(({actor,project,syntheticUser})=>{
  window.__openCalls=[];window.open=(url)=>{window.__openCalls.push(String(url));return {closed:false,location:{href:''},close(){}};};
  if(actor!=='public'){
   const userId=actor==='user'?syntheticUser.replace(/1$/,'2'):syntheticUser;const exp=Math.floor(Date.now()/1000)+3600;const encode=value=>btoa(JSON.stringify(value)).replaceAll('+','-').replaceAll('/','_').replaceAll('=','');const token=encode({alg:'HS256',typ:'JWT'})+'.'+encode({sub:userId,role:'authenticated',exp,iss:'synthetic-test'})+'.synthetic_signature';
   localStorage.setItem(`sb-${project}-auth-token`,JSON.stringify({access_token:token,refresh_token:'synthetic_refresh_token',expires_at:exp,expires_in:3600,token_type:'bearer',user:{id:userId,aud:'authenticated',role:'authenticated',email:'synthetic@example.test',app_metadata:{provider:'email'},user_metadata:{},created_at:'2026-01-01T00:00:00Z'}}));
  }
 },{actor,project,syntheticUser});
 await context.route('**/*',async route=>{
  const request=route.request();const url=new URL(request.url());if(url.origin===base)return route.continue();
  if(/googletagmanager|google-analytics|connect.facebook|facebook.com\/tr|vercel-insights/.test(request.url()))vendors.push(url.hostname+url.pathname);
  if(url.hostname!==project+'.supabase.co')return route.abort();
  const cors={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'GET,POST,PATCH,DELETE,OPTIONS','Access-Control-Expose-Headers':'content-range'};
  if(request.method()==='OPTIONS')return route.fulfill({status:204,headers:cors});
  const body=request.postDataJSON?.();calls.push({path:url.pathname,method:request.method()});
  const json=(data,headers={})=>route.fulfill({status:200,contentType:'application/json',headers:{...cors,...headers},body:JSON.stringify(data)});
  if(url.pathname.endsWith('/rpc/insert_analytics_event')){events.push(body);return json('11111111-1111-4111-8111-111111111111');}
  if(url.pathname.endsWith('/rpc/touch_analytics_session'))return json(null);
  if(url.pathname.endsWith('/rpc/has_role'))return json(actor.startsWith('admin'));
  if(url.pathname==='/auth/v1/user')return json({id:syntheticUser,aud:'authenticated',email:'synthetic@example.test'});
  if(url.pathname==='/rest/v1/rental_requests'){
   if(!actor.startsWith('admin'))return route.fulfill({status:403,contentType:'application/json',body:JSON.stringify({message:'Synthetic RLS denial'})});
   if(request.method()==='POST'){
    const row={...body,id:'22222222-2222-4222-8222-222222222222',created_at:new Date().toISOString(),updated_at:new Date().toISOString(),loss_reason:null,email:null,source_page:null,source_page_title:null,utm_medium:null,utm_source:null,utm_campaign:null,...body};leads.unshift(row);return json([{id:row.id}]);
   }
   if(request.method()==='PATCH'){patches++;const id=(url.searchParams.get('id')||'').replace(/^eq\./,'');const row=leads.find(l=>l.id===id);if(!row)return json([]);Object.assign(row,body,{updated_at:new Date().toISOString()});return json([{id}]);}
   privateReads++;let rows=leads;const status=url.searchParams.get('status');if(status)rows=rows.filter(l=>l.status===status.replace(/^eq\./,''));const count=rows.length;const start=Number(url.searchParams.get('offset')||0);rows=rows.slice(start,start+Number(url.searchParams.get('limit')||25));return json(rows,actor==='admin_count_missing'?{}:{'Content-Range':`${start}-${Math.max(start,start+rows.length-1)}/${count}`});
  }
  return json([]);
 });
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 return {context,page,events,calls,vendors,errors,getLeads:()=>leads,getPrivateReads:()=>privateReads,getPatches:()=>patches};
}
async function qualify(page) {
 await page.getByLabel('Véhicule souhaité',{exact:true}).selectOption('Renault Clio');
 await page.getByLabel('Date de départ de la demande',{exact:true}).fill('2027-01-01');
 await page.getByLabel('Date de retour de la demande',{exact:true}).fill('2027-01-04');
 await page.getByLabel('Ville de prise en charge',{exact:true}).selectOption('Casablanca');
 await page.getByLabel('Lieu de prise en charge',{exact:true}).selectOption('cmn');
 await page.getByRole('button',{name:'Vérifier ma demande',exact:true}).click();
 await page.getByRole('checkbox',{name:'Je confirme mes dates, mon véhicule et mon lieu de prise en charge.',exact:true}).check();
 await Promise.all([page.waitForResponse(r=>r.url().includes('/rpc/insert_analytics_event')&&r.request().postDataJSON().p_event_name==='whatsapp_handoff'),page.getByRole('button',{name:'Confirmer et ouvrir WhatsApp',exact:true}).click()]);
}
try{
 const publicTest=await contextFor();const {page,events}=publicTest;
 await page.goto(base+'/location-voiture-casablanca?utm_source=instagram&utm_medium=organic_social&utm_campaign=casa_arrivee_2026q4&utm_content=carrousel_etapes_v1&email='+canary,{waitUntil:'networkidle'});
 await page.getByRole('button',{name:'Préparer une demande de location',exact:true}).click();
 assert.equal(events.filter(e=>e.p_event_name==='whatsapp_handoff').length,0);pass('opening_widget_is_not_a_handoff');
 await qualify(page);
 assert.equal(events.filter(e=>e.p_event_name==='whatsapp_handoff').length,1);assert.equal(await page.evaluate(()=>window.__openCalls.length),1);assert((await page.evaluate(()=>new URL(window.__openCalls[0]).searchParams.get('text'))).includes('[C01]'));pass('one_widget_gesture_one_handoff_with_campaign_code');
 assert(!JSON.stringify(events).includes(canary));assert(!JSON.stringify(events).includes('synthetic@example.test'));assert(!JSON.stringify(events).includes('0600000000'));assert(!events.some(e=>e.p_event_name==='whatsapp_message_sent'));pass('no_message_phone_email_or_free_url_in_analytics');
 await page.getByRole('link',{name:'Toutes les questions',exact:true}).click();await page.waitForURL(base+'/faq');await page.getByRole('heading',{name:'Questions fréquentes — Casablanca et Rabat',exact:true}).waitFor();await page.waitForFunction(()=>document.querySelector('link[rel=canonical]')?.getAttribute('href')==='https://benatna.ma/faq',null,{timeout:5000});assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('benatna_campaign_attribution_v1')).last.campaign),'casa_arrivee_2026q4');assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://benatna.ma/faq');pass('campaign_survives_internal_navigation_without_query_or_canonical_pollution');
 const before=events.filter(e=>e.p_event_name==='whatsapp_handoff').length;
 await page.evaluate(()=>{const a=document.createElement('a');a.id='measurement-double-route';a.href='https://wa.me/212699024526?text=synthetic';a.textContent='Synthetic dual-path handoff';a.addEventListener('click',()=>window.open(a.href,'_blank'));document.body.append(a);document.addEventListener('click',e=>{if(e.target instanceof Element&&e.target.id==='measurement-double-route')e.preventDefault();});});
 await page.getByRole('link',{name:'Synthetic dual-path handoff',exact:true}).click();assert.equal(events.filter(e=>e.p_event_name==='whatsapp_handoff').length,before);await qualify(page);
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));assert.equal(events.filter(e=>e.p_event_name==='whatsapp_handoff').length,before+1);pass('legacy_anchor_cannot_bypass_qualification_and_records_one_confirmed_handoff');
 await page.goto(base+'/contact',{waitUntil:'networkidle'});await page.locator('input[name="nom"]').fill('Contact synthétique');await page.locator('input[name="tel"]').fill('+212600000000');await page.locator('input[name="email"]').fill('synthetic@example.test');await page.locator('textarea[name="message"]').fill(canary);const beforeContact=events.filter(e=>e.p_event_name==='whatsapp_handoff').length;await page.getByRole('button',{name:'Préparer la demande sur WhatsApp',exact:true}).click();assert.equal(events.filter(e=>e.p_event_name==='whatsapp_handoff').length,beforeContact);await qualify(page);assert.equal(events.filter(e=>e.p_event_name==='whatsapp_handoff').length,beforeContact+1);assert(!JSON.stringify(events).includes(canary));assert(!JSON.stringify(events).includes('synthetic@example.test'));assert.equal(await page.locator('input[name="nom"]').inputValue(),'Contact synthétique');assert.equal(await page.getByText('✓ Message envoyé !',{exact:true}).count(),0);pass('contact_form_keeps_data_and_does_not_claim_delivery_or_leak_text');
 assert.equal(publicTest.vendors.length,0);assert.deepEqual(publicTest.errors,[]);pass('no_automatic_advertising_vendor_requests_or_browser_errors');await publicTest.context.close();
 const invalid=await contextFor();await invalid.page.goto(base+'/faq?utm_source=synthetic@example.test&utm_medium='+canary+'&utm_campaign='+canary,{waitUntil:'networkidle'});assert(!JSON.stringify(invalid.events).includes(canary));assert.equal(await invalid.page.evaluate(()=>localStorage.getItem('benatna_campaign_attribution_v1')),null);pass('unregistered_utm_text_is_not_retained');await invalid.context.close();
 for(const actor of ['public','user']){const t=await contextFor(actor);await t.page.goto(base+'/demandes',{waitUntil:'networkidle'});await t.page.getByRole('heading',{name:'Accès réservé à l’administrateur'}).waitFor();assert.equal(t.getPrivateReads(),0);assert.equal(t.events.length,0);assert.deepEqual(t.errors,[]);pass(actor+':private_ui_denied_without_fetching_contacts_or_tracking');await t.context.close();}
 const missing=await contextFor('admin_count_missing');await missing.page.goto(base+'/demandes',{waitUntil:'networkidle'});await missing.page.getByRole('alert').filter({hasText:'Lecture impossible'}).waitFor();assert.equal(await missing.page.getByText('0 demande(s) affichée(s), sur 0 correspondant au filtre.',{exact:true}).count(),0);pass('missing_count_is_an_error_not_a_false_zero');await missing.context.close();
 const admin=await contextFor('admin');await admin.page.goto(base+'/demandes',{waitUntil:'networkidle'});await admin.page.getByRole('button',{name:'Enregistrer le contact reçu',exact:true}).waitFor();await admin.page.getByLabel('Nom ou repère du contact').fill('Contact de test synthétique');await admin.page.getByLabel('Téléphone du contact').fill('0000000000');await admin.page.getByRole('button',{name:'Enregistrer le contact reçu',exact:true}).click();await admin.page.getByRole('heading',{name:'Contact de test synthétique',exact:true}).waitFor();assert.equal(admin.getLeads()[0].status,'new');assert.equal(admin.getLeads()[0].pickup_date,null);pass('admin_records_a_real_contact_separately_from_clicks_with_unknown_dates');
 let article=admin.page.getByRole('article');await article.getByLabel('État',{exact:true}).selectOption('qualified');await article.getByRole('button',{name:'Enregistrer cet état',exact:true}).click();await article.getByRole('alert').waitFor();assert.equal(admin.getPatches(),0);pass('incomplete_contact_cannot_be_qualified_in_ui');
 await article.getByLabel('Ville demandée',{exact:true}).selectOption('Casablanca');await article.getByLabel('Départ demandé',{exact:true}).fill('2027-01-01');await article.getByLabel('Retour demandé',{exact:true}).fill('2027-01-03');await article.getByRole('button',{name:'Enregistrer cet état',exact:true}).click();assert.equal(admin.getPatches(),0);pass('two_day_contact_cannot_be_qualified_in_ui');
 await article.getByLabel('Retour demandé',{exact:true}).fill('2027-01-04');await Promise.all([admin.page.waitForResponse(r=>r.url().includes('/rental_requests')&&r.request().method()==='GET'),article.getByRole('button',{name:'Enregistrer cet état',exact:true}).click()]);await admin.page.waitForFunction(()=>Array.from(document.querySelectorAll('button')).some(b=>b.textContent==='Enregistrer cet état'&&!b.disabled));assert.equal(admin.getLeads()[0].status,'qualified');
 for(const status of ['quoted','confirmed','completed']){article=admin.page.getByRole('article');await article.getByLabel('État',{exact:true}).selectOption(status);await Promise.all([admin.page.waitForResponse(r=>r.url().includes('/rental_requests')&&r.request().method()==='GET'),article.getByRole('button',{name:'Enregistrer cet état',exact:true}).click()]);await admin.page.waitForFunction(()=>Array.from(document.querySelectorAll('button')).some(b=>b.textContent==='Enregistrer cet état'&&!b.disabled));assert.equal(admin.getLeads()[0].status,status);}
 assert.equal(admin.events.length,0);assert.deepEqual(admin.errors,[]);pass('admin_can_follow_proposal_confirmation_and_completion_without_marketing_pii');await admin.page.screenshot({path:evidence+'/private-leads-synthetic-admin.png',fullPage:false});await admin.context.close();
 await fs.writeFile(evidence+'/measurement-browser-test.json',JSON.stringify({testedAt:new Date().toISOString(),base,checks,productionChanged:false,realMessagesSent:0,limitations:['Supabase responses are mocked with synthetic users and contacts for UI tests.','Actual RLS, constraints and RPC semantics are tested separately on PostgreSQL.']},null,2));console.log(JSON.stringify({checks:checks.length,passed:true,messagesSent:0}));
}finally{await browser.close();}
