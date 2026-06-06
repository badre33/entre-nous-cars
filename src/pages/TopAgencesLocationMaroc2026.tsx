import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";
const TopAgencesLocationMaroc2026 = () => {
  const config = additionalLongTailPages.find(p => p.slug === "top-agences-location-voiture-maroc-2026");
  if (!config) return null;
  return <LongTailPage config={config} />;
};
export default TopAgencesLocationMaroc2026;
