import fs from 'node:fs/promises';
import path from 'node:path';
const arg=name=>{const i=process.argv.indexOf(name);return i<0?undefined:process.argv[i+1];};
const dist=path.resolve(arg('--dist')||'dist'),base=arg('--base')?.replace(/\/$/,''),output=arg('--output')||'/tmp/benatna-rendered-images.json';
const origin='https://benatna.ma';
const htmlOnly=html=>html.replace(/<!--[\s\S]*?-->/g,'').replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi,'');
async function read(route){if(!base)return fs.readFile(path.join(dist,route.slice(1),'index.html'),'utf8');const r=await fetch(base+route,{signal:AbortSignal.timeout(30000)});if(r.status!==200)throw Error(`${route}: HTTP ${r.status}`);return r.text();}
const sitemap=base?await (async()=>{const r=await fetch(base+'/sitemap.xml',{signal:AbortSignal.timeout(30000)});if(r.status!==200)throw Error('Sitemap unavailable');return r.text();})():await fs.readFile(path.join(dist,'sitemap.xml'),'utf8');
const pages=[...sitemap.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(m=>new URL(m[1]).pathname);
const images=new Map(),external=new Set();
for(const page of pages){const html=htmlOnly(await read(page));for(const tag of html.matchAll(/<(?:img|source)\b[^>]*>/gi)){
 const attrs=Object.fromEntries([...tag[0].matchAll(/\s(src|srcset)=["']([^"']*)["']/gi)].map(m=>[m[1].toLowerCase(),m[2].replaceAll('&amp;','&')]));
 const candidates=[...(attrs.src?[attrs.src]:[]),...(attrs.srcset&&!attrs.srcset.startsWith('data:')?attrs.srcset.split(',').map(s=>s.trim().split(/\s+/)[0]):[])];
 for(const candidate of candidates){if(candidate.startsWith('data:'))continue;const url=new URL(candidate,origin+page);if(url.origin!==origin){external.add(url.href);continue;}if(!images.has(url.pathname))images.set(url.pathname,new Set());images.get(url.pathname).add(page);}
}}
function imageKind(buffer){if(buffer.subarray(0,3).equals(Buffer.from([255,216,255])))return 'jpeg';if(buffer.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))return 'png';if(buffer.toString('ascii',0,4)==='RIFF'&&buffer.toString('ascii',8,12)==='WEBP')return 'webp';if(/^GIF8[79]a/.test(buffer.toString('ascii',0,6)))return 'gif';if(/<svg[\s>]/i.test(buffer.toString('utf8',0,1024)))return 'svg';if(/ftyp(?:avif|avis)/.test(buffer.toString('ascii',0,32)))return 'avif';return null;}
const rows=[...images].map(([url,sources])=>({url,sources:[...sources]})),results=[];let cursor=0;
await Promise.all(Array.from({length:4},async()=>{while(cursor<rows.length){const row=rows[cursor++];try{let bytes,status=200,type='local';if(base){const r=await fetch(base+row.url,{signal:AbortSignal.timeout(30000)});status=r.status;type=r.headers.get('content-type')||'';if(status!==200)throw Error(`HTTP ${status}`);if(!type.startsWith('image/'))throw Error(`Unexpected content type ${type}`);bytes=Buffer.from(await r.arrayBuffer());}else {const file=path.resolve(dist,decodeURIComponent(row.url.slice(1)));if(!file.startsWith(dist+path.sep))throw Error('Image path outside build directory');bytes=await fs.readFile(file);}const kind=imageKind(bytes);if(!kind)throw Error('Unsupported or invalid image content');results.push({...row,status,type,kind,bytes:bytes.length,passed:true});}catch(e){results.push({...row,passed:false,error:e.message});}}}));
const failures=results.filter(r=>!r.passed),report={base:base||'dist',checkedAt:new Date().toISOString(),pages:pages.length,images:rows.length,failures,results,external:[...external],scope:'Rendered img/src and img|source/srcset on sitemap HTML. Includes responsive candidates. CSS backgrounds, JS-only states, embedded data URLs and external images are excluded. File signatures checked; visual accuracy is not inferred.'};
await fs.mkdir(path.dirname(path.resolve(output)),{recursive:true});await fs.writeFile(output,JSON.stringify(report,null,2));console.log(JSON.stringify({pages:pages.length,images:rows.length,passed:results.length-failures.length,failures}));if(failures.length)process.exitCode=1;
