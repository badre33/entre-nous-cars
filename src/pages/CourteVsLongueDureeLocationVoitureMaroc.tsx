import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";
const CourteVsLongueDureeLocationVoitureMaroc = () => {
  const config = additionalLongTailPages.find(p => p.slug === "courte-vs-longue-duree-location-voiture-maroc");
  if (!config) return null;
  return <LongTailPage config={config} />;
};
export default CourteVsLongueDureeLocationVoitureMaroc;
