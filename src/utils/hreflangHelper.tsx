import { Helmet } from "react-helmet-async";

interface HreflangTagsProps {
  path: string;
}

/**
 * HreflangTags — TEMPORARILY DISABLED (2026-05-25)
 *
 * The previous implementation declared alternates to /en/{path} and /es/{path},
 * but those routes don't exist in App.tsx. Google was crawling them, hitting
 * 404s, and downgrading the site's trustworthiness signal.
 *
 * Until proper /en, /es (and /ar) routing is implemented with real translated
 * pages, this component is a noop. The canonical URL alone is sufficient
 * to tell Google we are a French-Moroccan site.
 *
 * To re-enable: replace the empty Helmet with real <link rel="alternate">
 * tags ONLY for languages where /xx/{path} actually exists and returns 200.
 */
export const HreflangTags = (_props: HreflangTagsProps) => {
  // Intentionally empty — see docblock above.
  // The component is kept so the 30+ <HreflangTags path={...} /> usages
  // across the codebase don't need to be touched.
  return null;
};
