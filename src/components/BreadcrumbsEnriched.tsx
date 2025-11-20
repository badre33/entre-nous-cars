import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsEnrichedProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb enrichi avec structured data Schema.org BreadcrumbList
 * Optimisé pour le SEO des pages longue traîne
 */
export const BreadcrumbsEnriched = ({ items }: BreadcrumbsEnrichedProps) => {
  // Toujours inclure l'accueil comme premier élément
  const fullItems: BreadcrumbItem[] = [
    { label: "Accueil", href: "/" },
    ...items
  ];

  // Générer le structured data Schema.org pour le breadcrumb
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "name": "Navigation fil d'Ariane",
    "description": "Chemin de navigation hiérarchique pour les services de location Benatna",
    "itemListElement": fullItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? {
        "@type": "WebPage",
        "@id": `https://benatna.ma${item.href}`,
        "url": `https://benatna.ma${item.href}`,
        "name": `Benatna - ${item.label}`
      } : undefined
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Helmet>
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <Breadcrumb>
          <BreadcrumbList>
            {fullItems.map((item, index) => {
              const isLast = index === fullItems.length - 1;
              const isFirst = index === 0;
              
              return (
                <div key={index} className="flex items-center">
                  {!isFirst && <BreadcrumbSeparator className="text-xs sm:text-sm mx-1 sm:mx-1.5" />}
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="text-xs sm:text-sm font-medium">
                        {item.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link 
                          to={item.href || "/"} 
                          className="flex items-center gap-1 hover:text-primary transition-colors text-xs sm:text-sm"
                        >
                          {isFirst && <Home className="w-3 h-3 sm:w-4 sm:h-4" />}
                          <span className={isFirst ? "hidden sm:inline" : ""}>{item.label}</span>
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </>
  );
};
