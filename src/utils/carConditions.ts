// Utility to generate standardized car rental conditions
// All cars have unlimited mileage and only require minimum age

export const generateCarConditions = (minAge: number): string[] => {
  return [
    "Kilométrage illimité",
    `Âge minimum: ${minAge} ans`
  ];
};

// Extract minimum age from old condition strings (for migration)
export const extractMinAge = (conditions: string[]): number => {
  const ageCondition = conditions.find(c => c.includes("Âge minimum"));
  if (ageCondition) {
    const match = ageCondition.match(/\d+/);
    return match ? parseInt(match[0]) : 21;
  }
  return 21; // default
};
