import { requestRental } from '@/utils/rentalRequest';
import { isClassicTourismCar, isPremiumTourismCar } from "@/utils/cataloguePolicy";
import { pickupPoints } from "@/data/pickupPoints";
import { isValidRentalPeriod, RENTAL_PERIOD_MESSAGE } from "@/utils/rentalPeriod";
import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { rentalVehicleSlugs } from "@/data/rentalVehicleNames";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarIcon, MapPin, Car, CalendarCheck, LayoutGrid, List, Rows3, MessageCircle } from "lucide-react";
import { useComparison } from "@/contexts/ComparisonContext";
import ComparisonButton from "@/components/ComparisonButton";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import { SocialProofNotification } from "@/components/SocialProofNotification";
// import { RecentBookingAlert } from "@/components/RecentBookingAlert";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import LazyCarImage from "@/components/LazyCarImage";
import { StructuredData } from "@/components/StructuredData";
import { CarProductSchema } from "@/components/CarProductSchema";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import { HreflangTags } from "@/utils/hreflangHelper";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIntelligentPreloader } from "@/hooks/useIntelligentPreloader";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";
import { PullToRefreshIndicator } from "@/components/PullToRefreshIndicator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { toast } from "@/hooks/use-toast";
import { ShareButton } from "@/components/ShareButton";
import { FilterBottomSheet } from "@/components/FilterBottomSheet";
import { StickyCTA } from "@/components/StickyCTA";
import { useIsMobile } from "@/hooks/use-mobile";
import SwipeableCarCard from "@/components/SwipeableCarCard";
import CarPreviewDialog from "@/components/CarPreviewDialog";
import heroImage from "@/assets/hero-rent.jpg";
const carClio = "/vehicles/benatna/renault-clio.webp";
import carCorolla from "@/assets/car-corolla.jpg";
const carDuster = "/vehicles/benatna/dacia-duster.webp";
const carPeugeot208 = "/vehicles/benatna/peugeot-208.webp";
const carVwGolf = "/vehicles/benatna/volkswagen-golf.webp";
const carHyundaiTucson = "/vehicles/benatna/hyundai-tucson.webp";
const carKiaSportage = "/vehicles/benatna/kia-sportage.webp";
const carMercedesC = "/vehicles/benatna/mercedes-classe-c.webp";
import carAudiA4 from "@/assets/car-audi-a4.jpg";
import carBmwX3 from "@/assets/car-bmw-x3.jpg";
import carCitroenC3 from "@/assets/car-citroen-c3.jpg";
import carFordFocus from "@/assets/car-ford-focus.jpg";
import carNissanQashqai from "@/assets/car-nissan-qashqai.jpg";
const carSeatIbiza = "/vehicles/benatna/seat-ibiza.webp";
import carFiatTipo from "@/assets/car-fiat-tipo.jpg";
const carOpelCorsa = "/vehicles/benatna/opel-corsa.webp";
import carOpelAstra from "@/assets/car-opel-astra.jpg";
import carSkodaOctavia from "@/assets/car-skoda-octavia.jpg";
import carSkodaFabia from "@/assets/car-skoda-fabia.jpg";
import carMazda3 from "@/assets/car-mazda-3.jpg";
import carMazdaCX5 from "@/assets/car-mazda-cx5.jpg";
import carHondaCivic from "@/assets/car-honda-civic.jpg";
import carHondaCRV from "@/assets/car-honda-crv.jpg";
import carSuzukiSwift from "@/assets/car-suzuki-swift.jpg";
import carSuzukiVitara from "@/assets/car-suzuki-vitara.jpg";
import carMitsubishiLancer from "@/assets/car-mitsubishi-lancer.jpg";
import carMitsubishiOutlander from "@/assets/car-mitsubishi-outlander.jpg";
import carChevroletAveo from "@/assets/car-chevrolet-aveo.jpg";
import carChevroletCaptiva from "@/assets/car-chevrolet-captiva.jpg";
import carRenaultMegane from "@/assets/car-renault-megane.jpg";
import carRenaultCaptur from "@/assets/car-renault-captur.jpg";
import carPeugeot3008 from "@/assets/car-peugeot-3008.jpg";
import carPeugeot308 from "@/assets/car-peugeot-308.jpg";
const carDaciaSandero = "/vehicles/benatna/dacia-sandero.webp";
const carDaciaLogan = "/vehicles/benatna/dacia-logan.webp";
import carVwTiguan from "@/assets/car-vw-tiguan.jpg";
import carVwPolo from "@/assets/car-vw-polo.jpg";
const carHyundaiI20 = "/vehicles/benatna/hyundai-i20.webp";
const carVwTRoc = "/vehicles/benatna/volkswagen-troc.webp";
import carHyundaiSantaFe from "@/assets/car-hyundai-santa-fe.jpg";
import carHyundaiElantra from "@/assets/car-hyundai-elantra.jpg";
import carKiaPicanto from "@/assets/car-kia-picanto.jpg";
import carKiaRio from "@/assets/car-kia-rio.jpg";
import carNissanMicra from "@/assets/car-nissan-micra.jpg";
import carNissanSunny from "@/assets/car-nissan-sunny.jpg";
import carToyotaYaris from "@/assets/car-toyota-yaris.jpg";
import carToyotaRAV4 from "@/assets/car-toyota-rav4.jpg";
import carPeugeot2008 from "@/assets/car-peugeot-2008.jpg";
import carClioWhite from "@/assets/car-clio-white.jpg";
import carDusterGray from "@/assets/car-duster-gray.jpg";
const carVwTroc = "/vehicles/benatna/volkswagen-troc.webp";
import carPeugeot208Red from "@/assets/car-peugeot-208-red.jpg";
const carSanderoStepway = "/vehicles/benatna/dacia-stepway.webp";
import carCapturOrange from "@/assets/car-captur-orange.jpg";
import carCorollaSilver from "@/assets/car-corolla-silver.jpg";
import carHyundaiKona from "@/assets/car-hyundai-kona.jpg";
import carNissanJuke from "@/assets/car-nissan-juke.jpg";
import carFordFiesta from "@/assets/car-ford-fiesta.jpg";
import carKiaCeed from "@/assets/car-kia-ceed.jpg";
import carVwPassat from "@/assets/car-vw-passat.jpg";
import carOpelInsignia from "@/assets/car-opel-insignia.jpg";
import carCitroenC4Cactus from "@/assets/car-citroen-c4-cactus.jpg";
import carSeatLeon from "@/assets/car-seat-leon.jpg";
import carSeatArona from "@/assets/car-seat-arona.jpg";
import carFordKuga from "@/assets/car-ford-kuga.jpg";
import carFiat500 from "@/assets/car-fiat-500.jpg";
import carFiatPanda from "@/assets/car-fiat-panda.jpg";
import carCitroenC3Aircross from "@/assets/car-citroen-c3-aircross.jpg";
import carRenaultTwingo from "@/assets/car-renault-twingo.jpg";
import carToyotaAuris from "@/assets/car-toyota-auris.jpg";
import carHondaJazz from "@/assets/car-honda-jazz.jpg";
import carMazdaCX3 from "@/assets/car-mazda-cx3.jpg";
import carSkodaKamiq from "@/assets/car-skoda-kamiq.jpg";
const carHyundaiAccent = "/vehicles/benatna/hyundai-accent.webp";
import carKiaStonic from "@/assets/car-kia-stonic.jpg";
import carOpelMokka from "@/assets/car-opel-mokka.jpg";
import carNissanNote from "@/assets/car-nissan-note.jpg";
import carBmw3 from "@/assets/car-bmw-3.jpg";
import carBmw5 from "@/assets/car-bmw-5.jpg";
import carBmwX1 from "@/assets/car-bmw-x1.jpg";
import carBmwX5 from "@/assets/car-bmw-x5.jpg";
import carBmw1 from "@/assets/car-bmw-1.jpg";
import carBmwX2 from "@/assets/car-bmw-x2.jpg";
const carAudiA3 = "/vehicles/benatna/audi-a3.webp";
import carAudiA6 from "@/assets/car-audi-a6.jpg";
import carAudiQ3 from "@/assets/car-audi-q3.jpg";
import carAudiQ5 from "@/assets/car-audi-q5.jpg";
import carAudiQ7 from "@/assets/car-audi-q7.jpg";
import carAudiA1 from "@/assets/car-audi-a1.jpg";
const carMercedesA = "/vehicles/benatna/mercedes-classe-a.webp";
import carMercedesE from "@/assets/car-mercedes-e.jpg";
const carMercedesGLA = "/vehicles/benatna/mercedes-gla.webp";
import carMercedesGLC from "@/assets/car-mercedes-glc.jpg";
import carMercedesGLE from "@/assets/car-mercedes-gle.jpg";
const carMercedesCLA = "/vehicles/benatna/mercedes-cla.webp";
import carMercedesGLB from "@/assets/car-mercedes-glb.jpg";
import carVwJetta from "@/assets/car-vw-jetta.jpg";
import carVwArteon from "@/assets/car-vw-arteon.jpg";
const carVwTouareg = "/vehicles/benatna/vw-touareg.webp";
import carVwTaigo from "@/assets/car-vw-taigo.jpg";
import carVwID4 from "@/assets/car-vw-id4.jpg";
import carPeugeot5008 from "@/assets/car-peugeot-5008.jpg";
import carRenaultArkana from "@/assets/car-renault-arkana.jpg";
const carDaciaJogger = "/vehicles/benatna/dacia-jogger.webp";
import carToyotaCHR from "@/assets/car-toyota-chr.jpg";
import carNissanXTrail from "@/assets/car-nissan-xtrail.jpg";
import carFordPuma from "@/assets/car-ford-puma.jpg";
import carKiaNiro from "@/assets/car-kia-niro.jpg";
import carMazda2 from "@/assets/car-mazda-2.jpg";
import carCitroenEC4 from "@/assets/car-citroen-ec4.jpg";
import carOpelGrandland from "@/assets/car-opel-grandland.jpg";
import carSeatAteca from "@/assets/car-seat-ateca.jpg";
import carSkodaKaroq from "@/assets/car-skoda-karoq.jpg";
import carAudiQ2 from "@/assets/car-audi-q2.jpg";
import carMercedesEQA from "@/assets/car-mercedes-eqa.jpg";
import carBmwIX3 from "@/assets/car-bmw-ix3.jpg";
import carPeugeotE2008 from "@/assets/car-peugeot-e2008.jpg";
import carRenaultAustral from "@/assets/car-renault-austral.jpg";
import carVwID3 from "@/assets/car-vw-id3.jpg";
import carMaseratiGhibli from "@/assets/car-maserati-ghibli.jpg";
import carMaseratiLevante from "@/assets/car-maserati-levante.jpg";
import carMercedesECabrio from "@/assets/car-mercedes-e-cabrio.jpg";
import carBmw4Cabrio from "@/assets/car-bmw-4-cabrio.jpg";
import carAudiA5Cabrio from "@/assets/car-audi-a5-cabrio.jpg";
const carPorscheMacan = "/vehicles/benatna/porsche-macan.webp";
import carJaguarFPace from "@/assets/car-jaguar-fpace.jpg";
const carRangeRoverEvoque = "/vehicles/benatna/range-rover-evoque.webp";
import carLexusNX from "@/assets/car-lexus-nx.jpg";
import carVolvoXC60 from "@/assets/car-volvo-xc60.jpg";
import carBmwZ4 from "@/assets/car-bmw-z4.jpg";
import carMercedesG from "@/assets/car-mercedes-g.jpg";
import carAudiA7 from "@/assets/car-audi-a7.jpg";
import carAudiA8 from "@/assets/car-audi-a8.jpg";
import carAudiQ8 from "@/assets/car-audi-q8.jpg";
import carPorscheCayenne from "@/assets/car-porsche-cayenne.jpg";
import carPorschePanamera from "@/assets/car-porsche-panamera.jpg";
import carPorsche911 from "@/assets/car-porsche-911.jpg";
const carRangeRoverSport = "/vehicles/benatna/range-rover-sport.webp";
import carRangeRoverVelar from "@/assets/car-range-rover-velar.jpg";
import carAudiEtronGT from "@/assets/car-audi-etron-gt.jpg";
const carCupraFormentor = "/vehicles/benatna/cupra-formentor.webp";
import carHyundaiStaria from "@/assets/car-hyundai-staria.jpg";

// Helper function to generate conditions for all cars
const generateConditions = (minAge: number): string[] => {
  return ["Kilométrage illimité", `Âge minimum: ${minAge} ans`];
};

// Modèles uniques du catalogue (le champ ville est généré ci-dessous)
const carModels = [
  { image: "/vehicles/benatna/audi-q3-sportback.webp", name: "Audi Q3 Sportback", brand: "Audi", type: "Automatique", category: "SUV Premium", price: 1020, priceDisplay: "1020 MAD", conditions: ["Conditions à confirmer avec le loueur"] },
  {
    image: carClio,
    name: "Renault Clio",
    brand: "Renault",
    type: "Automatique",
    category: "Berline",
    price: 400,
    priceDisplay: "400 MAD",
    conditions: generateConditions(23),
    badges: ["🔥 Populaire", "⚡ Disponible immédiatement"]
  },
  {
    image: carClio,
    name: "Renault Clio",
    brand: "Renault",
    type: "Manuelle",
    category: "Berline",
    price: 400,
    priceDisplay: "400 MAD",
    conditions: generateConditions(21)
  },
  {
    image: carDuster,
    name: "Dacia Duster",
    brand: "Dacia",
    type: "Manuelle",
    category: "SUV",
    price: 380,
    priceDisplay: "380 MAD",
    conditions: generateConditions(23),
    badges: ["🔥 Populaire", "⚡ Disponible immédiatement"]
  },
  {
    image: carDuster,
    name: "Dacia Duster",
    brand: "Dacia",
    type: "Automatique",
    category: "SUV",
    price: 380,
    priceDisplay: "380 MAD",
    conditions: generateConditions(25)
  },
  {
    image: carVwGolf,
    name: "Volkswagen Golf",
    brand: "Volkswagen",
    type: "Automatique",
    category: "Berline",
    price: 650,
    priceDisplay: "650 MAD",
    conditions: generateConditions(23),
    badges: ["🔥 Populaire"]
  },
  {
    image: carVwGolf,
    name: "Volkswagen Golf",
    brand: "Volkswagen",
    type: "Manuelle",
    category: "Berline",
    price: 650,
    priceDisplay: "650 MAD",
    conditions: generateConditions(23)
  },
  {
    image: carHyundaiTucson,
    name: "Hyundai Tucson",
    brand: "Hyundai",
    type: "Automatique",
    category: "SUV",
    price: 640,
    priceDisplay: "640 MAD",
    conditions: generateConditions(25)
  },
  {
    image: carKiaSportage,
    name: "Kia Sportage",
    brand: "Kia",
    type: "Automatique",
    category: "SUV",
    price: 640,
    priceDisplay: "640 MAD",
    conditions: generateConditions(25),
    badges: ["⚡ Disponible immédiatement"]
  },
  {
    image: carKiaSportage,
    name: "Kia Sportage",
    brand: "Kia",
    type: "Manuelle",
    category: "SUV",
    price: 640,
    priceDisplay: "640 MAD",
    conditions: generateConditions(23)
  },
  {
    image: carMercedesC,
    name: "Mercedes Classe C",
    brand: "Mercedes",
    type: "Automatique",
    category: "Berline",
    price: 1060,
    priceDisplay: "1060 MAD",
    conditions: generateConditions(28),
    badges: ["💎 Luxe"]
  },
  {
    image: carAudiA4,
    name: "Audi A4",
    brand: "Audi",
    type: "Automatique",
    category: "Berline",
    price: 1060,
    priceDisplay: "1060 MAD",
    conditions: generateConditions(27)
  },
  {
    image: carSeatIbiza,
    name: "Seat Ibiza",
    brand: "Seat",
    type: "Manuelle",
    category: "Citadine",
    price: 400,
    priceDisplay: "400 MAD",
    conditions: generateConditions(21)
  },
  {
    image: carSeatIbiza,
    name: "Seat Ibiza",
    brand: "Seat",
    type: "Automatique",
    category: "Citadine",
    price: 400,
    priceDisplay: "400 MAD",
    conditions: generateConditions(21)
  },
  {
    image: carHyundaiAccent,
    name: "Hyundai Accent",
    brand: "Fiat",
    type: "Automatique",
    category: "Berline",
    price: 440,
    priceDisplay: "440 MAD",
    conditions: generateConditions(22)
  },
  {
    image: carHyundaiAccent,
    name: "Hyundai Accent",
    brand: "Fiat",
    type: "Manuelle",
    category: "Berline",
    price: 440,
    priceDisplay: "440 MAD",
    conditions: generateConditions(22)
  },
  {
    image: carDaciaSandero,
    name: "Dacia Sandero",
    brand: "Dacia",
    type: "Manuelle",
    category: "Citadine",
    price: 300,
    priceDisplay: "300 MAD",
    conditions: generateConditions(21)
  },
  {
    image: carDaciaLogan,
    name: "Dacia Logan",
    brand: "Dacia",
    type: "Manuelle",
    category: "Berline",
    price: 300,
    priceDisplay: "300 MAD",
    conditions: generateConditions(21)
  },
  {
    image: carSanderoStepway,
    name: "Dacia Sandero Stepway",
    brand: "Dacia",
    type: "Manuelle",
    category: "Citadine",
    price: 300,
    priceDisplay: "300 MAD",
    conditions: ["Caution: 4200 MAD", "260 km/jour inclus", "Âge minimum: 21 ans"]
  },
  {
    image: carBmw5,
    name: "BMW Série 5",
    brand: "BMW",
    type: "Automatique",
    category: "Berline",
    price: 1190,
    priceDisplay: "1190 MAD",
    conditions: ["Caution: 11000 MAD", "450 km/jour inclus", "Âge minimum: 28 ans"]
  },
  {
    image: carBmwX5,
    name: "BMW X5",
    brand: "BMW",
    type: "Automatique",
    category: "SUV",
    price: 1250,
    priceDisplay: "1250 MAD",
    conditions: ["Caution: 13000 MAD", "500 km/jour inclus", "Âge minimum: 30 ans"]
  },
  {
    image: carAudiA3,
    name: "Audi A3",
    brand: "Audi",
    type: "Automatique",
    category: "Berline",
    price: 900,
    priceDisplay: "900 MAD",
    conditions: ["Caution: 8600 MAD", "400 km/jour inclus", "Âge minimum: 27 ans"]
  },
  {
    image: carAudiA6,
    name: "Audi A6",
    brand: "Audi",
    type: "Automatique",
    category: "Berline",
    price: 1190,
    priceDisplay: "1190 MAD",
    conditions: ["Caution: 11500 MAD", "450 km/jour inclus", "Âge minimum: 28 ans"]
  },
  {
    image: carAudiQ3,
    name: "Audi Q3",
    brand: "Audi",
    type: "Automatique",
    category: "SUV",
    price: 1020,
    priceDisplay: "1020 MAD",
    conditions: ["Caution: 9000 MAD", "410 km/jour inclus", "Âge minimum: 27 ans"]
  },
  {
    image: carAudiQ5,
    name: "Audi Q5",
    brand: "Audi",
    type: "Automatique",
    category: "SUV",
    price: 1250,
    priceDisplay: "1250 MAD",
    conditions: ["Caution: 11500 MAD", "450 km/jour inclus", "Âge minimum: 28 ans"]
  },
  {
    image: carAudiQ7,
    name: "Audi Q7",
    brand: "Audi",
    type: "Automatique",
    category: "SUV",
    price: 1450,
    priceDisplay: "1450 MAD",
    conditions: ["Caution: 13500 MAD", "500 km/jour inclus", "Âge minimum: 30 ans"]
  },
  {
    image: carMercedesA,
    name: "Mercedes Classe A",
    brand: "Mercedes",
    type: "Automatique",
    category: "Citadine",
    price: 900,
    priceDisplay: "900 MAD",
    conditions: ["Caution: 8300 MAD", "390 km/jour inclus", "Âge minimum: 27 ans"]
  },
  {
    image: carMercedesE,
    name: "Mercedes Classe E",
    brand: "Mercedes",
    type: "Automatique",
    category: "Berline",
    price: 1190,
    priceDisplay: "1190 MAD",
    conditions: ["Caution: 12000 MAD", "500 km/jour inclus", "Âge minimum: 29 ans"]
  },
  {
    image: carMercedesGLA,
    name: "Mercedes GLA",
    brand: "Mercedes",
    type: "Automatique",
    category: "SUV",
    price: 1020,
    priceDisplay: "1020 MAD",
    conditions: ["Caution: 9300 MAD", "420 km/jour inclus", "Âge minimum: 27 ans"]
  },
  {
    image: carMercedesGLC,
    name: "Mercedes GLC",
    brand: "Mercedes",
    type: "Automatique",
    category: "SUV",
    price: 1250,
    priceDisplay: "1250 MAD",
    conditions: ["Caution: 12200 MAD", "480 km/jour inclus", "Âge minimum: 29 ans"]
  },
  {
    image: carMercedesGLE,
    name: "Mercedes GLE",
    brand: "Mercedes",
    type: "Automatique",
    category: "SUV",
    price: 1880,
    priceDisplay: "1880 MAD",
    conditions: ["Caution: 14000 MAD", "550 km/jour inclus", "Âge minimum: 30 ans"]
  },
  {
    image: carMercedesCLA,
    name: "Mercedes CLA",
    brand: "Mercedes",
    type: "Automatique",
    category: "Berline",
    price: 1060,
    priceDisplay: "1060 MAD",
    conditions: ["Caution: 10500 MAD", "440 km/jour inclus", "Âge minimum: 28 ans"]
  },
  {
    image: carMercedesGLB,
    name: "Mercedes GLB",
    brand: "Mercedes",
    type: "Automatique",
    category: "SUV",
    price: 1020,
    priceDisplay: "1020 MAD",
    conditions: ["Caution: 9700 MAD", "430 km/jour inclus", "Âge minimum: 28 ans"]
  },
  {
    image: carVwTouareg,
    name: "Volkswagen Touareg",
    brand: "Volkswagen",
    type: "Automatique",
    category: "SUV",
    price: 1250,
    priceDisplay: "1250 MAD",
    conditions: ["Caution: 11500 MAD", "480 km/jour inclus", "Âge minimum: 28 ans"]
  },
  {
    image: carDaciaJogger,
    name: "Dacia Jogger",
    brand: "Peugeot",
    type: "Automatique",
    category: "SUV",
    price: 380,
    priceDisplay: "380 MAD",
    conditions: ["Caution: 8400 MAD", "460 km/jour inclus", "Âge minimum: 26 ans"]
  },
  {
    image: carDaciaJogger,
    name: "Dacia Jogger",
    brand: "Dacia",
    type: "Manuelle",
    category: "Monospace",
    price: 380,
    priceDisplay: "380 MAD",
    conditions: ["Caution: 5200 MAD", "340 km/jour inclus", "Âge minimum: 23 ans"]
  },
  {
    image: carPorscheMacan,
    name: "Porsche Macan",
    brand: "Porsche",
    type: "Automatique",
    category: "SUV",
    price: 2300,
    priceDisplay: "2300 MAD",
    conditions: ["Caution: 28000 MAD", "550 km/jour inclus", "Âge minimum: 30 ans"]
  },
  {
    image: carRangeRoverEvoque,
    name: "Range Rover Evoque",
    brand: "Land Rover",
    type: "Automatique",
    category: "SUV",
    price: 1880,
    priceDisplay: "1880 MAD",
    conditions: ["Caution: 24000 MAD", "550 km/jour inclus", "Âge minimum: 28 ans"]
  },
  {
    image: carMercedesG,
    name: "Mercedes Classe G",
    brand: "Mercedes",
    type: "Automatique",
    category: "SUV",
    price: 3500,
    priceDisplay: "3500 MAD",
    conditions: ["Âge minimum: 30 ans"],
    badges: ["🌟 Nouveau", "💎 Luxe"]
  },
  {
    image: carAudiQ8,
    name: "Audi Q8",
    brand: "Audi",
    type: "Automatique",
    category: "SUV",
    price: 1880,
    priceDisplay: "1880 MAD",
    conditions: ["Âge minimum: 28 ans"],
    badges: ["🌟 Nouveau", "💎 Luxe"]
  },
  {
    image: carPorscheCayenne,
    name: "Porsche Cayenne",
    brand: "Porsche",
    type: "Automatique",
    category: "SUV",
    price: 2400,
    priceDisplay: "2400 MAD",
    conditions: ["Âge minimum: 30 ans"],
    badges: ["🌟 Nouveau", "💎 Luxe"]
  },
  {
    image: carRangeRoverSport,
    name: "Range Rover Sport",
    brand: "Land Rover",
    type: "Automatique",
    category: "SUV",
    price: 2300,
    priceDisplay: "2300 MAD",
    conditions: ["Âge minimum: 28 ans"],
    badges: ["🌟 Nouveau", "💎 Luxe"]
  },
  {
    image: carVwGolf,
    name: "VW Golf",
    brand: "Volkswagen",
    type: "Automatique",
    category: "Berline",
    price: 650,
    priceDisplay: "650 MAD",
    conditions: generateConditions(23),
    badges: ["🔥 Populaire"]
  },
  {
    image: carCupraFormentor,
    name: "Cupra Formentor",
    brand: "Cupra",
    type: "Automatique",
    category: "SUV",
    price: 940,
    priceDisplay: "940 MAD",
    conditions: generateConditions(25),
    badges: ["⭐ Premium SUV", "🔥 Nouveau"]
  },
  {
    image: carHyundaiStaria,
    name: "Hyundai Staria",
    brand: "Hyundai",
    type: "Automatique",
    category: "Van 9 places",
    price: 1450,
    priceDisplay: "1450 MAD",
    conditions: generateConditions(28),
    badges: ["👨‍👩‍👧‍👦 9 places", "✨ Van premium"]
  },
  {
    image: carOpelCorsa,
    name: "Opel Corsa",
    brand: "Opel",
    type: "Manuelle",
    category: "Citadine",
    price: 400,
    priceDisplay: "400 MAD",
    conditions: generateConditions(21),
    badges: ["💰 Économique"]
  },
  {
    image: carPeugeot208,
    name: "Peugeot 208",
    brand: "Peugeot",
    type: "Manuelle",
    category: "Citadine",
    price: 400,
    priceDisplay: "400 MAD",
    conditions: generateConditions(21),
    badges: ["💰 Économique"]
  },
  {
    id: 320, image: carHyundaiI20, name: "Hyundai i20", brand: "Hyundai", type: "Manuelle",
    category: "Citadine", city: "Casablanca", price: 400, priceDisplay: "400 MAD",
    conditions: generateConditions(21), badges: ["💰 Économique"]
  },
  {
    id: 322, image: carVwTRoc, name: "Volkswagen T-Roc", brand: "Volkswagen", type: "Automatique",
    category: "SUV Compact", city: "Casablanca", price: 650, priceDisplay: "650 MAD",
    conditions: generateConditions(23), badges: ["⚡ Disponible immédiatement"]
  },
  {
    id: 324, image: carHyundaiSantaFe, name: "Hyundai Santa Fe", brand: "Hyundai", type: "Automatique",
    category: "SUV 7 places", city: "Casablanca", price: 1450, priceDisplay: "1450 MAD",
    conditions: generateConditions(25), badges: ["👨‍👩‍👧‍👦 7 places", "🔥 Premium familial"]
  },
];

// Les loueurs et leurs véhicules sont basés à Casablanca.
const CATALOG_CITIES = ["Casablanca"];
const classicModels = carModels.filter(model => isClassicTourismCar(model.name) && !isPremiumTourismCar(model.name));
const premiumModels = carModels.filter(model => isPremiumTourismCar(model.name));
const cars = CATALOG_CITIES.flatMap(city => [
  ...classicModels.map((model, index) => ({ ...model, id: index + 1, city })),
  ...premiumModels.map((model, index) => ({ ...model, id: 1001 + index, city }))
]).filter((car, index, catalogue) => catalogue.findIndex(candidate =>
  candidate.name.replace(/^VW /, "Volkswagen ") === car.name.replace(/^VW /, "Volkswagen ") && candidate.type === car.type
) === index);

const LOUER_META: Record<string, { title: string; desc: string; url: string }> = {
  fr: {
    title: "Location de voiture à Casablanca | Benatna",
    desc: "Location avec des loueurs basés à Casablanca. Prise en charge en ville ou à l’aéroport Mohammed V. Rabat sur demande, livraison gratuite convenue à l’avance. Minimum trois jours, maximum six mois.",
    url: "https://benatna.ma/louer",
  },
  en: {
    title: "Car rental in Casablanca | Benatna",
    desc: "Rent from Casablanca-based agencies. City or Mohammed V Airport pickup. Rabat delivery on request, free delivery arranged in advance. Minimum three days, maximum six months.",
    url: "https://benatna.ma/en/louer",
  },
  es: {
    title: "Alquiler de coches en Casablanca | Benatna",
    desc: "Agencias de alquiler en Casablanca. Recogida en la ciudad o aeropuerto Mohammed V. Rabat bajo petición; entrega gratuita acordada de antemano. Mínimo tres días, máximo seis meses.",
    url: "https://benatna.ma/es/louer",
  },
};

const Louer = () => {
  const { t, language } = useLanguage();
  const louerMeta = LOUER_META[language] ?? LOUER_META.fr;

  const [searchParams] = useSearchParams();
  const pickupPoint = pickupPoints.find(p => p.id === searchParams.get("pickup"));
  const [selectedCity, setSelectedCity] = useState<string>("Casablanca");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [isLoading] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const [selectedCar, setSelectedCar] = useState<{ name: string; city: string; price: string } | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [cataloguePage, setCataloguePage] = useState({ filterKey: "", count: 24 });
  const [viewMode, setViewMode] = useState<'carousel' | 'grid' | 'list'>('grid');
  const { selectedCars, addToComparison, removeFromComparison, isInComparison, clearComparison } = useComparison();
  const isMobile = useIsMobile();
  const [previewCar, setPreviewCar] = useState<typeof cars[0] | null>(null);

  // Pull to refresh
  const handleRefresh = async () => {
    // Simulate refresh with a small delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshKey(prev => prev + 1);
    toast({
      title: "Actualisé",
      description: "Les véhicules ont été actualisés",
    });
  };

  const { isPulling, isRefreshing, pullDistance, pullPercentage } = usePullToRefresh({
    onRefresh: handleRefresh,
  });

  // Préchargement intelligent des images de voitures suivantes
  useIntelligentPreloader([
    { selector: 'img[data-car-image]', attribute: 'src' }
  ], 0.6);

  // Lire les paramètres de l'URL au chargement
  useEffect(() => {
    const cityFromUrl = searchParams.get('city');
    const startDateFromUrl = searchParams.get('startDate');
    const endDateFromUrl = searchParams.get('endDate');
    
    if (cityFromUrl) {
      setSelectedCity(cityFromUrl === "Rabat" ? "Rabat" : "Casablanca");
    }
    if (startDateFromUrl) {
      setStartDate(new Date(startDateFromUrl));
    }
    if (endDateFromUrl) {
      setEndDate(new Date(endDateFromUrl));
    }
    const startTimeFromUrl = searchParams.get('startTime');
    const endTimeFromUrl = searchParams.get('endTime');
    if (startTimeFromUrl) setStartTime(startTimeFromUrl);
    if (endTimeFromUrl) setEndTime(endTimeFromUrl);
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setParallaxOffset(offset * 0.5);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const requestFromCatalogue = (vehicles: string[], start = startDate, end = endDate) => {
    const dateValue = (value?: Date) => value && Number.isFinite(value.getTime()) ? format(value, 'yyyy-MM-dd') : '';
    const selected = [...new Set(selectedCars.map(car => car.name))];
    requestRental({ vehicles: selected.length ? selected : vehicles, startDate: dateValue(start), endDate: dateValue(end), city: selectedCity === 'Rabat' ? 'Rabat' : 'Casablanca', pickupId: pickupPoint?.city === selectedCity ? pickupPoint.id : '' });
  };
  const handleWhatsAppClick = (carName: string) => {
    requestFromCatalogue([carName]);
  };
  const handleSendSelection = () => {
    if (selectedCars.length) requestFromCatalogue([...new Set(selectedCars.map(car => car.name))]);
  };

  const handleShowAvailability = (carName: string, city: string, priceDisplay: string) => {
    setSelectedCar({ name: carName, city, price: priceDisplay });
    setShowAvailability(true);
  };

  const handleSelectDates = (start: Date, end: Date) => {
    if (!isValidRentalPeriod(format(start, "yyyy-MM-dd"), format(end, "yyyy-MM-dd"), startTime || "00:00", endTime || "00:00")) {
      toast({ title: "Dates de location invalides", description: RENTAL_PERIOD_MESSAGE, variant: "destructive" });
      return;
    }
    setStartDate(start);
    setEndDate(end);
    setShowAvailability(false);
    
    if (selectedCar) requestFromCatalogue([selectedCar.name], start, end);
  };

  const cities = ["Casablanca", "Rabat"];
  
  // Marques et catégories dérivées du catalogue réel (pas de filtre mort)
  const brands = [...new Set(cars.map(c => c.brand))].sort();

  const categories = [...new Set(cars.map(c => c.category))].sort();
  
  const types = ["Automatique", "Manuelle"];

  // Fonction pour mélanger les véhicules de manière variée
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Filtrer et mélanger les voitures de manière optimisée
  const displayedCars = useMemo(() => {
    // Appliquer les filtres
    const filtered = cars.filter(car => {
      if (selectedCity && selectedCity !== "all" && car.city !== (selectedCity === "Rabat" ? "Casablanca" : selectedCity)) return false;
      if (selectedType && selectedType !== "all" && car.type !== selectedType) return false;
      if (selectedBrand && selectedBrand !== "all" && car.brand !== selectedBrand) return false;
      if (selectedCategory && selectedCategory !== "all" && car.category !== selectedCategory) return false;
      return true;
    });

    // Mélanger uniquement si aucun filtre n'est appliqué
    const noFiltersApplied = selectedCity === "all" && selectedType === "all" && 
                             selectedBrand === "all" && selectedCategory === "all";

    const result = noFiltersApplied ? shuffleArray(filtered) : filtered;
    console.log("[Louer] displayedCars length:", result.length, {
      selectedCity,
      selectedType,
      selectedBrand,
      selectedCategory,
    });
    return result;
  }, [selectedCity, selectedType, selectedBrand, selectedCategory]);

  const filterKey = JSON.stringify([selectedCity, selectedType, selectedBrand, selectedCategory]);
  useEffect(() => {
    setCataloguePage({ filterKey, count: 24 });
  }, [filterKey]);
  const visibleCount = cataloguePage.filterKey === filterKey ? cataloguePage.count : 24;
  const visibleCars = displayedCars.slice(0, visibleCount);
  const catalogueLabels = {
    fr: { more: "Afficher plus de véhicules", count: `${visibleCars.length} véhicules affichés sur ${displayedCars.length}`, empty: "Aucun véhicule ne correspond à ces filtres." },
    en: { more: "Show more vehicles", count: `${visibleCars.length} vehicles shown out of ${displayedCars.length}`, empty: "No vehicles match these filters." },
    es: { more: "Mostrar más vehículos", count: `${visibleCars.length} vehículos mostrados de ${displayedCars.length}`, empty: "Ningún vehículo coincide con estos filtros." },
  };
  const catalogueLabel = catalogueLabels[language] ?? catalogueLabels.fr;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Social Proof Notifications - Temporairement désactivées
      <SocialProofNotification />
      <RecentBookingAlert />
      */}
      
      <Helmet>
        <title>{louerMeta.title}</title>
        <meta name="description" content={louerMeta.desc} />
        <meta property="og:title" content={louerMeta.title} />
        <meta property="og:description" content={louerMeta.desc} />
        <meta name="keywords" content="location voiture maroc, louer auto casablanca, rent car marrakech, voiture tourisme maroc, location véhicule rabat, agence location tanger" />
      </Helmet>
      <HreflangTags path="/louer" />
      <StructuredData type="rental" />
      <CarProductSchema cars={displayedCars.slice(0, 20)} />
      {pickupPoint && pickupPoint.city === selectedCity && <p className="px-4 py-3 text-center bg-secondary/30">Point demandé : {pickupPoint.name} — livraison gratuite, convenue à l’avance.</p>}
      <p className="bg-secondary/30 px-4 py-3 text-center" role="note">Casablanca : prise en charge en ville ou à l’aéroport Mohammed V. Rabat : livraison sur demande, livraison gratuite convenue à l’avance. Aucune autre ville desservie actuellement.</p>
      <PullToRefreshIndicator 
        isPulling={isPulling}
        isRefreshing={isRefreshing}
        pullDistance={pullDistance}
        pullPercentage={pullPercentage}
      />
      <Header />
      <p className="text-center px-4 py-3 bg-primary/10">Pour vos vacances et séjours au Maroc : location de 3 jours à 6 mois.</p>
      <Breadcrumbs />
      
      {/* Hero with Search and Parallax */}
      <section className="relative min-h-[480px] sm:min-h-[520px] md:h-[450px] flex items-center justify-center overflow-hidden py-6 md:py-0">
        <div 
          className="absolute inset-0 bg-cover bg-center parallax-bg"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            transform: `translateY(${parallaxOffset}px)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        
        <div className="container relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-center mb-4 sm:mb-8 text-white drop-shadow-lg leading-tight">
            {t('rent.findIdealCar')}
          </h1>
          
          {/* Search Bar */}
          <Card className="max-w-4xl mx-auto rounded-2xl shadow-xl">
            <CardContent className="p-3 sm:p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-4 mb-4">
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-xs text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {t('common.city')}
                  </label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="bg-secondary/20 border-0 h-11 text-xs sm:text-sm md:text-base">
                      <SelectValue placeholder="Ville" className="truncate" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      <SelectItem value="all">{t('rent.allCities')}</SelectItem>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    {t('common.startDate')}
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-secondary/20 border-0 h-11 text-xs sm:text-sm md:text-base",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                        <span className="truncate">
                          {startDate
                            ? format(startDate, isMobile ? "dd/MM/yyyy" : "PPP", { locale: fr })
                            : "Sélectionner"}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    Heure
                  </label>
                  <input
                    type="time"
                    defaultValue="10:00"
                    className="w-full px-2 py-2 h-11 bg-secondary/20 border-0 rounded-lg focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    {t('common.endDate')}
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-secondary/20 border-0 h-11 text-xs sm:text-sm md:text-base",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                        <span className="truncate">
                          {endDate
                            ? format(endDate, isMobile ? "dd/MM/yyyy" : "PPP", { locale: fr })
                            : "Sélectionner"}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) => date < (startDate || new Date())}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    Heure
                  </label>
                  <input
                    type="time"
                    defaultValue="10:00"
                    className="w-full px-2 py-2 h-11 bg-secondary/20 border-0 rounded-lg focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {/* Mobile: Bottom Sheets */}
                {isMobile ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        {t('rent.brand')}
                      </label>
                      <FilterBottomSheet
                        title={t('rent.brand')}
                        description="Sélectionnez une marque de véhicule"
                        icon={<Car className="w-4 h-4" />}
                        options={[
                          { value: "all", label: t('rent.allBrands') },
                          ...brands.map(brand => ({ value: brand, label: brand }))
                        ]}
                        selectedValue={selectedBrand}
                        onValueChange={setSelectedBrand}
                        triggerLabel={selectedBrand === "all" ? t('rent.allBrands') : selectedBrand}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        {t('rent.category')}
                      </label>
                      <FilterBottomSheet
                        title={t('rent.category')}
                        description="Sélectionnez une catégorie de véhicule"
                        icon={<Car className="w-4 h-4" />}
                        options={[
                          { value: "all", label: t('rent.allCategories') },
                          ...categories.map(category => ({ value: category, label: category }))
                        ]}
                        selectedValue={selectedCategory}
                        onValueChange={setSelectedCategory}
                        triggerLabel={selectedCategory === "all" ? t('rent.allCategories') : selectedCategory}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        {t('rent.transmission')}
                      </label>
                      <FilterBottomSheet
                        title={t('rent.transmission')}
                        description="Sélectionnez un type de transmission"
                        icon={<Car className="w-4 h-4" />}
                        options={[
                          { value: "all", label: t('rent.allTypes') },
                          ...types.map(type => ({ value: type, label: type }))
                        ]}
                        selectedValue={selectedType}
                        onValueChange={setSelectedType}
                        triggerLabel={selectedType === "all" ? t('rent.allTypes') : selectedType}
                      />
                    </div>
                  </>
                ) : (
                  /* Desktop: Select Dropdowns */
                  <>
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        {t('rent.brand')}
                      </label>
                      <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                        <SelectTrigger className="bg-secondary/20 border-0 h-11 text-xs sm:text-sm md:text-base">
                          <SelectValue placeholder="Toutes les marques" className="truncate" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                          <SelectItem value="all">{t('rent.allBrands')}</SelectItem>
                          {brands.map(brand => (
                            <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        {t('rent.category')}
                      </label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="bg-secondary/20 border-0 h-11 text-xs sm:text-sm md:text-base">
                          <SelectValue placeholder="Toutes les catégories" className="truncate" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                          <SelectItem value="all">{t('rent.allCategories')}</SelectItem>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        {t('rent.transmission')}
                      </label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="bg-secondary/20 border-0 h-11 text-xs sm:text-sm md:text-base">
                          <SelectValue placeholder="Tous les types" className="truncate" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                          <SelectItem value="all">{t('rent.allTypes')}</SelectItem>
                          {types.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Available Cars */}
      <section id="catalogue-results" className="py-8 md:py-20 pb-32 md:pb-20">
        <div className="container px-4">
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl md:text-2xl font-barlow font-semibold">
                {displayedCars.length} {t('rent.vehicle')}{displayedCars.length > 1 ? 's' : ''} {t(displayedCars.length > 1 ? 'rent.availables' : 'rent.available')}
              </h2>
              {/* View Mode Selector (Mobile only) */}
              <div className="md:hidden flex gap-1 bg-muted/50 p-1 rounded-lg">
                <Button
                  size="sm"
                  variant={viewMode === 'carousel' ? 'default' : 'ghost'}
                  className="h-11 w-11 p-0"
                  onClick={() => setViewMode('carousel')}
                  aria-label={t('rent.viewCarousel')}
                >
                  <Rows3 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  className="h-11 w-11 p-0"
                  onClick={() => setViewMode('grid')}
                  aria-label={t('rent.viewGrid')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  className="h-11 w-11 p-0"
                  onClick={() => setViewMode('list')}
                  aria-label={t('rent.viewList')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm md:text-base text-muted-foreground">
              {t('rent.verifiedAgencies')}
            </p>
          </div>

          {/* Mobile Views */}
          {isMobile && <div className="md:hidden mb-8">
            {displayedCars.length === 0 ? null : (
              <>
                {viewMode === 'carousel' && (
                  <>
                    <Carousel
                      key={refreshKey}
                      opts={{
                        align: "start",
                        loop: false,
                      }}
                      className="w-full"
                    >
                      <CarouselContent className="-ml-2">
                        {visibleCars.map((car) => (
                          <CarouselItem key={car.id} className="pl-2 basis-[90%]">
                            <SwipeableCarCard
                              car={car}
                              viewMode="carousel"
                              startDate={startDate}
                              endDate={endDate}
                              isInComparison={isInComparison(car.id)}
                              onToggleComparison={() => {
                                if (isInComparison(car.id)) {
                                  removeFromComparison(car.id);
                                } else {
                                  addToComparison(car);
                                }
                              }}
                              onShowAvailability={() => handleShowAvailability(car.name, car.city, car.priceDisplay)}
                              onWhatsAppClick={() => handleWhatsAppClick(car.name)}
                              onPreview={() => setPreviewCar(car)}
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-2 h-10 w-10" />
                      <CarouselNext className="right-2 h-10 w-10" />
                    </Carousel>
                    <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-dashed">
                      <p className="text-xs text-center text-muted-foreground">
                        👆 Glissez pour voir • 👇 Swipe vers le bas pour fermer • 👈 Swipe pour sélectionner • 🤚 Maintenez pour preview
                      </p>
                    </div>
                  </>
                )}

                {viewMode === 'grid' && (
                  <div className="grid grid-cols-2 gap-3">
                    {visibleCars.map((car) => (
                      <SwipeableCarCard
                        key={car.id}
                        car={car}
                        viewMode="grid"
                        startDate={startDate}
                        endDate={endDate}
                        isInComparison={isInComparison(car.id)}
                        onToggleComparison={() => {
                          if (isInComparison(car.id)) {
                            removeFromComparison(car.id);
                          } else {
                            addToComparison(car);
                          }
                        }}
                        onShowAvailability={() => handleShowAvailability(car.name, car.city, car.priceDisplay)}
                        onWhatsAppClick={() => handleWhatsAppClick(car.name)}
                        onPreview={() => setPreviewCar(car)}
                      />
                    ))}
                  </div>
                )}

                {viewMode === 'list' && (
                  <div className="space-y-0">
                    {visibleCars.map((car) => (
                      <SwipeableCarCard
                        key={car.id}
                        car={car}
                        viewMode="list"
                        startDate={startDate}
                        endDate={endDate}
                        isInComparison={isInComparison(car.id)}
                        onToggleComparison={() => {
                          if (isInComparison(car.id)) {
                            removeFromComparison(car.id);
                          } else {
                            addToComparison(car);
                          }
                        }}
                        onShowAvailability={() => handleShowAvailability(car.name, car.city, car.priceDisplay)}
                        onWhatsAppClick={() => handleWhatsAppClick(car.name)}
                        onPreview={() => setPreviewCar(car)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>}

          {/* Desktop Grid View */}
          {!isMobile && <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleCars.map((car) => (
              <SwipeableCarCard
                key={car.id}
                car={car}
                viewMode="grid"
                startDate={startDate}
                endDate={endDate}
                isInComparison={isInComparison(car.id)}
                onToggleComparison={() => {
                  if (isInComparison(car.id)) {
                    removeFromComparison(car.id);
                  } else {
                    addToComparison(car);
                  }
                }}
                onShowAvailability={() => handleShowAvailability(car.name, car.city, car.priceDisplay)}
                onWhatsAppClick={() => handleWhatsAppClick(car.name)}
                onPreview={() => setPreviewCar(car)}
              />
            ))}
          </div>}
          <div className="mt-8 text-center" aria-live="polite">
            <p className="text-sm text-muted-foreground mb-4">
              {displayedCars.length === 0 ? catalogueLabel.empty : catalogueLabel.count}
            </p>
            {visibleCars.length < displayedCars.length && (
              <Button
                variant="outline"
                onClick={() => setCataloguePage({ filterKey, count: visibleCount + 24 })}
              >
                {catalogueLabel.more}
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="py-10 border-t" aria-labelledby="catalogue-model-links">
        <div className="container">
          <h2 id="catalogue-model-links" className="text-xl font-semibold mb-4">Découvrez nos modèles à Casablanca</h2>
          <nav aria-label="Fiches des modèles de location">
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Object.entries(rentalVehicleSlugs).map(([slug, name]) => (
                <li key={slug}><Link to={`/vehicule/${slug}`} className="text-sm underline underline-offset-4 hover:text-primary focus-visible:outline focus-visible:outline-2">{name}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Footer Message */}
      <section className="py-12 bg-secondary/30">
        <div className="container text-center">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tous les véhicules proviennent d'agences professionnelles vérifiées, pas de particuliers.
          </p>
        </div>
      </section>

      {/* Availability Calendar Modal */}
      {selectedCar && (
        <AvailabilityCalendar
          carName={selectedCar.name}
          isOpen={showAvailability}
          onClose={() => setShowAvailability(false)}
          onSelectDates={handleSelectDates}
        />
      )}

      <Footer />
      
      {/* Sticky WhatsApp CTA on Mobile */}
      <StickyCTA
        show={selectedCars.length === 0}
        label="Contacter via WhatsApp"
        onClick={() => requestFromCatalogue([])}
        icon={MessageCircle}
      />
      
      {/* Bouton flottant : envoi direct WhatsApp de la sélection (1-3 véhicules) */}
      <ComparisonButton onClick={handleSendSelection} />

      {/* Car Preview Dialog */}
      <CarPreviewDialog
        car={previewCar}
        isOpen={!!previewCar}
        onClose={() => setPreviewCar(null)}
        onShowAvailability={() => previewCar && handleShowAvailability(previewCar.name, previewCar.city, previewCar.priceDisplay)}
        onWhatsAppClick={() => previewCar && handleWhatsAppClick(previewCar.name)}
      />

    </div>
  );
};

export default Louer;
