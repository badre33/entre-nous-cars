// Parcours d'inscription loueur partenaire, contre une fonction register_partner simulée.
// Prérequis : build avec VITE_PARTNER_PERSISTENCE=on et VITE_SUPABASE_URL=https://fake.supabase.co,
// servi sur PARTNER_TEST_URL (défaut http://127.0.0.1:4320).
import { chromium, devices } from 'playwright';
const BASE = process.env.PARTNER_TEST_URL || 'http://127.0.0.1:4320';
const failures = [];
const check = (name, ok, detail = '') => { console.log(`${ok ? 'OK ' : 'ÉCHEC'} ${name}${detail ? ` (${detail})` : ''}`); if (!ok) failures.push(name); };

async function scenario(browser, name, { respond, fill }, verify) {
  const context = await browser.newContext({ ...devices['iPhone 13'] });
  const calls = []; const popups = [];
  await context.route('**/fake.supabase.co/**', async route => {
    const url = route.request().url();
    if (url.endsWith('/rpc/register_partner')) { const body = JSON.parse(route.request().postData() || '{}'); calls.push(body); return respond(route, calls.length); }
    return route.fulfill({ status: 200, contentType: 'application/json', body: 'null' });
  });
  await context.route(/wa\.me|whatsapp\.com/, route => { popups.push(new URL(route.request().url()).searchParams.get('text') || ''); return route.fulfill({ status: 200, body: 'wa' }); });
  const page = await context.newPage();
  await page.goto(`${BASE}/partenaires`, { waitUntil: 'networkidle' });
  await fill(page);
  await page.getByRole('button', { name: "M'inscrire comme loueur partenaire" }).click();
  await page.waitForTimeout(800);
  await verify({ page, calls, popups });
  await context.close();
}
const ok = (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([{ created: true }]) });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });

await scenario(browser, 'phone', { respond: ok, fill: async page => {
  await page.getByLabel("Nom de l'agence").fill('Agence Atlas');
  await page.getByLabel('Ville', { exact: true }).selectOption('Rabat');
  await page.getByLabel('WhatsApp / Téléphone').fill('06 12 34 56 78');
} }, async ({ page, calls, popups }) => {
  check('téléphone seul : un appel', calls.length === 1);
  const c = calls[0] || {};
  check('téléphone composé en +212', c.p_phone === '+212612345678', c.p_phone);
  check('ville transmise', c.p_city === 'Rabat');
  check('e-mail vide envoyé comme null', c.p_email === null);
  check('flotte facultative null', c.p_fleet_size === null);
  check('clé d\'idempotence uuid', /^[0-9a-f-]{36}$/.test(c.p_idempotency_key || ''));
  check('confirmation affichée', await page.getByText('Inscription reçue, merci.').isVisible());
  check('aucun WhatsApp ouvert', popups.length === 0);
});

await scenario(browser, 'email', { respond: ok, fill: async page => {
  await page.getByLabel("Nom de l'agence").fill('Casa Loc');
  await page.getByLabel('Email').fill('Contact@CasaLoc.ma');
  await page.getByLabel('Nombre de voitures (facultatif)').fill('15');
} }, async ({ calls }) => {
  const c = calls[0] || {};
  check('e-mail seul accepté', calls.length === 1 && c.p_phone === null && c.p_email === 'contact@casaloc.ma');
  check('ville par défaut Casablanca', c.p_city === 'Casablanca');
  check('flotte transmise', c.p_fleet_size === 15);
});

await scenario(browser, 'aucun contact', { respond: ok, fill: async page => { await page.getByLabel("Nom de l'agence").fill('Agence sans contact'); } }, async ({ page, calls }) => {
  check('sans téléphone ni e-mail : aucun appel', calls.length === 0);
  check('message d\'erreur contact', await page.getByRole('alert').filter({ hasText: 'Indiquez un téléphone ou un e-mail.' }).isVisible());
});

await scenario(browser, 'téléphone invalide', { respond: ok, fill: async page => { await page.getByLabel("Nom de l'agence").fill('Agence'); await page.getByLabel('WhatsApp / Téléphone').fill('0612'); } }, async ({ page, calls }) => {
  check('téléphone invalide : aucun appel', calls.length === 0);
  check('message téléphone invalide', await page.getByRole('alert').filter({ hasText: "Ce numéro de téléphone n'est pas valide." }).isVisible());
});

await scenario(browser, 'panne', { respond: (route, n) => n === 1 ? route.fulfill({ status: 502, body: 'bad gateway' }) : ok(route), fill: async page => { await page.getByLabel("Nom de l'agence").fill('Agence Panne'); await page.getByLabel('WhatsApp / Téléphone').fill('+33 6 12 34 56 78'); } }, async ({ page, popups, calls }) => {
  check('panne : réception non confirmée annoncée', await page.getByRole('alert').filter({ hasText: "Nous n'avons pas reçu de confirmation" }).isVisible());
  check('panne : champs verrouillés', await page.getByLabel("Nom de l'agence").isDisabled());
  await page.getByRole('button', { name: 'Envoyer via WhatsApp' }).click();
  await page.waitForTimeout(500);
  check('panne : secours WhatsApp avec les données', popups.length === 1 && popups[0].includes('Agence : Agence Panne') && popups[0].includes('+33612345678'), popups[0]);
  await page.getByRole('button', { name: 'Renvoyer la même inscription' }).click();
  await page.waitForTimeout(800);
  check('panne : renvoi avec même clé et même contenu', calls.length === 2 && JSON.stringify(calls[0]) === JSON.stringify(calls[1]));
  check('panne : confirmation après renvoi', await page.getByText('Inscription reçue, merci.').isVisible());
});

// Réponse perdue (connexion coupée), l'agence corrige son numéro : impossible, le renvoi est identique.
await scenario(browser, 'réponse perdue', {
  respond: (route, n) => n === 1 ? route.abort('connectionreset') : route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([{ created: false }]) }),
  fill: async page => { await page.getByLabel("Nom de l'agence").fill('Agence Avant'); await page.getByLabel('WhatsApp / Téléphone').fill('0600000101'); },
}, async ({ page, calls }) => {
  check('perdue : encadré « en attente de confirmation »', await page.getByTestId('partner-pending').isVisible());
  check('perdue : téléphone non modifiable', await page.getByLabel('WhatsApp / Téléphone').isDisabled());
  const editable = await page.getByLabel('WhatsApp / Téléphone').fill('0600000102', { timeout: 1000 }).then(() => true, () => false);
  check('perdue : la correction est refusée par le formulaire', !editable);
  await page.reload({ waitUntil: 'networkidle' });
  check('perdue : tentative conservée après rechargement', await page.getByTestId('partner-pending').filter({ hasText: '+212600000101' }).isVisible());
  await page.getByRole('button', { name: 'Renvoyer la même inscription' }).click();
  await page.waitForTimeout(800);
  check('perdue : même clé et même contenu au renvoi', calls.length === 2 && JSON.stringify(calls[0]) === JSON.stringify(calls[1]));
  check('perdue : confirmation affiche ce qui est enregistré', await page.getByRole('status').filter({ hasText: 'Agence Avant · Casablanca · +212600000101' }).isVisible());
  check('perdue : tentative effacée', await page.evaluate(() => sessionStorage.getItem('benatna.partnerPending')) === null);
});

await scenario(browser, 'réponse illisible', {
  respond: (route, n) => n === 1 ? route.fulfill({ status: 200, contentType: 'application/json', body: 'pas du json' }) : ok(route),
  fill: async page => { await page.getByLabel("Nom de l'agence").fill('Agence Illisible'); await page.getByLabel('Email').fill('x@agence.ma'); },
}, async ({ page }) => {
  check('illisible : traité comme non confirmé', await page.getByTestId('partner-pending').isVisible());
});

await scenario(browser, 'conflit', {
  respond: route => route.fulfill({ status: 409, contentType: 'application/json', body: JSON.stringify({ code: '23505', message: 'partner_idempotency_conflict' }) }),
  fill: async page => { await page.getByLabel("Nom de l'agence").fill('Agence Conflit'); await page.getByLabel('Email').fill('c@agence.ma'); },
}, async ({ page }) => {
  check('conflit : message explicite, rien de modifié', await page.getByRole('alert').filter({ hasText: "n'a pas été modifiée" }).isVisible());
  check('conflit : secours WhatsApp proposé', await page.getByRole('button', { name: 'Envoyer via WhatsApp' }).isVisible());
  check('conflit : pas présenté comme enregistré', !(await page.getByText('Inscription reçue, merci.').isVisible()));
  check('conflit : pas de tentative en attente', !(await page.getByTestId('partner-pending').isVisible()));
});

await scenario(browser, 'limite', { respond: route => route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ code: 'P0001', message: 'partner_rate_limited' }) }), fill: async page => { await page.getByLabel("Nom de l'agence").fill('Agence'); await page.getByLabel('Email').fill('a@b.ma'); } }, async ({ page }) => {
  check('limite : message dédié', await page.getByRole('alert').filter({ hasText: 'Plusieurs inscriptions' }).isVisible());
});

await browser.close();
console.log(failures.length ? `${failures.length} échec(s)` : 'Tous les contrôles sont passés.');
process.exit(failures.length ? 1 : 0);
