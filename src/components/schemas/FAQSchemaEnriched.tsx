import { Helmet } from "react-helmet-async";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaEnrichedProps {
  faqs: FAQItem[];
  pageName?: string;
}

// Publishes the supplied questions and answers as FAQPage structured data.
export const FAQSchemaEnriched = ({ faqs, pageName }: FAQSchemaEnrichedProps) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": pageName ? `FAQ - ${pageName}` : "Questions Fréquentes",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};
