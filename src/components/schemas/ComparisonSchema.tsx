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


// Comparisons are editorial content, not confirmed rental offers.
export const ComparisonSchema = ({ comparisonTitle, comparisonDescription }: ComparisonSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": comparisonTitle,
    "description": comparisonDescription,
    "publisher": { "@id": "https://benatna.ma#organization" },
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
};
