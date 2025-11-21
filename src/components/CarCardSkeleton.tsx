import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CarCardSkeletonProps {
  viewMode: 'carousel' | 'grid' | 'list';
}

export const CarCardSkeleton = ({ viewMode }: CarCardSkeletonProps) => {
  // Vue Liste (compacte, horizontale)
  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden border mb-3">
        <CardContent className="p-3">
          <div className="flex gap-3">
            <Skeleton className="w-24 h-24 flex-shrink-0 rounded-lg" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex-1 min-w-0 pr-2">
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <div className="text-right flex-shrink-0">
                  <Skeleton className="h-5 w-16 mb-1" />
                  <Skeleton className="h-3 w-8" />
                </div>
              </div>
              <Skeleton className="h-3 w-20 mb-2" />
              <div className="flex gap-1.5">
                <Skeleton className="h-7 flex-1" />
                <Skeleton className="h-7 flex-1" />
                <Skeleton className="h-7 w-7" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Vue Grille (2 colonnes, compact)
  if (viewMode === 'grid') {
    return (
      <Card className="overflow-hidden border h-full">
        <Skeleton className="h-32 w-full" />
        <CardContent className="p-3">
          <div className="mb-2">
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="flex items-center justify-between mb-2">
            <Skeleton className="h-3 w-16" />
            <div className="text-right">
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Vue Carrousel (par défaut, carte complète)
  return (
    <Card className="overflow-hidden border h-full">
      <Skeleton className="h-48 w-full" />
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 pr-2">
            <Skeleton className="h-5 w-full mb-1" />
            <Skeleton className="h-3 w-32" />
          </div>
          <div className="text-right flex-shrink-0">
            <Skeleton className="h-6 w-20 mb-1" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        
        <Skeleton className="h-3 w-24 mb-3" />
        
        <div className="space-y-2 mb-4">
          <Skeleton className="h-9 w-full rounded-full" />
          <Skeleton className="h-9 w-full rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};
