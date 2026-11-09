import { appendCampaignCode } from './analyticsPrivacy';
import { isValidRentalPeriod, RENTAL_PERIOD_MESSAGE } from './rentalPeriod';
import { rentalVehicleNames } from '@/data/rentalVehicleNames';
import { pickupPoints } from '@/data/pickupPoints';
import { rentalVehiclePrices } from '@/data/rentalVehiclePrices';
import { calculateDays, calculateTotalPrice } from './priceCalculations';

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
  /** Numéro de réservation affiché au client et repris dans le message WhatsApp. */
  reference?: string;
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
    pickupId: pickupPoints.some(p => p.id === query.get('pickup')) ? query.get('pickup') || '' : '',
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
const dh = (amount: number) => `${amount.toLocaleString('fr-FR').replace(/\u202f|\u00a0/g, ' ')} DH`;
/** Prix total estimé d'un modèle pour la période (moteur de prix du catalogue). */
/** Numéro de réservation court et lisible, ex. BN-7KQ4MX (sans 0/O ni 1/I). */
export function newBookingReference(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = new Uint8Array(6);
  try { crypto.getRandomValues(bytes); } catch { for (let i = 0; i < 6; i++) bytes[i] = Math.floor(Math.random() * 256); }
  return 'BN-' + Array.from(bytes, b => alphabet[b % alphabet.length]).join('');
}
export function rentalEstimate(name: string, startDate: string, endDate: string, city: string): { days: number; total: number } | null {
  const base = rentalVehiclePrices[normalizeVehicleName(name)];
  const start = new Date(`${startDate}T12:00:00`); const end = new Date(`${endDate}T12:00:00`);
  const days = calculateDays(start, end);
  if (!base || !days) return null;
  return { days, total: calculateTotalPrice(base, days, { date: start, city }) };
}
// D026 (9 novembre 2026) : chaque réservation contient dates, durée, lieu, 1 à 3 voitures
// par ordre de préférence (la première disponible est confirmée) et le prix total estimé.
export function buildConfirmedRentalMessage(value: ConfirmedRental): string {
  const error = validateRental(value); if (error) throw new Error(error);
  const first = rentalEstimate(value.vehicles[0], value.startDate, value.endDate, value.city);
  const days = first?.days ?? calculateDays(new Date(`${value.startDate}T12:00:00`), new Date(`${value.endDate}T12:00:00`));
  const cars = value.vehicles.map((name, index) => {
    const estimate = rentalEstimate(name, value.startDate, value.endDate, value.city);
    return `${value.vehicles.length > 1 ? `${index + 1}. ` : ''}${normalizeVehicleName(name)}${estimate ? ` : environ ${dh(estimate.total)} au total` : ''}`;
  }).join('\n');
  const choice = value.vehicles.length > 1 ? 'Voitures, par ordre de préférence (la première disponible) :' : 'Voiture :';
  return `Bonjour Benatna, je souhaite réserver une voiture.${value.reference ? `\nRéservation n° ${value.reference}` : ''}\n\nDates : du ${dateLabel(value.startDate)} au ${dateLabel(value.endDate)} (${days} jours)\nLieu de prise en charge : ${rentalPlace(value)}${value.city === 'Rabat' ? ' (livraison depuis Casablanca)' : ''}\n\n${choice}\n${cars}\n\nMerci de me confirmer la réservation, le prix total et les coordonnées du virement pour l’acompte de 30 %.${value.notes?.trim() ? '\n\nPrécisions :\n' + value.notes.trim().slice(0, 1200) : ''}`;
}
function whatsAppURL(value: string | URL | undefined): URL | null {
  try { const url = new URL(String(value), window.location.origin); return url.protocol === 'https:' && ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname) ? url : null; } catch { return null; }
}
function isBusinessURL(url: URL) {
  return (url.hostname === 'wa.me' ? url.pathname : url.searchParams.get('phone') || '').replace(/\D/g, '') === '212699024526';
}
const partnerPage = () => window.location.pathname.replace(/\/$/, '') === '/partenaires';
// D025 (9 novembre 2026) : réservation confirmée sous 1 heure, garantie à réception
// d’un acompte de 30 % par virement. D022 : contact WhatsApp direct toujours possible.
// Le message est prérempli avec les rubriques utiles (jamais vide) et rappelle
// l'offre : voitures de tourisme, 3 jours minimum, Casablanca.
export const DIRECT_WHATSAPP_TEXT = 'Bonjour Benatna, je souhaite réserver une voiture de tourisme à Casablanca.\n\nDates de location (3 jours minimum) : \nModèle souhaité : \nLieu de prise en charge : ';
export function directWhatsAppText(vehicles: string[] = []) {
  const names = vehicles.filter(Boolean).map(normalizeVehicleName);
  return names.length ? DIRECT_WHATSAPP_TEXT.replace('Modèle souhaité : ', `Modèle souhaité : ${names.join(' / ')}`) : DIRECT_WHATSAPP_TEXT;
}
export const DIRECT_WHATSAPP_URL = `https://wa.me/212699024526?text=${encodeURIComponent(DIRECT_WHATSAPP_TEXT)}`;
function openBusinessWhatsApp(text: string): Window | null {
  const url = `https://wa.me/212699024526?text=${encodeURIComponent(text)}`;
  permittedURL = new URL(url).toString();
  try {
    const popup = window.open(url, '_blank');
    if (popup) { try { popup.opener = null; } catch { /* cross-origin browser restriction */ } }
    else {
      // Onglet bloque (frequent sur mobile) : la sortie est comptee avant la redirection.
      window.dispatchEvent(new CustomEvent(WHATSAPP_HANDOFF_EVENT));
      window.location.href = url;
    }
    return popup;
  } finally { permittedURL = null; }
}
export function openDirectWhatsApp(text: string = DIRECT_WHATSAPP_TEXT): Window | null {
  return openBusinessWhatsApp(text.trim() ? text.slice(0, 1500) : DIRECT_WHATSAPP_TEXT);
}
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
    event.preventDefault(); event.stopImmediatePropagation();
    // D022 : les liens marqués « direct » ouvrent WhatsApp avec le message prérempli.
    if (anchor.closest('[data-whatsapp-direct]')) { openDirectWhatsApp(url.searchParams.get('text') || DIRECT_WHATSAPP_TEXT); return; }
    requestRental();
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
