export const retiredOfferPaths = {
"/location-voiture-aeroport-rabat": "Concentrer l’arrivée Rabat dans le guide commun et la page Rabat ; éviter une offre autonome.",
"/location-jeune-conducteur-rabat": "Conditions individuelles selon loueur ; pas d’offre jeune conducteur autonome à Rabat.",
"/location-voiture-agdal-rabat": "Quartier secondaire sans implantation ni offre autonome ; guide commun pour le point de rendez-vous.",
"/location-voiture-souissi-rabat": "Quartier secondaire sans implantation ni offre autonome ; guide commun pour le point de rendez-vous.",
"/blog/marrakech-en-voiture-guide": "Guide territorial Marrakech à mettre en attente pendant la concentration commerciale sur Casablanca.",
"/blog/quartier-gueliz-marrakech-guide-voiture": "Guide de quartier Marrakech hors de la priorité actuelle, ne pas alimenter une acquisition locale non servie.",
"/blog/road-trip-atlas-marrakech-4x4": "Acquisition Marrakech et spécialisation 4x4 Atlas hors de l’offre actuelle de voitures touristiques classiques.",
"/blog/marrakech-merzouga-voiture-itineraire": "Itinéraire Marrakech-Merzouga à mettre en attente ; éviter la confusion avec une prise en charge locale.",
  "/location-voiture-avec-chauffeur-maroc": "Prestation avec chauffeur absente de l’offre touristique classique actuelle.",
  "/comparatif/location-economique-vs-premium-maroc": "Ancien comparatif non actualisé : ne pas le réactiver avec la sélection premium du 23 octobre.",
  "/location-voiture-ete-2026-maroc": "Campagne de la saison été 2026 passée ; aucune nouvelle saison ni tarif inventé.",
  "/top-activites-marrakech-en-voiture": "Acquisition locale Marrakech hors du périmètre de prise en charge actuel.",
  "/location-voiture-circuit-villes-imperiales": "Page commerciale multi-villes incohérente avec Casablanca puis Rabat sur demande.",
  "/benatna-vs-avis-hertz-europcar-sixt": "Comparaison commerciale sans preuves comparables ; éviter un classement dénigrant."
} as const;

// Shared by the React guard and static HTML generation. No browser dependencies.
export function serviceAreaPolicy(pathname: string) {
  const retired = Object.prototype.hasOwnProperty.call(retiredOfferPaths, pathname);
  const approvedPremium = new Set(["/vehicule/audi-a3", "/vehicule/mercedes-classe-a", "/vehicule/range-rover-evoque", "/vehicule/range-rover-sport", "/vehicule/mercedes-cla", "/vehicule/audi-q3-sportback", "/vehicule/mercedes-gla", "/vehicule/vw-touareg", "/vehicule/cupra-formentor", "/vehicule/mercedes-classe-c", "/vehicule/porsche-macan"]).has(pathname);
  const luxury = !approvedPremium && /^\/vehicule\//.test(pathname) && /touareg|mercedes|bmw|audi|porsche|maserati|jaguar|range-rover|lexus|volvo|cupra-formentor|hyundai-santa-fe/i.test(pathname);
  const excluded = luxury || /mariage|van-famille|minibus|utilitaire|professionnel|luxe-evenement|hyundai-staria/i.test(pathname);
  const rentalPage = /^\/location[-/]/.test(pathname);
  const rabat = rentalPage && /rabat/i.test(pathname);
  const unavailable = rentalPage && /marrakech|tanger|agadir|f[eè]s|merzouga|desert|atlas|sud-maroc|coupe-monde|can-2025/i.test(pathname);
  return { retired, excluded, rabat, unavailable, notice: retired || rabat || unavailable || excluded,
    noindex: pathname !== '/location-voiture-rabat' };
}
