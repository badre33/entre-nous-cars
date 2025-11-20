import { Helmet } from "react-helmet-async";
import { BUSINESS_INFO } from "@/constants/businessInfo";

interface CityLocalBusinessSchemaProps {
  cityName: string;
  latitude: string;
  longitude: string;
  address: string;
  postalCode: string;
  telephone: string;
  priceRange: string;
}

export const CityLocalBusinessSchema = ({
  cityName,
  latitude,
  longitude,
  address,
  postalCode,
  telephone,
  priceRange
}: CityLocalBusinessSchemaProps) => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://benatna.ma/location-voiture-${cityName.toLowerCase().replace(/\s+/g, '-')}`,
    "name": `${BUSINESS_INFO.name} ${cityName}`,
    "description": `Service de location de voiture à ${cityName}. Véhicules neufs et récents, prix transparents, sans carte de crédit. Livraison gratuite et assistance 24/7.`,
    "url": `https://benatna.ma/location-voiture-${cityName.toLowerCase().replace(/\s+/g, '-')}`,
    "telephone": BUSINESS_INFO.phone,
    "email": BUSINESS_INFO.email,
    "priceRange": priceRange,
    "image": "https://benatna.ma/og-image.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address,
      "addressLocality": cityName,
      "postalCode": postalCode,
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": latitude,
      "longitude": longitude
    },
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
        "closes": "23:59"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/benatna",
      "https://www.instagram.com/benatna"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "areaServed": {
      "@type": "City",
      "name": cityName
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Location de voiture économique",
          "description": "Location de véhicules économiques à prix compétitifs"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Location de SUV",
          "description": "Location de SUV et 4x4 pour tous types de terrains"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Location de voiture de luxe",
          "description": "Location de véhicules premium et de luxe"
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
};
