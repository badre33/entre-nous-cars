import { NeighborhoodPage } from "@/components/NeighborhoodPage";
import { neighborhoods } from "@/data/neighborhoodsData";

const LocationVoitureAnfaCasablanca = () => {
  const neighborhood = neighborhoods.find(n => n.slug === "location-voiture-anfa-casablanca");
  if (!neighborhood) return null;
  return <NeighborhoodPage neighborhood={neighborhood} />;
};

export default LocationVoitureAnfaCasablanca;
