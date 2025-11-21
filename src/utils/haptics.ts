/**
 * Haptic Feedback Utilities
 * Fournit un retour tactile sur mobile pour améliorer l'UX
 */

type HapticType = 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' | 'error';

/**
 * Déclenche un retour haptique si disponible
 */
export const triggerHaptic = (type: HapticType = 'light') => {
  // Vérifier si l'API Vibration est disponible
  if (!navigator.vibrate) return;

  const patterns: Record<HapticType, number | number[]> = {
    light: 10,
    medium: 20,
    heavy: 30,
    selection: [5],
    success: [10, 50, 10],
    warning: [15, 50, 15],
    error: [20, 100, 20, 100, 20]
  };

  navigator.vibrate(patterns[type]);
};

/**
 * Haptic pour swipe réussi
 */
export const hapticSwipe = () => triggerHaptic('light');

/**
 * Haptic pour long press
 */
export const hapticLongPress = () => triggerHaptic('medium');

/**
 * Haptic pour ajout à la comparaison
 */
export const hapticAddToCompare = () => triggerHaptic('success');

/**
 * Haptic pour retrait de la comparaison
 */
export const hapticRemoveFromCompare = () => triggerHaptic('light');

/**
 * Haptic pour fermeture de modal
 */
export const hapticClose = () => triggerHaptic('light');

/**
 * Haptic pour sélection
 */
export const hapticSelect = () => triggerHaptic('selection');
