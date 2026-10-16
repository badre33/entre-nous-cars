// Shared by the React guard and static HTML generation. No browser dependencies.
export function serviceAreaPolicy(pathname: string) {
  const luxury = /^\/vehicule\//.test(pathname) && /touareg|mercedes|bmw|audi|porsche|maserati|jaguar|range-rover|lexus|volvo|cupra-formentor|hyundai-santa-fe/i.test(pathname);
  const excluded = luxury || /mariage|van-famille|minibus|utilitaire|professionnel|luxe-evenement|hyundai-staria/i.test(pathname);
  const rentalPage = /^\/location[-/]/.test(pathname);
  const rabat = rentalPage && /rabat/i.test(pathname);
  const unavailable = rentalPage && /marrakech|tanger|agadir|f[eè]s|merzouga|desert|atlas|sud-maroc|coupe-monde|can-2025/i.test(pathname);
  return { excluded, rabat, unavailable, notice: rabat || unavailable || excluded,
    noindex: pathname !== '/location-voiture-rabat' };
}
