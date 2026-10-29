interface OpeningHoursSchemaProps {
  entityName?: string;
  entityType?: "Organization" | "LocalBusiness" | "CarRental";
  city?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
}

// Legacy markup is disabled: branch addresses, hours, prices and stock are not verified.
// Keep the call signature while pages migrate to their visible, confirmed content.
export const OpeningHoursSchema = (_props: OpeningHoursSchemaProps) => null;
