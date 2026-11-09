import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const base = process.env.TEST_BASE || 'http://127.0.0.1:4319';
const output = process.env.TEST_OUTPUT_DIR || '/tmp/benatna-casablanca-acquisition';
const models = ['renault-clio', 'dacia-duster', 'vw-golf', 'hyundai-tucson'];
const landings = ['/location-voiture-casablanca', '/location-voiture-aeroport-casablanca'];
const paths = [...landings, ...models.map(slug => `/vehicule/${slug}`)];
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const checks = [];
try {
  for (const width of [320, 390, 1280]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, serviceWorkers: 'block' });
    // No external analytics calls or real messages during this verification.
    await context.route('**/*', route => new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort());
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const path of paths) {
      await page.goto(base + path, { waitUntil: 'networkidle' });
      await page.getByRole('heading', { level: 1 }).waitFor();
      const consent = page.getByRole('region', { name: 'Cookies publicitaires', exact: true });
      if (await consent.isVisible()) await consent.getByRole('button', { name: 'Refuser', exact: true }).click();
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), 'https://benatna.ma' + path);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow: ${path} at ${width}`);
      const comparison = page.getByRole('region', { name: 'Comparer les modèles à Casablanca', exact: true });
      const slug = path.split('/').pop();
      for (const model of models.filter(model => model !== slug)) {
        assert.equal(await comparison.locator(`a[href="/vehicule/${model}"]`).count(), 1);
      }
      if (path.startsWith('/vehicule/')) {
        assert(await page.getByRole('heading', { name: /^Prix, caution et livraison/ }).isVisible());
        assert(await page.locator('a[href="/location-voiture-aeroport-casablanca"]').count() > 0);
        await page.getByRole('button', { name: 'Réserver', exact: true }).click();
        await page.getByRole('heading', { name: 'Réserver ma voiture', exact: true }).waitFor();
        assert((await page.getByLabel('Véhicule souhaité', { exact: true }).inputValue()).length > 0);
        await page.getByRole('button', { name: 'Vérifier ma réservation', exact: true }).click();
        assert.equal(await page.getByRole('button', { name: 'Réserver sur WhatsApp', exact: true }).count(), 0, 'incomplete request cannot reach WhatsApp confirmation');
      } else {
        const cta = page.getByRole('link', { name: 'Voir les modèles et prix journaliers indicatifs', exact: true });
        const href = await cta.getAttribute('href');
        assert.equal(href, `/louer?city=Casablanca${path.includes('aeroport') ? '&pickup=cmn' : ''}`);
      }
      if (width === 390 && !path.startsWith('/vehicule/')) await page.screenshot({ path: `${output}/${slug}-390.png`, fullPage: true });
      checks.push({ path, width, passed: true });
    }
    assert.deepEqual(errors, []);
    await context.close();
  }
  await fs.writeFile(`${output}/verification.json`, JSON.stringify({ base, checks, realMessagesSent: 0 }, null, 2));
  console.log(JSON.stringify({ passed: true, checks: checks.length, realMessagesSent: 0 }));
} finally {
  await browser.close();
}
