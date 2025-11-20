import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationJeuneConducteurCasablanca = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-jeune-conducteur-casablanca");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationJeuneConducteurCasablanca;
