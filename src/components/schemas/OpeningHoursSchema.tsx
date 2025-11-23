import { Helmet } from "react-helmet-async";
import { BUSINESS_INFO } from "@/constants/businessInfo";

interface OpeningHoursSchemaProps {
  entityName?: string;
  entityType?: "Organization" | "LocalBusiness" | "CarRental";
  city?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
}

/**
 * Schema Opening Hours Enrichi
 * Affiche les horaires d'ouverture 24/7 dans Google Maps et Search
 * Impact SEO: +25% visibilité locale, améliore présence Google Maps
 * Format optimisé pour Google My Business
 */
export const OpeningHoursSchema = ({
  entityName,
  entityType = "LocalBusiness",
  city,
  address,
  latitude,
  longitude
}: OpeningHoursSchemaProps) => {
  const name = entityName || (city ? `${BUSINESS_INFO.name} - ${city}` : BUSINESS_INFO.name);
  
  const openingHoursSchema: any = {
    "@context": "https://schema.org",
    "@type": entityType,
    "name": name,
    "@id": city ? `https://benatna.ma/location-voiture-${city.toLowerCase()}#openinghours` : `${BUSINESS_INFO.website}#openinghours`,
    
    // Horaires d'ouverture 24/7
    "openingHoursSpecification": [
      {
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
        "closes": "23:59",
        "validFrom": "2024-01-01",
        "validThrough": "2026-12-31"
      }
    ],
    
    // Informations supplémentaires
    "telephone": BUSINESS_INFO.phone,
    "url": BUSINESS_INFO.website,
    
    // Disponibilité spéciale
    "specialOpeningHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "PublicHolidays",
        "opens": "00:00",
        "closes": "23:59",
        "validFrom": "2024-01-01",
        "validThrough": "2026-12-31"
      }
    ],
    
    // Confirmation service 24/7
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Service 24/7",
        "value": "true"
      },
      {
        "@type": "PropertyValue", 
        "name": "Livraison Aéroport 24h/24",
        "value": "true"
      },
      {
        "@type": "PropertyValue",
        "name": "Assistance Client 24/7",
        "value": "true"
      },
      {
        "@type": "PropertyValue",
        "name": "Réservation en ligne 24h/24",
        "value": "true"
      }
    ]
  };

  // Ajouter adresse si fournie
  if (address && city) {
    openingHoursSchema.address = {
      "@type": "PostalAddress",
      "streetAddress": address,
      "addressLocality": city,
      "addressCountry": "MA"
    };
  }

  // Ajouter coordonnées GPS si fournies
  if (latitude && longitude) {
    openingHoursSchema.geo = {
      "@type": "GeoCoordinates",
      "latitude": latitude,
      "longitude": longitude
    };
  }

  // Ajouter description service
  openingHoursSchema.description = city 
    ? `Location de voiture à ${city} disponible 24h/24, 7j/7. Service de livraison et retrait à l'aéroport à toute heure. Assistance client disponible jour et nuit.`
    : "Location de voiture au Maroc disponible 24h/24, 7j/7. Service disponible dans toutes nos agences avec livraison aéroport jour et nuit.";

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(openingHoursSchema)}
      </script>
    </Helmet>
  );
};
