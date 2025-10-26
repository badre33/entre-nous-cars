import { NavLink, useLocation } from 'react-router-dom';
import { Home, Car, Handshake, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export const BottomNavigation = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      icon: Home,
      label: t('header.home'),
      ariaLabel: 'Accueil'
    },
    {
      path: '/louer',
      icon: Car,
      label: t('header.rent'),
      ariaLabel: 'Louer une voiture'
    },
    {
      path: '/partenaires',
      icon: Handshake,
      label: t('header.partners'),
      ariaLabel: 'Devenir partenaire'
    },
    {
      path: '/contact',
      icon: Mail,
      label: t('header.contact'),
      ariaLabel: 'Contact'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border shadow-lg"
        role="navigation"
        aria-label="Navigation mobile principale"
      >
      <div className="flex items-center justify-around h-16 px-2 max-w-screen-xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-200",
                active 
                  ? "text-primary scale-105" 
                  : "text-muted-foreground hover:text-foreground active:scale-95"
              )}
              aria-label={item.ariaLabel}
              aria-current={active ? 'page' : undefined}
            >
              <div className={cn(
                "relative",
                active && "animate-bounce"
              )}>
                <Icon 
                  className={cn(
                    "h-6 w-6 transition-all",
                    active && "drop-shadow-lg"
                  )} 
                />
                {active && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </div>
              <span className={cn(
                "text-xs font-medium",
                active && "font-bold"
              )}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
    </>
  );
};
