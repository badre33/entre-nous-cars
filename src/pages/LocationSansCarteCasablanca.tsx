import { LongTailPage } from "@/components/LongTailPage";
import { longTailPages } from "@/data/longTailPages";

const LocationSansCarteCasablanca = () => {
  const config = longTailPages.find(p => p.slug === "location-voiture-sans-carte-credit-casablanca");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationSansCarteCasablanca;
