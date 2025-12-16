import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface MobileStickyCTAProps {
  onWhatsAppClick: () => void;
}

const MobileStickyCTA = ({ onWhatsAppClick }: MobileStickyCTAProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t md:hidden z-50">
      <Button 
        onClick={onWhatsAppClick}
        className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3 h-auto rounded-full font-semibold"
      >
        <MessageCircle className="w-5 h-5 mr-2" />
        Réserver sur WhatsApp
      </Button>
    </div>
  );
};

export default MobileStickyCTA;
