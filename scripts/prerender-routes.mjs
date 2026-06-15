/**
 * Génère la liste exhaustive des routes à pré-rendre.
 *
 * Source de vérité :
 *  - Routes statiques : extraites de src/App.tsx (tous les `path="..."`).
 *  - Routes dynamiques : slugs extraits des fichiers src/data/*.ts.
 *
 * Aucune exécution de TypeScript : tout est extrait par regex pour que le
 * script tourne en Node pur pendant le build Vercel (zéro dépendance, zéro
 * loader TS). Si la forme des données change, ajuster les regex ici.
 *
 * Usage :
 *   import { getPrerenderRoutes } from "./prerender-routes.mjs";
 *   node scripts/prerender-routes.mjs   // affiche la liste + le compte
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

/** Routes à NE PAS pré-rendre (auth, dashboards internes, catch-all). */
const DENY = [
  /^\/auth/,
  /^\/analytics/,
  /^\/agence/,
  /^\/admin/,
  /^\/dashboard/,
];

const isDenied = (p) => DENY.some((re) => re.test(p));

/** Extrait tous les `path="..."` statiques de App.tsx. */
function staticRoutes() {
  const src = readFileSync(join(ROOT, "src", "App.tsx"), "utf8");
  const out = new Set();
  for (const m of src.matchAll(/path="([^"]+)"/g)) {
    const p = m[1];
    if (p.includes(":")) continue; // route dynamique → gérée séparément
    if (p.includes("*")) continue; // catch-all 404
    if (!p.startsWith("/")) continue;
    if (isDenied(p)) continue;
    out.add(p);
  }
  return out;
}

/** Extrait les `slug: "..."` d'un fichier data et préfixe avec `base`. */
function slugsFrom(dataFile, base) {
  let src;
  try {
    src = readFileSync(join(ROOT, "src", "data", dataFile), "utf8");
  } catch {
    return [];
  }
  const slugs = new Set();
  for (const m of src.matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g)) {
    slugs.add(`${base}/${m[1]}`);
  }
  return [...slugs];
}

export function getPrerenderRoutes() {
  const routes = new Set(staticRoutes());

  // Routes dynamiques (slugs connus au build, contenu 100 % local)
  for (const r of slugsFrom("blogArticles.ts", "/blog")) routes.add(r);
  for (const r of slugsFrom("hyperLocalBlogArticles.ts", "/blog")) routes.add(r);
  for (const r of slugsFrom("comparisonsData.ts", "/comparatif")) routes.add(r);
  for (const r of slugsFrom("vehicleDetails.ts", "/vehicule")) routes.add(r);

  // Toujours inclure la home même si jamais filtrée
  routes.add("/");

  return [...routes].filter((p) => !isDenied(p)).sort();
}

// Exécution directe : affiche la liste + le compte
if (import.meta.url === `file://${process.argv[1]}`) {
  const routes = getPrerenderRoutes();
  for (const r of routes) console.log(r);
  console.error(`\n${routes.length} routes à pré-rendre.`);
}
