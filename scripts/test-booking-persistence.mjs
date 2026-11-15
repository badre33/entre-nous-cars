// Scénarios du contrat submit_booking (Claude / Codex, 15/11/2026), contre une fonction simulée.
// Prérequis : build avec VITE_BOOKING_PERSISTENCE=on et VITE_SUPABASE_URL=https://fake.supabase.co,
// servi sur BOOKING_TEST_URL (défaut http://127.0.0.1:4320).
import { chromium, devices } from 'playwright';
const BASE = process.env.BOOKING_TEST_URL || 'http://127.0.0.1:4320';
const executablePath = process.env.CHROME_PATH || undefined;
const failures = [];
const check = (name, ok, detail = '') => { console.log(`${ok ? 'OK ' : 'ÉCHEC'} ${name}${detail ? ` (${detail})` : ''}`); if (!ok) failures.push(name); };
const day = n => new Date(Date.now() + n * 864e5).toISOString().slice(0, 10);

async function scenario(browser, name, { respond, blockWhatsApp = false, phone = '+33 6 12 34 56 78', clicks = 1, retry = false }, verify) {
  const context = await browser.newContext({ ...devices['iPhone 13'] });
  const calls = []; const events = []; const popups = [];
  await context.route('**/fake.supabase.co/**', async route => {
    const request = route.request(); const url = request.url();
    const body = JSON.parse(request.postData() || '{}');
    if (url.endsWith('/rpc/submit_booking')) { calls.push(body); return respond(route, calls.length, body); }
    if (url.endsWith('/rpc/insert_analytics_event')) events.push({ name: body.p_event_name, properties: body.p_properties });
    return route.fulfill({ status: 200, contentType: 'application/json', body: 'null' });
  });
  await context.route(/wa\.me|whatsapp\.com/, route => { popups.push(new URL(route.request().url()).searchParams.get('text') || ''); return route.fulfill({ status: 200, body: 'wa' }); });
  if (blockWhatsApp) await context.addInitScript(() => { window.__blockWA = true; const open = window.open; Object.defineProperty(window, 'open', { configurable: true, get: () => (...a) => window.__blockWA ? null : open.apply(window, a), set: () => {} }); });
  const page = await context.newPage();
  await page.goto(`${BASE}/vehicule/dacia-duster`, { waitUntil: 'networkidle' });
  const dates = page.locator('input[type=date]');
  await dates.nth(0).fill(day(20)); await dates.nth(1).fill(day(25));
  await page.getByRole('button', { name: /^Réserver$/ }).first().click();
  const dialog = page.getByRole('dialog');
  await dialog.getByLabel('Numéro WhatsApp').fill(phone);
  const save = dialog.getByRole('button', { name: /Enregistrer ma réservation/ });
  if (clicks === 2) await save.dblclick(); else await save.click();
  await page.waitForTimeout(1200);
  if (retry) { await dialog.getByRole('button', { name: /Enregistrer ma réservation/ }).click(); await page.waitForTimeout(1200); }
  await verify({ page, dialog, calls, events, popups });
  await context.close();
}
const ok = ref => (route, n, body) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([{ reference: ref, created: true }]) });

const browser = await chromium.launch({ executablePath });
await scenario(browser, 'réussite', { respond: ok('BN-ABC234') }, async ({ dialog, calls, events, popups, page }) => {
  check('réussite : un seul appel', calls.length === 1);
  check('réussite : ordre des voitures et estimation par voiture', JSON.stringify(calls[0].p_vehicles) === '["Dacia Duster"]' && calls[0].p_estimates_client.length === 1);
  check('réussite : téléphone E.164', calls[0].p_phone === '+33612345678', calls[0].p_phone);
  check('réussite : écran Réservation enregistrée avec la référence serveur', (await dialog.innerText()).includes('BN-ABC234'));
  check('réussite : pas de WhatsApp avant le clic', popups.length === 0);
  check('réussite : booking_submitted une fois', events.filter(e => e.name === 'booking_submitted').length === 1);
  check('réussite : téléphone absent des événements', !JSON.stringify(events).includes('612345678'));
  await dialog.getByRole('button', { name: /Continuer sur WhatsApp/ }).click(); await page.waitForTimeout(800);
  check('réussite : WhatsApp ouvert avec BN-ABC234', popups.length === 1 && popups[0].includes('BN-ABC234'));
  check('réussite : whatsapp_handoff après le clic', events.some(e => e.name === 'whatsapp_handoff'));
});
await scenario(browser, 'validation refusée', { respond: route => route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ code: '22023', message: 'Rental period too short' }) }) }, async ({ dialog, events, popups }) => {
  const text = await dialog.innerText();
  check('validation : message d’erreur, pas d’écran de succès', /pas pu être validées/.test(text) && !/Réservation enregistrée/.test(text));
  check('validation : saisie conservée (récapitulatif et téléphone)', (await dialog.getByLabel('Numéro WhatsApp').inputValue()) === '+33 6 12 34 56 78');
  check('validation : aucun booking_submitted ni WhatsApp', !events.some(e => e.name === 'booking_submitted') && popups.length === 0);
  check('validation : secours WhatsApp proposé', /sans numéro de réservation/.test(text));
});
await scenario(browser, 'coupure réseau après insertion', { retry: true, respond: (route, n) => n === 1 ? route.abort('connectionreset') : route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([{ reference: 'BN-NET234', created: false }]) }) }, async ({ dialog, calls, events }) => {
  check('réseau : même clé aux deux tentatives', calls.length === 2 && calls[0].p_idempotency_key === calls[1].p_idempotency_key);
  check('réseau : réservation retrouvée', (await dialog.innerText()).includes('BN-NET234'));
  check('réseau : booking_submitted une seule fois', events.filter(e => e.name === 'booking_submitted').length === 1);
});
await scenario(browser, 'double clic', { clicks: 2, respond: async (route) => { await new Promise(r => setTimeout(r, 700)); return ok('BN-DBL234')(route); } }, async ({ calls }) => {
  check('double clic : un seul appel', calls.length === 1, `${calls.length} appel(s)`);
});
await scenario(browser, 'conflit d’idempotence', { retry: true, respond: (route, n) => n === 1 ? route.fulfill({ status: 409, contentType: 'application/json', body: JSON.stringify({ code: '23505', message: 'idempotency_conflict' }) }) : ok('BN-CFL234')(route) }, async ({ calls, dialog }) => {
  check('conflit : nouvelle clé pour la tentative suivante', calls.length === 2 && calls[0].p_idempotency_key !== calls[1].p_idempotency_key);
  check('conflit : succès seulement après la seconde réponse', (await dialog.innerText()).includes('BN-CFL234'));
});
await scenario(browser, 'téléphone invalide', { phone: '0612', respond: ok('BN-XXX234') }, async ({ calls, dialog, events }) => {
  check('téléphone : aucun appel serveur', calls.length === 0);
  check('téléphone : message avec indicatif', /indicatif du pays/.test(await dialog.innerText()));
  check('téléphone : erreur mesurée', events.some(e => e.name === 'booking_validation_error' && e.properties.element_type === 'telephone'));
});
await scenario(browser, 'WhatsApp impossible', { blockWhatsApp: true, respond: ok('BN-WAB234') }, async ({ page, dialog, events }) => {
  await dialog.getByRole('button', { name: /Continuer sur WhatsApp/ }).click(); await page.waitForTimeout(500);
  const text = await dialog.innerText();
  check('WhatsApp bloqué : réservation toujours affichée', text.includes('BN-WAB234'));
  check('WhatsApp bloqué : message et bouton Réessayer', /ne s’est pas ouvert/.test(text) && /Réessayer WhatsApp/.test(text));
  check('WhatsApp bloqué : booking_whatsapp_blocked mesuré', events.some(e => e.name === 'booking_whatsapp_blocked'));
});
await browser.close();
if (failures.length) { console.error(`${failures.length} échec(s)`); process.exit(1); }
console.log('Tous les scénarios passent.');
