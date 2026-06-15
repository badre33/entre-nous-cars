/**
 * Pré-rendu post-build : génère un HTML statique complet par route.
 *
 * Déroulé :
 *   1. `vite build` a déjà produit dist/ (SPA).
 *   2. Ce script sert dist/ via un petit serveur HTTP (fallback SPA → index.html).
 *   3. Puppeteer visite chaque route, attend que React + Helmet aient rendu,
 *      puis sauvegarde le DOM dans dist/<route>/index.html.
 *   4. Le client utilise hydrateRoot sur ces pages (cf. src/main.tsx).
 *
 * SÉCURITÉ DÉPLOIEMENT : ce script ne fait JAMAIS échouer le build.
 *   - Une route qui plante est loggée et ignorée (la route reste en SPA).
 *   - Si Puppeteer ne peut pas démarrer du tout (ex. Chromium absent), on log
 *     l'erreur et on sort en code 0 → le SPA déjà buildé est déployé tel quel.
 *   Pire cas = comportement actuel (CSR), zéro régression.
 */
import { createServer } from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, extname } from "node:path";
import { getPrerenderRoutes } from "./prerender-routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const PORT = 4178;
// Concurrence = 1 : les chargements de chunks échouent par intermittence sous
// charge concurrente (l'app prefetch + N pages tapent le serveur statique).
// En séquentiel, chaque route rend de façon 100 % fiable. ~5 min de build, OK.
const CONCURRENCY = 1;
const NAV_TIMEOUT = 20000;
const MAX_ATTEMPTS = 3;
// Titre du template par défaut : si une page est capturée avec CE titre, c'est
// qu'elle n'a pas fini de rendre (chunk non chargé) → on réessaie.
const DEFAULT_TITLE = "Benatna – La mobilité, entre nous";

// Domaines tiers bloqués pendant la capture (analytics/ads/chat) → HTML propre + rapide
const BLOCK = [
  "googletagmanager.com",
  "google-analytics.com",
  "connect.facebook.net",
  "facebook.com",
  "doubleclick.net",
  "crisp.chat",
  "clarity.ms",
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

/** Serveur statique dist/ avec fallback SPA vers index.html. */
async function startServer() {
  // IMPORTANT : on met le template index.html ORIGINAL en cache mémoire AVANT
  // tout pré-rendu. Sinon, dès qu'on écrit dist/index.html (home pré-rendue),
  // les routes SPA suivantes recevraient cette home au lieu du template vierge
  // → DOM initial faux et capture corrompue.
  const indexTemplate = await readFile(join(DIST, "index.html"));

  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      try {
        const urlPath = decodeURIComponent(req.url.split("?")[0]);
        // Route SPA (pas d'extension) → toujours le template original en mémoire.
        if (urlPath === "/" || !extname(urlPath)) {
          res.writeHead(200, { "Content-Type": MIME[".html"] });
          res.end(indexTemplate);
          return;
        }
        const filePath = join(DIST, urlPath);
        if (!existsSync(filePath)) {
          res.writeHead(200, { "Content-Type": MIME[".html"] });
          res.end(indexTemplate);
          return;
        }
        const buf = await readFile(filePath);
        res.writeHead(200, { "Content-Type": MIME[extname(filePath)] || "application/octet-stream" });
        res.end(buf);
      } catch {
        res.writeHead(500);
        res.end("err");
      }
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function main() {
  if (!existsSync(join(DIST, "index.html"))) {
    console.error("[prerender] dist/index.html introuvable — build d'abord. Skip.");
    process.exit(0);
  }

  let puppeteer;
  try {
    puppeteer = (await import("puppeteer")).default;
  } catch (e) {
    console.error("[prerender] puppeteer non installé — déploiement en SPA. Skip.", e?.message);
    process.exit(0);
  }

  const routes = getPrerenderRoutes();
  const server = await startServer();
  console.log(`[prerender] ${routes.length} routes · concurrence ${CONCURRENCY}`);

  let browser;
  try {
    if (process.env.VERCEL || process.env.CI) {
      // Environnement de build serverless (Vercel) : le Chromium de Puppeteer
      // manque des libs système (libnspr4.so…). On utilise @sparticuz/chromium,
      // un Chromium packagé avec ses dépendances pour ces environnements.
      const chromium = (await import("@sparticuz/chromium")).default;
      browser = await puppeteer.launch({
        args: [...chromium.args, "--disable-dev-shm-usage"],
        executablePath: await chromium.executablePath(),
        headless: true,
      });
      console.log("[prerender] Chromium via @sparticuz/chromium (serverless)");
    } else {
      // Local : Chromium fourni par Puppeteer.
      browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
      });
    }
  } catch (e) {
    console.error("[prerender] Chromium n'a pas pu démarrer — déploiement en SPA. Skip.", e?.message);
    server.close();
    process.exit(0);
  }

  const ok = [];
  const failed = [];
  const genericTitles = [];
  // Titre par défaut de l'app (Helmet de fallback) : capturé sur la home, puis
  // utilisé comme signal d'échec sur les AUTRES routes (une page qui n'a pas
  // rendu son composant retombe sur ce titre).
  let appDefaultTitle = null;

  const CHUNK_ERR = /imported module|Unexpected token '<'|Loading chunk|Failed to fetch|module script/i;

  /** Un essai de rendu. Retourne { html, title, loadError } ou throw. */
  async function attempt(route) {
    const page = await browser.newPage();
    let loadError = false;
    try {
      await page.setRequestInterception(true);
      page.on("request", (r) => {
        const u = r.url();
        if (BLOCK.some((d) => u.includes(d))) return r.abort();
        return r.continue();
      });
      // Détecte les échecs de chargement de chunk JS du build → render incomplet.
      page.on("response", (res) => {
        const u = res.url();
        if (u.includes("/assets/") && u.split("?")[0].endsWith(".js") && res.status() !== 200) {
          loadError = true;
        }
      });
      page.on("requestfailed", (req) => {
        const u = req.url();
        if (u.includes("/assets/") && u.split("?")[0].endsWith(".js")) loadError = true;
      });
      page.on("pageerror", (e) => {
        if (CHUNK_ERR.test(e?.message || "")) loadError = true;
      });
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: "networkidle2",
        timeout: NAV_TIMEOUT,
      });
      // Attendre que React ait peuplé #root au-delà du squelette app-shell ET
      // qu'un <title> spécifique (≠ défaut template) soit posé par Helmet.
      await page.waitForFunction(
        (def) => {
          const root = document.getElementById("root");
          if (!root || !root.querySelector("header, main, nav, footer, a[href^='/']")) return false;
          const t = document.title || "";
          return t.length > 0 && t !== def;
        },
        { timeout: NAV_TIMEOUT },
        DEFAULT_TITLE
      ).catch(() => {});
      // Court délai de stabilisation : laisse Helmet finir d'injecter meta + JSON-LD.
      await new Promise((r) => setTimeout(r, 250));
      // Marqueur d'hydratation pour main.tsx
      await page.evaluate(() => {
        document.getElementById("root")?.setAttribute("data-prerendered", "true");
      });
      const title = await page.evaluate(() => document.title || "");
      const probe = await page.evaluate(() => {
        const root = document.getElementById("root");
        const text = root ? root.innerText || "" : "";
        // L'ErrorBoundary affiche ce message quand un composant plante.
        const hasError = /une erreur s'est produite|quelque chose s'est mal passé/i.test(text);
        return { len: text.length, hasError };
      });
      const html = "<!doctype html>\n" + (await page.evaluate(() => document.documentElement.outerHTML));
      return { html, title, loadError, rootLen: probe.len, hasError: probe.hasError };
    } finally {
      await page.close().catch(() => {});
    }
  }

  /** La page a-t-elle réellement rendu son CONTENU (≠ app-shell / ErrorBoundary) ?
   *  Signal indépendant du titre : pas d'erreur ErrorBoundary + texte substantiel.
   *  L'app-shell seul (~150 chars) et le fallback d'erreur (~140 chars) sont sous
   *  le seuil ; toute vraie page de contenu est largement au-dessus. */
  function contentRendered(res) {
    return !!res && !!res.html && !res.hasError && (res.rootLen || 0) > 300;
  }

  /** Titre générique (lacune SEO applicative) : à signaler, pas à bloquer. */
  function genericTitle(route, res) {
    const t = res?.title || "";
    if (!t || t === DEFAULT_TITLE) return true;
    if (route !== "/" && appDefaultTitle && t === appDefaultTitle) return true;
    return false;
  }

  async function renderOne(route) {
    let last = null;
    for (let i = 1; i <= MAX_ATTEMPTS; i++) {
      try {
        const res = await attempt(route);
        last = res;
        // On (ré)essaie tant que le CONTENU n'est pas rendu (app-shell / erreur).
        if (contentRendered(res)) {
          const outDir = route === "/" ? DIST : join(DIST, route);
          await mkdir(outDir, { recursive: true });
          await writeFile(join(outDir, "index.html"), res.html, "utf8");
          ok.push(route);
          // Contenu OK mais titre non spécifique → on pré-rend quand même, on signale.
          if (genericTitle(route, res)) genericTitles.push(route);
          return;
        }
      } catch (e) {
        last = { err: e?.message };
      }
    }
    failed.push({ route, err: last?.err || `contenu non rendu après ${MAX_ATTEMPTS} essais` });
  }

  // 1) La home d'abord (séquentiel) pour capturer le titre par défaut de l'app.
  await renderOne("/");
  try {
    const home = await readFile(join(DIST, "index.html"), "utf8");
    const m = home.match(/<title[^>]*>([^<]*)<\/title>/i);
    if (m) appDefaultTitle = m[1];
    console.log(`[prerender] titre app par défaut = "${appDefaultTitle}"`);
  } catch { /* ignore */ }

  // 2) Le reste en pool de concurrence.
  const queue = routes.filter((r) => r !== "/");
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const route = queue.shift();
      await renderOne(route);
      if ((ok.length + failed.length) % 20 === 0) {
        console.log(`[prerender] ${ok.length + failed.length}/${routes.length}…`);
      }
    }
  });
  await Promise.all(workers);

  await browser.close().catch(() => {});
  server.close();

  console.log(`\n[prerender] ✅ ${ok.length} pré-rendues · ❌ ${failed.length} échecs · ⚠️ ${genericTitles.length} titres non spécifiques`);
  if (failed.length) {
    console.log("[prerender] Routes en échec (restent en SPA) :");
    for (const f of failed) console.log(`   - ${f.route}  (${f.err})`);
  }
  if (genericTitles.length) {
    console.log("[prerender] Pré-rendues mais SANS titre SEO spécifique (à corriger côté app) :");
    for (const r of genericTitles) console.log(`   - ${r}`);
  }
  // On ne fait JAMAIS échouer le build : exit 0 quoi qu'il arrive.
  process.exit(0);
}

main().catch((e) => {
  console.error("[prerender] erreur fatale non gérée — déploiement en SPA :", e?.message);
  process.exit(0);
});
