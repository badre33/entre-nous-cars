// Inscription des loueurs partenaires (étape 1, décisions de Badre du 18/11/2026).
// Activée seulement si VITE_PARTNER_PERSISTENCE=on, une fois register_partner appliquée
// sur la base cible. Sinon la page garde l'envoi WhatsApp actuel.
import { composePhone } from '@/utils/bookingApi';

export const partnerPersistenceEnabled = () => import.meta.env.VITE_PARTNER_PERSISTENCE === 'on';

export const PARTNER_CITIES = ['Casablanca', 'Rabat'] as const;
export type PartnerCity = (typeof PARTNER_CITIES)[number];

export const partnerStatuses = {
  inscrit: 'Inscrit, à contacter',
  attribution_provisoire: 'Attribution provisoire, vérification en cours',
  verifie: 'Vérifié',
  suspendu: 'Suspendu',
} as const;

export interface PartnerInput {
  agencyName: string; city: PartnerCity; countryCode: string; phone: string; email: string;
  fleetSize: string; message: string; language: string; idempotencyKey: string;
}

export type PartnerCheck =
  | { ok: true; phone: string | null; email: string | null; fleetSize: number | null }
  | { ok: false; field: 'agency' | 'contact' | 'phone' | 'email' | 'fleet' };

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Contrôle côté client, aligné sur register_partner : agence, ville, et téléphone OU e-mail. */
export function checkPartner(input: Pick<PartnerInput, 'agencyName' | 'countryCode' | 'phone' | 'email' | 'fleetSize'>): PartnerCheck {
  const name = input.agencyName.trim();
  if (name.length < 2 || name.length > 80) return { ok: false, field: 'agency' };
  const rawPhone = input.phone.trim();
  const rawEmail = input.email.trim().toLowerCase();
  if (!rawPhone && !rawEmail) return { ok: false, field: 'contact' };
  const phone = rawPhone ? composePhone(input.countryCode, rawPhone) : null;
  if (rawPhone && !phone) return { ok: false, field: 'phone' };
  if (rawEmail && (rawEmail.length > 120 || !EMAIL.test(rawEmail))) return { ok: false, field: 'email' };
  const fleetText = input.fleetSize.trim();
  const fleet = fleetText ? Number(fleetText) : null;
  if (fleet !== null && (!Number.isInteger(fleet) || fleet < 1 || fleet > 5000)) return { ok: false, field: 'fleet' };
  return { ok: true, phone, email: rawEmail || null, fleetSize: fleet };
}

export type RegisterPartnerResult =
  | { ok: true; created: boolean }
  | { ok: false; reason: 'validation' | 'rate_limited' | 'conflict' | 'network' | 'unknown' | 'unavailable' };

/** Réponse perdue ou illisible : l'inscription a peut-être été enregistrée. Il faut la renvoyer à l'identique. */
export const isUncertainFailure = (reason: string) => reason === 'network' || reason === 'unknown';

export async function registerPartner(input: PartnerInput): Promise<RegisterPartnerResult> {
  const checked = checkPartner(input);
  if (checked.ok === false) return { ok: false, reason: 'validation' };
  const valid = checked as Extract<PartnerCheck, { ok: true }>;
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key || key.startsWith('sb_secret_')) return { ok: false, reason: 'unavailable' };
  const headers: Record<string, string> = { apikey: key, 'Content-Type': 'application/json' };
  if (key.startsWith('eyJ')) headers.Authorization = `Bearer ${key}`;
  let response: Response;
  try {
    response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/rpc/register_partner`, {
      method: 'POST', headers, credentials: 'omit',
      body: JSON.stringify({
        p_idempotency_key: input.idempotencyKey,
        p_agency_name: input.agencyName.trim(),
        p_city: input.city,
        p_phone: valid.phone,
        p_email: valid.email,
        p_fleet_size: valid.fleetSize,
        p_message: input.message.trim() || null,
        p_language: ['fr', 'en', 'es'].includes(input.language) ? input.language : 'fr',
      }),
    });
  } catch { return { ok: false, reason: 'network' }; }
  let body: unknown = null;
  try { body = await response.json(); } catch { /* corps vide */ }
  if (response.ok) {
    const row = Array.isArray(body) ? body[0] : body;
    const created = row && typeof row === 'object' ? (row as { created?: unknown }).created : undefined;
    return typeof created === 'boolean' ? { ok: true, created } : { ok: false, reason: 'unknown' };
  }
  const code = body && typeof body === 'object' ? String((body as { code?: unknown }).code ?? '') : '';
  const message = body && typeof body === 'object' ? String((body as { message?: unknown }).message ?? '') : '';
  if (code === 'P0001' && message === 'partner_rate_limited') return { ok: false, reason: 'rate_limited' };
  if (code === '22023') return { ok: false, reason: 'validation' };
  if (code === '23505' && message === 'partner_idempotency_conflict') return { ok: false, reason: 'conflict' };
  return { ok: false, reason: 'unknown' };
}

/** Message WhatsApp de secours (flag désactivé ou enregistrement impossible). */
export function partnerWhatsAppText(input: Pick<PartnerInput, 'agencyName' | 'city' | 'countryCode' | 'phone' | 'email' | 'fleetSize' | 'message'>): string {
  const checked = checkPartner(input);
  const phone = checked.ok ? (checked as Extract<PartnerCheck, { ok: true }>).phone : input.phone.trim();
  const lines = [
    'Nouvelle inscription loueur partenaire', '',
    `Agence : ${input.agencyName.trim()}`, `Ville : ${input.city}`,
  ];
  if (phone) lines.push(`Téléphone : ${phone}`);
  if (input.email.trim()) lines.push(`E-mail : ${input.email.trim()}`);
  if (input.fleetSize.trim()) lines.push(`Flotte : ${input.fleetSize.trim()} véhicules`);
  if (input.message.trim()) lines.push('', `Message : ${input.message.trim()}`);
  return lines.join('\n');
}

/** RIB marocain : 24 chiffres. Espaces, tirets et points sont retirés ; tout autre caractère (nom du titulaire) est refusé. */
export function normalizeRib(value: string): string | null {
  const compact = value.replace(/[\s.-]/g, '');
  return /^[0-9]{24}$/.test(compact) ? compact : null;
}
export const formatRib = (rib: string) => rib.replace(/^(\d{3})(\d{3})(\d{16})(\d{2})$/, '$1 $2 $3 $4');

/** Résumé affiché : agence, ville et contact tels qu'ils sont envoyés. */
export function partnerRecap(input: PartnerInput): string[] {
  const checked = checkPartner(input);
  const valid = checked.ok ? (checked as Extract<PartnerCheck, { ok: true }>) : null;
  return [input.agencyName.trim(), input.city, valid?.phone, valid?.email].filter((x): x is string => !!x);
}

export const PENDING_PARTNER_KEY = 'benatna.partnerPending';
/** Tentative incertaine conservée pour la session : renvoyée à l'identique, même après rechargement. */
export function readPendingPartner(): PartnerInput | null {
  try {
    const raw = sessionStorage.getItem(PENDING_PARTNER_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<PartnerInput>;
    const fields = ['agencyName', 'city', 'countryCode', 'phone', 'email', 'fleetSize', 'message', 'language', 'idempotencyKey'] as const;
    if (!value || fields.some(f => typeof value[f] !== 'string') || !PARTNER_CITIES.includes(value.city as PartnerCity)
        || !/^[0-9a-f-]{36}$/i.test(value.idempotencyKey as string)) return null;
    return value as PartnerInput;
  } catch { return null; }
}
