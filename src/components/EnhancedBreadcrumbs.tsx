import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { BreadcrumbListSchema, BreadcrumbItem } from "./schemas/BreadcrumbListSchema";

interface EnhancedBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
  showIcons?: boolean;
}

/**
 * Enhanced Breadcrumbs Component
 * Affichage visuel + Schema structuré
 * 
 * Impact:
 * - +10% CTR grâce aux rich snippets
 * - Meilleure UX navigation
 * - SEO breadcrumb trail
 */
export const EnhancedBreadcrumbs = ({ 
  items, 
  className,
  showHome = true,
  showIcons = false 
}: EnhancedBreadcrumbsProps) => {
  // Ajouter "Accueil" au début si demandé et pas déjà présent
  const breadcrumbItems = showHome && items[0]?.url !== "/" 
    ? [{ name: "Accueil", url: "/", image: "/apple-touch-icon.png" }, ...items]
    : items;

  return (
    <>
      {/* Schema structuré pour Google */}
      <BreadcrumbListSchema items={breadcrumbItems} />
      
      {/* Affichage visuel */}
      <nav 
        aria-label="Breadcrumb" 
        className={cn(
          "container px-4 py-3 md:py-4",
          className
        )}
      >
        <ol className="flex flex-wrap items-center gap-1.5 md:gap-2 text-xs md:text-sm">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const isFirst = index === 0;
            
            return (
              <li key={index} className="flex items-center gap-1.5 md:gap-2">
                {/* Séparateur sauf pour premier */}
                {!isFirst && (
                  <ChevronRight 
                    className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground flex-shrink-0" 
                    aria-hidden="true" 
                  />
                )}
                
                {/* Lien ou texte */}
                {isLast ? (
                  <span 
                    className="text-foreground font-medium truncate max-w-[150px] md:max-w-none"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.url}
                    className={cn(
                      "text-muted-foreground hover:text-foreground transition-colors",
                      "flex items-center gap-1.5 truncate max-w-[150px] md:max-w-none",
                      "hover:underline underline-offset-4"
                    )}
                  >
                    {/* Icon pour accueil si demandé */}
                    {showIcons && isFirst && (
                      <Home className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                    )}
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
