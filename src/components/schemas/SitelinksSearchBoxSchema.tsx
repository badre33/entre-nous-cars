import { Helmet } from "react-helmet-async";
import { BUSINESS_INFO } from "@/constants/businessInfo";

// Site identity; the catalogue does not implement the previous search template.
export const SitelinksSearchBoxSchema = () => {
  const searchBoxSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BUSINESS_INFO.website}#website`,
    "url": BUSINESS_INFO.website,
    "name": BUSINESS_INFO.name,
    "description": "Location de voiture de tourisme depuis Casablanca, de trois jours à six mois ; Rabat sur demande.",
    "publisher": {
      "@id": `${BUSINESS_INFO.website}#organization`
    },

  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(searchBoxSchema)}
      </script>
    </Helmet>
  );
};
