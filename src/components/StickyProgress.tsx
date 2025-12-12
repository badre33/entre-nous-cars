import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Section {
  id: string;
  title: string;
}

interface StickyProgressProps {
  sections: Section[];
  className?: string;
}

export function StickyProgress({ sections, className }: StickyProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;
    let ticking = false;
    
    // Cache section elements to avoid repeated DOM queries
    const sectionElementsMap = new Map<string, HTMLElement>();
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) sectionElementsMap.set(s.id, el);
    });

    const processScroll = () => {
      // Batch all DOM reads together first to avoid layout thrashing
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Collect all rects in a single pass before any state updates
      const sectionRects: Array<{ id: string; top: number }> = [];
      sectionElementsMap.forEach((element, id) => {
        sectionRects.push({ id, top: element.getBoundingClientRect().top });
      });
      
      // Now perform state updates (writes) - these don't cause reflows
      const progress = (scrolled / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
      setIsVisible(scrolled > 200);
      
      // Find active section from cached rects
      for (let i = sectionRects.length - 1; i >= 0; i--) {
        if (sectionRects[i].top <= 150) {
          setActiveSection(sectionRects[i].id);
          break;
        }
      }
      
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(processScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Defer initial call to avoid blocking render
    rafId = requestAnimationFrame(processScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset for sticky header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  const activeSectionTitle = sections.find(s => s.id === activeSection)?.title || sections[0]?.title;

  if (!isVisible || sections.length === 0) return null;

  return (
    <div 
      className={cn(
        "sticky top-16 z-20 bg-background/95 backdrop-blur-sm border-b border-border",
        "animate-fade-in",
        className
      )}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="container px-4 py-2 md:py-3">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          {/* Current section indicator - optimisé mobile */}
          <div className="flex items-center gap-1 md:gap-2 min-w-0 flex-1">
            <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
              Vous êtes ici:
            </span>
            <span className="text-xs md:text-sm font-medium truncate">
              {activeSectionTitle}
            </span>
          </div>

          {/* Section navigation dropdown - touch optimized */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="gap-1 md:gap-2 whitespace-nowrap text-xs md:text-sm min-h-[44px] md:min-h-[36px] px-3 md:px-4 touch-target"
              >
                <span className="hidden sm:inline">Navigation</span>
                <span className="sm:hidden">Menu</span>
                <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[280px] md:w-64 max-h-[70vh] overflow-y-auto">
              {sections.map((section) => (
                <DropdownMenuItem
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "cursor-pointer min-h-[44px] text-sm",
                    activeSection === section.id && "bg-accent font-medium"
                  )}
                >
                  {section.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
