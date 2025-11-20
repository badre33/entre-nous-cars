import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationLongueDureeMarrakech = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-longue-duree-marrakech");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationLongueDureeMarrakech;
