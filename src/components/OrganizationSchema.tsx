import { Helmet } from "react-helmet-async";
import { BUSINESS_INFO } from "@/constants/businessInfo";

/**
 * Schema.org Organization - Pour le site global
 * Renforce l'identité de l'entreprise et le NAP pour le SEO local
 */
export const OrganizationSchema = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BUSINESS_INFO.website}#organization`,
    "name": BUSINESS_INFO.name,
    "legalName": BUSINESS_INFO.legalName,
    "url": BUSINESS_INFO.website,
    "logo": `${BUSINESS_INFO.website}/logo.png`,
    "description": BUSINESS_INFO.description,
    "telephone": BUSINESS_INFO.phone,
    "email": BUSINESS_INFO.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BUSINESS_INFO.address.street,
      "addressLocality": BUSINESS_INFO.address.city,
      "postalCode": BUSINESS_INFO.address.postalCode,
      "addressCountry": BUSINESS_INFO.address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": BUSINESS_INFO.geo.latitude,
      "longitude": BUSINESS_INFO.geo.longitude
    },
    "sameAs": [
      BUSINESS_INFO.social.facebook,
      BUSINESS_INFO.social.instagram,
      BUSINESS_INFO.social.linkedin
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": BUSINESS_INFO.rating.value,
      "reviewCount": BUSINESS_INFO.rating.count,
      "bestRating": BUSINESS_INFO.rating.best,
      "worstRating": BUSINESS_INFO.rating.worst
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "priceRange": "150-900 MAD",
    "areaServed": {
      "@type": "Country",
      "name": "Morocco"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Location de Voitures",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Voitures Économiques",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Renault Clio",
                "category": "Voiture Économique"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "SUV",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Dacia Duster",
                "category": "SUV"
              }
            }
          ]
        }
      ]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  );
};
