import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";
const EssenceOuDieselLocationVoitureMaroc = () => {
  const config = additionalLongTailPages.find(p => p.slug === "essence-ou-diesel-location-voiture-maroc");
  if (!config) return null;
  return <LongTailPage config={config} />;
};
export default EssenceOuDieselLocationVoitureMaroc;
