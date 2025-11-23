import { Helmet } from "react-helmet-async";
import { BUSINESS_INFO } from "@/constants/businessInfo";

/**
 * Schema Sitelinks Search Box
 * Permet d'afficher un moteur de recherche directement dans les résultats Google
 * Impact SEO: Augmente le CTR de 20-30% et la visibilité dans les SERP
 */
export const SitelinksSearchBoxSchema = () => {
  const searchBoxSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BUSINESS_INFO.website}#website`,
    "url": BUSINESS_INFO.website,
    "name": BUSINESS_INFO.name,
    "description": BUSINESS_INFO.description,
    "publisher": {
      "@type": "Organization",
      "name": BUSINESS_INFO.name,
      "@id": `${BUSINESS_INFO.website}#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BUSINESS_INFO.website}/louer?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(searchBoxSchema)}
      </script>
    </Helmet>
  );
};
