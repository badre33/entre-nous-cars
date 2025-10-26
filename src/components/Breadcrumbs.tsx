import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import { Home } from "lucide-react";

export const Breadcrumbs = () => {
  const location = useLocation();
  const { t } = useLanguage();
  
  const pathnames = location.pathname.split("/").filter((x) => x);
  
  if (pathnames.length === 0) return null;

  const getPageName = (path: string) => {
    const routes: Record<string, string> = {
      louer: t("common.rent"),
      partenaires: t("common.partners"),
      "a-propos": t("common.about"),
      blog: t("common.blog"),
      contact: t("common.contact"),
    };
    return routes[path] || path;
  };

  return (
    <div className="container mx-auto px-4 py-3 sm:py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors text-sm">
                <Home className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{t("common.home")}</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          {pathnames.map((path, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            
            return (
              <div key={routeTo} className="flex items-center gap-1 sm:gap-1.5">
                <BreadcrumbSeparator className="text-xs sm:text-sm" />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="text-xs sm:text-sm">{getPageName(path)}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={routeTo} className="hover:text-primary transition-colors text-xs sm:text-sm">
                        {getPageName(path)}
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
  );
};
