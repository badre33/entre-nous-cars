import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationAeroportTanger = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-voiture-aeroport-tanger");
  if (!config) return null;
  return <LongTailPage config={config as any} />;
};

export default LocationAeroportTanger;
