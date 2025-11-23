import { Helmet } from "react-helmet-async";
import { BUSINESS_INFO } from "@/constants/businessInfo";

interface PriceRangeOfferSchemaProps {
  minPrice: string;
  maxPrice: string;
  city?: string;
  currency?: string;
  validFrom?: string;
  validThrough?: string;
  discount?: {
    percentage: number;
    minDays: number;
  };
}

/**
 * Schema Offer avec Price Range
 * Affiche les prix directement dans les résultats Google
 * Impact SEO: Augmente le CTR de 25-30% et améliore le taux de conversion
 */
export const PriceRangeOfferSchema = ({
  minPrice,
  maxPrice,
  city,
  currency = "MAD",
  validFrom = new Date().toISOString().split('T')[0],
  validThrough = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  discount
}: PriceRangeOfferSchemaProps) => {
  const citySlug = city ? `/location-voiture-${city.toLowerCase()}` : "";
  const cityName = city || "Maroc";
  
  const offers = [
    {
      "@type": "Offer",
      "name": `Location de Voiture ${cityName} - Tarif Standard`,
      "description": `Prix à partir de ${minPrice} ${currency}/jour pour la location de voiture à ${cityName}. Assurance tous risques incluse, kilométrage illimité, livraison gratuite.`,
      "price": minPrice,
      "priceCurrency": currency,
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": minPrice,
        "priceCurrency": currency,
        "unitText": "jour",
        "referenceQuantity": {
          "@type": "QuantitativeValue",
          "value": "1",
          "unitCode": "DAY"
        }
      },
      "availability": "https://schema.org/InStock",
      "validFrom": validFrom,
      "validThrough": validThrough,
      "url": `${BUSINESS_INFO.website}${citySlug}`,
      "seller": {
        "@type": "Organization",
        "name": BUSINESS_INFO.name,
        "telephone": BUSINESS_INFO.phone,
        "url": BUSINESS_INFO.website
      },
      "itemOffered": {
        "@type": "Service",
        "name": `Location de Voiture ${cityName}`,
        "serviceType": "Car Rental",
        "category": "Automobile",
        "areaServed": {
          "@type": city ? "City" : "Country",
          "name": cityName
        }
      }
    }
  ];

  // Ajouter une offre avec réduction si spécifiée
  if (discount) {
    const discountedPrice = (parseFloat(minPrice) * (1 - discount.percentage / 100)).toFixed(0);
    offers.push({
      "@type": "Offer",
      "name": `Location Longue Durée ${cityName} - Réduction ${discount.percentage}%`,
      "description": `Tarif réduit à ${discountedPrice} ${currency}/jour pour les locations de ${discount.minDays} jours ou plus à ${cityName}. Économisez jusqu'à ${discount.percentage}% sur vos locations longue durée.`,
      "price": discountedPrice,
      "priceCurrency": currency,
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": discountedPrice,
        "priceCurrency": currency,
        "unitText": "jour",
        "referenceQuantity": {
          "@type": "QuantitativeValue",
          "value": discount.minDays.toString(),
          "unitCode": "DAY"
        }
      },
      "availability": "https://schema.org/InStock",
      "validFrom": validFrom,
      "validThrough": validThrough,
      "url": `${BUSINESS_INFO.website}${citySlug}`,
      "seller": {
        "@type": "Organization",
        "name": BUSINESS_INFO.name,
        "telephone": BUSINESS_INFO.phone,
        "url": BUSINESS_INFO.website
      },
      "itemOffered": {
        "@type": "Service",
        "name": `Location Longue Durée ${cityName}`,
        "serviceType": "Car Rental - Long Term",
        "category": "Automobile",
        "areaServed": {
          "@type": city ? "City" : "Country",
          "name": cityName
        }
      }
    });
  }

  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BUSINESS_INFO.website}${citySlug}#product`,
    "name": `Location de Voiture ${cityName}`,
    "description": `Service de location de voiture à ${cityName} avec tarifs transparents de ${minPrice} à ${maxPrice} ${currency}/jour. Réservation en ligne simple et rapide.`,
    "brand": {
      "@type": "Brand",
      "name": BUSINESS_INFO.name
    },
    "offers": offers,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": BUSINESS_INFO.rating.value,
      "reviewCount": BUSINESS_INFO.rating.count,
      "bestRating": BUSINESS_INFO.rating.best
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(offerSchema)}
      </script>
    </Helmet>
  );
};
