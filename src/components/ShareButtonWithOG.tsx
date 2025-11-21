import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check, Facebook, Twitter, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ShareButtonWithOGProps {
  carName: string;
  city: string;
  price: string;
  url: string;
  className?: string;
}

/**
 * Bouton de partage amélioré avec preview OG
 * Permet de partager directement sur les réseaux sociaux
 */
export const ShareButtonWithOG = ({
  carName,
  city,
  price,
  url,
  className
}: ShareButtonWithOGProps) => {
  const [copied, setCopied] = useState(false);

  const shareText = `Découvrez cette ${carName} à louer à ${city} pour seulement ${price}/jour !`;

  const handleShare = async (platform?: string) => {
    const fullUrl = window.location.origin + url;

    if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
        "_blank"
      );
      return;
    }

    if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(shareText)}`,
        "_blank"
      );
      return;
    }

    if (platform === "whatsapp") {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(shareText + " " + fullUrl)}`,
        "_blank"
      );
      return;
    }

    // Copier le lien
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast({
        title: "Lien copié !",
        description: "Le lien a été copié dans le presse-papier",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("gap-2", className)}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copié !
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              Partager
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => handleShare("facebook")}>
          <Facebook className="w-4 h-4 mr-2" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("twitter")}>
          <Twitter className="w-4 h-4 mr-2" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("whatsapp")}>
          <MessageCircle className="w-4 h-4 mr-2" />
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare()}>
          <Share2 className="w-4 h-4 mr-2" />
          Copier le lien
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
