import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Menu, X, ChevronDown, MapPin } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo-black.png";

const Header = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const cities = [
    { name: 'Casablanca', path: '/location-voiture-casablanca' },
    { name: 'Marrakech', path: '/location-voiture-marrakech' },
    { name: 'Rabat', path: '/location-voiture-rabat' },
    { name: 'Tanger', path: '/location-voiture-tanger' },
    { name: 'Agadir', path: '/location-voiture-agadir' },
    { name: 'Fès', path: '/location-voiture-fes' },
  ];

  const isCityActive = cities.some(city => isActive(city.path));

  const NavLinks = ({ mobile = false, onLinkClick }: { mobile?: boolean; onLinkClick?: () => void }) => (
    <>
      <Link 
        to="/" 
        onClick={onLinkClick}
        className={`${mobile ? 'text-lg py-3 px-4 rounded-lg' : 'text-sm'} font-medium transition-colors hover:text-primary ${
          isActive('/') ? 'text-foreground bg-accent' : 'text-muted-foreground'
        }`}
      >
        {t('common.home')}
      </Link>
      <Link 
        to="/louer" 
        onClick={onLinkClick}
        className={`${mobile ? 'text-lg py-3 px-4 rounded-lg' : 'text-sm'} font-medium transition-colors hover:text-primary ${
          isActive('/louer') ? 'text-foreground bg-accent' : 'text-muted-foreground'
        }`}
      >
        {t('common.rent')}
      </Link>
      <Link 
        to="/nos-services" 
        onClick={onLinkClick}
        className={`${mobile ? 'text-lg py-3 px-4 rounded-lg' : 'text-sm'} font-medium transition-colors hover:text-primary ${
          isActive('/nos-services') ? 'text-foreground bg-accent' : 'text-muted-foreground'
        }`}
      >
        Services
      </Link>
      <Link 
        to="/location-voiture-can-2025-maroc" 
        onClick={onLinkClick}
        className={`${mobile ? 'text-lg py-3 px-4 rounded-lg' : 'text-sm'} font-medium transition-colors hover:text-primary ${
          isActive('/location-voiture-can-2025-maroc') ? 'text-foreground bg-accent' : 'text-muted-foreground'
        }`}
      >
        🏆 CAN 2025
      </Link>
      
      {mobile ? (
        <div className="space-y-1">
          <div className="text-lg py-3 px-4 font-medium text-muted-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Villes
          </div>
          {cities.map((city) => (
            <Link 
              key={city.path}
              to={city.path} 
              onClick={onLinkClick}
              className={`text-base py-2 px-8 rounded-lg block font-medium transition-colors hover:text-primary ${
                isActive(city.path) ? 'text-foreground bg-accent' : 'text-muted-foreground'
              }`}
            >
              {city.name}
            </Link>
          ))}
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
            isCityActive ? 'text-foreground' : 'text-muted-foreground'
          }`}>
            Villes <ChevronDown className="h-3 w-3" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {cities.map((city) => (
              <DropdownMenuItem key={city.path} asChild>
                <Link 
                  to={city.path}
                  className="w-full flex items-center gap-2 cursor-pointer"
                >
                  <MapPin className="h-4 w-4" />
                  {city.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      <Link 
        to="/partenaires" 
        onClick={onLinkClick}
        className={`${mobile ? 'text-lg py-3 px-4 rounded-lg' : 'text-sm'} font-medium transition-colors hover:text-primary ${
          isActive('/partenaires') ? 'text-foreground bg-accent' : 'text-muted-foreground'
        }`}
      >
        {t('common.partners')}
      </Link>
      <Link 
        to="/a-propos" 
        onClick={onLinkClick}
        className={`${mobile ? 'text-lg py-3 px-4 rounded-lg' : 'text-sm'} font-medium transition-colors hover:text-primary ${
          isActive('/a-propos') ? 'text-foreground bg-accent' : 'text-muted-foreground'
        }`}
      >
        {t('common.about')}
      </Link>
      <Link 
        to="/blog" 
        onClick={onLinkClick}
        className={`${mobile ? 'text-lg py-3 px-4 rounded-lg' : 'text-sm'} font-medium transition-colors hover:text-primary ${
          isActive('/blog') ? 'text-foreground bg-accent' : 'text-muted-foreground'
        }`}
      >
        {t('common.blog')}
      </Link>
      <Link 
        to="/contact" 
        onClick={onLinkClick}
        className={`${mobile ? 'text-lg py-3 px-4 rounded-lg' : 'text-sm'} font-medium transition-colors hover:text-primary ${
          isActive('/contact') ? 'text-foreground bg-accent' : 'text-muted-foreground'
        }`}
      >
        {t('common.contact')}
      </Link>
    </>
  );
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 md:h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <img 
            src={logo} 
            alt="Benatna" 
            width="48" 
            height="48" 
            className="h-8 md:h-12 w-auto"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <span className="font-pacifico text-xl md:text-2xl text-foreground">benatna</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLinks />
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <LanguageSelector />
          <Link to="/louer">
            <Button className="rounded-full">
              {t('common.rent')}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu - Optimized for touch */}
        <div className="flex md:hidden items-center gap-2 touch-target">
          <LanguageSelector />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden min-w-[48px] min-h-[48px] touch-target touch-feedback">
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle className="text-left font-pacifico text-2xl">benatna</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 mt-8">
                <NavLinks mobile onLinkClick={() => setIsOpen(false)} />
                <Link to="/louer" onClick={() => setIsOpen(false)}>
                  <Button className="w-full rounded-full mt-4">
                    {t('common.rent')}
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
