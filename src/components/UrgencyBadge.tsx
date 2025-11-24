import { AlertTriangle, Clock, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UrgencyBadgeProps {
  type?: 'limited' | 'popular' | 'fast-booking';
  count?: number;
  className?: string;
}

/**
 * Badge d'urgence pour créer FOMO
 * Affiche des indicateurs visuels d'urgence (stock limité, populaire, etc.)
 */
export const UrgencyBadge = ({ 
  type = 'limited',
  count = 2,
  className 
}: UrgencyBadgeProps) => {
  const variants = {
    limited: {
      icon: AlertTriangle,
      text: `Plus que ${count} disponibles`,
      color: 'bg-orange-100 text-orange-700 border-orange-300',
      iconColor: 'text-orange-600',
      pulse: true
    },
    popular: {
      icon: Flame,
      text: `${count} réservations cette semaine`,
      color: 'bg-red-100 text-red-700 border-red-300',
      iconColor: 'text-red-600',
      pulse: true
    },
    'fast-booking': {
      icon: Clock,
      text: 'Réservation rapide disponible',
      color: 'bg-green-100 text-green-700 border-green-300',
      iconColor: 'text-green-600',
      pulse: false
    }
  };

  const variant = variants[type];
  const Icon = variant.icon;

  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2",
      "text-sm font-semibold shadow-sm",
      variant.color,
      className
    )}>
      <Icon className={cn(
        "h-4 w-4",
        variant.iconColor,
        variant.pulse && "animate-pulse"
      )} />
      <span>{variant.text}</span>
    </div>
  );
};
