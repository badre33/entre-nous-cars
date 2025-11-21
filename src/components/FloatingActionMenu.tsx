import { MessageCircle, Phone, Mail, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BUSINESS_INFO } from "@/constants/businessInfo";
import { analytics } from "@/utils/analytics";
import { triggerHaptic } from "@/utils/haptics";
import { cn } from "@/lib/utils";

const FloatingActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Ne pas afficher sur les pages avec StickyCTA
  const hiddenRoutes = ['/louer', '/partenaires'];
  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  const actions = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366] hover:bg-[#128C7E]',
      onClick: () => {
        triggerHaptic('medium');
        const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent('Bonjour, je souhaite louer une voiture')}`;
        window.open(whatsappUrl, '_blank');
        analytics.trackEvent('fab_action', { action: 'whatsapp' });
        setIsOpen(false);
      }
    },
    {
      id: 'phone',
      label: 'Appeler',
      icon: Phone,
      color: 'bg-primary hover:bg-primary/90',
      onClick: () => {
        triggerHaptic('medium');
        window.location.href = `tel:${BUSINESS_INFO.phoneRaw}`;
        analytics.trackEvent('fab_action', { action: 'phone' });
        setIsOpen(false);
      }
    },
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      color: 'bg-secondary hover:bg-secondary/90',
      onClick: () => {
        triggerHaptic('medium');
        window.location.href = `mailto:${BUSINESS_INFO.email}`;
        analytics.trackEvent('fab_action', { action: 'email' });
        setIsOpen(false);
      }
    }
  ];

  const handleMainButtonClick = () => {
    triggerHaptic('light');
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            onClick={handleMainButtonClick}
            className={cn(
              "fixed bottom-[144px] md:bottom-24 right-4 md:right-auto md:left-6 z-50",
              "bg-primary hover:bg-primary/90 active:bg-primary/80 text-primary-foreground",
              "rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300",
              "hover:scale-110 active:scale-95 touch-target touch-feedback",
              "w-[64px] h-[64px] md:w-[56px] md:h-[56px] flex items-center justify-center",
              "group"
            )}
            aria-label="Menu d'actions"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {isOpen ? (
              <X className="w-7 h-7 md:w-6 md:h-6 transition-transform group-hover:rotate-90" />
            ) : (
              <MessageCircle className="w-7 h-7 md:w-6 md:h-6 transition-transform group-hover:scale-110" />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent 
          side="top" 
          align="end"
          className="w-auto p-2 mb-2 bg-background/95 backdrop-blur-sm border-border shadow-xl"
          sideOffset={8}
        >
          <div className="flex flex-col gap-2">
            {actions.map((action, index) => (
              <Button
                key={action.id}
                onClick={action.onClick}
                className={cn(
                  action.color,
                  "justify-start gap-3 text-white touch-target touch-feedback",
                  "transition-all duration-200 hover:scale-105 active:scale-95",
                  "animate-scale-in"
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                  WebkitTapHighlightColor: 'transparent'
                }}
                size="lg"
              >
                <action.icon className="w-5 h-5" />
                <span className="font-medium">{action.label}</span>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default FloatingActionMenu;
