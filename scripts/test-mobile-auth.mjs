import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.TEST_BASE||'http://127.0.0.1:4319';
const output=process.env.TEST_OUTPUT_DIR||'/tmp/benatna-mobile-auth';await fs.mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const contrast=({fg,bg})=>{const light=color=>{const c=color.match(/[\d.]+/g).slice(0,3).map(Number).map(x=>{x/=255;return x<=0.04045?x/12.92:((x+0.055)/1.055)**2.4;});return .2126*c[0]+.7152*c[1]+.0722*c[2];};const a=light(fg),b=light(bg);return(Math.max(a,b)+.05)/(Math.min(a,b)+.05);};
async function visibleFeedback(page,role){const target=page.getByRole(role);await target.waitFor();await page.waitForFunction(role=>document.activeElement?.getAttribute('role')===role,role);const b=await target.boundingBox();assert(b.y>=0&&b.y+b.height<=page.viewportSize().height,'feedback visible');return target;}
try{for(const [width,height] of [[320,568],[390,400],[390,844],[1280,900]]){
 const page=await browser.newPage({viewport:{width,height},serviceWorkers:'block'});const errors=[];page.on('pageerror',e=>errors.push(e.message));let signupMode='confirm',signupCalls=0,loginCalls=0,privateRPCs=0;
 await page.route('**/*',async route=>{const request=route.request(),url=new URL(request.url());if(url.origin===new URL(base).origin)return route.continue();
  const headers={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'POST,GET,OPTIONS','Content-Type':'application/json','X-Supabase-Api-Version':'2024-01-01','Access-Control-Expose-Headers':'X-Supabase-Api-Version'};
  if(url.pathname.startsWith('/auth/v1/')){
   if(request.method()==='OPTIONS')return route.fulfill({status:200,headers,body:'{}'});
   if(url.pathname==='/auth/v1/signup'){
    signupCalls++;const body=request.postDataJSON();assert.equal(body.email,'synthetic@example.test');assert(body.password.length>=12);
    if(signupMode==='weak')return route.fulfill({status:422,headers,body:JSON.stringify({code:'weak_password',msg:'Weak password'})});
    if(signupMode==='rate')return route.fulfill({status:429,headers,body:JSON.stringify({code:'over_email_send_rate_limit',msg:'Rate limit'})});
    return route.fulfill({status:200,headers,body:JSON.stringify({id:'00000000-0000-4000-8000-000000000001',aud:'authenticated',role:'authenticated',email:'synthetic@example.test',created_at:new Date().toISOString(),app_metadata:{provider:'email'},user_metadata:{},identities:[]})});
   }
   if(url.pathname==='/auth/v1/token'){loginCalls++;return route.fulfill({status:400,headers,body:JSON.stringify({code:'invalid_credentials',msg:'Invalid login credentials'})});}
  }
  if(url.pathname.startsWith('/rest/v1/rpc/'))privateRPCs++;
  return route.abort();
 });
 await page.goto(base+'/auth');const loginTab=page.getByRole('tab',{name:'Connexion',exact:true}),signupTab=page.getByRole('tab',{name:'Inscription',exact:true});await loginTab.waitFor();
 for(const tab of [loginTab,signupTab]){const box=await tab.boundingBox();assert(box.height>=44);}
 const colours=async tab=>tab.evaluate(e=>({fg:getComputedStyle(e).color,bg:getComputedStyle(e).backgroundColor}));
 assert(contrast(await colours(loginTab))>=4.5);assert.equal((await colours(loginTab)).fg,'rgb(255, 255, 255)');
 await page.getByLabel('Email',{exact:true}).fill('synthetic@example.test');await page.getByLabel('Mot de passe',{exact:true}).fill('Synthetic-Passphrase-2027');
 const reveal=page.getByRole('button',{name:'Afficher le mot de passe',exact:true});assert((await reveal.boundingBox()).width>=44);await reveal.click();assert.equal(await page.getByLabel('Mot de passe',{exact:true}).getAttribute('type'),'text');await page.getByRole('button',{name:'Masquer le mot de passe',exact:true}).click();
 assert.equal(await page.getByLabel('Mot de passe',{exact:true}).getAttribute('autocomplete'),'current-password');
 await page.getByRole('button',{name:'Se connecter',exact:true}).click();assert((await (await visibleFeedback(page,'alert')).innerText()).includes('incorrect'));assert.equal(loginCalls,1);
 await signupTab.click();assert(contrast(await colours(signupTab))>=4.5);assert.equal((await colours(signupTab)).fg,'rgb(255, 255, 255)');assert.equal((await colours(loginTab)).fg,'rgb(0, 0, 0)');
 const originalDark=await page.evaluate(()=>document.documentElement.classList.contains('dark'));
 for(const dark of [false,true]){
  await page.evaluate(dark=>document.documentElement.classList.toggle('dark',dark),dark);
  assert(contrast(await colours(signupTab))>=4.5);
  assert(contrast(await loginTab.evaluate(e=>({fg:getComputedStyle(e).color,bg:getComputedStyle(e.parentElement).backgroundColor})))>=4.5);
 }
 await page.evaluate(dark=>document.documentElement.classList.toggle('dark',dark),originalDark);
 await page.getByLabel('Email',{exact:true}).fill('synthetic@example.test');await page.getByLabel('Mot de passe',{exact:true}).fill('Synthetic-Passphrase-2027');await page.getByLabel('Confirmer le mot de passe',{exact:true}).fill('Different-Passphrase-2027');
 await page.getByRole('button',{name:'Créer un compte',exact:true}).click();assert((await (await visibleFeedback(page,'alert')).innerText()).includes('ne correspondent pas'));assert.equal(signupCalls,0);
 const generate=page.getByRole('button',{name:'Proposer un mot de passe robuste',exact:true});await generate.click();
 assert(await generate.evaluate(e=>document.activeElement===e),'generation does not move focus away from the button');
 const password=await page.getByLabel('Mot de passe',{exact:true}).inputValue();assert.equal(password.length,20);assert(/^[A-Za-z0-9_-]+$/.test(password));for(const pattern of [/[A-Z]/,/[a-z]/,/[0-9]/,/[-_]/])assert(pattern.test(password));assert.equal(await page.getByLabel('Confirmer le mot de passe',{exact:true}).inputValue(),password);assert.equal(signupCalls,0);
 assert.equal(await page.getByLabel('Mot de passe',{exact:true}).getAttribute('autocomplete'),'new-password');assert.equal(await page.getByLabel('Mot de passe',{exact:true}).getAttribute('minlength'),'12');
 assert.equal(await page.evaluate(password=>[...Object.values(localStorage),...Object.values(sessionStorage)].some(v=>v.includes(password)),password),false);
 await page.screenshot({path:`${output}/inscription-${width}-${height}.png`});
 await page.getByRole('button',{name:'Créer un compte',exact:true}).click();const status=await visibleFeedback(page,'status');assert((await status.innerText()).includes('confirmer votre adresse'));assert.equal(new URL(page.url()).pathname,'/auth');assert.equal(signupCalls,1);
 await page.screenshot({path:`${output}/confirmation-${width}-${height}.png`});
 signupMode='weak';await page.getByRole('button',{name:'Créer un compte',exact:true}).click();assert((await (await visibleFeedback(page,'alert')).innerText()).includes('plus robuste'));
 signupMode='rate';await page.getByRole('button',{name:'Créer un compte',exact:true}).click();assert((await (await visibleFeedback(page,'alert')).innerText()).includes('Trop de tentatives'));
 assert.equal(privateRPCs,0);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);
 console.log(`${width}×${height}: onglet vert/blanc et contraste ≥4,5, commandes44px, génération locale20caractères, confirmation email sans redirection, erreurs visibles ; aucune création réelle ni lecture administrateur.`);
 await page.close();
}}finally{await browser.close();}
