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
      label: t('common.home'),
      ariaLabel: 'Accueil'
    },
    {
      path: '/louer',
      icon: Car,
      label: t('common.rent'),
      ariaLabel: 'Louer une voiture'
    },
    {
      path: '/partenaires',
      icon: Handshake,
      label: t('common.partners'),
      ariaLabel: 'Devenir partenaire'
    },
    {
      path: '/contact',
      icon: Mail,
      label: t('common.contact'),
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
      <div className="flex items-center justify-around h-20 px-1 max-w-screen-xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 min-w-[64px] min-h-[64px] gap-1.5 transition-all duration-200 rounded-lg mx-1 touch-target touch-feedback",
                active 
                  ? "text-primary scale-105" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={item.ariaLabel}
              aria-current={active ? 'page' : undefined}
            >
              <div className={cn(
                "relative",
                active && "scale-110"
              )}>
                <Icon 
                  className={cn(
                    "h-7 w-7 transition-all",
                    active && "drop-shadow-lg"
                  )} 
                />
                {active && (
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-sm" />
                )}
              </div>
              <span className={cn(
                "text-[11px] font-medium leading-tight",
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
