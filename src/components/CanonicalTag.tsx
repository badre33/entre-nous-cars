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
 * Balises hreflang + directives robots d'une page.
 *
 * Le <link rel="canonical"> N'EST PLUS posé ici : il l'est globalement par
 * <CanonicalUrl /> à partir de l'URL réellement visitée. Les canonicals
 * codés en dur donnaient une URL FR sur les routes /en/... et /es/...,
 * ce qui demandait à Google de ne pas indexer les versions traduites.
 *
 * Usage:
 * <CanonicalTag path="/location-voiture-casablanca" />
 */
export const CanonicalTag = ({ path, alternates }: CanonicalTagProps) => {
  void path;

  return (
    <Helmet>
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
