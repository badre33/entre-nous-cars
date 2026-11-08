import { MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { analytics } from '@/utils/analytics';
import { DIRECT_WHATSAPP_URL, openDirectWhatsApp } from '@/utils/rentalRequest';

// D022 (7 novembre 2026) : bouton flottant = contact WhatsApp direct, sur toutes
// les pages publiques, mobile compris. Le formulaire détaillé reste proposé par
// les boutons « Préparer ma demande ».
export default function WhatsAppButton() {
  const location = useLocation();
  if (['/louer', '/en/louer', '/es/louer', '/partenaires', '/auth', '/analytics', '/demandes'].includes(location.pathname.replace(/\/$/, '') || '/')) return null;
  return (
    <a
      href={DIRECT_WHATSAPP_URL}
      data-whatsapp-direct="floating"
      target="_blank"
      rel="noopener noreferrer"
      onClick={event => { event.preventDefault(); analytics.trackChatOpened('whatsapp'); openDirectWhatsApp(); }}
      aria-label="Écrire à Benatna sur WhatsApp"
      title="Écrire à Benatna sur WhatsApp"
      className="flex fixed bottom-[144px] md:bottom-24 right-4 md:right-auto md:left-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-lg w-16 h-16 md:w-14 md:h-14 items-center justify-center"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
