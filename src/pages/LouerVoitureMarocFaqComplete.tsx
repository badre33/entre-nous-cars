import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";
const LouerVoitureMarocFaqComplete = () => {
  const config = additionalLongTailPages.find(p => p.slug === "louer-voiture-maroc-faq-complete");
  if (!config) return null;
  return <LongTailPage config={config} />;
};
export default LouerVoitureMarocFaqComplete;
