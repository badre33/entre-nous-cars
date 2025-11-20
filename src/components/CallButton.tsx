import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { BUSINESS_INFO } from "@/constants/businessInfo";

interface CallButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children?: React.ReactNode;
}

/**
 * Bouton d'appel standardisé utilisant les informations NAP centralisées
 * Garantit la cohérence du numéro de téléphone partout sur le site (crucial pour le SEO local)
 */
export const CallButton = ({ 
  variant = "outline", 
  size = "lg",
  className = "",
  children = "Appeler"
}: CallButtonProps) => {
  return (
    <a href={`tel:${BUSINESS_INFO.phoneRaw}`}>
      <Button 
        variant={variant}
        size={size} 
        className={className}
      >
        <Phone className="mr-2 h-5 w-5" />
        {children}
      </Button>
    </a>
  );
};
