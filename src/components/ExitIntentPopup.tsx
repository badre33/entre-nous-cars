import { useState, useEffect, useCallback } from 'react';
import { Gift, Car, Clock, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { analytics } from '@/utils/analytics';
import { Link } from 'react-router-dom';

export const ExitIntentPopup = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [hasShown, setHasShown] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [countdown, setCountdown] = useState(15);

  // Countdown timer for urgency
  useEffect(() => {
    if (!isOpen || countdown <= 0) return;
    const timer = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [isOpen, countdown]);

  const triggerPopup = useCallback(() => {
    if (hasShown) return;
    setIsOpen(true);
    setHasShown(true);
    sessionStorage.setItem('exitIntentShown', 'true');
    analytics.trackEvent('exit_intent_shown');
  }, [hasShown]);

  useEffect(() => {
    const shown = sessionStorage.getItem('exitIntentShown');
    if (shown) {
      setHasShown(true);
      return;
    }

    // Desktop: mouse leave detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) triggerPopup();
    };

    // Mobile: back button / scroll up aggressively / inactivity
    let scrollY = 0;
    let inactivityTimer: NodeJS.Timeout;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // If user scrolls up quickly near top, might be leaving
      if (currentScrollY < 100 && scrollY > 200) {
        triggerPopup();
      }
      scrollY = currentScrollY;
      
      // Reset inactivity timer on scroll
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        // Show after 30s of inactivity if still on page
        if (document.visibilityState === 'visible') {
          triggerPopup();
        }
      }, 30000);
    };

    // Also trigger on visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // User is leaving, store interaction state
        sessionStorage.setItem('userEngaged', 'partial');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Show after 25s if no interaction (for users who land and don't scroll)
    const timeoutTimer = setTimeout(() => {
      const hasScrolled = sessionStorage.getItem('userEngaged');
      if (!hasScrolled) triggerPopup();
    }, 25000);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(inactivityTimer);
      clearTimeout(timeoutTimer);
    };
  }, [hasShown, triggerPopup]);

  // Track scroll engagement
  useEffect(() => {
    const handleFirstScroll = () => {
      sessionStorage.setItem('userEngaged', 'scrolled');
      window.removeEventListener('scroll', handleFirstScroll);
    };
    window.addEventListener('scroll', handleFirstScroll, { passive: true, once: true });
    return () => window.removeEventListener('scroll', handleFirstScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      analytics.trackEmailSubscribed('exit_intent_popup');
      toast({
        title: "Code envoyé !",
        description: "Vérifiez votre email pour votre code de réduction -15%.",
      });
      setIsOpen(false);
      setEmail('');
    }
  };

  const handleCTAClick = (action: string) => {
    analytics.trackEvent('exit_intent_cta_clicked', { action });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {/* Urgency banner */}
        <div className="bg-destructive text-destructive-foreground px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium">
          <Clock className="h-4 w-4 animate-pulse" />
          <span>Offre expire dans {countdown > 0 ? `0:${countdown.toString().padStart(2, '0')}` : 'quelques secondes'}</span>
          <Sparkles className="h-4 w-4" />
        </div>
        
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
              <Gift className="h-6 w-6 text-primary" />
              Attendez ! Un cadeau vous attend
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {!showEmailForm ? (
              <>
                {/* Quick value props */}
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full p-3 shrink-0">
                      <Car className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary">-15%</h3>
                      <p className="text-sm text-muted-foreground">Sur votre 1ère location</p>
                    </div>
                  </div>
                </div>

                {/* Quick actions - Most important first */}
                <div className="space-y-2">
                  <Link to="/louer" onClick={() => handleCTAClick('browse_cars')}>
                    <Button className="w-full" size="lg">
                      <Car className="mr-2 h-4 w-4" />
                      Voir nos véhicules disponibles
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="lg"
                    onClick={() => setShowEmailForm(true)}
                  >
                    <Gift className="mr-2 h-4 w-4" />
                    Recevoir mon code -15%
                  </Button>
                </div>

                {/* Trust signals */}
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
                  <span className="flex items-center gap-1">
                    ⭐ 4.8/5
                  </span>
                  <span>•</span>
                  <span>1200+ clients satisfaits</span>
                  <span>•</span>
                  <span>Sans engagement</span>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg text-center">
                  <h3 className="text-2xl font-bold text-primary mb-1">-15%</h3>
                  <p className="text-sm text-muted-foreground">Code envoyé instantanément</p>
                </div>
                
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-12 text-base"
                  autoFocus
                />
                <Button type="submit" className="w-full" size="lg">
                  <Gift className="mr-2 h-4 w-4" />
                  Recevoir mon code -15%
                </Button>
                
                <button 
                  type="button"
                  onClick={() => setShowEmailForm(false)}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Retour aux options
                </button>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
