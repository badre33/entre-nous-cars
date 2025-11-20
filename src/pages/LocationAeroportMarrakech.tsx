import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationAeroportMarrakech = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-voiture-aeroport-marrakech");
  if (!config) return null;
  return <LongTailPage config={config as any} />;
};

export default LocationAeroportMarrakech;
