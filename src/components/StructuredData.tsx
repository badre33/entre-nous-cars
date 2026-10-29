import { useLocation } from "react-router-dom";

interface StructuredDataProps {
  type?: "home" | "rental" | "partners" | "blog" | "article";
  article?: {
    title: string;
    description: string;
    image?: string;
    datePublished?: string;
    dateModified?: string;
  };
}

export const StructuredData = ({ type = "home", article }: StructuredDataProps) => {
  const location = useLocation();
  const baseUrl = "https://benatna.ma";
  const currentUrl = `${baseUrl}${location.pathname}`;

  const getStructuredData = () => {
    // Breadcrumb schema
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: baseUrl
        }
      ]
    };

    // Add breadcrumb items based on current path
    if (type === "rental") {
      breadcrumb.itemListElement.push({
        "@type": "ListItem",
        position: 2,
        name: "Louer une voiture",
        item: `${baseUrl}/louer`
      });
    } else if (type === "partners") {
      breadcrumb.itemListElement.push({
        "@type": "ListItem",
        position: 2,
        name: "Devenir Partenaire",
        item: `${baseUrl}/partenaires`
      });
    } else if (type === "blog") {
      breadcrumb.itemListElement.push({
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/blog`
      });
    }

    // Article schema for blog posts
    let articleSchema = null;
    if (type === "article" && article) {
      articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.title,
        description: article.description,
        image: article.image || `${baseUrl}/og-image.png`,
        ...(article.datePublished ? { datePublished: article.datePublished } : {}),
        ...(article.dateModified ? { dateModified: article.dateModified } : {}),
        author: {
          "@type": "Organization",
          name: "Benatna"
        },
        publisher: {
          "@type": "Organization",
          name: "Benatna",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/logo.png`
          }
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": currentUrl
        }
      };
    }

    // The global Organization is emitted once by OrganizationSchema.
    // Do not invent FAQ answers, stock, prices or a physical rental counter here.
    const schemas: Record<string, unknown>[] = [breadcrumb];

    if (articleSchema) {
      schemas.push(articleSchema);
    }

    return schemas;
  };

  const schemas = getStructuredData();

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};
