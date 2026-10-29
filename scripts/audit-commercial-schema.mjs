import fs from 'node:fs/promises';
import path from 'node:path';
const args=process.argv.slice(2);const option=n=>args[args.indexOf(n)+1];
const base=args.includes('--base')?option('--base'):null;const dist=args.includes('--dist')?option('--dist'):'dist';
const output=args.includes('--output')?option('--output'):null;
const read=async route=>{if(base){const r=await fetch(new URL(route,base));if(!r.ok)throw new Error(`${route}: HTTP ${r.status}`);return r.text();}return fs.readFile(path.join(dist,route==='/'?'index.html':route.replace(/^\//,'')+(route.endsWith('.xml')?'':'/index.html')),'utf8');};
const sitemap=await read('/sitemap.xml');const vehicles=[...sitemap.matchAll(/<loc>https:\/\/benatna.ma(\/vehicule\/[^<]+)<\/loc>/g)].map(m=>m[1]);
const paths=['/','/louer','/location-voiture-casablanca','/location-voiture-aeroport-casablanca','/location-voiture-gare-casa-voyageurs',...vehicles];const problems=[];const pages=[];if(vehicles.length!==26)problems.push(`Expected 26 approved vehicle pages, found ${vehicles.length}`);
for(const route of paths){try{const html=await read(route);const nodes=[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
 if(!nodes.length)problems.push(`${route}: missing JSON-LD`);
 const flattened=nodes.flatMap(n=>Array.isArray(n)?n:n['@graph']||[n]);const types=flattened.flatMap(n=>[].concat(n['@type']||[]));
 if(types.includes('Product'))problems.push(`${route}: Product schema on an indicative rental page`);
 if(JSON.stringify(nodes).includes('schema.org/InStock'))problems.push(`${route}: unconfirmed stock`);
 if(route==='/'&&JSON.stringify(nodes).includes('openingHoursSpecification'))problems.push('Homepage: unconfirmed opening hours');
 if(route==='/louer'){const list=flattened.find(n=>n['@type']==='ItemList');if(!list?.itemListElement?.length)problems.push('Catalogue: missing model list');else{const urls=[];for(const [i,item]of list.itemListElement.entries()){urls.push(item.url);if(item.position!==i+1||!vehicles.includes(new URL(item.url).pathname)||!html.includes(`href="${new URL(item.url).pathname}"`))problems.push(`Catalogue: invalid or invisible model ${item.url}`);}if(new Set(urls).size!==urls.length)problems.push('Catalogue: duplicate models');if(list.numberOfItems!==urls.length)problems.push('Catalogue: count mismatch');}}
 pages.push({route,types});}catch(e){problems.push(`${route}: ${e.message}`);}}
const result={base:base||dist,pages:pages.length,vehicles:vehicles.length,problems,details:pages};if(output)await fs.writeFile(output,JSON.stringify(result,null,2));console.log(JSON.stringify({pages:result.pages,vehicles:result.vehicles,problems}));if(problems.length)process.exitCode=1;
