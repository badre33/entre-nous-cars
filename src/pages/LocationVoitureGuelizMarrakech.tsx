import { NeighborhoodPage } from "@/components/NeighborhoodPage";
import { neighborhoods } from "@/data/neighborhoodsData";

const LocationVoitureGuelizMarrakech = () => {
  const neighborhood = neighborhoods.find(n => n.slug === "location-voiture-gueliz-marrakech");
  if (!neighborhood) return null;
  return <NeighborhoodPage neighborhood={neighborhood} />;
};

export default LocationVoitureGuelizMarrakech;
