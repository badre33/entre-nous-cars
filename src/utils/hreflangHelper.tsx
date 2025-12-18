import { Helmet } from "react-helmet-async";

interface HreflangTagsProps {
  path: string;
}

/**
 * Hreflang tags - Currently FR only
 * EN/ES routes don't exist yet, so we only declare French + x-default
 * to avoid SEO penalties from pointing to 404 pages.
 * 
 * TODO: Re-enable EN/ES when proper /en and /es routing is implemented
 */
export const HreflangTags = ({ path }: HreflangTagsProps) => {
  const baseUrl = "https://benatna.ma";
  
  return (
    <Helmet>
      <link rel="alternate" hrefLang="fr" href={`${baseUrl}${path}`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${path}`} />
    </Helmet>
  );
};
