import { NeighborhoodPage } from "@/components/NeighborhoodPage";
import { neighborhoods } from "@/data/neighborhoodsData";

const LocationVoitureSidiMaaroufCasablanca = () => {
  const neighborhood = neighborhoods.find(n => n.slug === "location-voiture-sidi-maarouf-casablanca");
  if (!neighborhood) return null;
  return <NeighborhoodPage neighborhood={neighborhood} />;
};

export default LocationVoitureSidiMaaroufCasablanca;
