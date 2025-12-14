import { useEffect, useState } from "react";

export const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  if (progress < 5) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted/50">
      <div 
        className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
