import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";
const AgeMinimumLocationVoitureMaroc = () => {
  const config = additionalLongTailPages.find(p => p.slug === "age-minimum-location-voiture-maroc");
  if (!config) return null;
  return <LongTailPage config={config} />;
};
export default AgeMinimumLocationVoitureMaroc;
