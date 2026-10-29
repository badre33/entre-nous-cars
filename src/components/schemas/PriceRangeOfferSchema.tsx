interface PriceRangeOfferSchemaProps {
  minPrice: string;
  maxPrice: string;
  city?: string;
  currency?: string;
  validFrom?: string;
  validThrough?: string;
  discount?: {
    percentage: number;
    minDays: number;
  };
}

// Legacy markup is disabled: branch addresses, hours, prices and stock are not verified.
// Keep the call signature while pages migrate to their visible, confirmed content.
export const PriceRangeOfferSchema = (_props: PriceRangeOfferSchemaProps) => null;
