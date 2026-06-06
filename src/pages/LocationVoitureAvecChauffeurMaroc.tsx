import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";
const LocationVoitureAvecChauffeurMaroc = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-voiture-avec-chauffeur-maroc");
  if (!config) return null;
  return <LongTailPage config={config} />;
};
export default LocationVoitureAvecChauffeurMaroc;
