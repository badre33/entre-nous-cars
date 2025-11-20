import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationVanFamilleMaroc = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-van-famille-maroc");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationVanFamilleMaroc;
