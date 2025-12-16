/**
 * Source unique pour toutes les statistiques du site
 * Utilisé dans : UI, schemas SEO, sections preuves sociales
 * 
 * ⚠️ IMPORTANT : Modifier uniquement ce fichier pour mettre à jour les stats
 */

export const SITE_STATS = {
  // Flotte de véhicules
  totalVehicles: 300,
  
  // Réseau d'agences partenaires
  totalAgencies: 24,
  
  // Clients satisfaits
  totalCustomers: 1200,
  
  // Villes couvertes au Maroc
  coveredCities: 6,
  
  // Note moyenne (Google Reviews style)
  ratingAverage: 4.8,
  
  // Nombre total d'avis
  ratingCount: 1200,
  
  // Années d'expérience
  yearsExperience: 5,
  
  // Taux de satisfaction client (%)
  satisfactionRate: 98,
} as const;

// Types pour TypeScript
export type SiteStats = typeof SITE_STATS;

// Helpers pour affichage formaté
export const formatStat = (value: number): string => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k+`;
  }
  return `${value}+`;
};

export const getFormattedStats = () => ({
  vehicles: formatStat(SITE_STATS.totalVehicles),
  agencies: formatStat(SITE_STATS.totalAgencies),
  customers: formatStat(SITE_STATS.totalCustomers),
  cities: SITE_STATS.coveredCities.toString(),
  rating: SITE_STATS.ratingAverage.toFixed(1),
  reviews: formatStat(SITE_STATS.ratingCount),
});
