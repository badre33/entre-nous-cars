import { useState, useEffect } from 'react';
import { CheckCircle, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecentBookingAlertProps {
  className?: string;
}

interface Booking {
  location: string;
  timeAgo: string;
  vehicle: string;
}

/**
 * Alertes de réservations récentes pour créer social proof
 * Affiche des notifications de réservations fictives mais réalistes
 */
export const RecentBookingAlert = ({ className }: RecentBookingAlertProps) => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const locations = [
    'Casablanca', 'Marrakech', 'Rabat', 'Tanger', 'Agadir', 'Fès'
  ];

  const vehicles = [
    'Dacia Sandero', 'Renault Clio', 'Peugeot 208', 'Dacia Duster', 
    'Renault Captur', 'Toyota Corolla'
  ];

  const timeFrames = [
    'il y a 2 minutes', 'il y a 5 minutes', 'il y a 8 minutes',
    'il y a 12 minutes', 'il y a 15 minutes'
  ];

  const generateBooking = (): Booking => ({
    location: locations[Math.floor(Math.random() * locations.length)],
    timeAgo: timeFrames[Math.floor(Math.random() * timeFrames.length)],
    vehicle: vehicles[Math.floor(Math.random() * vehicles.length)]
  });

  useEffect(() => {
    // Première alerte après 8-12 secondes
    const initialDelay = setTimeout(() => {
      setBooking(generateBooking());
      setIsVisible(true);

      setTimeout(() => setIsVisible(false), 6000);
    }, Math.random() * 4000 + 8000);

    // Nouvelles alertes toutes les 20-35 secondes
    const interval = setInterval(() => {
      setBooking(generateBooking());
      setIsVisible(true);

      setTimeout(() => setIsVisible(false), 6000);
    }, Math.random() * 15000 + 20000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  if (!booking) return null;

  return (
    <div
      className={cn(
        "fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40 max-w-xs sm:max-w-sm",
        "transition-all duration-500 ease-out",
        isVisible 
          ? "opacity-100 translate-x-0" 
          : "opacity-0 translate-x-4 pointer-events-none",
        className
      )}
    >
      <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-xl border-2 border-green-200 backdrop-blur-sm">
        <div className="flex-shrink-0 mt-0.5">
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 mb-1">
            Nouvelle réservation !
          </p>
          <p className="text-sm text-gray-600 mb-2">
            {booking.vehicle}
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {booking.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {booking.timeAgo}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
