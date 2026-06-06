import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";
const PrixEssenceGasoilMaroc2026 = () => {
  const config = additionalLongTailPages.find(p => p.slug === "prix-essence-gasoil-maroc-2026");
  if (!config) return null;
  return <LongTailPage config={config} />;
};
export default PrixEssenceGasoilMaroc2026;
