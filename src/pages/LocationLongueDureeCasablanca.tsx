import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationLongueDureeCasablanca = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-longue-duree-casablanca");
  if (!config) return null;
  return <LongTailPage config={config as any} />;
};

export default LocationLongueDureeCasablanca;
