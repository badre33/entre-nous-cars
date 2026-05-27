import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationEte2026 = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-voiture-ete-2026-maroc");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationEte2026;
