import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, inputMode, ...props }, ref) => {
    // Determine optimal inputMode based on type if not explicitly provided
    const getInputMode = (): React.HTMLAttributes<HTMLInputElement>['inputMode'] => {
      if (inputMode) return inputMode;
      switch (type) {
        case 'email': return 'email';
        case 'tel': return 'tel';
        case 'url': return 'url';
        case 'number': return 'numeric';
        case 'search': return 'search';
        default: return 'text';
      }
    };

    return (
      <input
        type={type}
        inputMode={getInputMode()}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-colors duration-150",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
