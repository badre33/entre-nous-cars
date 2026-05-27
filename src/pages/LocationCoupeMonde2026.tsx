import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationCoupeMonde2026 = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-voiture-coupe-monde-2026-maroc");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationCoupeMonde2026;
