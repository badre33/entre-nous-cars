import { MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { analytics } from '@/utils/analytics';
import { requestRental } from '@/utils/rentalRequest';
import { useTr } from '@/contexts/LanguageContext';

// D026 (9 novembre 2026) : le bouton flottant ouvre le formulaire de réservation
// (dates, 1 à 3 voitures, lieu) ; plus aucun message WhatsApp sans dates.
export default function WhatsAppButton() {
  const location = useLocation();
  const tr = useTr();
  // Masqué là où un bouton « Réserver » est déjà présent (catalogue, fiches voitures).
  if (location.pathname.startsWith('/vehicule/') || ['/louer', '/en/louer', '/es/louer', '/partenaires', '/auth', '/analytics', '/demandes'].includes(location.pathname.replace(/\/$/, '') || '/')) return null;
  return (
    <button
      type="button"
      onClick={() => { analytics.trackChatOpened('whatsapp'); requestRental(); }}
      aria-label={tr("Réserver une voiture sur WhatsApp", "Book a car on WhatsApp", "Reservar un coche por WhatsApp")}
      title={tr("Réserver une voiture sur WhatsApp", "Book a car on WhatsApp", "Reservar un coche por WhatsApp")}
      className="flex fixed bottom-[144px] md:bottom-24 right-4 md:right-auto md:left-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-lg w-16 h-16 md:w-14 md:h-14 items-center justify-center"
    >
      <MessageCircle className="w-7 h-7" />
    </button>
  );
}
