import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, X, Wifi, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function PWAUpdatePrompt() {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Détecter le statut de connexion
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('✅ Connexion rétablie', {
        description: 'Vous êtes de nouveau en ligne'
      });
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast.info('📱 Mode hors ligne', {
        description: 'L\'app continue de fonctionner'
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Vérifier les mises à jour du Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        setRegistration(reg);
        
        // Vérifier les mises à jour
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Nouvelle version disponible
                setShowUpdatePrompt(true);
              }
            });
          }
        });

        // Vérifier immédiatement si une mise à jour est disponible
        reg.update();
      });

      // Message du service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'CACHE_UPDATED') {
          console.log('✅ Cache mis à jour');
        }
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleUpdate = () => {
    if (registration?.waiting) {
      // Demander au nouveau SW de prendre le contrôle
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      // Recharger une fois que le nouveau SW a pris le contrôle
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    }
  };

  if (!showUpdatePrompt) {
    // Afficher juste l'indicateur de statut en bas
    return (
      <div className="fixed bottom-24 md:bottom-4 right-4 z-40">
        <div className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-full shadow-lg text-xs font-medium transition-all",
          isOnline 
            ? "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20" 
            : "bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-500/20"
        )}>
          {isOnline ? (
            <>
              <Wifi className="h-3 w-3" />
              <span className="hidden sm:inline">En ligne</span>
            </>
          ) : (
            <>
              <WifiOff className="h-3 w-3" />
              <span className="hidden sm:inline">Hors ligne</span>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50",
        "bg-background border-2 border-primary rounded-lg shadow-2xl",
        "animate-fade-in p-4 flex items-start gap-3"
      )}
      role="alert"
    >
      <div className="flex-shrink-0 mt-0.5">
        <RefreshCw className="h-5 w-5 text-primary" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm mb-1">
          Nouvelle version disponible
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          Une mise à jour de l'application est disponible avec de nouvelles fonctionnalités.
        </p>
        
        <div className="flex gap-2">
          <Button
            onClick={handleUpdate}
            size="sm"
            className="text-xs h-8 px-3 touch-target"
          >
            Mettre à jour
          </Button>
          <Button
            onClick={() => setShowUpdatePrompt(false)}
            variant="ghost"
            size="sm"
            className="text-xs h-8 px-3 touch-target"
          >
            Plus tard
          </Button>
        </div>
      </div>
      
      <button
        onClick={() => setShowUpdatePrompt(false)}
        className="flex-shrink-0 touch-target p-1 hover:bg-muted rounded"
        aria-label="Fermer"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
