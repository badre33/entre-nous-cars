import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationCabrioletAgadir = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-cabriolet-agadir");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationCabrioletAgadir;
