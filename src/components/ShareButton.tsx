import { Share2, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
  className?: string;
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

export const ShareButton = ({ 
  title, 
  text, 
  url = window.location.href,
  className,
  variant = "outline",
  size = "sm"
}: ShareButtonProps) => {
  const { toast } = useToast();

  const handleNativeShare = async () => {
    // Check if Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        toast({
          title: "Partagé avec succès",
          description: "Le contenu a été partagé",
        });
      } catch (error) {
        // User cancelled or error occurred
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${title}\n${text}\n${url}`);
        toast({
          title: "Lien copié",
          description: "Le lien a été copié dans le presse-papier",
        });
      } catch (error) {
        console.error('Error copying:', error);
      }
    }
  };

  const shareViaWhatsApp = () => {
    const message = encodeURIComponent(`${title}\n\n${text}\n\n${url}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${text}\n\n${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const shareViaSMS = () => {
    const message = encodeURIComponent(`${title}\n${text}\n${url}`);
    window.location.href = `sms:?body=${message}`;
  };

  // If Web Share API is available on mobile, use it directly
  if (navigator.share && /mobile/i.test(navigator.userAgent)) {
    return (
      <Button
        variant={variant}
        size={size}
        onClick={handleNativeShare}
        className={cn("touch-target touch-feedback", className)}
        aria-label="Partager"
      >
        <Share2 className="h-4 w-4" />
        <span className="ml-2">Partager</span>
      </Button>
    );
  }

  // Desktop or no native share: show dropdown menu
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn("touch-target touch-feedback", className)}
          aria-label="Partager"
        >
          <Share2 className="h-4 w-4" />
          <span className="ml-2">Partager</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={shareViaWhatsApp} className="cursor-pointer touch-target">
          <MessageCircle className="h-4 w-4 mr-2 text-green-600" />
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareViaSMS} className="cursor-pointer touch-target">
          <MessageCircle className="h-4 w-4 mr-2 text-blue-600" />
          SMS
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareViaEmail} className="cursor-pointer touch-target">
          <Mail className="h-4 w-4 mr-2 text-gray-600" />
          Email
        </DropdownMenuItem>
        {navigator.share && (
          <DropdownMenuItem onClick={handleNativeShare} className="cursor-pointer touch-target">
            <Share2 className="h-4 w-4 mr-2" />
            Plus d'options...
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
