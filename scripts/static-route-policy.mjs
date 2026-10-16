import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const source = await fs.readFile(path.join(root, 'src/utils/serviceAreaPolicy.ts'), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { serviceAreaPolicy } = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));
const app = await fs.readFile(path.join(root, 'src/App.tsx'), 'utf8');
const routes = new Set([...app.matchAll(/<Route\s+path="([^":*]+)"/g)].map(m => m[1]));
for (const [file, prefix] of [['vehicleDetails.ts', '/vehicule/'], ['blogArticles.ts', '/blog/'], ['comparisonsData.ts', '/comparatif/']]) {
  const data = await fs.readFile(path.join(root, 'src/data', file), 'utf8');
  for (const match of data.matchAll(/\bslug:\s*["']([^"']+)["']/g)) routes.add(prefix + match[1]);
}
// Previously published model URL, now excluded from the offer.
routes.add('/vehicule/hyundai-staria');
const shell = (await fs.readFile(path.join(dist, 'app-shell.html'), 'utf8'))
  .replace(/<title[\s\S]*?<\/title>/, '<title>Application Benatna</title>')
  .replace('</head>', '<meta name="robots" content="noindex,follow"></head>');
await fs.writeFile(path.join(dist, 'app-shell.html'), shell);
const escape = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const notice = route => {
  const policy = serviceAreaPolicy(route);
  const title = policy.excluded ? 'Voitures de tourisme, minimum trois jours | Benatna'
    : policy.rabat ? 'Livraison à Rabat sur demande | Benatna Casablanca' : 'Zone de location actuelle | Benatna Casablanca';
  const heading = policy.excluded ? 'Voitures de tourisme pour vos séjours — minimum trois jours'
    : policy.rabat ? 'Rabat : livraison sur demande depuis Casablanca' : 'Notre service se concentre sur Casablanca';
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="robots" content="${policy.noindex ? 'noindex,follow' : 'index,follow'}"><link rel="canonical" href="https://benatna.ma${escape(route)}"><meta name="description" content="Voitures de tourisme à Casablanca, livraison gratuite aux points desservis. Rabat sur demande. De trois jours à six mois."></head><body><header><a href="/">Benatna</a></header><main><h1>${heading}</h1><p>Nos loueurs sont basés à Casablanca. Rabat est proposé sur demande depuis Casablanca, selon la disponibilité du loueur.</p><p>La livraison aux gares et aéroports desservis est gratuite et convenue à l’avance. La location dure de trois jours à six mois calendaires.</p><p>Les prestations de mariage, vans, utilitaires, véhicules de luxe et locations professionnelles ne font pas partie de l’offre actuelle.</p><p>Une demande WhatsApp ne constitue pas une réservation confirmée. Le loueur confirme le véhicule, le tarif final et ses conditions avant votre accord.</p><p><a href="/louer?city=${policy.rabat ? 'Rabat' : 'Casablanca'}">Voir le catalogue de Casablanca${policy.rabat ? ' et demander une livraison à Rabat' : ''}</a></p><p><a href="/prise-en-charge-casablanca-rabat">Gares et aéroports desservis</a> · <a href="/faq">Questions fréquentes</a></p></main></body></html>`;
};
const report = [];
for (const route of routes) {
  if (route === '/') continue;
  const file = path.join(dist, route.slice(1), 'index.html');
  const policy = serviceAreaPolicy(route);
  if (policy.notice && policy.noindex) {
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, notice(route));
    report.push({ route, result: 'static-noindex-notice' });
  } else {
    try { await fs.access(file); }
    catch {
      // Known application route: keep React bootstrapping, never copy the home page.
      const html = shell.replace('</head>', `<link rel="canonical" href="https://benatna.ma${escape(route)}"></head>`);
      await fs.mkdir(path.dirname(file), { recursive: true });
      await fs.writeFile(file, html);
      report.push({ route, result: 'known-application-shell' });
    }
  }
}
await fs.writeFile(path.join(dist, '404.html'), '<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="robots" content="noindex,follow"><title>Page introuvable | Benatna</title></head><body><main><h1>Page introuvable</h1><p>Cette adresse ne correspond pas à une page Benatna.</p><a href="/location-voiture-casablanca">Location à Casablanca</a></main></body></html>');
await fs.writeFile(path.join(dist, 'route-policy-report.json'), JSON.stringify(report, null, 2));
console.log(`Route policy: ${routes.size} known routes; ${report.length} explicit non-sitemap responses; unknown paths use HTTP 404.`);
