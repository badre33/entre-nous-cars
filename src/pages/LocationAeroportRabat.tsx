import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationAeroportRabat = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-voiture-aeroport-rabat");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationAeroportRabat;
