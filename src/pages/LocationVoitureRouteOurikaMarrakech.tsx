import { NeighborhoodPage } from "@/components/NeighborhoodPage";
import { neighborhoods } from "@/data/neighborhoodsData";

const LocationVoitureRouteOurikaMarrakech = () => {
  const neighborhood = neighborhoods.find(n => n.slug === "location-voiture-route-ourika-marrakech");
  if (!neighborhood) return null;
  return <NeighborhoodPage neighborhood={neighborhood} />;
};

export default LocationVoitureRouteOurikaMarrakech;
