import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ViewCounterProps {
  vehicleName?: string;
  baseViews?: number;
  className?: string;
}

/**
 * Compteur de vues en temps réel pour créer FOMO
 * Affiche le nombre de personnes consultant actuellement la page
 */
export const ViewCounter = ({ 
  vehicleName,
  baseViews = 3,
  className 
}: ViewCounterProps) => {
  const [viewCount, setViewCount] = useState(baseViews);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Simuler variations réalistes de +/- 1-2 personnes
    const interval = setInterval(() => {
      const change = Math.random() > 0.5 
        ? Math.floor(Math.random() * 2) + 1  // +1 ou +2
        : -Math.floor(Math.random() * 2) - 1; // -1 ou -2
      
      setViewCount(prev => {
        const newCount = Math.max(1, Math.min(prev + change, baseViews + 5));
        if (newCount !== prev) {
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 300);
        }
        return newCount;
      });
    }, Math.random() * 8000 + 5000); // Entre 5-13 secondes

    return () => clearInterval(interval);
  }, [baseViews]);

  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
      "bg-red-50 border border-red-200 text-red-700",
      "text-sm font-medium",
      "shadow-sm",
      className
    )}>
      <Eye className={cn(
        "h-4 w-4",
        isAnimating && "animate-pulse"
      )} />
      <span className={cn(
        "transition-all duration-300",
        isAnimating && "scale-110"
      )}>
        <span className="font-bold">{viewCount}</span> {viewCount === 1 ? 'personne regarde' : 'personnes regardent'}
      </span>
      <span className="flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
      </span>
    </div>
  );
};
