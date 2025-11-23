import { NeighborhoodPage } from "@/components/NeighborhoodPage";
import { neighborhoods } from "@/data/neighborhoodsData";

const LocationVoitureMedinaMarrakech = () => {
  const neighborhood = neighborhoods.find(n => n.slug === "location-voiture-medina-marrakech");
  if (!neighborhood) return null;
  return <NeighborhoodPage neighborhood={neighborhood} />;
};

export default LocationVoitureMedinaMarrakech;
