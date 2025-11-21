import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Car, Filter } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSwipeToClose } from "@/hooks/useSwipeToClose";
import { cn } from "@/lib/utils";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBottomSheetProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  options: FilterOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  triggerLabel: string;
}

export function FilterBottomSheet({
  title,
  description,
  icon = <Filter className="w-4 h-4" />,
  options,
  selectedValue,
  onValueChange,
  triggerLabel,
}: FilterBottomSheetProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const { dragOffset, isDragging, handlers } = useSwipeToClose({
    onClose: () => setIsOpen(false),
    threshold: 100,
  });

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-start text-left bg-secondary/20 border-0 touch-target touch-feedback min-h-[48px]"
        >
          {icon}
          <span className="ml-2">{triggerLabel}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent 
        {...handlers}
        className={cn(isDragging && "transition-none")}
        style={{ transform: `translateY(${dragOffset}px)` }}
      >
        <div className="w-12 h-1 bg-muted rounded-full mx-auto mt-2 mb-4" />
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="max-h-[60vh] px-4">
          <RadioGroup value={selectedValue} onValueChange={onValueChange} className="space-y-3 pb-4">
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 touch-target">
                <RadioGroupItem value={option.value} id={option.value} className="h-5 w-5" />
                <Label 
                  htmlFor={option.value} 
                  className="text-base font-medium cursor-pointer flex-1 py-3"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </ScrollArea>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button className="w-full touch-target min-h-[48px]">
              {t('common.apply') || 'Appliquer'}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
