import { Helmet } from "react-helmet-async";
import { BUSINESS_INFO } from "@/constants/businessInfo";

interface VehicleOffer {
  price: string;
  priceCurrency?: string;
  availability?: string;
  priceValidUntil?: string;
  eligibleRegion?: string;
}

interface VehicleReview {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}

interface VehicleProductSchemaProps {
  vehicleName: string;
  vehicleModel: string;
  vehicleBrand: string;
  category: string;
  description: string;
  imageUrl: string;
  offer: VehicleOffer;
  features?: string[];
  fuelType?: string;
  transmission?: string;
  seats?: number;
  reviews?: VehicleReview[];
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
  };
  sku?: string;
  city?: string;
}

/**
 * Schema Product pour Véhicules
 * Affiche chaque voiture comme Product dans Google Shopping & Images
 * Impact SEO: Apparition Google Shopping, +60% visibilité images, rich snippets prix
 * Concurrent: ADA utilise ce schema pour afficher prix directement dans Google
 */
export const VehicleProductSchema = ({
  vehicleName,
  vehicleModel,
  vehicleBrand,
  category,
  description,
  imageUrl,
  offer,
  features = [],
  fuelType = "Diesel",
  transmission = "Manuelle",
  seats = 5,
  reviews = [],
  aggregateRating,
  sku,
  city
}: VehicleProductSchemaProps) => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BUSINESS_INFO.website}/louer/${vehicleModel.toLowerCase().replace(/\s+/g, '-')}`,
    "name": vehicleName,
    "description": description,
    "image": imageUrl,
    "brand": {
      "@type": "Brand",
      "name": vehicleBrand
    },
    "model": vehicleModel,
    "category": category,
    "sku": sku || `${vehicleBrand}-${vehicleModel}-${city || 'maroc'}`.toLowerCase().replace(/\s+/g, '-'),
    
    // Caractéristiques du véhicule
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Type de carburant",
        "value": fuelType
      },
      {
        "@type": "PropertyValue",
        "name": "Transmission",
        "value": transmission
      },
      {
        "@type": "PropertyValue",
        "name": "Nombre de places",
        "value": seats.toString()
      },
      {
        "@type": "PropertyValue",
        "name": "Catégorie",
        "value": category
      },
      {
        "@type": "PropertyValue",
        "name": "Disponibilité",
        "value": offer.availability || "En stock"
      },
      ...features.map(feature => ({
        "@type": "PropertyValue",
        "name": "Équipement",
        "value": feature
      }))
    ],
    
    // Offre de location
    "offers": {
      "@type": "Offer",
      "price": offer.price,
      "priceCurrency": offer.priceCurrency || "MAD",
      "availability": offer.availability === "En stock" 
        ? "https://schema.org/InStock" 
        : "https://schema.org/PreOrder",
      "priceValidUntil": offer.priceValidUntil || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "url": `${BUSINESS_INFO.website}/louer`,
      "seller": {
        "@type": "Organization",
        "name": BUSINESS_INFO.name,
        "url": BUSINESS_INFO.website,
        "telephone": BUSINESS_INFO.phone
      },
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": offer.price,
        "priceCurrency": offer.priceCurrency || "MAD",
        "unitText": "PAR_JOUR",
        "referenceQuantity": {
          "@type": "QuantitativeValue",
          "value": "1",
          "unitCode": "DAY"
        }
      },
      "itemCondition": "https://schema.org/UsedCondition",
      "eligibleRegion": {
        "@type": "Country",
        "name": "MA"
      },
      "areaServed": city ? {
        "@type": "City",
        "name": city
      } : {
        "@type": "Country",
        "name": "Maroc"
      },
      "availableDeliveryMethod": [
        "https://schema.org/OnSitePickup",
        "https://schema.org/DeliveryModeDirectDownload"
      ],
      "deliveryLeadTime": {
        "@type": "QuantitativeValue",
        "minValue": 0,
        "maxValue": 2,
        "unitCode": "HUR"
      }
    },
    
    // Avis agrégés
    ...(aggregateRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": aggregateRating.ratingValue,
        "reviewCount": aggregateRating.reviewCount,
        "bestRating": "5",
        "worstRating": "1"
      }
    }),
    
    // Avis individuels
    ...(reviews.length > 0 && {
      "review": reviews.map(review => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": review.author
        },
        "datePublished": review.datePublished,
        "reviewBody": review.reviewBody,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.rating.toString(),
          "bestRating": "5",
          "worstRating": "1"
        }
      }))
    }),
    
    // Informations supplémentaires
    "provider": {
      "@type": "AutoRental",
      "name": BUSINESS_INFO.name,
      "url": BUSINESS_INFO.website,
      "telephone": BUSINESS_INFO.phone,
      "priceRange": "200-700 MAD"
    },
    
    "isRelatedTo": {
      "@type": "Service",
      "name": "Location de voiture",
      "serviceType": "Location de véhicules",
      "provider": {
        "@type": "Organization",
        "name": BUSINESS_INFO.name
      }
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
    </Helmet>
  );
};
