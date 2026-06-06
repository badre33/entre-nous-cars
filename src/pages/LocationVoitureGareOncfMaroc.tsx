import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";
const LocationVoitureGareOncfMaroc = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-voiture-gare-oncf-maroc");
  if (!config) return null;
  return <LongTailPage config={config} />;
};
export default LocationVoitureGareOncfMaroc;
