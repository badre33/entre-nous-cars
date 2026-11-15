// Scénarios du contrat submit_booking (Claude / Codex, 15/11/2026), contre une fonction simulée.
// Prérequis : build avec VITE_BOOKING_PERSISTENCE=on et VITE_SUPABASE_URL=https://fake.supabase.co,
// servi sur BOOKING_TEST_URL (défaut http://127.0.0.1:4320).
import { chromium, devices } from 'playwright';
const BASE = process.env.BOOKING_TEST_URL || 'http://127.0.0.1:4320';
const executablePath = process.env.CHROME_PATH || undefined;
const failures = [];
const check = (name, ok, detail = '') => { console.log(`${ok ? 'OK ' : 'ÉCHEC'} ${name}${detail ? ` (${detail})` : ''}`); if (!ok) failures.push(name); };
const day = n => new Date(Date.now() + n * 864e5).toISOString().slice(0, 10);
// Réservation simulée par défaut

async function scenario(browser, name, { respond, blockWhatsApp = false, phone = '+33 6 12 34 56 78', clicks = 1, retry = false, before, timezoneId }, verify) {
  const context = await browser.newContext({ ...devices['iPhone 13'], ...(timezoneId ? { timezoneId } : {}) });
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
  await dialog.getByLabel('Numéro de téléphone').fill(phone);
  if (before) await before({ page, dialog });
  const save = dialog.getByRole('button', { name: /Enregistrer ma réservation/ });
  if (clicks === 0) { await verify({ page, dialog, calls, events, popups }); await context.close(); return; }
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
  check('validation : saisie conservée (récapitulatif et téléphone)', (await dialog.getByLabel('Numéro de téléphone').inputValue()) === '+33 6 12 34 56 78');
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
await scenario(browser, 'conflit d’idempotence', { respond: (route, n) => n === 1 ? route.fulfill({ status: 409, contentType: 'application/json', body: JSON.stringify({ code: '23505', message: 'idempotency_conflict' }) }) : ok('BN-CFL234')(route) }, async ({ page, calls, dialog }) => {
  check('conflit : pas de nouvelle clé automatique', calls.length === 1 && /nouvelle demande/.test(await dialog.innerText()) && !/Réservation enregistrée/.test(await dialog.innerText()));
  await dialog.getByRole('button', { name: /Enregistrer comme nouvelle demande/ }).click(); await page.waitForTimeout(1000);
  check('conflit : nouvelle clé seulement après le choix explicite', calls.length === 2 && calls[0].p_idempotency_key !== calls[1].p_idempotency_key);
  check('conflit : succès après la nouvelle demande', (await dialog.innerText()).includes('BN-CFL234'));
});
const abortFirst = later => (route, n) => n === 1 ? route.abort('connectionreset') : later(route, n);
const json = (status, body) => route => route.fulfill({ status, contentType: 'application/json', body: typeof body === 'string' ? body : JSON.stringify(body) });
const switchToFull = async (page, dialog) => { await dialog.getByRole('radio').nth(1).check(); await dialog.getByRole('button', { name: /Enregistrer ma réservation/ }).click(); await page.waitForTimeout(1200); };
await scenario(browser, 'coupure après insertion puis modification', { respond: abortFirst(json(200, [{ reference: 'BN-OLD234', created: false }])) }, async ({ page, calls, dialog, events }) => {
  await switchToFull(page, dialog);
  check('après insertion : rejeu de la tentative précédente (même clé, ancien paiement)', calls.length === 2 && calls[1].p_idempotency_key === calls[0].p_idempotency_key && calls[1].p_payment === 'deposit');
  const text = await dialog.innerText();
  check('après insertion : premier envoi présenté comme déjà enregistré, infos sauvegardées affichées', text.includes('BN-OLD234') && /premier envoi avait déjà été enregistré/.test(text) && /Enregistré : du/.test(text));
  check('après insertion : paiement affiché = celui enregistré', /Acompte de 30 %/.test(text));
  check('après insertion : booking_submitted une fois', events.filter(e => e.name === 'booking_submitted').length === 1);
});
await scenario(browser, 'coupure avant insertion puis modification', { respond: abortFirst(json(200, [{ reference: 'BN-NEW234', created: true }])) }, async ({ page, calls, dialog, popups }) => {
  await switchToFull(page, dialog);
  const text = await dialog.innerText();
  check('avant insertion : message exact (créée avec le premier envoi)', /enregistré votre réservation avec les informations de votre premier envoi/.test(text) && !/déjà été enregistré/.test(text));
  check('avant insertion : modifications signalées comme non enregistrées', /modifications ne sont pas enregistrées/.test(text));
  await dialog.getByRole('button', { name: /Continuer sur WhatsApp/ }).click(); await page.waitForTimeout(800);
  check('avant insertion : modifications transmises dans le message WhatsApp', popups.length === 1 && /Modifications souhaitées/.test(popups[0]) && /100 % avant la location/.test(popups[0]) && popups[0].includes('BN-NEW234'));
});
await scenario(browser, 'conflit pendant la reprise', { respond: (route, n) => n === 1 ? route.abort('connectionreset') : n === 2 ? json(409, { code: '23505', message: 'idempotency_conflict' })(route) : json(200, [{ reference: 'BN-RCF234', created: true }])(route) }, async ({ page, calls, dialog }) => {
  await switchToFull(page, dialog);
  check('conflit en reprise : arrêt, aucun troisième appel', calls.length === 2 && /pas encore vérifier/.test(await dialog.innerText()));
  await dialog.getByRole('button', { name: /Enregistrer comme nouvelle demande/ }).click(); await page.waitForTimeout(1000);
  check('conflit en reprise : nouvelle clé seulement après le choix explicite, avec le contenu actuel', calls.length === 3 && calls[2].p_idempotency_key !== calls[0].p_idempotency_key && calls[2].p_payment === 'full');
});
await scenario(browser, 'reprise indisponible', { respond: (route, n) => n === 1 ? route.abort('connectionreset') : json(503, { message: 'upstream' })(route) }, async ({ page, calls, dialog }) => {
  await switchToFull(page, dialog);
  check('reprise indisponible : arrêt sans nouvel envoi', calls.length === 2 && calls[1].p_idempotency_key === calls[0].p_idempotency_key);
  await dialog.getByRole('button', { name: /Enregistrer ma réservation/ }).click(); await page.waitForTimeout(1000);
  check('reprise indisponible : un nouvel essai rejoue encore l’ancienne tentative', calls.length === 3 && calls[2].p_idempotency_key === calls[0].p_idempotency_key && calls[2].p_payment === 'deposit');
});
await scenario(browser, 'reprise en HTTP 400 non reconnu', { respond: (route, n) => n === 1 ? route.abort('connectionreset') : n === 2 ? json(400, '<html>Bad Request')(route) : json(200, [{ reference: 'BN-UNK234', created: true }])(route) }, async ({ page, calls, dialog }) => {
  await switchToFull(page, dialog);
  check('400 non reconnu en reprise : arrêt, aucun nouvel enregistrement', calls.length === 2 && /pas encore vérifier/.test(await dialog.innerText()));
  await dialog.getByRole('button', { name: /Enregistrer ma réservation/ }).click(); await page.waitForTimeout(1000);
  check('400 non reconnu en reprise : le réessai rejoue l’ancienne clé', calls.length === 3 && calls[2].p_idempotency_key === calls[0].p_idempotency_key && calls[2].p_payment === 'deposit');
});
await scenario(browser, 'premier appel en HTTP 400 non reconnu', { respond: (route, n) => n === 1 ? json(400, '') (route) : json(200, [{ reference: 'BN-UN2234', created: false }])(route) }, async ({ page, calls, dialog }) => {
  check('400 non reconnu : pas présenté comme refus de validation', !/pas pu être validées/.test(await dialog.innerText()));
  await switchToFull(page, dialog);
  check('400 non reconnu : tentative conservée et rejouée avant le nouveau contenu', calls.length === 2 && calls[1].p_idempotency_key === calls[0].p_idempotency_key && calls[1].p_payment === 'deposit');
});
await scenario(browser, 'reprise avec message invalid_phone sans code', { respond: (route, n) => n === 1 ? route.abort('connectionreset') : n === 2 ? json(400, { message: 'invalid_phone' })(route) : json(200, [{ reference: 'BN-PHX234', created: true }])(route) }, async ({ page, calls, dialog }) => {
  await switchToFull(page, dialog);
  check('message seul sans code : reste incertain, aucun nouvel enregistrement', calls.length === 2 && /pas encore vérifier/.test(await dialog.innerText()));
});
await scenario(browser, 'conflit annoncé sans code', { respond: (route, n) => n === 1 ? json(409, { message: 'idempotency_conflict' })(route) : json(200, [{ reference: 'BN-CNC234', created: false }])(route) }, async ({ page, calls, dialog }) => {
  const t = await dialog.innerText(); check('conflit sans code : traité comme résultat inconnu, pas comme conflit', /pas pu être enregistrée/.test(t) && !/avec d’autres informations/.test(t));
  await switchToFull(page, dialog);
  check('conflit sans code : tentative conservée et rejouée', calls.length === 2 && calls[1].p_idempotency_key === calls[0].p_idempotency_key);
});
await scenario(browser, 'réponse 200 tronquée', { respond: (route, n) => n === 1 ? json(200, '[{"refer')(route) : json(200, [{ reference: 'BN-TRC234', created: false }])(route) }, async ({ page, calls, dialog, events }) => {
  check('200 tronquée : pas de succès affiché', !/Réservation enregistrée/.test(await dialog.innerText()));
  await switchToFull(page, dialog);
  check('200 tronquée : rejeu de la clé initiale avec l’ancien contenu', calls.length === 2 && calls[1].p_idempotency_key === calls[0].p_idempotency_key && calls[1].p_payment === 'deposit');
  check('200 tronquée : une seule demande retrouvée', (await dialog.innerText()).includes('BN-TRC234') && events.filter(e => e.name === 'booking_submitted').length === 1);
});
await scenario(browser, 'téléphone ou paiement modifiés après un refus', { respond: (route, n) => n === 1 ? route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ code: '22023', message: 'invalid_phone' }) }) : ok('BN-PHN234')(route) }, async ({ page, calls, dialog }) => {
  check('refus du téléphone : message sur le téléphone', /numéro de téléphone avec l’indicatif/.test(await dialog.innerText()));
  await dialog.getByLabel('Numéro de téléphone').fill('+44 7700 900123');
  await dialog.getByRole('button', { name: /Enregistrer ma réservation/ }).click(); await page.waitForTimeout(1000);
  check('contenu modifié : nouvelle clé', calls.length === 2 && calls[0].p_idempotency_key !== calls[1].p_idempotency_key && calls[1].p_phone === '+447700900123');
});
await scenario(browser, 'fermeture pendant l’enregistrement', { respond: async (route, n) => { if (n === 1) { await new Promise(r => setTimeout(r, 1500)); return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([{ reference: 'BN-CLO234', created: true }]) }); } return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([{ reference: 'BN-CLO234', created: false }]) }); }, clicks: 1, before: async ({ dialog }) => {} }, async ({ page, calls, events }) => {
  await page.keyboard.press('Escape'); await page.waitForTimeout(2000); // la réponse arrive après fermeture
  check('fermeture : aucun écran de succès ouvert tout seul', await page.getByRole('dialog').count() === 0);
  await page.getByRole('button', { name: /^Réserver$/ }).first().click();
  const dialog = page.getByRole('dialog');
  await dialog.getByLabel('Numéro de téléphone').fill('+33 6 12 34 56 78');
  await dialog.getByRole('button', { name: /Enregistrer ma réservation/ }).click(); await page.waitForTimeout(1000);
  check('fermeture : même contenu, même clé à la réouverture', calls.length === 2 && calls[0].p_idempotency_key === calls[1].p_idempotency_key);
  check('fermeture : référence retrouvée', (await dialog.innerText()).includes('BN-CLO234'));
  check('fermeture : booking_submitted une fois', events.filter(e => e.name === 'booking_submitted').length === 1);
});
await scenario(browser, 'fuseau du visiteur', { clicks: 0, timezoneId: 'Pacific/Kiritimati', respond: ok('BN-TZZ234') }, async ({ page }) => {
  const casablanca = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Casablanca', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const min = await page.locator('input[type=date]').first().getAttribute('min');
  check('fuseau : date minimale = aujourd’hui à Casablanca', min === casablanca, `${min} / ${casablanca}`);
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
