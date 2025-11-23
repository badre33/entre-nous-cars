import { Helmet } from "react-helmet-async";

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
          "bestRating": "5",
          "worstRating": "1"
        },
        ...(item1Price && {
          "offers": {
            "@type": "Offer",
            "price": item1Price,
            "priceCurrency": "MAD"
          }
        }),
        ...(item1Image && { "image": item1Image })
      },
      {
        "@type": "Product",
        "name": item2Name,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": item2Rating,
          "bestRating": "5",
          "worstRating": "1"
        },
        ...(item2Price && {
          "offers": {
            "@type": "Offer",
            "price": item2Price,
            "priceCurrency": "MAD"
          }
        }),
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
