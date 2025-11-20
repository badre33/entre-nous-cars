import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationWeekendMarrakech = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-weekend-marrakech");
  if (!config) return null;
  return <LongTailPage config={config as any} />;
};

export default LocationWeekendMarrakech;
