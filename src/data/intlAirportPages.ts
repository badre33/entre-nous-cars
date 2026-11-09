export type IntlLang = 'en' | 'es';

export interface IntlAirportContent {
  lang: IntlLang;
  path: string;
  title: string;
  description: string;
  breadcrumb: string;
  heading: string;
  intro: string;
  minimum: string;
  ctaWhatsApp: string;
  ctaCatalogue: string;
  whatsAppText: string;
  pricesTitle: string;
  from: string;
  perDay: string;
  pricesNote: string;
  models: { slug: string; label: string }[];
  audienceTitle: string;
  audience: { title: string; text: string }[];
  exclusions: string;
  sections: { title: string; text: string }[];
  faqTitle: string;
  faqs: { question: string; answer: string }[];
}

export const intlAirportPages: Record<IntlLang, IntlAirportContent> = {
  en: {
    lang: 'en',
    path: '/en/car-rental-casablanca-airport',
    title: 'Car Rental Casablanca Airport (CMN) from 250 MAD/day | Benatna',
    description: 'Rent a car at Casablanca Mohammed V Airport from 250 MAD/day. Free delivery at the airport, city cars, SUVs and 7-seaters from local rental companies. 3 days minimum, book on WhatsApp.',
    breadcrumb: 'Casablanca airport',
    heading: 'Car rental at Casablanca Mohammed V Airport from 250 MAD/day',
    intro: 'Landing in Casablanca for a holiday or to visit family? Send your dates and flight on WhatsApp before you travel: a local rental company based in Casablanca meets you at Mohammed V Airport with the car, with no delivery fee. City cars from 250 MAD per day, SUVs and 7-seaters from 380 MAD.',
    minimum: 'Three days minimum. Tourist cars only, for visitors, Moroccans living abroad and residents.',
    ctaWhatsApp: 'Ask for a car on WhatsApp',
    ctaCatalogue: 'See all models and prices',
    whatsAppText: 'Hello Benatna, I am looking for a rental car at Casablanca airport.\n\nArrival date and time: \nReturn date (3 days minimum): \nPreferred car: \nNumber of passengers and suitcases: ',
    pricesTitle: 'Starting prices by model',
    from: 'from',
    perDay: '/day',
    pricesNote: 'Starting daily prices outside July-August and holiday periods, for a rental of at least three days. The rental company confirms the car and the total price for your dates.',
    models: [
      { slug: 'dacia-sandero', label: 'City car · manual' },
      { slug: 'dacia-logan', label: 'Sedan · large boot · manual' },
      { slug: 'renault-clio', label: 'City car · manual or automatic' },
      { slug: 'dacia-duster', label: 'SUV · manual or automatic' },
      { slug: 'dacia-jogger', label: '7 seats · manual' },
      { slug: 'hyundai-tucson', label: 'Family SUV · automatic' },
    ],
    audienceTitle: 'Who is it for?',
    audience: [
      { title: 'Moroccans living abroad', text: 'Coming home for the holidays with family and luggage: the car is waiting at the airport for your whole stay.' },
      { title: 'Tourists', text: 'Explore Casablanca and the region at your own pace, without queuing at a rental desk.' },
      { title: 'Residents of Morocco', text: 'Guests to pick up, a family trip or your own car at the garage: same service and prices, from three days.' },
    ],
    exclusions: 'Tourist cars only: no vans, minibuses, utility vehicles, wedding cars or corporate rental. Benatna is a marketplace: the contract, deposit and payment are handled directly with the local rental company.',
    sections: [
      { title: 'A car waiting when you land', text: 'Include your arrival date and time in your request. The rental company agrees a meeting point at Mohammed V Airport with you. If your flight is delayed or changed, let them know on WhatsApp so the handover can be adjusted.' },
      { title: 'What the price includes', text: 'Delivery at the airport is free. Prices are higher in July-August and around holidays. The rental company confirms the total price, the deposit and the documents required before you agree. There is no online payment.' },
      { title: 'Returning the car', text: 'Return the car at the airport before your flight home, or at another agreed point in Casablanca. Give your departure date and time in your request.' },
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { question: 'How much is a rental car at Casablanca airport?', answer: 'From 250 MAD per day for a city car or a sedan and from 380 MAD for an SUV or a 7-seater, outside high season, for at least three days. Delivery at the airport is free.' },
      { question: 'Is there a Benatna desk at the airport?', answer: 'No. The rental company meets you at a meeting point agreed in advance, so there is no queue at a rental desk.' },
      { question: 'What is the minimum rental period?', answer: 'Three days. One-day rentals are not available.' },
      { question: 'How do I book?', answer: 'On WhatsApp: send your dates, arrival time and preferred car. Benatna confirms your booking within 1 hour, with the total price and bank details. Your booking is guaranteed once the 30% deposit is received by bank transfer.' },
      { question: 'Can I pick up the car in another city?', answer: 'Pick-up is in Casablanca (airport, train stations and city). Delivery to Rabat is possible on request.' },
    ],
  },
  es: {
    lang: 'es',
    path: '/es/alquiler-coche-aeropuerto-casablanca',
    title: 'Alquiler de coche aeropuerto Casablanca desde 250 MAD/día | Benatna',
    description: 'Alquila un coche en el aeropuerto Mohammed V de Casablanca desde 250 MAD/día. Entrega gratuita en el aeropuerto, utilitarios, SUV y 7 plazas de agencias locales. Mínimo 3 días, reserva por WhatsApp.',
    breadcrumb: 'Aeropuerto de Casablanca',
    heading: 'Alquiler de coche en el aeropuerto Mohammed V de Casablanca desde 250 MAD/día',
    intro: '¿Llegas a Casablanca de vacaciones o para visitar a la familia? Envía tus fechas y tu vuelo por WhatsApp antes de viajar: una agencia de alquiler de Casablanca te espera en el aeropuerto Mohammed V con el coche, sin gastos de entrega. Utilitarios desde 250 MAD al día, SUV y 7 plazas desde 380 MAD.',
    minimum: 'Mínimo tres días. Solo coches de turismo, para viajeros, marroquíes residentes en el extranjero y residentes.',
    ctaWhatsApp: 'Pedir un coche por WhatsApp',
    ctaCatalogue: 'Ver todos los modelos y precios',
    whatsAppText: 'Hola Benatna, busco un coche de alquiler en el aeropuerto de Casablanca.\n\nFecha y hora de llegada: \nFecha de devolución (mínimo 3 días): \nCoche deseado: \nNúmero de pasajeros y maletas: ',
    pricesTitle: 'Precios desde, por modelo',
    from: 'desde',
    perDay: '/día',
    pricesNote: 'Precios diarios de partida fuera de julio-agosto y de periodos festivos, para un alquiler de tres días como mínimo. La agencia confirma el coche y el precio total para tus fechas.',
    models: [
      { slug: 'dacia-sandero', label: 'Utilitario · manual' },
      { slug: 'dacia-logan', label: 'Berlina · maletero grande · manual' },
      { slug: 'renault-clio', label: 'Utilitario · manual o automático' },
      { slug: 'dacia-duster', label: 'SUV · manual o automático' },
      { slug: 'dacia-jogger', label: '7 plazas · manual' },
      { slug: 'hyundai-tucson', label: 'SUV familiar · automático' },
    ],
    audienceTitle: '¿Para quién?',
    audience: [
      { title: 'Marroquíes residentes en el extranjero', text: 'Vuelves de vacaciones con la familia y las maletas: el coche te espera en el aeropuerto durante toda tu estancia.' },
      { title: 'Turistas', text: 'Descubre Casablanca y la región a tu ritmo, sin colas en el mostrador de alquiler.' },
      { title: 'Residentes en Marruecos', text: 'Invitados que recoger, un viaje en familia o tu coche en el taller: mismo servicio y mismos precios, desde tres días.' },
    ],
    exclusions: 'Solo coches de turismo: sin furgonetas, minibuses, vehículos utilitarios, coches de boda ni alquiler para empresas. Benatna es un marketplace: el contrato, la fianza y el pago se gestionan directamente con la agencia local.',
    sections: [
      { title: 'Un coche esperándote al aterrizar', text: 'Indica la fecha y hora de llegada en tu solicitud. La agencia acuerda contigo un punto de encuentro en el aeropuerto Mohammed V. Si tu vuelo se retrasa o cambia, avísales por WhatsApp para adaptar la entrega.' },
      { title: 'Qué incluye el precio', text: 'La entrega en el aeropuerto es gratuita. Los precios suben en julio-agosto y en periodos festivos. La agencia confirma el precio total, la fianza y los documentos necesarios antes de tu acuerdo. No hay pago en línea.' },
      { title: 'Devolución del coche', text: 'Devuelve el coche en el aeropuerto antes de tu vuelo de regreso, o en otro punto acordado de Casablanca. Indica la fecha y hora de salida en tu solicitud.' },
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { question: '¿Cuánto cuesta alquilar un coche en el aeropuerto de Casablanca?', answer: 'Desde 250 MAD al día para un utilitario o una berlina y desde 380 MAD para un SUV o un coche de 7 plazas, fuera de temporada alta, con un mínimo de tres días. La entrega en el aeropuerto es gratuita.' },
      { question: '¿Hay un mostrador de Benatna en el aeropuerto?', answer: 'No. La agencia te recibe en un punto de encuentro acordado de antemano, sin colas en un mostrador.' },
      { question: '¿Cuál es la duración mínima?', answer: 'Tres días. No se alquila por un solo día.' },
      { question: '¿Cómo reservo?', answer: 'Por WhatsApp: envía tus fechas, tu hora de llegada y el coche deseado. Benatna confirma tu reserva en 1 hora, con el precio total y los datos bancarios. Tu reserva queda garantizada al recibir el anticipo del 30 % por transferencia.' },
      { question: '¿Puedo recoger el coche en otra ciudad?', answer: 'La recogida es en Casablanca (aeropuerto, estaciones y ciudad). La entrega en Rabat es posible bajo petición.' },
    ],
  },
};

export const airportAlternates = {
  fr: '/location-voiture-aeroport-casablanca',
  en: intlAirportPages.en.path,
  es: intlAirportPages.es.path,
};
