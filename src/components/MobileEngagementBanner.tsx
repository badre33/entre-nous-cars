import { useState, useEffect } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { analytics } from '@/utils/analytics';

export const MobileEngagementBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if already dismissed this session
    const dismissed = sessionStorage.getItem('engagementBannerDismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show banner after 3 seconds of page load on mobile
    const timer = setTimeout(() => {
      if (window.innerWidth < 768) {
        setIsVisible(true);
        analytics.trackEvent('engagement_banner_shown');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('engagementBannerDismissed', 'true');
    analytics.trackEvent('engagement_banner_dismissed');
  };

  const handleCTAClick = () => {
    analytics.trackEvent('engagement_banner_cta_clicked');
    handleDismiss();
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="md:hidden fixed top-16 left-0 right-0 z-40 animate-slide-in-down">
      <div className="mx-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2 flex-1">
            <Sparkles className="h-5 w-5 shrink-0 animate-pulse" />
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">Offre spéciale -15%</p>
              <p className="text-xs text-white/80 truncate">Première location • Limité</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Link to="/louer" onClick={handleCTAClick}>
              <Button 
                size="sm" 
                variant="secondary" 
                className="bg-white text-primary hover:bg-white/90 text-xs px-3 h-8"
              >
                Voir <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
            <button 
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
