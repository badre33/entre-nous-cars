import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://benatna.ma";

/**
 * Balises head gérées globalement pour chaque route :
 *  - <link rel="canonical"> (slash final retiré, sauf la racine)
 *  - <meta property="og:url">
 * Une page peut surcharger en posant les siennes via Helmet (la dernière gagne).
 */

/**
 * index.html contient des balises statiques (description, og:*, twitter:*) qui
 * servent aux robots qui n'exécutent PAS JavaScript : aperçus de liens WhatsApp,
 * Facebook, LinkedIn, Slack. On doit donc les garder dans le HTML livré.
 *
 * Mais react-helmet-async AJOUTE ses propres balises (marquées data-rh="true")
 * sans retirer celles-ci : chaque page se retrouvait avec DEUX descriptions,
 * deux og:title, etc., dont une générique. Google en choisit une au hasard.
 *
 * On retire donc la version statique dès que Helmet a posé son équivalent.
 * Les robots sans JS voient toujours la version statique d'index.html.
 */
const DEDUPED = [
  'meta[name="description"]',
  'meta[property="og:title"]',
  'meta[property="og:description"]',
  'meta[property="og:image"]',
  'meta[property="og:url"]',
  'meta[property="og:type"]',
  'meta[name="twitter:title"]',
  'meta[name="twitter:description"]',
  'meta[name="twitter:image"]',
  'link[rel="canonical"]',
];

const dedupeStaticHeadTags = () => {
  let changed = false;
  for (const selector of DEDUPED) {
    const all = Array.from(document.head.querySelectorAll(selector));
    if (all.length < 2) continue;
    const managed = all.filter((el) => el.hasAttribute("data-rh"));
    if (managed.length === 0) continue;
    // On garde uniquement la (dernière) balise posée par Helmet.
    const keep = managed[managed.length - 1];
    for (const el of all) {
      if (el !== keep) {
        el.remove();
        changed = true;
      }
    }
    // Si l'image OG de la page a remplacé l'image statique, les dimensions
    // statiques ne correspondent plus : on les retire aussi.
    if (selector === 'meta[property="og:image"]' && keep.hasAttribute("data-rh")) {
      document
        .head.querySelectorAll(
          'meta[property="og:image:width"]:not([data-rh]), meta[property="og:image:height"]:not([data-rh])'
        )
        .forEach((el) => el.remove());
    }
  }
  return changed;
};

export const CanonicalUrl = () => {
  const { pathname } = useLocation();
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const canonical = `${SITE_URL}${normalized}`;

  useEffect(() => {
    // Helmet écrit dans le head après le rendu, et les routes chargées en lazy
    // posent leurs balises bien plus tard : on observe le head en continu
    // plutôt que de deviner un délai.
    let scheduled = 0;
    const run = () => {
      scheduled = 0;
      dedupeStaticHeadTags();
    };
    const schedule = () => {
      if (scheduled) return;
      scheduled = window.setTimeout(run, 50);
    };
    dedupeStaticHeadTags();
    const observer = new MutationObserver(schedule);
    observer.observe(document.head, { childList: true, subtree: false });
    return () => {
      observer.disconnect();
      if (scheduled) clearTimeout(scheduled);
    };
  }, []);

  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      <meta property="og:url" content={canonical} />
    </Helmet>
  );
};
