import {build} from 'esbuild';import assert from 'node:assert/strict';
const originalFetch=globalThis.fetch;
async function moduleFor(key,url='https://analytics.example.test'){
const r=await build({entryPoints:['src/utils/publicAnalyticsRpc.ts'],bundle:true,platform:'node',format:'esm',write:false,define:{'import.meta.env.VITE_SUPABASE_URL':JSON.stringify(url),'import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY':JSON.stringify(key)}});return import('data:text/javascript;base64,'+Buffer.from(r.outputFiles[0].text).toString('base64'));}
try{for(const key of ['sb_publishable_synthetic','eyJsynthetic.anon.token']){
 const requests=[];globalThis.fetch=async(url,options)=>{requests.push({url,options});return {ok:true};};const {publicAnalyticsRpc}=await moduleFor(key);
 for(const name of ['insert_analytics_event','touch_analytics_session'])assert.deepEqual(await publicAnalyticsRpc(name,{p_session_id:'synthetic'}),{error:false});
 assert.equal(requests.length,2);for(const {url,options} of requests){assert(url.startsWith('https://analytics.example.test/rest/v1/rpc/'));assert.equal(options.method,'POST');assert.equal(options.credentials,'omit');assert.equal(options.keepalive,true);assert.equal(options.headers.apikey,key);assert.equal(options.headers.Authorization,key.startsWith('eyJ')?'Bearer '+key:undefined);assert.deepEqual(JSON.parse(options.body),{p_session_id:'synthetic'});}
 globalThis.fetch=async()=>({ok:false});assert.deepEqual(await publicAnalyticsRpc('touch_analytics_session',{}),{error:true});
}for(const key of ['', 'sb_secret_synthetic']){globalThis.fetch=()=>{throw Error('must not send');};assert.deepEqual(await (await moduleFor(key)).publicAnalyticsRpc('touch_analytics_session',{}),{error:true});}
console.log('Public analytics RPC: both endpoints, publishable/legacy headers, keepalive, HTTP failure and invalid keys passed; no network requests.');
}finally{globalThis.fetch=originalFetch;}
