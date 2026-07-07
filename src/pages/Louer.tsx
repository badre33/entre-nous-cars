import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import RentalRequestForm from "@/components/RentalRequestForm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarIcon, MapPin, Car, CalendarCheck, LayoutGrid, List, Rows3, MessageCircle } from "lucide-react";
import { useComparison } from "@/contexts/ComparisonContext";
import ComparisonButton from "@/components/ComparisonButton";
import ComparisonDialog from "@/components/ComparisonDialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import { SocialProofNotification } from "@/components/SocialProofNotification";
// import { RecentBookingAlert } from "@/components/RecentBookingAlert";
import { CarCardSkeleton } from "@/components/CarCardSkeleton";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import LazyCarImage from "@/components/LazyCarImage";
import { StructuredData } from "@/components/StructuredData";
import { CarProductSchema } from "@/components/CarProductSchema";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import { HreflangTags } from "@/utils/hreflangHelper";
import { calculateDays, calculateTotalPrice, formatPrice, getDiscountPercentage } from "@/utils/priceCalculations";
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
import carClio from "@/assets/car-clio.jpg";
import carCorolla from "@/assets/car-corolla.jpg";
import carDuster from "@/assets/car-duster.jpg";
import carPeugeot208 from "@/assets/car-peugeot-208.jpg";
import carVwGolf from "@/assets/car-vw-golf.jpg";
import carHyundaiTucson from "@/assets/car-hyundai-tucson.jpg";
import carKiaSportage from "@/assets/car-kia-sportage.jpg";
import carMercedesC from "@/assets/car-mercedes-c.jpg";
import carAudiA4 from "@/assets/car-audi-a4.jpg";
import carBmwX3 from "@/assets/car-bmw-x3.jpg";
import carCitroenC3 from "@/assets/car-citroen-c3.jpg";
import carFordFocus from "@/assets/car-ford-focus.jpg";
import carNissanQashqai from "@/assets/car-nissan-qashqai.jpg";
import carSeatIbiza from "@/assets/car-seat-ibiza.jpg";
import carFiatTipo from "@/assets/car-fiat-tipo.jpg";
import carOpelCorsa from "@/assets/car-opel-corsa.jpg";
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
import carDaciaSandero from "@/assets/car-dacia-sandero.jpg";
import carDaciaLogan from "@/assets/car-dacia-logan.jpg";
import carVwTiguan from "@/assets/car-vw-tiguan.jpg";
import carVwPolo from "@/assets/car-vw-polo.jpg";
import carHyundaiI20 from "@/assets/car-hyundai-i20.jpg";
import carVwTRoc from "@/assets/car-vw-troc.jpg";
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
import carVwTroc from "@/assets/car-vw-troc.jpg";
import carPeugeot208Red from "@/assets/car-peugeot-208-red.jpg";
import carSanderoStepway from "@/assets/car-sandero-stepway.jpg";
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
import carHyundaiAccent from "@/assets/car-hyundai-accent.jpg";
import carKiaStonic from "@/assets/car-kia-stonic.jpg";
import carOpelMokka from "@/assets/car-opel-mokka.jpg";
import carNissanNote from "@/assets/car-nissan-note.jpg";
import carBmw3 from "@/assets/car-bmw-3.jpg";
import carBmw5 from "@/assets/car-bmw-5.jpg";
import carBmwX1 from "@/assets/car-bmw-x1.jpg";
import carBmwX5 from "@/assets/car-bmw-x5.jpg";
import carBmw1 from "@/assets/car-bmw-1.jpg";
import carBmwX2 from "@/assets/car-bmw-x2.jpg";
import carAudiA3 from "@/assets/car-audi-a3.jpg";
import carAudiA6 from "@/assets/car-audi-a6.jpg";
import carAudiQ3 from "@/assets/car-audi-q3.jpg";
import carAudiQ5 from "@/assets/car-audi-q5.jpg";
import carAudiQ7 from "@/assets/car-audi-q7.jpg";
import carAudiA1 from "@/assets/car-audi-a1.jpg";
import carMercedesA from "@/assets/car-mercedes-a.jpg";
import carMercedesE from "@/assets/car-mercedes-e.jpg";
import carMercedesGLA from "@/assets/car-mercedes-gla.jpg";
import carMercedesGLC from "@/assets/car-mercedes-glc.jpg";
import carMercedesGLE from "@/assets/car-mercedes-gle.jpg";
import carMercedesCLA from "@/assets/car-mercedes-cla.jpg";
import carMercedesGLB from "@/assets/car-mercedes-glb.jpg";
import carVwJetta from "@/assets/car-vw-jetta.jpg";
import carVwArteon from "@/assets/car-vw-arteon.jpg";
import carVwTouareg from "@/assets/car-vw-touareg.jpg";
import carVwTaigo from "@/assets/car-vw-taigo.jpg";
import carVwID4 from "@/assets/car-vw-id4.jpg";
import carPeugeot5008 from "@/assets/car-peugeot-5008.jpg";
import carRenaultArkana from "@/assets/car-renault-arkana.jpg";
import carDaciaJogger from "@/assets/car-dacia-jogger.jpg";
import carToyotaCHR from "@/assets/car-toyota-chr.jpg";
import carNissanXTrail from "@/assets/car-nissan-xtrail.jpg";
import carFordPuma from "@/assets/car-ford-puma.jpg";
import carHyundaiBayon from "@/assets/car-hyundai-bayon.jpg";
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
import carPorscheMacan from "@/assets/car-porsche-macan.jpg";
import carJaguarFPace from "@/assets/car-jaguar-fpace.jpg";
import carRangeRoverEvoque from "@/assets/car-range-rover-evoque.jpg";
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
import carRangeRoverSport from "@/assets/car-range-rover-sport.jpg";
import carRangeRoverVelar from "@/assets/car-range-rover-velar.jpg";
import carAudiEtronGT from "@/assets/car-audi-etron-gt.jpg";
import carCupraFormentor from "@/assets/car-cupra-formentor.jpg";
import carHyundaiStaria from "@/assets/car-hyundai-staria.jpg";

// Helper function to generate conditions for all cars
const generateConditions = (minAge: number): string[] => {
  return ["Kilométrage illimité", `Âge minimum: ${minAge} ans`];
};

const cars = [
  {
    id: 1,
    image: carClio,
    name: "Renault Clio",
    brand: "Renault",
    type: "Automatique",
    category: "Berline",
    city: "Casablanca",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: generateConditions(23),
    badges: ["🔥 Populaire", "⚡ Disponible immédiatement"]
  },
  {
    id: 2,
    image: carClio,
    name: "Renault Clio",
    brand: "Renault",
    type: "Manuelle",
    category: "Berline",
    city: "Tanger",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 5,
    image: carDuster,
    name: "Dacia Duster",
    brand: "Dacia",
    type: "Manuelle",
    category: "SUV",
    city: "Casablanca",
    price: 400,
    priceDisplay: "400 MAD",
    conditions: generateConditions(23),
    badges: ["🔥 Populaire", "⚡ Disponible immédiatement"]
  },
  {
    id: 6,
    image: carDuster,
    name: "Dacia Duster",
    brand: "Dacia",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 480,
    priceDisplay: "480 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 9,
    image: carVwGolf,
    name: "Volkswagen Golf",
    brand: "Volkswagen",
    type: "Automatique",
    category: "Berline",
    city: "Tanger",
    price: 520,
    priceDisplay: "520 MAD",
    conditions: generateConditions(23),
    badges: ["🔥 Populaire"]
  },
  {
    id: 10,
    image: carVwGolf,
    name: "Volkswagen Golf",
    brand: "Volkswagen",
    type: "Manuelle",
    category: "Berline",
    city: "Marrakech",
    price: 520,
    priceDisplay: "520 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 11,
    image: carHyundaiTucson,
    name: "Hyundai Tucson",
    brand: "Hyundai",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 520,
    priceDisplay: "520 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 12,
    image: carHyundaiTucson,
    name: "Hyundai Tucson",
    brand: "Hyundai",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 510,
    priceDisplay: "510 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 13,
    image: carKiaSportage,
    name: "Kia Sportage",
    brand: "Kia",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 500,
    priceDisplay: "500 MAD",
    conditions: generateConditions(25),
    badges: ["⚡ Disponible immédiatement"]
  },
  {
    id: 14,
    image: carKiaSportage,
    name: "Kia Sportage",
    brand: "Kia",
    type: "Manuelle",
    category: "SUV",
    city: "Marrakech",
    price: 470,
    priceDisplay: "470 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 15,
    image: carMercedesC,
    name: "Mercedes Classe C",
    brand: "Mercedes",
    type: "Automatique",
    category: "Berline",
    city: "Casablanca",
    price: 850,
    priceDisplay: "850 MAD",
    conditions: generateConditions(28),
    badges: ["💎 Luxe"]
  },
  {
    id: 16,
    image: carMercedesC,
    name: "Mercedes Classe C",
    brand: "Mercedes",
    type: "Automatique",
    category: "Berline",
    city: "Marrakech",
    price: 880,
    priceDisplay: "880 MAD",
    conditions: generateConditions(28)
  },
  {
    id: 17,
    image: carAudiA4,
    name: "Audi A4",
    brand: "Audi",
    type: "Automatique",
    category: "Berline",
    city: "Rabat",
    price: 800,
    priceDisplay: "800 MAD",
    conditions: generateConditions(27)
  },
  {
    id: 18,
    image: carAudiA4,
    name: "Audi A4",
    brand: "Audi",
    type: "Automatique",
    category: "Berline",
    city: "Tanger",
    price: 820,
    priceDisplay: "820 MAD",
    conditions: generateConditions(27)
  },
  {
    id: 27,
    image: carSeatIbiza,
    name: "Seat Ibiza",
    brand: "Seat",
    type: "Manuelle",
    category: "Citadine",
    city: "Casablanca",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 28,
    image: carSeatIbiza,
    name: "Seat Ibiza",
    brand: "Seat",
    type: "Automatique",
    category: "Citadine",
    city: "Marrakech",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 29,
    image: carHyundaiAccent,
    name: "Hyundai Accent",
    brand: "Fiat",
    type: "Automatique",
    category: "Berline",
    city: "Rabat",
    price: 370,
    priceDisplay: "370 MAD",
    conditions: generateConditions(22)
  },
  {
    id: 30,
    image: carHyundaiAccent,
    name: "Hyundai Accent",
    brand: "Fiat",
    type: "Manuelle",
    category: "Berline",
    city: "Tanger",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: generateConditions(22)
  },
  {
    id: 33,
    image: carVwGolf,
    name: "Volkswagen Golf",
    brand: "Volkswagen",
    type: "Automatique",
    category: "Berline",
    city: "Rabat",
    price: 520,
    priceDisplay: "520 MAD",
    conditions: generateConditions(24)
  },
  {
    id: 36,
    image: carHyundaiTucson,
    name: "Hyundai Tucson",
    brand: "Toyota",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 530,
    priceDisplay: "530 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 42,
    image: carHyundaiTucson,
    name: "Hyundai Tucson",
    brand: "Toyota",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 550,
    priceDisplay: "550 MAD",
    conditions: generateConditions(26)
  },
  {
    id: 46,
    image: carDuster,
    name: "Dacia Duster",
    brand: "Renault",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 430,
    priceDisplay: "430 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 49,
    image: carDaciaSandero,
    name: "Dacia Sandero",
    brand: "Dacia",
    type: "Manuelle",
    category: "Citadine",
    city: "Rabat",
    price: 300,
    priceDisplay: "300 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 50,
    image: carDaciaLogan,
    name: "Dacia Logan",
    brand: "Dacia",
    type: "Manuelle",
    category: "Berline",
    city: "Tanger",
    price: 300,
    priceDisplay: "300 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 63,
    image: carClio,
    name: "Renault Clio",
    brand: "Renault",
    type: "Automatique",
    category: "Citadine",
    city: "Rabat",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: ["Caution: 4500 MAD", "270 km/jour inclus", "Âge minimum: 21 ans"]
  },
  {
    id: 64,
    image: carDuster,
    name: "Dacia Duster",
    brand: "Renault",
    type: "Manuelle",
    category: "SUV",
    city: "Marrakech",
    price: 400,
    priceDisplay: "400 MAD",
    conditions: ["Caution: 5400 MAD", "350 km/jour inclus", "Âge minimum: 23 ans"]
  },
  {
    id: 66,
    image: carDuster,
    name: "Dacia Duster",
    brand: "Dacia",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 470,
    priceDisplay: "470 MAD",
    conditions: ["Caution: 6400 MAD", "390 km/jour inclus", "Âge minimum: 24 ans"]
  },
  {
    id: 67,
    image: carSanderoStepway,
    name: "Dacia Sandero Stepway",
    brand: "Dacia",
    type: "Manuelle",
    category: "Citadine",
    city: "Rabat",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: ["Caution: 4200 MAD", "260 km/jour inclus", "Âge minimum: 21 ans"]
  },
  {
    id: 73,
    image: carHyundaiAccent,
    name: "Hyundai Accent",
    brand: "Hyundai",
    type: "Automatique",
    category: "Berline",
    city: "Casablanca",
    price: 370,
    priceDisplay: "370 MAD",
    conditions: ["Caution: 5000 MAD", "330 km/jour inclus", "Âge minimum: 22 ans"]
  },
  {
    id: 76,
    image: carClio,
    name: "Renault Clio",
    brand: "Ford",
    type: "Manuelle",
    category: "Citadine",
    city: "Marrakech",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: ["Caution: 3900 MAD", "240 km/jour inclus", "Âge minimum: 21 ans"]
  },
  {
    id: 89,
    image: carDuster,
    name: "Dacia Duster",
    brand: "Toyota",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 460,
    priceDisplay: "460 MAD",
    conditions: ["Caution: 6200 MAD", "380 km/jour inclus", "Âge minimum: 24 ans"]
  },
  {
    id: 92,
    image: carBmw5,
    name: "BMW Série 5",
    brand: "BMW",
    type: "Automatique",
    category: "Berline",
    city: "Marrakech",
    price: 950,
    priceDisplay: "950 MAD",
    conditions: ["Caution: 11000 MAD", "450 km/jour inclus", "Âge minimum: 28 ans"]
  },
  {
    id: 94,
    image: carBmwX5,
    name: "BMW X5",
    brand: "BMW",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 1100,
    priceDisplay: "1100 MAD",
    conditions: ["Caution: 13000 MAD", "500 km/jour inclus", "Âge minimum: 30 ans"]
  },
  {
    id: 97,
    image: carAudiA3,
    name: "Audi A3",
    brand: "Audi",
    type: "Automatique",
    category: "Berline",
    city: "Rabat",
    price: 720,
    priceDisplay: "720 MAD",
    conditions: ["Caution: 8600 MAD", "400 km/jour inclus", "Âge minimum: 27 ans"]
  },
  {
    id: 98,
    image: carAudiA6,
    name: "Audi A6",
    brand: "Audi",
    type: "Automatique",
    category: "Berline",
    city: "Tanger",
    price: 920,
    priceDisplay: "920 MAD",
    conditions: ["Caution: 11500 MAD", "450 km/jour inclus", "Âge minimum: 28 ans"]
  },
  {
    id: 99,
    image: carAudiQ3,
    name: "Audi Q3",
    brand: "Audi",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 760,
    priceDisplay: "760 MAD",
    conditions: ["Caution: 9000 MAD", "410 km/jour inclus", "Âge minimum: 27 ans"]
  },
  {
    id: 100,
    image: carAudiQ5,
    name: "Audi Q5",
    brand: "Audi",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 1000,
    priceDisplay: "1000 MAD",
    conditions: ["Caution: 11500 MAD", "450 km/jour inclus", "Âge minimum: 28 ans"]
  },
  {
    id: 101,
    image: carAudiQ7,
    name: "Audi Q7",
    brand: "Audi",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 1150,
    priceDisplay: "1150 MAD",
    conditions: ["Caution: 13500 MAD", "500 km/jour inclus", "Âge minimum: 30 ans"]
  },
  {
    id: 103,
    image: carMercedesA,
    name: "Mercedes Classe A",
    brand: "Mercedes",
    type: "Automatique",
    category: "Citadine",
    city: "Casablanca",
    price: 700,
    priceDisplay: "700 MAD",
    conditions: ["Caution: 8300 MAD", "390 km/jour inclus", "Âge minimum: 27 ans"]
  },
  {
    id: 104,
    image: carMercedesE,
    name: "Mercedes Classe E",
    brand: "Mercedes",
    type: "Automatique",
    category: "Berline",
    city: "Marrakech",
    price: 1050,
    priceDisplay: "1050 MAD",
    conditions: ["Caution: 12000 MAD", "500 km/jour inclus", "Âge minimum: 29 ans"]
  },
  {
    id: 105,
    image: carMercedesGLA,
    name: "Mercedes GLA",
    brand: "Mercedes",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 780,
    priceDisplay: "780 MAD",
    conditions: ["Caution: 9300 MAD", "420 km/jour inclus", "Âge minimum: 27 ans"]
  },
  {
    id: 106,
    image: carMercedesGLC,
    name: "Mercedes GLC",
    brand: "Mercedes",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 1020,
    priceDisplay: "1020 MAD",
    conditions: ["Caution: 12200 MAD", "480 km/jour inclus", "Âge minimum: 29 ans"]
  },
  {
    id: 107,
    image: carMercedesGLE,
    name: "Mercedes GLE",
    brand: "Mercedes",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 1250,
    priceDisplay: "1250 MAD",
    conditions: ["Caution: 14000 MAD", "550 km/jour inclus", "Âge minimum: 30 ans"]
  },
  {
    id: 108,
    image: carMercedesCLA,
    name: "Mercedes CLA",
    brand: "Mercedes",
    type: "Automatique",
    category: "Berline",
    city: "Marrakech",
    price: 880,
    priceDisplay: "880 MAD",
    conditions: ["Caution: 10500 MAD", "440 km/jour inclus", "Âge minimum: 28 ans"]
  },
  {
    id: 109,
    image: carMercedesGLB,
    name: "Mercedes GLB",
    brand: "Mercedes",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 820,
    priceDisplay: "820 MAD",
    conditions: ["Caution: 9700 MAD", "430 km/jour inclus", "Âge minimum: 28 ans"]
  },
  {
    id: 112,
    image: carVwTouareg,
    name: "Volkswagen Touareg",
    brand: "Volkswagen",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 950,
    priceDisplay: "950 MAD",
    conditions: ["Caution: 11500 MAD", "480 km/jour inclus", "Âge minimum: 28 ans"]
  },
  {
    id: 117,
    image: carDaciaJogger,
    name: "Dacia Jogger",
    brand: "Peugeot",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 620,
    priceDisplay: "620 MAD",
    conditions: ["Caution: 8400 MAD", "460 km/jour inclus", "Âge minimum: 26 ans"]
  },
  {
    id: 119,
    image: carDaciaJogger,
    name: "Dacia Jogger",
    brand: "Dacia",
    type: "Manuelle",
    category: "Monospace",
    city: "Casablanca",
    price: 380,
    priceDisplay: "380 MAD",
    conditions: ["Caution: 5200 MAD", "340 km/jour inclus", "Âge minimum: 23 ans"]
  },
  {
    id: 123,
    image: carHyundaiBayon,
    name: "Hyundai Bayon",
    brand: "Hyundai",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 450,
    priceDisplay: "450 MAD",
    conditions: ["Caution: 6100 MAD", "380 km/jour inclus", "Âge minimum: 24 ans"]
  },
  {
    id: 129,
    image: carHyundaiTucson,
    name: "Hyundai Tucson",
    brand: "Volkswagen",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 520,
    priceDisplay: "520 MAD",
    conditions: ["Caution: 7000 MAD", "400 km/jour inclus", "Âge minimum: 25 ans"]
  },
  {
    id: 141,
    image: carPorscheMacan,
    name: "Porsche Macan",
    brand: "Porsche",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 1900,
    priceDisplay: "1900 MAD",
    conditions: ["Caution: 28000 MAD", "550 km/jour inclus", "Âge minimum: 30 ans"]
  },
  {
    id: 143,
    image: carRangeRoverEvoque,
    name: "Range Rover Evoque",
    brand: "Land Rover",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 1700,
    priceDisplay: "1700 MAD",
    conditions: ["Caution: 24000 MAD", "550 km/jour inclus", "Âge minimum: 28 ans"]
  },
  {
    id: 148,
    image: carMercedesG,
    name: "Mercedes Classe G",
    brand: "Mercedes",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 3500,
    priceDisplay: "3500 MAD",
    conditions: ["Âge minimum: 30 ans"],
    badges: ["🌟 Nouveau", "💎 Luxe"]
  },
  {
    id: 149,
    image: carMercedesG,
    name: "Mercedes Classe G",
    brand: "Mercedes",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 3600,
    priceDisplay: "3600 MAD",
    conditions: ["Âge minimum: 30 ans"],
    badges: ["🌟 Nouveau", "💎 Luxe"]
  },
  {
    id: 154,
    image: carAudiQ8,
    name: "Audi Q8",
    brand: "Audi",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 1850,
    priceDisplay: "1850 MAD",
    conditions: ["Âge minimum: 28 ans"],
    badges: ["🌟 Nouveau", "💎 Luxe"]
  },
  {
    id: 155,
    image: carAudiQ8,
    name: "Audi Q8",
    brand: "Audi",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 1800,
    priceDisplay: "1800 MAD",
    conditions: ["Âge minimum: 28 ans"],
    badges: ["🌟 Nouveau", "💎 Luxe"]
  },
  {
    id: 158,
    image: carPorscheCayenne,
    name: "Porsche Cayenne",
    brand: "Porsche",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 2500,
    priceDisplay: "2500 MAD",
    conditions: ["Âge minimum: 30 ans"],
    badges: ["🌟 Nouveau", "💎 Luxe"]
  },
  {
    id: 159,
    image: carPorscheCayenne,
    name: "Porsche Cayenne",
    brand: "Porsche",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 2600,
    priceDisplay: "2600 MAD",
    conditions: ["Âge minimum: 30 ans"],
    badges: ["🌟 Nouveau", "💎 Luxe"]
  },
  {
    id: 164,
    image: carRangeRoverSport,
    name: "Range Rover Sport",
    brand: "Land Rover",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 2100,
    priceDisplay: "2100 MAD",
    conditions: ["Âge minimum: 28 ans"],
    badges: ["🌟 Nouveau", "💎 Luxe"]
  },
  {
    id: 165,
    image: carRangeRoverSport,
    name: "Range Rover Sport",
    brand: "Land Rover",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 2200,
    priceDisplay: "2200 MAD",
    conditions: ["Âge minimum: 28 ans"],
    badges: ["🌟 Nouveau", "💎 Luxe"]
  },
  {
    id: 168,
    image: carClio,
    name: "Renault Clio",
    brand: "Renault",
    type: "Manuelle",
    category: "Berline",
    city: "Agadir",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: generateConditions(21),
    badges: ["🔥 Populaire"]
  },
  {
    id: 169,
    image: carDaciaSandero,
    name: "Dacia Sandero",
    brand: "Dacia",
    type: "Manuelle",
    category: "Berline",
    city: "Agadir",
    price: 300,
    priceDisplay: "300 MAD",
    conditions: generateConditions(21),
    badges: ["💰 Prix attractif"]
  },
  {
    id: 170,
    image: carDuster,
    name: "Dacia Duster",
    brand: "Dacia",
    type: "Manuelle",
    category: "SUV",
    city: "Agadir",
    price: 400,
    priceDisplay: "400 MAD",
    conditions: generateConditions(23),
    badges: ["🔥 Populaire"]
  },
  {
    id: 176,
    image: carDuster,
    name: "Dacia Duster",
    brand: "Renault",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 480,
    priceDisplay: "480 MAD",
    conditions: generateConditions(23),
    badges: ["🔥 Populaire"]
  },
  {
    id: 178,
    image: carHyundaiTucson,
    name: "Hyundai Tucson",
    brand: "Hyundai",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 600,
    priceDisplay: "600 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 179,
    image: carKiaSportage,
    name: "Kia Sportage",
    brand: "Kia",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 620,
    priceDisplay: "620 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 182,
    image: carVwGolf,
    name: "VW Golf",
    brand: "Volkswagen",
    type: "Automatique",
    category: "Berline",
    city: "Agadir",
    price: 520,
    priceDisplay: "520 MAD",
    conditions: generateConditions(23),
    badges: ["🔥 Populaire"]
  },
  {
    id: 184,
    image: carVwGolf,
    name: "Volkswagen Golf",
    brand: "Volkswagen",
    type: "Automatique",
    category: "Berline",
    city: "Agadir",
    price: 520,
    priceDisplay: "520 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 185,
    image: carHyundaiTucson,
    name: "Hyundai Tucson",
    brand: "Toyota",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 650,
    priceDisplay: "650 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 186,
    image: carClio,
    name: "Renault Clio",
    brand: "Renault",
    type: "Manuelle",
    category: "Berline",
    city: "Fès",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: generateConditions(21),
    badges: ["🔥 Populaire"]
  },
  {
    id: 187,
    image: carDaciaSandero,
    name: "Dacia Sandero",
    brand: "Dacia",
    type: "Manuelle",
    category: "Berline",
    city: "Fès",
    price: 300,
    priceDisplay: "300 MAD",
    conditions: generateConditions(21),
    badges: ["💰 Prix attractif"]
  },
  {
    id: 188,
    image: carDuster,
    name: "Dacia Duster",
    brand: "Dacia",
    type: "Automatique",
    category: "SUV",
    city: "Fès",
    price: 420,
    priceDisplay: "420 MAD",
    conditions: generateConditions(23),
    badges: ["🔥 Populaire"]
  },
  {
    id: 194,
    image: carDuster,
    name: "Dacia Duster",
    brand: "Renault",
    type: "Automatique",
    category: "SUV",
    city: "Fès",
    price: 470,
    priceDisplay: "470 MAD",
    conditions: generateConditions(23),
    badges: ["🔥 Populaire"]
  },
  {
    id: 199,
    image: carClio,
    name: "Renault Clio",
    brand: "Ford",
    type: "Manuelle",
    category: "Citadine",
    city: "Fès",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 203,
    image: carSeatIbiza,
    name: "Seat Ibiza",
    brand: "Seat",
    type: "Automatique",
    category: "Citadine",
    city: "Rabat",
    price: 380,
    priceDisplay: "380 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 217,
    image: carDuster,
    name: "Dacia Duster",
    brand: "Renault",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 480,
    priceDisplay: "480 MAD",
    conditions: generateConditions(23),
    badges: ["🔥 Populaire"]
  },
  {
    id: 219,
    image: carDuster,
    name: "Dacia Duster",
    brand: "Toyota",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 520,
    priceDisplay: "520 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 233,
    image: carHyundaiTucson,
    name: "Hyundai Tucson",
    brand: "Hyundai",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 600,
    priceDisplay: "600 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 234,
    image: carKiaSportage,
    name: "Kia Sportage",
    brand: "Kia",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 620,
    priceDisplay: "620 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 237,
    image: carDuster,
    name: "Dacia Duster",
    brand: "Renault",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 490,
    priceDisplay: "490 MAD",
    conditions: generateConditions(23),
    badges: ["🔥 Populaire"]
  },
  {
    id: 242,
    image: carVwGolf,
    name: "VW Golf",
    brand: "Volkswagen",
    type: "Automatique",
    category: "Berline",
    city: "Tanger",
    price: 520,
    priceDisplay: "520 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 250,
    image: carHyundaiTucson,
    name: "Hyundai Tucson",
    brand: "Toyota",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 630,
    priceDisplay: "630 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 254,
    image: carDaciaJogger,
    name: "Dacia Jogger",
    brand: "Peugeot",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 720,
    priceDisplay: "720 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 255,
    image: carDaciaJogger,
    name: "Dacia Jogger",
    brand: "Dacia",
    type: "Manuelle",
    category: "Monospace",
    city: "Agadir",
    price: 450,
    priceDisplay: "450 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 256,
    image: carHyundaiBayon,
    name: "Hyundai Bayon",
    brand: "Hyundai",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 510,
    priceDisplay: "510 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 261,
    image: carHyundaiTucson,
    name: "Hyundai Tucson",
    brand: "Volkswagen",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 620,
    priceDisplay: "620 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 265,
    image: carHyundaiTucson,
    name: "Hyundai Tucson",
    brand: "Hyundai",
    type: "Automatique",
    category: "SUV",
    city: "Fès",
    price: 590,
    priceDisplay: "590 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 266,
    image: carKiaSportage,
    name: "Kia Sportage",
    brand: "Kia",
    type: "Automatique",
    category: "SUV",
    city: "Fès",
    price: 610,
    priceDisplay: "610 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 268,
    image: carVwGolf,
    name: "VW Golf",
    brand: "Volkswagen",
    type: "Automatique",
    category: "Berline",
    city: "Fès",
    price: 520,
    priceDisplay: "520 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 271,
    image: carVwGolf,
    name: "Volkswagen Golf",
    brand: "Volkswagen",
    type: "Automatique",
    category: "Berline",
    city: "Fès",
    price: 520,
    priceDisplay: "520 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 276,
    image: carHyundaiTucson,
    name: "Hyundai Tucson",
    brand: "Toyota",
    type: "Automatique",
    category: "SUV",
    city: "Fès",
    price: 640,
    priceDisplay: "640 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 286,
    image: carRangeRoverEvoque,
    name: "Range Rover Evoque",
    brand: "Land Rover",
    type: "Automatique",
    category: "SUV Premium",
    city: "Rabat",
    price: 1100,
    priceDisplay: "1100 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 288,
    image: carPorscheMacan,
    name: "Porsche Macan",
    brand: "Porsche",
    type: "Automatique",
    category: "SUV Premium",
    city: "Casablanca",
    price: 1300,
    priceDisplay: "1300 MAD",
    conditions: generateConditions(25),
    badges: ["👑 Véhicule Premium"]
  },
  {
    id: 296,
    image: carPorscheCayenne,
    name: "Porsche Cayenne",
    brand: "Porsche",
    type: "Automatique",
    category: "SUV Premium",
    city: "Casablanca",
    price: 1900,
    priceDisplay: "1900 MAD",
    conditions: generateConditions(25),
    badges: ["👑 Véhicule Premium"]
  },
  {
    id: 298,
    image: carRangeRoverSport,
    name: "Range Rover Sport",
    brand: "Land Rover",
    type: "Automatique",
    category: "SUV Premium",
    city: "Marrakech",
    price: 1850,
    priceDisplay: "1850 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 300,
    image: carMercedesG,
    name: "Mercedes Classe G",
    brand: "Mercedes-Benz",
    type: "Automatique",
    category: "SUV Premium",
    city: "Casablanca",
    price: 2800,
    priceDisplay: "2800 MAD",
    conditions: generateConditions(25),
    badges: ["👑 Véhicule Premium", "🔥 Populaire"]
  },
  {
    id: 303,
    image: carAudiQ8,
    name: "Audi Q8",
    brand: "Audi",
    type: "Automatique",
    category: "SUV Premium",
    city: "Casablanca",
    price: 1500,
    priceDisplay: "1500 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 304,
    image: carCupraFormentor,
    name: "Cupra Formentor",
    brand: "Cupra",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 750,
    priceDisplay: "750 MAD",
    conditions: generateConditions(25),
    badges: ["⭐ Premium SUV", "🔥 Nouveau"]
  },
  {
    id: 305,
    image: carCupraFormentor,
    name: "Cupra Formentor",
    brand: "Cupra",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 780,
    priceDisplay: "780 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 308,
    image: carHyundaiStaria,
    name: "Hyundai Staria",
    brand: "Hyundai",
    type: "Automatique",
    category: "Van 9 places",
    city: "Casablanca",
    price: 1200,
    priceDisplay: "1200 MAD",
    conditions: generateConditions(28),
    badges: ["👨‍👩‍👧‍👦 9 places", "✨ Van premium"]
  },
  {
    id: 309,
    image: carHyundaiStaria,
    name: "Hyundai Staria",
    brand: "Hyundai",
    type: "Automatique",
    category: "Van 9 places",
    city: "Marrakech",
    price: 1250,
    priceDisplay: "1250 MAD",
    conditions: generateConditions(28)
  },
  {
    id: 310,
    image: carOpelCorsa,
    name: "Opel Corsa",
    brand: "Opel",
    type: "Manuelle",
    category: "Citadine",
    city: "Casablanca",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: generateConditions(21),
    badges: ["💰 Économique"]
  },
  {
    id: 311,
    image: carOpelCorsa,
    name: "Opel Corsa",
    brand: "Opel",
    type: "Manuelle",
    category: "Citadine",
    city: "Marrakech",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 312,
    image: carPeugeot208,
    name: "Peugeot 208",
    brand: "Peugeot",
    type: "Manuelle",
    category: "Citadine",
    city: "Casablanca",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: generateConditions(21),
    badges: ["💰 Économique"]
  },
  {
    id: 313,
    image: carPeugeot208,
    name: "Peugeot 208",
    brand: "Peugeot",
    type: "Manuelle",
    category: "Citadine",
    city: "Marrakech",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 320, image: carHyundaiI20, name: "Hyundai i20", brand: "Hyundai", type: "Manuelle",
    category: "Citadine", city: "Casablanca", price: 320, priceDisplay: "320 MAD",
    conditions: generateConditions(21), badges: ["💰 Économique"]
  },
  {
    id: 321, image: carHyundaiI20, name: "Hyundai i20", brand: "Hyundai", type: "Manuelle",
    category: "Citadine", city: "Marrakech", price: 330, priceDisplay: "330 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 322, image: carVwTRoc, name: "Volkswagen T-Roc", brand: "Volkswagen", type: "Automatique",
    category: "SUV Compact", city: "Casablanca", price: 510, priceDisplay: "510 MAD",
    conditions: generateConditions(23), badges: ["⚡ Disponible immédiatement"]
  },
  {
    id: 323, image: carVwTRoc, name: "Volkswagen T-Roc", brand: "Volkswagen", type: "Automatique",
    category: "SUV Compact", city: "Marrakech", price: 540, priceDisplay: "540 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 324, image: carHyundaiSantaFe, name: "Hyundai Santa Fe", brand: "Hyundai", type: "Automatique",
    category: "SUV 7 places", city: "Casablanca", price: 820, priceDisplay: "820 MAD",
    conditions: generateConditions(25), badges: ["👨‍👩‍👧‍👦 7 places", "🔥 Premium familial"]
  },
  {
    id: 325, image: carHyundaiSantaFe, name: "Hyundai Santa Fe", brand: "Hyundai", type: "Automatique",
    category: "SUV 7 places", city: "Marrakech", price: 850, priceDisplay: "850 MAD",
    conditions: generateConditions(25)
  }
];

const Louer = () => {

  // WORKAROUND react-helmet-async: force-set document.title, meta description,
  // canonical and OG tags via direct DOM API. Helmet leaks default values.
  useEffect(() => {
    document.title = "Location Voiture Maroc dès 300 DH/jour - 300+ Véhicules | Benatna";
    const setMeta = (selector: string, attr: string, value: string, key: string, keyVal: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement(selector.includes('link') ? 'link' : 'meta');
        el.setAttribute(key, keyVal);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', "300+ véhicules disponibles à la location au Maroc dès 300 DH/jour. Casablanca, Marrakech, Rabat, Tanger, Agadir, Fès. Sans carte de crédit, WhatsApp.", 'name', 'description');
    setMeta('link[rel="canonical"]', 'href', "https://benatna.ma/louer", 'rel', 'canonical');
    setMeta('meta[property="og:title"]', 'content', "Location Voiture Maroc dès 300 DH/jour - 300+ Véhicules | Benatna", 'property', 'og:title');
    setMeta('meta[property="og:description"]', 'content', "300+ véhicules disponibles à la location au Maroc dès 300 DH/jour. Casablanca, Marrakech, Rabat, Tanger, Agadir, Fès. Sans carte de crédit, WhatsApp.", 'property', 'og:description');
    setMeta('meta[property="og:url"]', 'content', "https://benatna.ma/louer", 'property', 'og:url');
  }, []);
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [rentalFormCar, setRentalFormCar] = useState<{ name: string; slug?: string; city: string } | null>(null);
  const [showAvailability, setShowAvailability] = useState(false);
  const [selectedCar, setSelectedCar] = useState<{ name: string; city: string; price: string } | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid' | 'list'>('grid');
  const { addToComparison, removeFromComparison, isInComparison } = useComparison();
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
      setSelectedCity(cityFromUrl);
    }
    if (startDateFromUrl) {
      setStartDate(new Date(startDateFromUrl));
    }
    if (endDateFromUrl) {
      setEndDate(new Date(endDateFromUrl));
    }
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setParallaxOffset(offset * 0.5);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = (carName: string, city: string, priceDisplay: string) => {
    // Open structured rental request form (captures lead in DB before WhatsApp)
    const slug = carName.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/é|è|ê/g, 'e').replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    setRentalFormCar({ name: carName, slug, city });
    
    // Keep confetti for the wow effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffda00', '#d0f690', '#048592']
    });
    
    // Track legacy event
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      return;
      
      // Construire le message avec les dates si disponibles
      let message = `Bonjour, je suis intéressé par ${carName} à ${city} (${priceDisplay}/jour)`;
      
      if (startDate && endDate) {
        const dateDebut = format(startDate, "dd/MM/yyyy");
        const dateFin = format(endDate, "dd/MM/yyyy");
        const days = calculateDays(startDate, endDate);
        const basePrice = parseInt(priceDisplay.replace(/[^\d]/g, ''));
        const totalPrice = formatPrice(calculateTotalPrice(basePrice, days));
        const discount = getDiscountPercentage(days);
        
        message += `\nDates souhaitées : du ${dateDebut} au ${dateFin} (${days} jour${days > 1 ? 's' : ''})`;
        if (discount > 0) {
          message += `\n🎉 Réduction : -${discount}% (location longue durée)`;
        }
        message += `\n💰 Prix total : ${totalPrice}`;
      }
      
      window.open(
        `https://wa.me/212699024526?text=${encodeURIComponent(message)}`,
        '_blank'
      );
    }, 800);
  };

  const handleShowAvailability = (carName: string, city: string, priceDisplay: string) => {
    setSelectedCar({ name: carName, city, price: priceDisplay });
    setShowAvailability(true);
  };

  const handleSelectDates = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
    setShowAvailability(false);
    
    // Envoyer automatiquement sur WhatsApp avec les dates
    if (selectedCar) {
      // Animation confettis
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffda00', '#d0f690', '#048592']
      });
      
      // Toast de confirmation
      toast({
        title: "Dates sélectionnées !",
        description: `Du ${format(start, "dd/MM/yyyy", { locale: fr })} au ${format(end, "dd/MM/yyyy", { locale: fr })}`,
      });
      
      // Construire le message WhatsApp optimisé pour la conversion
      setTimeout(() => {
        const dateDebut = format(start, "dd/MM/yyyy", { locale: fr });
        const dateFin = format(end, "dd/MM/yyyy", { locale: fr });
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        const basePrice = parseInt(selectedCar.price.replace(/[^\d]/g, ''));
        // Utilise le moteur dynamique (saison + événement + durée)
        const dailyPrice = calculateDailyPrice(basePrice, days, { date: start });
        const totalPrice = formatPrice(dailyPrice * days);
        const discount = getDiscountPercentage(days);

        let message = `🚗 *DEMANDE DE RÉSERVATION*

Véhicule : ${selectedCar.name}
📍 Ville : ${selectedCar.city}
📅 Du ${dateDebut} au ${dateFin} (${days} jour${days > 1 ? 's' : ''})
💰 Tarif : ${dailyPrice} DH/jour`;

        if (discount > 0) {
          message += `\n🎉 Réduction : -${discount}% (location longue durée)`;
        }

        message += `\n💵 Prix total : ${totalPrice}

Je souhaite réserver ce véhicule pour ces dates. Merci de me confirmer rapidement la disponibilité.`;

        window.open(
          `https://wa.me/212699024526?text=${encodeURIComponent(message)}`,
          '_blank'
        );
      }, 500);
    }
  };

  const cities = ["Casablanca", "Marrakech", "Rabat", "Tanger", "Agadir", "Fès"];
  
  // Toutes les marques de véhicules
  const brands = [
    "Audi", "BMW", "Mercedes", "Maserati", "Porsche", "Jaguar", "Land Rover", "Lexus", "Volvo",
    "Renault", "Peugeot", "Citroën", "Dacia",
    "Toyota", "Nissan", "Honda", "Hyundai", "Kia", "Toyota", "Suzuki", "Toyota",
    "Volkswagen", "Opel", "Ford", "Fiat", "Seat", "Volkswagen",
    "Chevrolet"
  ].sort();
  
  // Toutes les catégories de véhicules
  const categories = [
    "Berline", "SUV", "Citadine", "Monospace", "4x4", "Break", "Utilitaire", "Cabriolet", "Coupé"
  ].sort();
  
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
      if (selectedCity && selectedCity !== "all" && car.city !== selectedCity) return false;
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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Social Proof Notifications - Temporairement désactivées
      <SocialProofNotification />
      <RecentBookingAlert />
      */}
      
      <Helmet>
        <title>Location Voiture Maroc dès 300 DH/jour - 300+ Véhicules | Benatna</title>
        <meta name="description" content="Comparez et réservez votre voiture de location au Maroc. 300+ véhicules disponibles à Casablanca, Marrakech, Rabat. Prix transparents, réservation en 2 min." />
        <meta name="keywords" content="location voiture maroc, louer auto casablanca, rent car marrakech, voiture tourisme maroc, location véhicule rabat, agence location tanger" />
        <link rel="canonical" href="https://benatna.ma/louer" />
      </Helmet>
      <HreflangTags path="/louer" />
      <StructuredData type="rental" />
      <CarProductSchema cars={displayedCars.slice(0, 20)} />
      <PullToRefreshIndicator 
        isPulling={isPulling}
        isRefreshing={isRefreshing}
        pullDistance={pullDistance}
        pullPercentage={pullPercentage}
      />
      <Header />
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
      <section className="py-8 md:py-20 pb-32 md:pb-20">
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
          <div className="md:hidden mb-8">
            {displayedCars.length === 0 ? (
              <>
                {viewMode === 'carousel' && (
                  <Carousel
                    opts={{
                      align: "start",
                      loop: false,
                    }}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-2">
                      {[...Array(6)].map((_, i) => (
                        <CarouselItem key={i} className="pl-2 basis-[90%]">
                          <CarCardSkeleton viewMode="carousel" />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                )}

                {viewMode === 'grid' && (
                  <div className="grid grid-cols-2 gap-3">
                    {[...Array(6)].map((_, i) => (
                      <CarCardSkeleton key={i} viewMode="grid" />
                    ))}
                  </div>
                )}

                {viewMode === 'list' && (
                  <div className="space-y-0">
                    {[...Array(6)].map((_, i) => (
                      <CarCardSkeleton key={i} viewMode="list" />
                    ))}
                  </div>
                )}
              </>
            ) : (
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
                        {displayedCars.map((car) => (
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
                              onWhatsAppClick={() => handleWhatsAppClick(car.name, car.city, car.priceDisplay)}
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
                        👆 Glissez pour voir • 👇 Swipe vers le bas pour fermer • 👈 Swipe pour comparer • 🤚 Maintenez pour preview
                      </p>
                    </div>
                  </>
                )}

                {viewMode === 'grid' && (
                  <div className="grid grid-cols-2 gap-3">
                    {displayedCars.map((car) => (
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
                        onWhatsAppClick={() => handleWhatsAppClick(car.name, car.city, car.priceDisplay)}
                        onPreview={() => setPreviewCar(car)}
                      />
                    ))}
                  </div>
                )}

                {viewMode === 'list' && (
                  <div className="space-y-0">
                    {displayedCars.map((car) => (
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
                        onWhatsAppClick={() => handleWhatsAppClick(car.name, car.city, car.priceDisplay)}
                        onPreview={() => setPreviewCar(car)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedCars.map((car) => (
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
                onWhatsAppClick={() => handleWhatsAppClick(car.name, car.city, car.priceDisplay)}
                onPreview={() => setPreviewCar(car)}
              />
            ))}
          </div>
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
        label="Contacter via WhatsApp"
        onClick={() => {
          const message = `Bonjour, je suis intéressé par la location d'un véhicule${selectedCity !== "all" ? ` à ${selectedCity}` : ""}.`;
          window.open(`https://wa.me/212699024526?text=${encodeURIComponent(message)}`, '_blank');
        }}
        icon={MessageCircle}
      />
      
      {/* Comparison Button */}
      <ComparisonButton onClick={() => setShowComparison(true)} />
      
      {/* Comparison Dialog */}
      <ComparisonDialog open={showComparison} onOpenChange={setShowComparison} />
      
      {/* Car Preview Dialog */}
      <CarPreviewDialog
        car={previewCar}
        isOpen={!!previewCar}
        onClose={() => setPreviewCar(null)}
        onShowAvailability={() => previewCar && handleShowAvailability(previewCar.name, previewCar.city, previewCar.priceDisplay)}
        onWhatsAppClick={() => previewCar && handleWhatsAppClick(previewCar.name, previewCar.city, previewCar.priceDisplay)}
      />

      <RentalRequestForm
        open={!!rentalFormCar}
        onOpenChange={(o) => !o && setRentalFormCar(null)}
        vehicleName={rentalFormCar?.name}
        vehicleSlug={rentalFormCar?.slug}
        defaultCity={rentalFormCar?.city}
      />
    </div>
  );
};

export default Louer;
