import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const root = path.resolve(import.meta.dirname, '..');
async function loadData(file) {
  const source = await fs.readFile(path.join(root, file), 'utf8');
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
  return import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));
}
const { rentalVehicleNames, rentalVehicleSlugs } = await loadData('src/data/rentalVehicleNames.ts');
const { serviceAreaPolicy } = await loadData('src/utils/serviceAreaPolicy.ts');
if (JSON.stringify(Object.values(rentalVehicleSlugs).sort()) !== JSON.stringify([...rentalVehicleNames].sort())) throw Error('Approved names and slugs disagree');
const curated = JSON.parse(await fs.readFile(path.join(root, 'src/data/sitemapPages.json'), 'utf8'));
const pages = [...curated, ...Object.keys(rentalVehicleSlugs).map(slug => ({ path: '/vehicule/' + slug, changefreq: 'monthly', priority: '0.6' }))];
const seen = new Set();
for (const page of pages) {
  const url = new URL(page.path, 'https://benatna.ma');
  const policy = serviceAreaPolicy(url.pathname);
  if (!page.path.startsWith('/') || url.origin !== 'https://benatna.ma' || url.search || url.hash || seen.has(url.href)
    || /^\/(api|admin|analytics|auth|demandes)(\/|$)/.test(url.pathname) || (policy.notice && policy.noindex)) throw Error(`Non-indexable or duplicate sitemap path: ${page.path}`);
  seen.add(url.href);
}
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
// Do not stamp artificial lastmod dates or revive archived cities/articles.
const entries = pages.map(page => `  <url>\n    <loc>https://benatna.ma${escape(page.path)}</loc>${page.changefreq ? `\n    <changefreq>${escape(page.changefreq)}</changefreq>` : ''}${page.priority ? `\n    <priority>${escape(page.priority)}</priority>` : ''}\n  </url>`);
await fs.writeFile(path.join(root, 'public/sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + entries.join('\n') + '\n</urlset>\n');
console.log(`Sitemap: ${pages.length} URLs, ${Object.keys(rentalVehicleSlugs).length} approved vehicle pages, ${curated.length} preserved curated pages.`);
