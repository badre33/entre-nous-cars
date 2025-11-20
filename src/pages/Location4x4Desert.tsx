import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const Location4x4Desert = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-4x4-desert");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default Location4x4Desert;
