import { useRef, useCallback } from "react";
import { hapticLongPress } from "@/utils/haptics";

interface LongPressOptions {
  onLongPress: () => void;
  delay?: number;
  hapticFeedback?: boolean;
}

/**
 * Hook pour détecter un long press
 * Utilisé pour afficher une preview détaillée d'une voiture
 */
export const useLongPress = ({
  onLongPress,
  delay = 500,
  hapticFeedback = true
}: LongPressOptions) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const isLongPress = useRef<boolean>(false);

  const handleStart = useCallback(() => {
    isLongPress.current = false;
    
    timeoutRef.current = setTimeout(() => {
      isLongPress.current = true;
      if (hapticFeedback) hapticLongPress();
      onLongPress();
    }, delay);
  }, [onLongPress, delay, hapticFeedback]);

  const handleEnd = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    isLongPress.current = false;
  }, []);

  const shouldPreventClick = useCallback(() => {
    return isLongPress.current;
  }, []);

  return {
    onMouseDown: handleStart,
    onMouseUp: handleEnd,
    onMouseLeave: handleEnd,
    onTouchStart: handleStart,
    onTouchEnd: handleEnd,
    shouldPreventClick
  };
};
