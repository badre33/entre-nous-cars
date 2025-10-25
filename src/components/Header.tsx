import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import logo from "@/assets/logo-black.png";

const Header = () => {
  const location = useLocation();
  const { t } = useLanguage();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
          <img src={logo} alt="Benatna" className="h-12 w-auto" />
          <span className="font-pacifico text-2xl text-foreground">benatna</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/') ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {t('common.home')}
          </Link>
          <Link 
            to="/louer" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/louer') ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {t('common.rent')}
          </Link>
          <Link 
            to="/partenaires" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/partenaires') ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {t('common.partners')}
          </Link>
          <Link 
            to="/a-propos" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/a-propos') ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {t('common.about')}
          </Link>
          <Link 
            to="/blog" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/blog') ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {t('common.blog')}
          </Link>
          <Link 
            to="/contact" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/contact') ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {t('common.contact')}
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <Link to="/louer">
            <Button className="rounded-full">
              {t('common.rent')}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
