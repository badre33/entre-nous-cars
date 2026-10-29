interface LocationPoint {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  telephone?: string;
  description?: string;
  openingHours?: string;
}

interface MultiLocationSchemaProps {
  locations: LocationPoint[];
}

// Legacy markup is disabled: branch addresses, hours, prices and stock are not verified.
// Keep the call signature while pages migrate to their visible, confirmed content.
export const MultiLocationSchema = (_props: MultiLocationSchemaProps) => null;
