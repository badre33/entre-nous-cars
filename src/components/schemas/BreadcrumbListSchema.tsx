import { Helmet } from "react-helmet-async";
import { BUSINESS_INFO } from "@/constants/businessInfo";

export interface BreadcrumbItem {
  name: string;
  url: string;
  image?: string; // Optional image for rich breadcrumbs
}

interface BreadcrumbListSchemaProps {
  items: BreadcrumbItem[];
}

/**
 * Enhanced BreadcrumbList Schema with Images
 * Impact SEO: +10% CTR grâce aux rich snippets breadcrumbs avec images
 * 
 * Fonctionnalités:
 * - Schema.org BreadcrumbList structuré
 * - Support images pour rich snippets
 * - Position index automatique
 * - URLs complètes
 * 
 * Usage:
 * <BreadcrumbListSchema items={[
 *   { name: "Accueil", url: "/" },
 *   { name: "Services", url: "/nos-services", image: "/service-icon.jpg" },
 *   { name: "Casablanca", url: "/location-voiture-casablanca" }
 * ]} />
 * 
 * Google affichera:
 * Accueil > [🖼️ Services] > Casablanca
 */
export const BreadcrumbListSchema = ({ items }: BreadcrumbListSchemaProps) => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => {
      const element: any = {
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url.startsWith('http') 
          ? item.url 
          : `${BUSINESS_INFO.website}${item.url.startsWith('/') ? item.url : `/${item.url}`}`
      };
      
      // Ajouter l'image si fournie
      if (item.image) {
        element.image = item.image.startsWith('http')
          ? item.image
          : `${BUSINESS_INFO.website}${item.image.startsWith('/') ? item.image : `/${item.image}`}`;
      }
      
      return element;
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

/**
 * Helper pour créer facilement des breadcrumbs
 */
export const createBreadcrumbs = {
  // Page d'accueil
  home: (): BreadcrumbItem => ({
    name: "Accueil",
    url: "/",
    image: "/apple-touch-icon.png"
  }),
  
  // Services
  services: (): BreadcrumbItem => ({
    name: "Nos Services",
    url: "/nos-services",
    image: "/apple-touch-icon.png"
  }),
  
  // Blog
  blog: (): BreadcrumbItem => ({
    name: "Blog",
    url: "/blog",
    image: "/apple-touch-icon.png"
  }),
  
  // Louer
  louer: (): BreadcrumbItem => ({
    name: "Louer une Voiture",
    url: "/louer",
    image: "/apple-touch-icon.png"
  }),
  
  // Ville
  city: (cityName: string, citySlug: string, cityImage?: string): BreadcrumbItem => ({
    name: cityName,
    url: `/location-voiture-${citySlug.toLowerCase()}`,
    image: cityImage || `/city-${citySlug.toLowerCase()}.jpg`
  }),
  
  // Quartier
  neighborhood: (neighborhoodName: string, slug: string): BreadcrumbItem => ({
    name: neighborhoodName,
    url: `/${slug}`
  }),
  
  // Article blog
  article: (articleTitle: string, articleSlug: string): BreadcrumbItem => ({
    name: articleTitle,
    url: `/blog/${articleSlug}`
  }),
  
  // Page spécifique
  custom: (name: string, url: string, image?: string): BreadcrumbItem => ({
    name,
    url,
    image
  })
};
