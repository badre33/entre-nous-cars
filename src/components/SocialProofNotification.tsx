import { useState, useEffect } from 'react';
import { Users, TrendingUp, AlertCircle, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SocialProofNotificationProps {
  vehicleName?: string;
  className?: string;
}

interface Notification {
  id: string;
  type: 'viewing' | 'booked' | 'limited' | 'trending';
  message: string;
  icon: any;
  color: string;
}

/**
 * Composant Social Proof avec FOMO en temps réel
 * Affiche des notifications dynamiques pour créer l'urgence et augmenter conversions
 */
export const SocialProofNotification = ({ 
  vehicleName = "ce véhicule",
  className 
}: SocialProofNotificationProps) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Générateur de nombres aléatoires réalistes
  const getRandomNumber = (min: number, max: number) => 
    Math.floor(Math.random() * (max - min + 1)) + min;

  // Messages de social proof avec variations
  const generateNotification = (): Notification => {
    const notifications: Notification[] = [
      // Personnes qui regardent en ce moment
      {
        id: 'viewing',
        type: 'viewing',
        message: `${getRandomNumber(2, 7)} personnes regardent ${vehicleName} en ce moment`,
        icon: Eye,
        color: 'text-blue-600 bg-blue-50 border-blue-200'
      },
      // Réservations récentes
      {
        id: 'booked',
        type: 'booked',
        message: `Réservé ${getRandomNumber(3, 8)} fois aujourd'hui`,
        icon: TrendingUp,
        color: 'text-green-600 bg-green-50 border-green-200'
      },
      // Stock limité
      {
        id: 'limited',
        type: 'limited',
        message: `Plus que ${getRandomNumber(1, 3)} véhicules disponibles`,
        icon: AlertCircle,
        color: 'text-orange-600 bg-orange-50 border-orange-200'
      },
      // En tendance
      {
        id: 'trending',
        type: 'trending',
        message: `${getRandomNumber(12, 25)} personnes ont consulté cette page dans les dernières 24h`,
        icon: Users,
        color: 'text-purple-600 bg-purple-50 border-purple-200'
      }
    ];

    return notifications[getRandomNumber(0, notifications.length - 1)];
  };

  useEffect(() => {
    // Afficher première notification après 3-5 secondes
    const initialDelay = setTimeout(() => {
      setNotification(generateNotification());
      setIsVisible(true);

      // Masquer après 5 secondes
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }, getRandomNumber(3000, 5000));

    // Afficher nouvelles notifications toutes les 15-25 secondes
    const interval = setInterval(() => {
      setNotification(generateNotification());
      setIsVisible(true);

      // Masquer après 5 secondes
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }, getRandomNumber(15000, 25000));

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [vehicleName]);

  if (!notification) return null;

  const Icon = notification.icon;

  return (
    <div
      className={cn(
        "fixed bottom-20 sm:bottom-24 left-4 sm:left-6 z-40 max-w-xs sm:max-w-sm",
        "transition-all duration-500 ease-out",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-4 pointer-events-none",
        className
      )}
    >
      <div 
        className={cn(
          "flex items-center gap-3 p-4 rounded-lg shadow-lg border-2",
          "backdrop-blur-sm",
          notification.color,
          "animate-in slide-in-from-bottom-4 duration-500"
        )}
      >
        <div className="flex-shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        <p className="text-sm font-medium leading-tight">
          {notification.message}
        </p>
      </div>
    </div>
  );
};
