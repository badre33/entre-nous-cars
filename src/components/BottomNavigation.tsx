import { NavLink, useLocation } from 'react-router-dom';
import { Home, Car, Handshake, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { analytics } from '@/utils/analytics';

export const BottomNavigation = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const handleWhatsAppClick = () => {
    analytics.trackChatOpened('whatsapp');
    window.open(
      'https://wa.me/212661755943?text=Bonjour%20Benatna%20!%20Je%20souhaite%20louer%20une%20voiture.',
      '_blank'
    );
  };

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
      ariaLabel: 'Louer une voiture',
      highlight: true
    },
    {
      path: '/partenaires',
      icon: Handshake,
      label: t('common.partners'),
      ariaLabel: 'Devenir partenaire'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-xl border-t border-border/50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
      role="navigation"
      aria-label="Navigation mobile principale"
      style={{ 
        paddingBottom: 'env(safe-area-inset-bottom, 8px)',
      }}
    >
      <div className="flex items-stretch justify-around h-16 px-2 max-w-screen-sm mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          const isHighlight = item.highlight;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 min-w-[56px] py-2 gap-0.5 transition-all duration-200 relative touch-feedback",
                active 
                  ? "text-primary" 
                  : isHighlight
                    ? "text-foreground"
                    : "text-muted-foreground",
              )}
              aria-label={item.ariaLabel}
              aria-current={active ? 'page' : undefined}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {isHighlight && !active && (
                <div className="absolute inset-x-1 inset-y-1 bg-primary/10 rounded-xl -z-10" />
              )}
              
              <div className={cn(
                "relative flex items-center justify-center w-10 h-10 rounded-xl transition-all",
                active && "bg-primary/15 scale-105",
                isHighlight && !active && "bg-primary/20"
              )}>
                <Icon 
                  className={cn(
                    "h-6 w-6 transition-all",
                    active && "text-primary",
                    isHighlight && !active && "text-primary"
                  )} 
                />
                {active && (
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </div>
              <span className={cn(
                "text-[11px] font-medium leading-tight text-center",
                active && "font-semibold text-primary",
                isHighlight && !active && "text-primary font-medium"
              )}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
        
        {/* WhatsApp CTA - Most important conversion action */}
        <button
          onClick={handleWhatsAppClick}
          className="flex flex-col items-center justify-center flex-1 min-w-[56px] py-2 gap-0.5 transition-all duration-200 relative touch-feedback"
          aria-label="Contacter via WhatsApp"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <div className="absolute inset-x-1 inset-y-1 bg-[#25D366]/15 rounded-xl -z-10 animate-pulse" />
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#25D366]/20">
            <MessageCircle className="h-6 w-6 text-[#25D366]" />
            {/* Notification dot */}
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#25D366] rounded-full border-2 border-background" />
          </div>
          <span className="text-[11px] font-medium leading-tight text-center text-[#25D366]">
            WhatsApp
          </span>
        </button>
      </div>
    </nav>
  );
};
