import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationJeuneConducteurMarrakech = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-jeune-conducteur-marrakech");
  if (!config) return null;
  return <LongTailPage config={config as any} />;
};

export default LocationJeuneConducteurMarrakech;
