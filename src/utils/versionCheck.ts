/**
 * Version Check System
 * 
 * Détecte les mises à jour de l'application et notifie l'utilisateur
 * ou force un reload automatique si nécessaire.
 */

const VERSION_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes
const LAST_CHECK_KEY = 'app_version_last_check';
const CURRENT_VERSION_KEY = 'app_version_current';

// Timestamp de build injecté par Vite
declare const __BUILD_TIMESTAMP__: string;

interface VersionInfo {
  version: string;
  buildHash?: string;
  timestamp?: number;
}

/**
 * Récupère la version actuelle (embarquée dans l'app)
 */
export function getCurrentVersion(): string {
  try {
    return typeof __BUILD_TIMESTAMP__ !== 'undefined' 
      ? __BUILD_TIMESTAMP__ 
      : 'development';
  } catch {
    return 'development';
  }
}

/**
 * Récupère la version serveur via /version.json
 */
async function fetchServerVersion(): Promise<VersionInfo | null> {
  try {
    const response = await fetch('/version.json?_=' + Date.now(), {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    if (!response.ok) {
      console.warn('[VersionCheck] version.json non disponible');
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.warn('[VersionCheck] Erreur lors de la récupération de version.json:', error);
    return null;
  }
}

/**
 * Compare deux versions et retourne true si une mise à jour est disponible
 */
function isUpdateAvailable(current: string, server: string): boolean {
  if (current === 'development') return false;
  return current !== server;
}

/**
 * Callbacks pour les événements de version
 */
type VersionCallback = (newVersion: string, currentVersion: string) => void;
const updateCallbacks: VersionCallback[] = [];

/**
 * Enregistre un callback pour être notifié des mises à jour
 */
export function onVersionUpdate(callback: VersionCallback): () => void {
  updateCallbacks.push(callback);
  return () => {
    const index = updateCallbacks.indexOf(callback);
    if (index > -1) {
      updateCallbacks.splice(index, 1);
    }
  };
}

/**
 * Notifie tous les callbacks d'une mise à jour
 */
function notifyUpdate(newVersion: string, currentVersion: string): void {
  updateCallbacks.forEach(callback => {
    try {
      callback(newVersion, currentVersion);
    } catch (e) {
      console.error('[VersionCheck] Erreur dans le callback de mise à jour:', e);
    }
  });
}

/**
 * Vérifie si une mise à jour est disponible
 */
export async function checkForUpdates(): Promise<boolean> {
  const currentVersion = getCurrentVersion();
  const serverInfo = await fetchServerVersion();
  
  if (!serverInfo) return false;
  
  const hasUpdate = isUpdateAvailable(currentVersion, serverInfo.version);
  
  if (hasUpdate) {
    console.log('[VersionCheck] Nouvelle version disponible:', serverInfo.version);
    localStorage.setItem(LAST_CHECK_KEY, Date.now().toString());
    notifyUpdate(serverInfo.version, currentVersion);
  }
  
  return hasUpdate;
}

/**
 * Force un reload pour appliquer la mise à jour
 */
export async function applyUpdate(): Promise<void> {
  // Nettoyer les caches du Service Worker
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(name => caches.delete(name)));
  }
  
  // Désinscrire le Service Worker
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map(reg => reg.unregister()));
  }
  
  // Hard reload
  const url = new URL(window.location.href);
  url.searchParams.set('_v', Date.now().toString());
  window.location.replace(url.toString());
}

/**
 * Démarre la vérification périodique des mises à jour
 */
export function startVersionCheck(): () => void {
  // Première vérification après 30 secondes (laisser l'app charger)
  const initialTimeout = setTimeout(() => {
    checkForUpdates();
  }, 30 * 1000);
  
  // Vérifications périodiques
  const interval = setInterval(() => {
    // Ne vérifier que si la page est visible
    if (document.visibilityState === 'visible') {
      checkForUpdates();
    }
  }, VERSION_CHECK_INTERVAL);
  
  // Vérifier lors du retour sur la page
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      const lastCheck = parseInt(localStorage.getItem(LAST_CHECK_KEY) || '0', 10);
      const now = Date.now();
      
      // Si la dernière vérification date de plus de 5 minutes
      if (now - lastCheck > VERSION_CHECK_INTERVAL) {
        checkForUpdates();
      }
    }
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  // Cleanup function
  return () => {
    clearTimeout(initialTimeout);
    clearInterval(interval);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}

/**
 * Stocker la version actuelle au démarrage
 */
export function initVersionCheck(): void {
  const currentVersion = getCurrentVersion();
  const storedVersion = localStorage.getItem(CURRENT_VERSION_KEY);
  
  if (storedVersion && storedVersion !== currentVersion) {
    console.log('[VersionCheck] Version mise à jour:', storedVersion, '->', currentVersion);
    // Nettoyer le flag de reload loop car on est sur une nouvelle version
    sessionStorage.removeItem('chunk_error_reload_count');
  }
  
  localStorage.setItem(CURRENT_VERSION_KEY, currentVersion);
  console.log('[VersionCheck] Version actuelle:', currentVersion);
}

// Auto-initialisation
initVersionCheck();
