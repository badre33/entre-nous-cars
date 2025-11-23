import { Helmet } from "react-helmet-async";
import { BUSINESS_INFO } from "@/constants/businessInfo";

interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
  title?: string;
}

interface IndividualReviewsSchemaProps {
  reviews: Review[];
  entityType?: "Organization" | "LocalBusiness" | "Product" | "Service";
  entityName?: string;
  city?: string;
}

/**
 * Schema Individual Reviews Enrichi
 * Affiche des avis clients individuels dans les résultats Google
 * Impact SEO: Augmente le CTR de 40%, permet Position 0
 * Concurrent: Getaround affiche 500+ reviews structurées
 */
export const IndividualReviewsSchema = ({
  reviews,
  entityType = "LocalBusiness",
  entityName,
  city
}: IndividualReviewsSchemaProps) => {
  const name = entityName || (city ? `${BUSINESS_INFO.name} - ${city}` : BUSINESS_INFO.name);
  
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": entityType,
    "name": name,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": BUSINESS_INFO.rating.value,
      "reviewCount": BUSINESS_INFO.rating.count,
      "bestRating": BUSINESS_INFO.rating.best,
      "worstRating": BUSINESS_INFO.rating.worst
    },
    "review": reviews.map((review) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "datePublished": review.date,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "name": review.title || `Avis de ${review.author}`,
      "reviewBody": review.text
    }))
  };

  // Ajouter des propriétés selon le type
  if (entityType === "LocalBusiness" || entityType === "Organization") {
    Object.assign(reviewsSchema, {
      "url": BUSINESS_INFO.website,
      "telephone": BUSINESS_INFO.phone,
      "priceRange": "150-900 MAD"
    });
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(reviewsSchema)}
      </script>
    </Helmet>
  );
};
