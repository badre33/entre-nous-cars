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
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/98 backdrop-blur-md border-t border-border shadow-lg safe-area-inset-bottom"
        role="navigation"
        aria-label="Navigation mobile principale"
        style={{ 
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}
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
                "flex flex-col items-center justify-center flex-1 min-w-[72px] min-h-[56px] gap-1.5 transition-all duration-200 rounded-xl mx-0.5 touch-target touch-feedback relative",
                active 
                  ? "text-primary scale-105" 
                  : "text-muted-foreground hover:text-foreground active:bg-accent/20"
              )}
              aria-label={item.ariaLabel}
              aria-current={active ? 'page' : undefined}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <div className={cn(
                "relative flex items-center justify-center",
                active && "scale-110"
              )}>
                <Icon 
                  className={cn(
                    "h-7 w-7 transition-all",
                    active && "drop-shadow-lg"
                  )} 
                />
                {active && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-sm animate-pulse" />
                )}
              </div>
              <span className={cn(
                "text-[10px] font-medium leading-tight text-center",
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
