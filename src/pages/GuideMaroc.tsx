import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";
const GuideMaroc = () => {
  const config = additionalLongTailPages.find(p => p.slug === "guide-maroc");
  if (!config) return null;
  return <LongTailPage config={config} />;
};
export default GuideMaroc;
