import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const dist=process.argv[2]||'dist';
const sitemap=await fs.readFile(path.join(dist,'sitemap.xml'),'utf8');
const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
const summary=await fs.readFile(path.join(dist,'llms.txt'),'utf8');
for(const stale of ['300+','300 véhicules','1200','1 200','six villes','6 villes','2 minutes','Marrakech','Tanger','Agadir','Fès','Notes pour les modèles'])assert(!summary.includes(stale),'Stale summary: '+stale);
assert(summary.includes('trois jours minimum à six mois'));
const links=[...summary.matchAll(/\]\((https:\/\/benatna\.ma[^)]*)\)/g)].map(m=>m[1]);
for(const link of links)assert(urls.includes(link),'Summary link missing from sitemap: '+link);
const problems=[];
for(const url of urls){
 const pathname=new URL(url).pathname;
 const file=pathname==='/'?path.join(dist,'index.html'):path.join(dist,pathname,'index.html');
 let html;try{html=await fs.readFile(file,'utf8');}catch{html=await fs.readFile(path.join(dist,pathname+'.html'),'utf8');}
 const scripts=[...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
 const nodes=[];function visit(v){if(Array.isArray(v))v.forEach(visit);else if(v&&typeof v==='object'){nodes.push(v);Object.values(v).forEach(visit);}}scripts.forEach(visit);
 const organization=nodes.filter(n=>n['@id']==='https://benatna.ma#organization'&&n['@type']==='Organization'&&('sameAs' in n || 'description' in n || 'hasOfferCatalog' in n));
 if(organization.length!==1)problems.push({url,reason:'Global identity count '+organization.length});
 for(const org of organization){
  if(['hasOfferCatalog','priceRange','openingHoursSpecification','legalName','geo'].some(k=>k in org))problems.push({url,reason:'Unverified global identity attributes'});
  if(!org.sameAs?.includes('https://www.instagram.com/benatna.ma/'))problems.push({url,reason:'Wrong Instagram identity'});
 }
 for(const node of nodes)if(node['@type']==='Offer'&&/^Tarif (Longue Durée|2 Semaines|Semaine)/.test(node.name||''))problems.push({url,reason:'Obsolete promotional offer'});
}
console.log(JSON.stringify({pages:urls.length,summaryLinks:links.length,problems},null,2));assert.equal(problems.length,0);
