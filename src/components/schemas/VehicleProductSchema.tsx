interface VehicleOffer {
  price: string;
  priceCurrency?: string;
  availability?: string;
  priceValidUntil?: string;
  eligibleRegion?: string;
}

interface VehicleProductSchemaProps {
  vehicleName: string;
  vehicleModel: string;
  vehicleBrand: string;
  category: string;
  description: string;
  imageUrl: string;
  offer: VehicleOffer;
  features?: string[];
  fuelType?: string;
  transmission?: string;
  seats?: number;
  sku?: string;
  city?: string;
}

// Legacy markup is disabled: branch addresses, hours, prices and stock are not verified.
// Keep the call signature while pages migrate to their visible, confirmed content.
export const VehicleProductSchema = (_props: VehicleProductSchemaProps) => null;
