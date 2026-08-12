import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://benatna.ma";

/**
 * Balises head posées globalement pour chaque route :
 *  - <link rel="canonical"> (slash final retiré, sauf la racine)
 *  - <meta property="og:url">
 *
 * Le canonical est calculé à partir de l'URL RÉELLEMENT visitée, jamais codé
 * en dur dans les pages : les canonicals en dur donnaient l'URL française sur
 * les routes /en/... et /es/..., ce qui demandait à Google de ne pas indexer
 * les versions traduites.
 */
export const CanonicalUrl = () => {
  const { pathname } = useLocation();
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const canonical = `${SITE_URL}${normalized}`;

  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      <meta property="og:url" content={canonical} />
    </Helmet>
  );
};
