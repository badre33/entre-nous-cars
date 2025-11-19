import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/assets/logo-black.png";

const Header = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
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
          <img src={logo} alt="Benatna" width="48" height="48" className="h-8 md:h-12 w-auto" />
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
                {/* Pages secondaires uniquement */}
                <Link 
                  to="/a-propos" 
                  onClick={() => setIsOpen(false)}
                  className="text-lg py-3 px-4 rounded-lg font-medium transition-colors hover:text-primary text-muted-foreground"
                >
                  {t('common.about')}
                </Link>
                <Link 
                  to="/blog" 
                  onClick={() => setIsOpen(false)}
                  className="text-lg py-3 px-4 rounded-lg font-medium transition-colors hover:text-primary text-muted-foreground"
                >
                  {t('common.blog')}
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
