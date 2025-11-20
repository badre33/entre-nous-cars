import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationAeroportAgadir = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-voiture-aeroport-agadir");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationAeroportAgadir;
