import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
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
import { CarCardSkeleton } from "@/components/CarCardSkeleton";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import LazyCarImage from "@/components/LazyCarImage";
import { StructuredData } from "@/components/StructuredData";
import { CarProductSchema } from "@/components/CarProductSchema";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import { calculateDays, calculateTotalPrice, calculateDailyPrice, formatPrice } from "@/utils/priceCalculations";
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

// Helper function to generate conditions for all cars
const generateConditions = (minAge: number): string[] => {
  return ["Kilométrage illimité", `Âge minimum: ${minAge} ans`];
};

const cars = [
  // Renault
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
    price: 320,
    priceDisplay: "320 MAD",
    conditions: generateConditions(21)
  },
  
  // Toyota
  {
    id: 3,
    image: carCorolla,
    name: "Toyota Corolla",
    brand: "Toyota",
    type: "Automatique",
    category: "Berline",
    city: "Marrakech",
    price: 450,
    priceDisplay: "450 MAD",
    conditions: generateConditions(25),
    badges: ["🔥 Populaire"]
  },
  {
    id: 4,
    image: carCorolla,
    name: "Toyota Corolla",
    brand: "Toyota",
    type: "Automatique",
    category: "Berline",
    city: "Rabat",
    price: 460,
    priceDisplay: "460 MAD",
    conditions: generateConditions(25)
  },
  
  // Dacia
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
  
  // Peugeot
  {
    id: 7,
    image: carPeugeot208,
    name: "Peugeot 208",
    brand: "Peugeot",
    type: "Automatique",
    category: "Citadine",
    city: "Casablanca",
    price: 340,
    priceDisplay: "340 MAD",
    conditions: generateConditions(21),
    badges: ["🔥 Populaire", "⚡ Disponible immédiatement"]
  },
  {
    id: 8,
    image: carPeugeot208,
    name: "Peugeot 208",
    brand: "Peugeot",
    type: "Manuelle",
    category: "Citadine",
    city: "Rabat",
    price: 310,
    priceDisplay: "310 MAD",
    conditions: generateConditions(21)
  },
  
  // Volkswagen
  {
    id: 9,
    image: carVwGolf,
    name: "Volkswagen Golf",
    brand: "Volkswagen",
    type: "Automatique",
    category: "Berline",
    city: "Tanger",
    price: 420,
    priceDisplay: "420 MAD",
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
    price: 390,
    priceDisplay: "390 MAD",
    conditions: generateConditions(23)
  },
  
  // Hyundai
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
  
  // Kia
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
  
  // Mercedes
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
  
  // Audi
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
  
  // BMW
  {
    id: 19,
    image: carBmwX3,
    name: "BMW X3",
    brand: "BMW",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 950,
    priceDisplay: "950 MAD",
    conditions: generateConditions(28)
  },
  {
    id: 20,
    image: carBmwX3,
    name: "BMW X3",
    brand: "BMW",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 970,
    priceDisplay: "970 MAD",
    conditions: generateConditions(28)
  },
  
  // Citroën
  {
    id: 21,
    image: carCitroenC3,
    name: "Citroën C3",
    brand: "Citroën",
    type: "Manuelle",
    category: "Citadine",
    city: "Rabat",
    price: 300,
    priceDisplay: "300 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 22,
    image: carCitroenC3,
    name: "Citroën C3",
    brand: "Citroën",
    type: "Automatique",
    category: "Citadine",
    city: "Tanger",
    price: 330,
    priceDisplay: "330 MAD",
    conditions: generateConditions(21)
  },
  
  // Ford
  {
    id: 23,
    image: carFordFocus,
    name: "Ford Focus",
    brand: "Ford",
    type: "Automatique",
    category: "Berline",
    city: "Casablanca",
    price: 380,
    priceDisplay: "380 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 24,
    image: carFordFocus,
    name: "Ford Focus",
    brand: "Ford",
    type: "Manuelle",
    category: "Berline",
    city: "Marrakech",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: generateConditions(22)
  },
  
  // Nissan
  {
    id: 25,
    image: carNissanQashqai,
    name: "Nissan Qashqai",
    brand: "Nissan",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 490,
    priceDisplay: "490 MAD",
    conditions: generateConditions(24)
  },
  {
    id: 26,
    image: carNissanQashqai,
    name: "Nissan Qashqai",
    brand: "Nissan",
    type: "Manuelle",
    category: "SUV",
    city: "Tanger",
    price: 460,
    priceDisplay: "460 MAD",
    conditions: generateConditions(23)
  },
  
  // Seat
  {
    id: 27,
    image: carSeatIbiza,
    name: "Seat Ibiza",
    brand: "Seat",
    type: "Manuelle",
    category: "Citadine",
    city: "Casablanca",
    price: 290,
    priceDisplay: "290 MAD",
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
    price: 320,
    priceDisplay: "320 MAD",
    conditions: generateConditions(21)
  },
  
  // Fiat
  {
    id: 29,
    image: carFiatTipo,
    name: "Fiat Tipo",
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
    image: carFiatTipo,
    name: "Fiat Tipo",
    brand: "Fiat",
    type: "Manuelle",
    category: "Berline",
    city: "Tanger",
    price: 340,
    priceDisplay: "340 MAD",
    conditions: generateConditions(22)
  },
  
  // Opel
  {
    id: 31,
    image: carOpelCorsa,
    name: "Opel Corsa",
    brand: "Opel",
    type: "Manuelle",
    category: "Citadine",
    city: "Casablanca",
    price: 310,
    priceDisplay: "310 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 32,
    image: carOpelAstra,
    name: "Opel Astra",
    brand: "Opel",
    type: "Automatique",
    category: "Berline",
    city: "Marrakech",
    price: 380,
    priceDisplay: "380 MAD",
    conditions: generateConditions(23)
  },
  
  // Skoda
  {
    id: 33,
    image: carSkodaOctavia,
    name: "Skoda Octavia",
    brand: "Skoda",
    type: "Automatique",
    category: "Berline",
    city: "Rabat",
    price: 440,
    priceDisplay: "440 MAD",
    conditions: generateConditions(24)
  },
  {
    id: 34,
    image: carSkodaFabia,
    name: "Skoda Fabia",
    brand: "Skoda",
    type: "Manuelle",
    category: "Citadine",
    city: "Tanger",
    price: 315,
    priceDisplay: "315 MAD",
    conditions: generateConditions(21)
  },
  
  // Mazda
  {
    id: 35,
    image: carMazda3,
    name: "Mazda 3",
    brand: "Mazda",
    type: "Automatique",
    category: "Berline",
    city: "Casablanca",
    price: 430,
    priceDisplay: "430 MAD",
    conditions: generateConditions(24)
  },
  {
    id: 36,
    image: carMazdaCX5,
    name: "Mazda CX-5",
    brand: "Mazda",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 530,
    priceDisplay: "530 MAD",
    conditions: generateConditions(25)
  },
  
  // Honda
  {
    id: 37,
    image: carHondaCivic,
    name: "Honda Civic",
    brand: "Honda",
    type: "Automatique",
    category: "Berline",
    city: "Rabat",
    price: 470,
    priceDisplay: "470 MAD",
    conditions: generateConditions(24)
  },
  {
    id: 38,
    image: carHondaCRV,
    name: "Honda CR-V",
    brand: "Honda",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 540,
    priceDisplay: "540 MAD",
    conditions: generateConditions(25)
  },
  
  // Suzuki
  {
    id: 39,
    image: carSuzukiSwift,
    name: "Suzuki Swift",
    brand: "Suzuki",
    type: "Manuelle",
    category: "Citadine",
    city: "Casablanca",
    price: 295,
    priceDisplay: "295 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 40,
    image: carSuzukiVitara,
    name: "Suzuki Vitara",
    brand: "Suzuki",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 440,
    priceDisplay: "440 MAD",
    conditions: generateConditions(23)
  },
  
  // Mitsubishi
  {
    id: 41,
    image: carMitsubishiLancer,
    name: "Mitsubishi Lancer",
    brand: "Mitsubishi",
    type: "Automatique",
    category: "Berline",
    city: "Rabat",
    price: 410,
    priceDisplay: "410 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 42,
    image: carMitsubishiOutlander,
    name: "Mitsubishi Outlander",
    brand: "Mitsubishi",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 550,
    priceDisplay: "550 MAD",
    conditions: generateConditions(26)
  },
  
  // Chevrolet
  {
    id: 43,
    image: carChevroletAveo,
    name: "Chevrolet Aveo",
    brand: "Chevrolet",
    type: "Manuelle",
    category: "Citadine",
    city: "Casablanca",
    price: 305,
    priceDisplay: "305 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 44,
    image: carChevroletCaptiva,
    name: "Chevrolet Captiva",
    brand: "Chevrolet",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 560,
    priceDisplay: "560 MAD",
    conditions: generateConditions(26)
  },
  
  // Renault (autres modèles)
  {
    id: 45,
    image: carRenaultMegane,
    name: "Renault Megane",
    brand: "Renault",
    type: "Automatique",
    category: "Berline",
    city: "Rabat",
    price: 390,
    priceDisplay: "390 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 46,
    image: carRenaultCaptur,
    name: "Renault Captur",
    brand: "Renault",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 430,
    priceDisplay: "430 MAD",
    conditions: generateConditions(23)
  },
  
  // Peugeot (autres modèles)
  {
    id: 47,
    image: carPeugeot3008,
    name: "Peugeot 3008",
    brand: "Peugeot",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 540,
    priceDisplay: "540 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 48,
    image: carPeugeot308,
    name: "Peugeot 308",
    brand: "Peugeot",
    type: "Automatique",
    category: "Berline",
    city: "Marrakech",
    price: 400,
    priceDisplay: "400 MAD",
    conditions: generateConditions(23)
  },
  
  // Dacia (autres modèles)
  {
    id: 49,
    image: carDaciaSandero,
    name: "Dacia Sandero",
    brand: "Dacia",
    type: "Manuelle",
    category: "Citadine",
    city: "Rabat",
    price: 280,
    priceDisplay: "280 MAD",
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
    price: 310,
    priceDisplay: "310 MAD",
    conditions: generateConditions(21)
  },
  
  // Volkswagen (autres modèles)
  {
    id: 51,
    image: carVwTiguan,
    name: "Volkswagen Tiguan",
    brand: "Volkswagen",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 580,
    priceDisplay: "580 MAD",
    conditions: generateConditions(26)
  },
  {
    id: 52,
    image: carVwPolo,
    name: "Volkswagen Polo",
    brand: "Volkswagen",
    type: "Manuelle",
    category: "Citadine",
    city: "Marrakech",
    price: 325,
    priceDisplay: "325 MAD",
    conditions: generateConditions(21)
  },
  
  // Hyundai (autres modèles)
  {
    id: 53,
    image: carHyundaiI20,
    name: "Hyundai i20",
    brand: "Hyundai",
    type: "Manuelle",
    category: "Citadine",
    city: "Rabat",
    price: 305,
    priceDisplay: "305 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 54,
    image: carHyundaiElantra,
    name: "Hyundai Elantra",
    brand: "Hyundai",
    type: "Automatique",
    category: "Berline",
    city: "Tanger",
    price: 450,
    priceDisplay: "450 MAD",
    conditions: generateConditions(24)
  },
  
  // Kia (autres modèles)
  {
    id: 55,
    image: carKiaPicanto,
    name: "Kia Picanto",
    brand: "Kia",
    type: "Manuelle",
    category: "Citadine",
    city: "Casablanca",
    price: 285,
    priceDisplay: "285 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 56,
    image: carKiaRio,
    name: "Kia Rio",
    brand: "Kia",
    type: "Automatique",
    category: "Berline",
    city: "Marrakech",
    price: 360,
    priceDisplay: "360 MAD",
    conditions: ["Caution: 4900 MAD", "320 km/jour inclus", "Âge minimum: 22 ans"]
  },
  
  // Nissan (autres modèles)
  {
    id: 57,
    image: carNissanMicra,
    name: "Nissan Micra",
    brand: "Nissan",
    type: "Manuelle",
    category: "Citadine",
    city: "Rabat",
    price: 295,
    priceDisplay: "295 MAD",
    conditions: ["Caution: 3900 MAD", "240 km/jour inclus", "Âge minimum: 21 ans"]
  },
  {
    id: 58,
    image: carNissanSunny,
    name: "Nissan Sunny",
    brand: "Nissan",
    type: "Automatique",
    category: "Berline",
    city: "Tanger",
    price: 365,
    priceDisplay: "365 MAD",
    conditions: ["Caution: 5000 MAD", "320 km/jour inclus", "Âge minimum: 22 ans"]
  },
  
  // Toyota (autres modèles)
  {
    id: 59,
    image: carToyotaYaris,
    name: "Toyota Yaris",
    brand: "Toyota",
    type: "Automatique",
    category: "Citadine",
    city: "Casablanca",
    price: 355,
    priceDisplay: "355 MAD",
    conditions: ["Caution: 4800 MAD", "290 km/jour inclus", "Âge minimum: 22 ans"]
  },
  {
    id: 60,
    image: carToyotaRAV4,
    name: "Toyota RAV4",
    brand: "Toyota",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 600,
    priceDisplay: "600 MAD",
    conditions: ["Caution: 8200 MAD", "450 km/jour inclus", "Âge minimum: 27 ans"]
  },
  
  // Peugeot (nouveaux modèles)
  {
    id: 61,
    image: carPeugeot2008,
    name: "Peugeot 2008",
    brand: "Peugeot",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 420,
    priceDisplay: "420 MAD",
    conditions: ["Caution: 5600 MAD", "360 km/jour inclus", "Âge minimum: 23 ans"]
  },
  {
    id: 62,
    image: carPeugeot208Red,
    name: "Peugeot 208",
    brand: "Peugeot",
    type: "Manuelle",
    category: "Citadine",
    city: "Tanger",
    price: 300,
    priceDisplay: "300 MAD",
    conditions: ["Caution: 4000 MAD", "240 km/jour inclus", "Âge minimum: 21 ans"]
  },
  
  // Renault (nouveaux modèles)
  {
    id: 63,
    image: carClioWhite,
    name: "Renault Clio",
    brand: "Renault",
    type: "Automatique",
    category: "Citadine",
    city: "Rabat",
    price: 335,
    priceDisplay: "335 MAD",
    conditions: ["Caution: 4500 MAD", "270 km/jour inclus", "Âge minimum: 21 ans"]
  },
  {
    id: 64,
    image: carCapturOrange,
    name: "Renault Captur",
    brand: "Renault",
    type: "Manuelle",
    category: "SUV",
    city: "Marrakech",
    price: 400,
    priceDisplay: "400 MAD",
    conditions: ["Caution: 5400 MAD", "350 km/jour inclus", "Âge minimum: 23 ans"]
  },
  {
    id: 65,
    image: carRenaultTwingo,
    name: "Renault Twingo",
    brand: "Renault",
    type: "Manuelle",
    category: "Citadine",
    city: "Casablanca",
    price: 270,
    priceDisplay: "270 MAD",
    conditions: ["Caution: 3600 MAD", "220 km/jour inclus", "Âge minimum: 21 ans"]
  },
  
  // Dacia (nouveaux modèles)
  {
    id: 66,
    image: carDusterGray,
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
    price: 310,
    priceDisplay: "310 MAD",
    conditions: ["Caution: 4200 MAD", "260 km/jour inclus", "Âge minimum: 21 ans"]
  },
  
  // Volkswagen (nouveaux modèles)
  {
    id: 68,
    image: carVwTroc,
    name: "Volkswagen T-Roc",
    brand: "Volkswagen",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 530,
    priceDisplay: "530 MAD",
    conditions: ["Caution: 7200 MAD", "400 km/jour inclus", "Âge minimum: 25 ans"]
  },
  {
    id: 69,
    image: carVwPassat,
    name: "Volkswagen Passat",
    brand: "Volkswagen",
    type: "Automatique",
    category: "Berline",
    city: "Casablanca",
    price: 490,
    priceDisplay: "490 MAD",
    conditions: ["Caution: 6600 MAD", "380 km/jour inclus", "Âge minimum: 24 ans"]
  },
  
  // Toyota (nouveaux modèles)
  {
    id: 70,
    image: carCorollaSilver,
    name: "Toyota Corolla",
    brand: "Toyota",
    type: "Manuelle",
    category: "Berline",
    city: "Tanger",
    price: 420,
    priceDisplay: "420 MAD",
    conditions: ["Caution: 5700 MAD", "370 km/jour inclus", "Âge minimum: 23 ans"]
  },
  {
    id: 71,
    image: carToyotaAuris,
    name: "Toyota Auris",
    brand: "Toyota",
    type: "Automatique",
    category: "Berline",
    city: "Rabat",
    price: 410,
    priceDisplay: "410 MAD",
    conditions: ["Caution: 5500 MAD", "360 km/jour inclus", "Âge minimum: 23 ans"]
  },
  
  // Hyundai (nouveaux modèles)
  {
    id: 72,
    image: carHyundaiKona,
    name: "Hyundai Kona",
    brand: "Hyundai",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 480,
    priceDisplay: "480 MAD",
    conditions: ["Caution: 6500 MAD", "390 km/jour inclus", "Âge minimum: 24 ans"]
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
  
  // Nissan (nouveaux modèles)
  {
    id: 74,
    image: carNissanJuke,
    name: "Nissan Juke",
    brand: "Nissan",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 450,
    priceDisplay: "450 MAD",
    conditions: ["Caution: 6100 MAD", "370 km/jour inclus", "Âge minimum: 24 ans"]
  },
  {
    id: 75,
    image: carNissanNote,
    name: "Nissan Note",
    brand: "Nissan",
    type: "Manuelle",
    category: "Citadine",
    city: "Rabat",
    price: 305,
    priceDisplay: "305 MAD",
    conditions: ["Caution: 4100 MAD", "250 km/jour inclus", "Âge minimum: 21 ans"]
  },
  
  // Ford (nouveaux modèles)
  {
    id: 76,
    image: carFordFiesta,
    name: "Ford Fiesta",
    brand: "Ford",
    type: "Manuelle",
    category: "Citadine",
    city: "Marrakech",
    price: 295,
    priceDisplay: "295 MAD",
    conditions: ["Caution: 3900 MAD", "240 km/jour inclus", "Âge minimum: 21 ans"]
  },
  {
    id: 77,
    image: carFordKuga,
    name: "Ford Kuga",
    brand: "Ford",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 510,
    priceDisplay: "510 MAD",
    conditions: ["Caution: 6900 MAD", "400 km/jour inclus", "Âge minimum: 25 ans"]
  },
  
  // Kia (nouveaux modèles)
  {
    id: 78,
    image: carKiaCeed,
    name: "Kia Ceed",
    brand: "Kia",
    type: "Automatique",
    category: "Berline",
    city: "Tanger",
    price: 380,
    priceDisplay: "380 MAD",
    conditions: ["Caution: 5200 MAD", "340 km/jour inclus", "Âge minimum: 23 ans"]
  },
  {
    id: 79,
    image: carKiaStonic,
    name: "Kia Stonic",
    brand: "Kia",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 430,
    priceDisplay: "430 MAD",
    conditions: ["Caution: 5800 MAD", "370 km/jour inclus", "Âge minimum: 23 ans"]
  },
  
  // Opel (nouveaux modèles)
  {
    id: 80,
    image: carOpelInsignia,
    name: "Opel Insignia",
    brand: "Opel",
    type: "Automatique",
    category: "Berline",
    city: "Marrakech",
    price: 460,
    priceDisplay: "460 MAD",
    conditions: ["Caution: 6200 MAD", "380 km/jour inclus", "Âge minimum: 24 ans"]
  },
  {
    id: 81,
    image: carOpelMokka,
    name: "Opel Mokka",
    brand: "Opel",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 440,
    priceDisplay: "440 MAD",
    conditions: ["Caution: 5900 MAD", "370 km/jour inclus", "Âge minimum: 23 ans"]
  },
  
  // Citroën (nouveaux modèles)
  {
    id: 82,
    image: carCitroenC4Cactus,
    name: "Citroën C4 Cactus",
    brand: "Citroën",
    type: "Automatique",
    category: "Citadine",
    city: "Tanger",
    price: 360,
    priceDisplay: "360 MAD",
    conditions: ["Caution: 4900 MAD", "300 km/jour inclus", "Âge minimum: 22 ans"]
  },
  {
    id: 83,
    image: carCitroenC3Aircross,
    name: "Citroën C3 Aircross",
    brand: "Citroën",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 410,
    priceDisplay: "410 MAD",
    conditions: ["Caution: 5500 MAD", "360 km/jour inclus", "Âge minimum: 23 ans"]
  },
  
  // Seat (nouveaux modèles)
  {
    id: 84,
    image: carSeatLeon,
    name: "Seat Leon",
    brand: "Seat",
    type: "Automatique",
    category: "Berline",
    city: "Marrakech",
    price: 390,
    priceDisplay: "390 MAD",
    conditions: ["Caution: 5300 MAD", "350 km/jour inclus", "Âge minimum: 23 ans"]
  },
  {
    id: 85,
    image: carSeatArona,
    name: "Seat Arona",
    brand: "Seat",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 425,
    priceDisplay: "425 MAD",
    conditions: ["Caution: 5700 MAD", "370 km/jour inclus", "Âge minimum: 23 ans"]
  },
  
  // Fiat (nouveaux modèles)
  {
    id: 86,
    image: carFiat500,
    name: "Fiat 500",
    brand: "Fiat",
    type: "Manuelle",
    category: "Citadine",
    city: "Tanger",
    price: 285,
    priceDisplay: "285 MAD",
    conditions: ["Caution: 3800 MAD", "230 km/jour inclus", "Âge minimum: 21 ans"]
  },
  {
    id: 87,
    image: carFiatPanda,
    name: "Fiat Panda",
    brand: "Fiat",
    type: "Manuelle",
    category: "Citadine",
    city: "Rabat",
    price: 275,
    priceDisplay: "275 MAD",
    conditions: ["Caution: 3700 MAD", "220 km/jour inclus", "Âge minimum: 21 ans"]
  },
  
  // Honda (nouveaux modèles)
  {
    id: 88,
    image: carHondaJazz,
    name: "Honda Jazz",
    brand: "Honda",
    type: "Automatique",
    category: "Citadine",
    city: "Marrakech",
    price: 345,
    priceDisplay: "345 MAD",
    conditions: ["Caution: 4700 MAD", "280 km/jour inclus", "Âge minimum: 22 ans"]
  },
  
  // Mazda (nouveaux modèles)
  {
    id: 89,
    image: carMazdaCX3,
    name: "Mazda CX-3",
    brand: "Mazda",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 460,
    priceDisplay: "460 MAD",
    conditions: ["Caution: 6200 MAD", "380 km/jour inclus", "Âge minimum: 24 ans"]
  },
  
  // Skoda (nouveaux modèles)
  {
    id: 90,
    image: carSkodaKamiq,
    name: "Skoda Kamiq",
    brand: "Skoda",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 445,
    priceDisplay: "445 MAD",
    conditions: ["Caution: 6000 MAD", "370 km/jour inclus", "Âge minimum: 23 ans"]
  },
  
  // BMW (nouveaux modèles premium)
  {
    id: 91,
    image: carBmw3,
    name: "BMW Série 3",
    brand: "BMW",
    type: "Automatique",
    category: "Berline",
    city: "Casablanca",
    price: 750,
    priceDisplay: "750 MAD",
    conditions: ["Caution: 9000 MAD", "400 km/jour inclus", "Âge minimum: 27 ans"]
  },
  {
    id: 92,
    image: carBmw5,
    name: "BMW Série 5",
    brand: "BMW",
    type: "Automatique",
    category: "Berline",
    city: "Marrakech",
    price: 900,
    priceDisplay: "900 MAD",
    conditions: ["Caution: 11000 MAD", "450 km/jour inclus", "Âge minimum: 28 ans"]
  },
  {
    id: 93,
    image: carBmwX1,
    name: "BMW X1",
    brand: "BMW",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 720,
    priceDisplay: "720 MAD",
    conditions: ["Caution: 8500 MAD", "400 km/jour inclus", "Âge minimum: 27 ans"]
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
    id: 95,
    image: carBmw1,
    name: "BMW Série 1",
    brand: "BMW",
    type: "Automatique",
    category: "Citadine",
    city: "Casablanca",
    price: 680,
    priceDisplay: "680 MAD",
    conditions: ["Caution: 8000 MAD", "380 km/jour inclus", "Âge minimum: 26 ans"]
  },
  {
    id: 96,
    image: carBmwX2,
    name: "BMW X2",
    brand: "BMW",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 780,
    priceDisplay: "780 MAD",
    conditions: ["Caution: 9200 MAD", "410 km/jour inclus", "Âge minimum: 27 ans"]
  },
  
  // Audi (nouveaux modèles premium)
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
    price: 950,
    priceDisplay: "950 MAD",
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
    id: 102,
    image: carAudiA1,
    name: "Audi A1",
    brand: "Audi",
    type: "Automatique",
    category: "Citadine",
    city: "Tanger",
    price: 650,
    priceDisplay: "650 MAD",
    conditions: ["Caution: 7800 MAD", "370 km/jour inclus", "Âge minimum: 26 ans"]
  },
  
  // Mercedes (nouveaux modèles premium)
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
    price: 1000,
    priceDisplay: "1000 MAD",
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
  
  // Volkswagen (nouveaux modèles premium)
  {
    id: 110,
    image: carVwJetta,
    name: "Volkswagen Jetta",
    brand: "Volkswagen",
    type: "Automatique",
    category: "Berline",
    city: "Tanger",
    price: 480,
    priceDisplay: "480 MAD",
    conditions: ["Caution: 6400 MAD", "380 km/jour inclus", "Âge minimum: 24 ans"]
  },
  {
    id: 111,
    image: carVwArteon,
    name: "Volkswagen Arteon",
    brand: "Volkswagen",
    type: "Automatique",
    category: "Berline",
    city: "Casablanca",
    price: 750,
    priceDisplay: "750 MAD",
    conditions: ["Caution: 8900 MAD", "420 km/jour inclus", "Âge minimum: 27 ans"]
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
    id: 113,
    image: carVwTaigo,
    name: "Volkswagen Taigo",
    brand: "Volkswagen",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 520,
    priceDisplay: "520 MAD",
    conditions: ["Caution: 7000 MAD", "390 km/jour inclus", "Âge minimum: 24 ans"]
  },
  {
    id: 114,
    image: carVwID4,
    name: "Volkswagen ID.4",
    brand: "Volkswagen",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 850,
    priceDisplay: "850 MAD",
    conditions: ["Caution: 10000 MAD", "450 km/jour inclus", "Âge minimum: 27 ans"]
  },
  
  // Volkswagen T-Roc
  {
    id: 115,
    image: carVwTroc,
    name: "Volkswagen T-Roc",
    brand: "Volkswagen",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 540,
    priceDisplay: "540 MAD",
    conditions: ["Caution: 7300 MAD", "410 km/jour inclus", "Âge minimum: 25 ans"]
  },
  {
    id: 116,
    image: carVwTroc,
    name: "Volkswagen T-Roc",
    brand: "Volkswagen",
    type: "Manuelle",
    category: "SUV",
    city: "Rabat",
    price: 510,
    priceDisplay: "510 MAD",
    conditions: ["Caution: 7000 MAD", "400 km/jour inclus", "Âge minimum: 24 ans"]
  },
  
  // Nouveaux modèles modernes
  {
    id: 117,
    image: carPeugeot5008,
    name: "Peugeot 5008",
    brand: "Peugeot",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 620,
    priceDisplay: "620 MAD",
    conditions: ["Caution: 8400 MAD", "460 km/jour inclus", "Âge minimum: 26 ans"]
  },
  {
    id: 118,
    image: carRenaultArkana,
    name: "Renault Arkana",
    brand: "Renault",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 550,
    priceDisplay: "550 MAD",
    conditions: ["Caution: 7400 MAD", "420 km/jour inclus", "Âge minimum: 25 ans"]
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
    id: 120,
    image: carToyotaCHR,
    name: "Toyota C-HR",
    brand: "Toyota",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 560,
    priceDisplay: "560 MAD",
    conditions: ["Caution: 7600 MAD", "430 km/jour inclus", "Âge minimum: 25 ans"]
  },
  {
    id: 121,
    image: carNissanXTrail,
    name: "Nissan X-Trail",
    brand: "Nissan",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 580,
    priceDisplay: "580 MAD",
    conditions: ["Caution: 7800 MAD", "440 km/jour inclus", "Âge minimum: 26 ans"]
  },
  {
    id: 122,
    image: carFordPuma,
    name: "Ford Puma",
    brand: "Ford",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 470,
    priceDisplay: "470 MAD",
    conditions: ["Caution: 6300 MAD", "390 km/jour inclus", "Âge minimum: 24 ans"]
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
    id: 124,
    image: carKiaNiro,
    name: "Kia Niro",
    brand: "Kia",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 570,
    priceDisplay: "570 MAD",
    conditions: ["Caution: 7700 MAD", "430 km/jour inclus", "Âge minimum: 25 ans"]
  },
  {
    id: 125,
    image: carMazda2,
    name: "Mazda 2",
    brand: "Mazda",
    type: "Manuelle",
    category: "Citadine",
    city: "Marrakech",
    price: 310,
    priceDisplay: "310 MAD",
    conditions: ["Caution: 4200 MAD", "250 km/jour inclus", "Âge minimum: 21 ans"]
  },
  {
    id: 126,
    image: carCitroenEC4,
    name: "Citroën ë-C4",
    brand: "Citroën",
    type: "Automatique",
    category: "Berline",
    city: "Tanger",
    price: 520,
    priceDisplay: "520 MAD",
    conditions: ["Caution: 7000 MAD", "400 km/jour inclus", "Âge minimum: 25 ans"]
  },
  {
    id: 127,
    image: carOpelGrandland,
    name: "Opel Grandland X",
    brand: "Opel",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 550,
    priceDisplay: "550 MAD",
    conditions: ["Caution: 7400 MAD", "420 km/jour inclus", "Âge minimum: 25 ans"]
  },
  {
    id: 128,
    image: carSeatAteca,
    name: "Seat Ateca",
    brand: "Seat",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 510,
    priceDisplay: "510 MAD",
    conditions: ["Caution: 6900 MAD", "400 km/jour inclus", "Âge minimum: 25 ans"]
  },
  {
    id: 129,
    image: carSkodaKaroq,
    name: "Skoda Karoq",
    brand: "Skoda",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 520,
    priceDisplay: "520 MAD",
    conditions: ["Caution: 7000 MAD", "400 km/jour inclus", "Âge minimum: 25 ans"]
  },
  {
    id: 130,
    image: carAudiQ2,
    name: "Audi Q2",
    brand: "Audi",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 690,
    priceDisplay: "690 MAD",
    conditions: ["Caution: 8200 MAD", "390 km/jour inclus", "Âge minimum: 26 ans"]
  },
  {
    id: 131,
    image: carMercedesEQA,
    name: "Mercedes EQA",
    brand: "Mercedes",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 920,
    priceDisplay: "920 MAD",
    conditions: ["Caution: 11000 MAD", "480 km/jour inclus", "Âge minimum: 28 ans"]
  },
  {
    id: 132,
    image: carBmwIX3,
    name: "BMW iX3",
    brand: "BMW",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 1050,
    priceDisplay: "1050 MAD",
    conditions: ["Caution: 12500 MAD", "490 km/jour inclus", "Âge minimum: 29 ans"]
  },
  {
    id: 133,
    image: carPeugeotE2008,
    name: "Peugeot e-2008",
    brand: "Peugeot",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 490,
    priceDisplay: "490 MAD",
    conditions: ["Caution: 6600 MAD", "390 km/jour inclus", "Âge minimum: 24 ans"]
  },
  {
    id: 134,
    image: carRenaultAustral,
    name: "Renault Austral",
    brand: "Renault",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 600,
    priceDisplay: "600 MAD",
    conditions: ["Caution: 8100 MAD", "450 km/jour inclus", "Âge minimum: 26 ans"]
  },
  {
    id: 135,
    image: carVwID3,
    name: "Volkswagen ID.3",
    brand: "Volkswagen",
    type: "Automatique",
    category: "Citadine",
    city: "Casablanca",
    price: 480,
    priceDisplay: "480 MAD",
    conditions: ["Caution: 6400 MAD", "380 km/jour inclus", "Âge minimum: 24 ans"]
  },
  
  // Véhicules de luxe
  {
    id: 136,
    image: carMaseratiGhibli,
    name: "Maserati Ghibli",
    brand: "Maserati",
    type: "Automatique",
    category: "Berline",
    city: "Casablanca",
    price: 1800,
    priceDisplay: "1800 MAD",
    conditions: ["Caution: 25000 MAD", "500 km/jour inclus", "Âge minimum: 30 ans"]
  },
  {
    id: 137,
    image: carMaseratiLevante,
    name: "Maserati Levante",
    brand: "Maserati",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 2200,
    priceDisplay: "2200 MAD",
    conditions: ["Caution: 30000 MAD", "600 km/jour inclus", "Âge minimum: 30 ans"]
  },
  {
    id: 138,
    image: carMercedesECabrio,
    name: "Mercedes Classe E Cabriolet",
    brand: "Mercedes",
    type: "Automatique",
    category: "Cabriolet",
    city: "Casablanca",
    price: 1600,
    priceDisplay: "1600 MAD",
    conditions: ["Caution: 22000 MAD", "500 km/jour inclus", "Âge minimum: 28 ans"]
  },
  {
    id: 139,
    image: carBmw4Cabrio,
    name: "BMW Série 4 Cabriolet",
    brand: "BMW",
    type: "Automatique",
    category: "Cabriolet",
    city: "Marrakech",
    price: 1400,
    priceDisplay: "1400 MAD",
    conditions: ["Caution: 20000 MAD", "500 km/jour inclus", "Âge minimum: 28 ans"]
  },
  {
    id: 140,
    image: carAudiA5Cabrio,
    name: "Audi A5 Cabriolet",
    brand: "Audi",
    type: "Automatique",
    category: "Cabriolet",
    city: "Casablanca",
    price: 1350,
    priceDisplay: "1350 MAD",
    conditions: ["Caution: 19000 MAD", "500 km/jour inclus", "Âge minimum: 28 ans"]
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
    id: 142,
    image: carJaguarFPace,
    name: "Jaguar F-Pace",
    brand: "Jaguar",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 1500,
    priceDisplay: "1500 MAD",
    conditions: ["Caution: 21000 MAD", "550 km/jour inclus", "Âge minimum: 28 ans"]
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
    id: 144,
    image: carLexusNX,
    name: "Lexus NX",
    brand: "Lexus",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 1300,
    priceDisplay: "1300 MAD",
    conditions: ["Caution: 18000 MAD", "500 km/jour inclus", "Âge minimum: 27 ans"]
  },
  {
    id: 145,
    image: carVolvoXC60,
    name: "Volvo XC60",
    brand: "Volvo",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 1250,
    priceDisplay: "1250 MAD",
    conditions: ["Caution: 17500 MAD", "500 km/jour inclus", "Âge minimum: 27 ans"]
  },
  {
    id: 146,
    image: carBmwZ4,
    name: "BMW Z4 Roadster",
    brand: "BMW",
    type: "Automatique",
    category: "Cabriolet",
    city: "Marrakech",
    price: 1550,
    priceDisplay: "1550 MAD",
    conditions: ["Caution: 22000 MAD", "500 km/jour inclus", "Âge minimum: 28 ans"]
  },
  {
    id: 147,
    image: carVwTiguan,
    name: "Volkswagen Tiguan",
    brand: "Volkswagen",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 650,
    priceDisplay: "650 MAD",
    conditions: ["Âge minimum: 25 ans"]
  },
  
  // Mercedes Classe G
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
  
  // Audi A7
  {
    id: 150,
    image: carAudiA7,
    name: "Audi A7 Sportback",
    brand: "Audi",
    type: "Automatique",
    category: "Berline",
    city: "Casablanca",
    price: 1400,
    priceDisplay: "1400 MAD",
    conditions: ["Âge minimum: 27 ans"],
    badges: ["🌟 Nouveau", "💎 Luxe"]
  },
  {
    id: 151,
    image: carAudiA7,
    name: "Audi A7 Sportback",
    brand: "Audi",
    type: "Automatique",
    category: "Berline",
    city: "Marrakech",
    price: 1380,
    priceDisplay: "1380 MAD",
    conditions: ["Âge minimum: 27 ans"],
    badges: ["🌟 Nouveau", "💎 Luxe"]
  },
  
  // Audi A8
  {
    id: 152,
    image: carAudiA8,
    name: "Audi A8",
    brand: "Audi",
    type: "Automatique",
    category: "Berline",
    city: "Casablanca",
    price: 2200,
    priceDisplay: "2200 MAD",
    conditions: ["Âge minimum: 28 ans"],
    badges: ["🌟 Nouveau", "💎 Luxe"]
  },
  {
    id: 153,
    image: carAudiA8,
    name: "Audi A8",
    brand: "Audi",
    type: "Automatique",
    category: "Berline",
    city: "Marrakech",
    price: 2150,
    priceDisplay: "2150 MAD",
    conditions: ["Âge minimum: 28 ans"],
    badges: ["🌟 Nouveau", "💎 Luxe"]
  },
  
  // Audi Q8
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
  
  // Audi e-tron GT
  {
    id: 156,
    image: carAudiEtronGT,
    name: "Audi e-tron GT",
    brand: "Audi",
    type: "Automatique",
    category: "Berline",
    city: "Marrakech",
    price: 2800,
    priceDisplay: "2800 MAD",
    conditions: ["Âge minimum: 30 ans"],
    badges: ["🌟 Nouveau", "💎 Luxe"]
  },
  {
    id: 157,
    image: carAudiEtronGT,
    name: "Audi e-tron GT",
    brand: "Audi",
    type: "Automatique",
    category: "Berline",
    city: "Casablanca",
    price: 2900,
    priceDisplay: "2900 MAD",
    conditions: ["Âge minimum: 30 ans"],
    badges: ["🌟 Nouveau", "💎 Luxe"]
  },
  
  // Porsche Cayenne
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
  
  // Porsche Panamera
  {
    id: 160,
    image: carPorschePanamera,
    name: "Porsche Panamera",
    brand: "Porsche",
    type: "Automatique",
    category: "Berline",
    city: "Marrakech",
    price: 2400,
    priceDisplay: "2400 MAD",
    conditions: ["Âge minimum: 30 ans"]
  },
  {
    id: 161,
    image: carPorschePanamera,
    name: "Porsche Panamera",
    brand: "Porsche",
    type: "Automatique",
    category: "Berline",
    city: "Casablanca",
    price: 2450,
    priceDisplay: "2450 MAD",
    conditions: ["Âge minimum: 30 ans"]
  },
  
  // Porsche 911
  {
    id: 162,
    image: carPorsche911,
    name: "Porsche 911 Carrera",
    brand: "Porsche",
    type: "Automatique",
    category: "Coupé",
    city: "Marrakech",
    price: 3200,
    priceDisplay: "3200 MAD",
    conditions: ["Âge minimum: 30 ans"],
    badges: ["🌟 Nouveau", "💎 Luxe"]
  },
  {
    id: 163,
    image: carPorsche911,
    name: "Porsche 911 Carrera",
    brand: "Porsche",
    type: "Automatique",
    category: "Coupé",
    city: "Casablanca",
    price: 3300,
    priceDisplay: "3300 MAD",
    conditions: ["Âge minimum: 30 ans"],
    badges: ["🌟 Nouveau", "💎 Luxe"]
  },
  
  // Range Rover Sport
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
  
  // Range Rover Velar
  {
    id: 166,
    image: carRangeRoverVelar,
    name: "Range Rover Velar",
    brand: "Land Rover",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 1900,
    priceDisplay: "1900 MAD",
    conditions: ["Âge minimum: 28 ans"]
  },
  {
    id: 167,
    image: carRangeRoverVelar,
    name: "Range Rover Velar",
    brand: "Land Rover",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 1950,
    priceDisplay: "1950 MAD",
    conditions: ["Âge minimum: 28 ans"]
  },

  // Véhicules supplémentaires pour Agadir
  {
    id: 168,
    image: carClio,
    name: "Renault Clio",
    brand: "Renault",
    type: "Manuelle",
    category: "Berline",
    city: "Agadir",
    price: 300,
    priceDisplay: "300 MAD",
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
    price: 280,
    priceDisplay: "280 MAD",
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
    id: 171,
    image: carCorolla,
    name: "Toyota Corolla",
    brand: "Toyota",
    type: "Automatique",
    category: "Berline",
    city: "Agadir",
    price: 450,
    priceDisplay: "450 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 172,
    image: carToyotaYaris,
    name: "Toyota Yaris",
    brand: "Toyota",
    type: "Manuelle",
    category: "Citadine",
    city: "Agadir",
    price: 320,
    priceDisplay: "320 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 173,
    image: carPeugeot208,
    name: "Peugeot 208",
    brand: "Peugeot",
    type: "Manuelle",
    category: "Citadine",
    city: "Agadir",
    price: 330,
    priceDisplay: "330 MAD",
    conditions: generateConditions(21),
    badges: ["🔥 Populaire"]
  },
  {
    id: 174,
    image: carPeugeot308,
    name: "Peugeot 308",
    brand: "Peugeot",
    type: "Automatique",
    category: "Berline",
    city: "Agadir",
    price: 480,
    priceDisplay: "480 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 175,
    image: carPeugeot2008,
    name: "Peugeot 2008",
    brand: "Peugeot",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 500,
    priceDisplay: "500 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 176,
    image: carRenaultCaptur,
    name: "Renault Captur",
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
    id: 177,
    image: carRenaultMegane,
    name: "Renault Megane",
    brand: "Renault",
    type: "Automatique",
    category: "Berline",
    city: "Agadir",
    price: 420,
    priceDisplay: "420 MAD",
    conditions: generateConditions(23)
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
    id: 180,
    image: carNissanQashqai,
    name: "Nissan Qashqai",
    brand: "Nissan",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 550,
    priceDisplay: "550 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 181,
    image: carFordFocus,
    name: "Ford Focus",
    brand: "Ford",
    type: "Automatique",
    category: "Berline",
    city: "Agadir",
    price: 440,
    priceDisplay: "440 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 182,
    image: carVwGolf,
    name: "VW Golf",
    brand: "Volkswagen",
    type: "Automatique",
    category: "Berline",
    city: "Agadir",
    price: 500,
    priceDisplay: "500 MAD",
    conditions: generateConditions(23),
    badges: ["🔥 Populaire"]
  },
  {
    id: 183,
    image: carSeatLeon,
    name: "Seat Leon",
    brand: "Seat",
    type: "Automatique",
    category: "Berline",
    city: "Agadir",
    price: 460,
    priceDisplay: "460 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 184,
    image: carSkodaOctavia,
    name: "Skoda Octavia",
    brand: "Skoda",
    type: "Automatique",
    category: "Berline",
    city: "Agadir",
    price: 520,
    priceDisplay: "520 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 185,
    image: carMazdaCX5,
    name: "Mazda CX-5",
    brand: "Mazda",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 650,
    priceDisplay: "650 MAD",
    conditions: generateConditions(25)
  },

  // Véhicules supplémentaires pour Fès
  {
    id: 186,
    image: carClio,
    name: "Renault Clio",
    brand: "Renault",
    type: "Manuelle",
    category: "Berline",
    city: "Fès",
    price: 310,
    priceDisplay: "310 MAD",
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
    price: 290,
    priceDisplay: "290 MAD",
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
    id: 189,
    image: carCorolla,
    name: "Toyota Corolla",
    brand: "Toyota",
    type: "Automatique",
    category: "Berline",
    city: "Fès",
    price: 460,
    priceDisplay: "460 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 190,
    image: carToyotaYaris,
    name: "Toyota Yaris",
    brand: "Toyota",
    type: "Manuelle",
    category: "Citadine",
    city: "Fès",
    price: 330,
    priceDisplay: "330 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 191,
    image: carPeugeot208,
    name: "Peugeot 208",
    brand: "Peugeot",
    type: "Manuelle",
    category: "Citadine",
    city: "Fès",
    price: 340,
    priceDisplay: "340 MAD",
    conditions: generateConditions(21),
    badges: ["🔥 Populaire"]
  },
  {
    id: 192,
    image: carPeugeot308,
    name: "Peugeot 308",
    brand: "Peugeot",
    type: "Automatique",
    category: "Berline",
    city: "Fès",
    price: 490,
    priceDisplay: "490 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 193,
    image: carPeugeot3008,
    name: "Peugeot 3008",
    brand: "Peugeot",
    type: "Automatique",
    category: "SUV",
    city: "Fès",
    price: 580,
    priceDisplay: "580 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 194,
    image: carRenaultCaptur,
    name: "Renault Captur",
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
    id: 195,
    image: carRenaultMegane,
    name: "Renault Megane",
    brand: "Renault",
    type: "Automatique",
    category: "Berline",
    city: "Fès",
    price: 430,
    priceDisplay: "430 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 196,
    image: carHyundaiI20,
    name: "Hyundai i20",
    brand: "Hyundai",
    type: "Manuelle",
    category: "Citadine",
    city: "Fès",
    price: 320,
    priceDisplay: "320 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 197,
    image: carKiaRio,
    name: "Kia Rio",
    brand: "Kia",
    type: "Manuelle",
    category: "Berline",
    city: "Fès",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 198,
    image: carNissanMicra,
    name: "Nissan Micra",
    brand: "Nissan",
    type: "Manuelle",
    category: "Citadine",
    city: "Fès",
    price: 310,
    priceDisplay: "310 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 199,
    image: carFordFiesta,
    name: "Ford Fiesta",
    brand: "Ford",
    type: "Manuelle",
    category: "Citadine",
    city: "Fès",
    price: 330,
    priceDisplay: "330 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 200,
    image: carVwPolo,
    name: "VW Polo",
    brand: "Volkswagen",
    type: "Manuelle",
    category: "Citadine",
    city: "Fès",
    price: 340,
    priceDisplay: "340 MAD",
    conditions: generateConditions(21)
  },

  // Véhicules supplémentaires pour Rabat
  {
    id: 201,
    image: carFiat500,
    name: "Fiat 500",
    brand: "Fiat",
    type: "Manuelle",
    category: "Citadine",
    city: "Rabat",
    price: 310,
    priceDisplay: "310 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 202,
    image: carOpelCorsa,
    name: "Opel Corsa",
    brand: "Opel",
    type: "Manuelle",
    category: "Citadine",
    city: "Rabat",
    price: 330,
    priceDisplay: "330 MAD",
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
    id: 204,
    image: carSkodaFabia,
    name: "Skoda Fabia",
    brand: "Skoda",
    type: "Manuelle",
    category: "Citadine",
    city: "Rabat",
    price: 340,
    priceDisplay: "340 MAD",
    conditions: generateConditions(21)
  },

  // Véhicules supplémentaires pour Tanger
  {
    id: 205,
    image: carCitroenC3,
    name: "Citroën C3",
    brand: "Citroën",
    type: "Manuelle",
    category: "Citadine",
    city: "Tanger",
    price: 330,
    priceDisplay: "330 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 206,
    image: carFiatPanda,
    name: "Fiat Panda",
    brand: "Fiat",
    type: "Manuelle",
    category: "Citadine",
    city: "Tanger",
    price: 290,
    priceDisplay: "290 MAD",
    conditions: generateConditions(21),
    badges: ["💰 Prix attractif"]
  },
  {
    id: 207,
    image: carSuzukiSwift,
    name: "Suzuki Swift",
    brand: "Suzuki",
    type: "Manuelle",
    category: "Citadine",
    city: "Tanger",
    price: 340,
    priceDisplay: "340 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 208,
    image: carMazda2,
    name: "Mazda 2",
    brand: "Mazda",
    type: "Manuelle",
    category: "Citadine",
    city: "Tanger",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: generateConditions(21)
  },
  
  // Véhicules supplémentaires pour Marrakech
  {
    id: 209,
    image: carHondaCivic,
    name: "Honda Civic",
    brand: "Honda",
    type: "Automatique",
    category: "Berline",
    city: "Marrakech",
    price: 480,
    priceDisplay: "480 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 210,
    image: carMazda3,
    name: "Mazda 3",
    brand: "Mazda",
    type: "Automatique",
    category: "Berline",
    city: "Marrakech",
    price: 470,
    priceDisplay: "470 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 211,
    image: carHyundaiKona,
    name: "Hyundai Kona",
    brand: "Hyundai",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 530,
    priceDisplay: "530 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 212,
    image: carKiaNiro,
    name: "Kia Niro",
    brand: "Kia",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 550,
    priceDisplay: "550 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 213,
    image: carNissanJuke,
    name: "Nissan Juke",
    brand: "Nissan",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 520,
    priceDisplay: "520 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 214,
    image: carVwTiguan,
    name: "VW Tiguan",
    brand: "Volkswagen",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 680,
    priceDisplay: "680 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 215,
    image: carRenaultArkana,
    name: "Renault Arkana",
    brand: "Renault",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 620,
    priceDisplay: "620 MAD",
    conditions: generateConditions(25)
  },
  
  // Véhicules supplémentaires pour Rabat
  {
    id: 216,
    image: carPeugeot2008,
    name: "Peugeot 2008",
    brand: "Peugeot",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 500,
    priceDisplay: "500 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 217,
    image: carRenaultCaptur,
    name: "Renault Captur",
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
    id: 218,
    image: carFordKuga,
    name: "Ford Kuga",
    brand: "Ford",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 600,
    priceDisplay: "600 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 219,
    image: carMazdaCX3,
    name: "Mazda CX-3",
    brand: "Mazda",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 520,
    priceDisplay: "520 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 220,
    image: carToyotaCHR,
    name: "Toyota C-HR",
    brand: "Toyota",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 590,
    priceDisplay: "590 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 221,
    image: carSeatArona,
    name: "Seat Arona",
    brand: "Seat",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 510,
    priceDisplay: "510 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 222,
    image: carOpelMokka,
    name: "Opel Mokka",
    brand: "Opel",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 530,
    priceDisplay: "530 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 223,
    image: carSkodaKamiq,
    name: "Skoda Kamiq",
    brand: "Skoda",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 550,
    priceDisplay: "550 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 224,
    image: carCitroenC3Aircross,
    name: "Citroën C3 Aircross",
    brand: "Citroën",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 490,
    priceDisplay: "490 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 225,
    image: carHondaJazz,
    name: "Honda Jazz",
    brand: "Honda",
    type: "Automatique",
    category: "Citadine",
    city: "Rabat",
    price: 410,
    priceDisplay: "410 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 226,
    image: carVwPolo,
    name: "VW Polo",
    brand: "Volkswagen",
    type: "Automatique",
    category: "Citadine",
    city: "Rabat",
    price: 390,
    priceDisplay: "390 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 227,
    image: carHyundaiI20,
    name: "Hyundai i20",
    brand: "Hyundai",
    type: "Manuelle",
    category: "Citadine",
    city: "Rabat",
    price: 320,
    priceDisplay: "320 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 228,
    image: carKiaRio,
    name: "Kia Rio",
    brand: "Kia",
    type: "Manuelle",
    category: "Berline",
    city: "Rabat",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 229,
    image: carNissanMicra,
    name: "Nissan Micra",
    brand: "Nissan",
    type: "Manuelle",
    category: "Citadine",
    city: "Rabat",
    price: 310,
    priceDisplay: "310 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 230,
    image: carToyotaYaris,
    name: "Toyota Yaris",
    brand: "Toyota",
    type: "Automatique",
    category: "Citadine",
    city: "Rabat",
    price: 380,
    priceDisplay: "380 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 231,
    image: carMazda2,
    name: "Mazda 2",
    brand: "Mazda",
    type: "Manuelle",
    category: "Citadine",
    city: "Rabat",
    price: 340,
    priceDisplay: "340 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 232,
    image: carSuzukiSwift,
    name: "Suzuki Swift",
    brand: "Suzuki",
    type: "Manuelle",
    category: "Citadine",
    city: "Rabat",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: generateConditions(21)
  },

  // Véhicules supplémentaires pour Tanger
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
    id: 235,
    image: carNissanQashqai,
    name: "Nissan Qashqai",
    brand: "Nissan",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 550,
    priceDisplay: "550 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 236,
    image: carPeugeot3008,
    name: "Peugeot 3008",
    brand: "Peugeot",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 580,
    priceDisplay: "580 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 237,
    image: carRenaultCaptur,
    name: "Renault Captur",
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
    id: 238,
    image: carFordKuga,
    name: "Ford Kuga",
    brand: "Ford",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 610,
    priceDisplay: "610 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 239,
    image: carVwTiguan,
    name: "VW Tiguan",
    brand: "Volkswagen",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 690,
    priceDisplay: "690 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 240,
    image: carToyotaCHR,
    name: "Toyota C-HR",
    brand: "Toyota",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 600,
    priceDisplay: "600 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 241,
    image: carCorolla,
    name: "Toyota Corolla",
    brand: "Toyota",
    type: "Automatique",
    category: "Berline",
    city: "Tanger",
    price: 470,
    priceDisplay: "470 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 242,
    image: carVwGolf,
    name: "VW Golf",
    brand: "Volkswagen",
    type: "Automatique",
    category: "Berline",
    city: "Tanger",
    price: 500,
    priceDisplay: "500 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 243,
    image: carHondaCivic,
    name: "Honda Civic",
    brand: "Honda",
    type: "Automatique",
    category: "Berline",
    city: "Tanger",
    price: 490,
    priceDisplay: "490 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 244,
    image: carMazda3,
    name: "Mazda 3",
    brand: "Mazda",
    type: "Automatique",
    category: "Berline",
    city: "Tanger",
    price: 480,
    priceDisplay: "480 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 245,
    image: carHyundaiI20,
    name: "Hyundai i20",
    brand: "Hyundai",
    type: "Manuelle",
    category: "Citadine",
    city: "Tanger",
    price: 330,
    priceDisplay: "330 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 246,
    image: carKiaRio,
    name: "Kia Rio",
    brand: "Kia",
    type: "Manuelle",
    category: "Berline",
    city: "Tanger",
    price: 360,
    priceDisplay: "360 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 247,
    image: carNissanMicra,
    name: "Nissan Micra",
    brand: "Nissan",
    type: "Manuelle",
    category: "Citadine",
    city: "Tanger",
    price: 320,
    priceDisplay: "320 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 248,
    image: carToyotaYaris,
    name: "Toyota Yaris",
    brand: "Toyota",
    type: "Automatique",
    category: "Citadine",
    city: "Tanger",
    price: 390,
    priceDisplay: "390 MAD",
    conditions: generateConditions(21)
  },
  
  // Véhicules supplémentaires pour Agadir
  {
    id: 249,
    image: carHondaCRV,
    name: "Honda CR-V",
    brand: "Honda",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 680,
    priceDisplay: "680 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 250,
    image: carMitsubishiOutlander,
    name: "Mitsubishi Outlander",
    brand: "Mitsubishi",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 630,
    priceDisplay: "630 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 251,
    image: carToyotaRAV4,
    name: "Toyota RAV4",
    brand: "Toyota",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 700,
    priceDisplay: "700 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 252,
    image: carNissanXTrail,
    name: "Nissan X-Trail",
    brand: "Nissan",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 640,
    priceDisplay: "640 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 253,
    image: carRenaultAustral,
    name: "Renault Austral",
    brand: "Renault",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 660,
    priceDisplay: "660 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 254,
    image: carPeugeot5008,
    name: "Peugeot 5008",
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
    id: 257,
    image: carKiaStonic,
    name: "Kia Stonic",
    brand: "Kia",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 490,
    priceDisplay: "490 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 258,
    image: carFordPuma,
    name: "Ford Puma",
    brand: "Ford",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 530,
    priceDisplay: "530 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 259,
    image: carOpelGrandland,
    name: "Opel Grandland",
    brand: "Opel",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 610,
    priceDisplay: "610 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 260,
    image: carSeatAteca,
    name: "Seat Ateca",
    brand: "Seat",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 600,
    priceDisplay: "600 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 261,
    image: carSkodaKaroq,
    name: "Skoda Karoq",
    brand: "Skoda",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 620,
    priceDisplay: "620 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 262,
    image: carCitroenC4Cactus,
    name: "Citroën C4 Cactus",
    brand: "Citroën",
    type: "Automatique",
    category: "SUV",
    city: "Agadir",
    price: 470,
    priceDisplay: "470 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 263,
    image: carMazda2,
    name: "Mazda 2",
    brand: "Mazda",
    type: "Manuelle",
    category: "Citadine",
    city: "Agadir",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 264,
    image: carRenaultTwingo,
    name: "Renault Twingo",
    brand: "Renault",
    type: "Manuelle",
    category: "Citadine",
    city: "Agadir",
    price: 290,
    priceDisplay: "290 MAD",
    conditions: generateConditions(21),
    badges: ["💰 Prix attractif"]
  },
  
  // Véhicules supplémentaires pour Fès
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
    id: 267,
    image: carNissanQashqai,
    name: "Nissan Qashqai",
    brand: "Nissan",
    type: "Automatique",
    category: "SUV",
    city: "Fès",
    price: 540,
    priceDisplay: "540 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 268,
    image: carVwGolf,
    name: "VW Golf",
    brand: "Volkswagen",
    type: "Automatique",
    category: "Berline",
    city: "Fès",
    price: 490,
    priceDisplay: "490 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 269,
    image: carCorolla,
    name: "Toyota Corolla",
    brand: "Toyota",
    type: "Automatique",
    category: "Berline",
    city: "Fès",
    price: 480,
    priceDisplay: "480 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 270,
    image: carSeatLeon,
    name: "Seat Leon",
    brand: "Seat",
    type: "Automatique",
    category: "Berline",
    city: "Fès",
    price: 470,
    priceDisplay: "470 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 271,
    image: carSkodaOctavia,
    name: "Skoda Octavia",
    brand: "Skoda",
    type: "Automatique",
    category: "Berline",
    city: "Fès",
    price: 510,
    priceDisplay: "510 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 272,
    image: carMazda3,
    name: "Mazda 3",
    brand: "Mazda",
    type: "Automatique",
    category: "Berline",
    city: "Fès",
    price: 460,
    priceDisplay: "460 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 273,
    image: carHondaCivic,
    name: "Honda Civic",
    brand: "Honda",
    type: "Automatique",
    category: "Berline",
    city: "Fès",
    price: 470,
    priceDisplay: "470 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 274,
    image: carFordKuga,
    name: "Ford Kuga",
    brand: "Ford",
    type: "Automatique",
    category: "SUV",
    city: "Fès",
    price: 590,
    priceDisplay: "590 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 275,
    image: carVwTiguan,
    name: "VW Tiguan",
    brand: "Volkswagen",
    type: "Automatique",
    category: "SUV",
    city: "Fès",
    price: 670,
    priceDisplay: "670 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 276,
    image: carMazdaCX5,
    name: "Mazda CX-5",
    brand: "Mazda",
    type: "Automatique",
    category: "SUV",
    city: "Fès",
    price: 640,
    priceDisplay: "640 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 277,
    image: carToyotaCHR,
    name: "Toyota C-HR",
    brand: "Toyota",
    type: "Automatique",
    category: "SUV",
    city: "Fès",
    price: 580,
    priceDisplay: "580 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 278,
    image: carSeatArona,
    name: "Seat Arona",
    brand: "Seat",
    type: "Automatique",
    category: "SUV",
    city: "Fès",
    price: 500,
    priceDisplay: "500 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 279,
    image: carOpelMokka,
    name: "Opel Mokka",
    brand: "Opel",
    type: "Automatique",
    category: "SUV",
    city: "Fès",
    price: 520,
    priceDisplay: "520 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 280,
    image: carCitroenC3Aircross,
    name: "Citroën C3 Aircross",
    brand: "Citroën",
    type: "Automatique",
    category: "SUV",
    city: "Fès",
    price: 480,
    priceDisplay: "480 MAD",
    conditions: generateConditions(23)
  },
  {
    id: 281,
    image: carRenaultTwingo,
    name: "Renault Twingo",
    brand: "Renault",
    type: "Manuelle",
    category: "Citadine",
    city: "Fès",
    price: 280,
    priceDisplay: "280 MAD",
    conditions: generateConditions(21),
    badges: ["💰 Prix attractif"]
  },
  {
    id: 282,
    image: carFiat500,
    name: "Fiat 500",
    brand: "Fiat",
    type: "Manuelle",
    category: "Citadine",
    city: "Fès",
    price: 300,
    priceDisplay: "300 MAD",
    conditions: generateConditions(21)
  },
  {
    id: 283,
    image: carSuzukiSwift,
    name: "Suzuki Swift",
    brand: "Suzuki",
    type: "Manuelle",
    category: "Citadine",
    city: "Fès",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: generateConditions(21)
  },
  // Additional vehicles to reach 308 total
  {
    id: 284,
    image: carVolvoXC60,
    name: "Volvo XC60",
    brand: "Volvo",
    type: "Automatique",
    category: "SUV Premium",
    city: "Casablanca",
    price: 850,
    priceDisplay: "850 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 285,
    image: carLexusNX,
    name: "Lexus NX",
    brand: "Lexus",
    type: "Automatique",
    category: "SUV Premium",
    city: "Marrakech",
    price: 900,
    priceDisplay: "900 MAD",
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
    id: 287,
    image: carJaguarFPace,
    name: "Jaguar F-PACE",
    brand: "Jaguar",
    type: "Automatique",
    category: "SUV Premium",
    city: "Tanger",
    price: 1050,
    priceDisplay: "1050 MAD",
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
    id: 289,
    image: carBmwZ4,
    name: "BMW Z4",
    brand: "BMW",
    type: "Automatique",
    category: "Cabriolet",
    city: "Agadir",
    price: 1200,
    priceDisplay: "1200 MAD",
    conditions: generateConditions(25),
    badges: ["☀️ Parfait pour l'été"]
  },
  {
    id: 290,
    image: carAudiA5Cabrio,
    name: "Audi A5 Cabriolet",
    brand: "Audi",
    type: "Automatique",
    category: "Cabriolet",
    city: "Marrakech",
    price: 1150,
    priceDisplay: "1150 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 291,
    image: carMercedesECabrio,
    name: "Mercedes Classe E Cabriolet",
    brand: "Mercedes-Benz",
    type: "Automatique",
    category: "Cabriolet",
    city: "Casablanca",
    price: 1400,
    priceDisplay: "1400 MAD",
    conditions: generateConditions(25),
    badges: ["👑 Véhicule Premium"]
  },
  {
    id: 292,
    image: carBmw4Cabrio,
    name: "BMW Série 4 Cabriolet",
    brand: "BMW",
    type: "Automatique",
    category: "Cabriolet",
    city: "Agadir",
    price: 1250,
    priceDisplay: "1250 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 293,
    image: carPorsche911,
    name: "Porsche 911",
    brand: "Porsche",
    type: "Automatique",
    category: "Sport",
    city: "Casablanca",
    price: 2500,
    priceDisplay: "2500 MAD",
    conditions: generateConditions(25),
    badges: ["👑 Véhicule Premium", "🏎️ Sport"]
  },
  {
    id: 294,
    image: carMaseratiGhibli,
    name: "Maserati Ghibli",
    brand: "Maserati",
    type: "Automatique",
    category: "Berline Premium",
    city: "Marrakech",
    price: 1800,
    priceDisplay: "1800 MAD",
    conditions: generateConditions(25),
    badges: ["👑 Véhicule Premium"]
  },
  {
    id: 295,
    image: carMaseratiLevante,
    name: "Maserati Levante",
    brand: "Maserati",
    type: "Automatique",
    category: "SUV Premium",
    city: "Rabat",
    price: 2000,
    priceDisplay: "2000 MAD",
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
    id: 297,
    image: carPorschePanamera,
    name: "Porsche Panamera",
    brand: "Porsche",
    type: "Automatique",
    category: "Berline Premium",
    city: "Tanger",
    price: 2200,
    priceDisplay: "2200 MAD",
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
    price: 1700,
    priceDisplay: "1700 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 299,
    image: carRangeRoverVelar,
    name: "Range Rover Velar",
    brand: "Land Rover",
    type: "Automatique",
    category: "SUV Premium",
    city: "Agadir",
    price: 1600,
    priceDisplay: "1600 MAD",
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
    id: 301,
    image: carAudiA7,
    name: "Audi A7",
    brand: "Audi",
    type: "Automatique",
    category: "Berline Premium",
    city: "Rabat",
    price: 1400,
    priceDisplay: "1400 MAD",
    conditions: generateConditions(25)
  },
  {
    id: 302,
    image: carAudiA8,
    name: "Audi A8",
    brand: "Audi",
    type: "Automatique",
    category: "Berline Premium",
    city: "Marrakech",
    price: 1600,
    priceDisplay: "1600 MAD",
    conditions: generateConditions(25),
    badges: ["👑 Véhicule Premium"]
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
    image: carAudiEtronGT,
    name: "Audi e-tron GT",
    brand: "Audi",
    type: "Automatique",
    category: "Sport Électrique",
    city: "Tanger",
    price: 2400,
    priceDisplay: "2400 MAD",
    conditions: generateConditions(25),
    badges: ["⚡ Électrique", "👑 Véhicule Premium"]
  },
  {
    id: 305,
    image: carMercedesEQA,
    name: "Mercedes EQA",
    brand: "Mercedes-Benz",
    type: "Automatique",
    category: "SUV Électrique",
    city: "Fès",
    price: 1100,
    priceDisplay: "1100 MAD",
    conditions: generateConditions(25),
    badges: ["⚡ Électrique"]
  },
  {
    id: 306,
    image: carBmwIX3,
    name: "BMW iX3",
    brand: "BMW",
    type: "Automatique",
    category: "SUV Électrique",
    city: "Agadir",
    price: 1200,
    priceDisplay: "1200 MAD",
    conditions: generateConditions(25),
    badges: ["⚡ Électrique"]
  },
  {
    id: 307,
    image: carVwID4,
    name: "Volkswagen ID.4",
    brand: "Volkswagen",
    type: "Automatique",
    category: "SUV Électrique",
    city: "Marrakech",
    price: 900,
    priceDisplay: "900 MAD",
    conditions: generateConditions(25),
    badges: ["⚡ Électrique", "⚡ Disponible immédiatement"]
  },
  {
    id: 308,
    image: carVwID3,
    name: "Volkswagen ID.3",
    brand: "Volkswagen",
    type: "Automatique",
    category: "Berline Électrique",
    city: "Casablanca",
    price: 850,
    priceDisplay: "850 MAD",
    conditions: generateConditions(25),
    badges: ["⚡ Électrique", "🔥 Populaire"]
  }
];

const Louer = () => {
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
  const [showAvailability, setShowAvailability] = useState(false);
  const [selectedCar, setSelectedCar] = useState<{ name: string; city: string; price: string } | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid' | 'list'>('carousel');
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
    // Confettis animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffda00', '#d0f690', '#048592']
    });
    
    // Loading simulation
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      
      // Construire le message avec les dates si disponibles
      let message = `Bonjour, je suis intéressé par ${carName} à ${city} (${priceDisplay}/jour)`;
      
      if (startDate && endDate) {
        const dateDebut = format(startDate, "dd/MM/yyyy");
        const dateFin = format(endDate, "dd/MM/yyyy");
        message += `\nDates souhaitées : du ${dateDebut} au ${dateFin}`;
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
  };

  const cities = ["Casablanca", "Marrakech", "Rabat", "Tanger", "Agadir", "Fès"];
  
  // Toutes les marques de véhicules
  const brands = [
    "Audi", "BMW", "Mercedes", "Maserati", "Porsche", "Jaguar", "Land Rover", "Lexus", "Volvo",
    "Renault", "Peugeot", "Citroën", "Dacia",
    "Toyota", "Nissan", "Honda", "Hyundai", "Kia", "Mazda", "Suzuki", "Mitsubishi",
    "Volkswagen", "Opel", "Ford", "Fiat", "Seat", "Skoda",
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

  const filteredCars = cars.filter(car => {
    if (selectedCity && selectedCity !== "all" && car.city !== selectedCity) return false;
    if (selectedType && selectedType !== "all" && car.type !== selectedType) return false;
    if (selectedBrand && selectedBrand !== "all" && car.brand !== selectedBrand) return false;
    if (selectedCategory && selectedCategory !== "all" && car.category !== selectedCategory) return false;
    return true;
  });

  // Mélanger les voitures UNE SEULE FOIS quand les filtres changent
  const displayedCars = useMemo(() => {
    const noFiltersApplied = selectedCity === "all" && selectedType === "all" && 
                             selectedBrand === "all" && selectedCategory === "all";
    return noFiltersApplied ? shuffleArray(filteredCars) : filteredCars;
  }, [selectedCity, selectedType, selectedBrand, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Location de Voiture au Maroc - 300+ Véhicules Disponibles | Benatna</title>
        <meta name="description" content="Louez une voiture au Maroc dès 250 MAD/jour. Citadines, SUV, berlines. Casablanca, Marrakech, Rabat, Tanger, Agadir, Fès. Réservation rapide, prix transparents." />
        <meta name="keywords" content="location voiture maroc, louer auto casablanca, rent car marrakech, voiture tourisme maroc, location véhicule rabat, agence location tanger" />
        <link rel="canonical" href="https://benatna.ma/louer" />
      </Helmet>
      <StructuredData type="rental" />
      <CarProductSchema cars={filteredCars.slice(0, 20)} />
      <PullToRefreshIndicator 
        isPulling={isPulling}
        isRefreshing={isRefreshing}
        pullDistance={pullDistance}
        pullPercentage={pullPercentage}
      />
      <Header />
      <Breadcrumbs />
      
      {/* Hero with Search and Parallax */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-center mb-8 text-white drop-shadow-lg">
            {t('rent.findIdealCar')}
          </h1>
          
          {/* Search Bar */}
          <Card className="max-w-4xl mx-auto rounded-2xl shadow-xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-xs text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {t('common.city')}
                  </label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="bg-secondary/20 border-0">
                      <SelectValue placeholder="Ville" />
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
                          "w-full justify-start text-left font-normal bg-secondary/20 border-0",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP", { locale: fr }) : "Sélectionner"}
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
                    className="w-full px-3 py-2 bg-secondary/20 border-0 rounded-lg focus:ring-2 focus:ring-primary text-sm"
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
                          "w-full justify-start text-left font-normal bg-secondary/20 border-0",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP", { locale: fr }) : "Sélectionner"}
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
                    className="w-full px-3 py-2 bg-secondary/20 border-0 rounded-lg focus:ring-2 focus:ring-primary text-sm"
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
                        <SelectTrigger className="bg-secondary/20 border-0">
                          <SelectValue placeholder="Toutes les marques" />
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
                        <SelectTrigger className="bg-secondary/20 border-0">
                          <SelectValue placeholder="Toutes les catégories" />
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
                        <SelectTrigger className="bg-secondary/20 border-0">
                          <SelectValue placeholder="Tous les types" />
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
                  className="h-8 w-8 p-0"
                  onClick={() => setViewMode('carousel')}
                  aria-label={t('rent.viewCarousel')}
                >
                  <Rows3 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  className="h-8 w-8 p-0"
                  onClick={() => setViewMode('grid')}
                  aria-label={t('rent.viewGrid')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  className="h-8 w-8 p-0"
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
            {isLoading ? (
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
                      <CarouselPrevious className="left-1 h-8 w-8" />
                      <CarouselNext className="right-1 h-8 w-8" />
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
            {isLoading ? (
              <>
                {[...Array(9)].map((_, i) => (
                  <CarCardSkeleton key={i} viewMode="carousel" />
                ))}
              </>
            ) : (
              <>
                {displayedCars.map((car) => (
                  <Card key={car.id} className="overflow-hidden border-2 hover:shadow-xl transition-shadow rounded-2xl group">
...
                  </Card>
                ))}
              </>
            )}
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
    </div>
  );
};

export default Louer;
