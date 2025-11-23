import { NeighborhoodPage } from "@/components/NeighborhoodPage";
import { neighborhoods } from "@/data/neighborhoodsData";

const LocationVoitureMaarifCasablanca = () => {
  const neighborhood = neighborhoods.find(n => n.slug === "location-voiture-maarif-casablanca");
  if (!neighborhood) return null;
  return <NeighborhoodPage neighborhood={neighborhood} />;
};

export default LocationVoitureMaarifCasablanca;
