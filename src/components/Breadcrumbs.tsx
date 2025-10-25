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
      louer: t("nav.rent"),
      partenaires: t("nav.partners"),
      "a-propos": t("nav.about"),
      blog: t("nav.blog"),
      contact: t("nav.contact"),
    };
    return routes[path] || path;
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Home className="w-4 h-4" />
                {t("nav.home")}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          {pathnames.map((path, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            
            return (
              <div key={routeTo} className="flex items-center gap-1.5">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{getPageName(path)}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={routeTo} className="hover:text-primary transition-colors">
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
