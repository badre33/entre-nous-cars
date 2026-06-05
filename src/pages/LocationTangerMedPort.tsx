import { LongTailPage } from "@/components/LongTailPage";
import { additionalLongTailPages } from "@/data/additionalLongTailPages";

const LocationTangerMedPort = () => {
  const config = additionalLongTailPages.find(p => p.slug === "location-voiture-tanger-med-port");
  if (!config) return null;
  return <LongTailPage config={config} />;
};

export default LocationTangerMedPort;
