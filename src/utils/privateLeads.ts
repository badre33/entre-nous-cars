import { isValidRentalPeriod } from './rentalPeriod';
export const leadStatuses = {
  new: 'Reçue', contacted: 'Contactée', qualified: 'Qualifiée', quoted: 'Proposition envoyée',
  confirmed: 'Réservation confirmée', completed: 'Location réalisée', lost: 'Perdue', spam: 'Indésirable',
} as const;
export const lossReasons = {
  hors_zone: 'Hors zone', duree: 'Durée incompatible', indisponibilite: 'Indisponibilité',
  conditions: 'Conditions non acceptées', sans_suite: 'Sans suite', autre: 'Autre',
} as const;
export const attributionConfidence = { unknown: 'Inconnue', declared: 'Déclarée par le contact', observed_code: 'Code de campagne reçu' } as const;
export function isQualifiableLead(lead: { city: string; pickup_date: string | null; return_date: string | null }): boolean {
  return ['Casablanca', 'Rabat'].includes(lead.city) && isValidRentalPeriod(lead.pickup_date || '', lead.return_date || '');
}
export function statusNeedsQualification(status: string): boolean { return ['qualified', 'quoted', 'confirmed', 'completed', 'won'].includes(status); }
