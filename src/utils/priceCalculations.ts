/**
 * Wrappers autour du moteur de pricing dynamique (src/lib/pricing.ts).
 *
 * Ces fonctions sont utilisées par les composants existants (SwipeableCarCard,
 * fiches véhicules) pour afficher :
 *   - Le prix journalier courant (adapté à la date + événement marocain actif)
 *   - Le rabais % applicable selon la durée
 *   - Le prix total sur la durée sélectionnée
 *
 * Les prix stockés dans le catalogue (Louer.tsx) sont la BASELINE hors saison
 * (mai/octobre). Le moteur ajuste automatiquement selon :
 *   - K_saison mensuel (été +25/+30%, hiver +20%, Ramadan +15%, etc.)
 *   - K_événement (Aïd al-Fitr +35%, Aïd al-Adha +40%, Fête du Trône +15%, …)
 *   - K_durée (rabais dégressif : 7j -15%, 30j -38%, 90j -50%)
 *   - K_ville et K_weekend
 */

import { computePrice, currentDailyPrice as _currentDailyPrice } from '@/lib/pricing';

/**
 * Prix journalier après application du moteur (saison + événement + rabais durée).
 * Utilisé quand on connaît une durée (ex: dates saisies).
 */
export function calculateDailyPrice(basePrice: number, days: number, opts?: { date?: Date; city?: string }): number {
  const result = computePrice(basePrice, {
    date: opts?.date ?? new Date(),
    duration: days > 0 ? days : 1,
    city: opts?.city,
  });
  return result.dailyPrice;
}

/**
 * Pourcentage de réduction appliqué compte tenu de la durée (0-50).
 * Ne compte QUE le rabais durée (K_durée), pas la variation saison/événement.
 */
export function getDiscountPercentage(days: number): number {
  if (days >= 90) return 50;
  if (days >= 60) return 45;
  if (days >= 30) return 38;
  if (days >= 21) return 28;
  if (days >= 14) return 22;
  if (days >= 7) return 15;
  if (days >= 3) return 8;
  return 0;
}

/**
 * Prix total pour toute la durée (déjà remisé).
 */
export function calculateTotalPrice(basePrice: number, days: number, opts?: { date?: Date; city?: string }): number {
  const d = days > 0 ? days : 1;
  const daily = calculateDailyPrice(basePrice, d, opts);
  return daily * d;
}

/**
 * Nombre de jours entre 2 dates (min 1).
 */
export function calculateDays(start: Date | undefined, end: Date | undefined): number {
  if (!start || !end) return 0;
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays);
}

/**
 * Formatte un prix avec la devise MAD.
 */
export function formatPrice(price: number): string {
  return `${price.toLocaleString('fr-FR')} MAD`;
}

/**
 * Prix vitrine "à partir de aujourd'hui" — pour l'affichage catalogue quand
 * l'utilisateur n'a pas encore saisi de dates. Retourne le prix journalier
 * courant sans rabais durée (durée = 1).
 */
export function currentDailyPrice(basePrice: number, city?: string): number {
  return _currentDailyPrice(basePrice, city);
}
