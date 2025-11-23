import { NeighborhoodPage } from "@/components/NeighborhoodPage";
import { neighborhoods } from "@/data/neighborhoodsData";

const LocationVoitureHassanCasablanca = () => {
  const neighborhood = neighborhoods.find(n => n.slug === "location-voiture-hassan-casablanca");
  if (!neighborhood) return null;
  return <NeighborhoodPage neighborhood={neighborhood} />;
};

export default LocationVoitureHassanCasablanca;
