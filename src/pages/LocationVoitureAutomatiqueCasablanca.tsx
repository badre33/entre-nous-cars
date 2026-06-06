import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";
const LocationVoitureAutomatiqueCasablanca = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-voiture-automatique-casablanca");
  if (!config) return null;
  return <LongTailPage config={config} />;
};
export default LocationVoitureAutomatiqueCasablanca;
