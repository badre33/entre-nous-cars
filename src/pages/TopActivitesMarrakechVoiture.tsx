import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";
const TopActivitesMarrakechVoiture = () => {
  const config = additionalLongTailPages.find(p => p.slug === "top-activites-marrakech-en-voiture");
  if (!config) return null;
  return <LongTailPage config={config} />;
};
export default TopActivitesMarrakechVoiture;
