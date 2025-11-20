import { Helmet } from "react-helmet-async";

interface OfferSchemaProps {
  city?: string;
}

export const OfferSchema = ({ city }: OfferSchemaProps) => {
  const baseUrl = "https://benatna.ma";
  const today = new Date();
  const validUntil = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);
  
  const locationParam = city ? `?city=${encodeURIComponent(city)}` : "";
  
  const offers = [
    {
      "@context": "https://schema.org",
      "@type": "Offer",
      "name": "Tarif Longue Durée - 30 jours et plus",
      "description": "Économisez 25% sur vos locations de 30 jours ou plus. Idéal pour séjours prolongés, missions professionnelles ou découverte approfondie du Maroc.",
      "url": `${baseUrl}/louer${locationParam}`,
      "price": "150",
      "priceCurrency": "MAD",
      "priceValidUntil": validUntil.toISOString().split('T')[0],
      "availability": "https://schema.org/InStock",
      "validFrom": today.toISOString().split('T')[0],
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "150",
        "priceCurrency": "MAD",
        "unitText": "jour",
        "referenceQuantity": {
          "@type": "QuantitativeValue",
          "value": "30",
          "unitText": "jours minimum"
        }
      },
      "seller": {
        "@type": "Organization",
        "name": "Benatna"
      },
      "category": "Location longue durée",
      "eligibleDuration": {
        "@type": "QuantitativeValue",
        "value": "30",
        "unitCode": "DAY",
        "minValue": "30"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Offer",
      "name": "Tarif 2 Semaines - 14 à 29 jours",
      "description": "Profitez de 15% de réduction sur les locations de 14 à 29 jours. Parfait pour vacances prolongées ou voyages d'affaires.",
      "url": `${baseUrl}/louer${locationParam}`,
      "price": "170",
      "priceCurrency": "MAD",
      "priceValidUntil": validUntil.toISOString().split('T')[0],
      "availability": "https://schema.org/InStock",
      "validFrom": today.toISOString().split('T')[0],
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "170",
        "priceCurrency": "MAD",
        "unitText": "jour",
        "referenceQuantity": {
          "@type": "QuantitativeValue",
          "value": "14",
          "unitText": "jours minimum"
        }
      },
      "seller": {
        "@type": "Organization",
        "name": "Benatna"
      },
      "category": "Location moyenne durée",
      "eligibleDuration": {
        "@type": "QuantitativeValue",
        "value": "14",
        "unitCode": "DAY",
        "minValue": "14",
        "maxValue": "29"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Offer",
      "name": "Tarif Semaine - 7 à 13 jours",
      "description": "Bénéficiez de 10% de réduction sur les locations de 7 à 13 jours. Idéal pour explorer le Maroc en toute liberté.",
      "url": `${baseUrl}/louer${locationParam}`,
      "price": "180",
      "priceCurrency": "MAD",
      "priceValidUntil": validUntil.toISOString().split('T')[0],
      "availability": "https://schema.org/InStock",
      "validFrom": today.toISOString().split('T')[0],
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "180",
        "priceCurrency": "MAD",
        "unitText": "jour",
        "referenceQuantity": {
          "@type": "QuantitativeValue",
          "value": "7",
          "unitText": "jours minimum"
        }
      },
      "seller": {
        "@type": "Organization",
        "name": "Benatna"
      },
      "category": "Location courte durée",
      "eligibleDuration": {
        "@type": "QuantitativeValue",
        "value": "7",
        "unitCode": "DAY",
        "minValue": "7",
        "maxValue": "13"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Offer",
      "name": "Livraison Gratuite",
      "description": "Livraison et récupération gratuites dans toutes les villes principales du Maroc : Casablanca, Marrakech, Rabat, Tanger, Agadir, Fès.",
      "url": `${baseUrl}/louer${locationParam}`,
      "price": "0",
      "priceCurrency": "MAD",
      "priceValidUntil": validUntil.toISOString().split('T')[0],
      "availability": "https://schema.org/InStock",
      "validFrom": today.toISOString().split('T')[0],
      "seller": {
        "@type": "Organization",
        "name": "Benatna"
      },
      "category": "Service gratuit",
      "itemOffered": {
        "@type": "Service",
        "name": "Livraison et récupération de véhicule",
        "description": "Service de livraison et récupération gratuit à domicile ou à l'aéroport"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Offer",
      "name": "Kilométrage Illimité",
      "description": "Tous nos véhicules incluent le kilométrage illimité. Explorez le Maroc sans contrainte de distance.",
      "url": `${baseUrl}/louer${locationParam}`,
      "priceValidUntil": validUntil.toISOString().split('T')[0],
      "availability": "https://schema.org/InStock",
      "validFrom": today.toISOString().split('T')[0],
      "seller": {
        "@type": "Organization",
        "name": "Benatna"
      },
      "category": "Avantage inclus",
      "itemOffered": {
        "@type": "Service",
        "name": "Kilométrage illimité",
        "description": "Kilométrage illimité inclus dans toutes les locations sans frais supplémentaires"
      }
    }
  ];

  // OfferCatalog schema to group all offers
  const offerCatalog = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": `Offres de Location de Voiture${city ? ` à ${city}` : ' au Maroc'} - Benatna`,
    "description": "Découvrez nos offres de location de voiture avec tarifs dégressifs : 10% de réduction dès 7 jours, 15% dès 14 jours, 25% dès 30 jours. Livraison gratuite et kilométrage illimité inclus.",
    "url": `${baseUrl}/louer${locationParam}`,
    "itemListElement": offers.map((offer, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": offer
    }))
  };

  return (
    <Helmet>
      {/* Individual offers */}
      {offers.map((offer, index) => (
        <script key={`offer-${index}`} type="application/ld+json">
          {JSON.stringify(offer)}
        </script>
      ))}
      {/* Offer catalog */}
      <script type="application/ld+json">
        {JSON.stringify(offerCatalog)}
      </script>
    </Helmet>
  );
};
