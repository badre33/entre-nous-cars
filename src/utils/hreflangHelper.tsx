import { Helmet } from "react-helmet-async";

interface HreflangTagsProps {
  path: string;
}

export const HreflangTags = ({ path }: HreflangTagsProps) => {
  const baseUrl = "https://benatna.ma";
  
  return (
    <Helmet>
      <link rel="alternate" hrefLang="fr" href={`${baseUrl}${path}`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en${path}`} />
      <link rel="alternate" hrefLang="es" href={`${baseUrl}/es${path}`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${path}`} />
    </Helmet>
  );
};
