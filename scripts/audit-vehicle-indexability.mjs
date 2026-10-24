import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';
const root = path.resolve(import.meta.dirname, '..');
const arg = name => { const i = process.argv.indexOf(name); return i < 0 ? undefined : process.argv[i + 1]; };
const dist = arg('--dist');
const base = arg('--base') || 'https://benatna.ma';
const output = arg('--output') || '/tmp/benatna-vehicle-indexability.json';
const source = await fs.readFile(path.join(root, 'src/data/rentalVehicleNames.ts'), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { rentalVehicleNames, rentalVehicleSlugs: models } = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));
if (JSON.stringify(Object.values(models).sort()) !== JSON.stringify([...rentalVehicleNames].sort()))
    throw Error('Approved vehicle names and slugs disagree');
const load = async (route) => { if (dist) {
    try {
        return { status: 200, headers: {}, html: await fs.readFile(path.join(dist, route.replace(/^\//, ''), 'index.html'), 'utf8') };
    }
    catch {
        return { status: 0, headers: {}, html: '' };
    }
} const response = await fetch(base + route, { redirect: 'manual', signal: AbortSignal.timeout(30000) }); return { status: response.status, headers: { robots: response.headers.get('x-robots-tag') || '' }, html: await response.text() }; };
const sitemap = dist ? await fs.readFile(path.join(dist, 'sitemap.xml'), 'utf8') : (await load('/sitemap.xml')).html;
const urls = [...sitemap.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(m => m[1].trim());
const catalogueHtml = (await load('/louer')).html;
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w-]+)=["']([^"']*)["']/g)].map(m => [m[1].toLowerCase(), m[2]]));
const catalogueLinks = [...catalogueHtml.matchAll(/<a\b[^>]*>/gi)].map(m => attrs(m[0]).href).filter(Boolean);
const results = [];
let cursor = 0;
const entries = Object.entries(models);
await Promise.all(Array.from({ length: 4 }, async () => { while (cursor < entries.length) {
    const [slug, name] = entries[cursor++];
    const route = '/vehicule/' + slug;
    try {
        const { status, headers, html } = await load(route);
        const canonicals = [...html.matchAll(/<link\b[^>]*>/gi)].map(m => attrs(m[0])).filter(a => a.rel === 'canonical').map(a => a.href);
        const robots = [...html.matchAll(/<meta\b[^>]*>/gi)].map(m => attrs(m[0])).filter(a => ['robots', 'googlebot', 'bingbot'].includes(a.name?.toLowerCase())).map(a => a.content || '');
        const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '';
        const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, ''));
        const expected = 'https://benatna.ma' + route;
        const row = { slug, name, status, inSitemap: urls.filter(u => u === expected).length === 1, canonical: canonicals, robots, headerRobots: headers.robots || '', title, titleTargetsCasablanca: title.includes('Casablanca'), linkedFromCatalogue: catalogueLinks.some(href => new URL(href, 'https://benatna.ma').href === expected), h1, bodyHasModel: h1.length === 1 && h1[0].includes(name), hasPrice: /DH\/jour/.test(html), hasApprovedPhoto: /<img\b[^>]*src=["'][^"']*\/vehicles\/benatna\//i.test(html) };
        row.passed = status === 200 && row.inSitemap && canonicals.length === 1 && canonicals[0] === expected && !/noindex/i.test([...robots, row.headerRobots].join(' ')) && row.linkedFromCatalogue && row.bodyHasModel && row.hasPrice && row.hasApprovedPhoto && title.includes(name);
        results.push(row);
    }
    catch (error) {
        results.push({ slug, name, passed: false, error: String(error) });
    }
} }));
results.sort((a, b) => a.slug.localeCompare(b.slug));
const report = { checkedAt: new Date().toISOString(), source: dist || base, javascriptExecuted: false, sitemapUrlCount: urls.length, approvedModels: entries.length, vehicleUrlsInSitemap: urls.filter(u => new URL(u).pathname.startsWith('/vehicule/')).length, pages: results };
await fs.mkdir(path.dirname(output), { recursive: true });
await fs.writeFile(output, JSON.stringify(report, null, 2));
const failures = results.filter(r => !r.passed);
console.log(JSON.stringify({ models: entries.length, passed: results.length - failures.length, failures: failures.map(r => r.slug), sitemapUrlCount: urls.length, javascriptExecuted: false }));
if (failures.length && !process.argv.includes('--report-only'))
    process.exitCode = 1;
