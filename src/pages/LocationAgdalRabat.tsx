import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationAgdalRabat = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-voiture-agdal-rabat");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationAgdalRabat;
