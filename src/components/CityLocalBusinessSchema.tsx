interface CityLocalBusinessSchemaProps {
  cityName: string;
  latitude: string;
  longitude: string;
  address: string;
  postalCode: string;
  telephone: string;
  priceRange: string;
}

// Legacy markup is disabled: branch addresses, hours, prices and stock are not verified.
// Keep the call signature while pages migrate to their visible, confirmed content.
export const CityLocalBusinessSchema = (_props: CityLocalBusinessSchemaProps) => null;
