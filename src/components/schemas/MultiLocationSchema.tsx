import { Helmet } from "react-helmet-async";
import { BUSINESS_INFO } from "@/constants/businessInfo";

interface LocationPoint {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  telephone?: string;
  description?: string;
  openingHours?: string;
}

interface MultiLocationSchemaProps {
  locations: LocationPoint[];
}

/**
 * Schema Multi-Location avec LocalBusiness pour chaque point de retrait
 * Impact SEO Local: Améliore le classement dans Google Maps et Local Pack
 * Chaque point de retrait devient visible séparément dans les recherches locales
 */
export const MultiLocationSchema = ({ locations }: MultiLocationSchemaProps) => {
  const locationSchemas = locations.map((location, index) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BUSINESS_INFO.website}/location/${location.city.toLowerCase()}-${index}`,
    "name": `${BUSINESS_INFO.name} - ${location.name}`,
    "description": location.description || `Point de retrait ${BUSINESS_INFO.name} à ${location.name}, ${location.city}. Service de location de voiture avec véhicules neufs et récents.`,
    "url": `${BUSINESS_INFO.website}/location-voiture-${location.city.toLowerCase()}`,
    "telephone": location.telephone || BUSINESS_INFO.phone,
    "email": BUSINESS_INFO.email,
    "image": `${BUSINESS_INFO.website}/city-${location.city.toLowerCase()}.jpg`,
    "priceRange": "150-900 MAD",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": location.address,
      "addressLocality": location.city,
      "postalCode": location.postalCode,
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.latitude,
      "longitude": location.longitude
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": BUSINESS_INFO.rating.value,
      "reviewCount": BUSINESS_INFO.rating.count,
      "bestRating": BUSINESS_INFO.rating.best
    },
    "parentOrganization": {
      "@type": "Organization",
      "@id": `${BUSINESS_INFO.website}#organization`,
      "name": BUSINESS_INFO.name,
      "url": BUSINESS_INFO.website
    },
    "areaServed": {
      "@type": "City",
      "name": location.city
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Location de voiture",
          "serviceType": "Car Rental"
        }
      }
    ]
  }));

  return (
    <Helmet>
      {locationSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};
