import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";
const PeagesAutorouteMaroc2026 = () => {
  const config = additionalLongTailPages.find(p => p.slug === "peages-autoroute-maroc-tarifs-2026");
  if (!config) return null;
  return <LongTailPage config={config} />;
};
export default PeagesAutorouteMaroc2026;
