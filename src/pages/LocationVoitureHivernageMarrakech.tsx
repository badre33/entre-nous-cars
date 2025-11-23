import { NeighborhoodPage } from "@/components/NeighborhoodPage";
import { neighborhoods } from "@/data/neighborhoodsData";

const LocationVoitureHivernageMarrakech = () => {
  const neighborhood = neighborhoods.find(n => n.slug === "location-voiture-hivernage-marrakech");
  if (!neighborhood) return null;
  return <NeighborhoodPage neighborhood={neighborhood} />;
};

export default LocationVoitureHivernageMarrakech;
