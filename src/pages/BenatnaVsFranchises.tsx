import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";
const BenatnaVsFranchises = () => {
  const config = additionalLongTailPages.find(p => p.slug === "benatna-vs-avis-hertz-europcar-sixt");
  if (!config) return null;
  return <LongTailPage config={config} />;
};
export default BenatnaVsFranchises;
