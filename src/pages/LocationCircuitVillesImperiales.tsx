import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationCircuitVillesImperiales = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-voiture-circuit-villes-imperiales");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationCircuitVillesImperiales;
