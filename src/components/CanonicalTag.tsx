import { Helmet } from "react-helmet-async";
import { BUSINESS_INFO } from "@/constants/businessInfo";

interface CanonicalTagProps {
  path: string;
  alternates?: {
    fr?: string;
    en?: string;
    es?: string;
  };
}

/**
 * Composant Canonical Tag pour SEO
 * Prévient le duplicate content en indiquant l'URL canonique
 * 
 * Impact SEO:
 * - Évite pénalités duplicate content
 * - Consolide le link juice sur URL principale
 * - Améliore crawl efficiency
 * 
 * Usage:
 * <CanonicalTag path="/location-voiture-casablanca" />
 */
export const CanonicalTag = ({ path, alternates }: CanonicalTagProps) => {
  // Nettoyer le path pour éviter doubles slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = `${BUSINESS_INFO.website}${cleanPath}`;

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Alternate language versions si fournies */}
      {alternates?.fr && (
        <link rel="alternate" hrefLang="fr" href={`${BUSINESS_INFO.website}${alternates.fr}`} />
      )}
      {alternates?.en && (
        <link rel="alternate" hrefLang="en" href={`${BUSINESS_INFO.website}${alternates.en}`} />
      )}
      {alternates?.es && (
        <link rel="alternate" hrefLang="es" href={`${BUSINESS_INFO.website}${alternates.es}`} />
      )}
      
      {/* Prevent parameter-based duplicate content */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    </Helmet>
  );
};
