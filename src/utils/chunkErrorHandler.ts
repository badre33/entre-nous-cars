/**
 * ChunkLoadError Handler
 * 
 * Intercepte les erreurs de chargement de modules dynamiques (chunks) et force
 * un reload propre pour récupérer la nouvelle version de l'application.
 * 
 * Cas gérés :
 * - ChunkLoadError : erreur de chargement de chunk Vite/Webpack
 * - Loading chunk failed : message d'erreur alternatif
 * - 404 sur les fichiers .js/.css avec hash
 * - Erreurs de syntaxe sur les assets (Unexpected token <)
 */

const RELOAD_KEY = 'chunk_error_reload_count';
const RELOAD_TIMESTAMP_KEY = 'chunk_error_last_reload';
const MAX_RELOADS = 3;
const RELOAD_WINDOW_MS = 60 * 1000; // 1 minute

/**
 * Vérifie si nous sommes dans une boucle de reload
 */
function isReloadLoop(): boolean {
  const reloadCount = parseInt(sessionStorage.getItem(RELOAD_KEY) || '0', 10);
  const lastReload = parseInt(sessionStorage.getItem(RELOAD_TIMESTAMP_KEY) || '0', 10);
  const now = Date.now();

  // Réinitialiser si le dernier reload date de plus d'une minute
  if (now - lastReload > RELOAD_WINDOW_MS) {
    sessionStorage.setItem(RELOAD_KEY, '0');
    return false;
  }

  return reloadCount >= MAX_RELOADS;
}

/**
 * Incrémente le compteur de reload
 */
function incrementReloadCount(): void {
  const reloadCount = parseInt(sessionStorage.getItem(RELOAD_KEY) || '0', 10);
  sessionStorage.setItem(RELOAD_KEY, String(reloadCount + 1));
  sessionStorage.setItem(RELOAD_TIMESTAMP_KEY, String(Date.now()));
}

/**
 * Nettoie les caches du Service Worker
 */
async function clearServiceWorkerCaches(): Promise<void> {
  try {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => {
          console.log(`[ChunkErrorHandler] Suppression du cache: ${cacheName}`);
          return caches.delete(cacheName);
        })
      );
    }

    // Demander au SW de se désinscrire
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(
        registrations.map(registration => {
          console.log('[ChunkErrorHandler] Désinscription du Service Worker');
          return registration.unregister();
        })
      );
    }
  } catch (e) {
    console.warn('[ChunkErrorHandler] Erreur lors du nettoyage des caches:', e);
  }
}

/**
 * Force un hard reload avec cache-busting
 */
function forceHardReload(): void {
  if (isReloadLoop()) {
    console.error('[ChunkErrorHandler] Boucle de reload détectée. Abandon.');
    // Afficher un message à l'utilisateur
    document.body.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: system-ui, sans-serif; padding: 20px; text-align: center;">
        <h1 style="color: #ef4444; margin-bottom: 16px;">Erreur de chargement</h1>
        <p style="color: #6b7280; margin-bottom: 24px; max-width: 400px;">
          Une erreur est survenue lors du chargement de l'application. 
          Veuillez vider le cache de votre navigateur et rafraîchir la page.
        </p>
        <button onclick="localStorage.clear(); sessionStorage.clear(); location.href = location.origin + '?cache_bust=' + Date.now();" 
                style="background: #f97316; color: white; padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
          Réessayer
        </button>
      </div>
    `;
    return;
  }

  incrementReloadCount();
  console.log('[ChunkErrorHandler] Rechargement forcé de la page...');
  
  // Hard reload avec cache-busting
  const url = new URL(window.location.href);
  url.searchParams.set('_cb', Date.now().toString());
  window.location.replace(url.toString());
}

/**
 * Vérifie si l'erreur est liée à un ChunkLoadError
 */
function isChunkLoadError(error: Error | unknown): boolean {
  if (!error) return false;
  
  const errorString = String(error);
  const errorMessage = error instanceof Error ? error.message : errorString;
  const errorName = error instanceof Error ? error.name : '';

  const chunkErrorPatterns = [
    /ChunkLoadError/i,
    /Loading chunk .* failed/i,
    /Loading CSS chunk .* failed/i,
    /Failed to fetch dynamically imported module/i,
    /Unable to preload CSS/i,
    /Importing a module script failed/i,
    /error loading dynamically imported module/i,
    // NetworkOnly failures (new SW config)
    /Failed to fetch/i,
    /NetworkError when attempting to fetch/i,
    /Load failed/i,
    /fetch failed/i,
  ];

  // Check if error is related to asset loading (JS/CSS chunks)
  const isAssetRelated = errorString.includes('/assets/') || 
                         errorString.includes('.js') || 
                         errorString.includes('.css');

  const matchesPattern = chunkErrorPatterns.some(pattern => 
    pattern.test(errorMessage) || pattern.test(errorName) || pattern.test(errorString)
  );

  // For generic fetch errors, only treat as chunk error if asset-related
  const isGenericFetchError = /Failed to fetch|NetworkError|Load failed|fetch failed/i.test(errorMessage);
  
  return matchesPattern && (!isGenericFetchError || isAssetRelated);
}

/**
 * Vérifie si l'erreur est une erreur de syntaxe sur un asset (HTML servi au lieu de JS)
 */
function isSyntaxErrorOnAsset(error: Error | unknown): boolean {
  if (!error) return false;
  
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  // Quand le serveur renvoie du HTML au lieu de JS (404 fallback)
  return errorMessage.includes('Unexpected token') && errorMessage.includes('<');
}

/**
 * Handler pour les erreurs globales (window.onerror)
 */
function handleGlobalError(event: ErrorEvent): void {
  const { error, filename } = event;
  
  // Vérifier si c'est une erreur sur un fichier d'assets
  const isAssetFile = filename && /\/assets\/.*\.(js|css)/.test(filename);
  
  if (isChunkLoadError(error) || (isAssetFile && isSyntaxErrorOnAsset(error))) {
    console.error('[ChunkErrorHandler] Erreur de chunk détectée:', error);
    event.preventDefault();
    
    clearServiceWorkerCaches().then(() => {
      forceHardReload();
    });
  }
}

/**
 * Handler pour les rejections de promesses non gérées
 */
function handleUnhandledRejection(event: PromiseRejectionEvent): void {
  const { reason } = event;
  
  if (isChunkLoadError(reason)) {
    console.error('[ChunkErrorHandler] Erreur de chunk (promise) détectée:', reason);
    event.preventDefault();
    
    clearServiceWorkerCaches().then(() => {
      forceHardReload();
    });
  }
}

/**
 * Initialise le handler d'erreurs de chunks
 */
export function initChunkErrorHandler(): void {
  // Nettoyer le compteur de reload si la page charge correctement
  // On attend un peu pour s'assurer que tout est bien chargé
  setTimeout(() => {
    sessionStorage.removeItem(RELOAD_KEY);
    sessionStorage.removeItem(RELOAD_TIMESTAMP_KEY);
  }, 5000);

  window.addEventListener('error', handleGlobalError);
  window.addEventListener('unhandledrejection', handleUnhandledRejection);

  console.log('[ChunkErrorHandler] Handler initialisé');
}

// Auto-initialisation
initChunkErrorHandler();
