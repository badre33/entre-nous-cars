import { Helmet } from "react-helmet-async";
import { rentalVehicleSlugs } from "@/data/rentalVehicleNames";

interface Car {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  category: string;
  type: string;
  city: string;
  conditions?: string[];
}

// Compatibility name: catalogue entries describe models, not confirmed stock.
export const CarProductSchema = ({ cars }: { cars: Car[] }) => {
  const names = new Set(cars.map(car => car.name.replace(/^VW /, "Volkswagen ")));
  const approvedModels = Object.entries(rentalVehicleSlugs);
  const models = [...names].flatMap(name => {
    const model = approvedModels.find(([, approvedName]) => approvedName === name);
    return model ? [model] : [];
  });
  if (!models.length) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Modèles de location à Casablanca — disponibilité à confirmer",
    "numberOfItems": models.length,
    "itemListElement": models.map(([slug, name], index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": name,
      "url": `https://benatna.ma/vehicule/${slug}`,
    })),
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
};
