import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const PrixLocationVoiture2026 = () => {
  const config = additionalLongTailPages.find(p => p.slug === "prix-location-voiture-maroc-2026");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default PrixLocationVoiture2026;
