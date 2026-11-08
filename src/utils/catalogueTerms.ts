// Vocabulaire des cartes du catalogue, saisi en français dans les données.
const TERMS: Record<string, { en: string; es: string }> = {
  'Berline': { en: 'Sedan', es: 'Berlina' },
  'Citadine': { en: 'City car', es: 'Urbano' },
  'Monospace': { en: 'MPV', es: 'Monovolumen' },
  'SUV 7 places': { en: '7-seat SUV', es: 'SUV de 7 plazas' },
  'SUV Compact': { en: 'Compact SUV', es: 'SUV compacto' },
  'SUV Premium': { en: 'Premium SUV', es: 'SUV premium' },
  'Automatique': { en: 'Automatic', es: 'Automático' },
  'Manuelle': { en: 'Manual', es: 'Manual' },
  'Populaire': { en: 'Popular', es: 'Popular' },
  'Disponible immédiatement': { en: 'Available now', es: 'Disponible ya' },
  'Nouveau': { en: 'New', es: 'Nuevo' },
  'Luxe': { en: 'Luxury', es: 'Lujo' },
  'Économique': { en: 'Budget', es: 'Económico' },
  '7 places': { en: '7 seats', es: '7 plazas' },
  'Premium familial': { en: 'Family premium', es: 'Familiar premium' },
  'Premium SUV': { en: 'Premium SUV', es: 'SUV premium' },
};

/** Traduit un terme du catalogue et retire un éventuel émoji en tête. */
export function catalogueTerm(value: string, language: string): string {
  const clean = value.replace(/^[^\p{L}\p{N}]+/u, '').trim();
  if (language !== 'en' && language !== 'es') return clean;
  return TERMS[clean]?.[language] ?? clean;
}
