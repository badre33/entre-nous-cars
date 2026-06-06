import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";
const PermisEtrangerDouaneMRE = () => {
  const config = additionalLongTailPages.find(p => p.slug === "permis-etranger-douane-mre-location-voiture");
  if (!config) return null;
  return <LongTailPage config={config} />;
};
export default PermisEtrangerDouaneMRE;
