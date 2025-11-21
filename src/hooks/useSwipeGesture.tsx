import { useRef, useCallback } from "react";
import { hapticSwipe } from "@/utils/haptics";

interface SwipeGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  hapticFeedback?: boolean;
}

/**
 * Hook pour gérer les gestures de swipe horizontal
 * Utilisé principalement sur les cards de voitures
 */
export const useSwipeGesture = ({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  hapticFeedback = true
}: SwipeGestureOptions) => {
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isSwiping.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isSwiping.current) return;
    
    const deltaX = touchEndX.current - touchStartX.current;
    
    // Swipe left (vers la gauche)
    if (deltaX < -threshold && onSwipeLeft) {
      if (hapticFeedback) hapticSwipe();
      onSwipeLeft();
    }
    
    // Swipe right (vers la droite)
    if (deltaX > threshold && onSwipeRight) {
      if (hapticFeedback) hapticSwipe();
      onSwipeRight();
    }
    
    isSwiping.current = false;
    touchStartX.current = 0;
    touchEndX.current = 0;
  }, [onSwipeLeft, onSwipeRight, threshold, hapticFeedback]);

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd
  };
};
