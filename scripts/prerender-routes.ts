/**
 * Liste exhaustive des routes à pré-rendre par Puppeteer au moment du build.
 *
 * Critère d'inclusion : pages publiques SEO-optimisées qui doivent être
 * indexées par Google avec leur contenu HTML complet.
 *
 * Critère d'exclusion : pages avec authentification, dashboards internes,
 * pages dynamiques dont le slug n'est pas connu au build (utiliser ISR ou
 * fallback SPA pour celles-ci).
 */

export const PRERENDER_ROUTES = [
  // Homepage
  "/",

  // Pages principales
  "/louer",
  "/nos-services",
  "/partenaires",
  "/a-propos",
  "/contact",
  "/blog",
  "/faq",
  "/glossaire",

  // Pages location par ville (6 villes principales)
  "/location-voiture-casablanca",
  "/location-voiture-marrakech",
  "/location-voiture-rabat",
  "/location-voiture-tanger",
  "/location-voiture-agadir",
  "/location-voiture-fes",

  // Pages aéroport (6 villes)
  "/location-voiture-aeroport-casablanca",
  "/location-voiture-aeroport-marrakech",
  "/location-voiture-aeroport-rabat",
  "/location-voiture-aeroport-tanger",
  "/location-voiture-aeroport-agadir",
  "/location-voiture-aeroport-fes",

  // Pages longue traîne "sans carte de crédit"
  "/location-voiture-sans-carte-credit-marrakech",
  "/location-voiture-sans-carte-credit-casablanca",

  // CAN 2025 (vu dans le repo lors de l'audit)
  "/location-can-2025",
  "/can-2025-casablanca",
  "/can-2025-marrakech",
  "/can-2025-rabat",
  "/can-2025-tanger",
  "/can-2025-agadir",

  // Comparatifs (page liste)
  "/comparatifs",

  // Pages bonus si elles existent (le build skip silencieusement les 404)
  "/location-sans-franchise",
  "/paiement-especes-sans-carte",
  "/documents-necessaires-location",
  "/guide-caution-location",
];

/**
 * Routes dynamiques dont les slugs sont connus au build (à enrichir si tu
 * veux pré-rendre individuellement chaque article de blog ou comparatif).
 * Pour récupérer la liste des slugs blog, on pourrait fetch depuis Supabase
 * au moment du build — mais ça ajoute de la complexité.
 *
 * Pour démarrer, on n'inclut PAS les routes dynamiques. Google indexera
 * quand même /blog (liste) et suivra les liens internes vers les articles
 * individuels qui resteront en SPA.
 */
export const DYNAMIC_ROUTES_TO_PRERENDER: string[] = [
  // Exemples si tu veux ajouter manuellement :
  // "/blog/comment-louer-voiture-maroc",
  // "/blog/conduire-au-maroc-guide",
  // "/comparatif/clio-vs-208",
];

export default [...PRERENDER_ROUTES, ...DYNAMIC_ROUTES_TO_PRERENDER];
