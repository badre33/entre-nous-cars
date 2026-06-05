import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationGareCasaVoyageurs = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-voiture-gare-casa-voyageurs");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationGareCasaVoyageurs;
