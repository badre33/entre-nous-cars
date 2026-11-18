// Enregistrement durable d'une réservation (contrat commun Claude / Codex, 15 novembre 2026).
// Activé seulement si VITE_BOOKING_PERSISTENCE=on, une fois la fonction submit_booking
// validée et appliquée sur la base cible. Sinon le parcours actuel reste inchangé.
import { isOtherVehicle, normalizeVehicleName, OTHER_VEHICLE, otherVehicleText, rentalEstimate, rentalPlace, type ConfirmedRental } from '@/utils/rentalRequest';
import { isTestMode } from '@/utils/testMode';

export const bookingPersistenceEnabled = () => import.meta.env.VITE_BOOKING_PERSISTENCE === 'on';

/** Téléphone international au format E.164 (+ et 8 à 15 chiffres), ou null. « 00 » est accepté pour « + ». */
export function normalizePhone(input: string): string | null {
  const compact = input.trim().replace(/[\s.()-]/g, '');
  const withPlus = compact.startsWith('00') ? `+${compact.slice(2)}` : compact;
  return /^\+[1-9]\d{7,14}$/.test(withPlus) ? withPlus : null;
}

export type SubmitBookingResult =
  | { ok: true; reference: string; created: boolean }
  | { ok: false; reason: 'validation' | 'phone' | 'conflict' | 'rate_limited' | 'network' | 'unknown' | 'unavailable'; message?: string };

/** Appel envoyé dont le résultat n'est pas connu : la demande a pu être enregistrée. */
export const outcomeUnknown = (reason: string) => reason === 'network' || reason === 'unknown';
/** Seul un refus de validation (transaction annulée côté serveur) garantit qu'aucune demande n'a été créée. */
export const definitelyNotSaved = (reason: string) => reason === 'validation' || reason === 'phone';

export interface SubmitBookingInput { booking: ConfirmedRental; phone: string; language: string; idempotencyKey: string; sessionId: string }

/** Contenu métier normalisé d'une tentative (sans session ni indication de test) : une clé d'idempotence par contenu. */
export function bookingSignature(input: Omit<SubmitBookingInput, 'idempotencyKey' | 'sessionId'>): string {
  const { p_idempotency_key: _key, p_session_id: _session, p_test_hint: _test, ...business } = submitBookingPayload({ ...input, idempotencyKey: '', sessionId: '' });
  return JSON.stringify(business);
}

export function submitBookingPayload({ booking, phone, language, idempotencyKey, sessionId }: SubmitBookingInput) {
  // « Autre modèle » (#118) : la position est gardée dans p_vehicles avec la valeur OTHER_VEHICLE,
  // le nom saisi part dans p_other_vehicle (texte libre, 2 à 60 caractères, sans estimation).
  const vehicles = booking.vehicles.map(name => isOtherVehicle(name) ? OTHER_VEHICLE : normalizeVehicleName(name));
  const other = booking.vehicles.find(isOtherVehicle);
  return {
    p_idempotency_key: idempotencyKey,
    p_vehicles: vehicles, // ordre = préférences du client
    p_other_vehicle: other ? otherVehicleText(other).trim() : null,
    // Prix total estimé du séjour en MAD par voiture, même ordre ; non vérifié, informatif.
    p_estimates_client: vehicles.map(name => name === OTHER_VEHICLE ? null : rentalEstimate(name, booking.startDate, booking.endDate, booking.city)?.total ?? null),
    p_start_date: booking.startDate,
    p_end_date: booking.endDate,
    p_city: booking.city,
    p_pickup_id: booking.pickupId,
    p_pickup_address: booking.pickupId === 'other' ? booking.otherPlace.trim() : null,
    p_payment: booking.payment === 'full' ? 'full' : 'deposit',
    p_phone: phone,
    p_language: ['fr', 'en', 'es'].includes(language) ? language : 'fr',
    p_session_id: sessionId,
    // Indication seulement : la demande reste visible par l'administrateur.
    p_test_hint: isTestMode(),
  };
}

export async function submitBooking(input: SubmitBookingInput): Promise<SubmitBookingResult> {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key || key.startsWith('sb_secret_')) return { ok: false, reason: 'unavailable' };
  const headers: Record<string, string> = { apikey: key, 'Content-Type': 'application/json' };
  if (key.startsWith('eyJ')) headers.Authorization = `Bearer ${key}`;
  let response: Response;
  try {
    response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/rpc/submit_booking`, {
      method: 'POST', headers, body: JSON.stringify(submitBookingPayload(input)), credentials: 'omit',
    });
  } catch { return { ok: false, reason: 'network' }; }
  let body: unknown = null;
  try { body = await response.json(); } catch { /* corps vide */ }
  if (response.ok) {
    const row = Array.isArray(body) ? body[0] : body;
    const reference = row && typeof row === 'object' ? (row as { reference?: unknown }).reference : undefined;
    if (typeof reference === 'string' && /^BN-[A-Z0-9]{6}$/.test(reference)) return { ok: true, reference, created: (row as { created?: unknown }).created !== false };
    // 2xx illisible ou incomplet : l'enregistrement a pu avoir lieu.
    return { ok: false, reason: 'unknown' };
  }
  const code = body && typeof body === 'object' ? String((body as { code?: unknown }).code ?? '') : '';
  const message = body && typeof body === 'object' ? String((body as { message?: unknown }).message ?? '') : '';
  // Erreurs reconnues uniquement sur le couple code SQL + message de submit_booking ; un message seul ne prouve rien.
  if (code === '23505' && message === 'idempotency_conflict') return { ok: false, reason: 'conflict' };
  if (code === 'P0001' && message === 'booking_rate_limited') return { ok: false, reason: 'rate_limited' };
  if (code === '22023' && message === 'invalid_phone') return { ok: false, reason: 'phone' };
  // Refus de validation : uniquement sur une erreur structurée reconnue (transaction annulée côté serveur).
  if (code === '22023' || code === '22007' || code === '22P02') return { ok: false, reason: 'validation', message };
  // Erreur de passerelle ou réponse inattendue après envoi : résultat inconnu.
  return { ok: false, reason: 'unknown' };
}

/** Écart entre la réservation enregistrée et la saisie actuelle, à transmettre sur WhatsApp. */
export function bookingChanges(saved: ConfirmedRental, current: ConfirmedRental, savedPhone: string, currentPhone: string): string {
  const lines: string[] = [];
  const label = (d: string) => d.split('-').reverse().join('/');
  if (saved.startDate !== current.startDate || saved.endDate !== current.endDate) lines.push(`Dates : du ${label(current.startDate)} au ${label(current.endDate)}`);
  if (saved.vehicles.join('|') !== current.vehicles.join('|')) lines.push(`Voitures : ${current.vehicles.map(v => isOtherVehicle(v) ? `Autre modèle : ${otherVehicleText(v).trim()}` : normalizeVehicleName(v)).join(' / ')}`);
  if (rentalPlace(saved) !== rentalPlace(current)) lines.push(`Lieu : ${rentalPlace(current)}`);
  if ((saved.payment ?? 'deposit') !== (current.payment ?? 'deposit')) lines.push(`Paiement : ${current.payment === 'full' ? '100 % avant la location' : 'acompte de 30 % + 500 DH'}`);
  if (savedPhone !== currentPhone) lines.push(`Téléphone : ${currentPhone}`);
  return lines.length ? `Modifications souhaitées après l'enregistrement :\n${lines.join('\n')}` : '';
}
