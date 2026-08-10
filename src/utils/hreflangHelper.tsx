import { Helmet } from "react-helmet-async";

interface HreflangTagsProps {
  path: string;
}

/**
 * HreflangTags — réactivé le 8 août 2026.
 *
 * Ne déclare des alternates EN/ES QUE pour les chemins qui existent
 * réellement dans App.tsx (routes /en/* et /es/* ajoutées le même jour).
 * Pour tous les autres chemins, le composant reste un noop : déclarer un
 * alternate vers une 404 dégrade le signal de confiance Google.
 */
const LOCALIZED_PATHS = ["/", "/louer", "/contact", "/a-propos", "/partenaires", "/blog"];

export const HreflangTags = ({ path }: HreflangTagsProps) => {
  if (!LOCALIZED_PATHS.includes(path)) return null;

  const suffix = path === "/" ? "" : path;
  const BASE = "https://benatna.ma";

  return (
    <Helmet>
      <link rel="alternate" hrefLang="fr" href={`${BASE}${suffix || "/"}`} />
      <link rel="alternate" hrefLang="en" href={`${BASE}/en${suffix}`} />
      <link rel="alternate" hrefLang="es" href={`${BASE}/es${suffix}`} />
      <link rel="alternate" hrefLang="x-default" href={`${BASE}${suffix || "/"}`} />
    </Helmet>
  );
};
