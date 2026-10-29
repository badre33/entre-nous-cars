interface OfferSchemaProps { city?: string }
// Previous fixed discounts and 150/170/180 MAD offers have no current visible
// equivalent. Keep compatibility with callers; publish only verified offers.
export const OfferSchema = (_props: OfferSchemaProps) => null;
