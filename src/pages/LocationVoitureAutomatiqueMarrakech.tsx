import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";
const LocationVoitureAutomatiqueMarrakech = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-voiture-automatique-marrakech");
  if (!config) return null;
  return <LongTailPage config={config} />;
};
export default LocationVoitureAutomatiqueMarrakech;
