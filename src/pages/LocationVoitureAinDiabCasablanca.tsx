import { NeighborhoodPage } from "@/components/NeighborhoodPage";
import { neighborhoods } from "@/data/neighborhoodsData";

const LocationVoitureAinDiabCasablanca = () => {
  const neighborhood = neighborhoods.find(n => n.slug === "location-voiture-ain-diab-casablanca");
  if (!neighborhood) return null;
  return <NeighborhoodPage neighborhood={neighborhood} />;
};

export default LocationVoitureAinDiabCasablanca;
