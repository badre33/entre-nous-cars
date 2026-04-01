/**
 * Calcule le prix par jour (pas de réduction, tarif fixe)
 * @param basePrice - Prix de base par jour
 * @param days - Nombre de jours de location
 * @returns Prix par jour (identique au prix de base)
 */
export function calculateDailyPrice(basePrice: number, days: number): number {
  return basePrice;
}

/**
 * Récupère le pourcentage de réduction selon la durée
 * @param days - Nombre de jours de location
 * @returns Pourcentage de réduction (toujours 0, pas de remise)
 */
export function getDiscountPercentage(days: number): number {
  return 0;
}

/**
 * Calcule le prix total de la location
 * @param basePrice - Prix de base par jour
 * @param days - Nombre de jours de location
 * @returns Prix total de la location
 */
export function calculateTotalPrice(basePrice: number, days: number): number {
  const dailyPrice = calculateDailyPrice(basePrice, days);
  return Math.round(dailyPrice * days);
}

/**
 * Calcule le nombre de jours entre deux dates
 * @param start - Date de début
 * @param end - Date de fin
 * @returns Nombre de jours (minimum 1)
 */
export function calculateDays(start: Date | undefined, end: Date | undefined): number {
  if (!start || !end) return 0;
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays);
}

/**
 * Formate un prix avec la devise
 * @param price - Prix à formater
 * @returns Prix formaté avec "MAD"
 */
export function formatPrice(price: number): string {
  return `${price.toLocaleString('fr-FR')} MAD`;
}
