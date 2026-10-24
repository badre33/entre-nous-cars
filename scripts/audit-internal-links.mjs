import fs from 'node:fs/promises';
import path from 'node:path';

const arg=name=>{const index=process.argv.indexOf(name);return index<0?undefined:process.argv[index+1];};
const dist=path.resolve(arg('--dist')||'dist');
const base=arg('--base')?.replace(/\/$/,'');
const output=arg('--output')||'/tmp/benatna-internal-links.json';
const origin='https://benatna.ma';
const internalHosts=new Set(['benatna.ma','www.benatna.ma','benatna.net','www.benatna.net']);
const config=JSON.parse(await fs.readFile('vercel.json','utf8'));
const sitemap=base ? await (async()=>{const response=await fetch(base+'/sitemap.xml',{signal:AbortSignal.timeout(30000)});if(response.status!==200)throw Error(`Sitemap HTTP ${response.status}`);return response.text();})() : await fs.readFile(path.join(dist,'sitemap.xml'),'utf8');
const pages=[...sitemap.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(match=>new URL(match[1]).pathname);
const cache=new Map();
async function load(route){
 if(!cache.has(route))cache.set(route,base ? fetch(base+route,{signal:AbortSignal.timeout(30000)}).then(response=>response.status===200?response.text():null).catch(()=>null) : fs.readFile(path.join(dist,route.slice(1),'index.html'),'utf8').catch(()=>null));
 return cache.get(route);
}
const decode=value=>value.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#x27;',"'");
const problems=[],redirects=[],external=new Set(),targets=new Set();
let references=0;
for(const source of pages){
 const html=await load(source);
 if(html===null){problems.push({source,reason:'Source HTML missing'});continue;}
 // Read only rendered anchors, never scripts, metadata or source-code strings.
 for(const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']*)["'][^>]*>/gi)){
  const href=decode(match[1]);let url;
  try{url=new URL(href,origin+source);}catch{problems.push({source,href,reason:'Invalid URL'});continue;}
  if(!['https:','http:'].includes(url.protocol))continue;
  if(!internalHosts.has(url.hostname)){external.add(url.href);continue;}
  references++;
  const original=url.pathname.replace(/\/$/,'')||'/';targets.add(original);
  let destination=original;const chain=[original];
  for(let depth=0;depth<6;depth++){
   const redirect=config.redirects?.find(rule=>rule.source===destination);
   if(!redirect)break;
   destination=new URL(redirect.destination,origin).pathname;chain.push(destination);
   if(chain.slice(0,-1).includes(destination))break;
  }
  if(chain.length>1)redirects.push({source,href,chain});
  if(chain.length>3){problems.push({source,href,reason:'Redirect loop or chain over two hops',chain});continue;}
  const targetHTML=await load(destination);
  if(targetHTML===null){
   if(base){problems.push({source,href,destination,reason:'Internal destination unavailable over HTTP'});continue;}
   try{const stat=await fs.stat(path.join(dist,destination.slice(1)));if(!stat.isFile())throw Error('Not a file');}
   catch{problems.push({source,href,destination,reason:'Missing internal destination'});}
   continue;
  }
  if(url.hash){
   let id;try{id=decodeURIComponent(url.hash.slice(1));}catch{problems.push({source,href,reason:'Invalid fragment encoding'});continue;}
   const ids=[...targetHTML.matchAll(/\bid=["']([^"']*)["']/g)].map(item=>decode(item[1]));
   if(!ids.includes(id))problems.push({source,href,destination,reason:'Missing fragment target'});
  }
 }
}
const report={base:base||'dist',checkedAt:new Date().toISOString(),scope:'Rendered anchors on sitemap HTML pages; exact configured redirects only. HTTP destinations checked when --base is provided. External URLs inventoried but not fetched. JS-only states, private source pages and backlinks excluded.',pages:pages.length,references,uniqueInternalDestinations:targets.size,problems,redirects,external:[...external]};
await fs.mkdir(path.dirname(path.resolve(output)),{recursive:true});
await fs.writeFile(output,JSON.stringify(report,null,2));
console.log(JSON.stringify({pages:report.pages,references,uniqueInternalDestinations:targets.size,problems,redirectReferences:redirects.length,externalCount:external.size}));
if(problems.length)process.exitCode=1;
