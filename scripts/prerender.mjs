/**
 * Prérendu statique du site après `vite build`.
 *
 * POURQUOI
 * Benatna est une application React qui se construit entièrement dans le
 * navigateur. Le HTML livré par le serveur est une coquille vide : pas de
 * titre de page, pas de texte, pas de balises de description. Google doit
 * donc exécuter le JavaScript pour voir quoi que ce soit — et il ne le fait
 * pas toujours. C'est la cause de « explorée, actuellement non indexée » sur
 * la majorité des pages du site.
 *
 * COMMENT
 * On sert le build, on ouvre chaque URL du sitemap dans un vrai navigateur,
 * on attend que React ait fini, puis on écrit le HTML complet dans
 * dist/<chemin>/index.html. Vercel sert ces fichiers statiques en priorité
 * sur la réécriture SPA : Google reçoit désormais la page entière du premier
 * coup, et le JavaScript reprend la main normalement ensuite.
 */
import { chromium } from "playwright";
import { preview } from "vite";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const PORT = Number(process.env.PRERENDER_PORT || 4319);
const CONCURRENCY = Number(process.env.PRERENDER_CONCURRENCY || 4);

const readRoutes = async () => {
  const xml = await fs.readFile(path.join(DIST, "sitemap.xml"), "utf8");
  const urls = [...xml.matchAll(/<loc>\s*https?:\/\/[^/]+([^<]*)<\/loc>/g)]
    .map((m) => (m[1] || "/").trim())
    .map((u) => (u.endsWith("/") && u !== "/" ? u.slice(0, -1) : u));
  return [...new Set(urls)];
};

/**
 * On écrit d'abord dans un dossier temporaire, puis on déplace dans dist à la
 * toute fin. Sinon le serveur de prévisualisation resservirait les pages déjà
 * prérendues pendant que le prérendu tourne : la page suivante repartait d'un
 * instantané figé et on réenregistrait du contenu périmé.
 */
const STAGE = path.join(ROOT, ".prerender-out");

const outFileFor = (route) =>
  route === "/"
    ? path.join(STAGE, "index.html")
    : path.join(STAGE, route.replace(/^\//, ""), "index.html");

/**
 * Le prérendu n'est valable que si React a VRAIMENT fini.
 * Figer la page trop tôt donnait un article de blog avec le titre de l'accueil
 * et aucune description : on exige donc que les balises posées par Helmet
 * soient présentes ET stables sur deux vérifications consécutives.
 */
const SHELL_TITLE = "Benatna — Location de voiture au Maroc dès 250 DH/jour";

/**
 * Le prérendu n'est valable que si React a VRAIMENT fini.
 * Figer la page trop tôt donnait un article de blog avec le titre de l'accueil
 * et un corps quasi vide. On exige donc :
 *  - un <h1> et du texte réel,
 *  - un titre PROPRE à la page (différent du titre de secours d'index.html),
 *  - les balises de Helmet présentes,
 *  - et le tout stable sur deux vérifications consécutives.
 */
const makeReady = (route) => `() => {
  const root = document.getElementById('root');
  if (!root || root.children.length === 0) return false;
  if (!document.querySelector('h1')) return false;
  if (document.body.innerText.trim().length < 1200) return false;

  const head = document.head;
  if (!head.querySelector('link[rel="canonical"]')) return false;
  if (!head.querySelector('meta[name="description"]')) return false;
  if (!head.querySelector('meta[property="og:title"]')) return false;

  // Titre de secours d'index.html = le Helmet de la page n'a pas encore tourné.
  const shell = ${JSON.stringify(SHELL_TITLE)};
  const isHome = ${JSON.stringify(route === "/")};
  if (!isHome && document.title.indexOf(shell) === 0) return false;
  if (document.title.length < 10) return false;

  const fingerprint = head.querySelectorAll('[data-rh]').length + '|' + document.title
    + '|' + document.body.innerText.length;
  const stable = window.__prev === fingerprint ? (window.__n = (window.__n || 0) + 1) : (window.__n = 0);
  window.__prev = fingerprint;
  return stable >= 2;
}`;

const renderRoute = async (browser, route) => {
  // Un contexte NEUF par page : la langue choisie est mémorisée dans le
  // localStorage, et une seule page /es contaminait sinon toutes les pages
  // rendues ensuite (description et og:locale en espagnol partout).
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await context.route("**/*", (r) => {
    // On laisse passer les images : plusieurs composants n'affichent leur
    // contenu qu'une fois l'illustration chargée (effet d'apparition). Les
    // bloquer donnait des articles de blog au corps vide dans le HTML figé.
    const t = r.request().resourceType();
    if (t === "font" || t === "media") return r.abort();
    if (!r.request().url().startsWith(`http://127.0.0.1:${PORT}`)) return r.abort();
    return r.continue();
  });
  const page = await context.newPage();
  try {
    const resp = await page.goto(`http://127.0.0.1:${PORT}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });
    if (!resp || resp.status() >= 400) throw new Error(`HTTP ${resp && resp.status()}`);
    await page.waitForFunction(makeReady(route), null, { timeout: 40000, polling: 250 });

    // On ne fait pas confiance au seul signal « prêt » : on relit le HTML
    // capturé et on vérifie qu'il contient vraiment la page (et pas l'écran
    // de chargement). Sinon on attend et on recommence.
    const capture = async () => {
      await page.waitForTimeout(300);
      return page.evaluate(() => "<!doctype html>\n" + document.documentElement.outerHTML);
    };
    const visibleTextLength = (h) => {
      const root = h.indexOf('<div id="root">');
      if (root === -1) return 0;
      return h
        .slice(root)
        .replace(/<script[\s\S]*?<\/script>/g, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim().length;
    };

    // Un squelette de chargement encore présent = la page n'est pas finie.
    // Un squelette encore visible ALORS QUE la page a peu de texte = pas finie.
    // (/louer affiche légitimement des centaines de placeholders d'images
    // sous ses 111 fiches véhicules, avec 77 000 caractères de vrai contenu.)
    const looksUnfinished = (h) => {
      const text = visibleTextLength(h);
      const skeletons = (h.match(/animate-pulse/g) || []).length;
      return text < 900 || (skeletons > 3 && text < 2500);
    };

    let html = await capture();
    for (let attempt = 0; attempt < 10 && looksUnfinished(html); attempt++) {
      await page.waitForTimeout(700);
      html = await capture();
    }
    if (looksUnfinished(html)) {
      throw new Error(
        `page incomplète (${visibleTextLength(html)} caractères, ` +
          `${(html.match(/animate-pulse/g) || []).length} squelettes)`
      );
    }

    const title = await page.title();
    const file = outFileFor(route);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, html, "utf8");
    return { route, ok: true, bytes: html.length, title };
  } catch (err) {
    return { route, ok: false, error: err.message.split("\n")[0] };
  } finally {
    await page.close();
    await context.close();
  }
};

const main = async () => {
  const routes = await readRoutes();
  console.log(`prerender: ${routes.length} routes`);
  await fs.rm(STAGE, { recursive: true, force: true });

  const server = await preview({
    root: ROOT,
    preview: { port: PORT, host: "127.0.0.1", strictPort: true },
    logLevel: "error",
  });

  // Sur Vercel, le navigateur n'est pas présent après `npm install` : on le
  // télécharge une fois ici. En local il est déjà là (ou fourni via
  // CHROMIUM_PATH) et cette étape ne coûte rien.
  const launch = () =>
    chromium.launch({
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
      ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
    });
  let browser;
  try {
    browser = await launch();
  } catch {
    console.log("prerender: installation du navigateur…");
    const { execSync } = await import("node:child_process");
    execSync("npx --yes playwright install chromium --only-shell", { stdio: "inherit" });
    browser = await launch();
  }
  const queue = [...routes];
  const results = [];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) {
        const route = queue.shift();
        const res = await renderRoute(browser, route);
        results.push(res);
        if (!res.ok) console.warn(`  ✗ ${res.route} — ${res.error}`);
      }
    })
  );

  await browser.close();
  await server.close();

  // Publication : on déplace les pages prérendues dans dist.
  const move = async (dir) => {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      const from = path.join(dir, entry.name);
      if (entry.isDirectory()) { await move(from); continue; }
      const to = path.join(DIST, path.relative(STAGE, from));
      await fs.mkdir(path.dirname(to), { recursive: true });
      await fs.rename(from, to);
    }
  };
  await move(STAGE);
  await fs.rm(STAGE, { recursive: true, force: true });

  const failed = results.filter((r) => !r.ok);
  const ok = results.filter((r) => r.ok);
  const avg = ok.length ? Math.round(ok.reduce((a, r) => a + r.bytes, 0) / ok.length / 1024) : 0;
  console.log(`prerender: ${ok.length}/${routes.length} pages écrites (${avg} Ko en moyenne)`);

  if (failed.length) {
    console.error(`prerender: ${failed.length} échec(s) :`);
    for (const f of failed) console.error(`  - ${f.route}: ${f.error}`);
    // Une page non prérendue reste servie par la réécriture SPA : le site
    // fonctionne toujours. On ne fait échouer le build que si tout casse.
    if (failed.length > routes.length * 0.25) {
      console.error("prerender: trop d'échecs, build interrompu");
      process.exit(1);
    }
  }
};

main().catch((e) => {
  console.error("prerender: erreur fatale", e);
  process.exit(1);
});
