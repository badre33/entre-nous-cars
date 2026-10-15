// Indicative tourist-car catalogue; luxury and commercial transport are excluded.
export const isClassicTourismCar = (name: string) =>
  !/mercedes|\bbmw\b|\baudi\b|porsche|maserati|jaguar|range rover|land rover|lexus|volvo|bentley|ferrari|lamborghini|staria|vito|multivan/i.test(name);
