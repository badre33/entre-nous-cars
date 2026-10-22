import { appendCampaignCode } from './analyticsPrivacy';
import { isValidRentalPeriod, RENTAL_PERIOD_MESSAGE } from './rentalPeriod';
import { rentalVehicleNames } from '@/data/rentalVehicleNames';
import { pickupPoints } from '@/data/pickupPoints';

export const RENTAL_REQUEST_EVENT = 'benatna:rental-request';
export const WHATSAPP_HANDOFF_EVENT = 'benatna:whatsapp-handoff';
export interface RentalDraft {
  vehicles?: string[];
  startDate?: string;
  endDate?: string;
  city?: 'Casablanca' | 'Rabat';
  pickupId?: string;
  notes?: string;
}
export interface ConfirmedRental {
  vehicles: string[];
  startDate: string;
  endDate: string;
  city: 'Casablanca' | 'Rabat';
  pickupId: string;
  otherPlace: string;
  notes?: string;
}
let pendingDraft: RentalDraft | null = null;
let permittedURL: string | null = null;
let installed = false;
export const localToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
export function normalizeVehicleName(name: string) { return name.replace(/^VW /, 'Volkswagen '); }
export function rentalDefaults(url = new URL(window.location.href)): RentalDraft {
  const query = url.searchParams;
  return {
    startDate: query.get('startDate') || '', endDate: query.get('endDate') || '',
    city: query.get('city') === 'Rabat' || url.pathname.includes('-rabat') ? 'Rabat' : 'Casablanca',
    vehicles: query.getAll('modele'),
  };
}
export function requestRental(draft: RentalDraft = {}) {
  pendingDraft = { ...rentalDefaults(), ...draft };
  window.dispatchEvent(new CustomEvent(RENTAL_REQUEST_EVENT, { detail: pendingDraft }));
}
export function takePendingRental() { const draft = pendingDraft; pendingDraft = null; return draft; }
export function rentalPlace(value: ConfirmedRental): string {
  if (value.pickupId === 'other') return `${value.city} — ${value.otherPlace.trim()}`;
  const point = pickupPoints.find(p => p.id === value.pickupId && p.city === value.city);
  return point ? `${point.city} — ${point.name}` : '';
}
export function validateRental(value: ConfirmedRental): string | null {
  if (!value.vehicles.length || value.vehicles.length > 3 || value.vehicles.some(v => !rentalVehicleNames.includes(normalizeVehicleName(v) as typeof rentalVehicleNames[number]))) return 'Choisissez un véhicule avant de continuer.';
  if (!isValidRentalPeriod(value.startDate, value.endDate)) return RENTAL_PERIOD_MESSAGE;
  if (value.startDate < localToday()) return 'La date de départ ne peut pas être passée.';
  if (!['Casablanca', 'Rabat'].includes(value.city)) return 'Choisissez Casablanca ou Rabat.';
  if (!rentalPlace(value) || (value.pickupId === 'other' && value.otherPlace.trim().length < 5)) return 'Précisez le lieu de prise en charge.';
  return null;
}
const dateLabel = (date: string) => date.split('-').reverse().join('/');
export function buildConfirmedRentalMessage(value: ConfirmedRental): string {
  const error = validateRental(value); if (error) throw new Error(error);
  return `Bonjour Benatna, je souhaite demander une location.\n\nVéhicule(s) souhaité(s) : ${value.vehicles.map(normalizeVehicleName).join(' / ')}\nDépart : ${dateLabel(value.startDate)}\nRetour : ${dateLabel(value.endDate)}\nLieu de prise en charge : ${rentalPlace(value)}\n\nJ’ai vérifié et confirmé ces informations.${value.city === 'Rabat' ? '\nLivraison à Rabat demandée depuis Casablanca, sous réserve de confirmation du loueur.' : ''}\nLivraison gratuite, convenue à l’avance. Merci de confirmer la disponibilité, le tarif final et les conditions.${value.notes?.trim() ? '\n\nPrécisions :\n' + value.notes.trim().slice(0, 1200) : ''}`;
}
function whatsAppURL(value: string | URL | undefined): URL | null {
  try { const url = new URL(String(value), window.location.origin); return url.protocol === 'https:' && ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname) ? url : null; } catch { return null; }
}
function isBusinessURL(url: URL) {
  return (url.hostname === 'wa.me' ? url.pathname : url.searchParams.get('phone') || '').replace(/\D/g, '') === '212699024526';
}
const partnerPage = () => window.location.pathname.replace(/\/$/, '') === '/partenaires';
export function openConfirmedRental(value: ConfirmedRental): Window | null {
  const url = `https://wa.me/212699024526?text=${encodeURIComponent(buildConfirmedRentalMessage(value))}`;
  permittedURL = new URL(url).toString();
  try {
    const popup = window.open(url, '_blank');
    if (popup) { try { popup.opener = null; } catch { /* cross-origin browser restriction */ } }
    return popup;
  } finally { permittedURL = null; }
}
// Installed before React. Old links and delayed callbacks cannot bypass the form.
export function installRentalRequestGate() {
  if (installed) return; installed = true;
  document.addEventListener('click', event => {
    const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!anchor) return;
    let link: URL;
    try { link = new URL(anchor.getAttribute('href') || '', window.location.origin); } catch { return; }
    if (link.origin === window.location.origin && link.pathname === '/louer' && link.searchParams.get('demande') === '1') {
      event.preventDefault(); event.stopImmediatePropagation(); requestRental(rentalDefaults(link)); return;
    }
    const url = whatsAppURL(anchor.getAttribute('href') || '');
    if (!url || !isBusinessURL(url) || partnerPage()) return;
    event.preventDefault(); event.stopImmediatePropagation(); requestRental();
  }, true);
  const originalOpen = window.open.bind(window);
  window.open = ((value?: string | URL, target?: string, features?: string) => {
    const url = whatsAppURL(value);
    if (url && isBusinessURL(url) && !partnerPage()) {
      if (permittedURL !== url.toString()) { requestRental(); return null; }
      permittedURL = null;
    }
    if (url) url.searchParams.set('text', appendCampaignCode(url.searchParams.get('text') || ''));
    const popup = originalOpen(url ? url.toString() : value, target, features);
    if (url && popup) window.dispatchEvent(new CustomEvent(WHATSAPP_HANDOFF_EVENT));
    return popup;
  }) as typeof window.open;
}
