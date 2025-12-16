import { useLocation } from "react-router-dom";
import { BUSINESS_INFO } from "@/constants/businessInfo";

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
    // Organization schema - always included
    const organization = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Benatna",
      description: "Plateforme marocaine de location de voitures avec des agences locales vérifiées",
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+212-699-024-526",
        contactType: "Customer Service",
        areaServed: "MA",
        availableLanguage: ["French", "Arabic", "English"]
      },
      sameAs: [
        "https://www.facebook.com/benatna",
        "https://www.instagram.com/benatna"
      ]
    };

    // Local Business schema for main site
    const localBusiness = {
      "@context": "https://schema.org",
      "@type": "AutoRental",
      name: "Benatna - Location de Voitures au Maroc",
      image: `${baseUrl}/og-image.png`,
      "@id": baseUrl,
      url: baseUrl,
      telephone: "+212-699-024-526",
      priceRange: "250-2000 MAD",
      address: {
        "@type": "PostalAddress",
        addressCountry: "MA"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 33.5731104,
        longitude: -7.5898434
      },
      areaServed: [
        {
          "@type": "City",
          name: "Casablanca"
        },
        {
          "@type": "City",
          name: "Marrakech"
        },
        {
          "@type": "City",
          name: "Rabat"
        },
        {
          "@type": "City",
          name: "Tanger"
        },
        {
          "@type": "City",
          name: "Agadir"
        },
        {
          "@type": "City",
          name: "Fès"
        }
      ],
      description: "Location de voitures au Maroc avec transparence des prix et processus 100% digital. Trouvez votre véhicule idéal parmi nos agences partenaires vérifiées.",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: BUSINESS_INFO.rating.value,
        reviewCount: BUSINESS_INFO.rating.count
      }
    };

    // Service schema for rental service
    const service = {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Location de Voitures",
      provider: {
        "@type": "Organization",
        name: "Benatna"
      },
      areaServed: {
        "@type": "Country",
        name: "Maroc"
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Véhicules disponibles",
        itemListElement: [
          {
            "@type": "OfferCatalog",
            name: "Citadines",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Car",
                  name: "Renault Clio"
                }
              }
            ]
          },
          {
            "@type": "OfferCatalog",
            name: "SUV",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Car",
                  name: "Dacia Duster"
                }
              }
            ]
          },
          {
            "@type": "OfferCatalog",
            name: "Berlines",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Car",
                  name: "Toyota Corolla"
                }
              }
            ]
          }
        ]
      }
    };

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
        datePublished: article.datePublished || new Date().toISOString(),
        dateModified: article.dateModified || new Date().toISOString(),
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

    // FAQ Schema for rental page
    const faqSchema = type === "rental" ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Quel est le prix moyen d'une location de voiture au Maroc ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Les prix varient de 250 MAD/jour pour une citadine à 2000 MAD/jour pour un véhicule de luxe. Nos tarifs sont transparents et incluent l'assurance de base."
          }
        },
        {
          "@type": "Question",
          name: "Quels documents sont nécessaires pour louer une voiture ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Vous aurez besoin d'un permis de conduire valide (depuis plus d'un an), d'une carte d'identité ou passeport, et d'une carte bancaire pour la caution."
          }
        },
        {
          "@type": "Question",
          name: "Puis-je louer une voiture dans une ville et la rendre dans une autre ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui, nous proposons la location aller-simple entre les principales villes du Maroc (Casablanca, Marrakech, Rabat, Tanger, Agadir, Fès)."
          }
        }
      ]
    } : null;

    // Combine all schemas
    const schemas: any[] = [organization, breadcrumb];
    
    if (type === "home" || type === "rental") {
      schemas.push(localBusiness, service);
    }
    
    if (faqSchema) {
      schemas.push(faqSchema);
    }
    
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
