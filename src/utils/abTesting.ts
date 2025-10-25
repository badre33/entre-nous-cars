type Variant = 'A' | 'B';

interface ABTest {
  name: string;
  variant: Variant;
  enabled: boolean;
}

class ABTestingManager {
  private tests: Map<string, ABTest> = new Map();
  private readonly storageKey = 'benatna_ab_tests';

  constructor() {
    this.loadTests();
  }

  // Initialize a new A/B test
  initTest(testName: string, enabled: boolean = true): Variant {
    // Check if user already has a variant assigned
    const existingTest = this.tests.get(testName);
    if (existingTest) {
      return existingTest.variant;
    }

    // Randomly assign variant (50/50 split)
    const variant: Variant = Math.random() < 0.5 ? 'A' : 'B';

    const test: ABTest = {
      name: testName,
      variant,
      enabled,
    };

    this.tests.set(testName, test);
    this.saveTests();

    console.log(`🧪 A/B Test "${testName}" assigned variant: ${variant}`);

    return variant;
  }

  // Get variant for a test
  getVariant(testName: string): Variant | null {
    const test = this.tests.get(testName);
    return test && test.enabled ? test.variant : null;
  }

  // Check if user is in variant A
  isVariantA(testName: string): boolean {
    return this.getVariant(testName) === 'A';
  }

  // Check if user is in variant B
  isVariantB(testName: string): boolean {
    return this.getVariant(testName) === 'B';
  }

  // Enable/disable a test
  setTestEnabled(testName: string, enabled: boolean) {
    const test = this.tests.get(testName);
    if (test) {
      test.enabled = enabled;
      this.saveTests();
    }
  }

  // Get all active tests
  getActiveTests(): ABTest[] {
    return Array.from(this.tests.values()).filter(test => test.enabled);
  }

  // Clear all tests (useful for debugging)
  clearTests() {
    this.tests.clear();
    localStorage.removeItem(this.storageKey);
  }

  // Load tests from localStorage
  private loadTests() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const tests = JSON.parse(stored) as ABTest[];
        tests.forEach(test => {
          this.tests.set(test.name, test);
        });
      }
    } catch (error) {
      console.error('Error loading A/B tests:', error);
    }
  }

  // Save tests to localStorage
  private saveTests() {
    try {
      const tests = Array.from(this.tests.values());
      localStorage.setItem(this.storageKey, JSON.stringify(tests));
    } catch (error) {
      console.error('Error saving A/B tests:', error);
    }
  }
}

// Singleton instance
export const abTesting = new ABTestingManager();

// Example usage and test definitions
export const AB_TESTS = {
  HERO_CTA: 'hero_cta_variant',
  PRICING_DISPLAY: 'pricing_display',
  LOYALTY_BADGE: 'loyalty_badge_position',
  SEARCH_FORM: 'search_form_layout',
} as const;

// Hook for React components
export const useABTest = (testName: string): Variant => {
  const variant = abTesting.getVariant(testName);
  
  if (!variant) {
    return abTesting.initTest(testName);
  }
  
  return variant;
};
