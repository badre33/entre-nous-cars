import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationElectriqueCasablanca = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-voiture-electrique-casablanca");
  if (!config) return null;
  return <LongTailPage config={config as any} />;
};

export default LocationElectriqueCasablanca;
