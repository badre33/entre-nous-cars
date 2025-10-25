import { Car } from "lucide-react";

const LoadingCar = () => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative">
        <div className="flex items-center gap-4">
          <Car className="w-12 h-12 text-primary animate-car-drive" />
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
        <p className="text-center mt-4 text-sm text-muted-foreground">En route...</p>
      </div>
    </div>
  );
};

export default LoadingCar;
