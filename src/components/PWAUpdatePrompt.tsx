import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, X, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { onVersionUpdate, applyUpdate, checkForUpdates } from '@/utils/versionCheck';

const AUTO_UPDATE_BACKGROUND_TIME = 5 * 60 * 1000; // 5 minutes en background → auto-update

export function PWAUpdatePrompt() {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [versionMismatch, setVersionMismatch] = useState(false);
  const backgroundTimeRef = useRef<number | null>(null);
  const hiddenTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Détecter le statut de connexion
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('✅ Connexion rétablie', {
        description: 'Vous êtes de nouveau en ligne'
      });
      // Vérifier les mises à jour au retour en ligne
      checkForUpdates();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast.info('📱 Mode hors ligne', {
        description: 'L\'app continue de fonctionner'
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // S'abonner aux notifications de version du système de version check
    const unsubscribeVersion = onVersionUpdate((newVersion, currentVersion) => {
      console.log('[PWAUpdatePrompt] Nouvelle version détectée:', newVersion, 'actuelle:', currentVersion);
      setVersionMismatch(true);
      setShowUpdatePrompt(true);
    });

    // Gérer le temps passé en background pour auto-update
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        hiddenTimeRef.current = Date.now();
      } else if (document.visibilityState === 'visible' && hiddenTimeRef.current) {
        const timeInBackground = Date.now() - hiddenTimeRef.current;
        
        // Si l'app était en background pendant plus de 5 minutes et qu'une mise à jour est disponible
        if (timeInBackground > AUTO_UPDATE_BACKGROUND_TIME && (showUpdatePrompt || versionMismatch)) {
          console.log('[PWAUpdatePrompt] Auto-update après', Math.round(timeInBackground / 1000), 'secondes en background');
          handleUpdate();
        } else if (timeInBackground > AUTO_UPDATE_BACKGROUND_TIME) {
          // Vérifier s'il y a une nouvelle version
          checkForUpdates();
        }
        
        hiddenTimeRef.current = null;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Vérifier les mises à jour du Service Worker (seulement si un SW est enregistré)
    if ('serviceWorker' in navigator) {
      // D'abord vérifier s'il y a des SW enregistrés
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        if (registrations.length === 0) {
          // Pas de SW enregistré, ne rien faire
          console.log('[PWAUpdatePrompt] Aucun Service Worker enregistré');
          return;
        }
        
        navigator.serviceWorker.ready.then((reg) => {
          setRegistration(reg);
          
          // Vérifier les mises à jour
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Nouvelle version disponible
                  console.log('[PWAUpdatePrompt] Nouvelle version SW disponible');
                  setShowUpdatePrompt(true);
                }
              });
            }
          });

          // Vérifier immédiatement si une mise à jour est disponible
          reg.update().catch(console.warn);
        }).catch(console.warn);
      }).catch(console.warn);

      // Écouter les changements de controller (nouveau SW actif)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (isUpdating) {
          window.location.reload();
        }
      });
    }

    // Vérification périodique (toutes les 5 minutes)
    const checkInterval = setInterval(() => {
      if (document.visibilityState === 'visible' && isOnline) {
        if (registration) {
          registration.update().catch(console.warn);
        }
        checkForUpdates();
      }
    }, 5 * 60 * 1000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(checkInterval);
      unsubscribeVersion();
    };
  }, [showUpdatePrompt, versionMismatch, isOnline, isUpdating, registration]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    
    try {
      // Si on a un SW en attente, l'activer
      if (registration?.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
      
      // Utiliser notre système de mise à jour
      await applyUpdate();
    } catch (error) {
      console.error('[PWAUpdatePrompt] Erreur lors de la mise à jour:', error);
      // Fallback: simple reload
      window.location.reload();
    }
  };

  const handleDismiss = () => {
    setShowUpdatePrompt(false);
    // Réafficher dans 30 minutes si toujours pas mis à jour
    setTimeout(() => {
      if (versionMismatch) {
        setShowUpdatePrompt(true);
      }
    }, 30 * 60 * 1000);
  };

  if (!showUpdatePrompt) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50",
        "bg-background border-2 rounded-lg shadow-2xl",
        versionMismatch ? "border-destructive" : "border-primary",
        "animate-fade-in p-4 flex items-start gap-3"
      )}
      role="alert"
    >
      <div className="flex-shrink-0 mt-0.5">
        {versionMismatch ? (
          <AlertTriangle className="h-5 w-5 text-destructive" />
        ) : (
          <RefreshCw className={cn("h-5 w-5 text-primary", isUpdating && "animate-spin")} />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm mb-1">
          {versionMismatch ? 'Mise à jour importante' : 'Nouvelle version disponible'}
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          {versionMismatch 
            ? 'Une nouvelle version est requise pour un fonctionnement optimal.'
            : 'Une mise à jour de l\'application est disponible avec de nouvelles fonctionnalités.'
          }
        </p>
        
        <div className="flex gap-2">
          <Button
            onClick={handleUpdate}
            size="sm"
            disabled={isUpdating}
            variant={versionMismatch ? "destructive" : "default"}
            className="text-xs h-8 px-3 touch-target"
          >
            {isUpdating ? (
              <>
                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                Mise à jour...
              </>
            ) : (
              'Mettre à jour maintenant'
            )}
          </Button>
          {!versionMismatch && (
            <Button
              onClick={handleDismiss}
              variant="ghost"
              size="sm"
              disabled={isUpdating}
              className="text-xs h-8 px-3 touch-target"
            >
              Plus tard
            </Button>
          )}
        </div>
      </div>
      
      {!versionMismatch && (
        <button
          onClick={handleDismiss}
          disabled={isUpdating}
          className="flex-shrink-0 touch-target p-1 hover:bg-muted rounded"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
