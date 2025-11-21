import { useRef, useCallback, useState } from "react";
import { hapticClose } from "@/utils/haptics";

interface SwipeToCloseOptions {
  onClose: () => void;
  threshold?: number;
  hapticFeedback?: boolean;
}

/**
 * Hook pour fermer une modal avec un swipe down
 * Ajoute une animation fluide pendant le drag
 */
export const useSwipeToClose = ({
  onClose,
  threshold = 100,
  hapticFeedback = true
}: SwipeToCloseOptions) => {
  const touchStartY = useRef<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartY.current;
    
    // Ne permettre que le swipe vers le bas
    if (deltaY > 0) {
      setDragOffset(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (dragOffset > threshold) {
      if (hapticFeedback) hapticClose();
      onClose();
    }
    
    setDragOffset(0);
    setIsDragging(false);
  };

  return {
    dragOffset,
    isDragging,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    }
  };
};
