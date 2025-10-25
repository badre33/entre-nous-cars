import { useState, useEffect } from 'react';
import { X, Gift, Car } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { analytics } from '@/utils/analytics';

export const ExitIntentPopup = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const shown = sessionStorage.getItem('exitIntentShown');
    if (shown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from top of page
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      analytics.trackEmailSubscribed('exit_intent_popup');
      toast({
        title: "Code envoyé !",
        description: "Vérifiez votre email pour votre code de réduction.",
      });
      setIsOpen(false);
      setEmail('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Gift className="h-6 w-6 text-primary" />
            Ne partez pas sans votre cadeau !
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary text-primary-foreground rounded-full p-4">
                <Car className="h-8 w-8" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-primary mb-2">-15%</h3>
            <p className="text-sm text-muted-foreground">
              Sur votre première location
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <p className="text-sm text-center text-muted-foreground">
              Recevez votre code promo par email
            </p>
            <Input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
            <Button type="submit" className="w-full" size="lg">
              <Gift className="mr-2 h-4 w-4" />
              Recevoir mon code -15%
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground">
            Offre valable pour toute première réservation. Code envoyé instantanément.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
