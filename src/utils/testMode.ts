// Mode test : https://benatna.ma/?test=1 marque cet appareil comme appareil de test
// (événements is_test, exclus du tableau /analytics ; message WhatsApp préfixé [TEST]).
// https://benatna.ma/?test=0 le retire.
const KEY = 'benatna_test_mode';
export function isTestMode(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const flag = new URLSearchParams(window.location.search).get('test');
    if (flag === '1') localStorage.setItem(KEY, '1');
    else if (flag === '0') localStorage.removeItem(KEY);
    return localStorage.getItem(KEY) === '1';
  } catch { return false; }
}
// Réservations de test passées avant le mode test : exclues des résultats commerciaux.
export const TEST_BOOKING_REFERENCES = ['BN-7GG7UH', 'BN-D27R26'];
