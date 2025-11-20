import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationMariageMaroc = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-voiture-mariage-maroc");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationMariageMaroc;
