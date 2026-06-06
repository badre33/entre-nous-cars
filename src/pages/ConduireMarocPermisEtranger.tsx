import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";
const ConduireMarocPermisEtranger = () => {
  const config = additionalLongTailPages.find(p => p.slug === "conduire-maroc-permis-etranger");
  if (!config) return null;
  return <LongTailPage config={config} />;
};
export default ConduireMarocPermisEtranger;
