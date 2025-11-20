import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationSUVAtlas = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-suv-atlas");
  if (!config) return null;
  return <LongTailPage config={config as any} />;
};

export default LocationSUVAtlas;
