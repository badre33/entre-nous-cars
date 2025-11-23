/**
 * Calcule le prix dégressif selon la durée de location
 * @param basePrice - Prix de base par jour
 * @param days - Nombre de jours de location
 * @returns Prix par jour avec remise appliquée
 */
export function calculateDailyPrice(basePrice: number, days: number): number {
  if (days >= 30) {
    // 10% de réduction pour 30+ jours
    return basePrice * 0.90;
  } else if (days >= 7) {
    // 5% de réduction pour 7-29 jours
    return basePrice * 0.95;
  }
  return basePrice;
}

/**
 * Récupère le pourcentage de réduction selon la durée
 * @param days - Nombre de jours de location
 * @returns Pourcentage de réduction (0, 5 ou 10)
 */
export function getDiscountPercentage(days: number): number {
  if (days >= 30) return 10;
  if (days >= 7) return 5;
  return 0;
}

/**
 * Calcule le prix total de la location avec tarifs dégressifs
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
