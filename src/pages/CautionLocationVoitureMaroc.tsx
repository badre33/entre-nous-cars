import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";
const CautionLocationVoitureMaroc = () => {
  const config = additionalLongTailPages.find(p => p.slug === "caution-location-voiture-maroc");
  if (!config) return null;
  return <LongTailPage config={config} />;
};
export default CautionLocationVoitureMaroc;
