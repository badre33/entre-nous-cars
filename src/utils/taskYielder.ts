/**
 * Task Yielder Utility
 * Helps break up long tasks to improve First Input Delay (FID)
 * by yielding to the main thread periodically
 */

/**
 * Yields to the main thread to allow the browser to handle user input
 * Uses scheduler.yield() if available, falls back to setTimeout
 */
export const yieldToMain = (): Promise<void> => {
  // Use scheduler.yield() if available (modern browsers)
  if ('scheduler' in window && 'yield' in (window as any).scheduler) {
    return (window as any).scheduler.yield();
  }
  
  // Fallback to setTimeout with 0ms delay
  return new Promise(resolve => setTimeout(resolve, 0));
};

/**
 * Runs a task with automatic yielding after a time threshold
 * Useful for processing arrays or large data sets
 */
export const runWithYielding = async <T>(
  items: T[],
  processor: (item: T, index: number) => void,
  yieldThreshold: number = 50 // Yield every 50ms
): Promise<void> => {
  let lastYield = performance.now();
  
  for (let i = 0; i < items.length; i++) {
    processor(items[i], i);
    
    // Check if we should yield
    const now = performance.now();
    if (now - lastYield > yieldThreshold) {
      await yieldToMain();
      lastYield = performance.now();
    }
  }
};

/**
 * Wraps a function to run during idle time
 * Helps move non-critical work out of the critical path
 */
export const runWhenIdle = (
  callback: () => void,
  timeout: number = 2000
): (() => void) => {
  let id: number | null = null;
  
  if ('requestIdleCallback' in window) {
    id = requestIdleCallback(callback, { timeout });
    return () => {
      if (id !== null) cancelIdleCallback(id);
    };
  } else {
    const timerId = setTimeout(callback, Math.min(timeout, 1000));
    return () => clearTimeout(timerId);
  }
};

/**
 * Defers initialization of a module/function until the browser is idle
 * Returns a promise that resolves when the initialization is complete
 */
export const deferredInit = <T>(
  initFn: () => T | Promise<T>,
  timeout: number = 2000
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const run = async () => {
      try {
        const result = await initFn();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => run(), { timeout });
    } else {
      setTimeout(() => run(), Math.min(timeout, 1000));
    }
  });
};

/**
 * Checks if the browser is likely blocked by long tasks
 */
export const isLongTask = (duration: number): boolean => {
  return duration > 50; // Tasks over 50ms are considered "long"
};
