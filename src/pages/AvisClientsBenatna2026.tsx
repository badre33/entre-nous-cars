import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";
const AvisClientsBenatna2026 = () => {
  const config = additionalLongTailPages.find(p => p.slug === "avis-clients-benatna-2026");
  if (!config) return null;
  return <LongTailPage config={config} />;
};
export default AvisClientsBenatna2026;
