import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationUtilitaireCasablanca = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-utilitaire-demenagement-casablanca");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationUtilitaireCasablanca;
