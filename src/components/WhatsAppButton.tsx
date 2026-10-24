import { MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { analytics } from '@/utils/analytics';
import { requestRental } from '@/utils/rentalRequest';
export default function WhatsAppButton() {
  const location = useLocation();
  if (['/louer', '/partenaires', '/auth', '/analytics', '/demandes'].includes(location.pathname)) return null;
  return <button onClick={() => { analytics.trackChatOpened('whatsapp'); requestRental(); }} aria-label="Préparer une demande de location" className={`${location.pathname === "/" ? "hidden md:flex" : "flex"} fixed bottom-[144px] md:bottom-24 right-4 md:right-auto md:left-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-lg w-16 h-16 md:w-14 md:h-14 items-center justify-center`}><MessageCircle className="w-7 h-7" /></button>;
}
