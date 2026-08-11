import { Helmet } from "react-helmet-async";
import { BUSINESS_INFO } from "@/constants/businessInfo";

/**
 * Les prix des comparatifs sont saisis en texte libre ("400-500 DH/jour",
 * "Standard + 0-10%"). Google exige un nombre pour `price`. On extrait donc
 * les montants : une fourchette devient un AggregateOffer (lowPrice/highPrice),
 * un montant unique une Offer simple, et un texte sans chiffre ne produit
 * aucune offre (plutôt qu'une offre invalide).
 */
const buildOffer = (rawPrice?: string) => {
  if (!rawPrice) return null;
  const amounts = (rawPrice.match(/\d+(?:[.,]\d+)?/g) || []).map((n) => n.replace(",", "."));
  if (amounts.length === 0) return null;

  const common = {
    "priceCurrency": "MAD",
    "availability": "https://schema.org/InStock",
    "url": `${BUSINESS_INFO.website}/louer`,
    "seller": {
      "@type": "Organization",
      "name": BUSINESS_INFO.name,
      "url": BUSINESS_INFO.website
    }
  };

  if (amounts.length >= 2) {
    return {
      "@type": "AggregateOffer",
      "lowPrice": amounts[0],
      "highPrice": amounts[amounts.length - 1],
      "offerCount": "2",
      ...common
    };
  }

  return {
    "@type": "Offer",
    "price": amounts[0],
    ...common
  };
};

interface ComparisonSchemaProps {
  item1Name: string;
  item2Name: string;
  item1Rating?: number;
  item2Rating?: number;
  item1Price?: string;
  item2Price?: string;
  item1Image?: string;
  item2Image?: string;
  comparisonTitle: string;
  comparisonDescription: string;
}

/**
 * Schema de comparaison pour rich snippets Google
 * Aide à obtenir le format "X vs Y" dans les résultats
 */
export const ComparisonSchema = ({
  item1Name,
  item2Name,
  item1Rating = 4.5,
  item2Rating = 4.5,
  item1Price,
  item2Price,
  item1Image,
  item2Image,
  comparisonTitle,
  comparisonDescription
}: ComparisonSchemaProps) => {
  const item1Offer = buildOffer(item1Price);
  const item2Offer = buildOffer(item2Price);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ComparisonTable",
    "name": comparisonTitle,
    "description": comparisonDescription,
    "item": [
      {
        "@type": "Product",
        "name": item1Name,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": item1Rating,
          "reviewCount": BUSINESS_INFO.rating.count,
          "bestRating": "5",
          "worstRating": "1"
        },
        ...(item1Offer && { "offers": item1Offer }),
        ...(item1Image && { "image": item1Image })
      },
      {
        "@type": "Product",
        "name": item2Name,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": item2Rating,
          "reviewCount": BUSINESS_INFO.rating.count,
          "bestRating": "5",
          "worstRating": "1"
        },
        ...(item2Offer && { "offers": item2Offer }),
        ...(item2Image && { "image": item2Image })
      }
    ]
  };

  // Article schema pour le contenu de comparaison
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": comparisonTitle,
    "description": comparisonDescription,
    "author": {
      "@type": "Organization",
      "name": "Benatna"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Benatna",
      "logo": {
        "@type": "ImageObject",
        "url": "https://benatna.ma/logo-black.png"
      }
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString()
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
    </Helmet>
  );
};
