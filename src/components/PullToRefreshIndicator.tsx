import { Loader2, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PullToRefreshIndicatorProps {
  isPulling: boolean;
  isRefreshing: boolean;
  pullDistance: number;
  pullPercentage: number;
}

export const PullToRefreshIndicator = ({
  isPulling,
  isRefreshing,
  pullDistance,
  pullPercentage,
}: PullToRefreshIndicatorProps) => {
  if (!isPulling && !isRefreshing) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm border-b will-change-transform"
      style={{
        height: isRefreshing ? '60px' : `${Math.min(pullDistance, 60)}px`,
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
    >
      <div className="flex flex-col items-center gap-2">
        {isRefreshing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <p className="text-xs text-muted-foreground">Actualisation...</p>
          </>
        ) : (
          <>
            <div
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                pullPercentage >= 100 && "rotate-180"
              )}
            >
              <ArrowDown
                className="h-full w-full text-primary"
                style={{
                  opacity: Math.min(1, pullPercentage / 100),
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {pullPercentage >= 100 ? 'Relâcher pour actualiser' : 'Tirer pour actualiser'}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
