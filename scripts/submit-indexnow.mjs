import { readFile } from 'node:fs/promises';

// The hosted verification key is public; it is not an account/API credential.
const root = new URL('../', import.meta.url);
const { host, key } = JSON.parse(await readFile(new URL('indexnow.config.json', root), 'utf8'));
if (host !== 'benatna.ma' || !/^[a-f0-9]{32}$/.test(key)) throw new Error('Invalid IndexNow configuration');
const sitemap = await readFile(new URL('public/sitemap.xml', root), 'utf8');
const urlList = [...new Set([...sitemap.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(match => match[1].trim()))];
if (!urlList.length || urlList.length > 10000) throw new Error('Invalid sitemap URL count');
for (const value of urlList) {
  const url = new URL(value);
  if (url.origin !== `https://${host}` || url.search || url.hash || /^\/(api|admin|analytics|auth)(\/|$)/.test(url.pathname)) {
    throw new Error(`Refusing non-public URL: ${value}`);
  }
}
const keyLocation = `https://${host}/${key}.txt`;
if (!process.argv.includes('--submit')) {
  console.log(JSON.stringify({ dryRun: true, host, keyLocation, urlCount: urlList.length, urlList }, null, 2));
  process.exit(0);
}
const proof = await fetch(keyLocation, { signal: AbortSignal.timeout(30000), redirect: 'error' });
if (!proof.ok || (await proof.text()).trim() !== key) throw new Error('Live verification file does not match; nothing submitted');
const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
  signal: AbortSignal.timeout(30000),
});
console.log(JSON.stringify({ timestamp: new Date().toISOString(), host, urlCount: urlList.length, status: response.status, body: await response.text() }, null, 2));
if (![200, 202].includes(response.status)) process.exitCode = 1;
