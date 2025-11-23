import { VehicleProductSchema } from "./schemas";
import { topVehicles } from "@/data/topVehiclesData";

interface VehicleProductSchemasProps {
  city?: string;
  limit?: number;
}

/**
 * Composant qui génère les Product Schemas pour tous les véhicules
 * Affiche les voitures dans Google Shopping et Google Images
 * Si city fournie, affiche seulement les véhicules disponibles dans cette ville
 */
export const VehicleProductSchemas = ({ city, limit }: VehicleProductSchemasProps) => {
  let vehiclesToDisplay = city 
    ? topVehicles.filter(v => v.cities.includes(city))
    : topVehicles;

  if (limit) {
    vehiclesToDisplay = vehiclesToDisplay.slice(0, limit);
  }

  return (
    <>
      {vehiclesToDisplay.map((vehicle, index) => (
        <VehicleProductSchema
          key={`${vehicle.model}-${index}`}
          vehicleName={vehicle.name}
          vehicleModel={vehicle.model}
          vehicleBrand={vehicle.brand}
          category={vehicle.category}
          description={vehicle.description}
          imageUrl={vehicle.imageUrl}
          offer={{
            price: vehicle.pricePerDay,
            priceCurrency: "MAD",
            availability: vehicle.availability,
            priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            eligibleRegion: "MA"
          }}
          features={vehicle.features}
          fuelType={vehicle.fuelType}
          transmission={vehicle.transmission}
          seats={vehicle.seats}
          aggregateRating={{
            ratingValue: vehicle.averageRating,
            reviewCount: vehicle.reviewCount
          }}
          city={city}
        />
      ))}
    </>
  );
};
