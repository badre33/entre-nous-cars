import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationAeroportFes = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-voiture-aeroport-fes");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationAeroportFes;
