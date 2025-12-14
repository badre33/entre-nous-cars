import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

const bookings = [
  { name: "Mohamed", city: "Casablanca", car: "Dacia Duster", time: "il y a 2 min" },
  { name: "Sarah", city: "Marrakech", car: "Renault Clio", time: "il y a 5 min" },
  { name: "Ahmed", city: "Rabat", car: "Peugeot 208", time: "il y a 8 min" },
  { name: "Fatima", city: "Agadir", car: "Toyota Corolla", time: "il y a 12 min" },
  { name: "Youssef", city: "Tanger", car: "VW Golf", time: "il y a 15 min" },
  { name: "Amina", city: "Fès", car: "Hyundai Tucson", time: "il y a 18 min" },
];

export const RecentBookings = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Check if user already dismissed
    if (sessionStorage.getItem("benatna-bookings-dismissed")) {
      return;
    }

    // Show first notification after 5 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (!isVisible || hasInteracted) return;

    // Auto-hide after 4 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      
      // Show next notification after 8-12 seconds
      const nextTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % bookings.length);
        setIsVisible(true);
      }, 8000 + Math.random() * 4000);

      return () => clearTimeout(nextTimer);
    }, 4000);

    return () => clearTimeout(hideTimer);
  }, [isVisible, currentIndex, hasInteracted]);

  const handleDismiss = () => {
    setHasInteracted(true);
    setIsVisible(false);
    sessionStorage.setItem("benatna-bookings-dismissed", "true");
  };

  if (!isVisible) return null;

  const booking = bookings[currentIndex];

  return (
    <div 
      className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-40 animate-fade-in cursor-pointer"
      onClick={handleDismiss}
    >
      <div className="bg-background border border-border shadow-lg rounded-lg p-3 max-w-[280px] flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {booking.name} de {booking.city}
          </p>
          <p className="text-xs text-muted-foreground">
            a réservé une <span className="font-medium">{booking.car}</span>
          </p>
          <p className="text-xs text-muted-foreground/70 mt-0.5">
            {booking.time}
          </p>
        </div>
      </div>
    </div>
  );
};
