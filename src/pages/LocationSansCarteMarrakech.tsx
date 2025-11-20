import { LongTailPage } from "@/components/LongTailPage";
import { longTailPages } from "@/data/longTailPages";

const LocationSansCarteMarrakech = () => {
  const config = longTailPages.find(p => p.slug === "location-voiture-sans-carte-credit-marrakech");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationSansCarteMarrakech;
