import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";
const EviterArnaquesLocationVoitureMaroc = () => {
  const config = additionalLongTailPages.find(p => p.slug === "eviter-arnaques-location-voiture-maroc");
  if (!config) return null;
  return <LongTailPage config={config} />;
};
export default EviterArnaquesLocationVoitureMaroc;
