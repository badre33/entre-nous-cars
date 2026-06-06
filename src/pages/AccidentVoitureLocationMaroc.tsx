import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";
const AccidentVoitureLocationMaroc = () => {
  const config = additionalLongTailPages.find(p => p.slug === "accident-voiture-location-maroc-que-faire");
  if (!config) return null;
  return <LongTailPage config={config} />;
};
export default AccidentVoitureLocationMaroc;
