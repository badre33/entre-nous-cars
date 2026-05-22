import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://benatna.ma";

/**
 * Injects a <link rel="canonical"> for the current route.
 * Strips trailing slash (except root) for URL consistency.
 * Page components can override by adding their own <link rel="canonical"> via Helmet
 * (last value in the head wins).
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
