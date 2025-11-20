import { Helmet } from "react-helmet-async";

interface Car {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  category: string;
  type: string;
  city: string;
  conditions?: string[];
}

interface CarProductSchemaProps {
  cars: Car[];
}

export const CarProductSchema = ({ cars }: CarProductSchemaProps) => {
  // Generate individual Product structured data for each car
  const productSchemas = cars.map((car) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": car.name,
    "description": `Location ${car.name} ${car.category} ${car.type} à ${car.city}. ${car.conditions?.join(", ") || "Kilométrage illimité"}. Réservation en ligne immédiate.`,
    "image": car.image,
    "brand": {
      "@type": "Brand",
      "name": car.brand
    },
    "category": car.category,
    "offers": {
      "@type": "Offer",
      "url": `https://benatna.ma/louer?city=${encodeURIComponent(car.city)}&brand=${encodeURIComponent(car.brand)}`,
      "priceCurrency": "MAD",
      "price": car.price,
      "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "Benatna",
        "url": "https://benatna.ma"
      },
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": car.price,
        "priceCurrency": "MAD",
        "unitText": "jour"
      }
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Transmission",
        "value": car.type
      },
      {
        "@type": "PropertyValue",
        "name": "Ville",
        "value": car.city
      },
      {
        "@type": "PropertyValue",
        "name": "Catégorie",
        "value": car.category
      }
    ]
  }));

  return (
    <Helmet>
      {productSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};
