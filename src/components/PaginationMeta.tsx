import { Helmet } from "react-helmet-async";
import { BUSINESS_INFO } from "@/constants/businessInfo";

interface PaginationMetaProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  useQueryParam?: boolean;
  paramName?: string;
}

/**
 * Composant Pagination Schema pour SEO
 * Implémente rel="next" et rel="prev" pour pages paginées
 * 
 * Impact SEO:
 * - Aide Google à comprendre la structure de pagination
 * - Améliore indexation du contenu long
 * - Évite duplicate content sur pages paginées
 * - Consolide le ranking sur la série paginée
 * 
 * Usage avec query params (?page=2):
 * <PaginationMeta 
 *   currentPage={2} 
 *   totalPages={10} 
 *   basePath="/blog"
 *   useQueryParam={true}
 *   paramName="page"
 * />
 * 
 * Usage avec URLs séparées (/blog/page/2):
 * <PaginationMeta 
 *   currentPage={2} 
 *   totalPages={10} 
 *   basePath="/blog"
 *   useQueryParam={false}
 * />
 */
export const PaginationMeta = ({
  currentPage,
  totalPages,
  basePath,
  useQueryParam = true,
  paramName = "page"
}: PaginationMetaProps) => {
  // Nettoyer le basePath
  const cleanBasePath = basePath.startsWith('/') ? basePath : `/${basePath}`;
  
  // Générer l'URL complète pour une page
  const getPageUrl = (pageNum: number): string => {
    if (pageNum === 1) {
      // Page 1 = URL de base sans paramètre
      return `${BUSINESS_INFO.website}${cleanBasePath}`;
    }
    
    if (useQueryParam) {
      // Query param: /blog?page=2
      return `${BUSINESS_INFO.website}${cleanBasePath}?${paramName}=${pageNum}`;
    } else {
      // URL path: /blog/page/2
      return `${BUSINESS_INFO.website}${cleanBasePath}/page/${pageNum}`;
    }
  };
  
  // URLs prev et next
  const prevUrl = currentPage > 1 ? getPageUrl(currentPage - 1) : null;
  const nextUrl = currentPage < totalPages ? getPageUrl(currentPage + 1) : null;
  
  // URL canonique de la page actuelle
  const canonicalUrl = getPageUrl(currentPage);
  
  return (
    <Helmet>
      {/* Canonical de la page actuelle */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Previous page */}
      {prevUrl && (
        <link rel="prev" href={prevUrl} />
      )}
      
      {/* Next page */}
      {nextUrl && (
        <link rel="next" href={nextUrl} />
      )}
      
      {/* View All (optionnel - pour indiquer la page avec tout le contenu) */}
      {/* Seulement si vous avez une page "view all" */}
      {/* <link rel="contents" href={`${BUSINESS_INFO.website}${cleanBasePath}/all`} /> */}
      
      {/* Robots meta pour pages paginées */}
      {currentPage === 1 ? (
        // Page 1: indexable normalement
        <meta name="robots" content="index, follow" />
      ) : (
        // Pages 2+: indexable mais indiquer que c'est une page paginée
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Open Graph pour pages paginées */}
      <meta property="og:url" content={canonicalUrl} />
      
      {/* Structured Data - ItemList avec pagination */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": [],
          "numberOfItems": totalPages,
          "itemListOrder": "https://schema.org/ItemListOrderAscending"
        })}
      </script>
    </Helmet>
  );
};

/**
 * Hook pour gérer la pagination
 * Retourne l'état de pagination et les métadonnées
 */
export const usePagination = (
  items: any[],
  itemsPerPage: number = 12
) => {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  const getPaginatedItems = (currentPage: number) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };
  
  return {
    totalPages,
    itemsPerPage,
    getPaginatedItems,
    totalItems: items.length
  };
};
