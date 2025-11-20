import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationJeuneConducteurRabat = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-jeune-conducteur-rabat");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationJeuneConducteurRabat;
