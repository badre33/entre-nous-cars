import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StickyCTAProps {
  label: string;
  onClick: () => void;
  icon?: LucideIcon;
  className?: string;
  show?: boolean;
}

export function StickyCTA({ 
  label, 
  onClick, 
  icon: Icon, 
  className,
  show = true 
}: StickyCTAProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-20 md:hidden left-0 right-0 z-30">
      <div className="bg-gradient-to-t from-background via-background to-transparent pt-4 pb-4 px-4">
        <Button
          onClick={onClick}
          size="lg"
          className={cn(
            "w-full shadow-2xl hover:shadow-primary/50 transition-all duration-300",
            "hover:scale-105 min-h-[56px] text-base font-semibold touch-target touch-feedback",
            "animate-scale-in",
            className
          )}
        >
          {Icon && <Icon className="mr-2 h-5 w-5" />}
          {label}
        </Button>
      </div>
    </div>
  );
}
