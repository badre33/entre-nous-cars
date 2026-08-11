import { Helmet } from "react-helmet-async";
import { BUSINESS_INFO } from "@/constants/businessInfo";
import { currentDailyPrice } from "@/utils/priceCalculations";

// Prix de base du catalogue (/louer). Le prix publié dans le balisage est
// recalculé avec le même moteur que les cartes véhicules (saison + événement),
// sinon Google constaterait un écart entre le prix balisé et le prix affiché.
const CATALOG_HIGHLIGHTS = [
  {
    category: "Voitures Économiques",
    vehicles: [
      {
        name: "Dacia Sandero",
        brand: "Dacia",
        basePrice: 300,
        image: "/car-sandero-stepway.jpg",
        description: "Citadine économique 5 places, climatisation, idéale pour la ville et les trajets quotidiens au Maroc."
      },
      {
        name: "Renault Clio",
        brand: "Renault",
        basePrice: 400,
        image: "/car-clio.jpg",
        description: "Citadine confortable 5 places, boîte automatique disponible, parfaite pour un séjour touristique."
      },
      {
        name: "Peugeot 208",
        brand: "Peugeot",
        basePrice: 400,
        image: "/car-peugeot-208.jpg",
        description: "Citadine récente et sobre en carburant, adaptée aux trajets ville et autoroute."
      }
    ]
  },
  {
    category: "SUV",
    vehicles: [
      {
        name: "Dacia Duster",
        brand: "Dacia",
        basePrice: 380,
        image: "/car-duster.jpg",
        description: "SUV robuste 5 places, garde au sol élevée, recommandé pour l'Atlas, le désert et les routes de montagne."
      }
    ]
  },
  {
    category: "Berlines Premium",
    vehicles: [
      {
        name: "Mercedes Classe E",
        brand: "Mercedes-Benz",
        basePrice: 1190,
        image: "/car-mercedes-e.jpg",
        description: "Berline premium spacieuse et confortable pour longs trajets et occasions particulières."
      },
      {
        name: "BMW Série 5",
        brand: "BMW",
        basePrice: 1190,
        image: "/car-bmw-5.jpg",
        description: "Berline premium équipée, alternative à la Mercedes Classe E pour les longues distances."
      }
    ]
  }
];

const PRICE_VALID_UNTIL = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];

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
      BUSINESS_INFO.social.linkedin,
      // Ajouter d'autres profils sociaux pour renforcer le Knowledge Graph
      "https://www.youtube.com/@benatna",
      "https://twitter.com/benatna"
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
    // Catalogue d'offres : chaque véhicule cité porte SON offre complète
    // (prix, devise, disponibilité, URL). Sans cela Google refuse l'extrait
    // produit avec « Il faut indiquer offers, review ou aggregateRating ».
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Location de Voitures",
      "itemListElement": CATALOG_HIGHLIGHTS.map((group) => ({
        "@type": "OfferCatalog",
        "name": group.category,
        "itemListElement": group.vehicles.map((vehicle) => {
          const price = String(currentDailyPrice(vehicle.basePrice));
          const dailyOffer = {
            "@type": "Offer",
            "price": price,
            "priceCurrency": "MAD",
            "availability": "https://schema.org/InStock",
            "url": `${BUSINESS_INFO.website}/louer`,
            "priceValidUntil": PRICE_VALID_UNTIL,
            "seller": {
              "@type": "Organization",
              "name": BUSINESS_INFO.name,
              "url": BUSINESS_INFO.website
            },
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": price,
              "priceCurrency": "MAD",
              "referenceQuantity": {
                "@type": "QuantitativeValue",
                "value": "1",
                "unitCode": "DAY"
              }
            }
          };

          return {
            ...dailyOffer,
            "itemOffered": {
              "@type": "Product",
              "name": vehicle.name,
              "category": group.category,
              "image": `${BUSINESS_INFO.website}${vehicle.image}`,
              "description": vehicle.description,
              "brand": {
                "@type": "Brand",
                "name": vehicle.brand
              },
              "offers": dailyOffer
            }
          };
        })
      }))
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
