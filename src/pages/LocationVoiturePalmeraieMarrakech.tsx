import { NeighborhoodPage } from "@/components/NeighborhoodPage";
import { neighborhoods } from "@/data/neighborhoodsData";

const LocationVoiturePalmeraieMarrakech = () => {
  const neighborhood = neighborhoods.find(n => n.slug === "location-voiture-palmeraie-marrakech");
  if (!neighborhood) return null;
  return <NeighborhoodPage neighborhood={neighborhood} />;
};

export default LocationVoiturePalmeraieMarrakech;
