import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationMREMaroc = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-voiture-mre-maroc");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationMREMaroc;
