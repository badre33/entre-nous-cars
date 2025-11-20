import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationSUVSudMaroc = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-suv-sud-maroc");
  if (!config) return null;
  return <LongTailPage config={config as any} />;
};

export default LocationSUVSudMaroc;
