import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationGareMarrakech = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-voiture-gare-marrakech");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationGareMarrakech;
