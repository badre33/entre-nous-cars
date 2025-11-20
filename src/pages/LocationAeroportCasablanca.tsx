import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationAeroportCasablanca = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-voiture-aeroport-casablanca");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationAeroportCasablanca;
