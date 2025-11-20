import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationLuxeEvenement = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-voiture-luxe-evenement");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationLuxeEvenement;
