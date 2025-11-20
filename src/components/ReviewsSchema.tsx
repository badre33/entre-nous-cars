import { Helmet } from "react-helmet-async";

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
  car?: string;
}

interface ReviewsSchemaProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  businessName?: string;
  city?: string;
}

export const ReviewsSchema = ({ 
  reviews, 
  averageRating, 
  totalReviews,
  businessName = "Benatna Location de Voiture",
  city 
}: ReviewsSchemaProps) => {
  // Generate Review structured data for each review
  const reviewSchemas = reviews.map((review) => {
    // Convert relative dates to ISO format
    const getDateFromRelative = (relativeDate: string): string => {
      const now = new Date();
      if (relativeDate.includes('jour')) {
        const days = parseInt(relativeDate) || 2;
        now.setDate(now.getDate() - days);
      } else if (relativeDate.includes('semaine')) {
        const weeks = parseInt(relativeDate) || 1;
        now.setDate(now.getDate() - (weeks * 7));
      } else if (relativeDate.includes('mois')) {
        const months = parseInt(relativeDate) || 1;
        now.setMonth(now.getMonth() - months);
      }
      return now.toISOString().split('T')[0];
    };

    return {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5,
        "worstRating": 1
      },
      "reviewBody": review.comment,
      "datePublished": getDateFromRelative(review.date),
      "publisher": {
        "@type": "Organization",
        "name": businessName
      }
    };
  });

  // Generate AggregateRating structured data
  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": city ? "LocalBusiness" : "Organization",
    "name": city ? `${businessName} ${city}` : businessName,
    "url": city 
      ? `https://benatna.ma/location-voiture-${city.toLowerCase()}`
      : "https://benatna.ma",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating,
      "reviewCount": totalReviews,
      "bestRating": 5,
      "worstRating": 1
    },
    "review": reviewSchemas
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(aggregateRatingSchema)}
      </script>
    </Helmet>
  );
};
