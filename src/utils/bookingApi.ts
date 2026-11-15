// Enregistrement durable d'une réservation (contrat commun Claude / Codex, 15 novembre 2026).
// Activé seulement si VITE_BOOKING_PERSISTENCE=on, une fois la fonction submit_booking
// validée et appliquée sur la base cible. Sinon le parcours actuel reste inchangé.
import { normalizeVehicleName, rentalEstimate, type ConfirmedRental } from '@/utils/rentalRequest';
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
  | { ok: false; reason: 'validation' | 'conflict' | 'network' | 'unavailable'; message?: string };

export interface SubmitBookingInput { booking: ConfirmedRental; phone: string; language: string; idempotencyKey: string; sessionId: string }

export function submitBookingPayload({ booking, phone, language, idempotencyKey, sessionId }: SubmitBookingInput) {
  const vehicles = booking.vehicles.map(normalizeVehicleName);
  return {
    p_idempotency_key: idempotencyKey,
    p_vehicles: vehicles, // ordre = préférences du client
    // Prix total estimé du séjour en MAD par voiture, même ordre ; non vérifié, informatif.
    p_estimates_client: vehicles.map(name => rentalEstimate(name, booking.startDate, booking.endDate, booking.city)?.total ?? null),
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
    return { ok: false, reason: 'unavailable' };
  }
  const code = body && typeof body === 'object' ? String((body as { code?: unknown }).code ?? '') : '';
  const message = body && typeof body === 'object' ? String((body as { message?: unknown }).message ?? '') : '';
  // Codes convenus : 22023 = données refusées, 23505 / idempotency_conflict = même clé, autres données.
  if (code === '23505' || message.includes('idempotency_conflict')) return { ok: false, reason: 'conflict' };
  if (code === '22023' || code === '22007' || code === '22P02' || response.status === 400) return { ok: false, reason: 'validation', message };
  if (response.status >= 500 || response.status === 0) return { ok: false, reason: 'network' };
  return { ok: false, reason: 'unavailable' };
}
