import { rentalVehicleNames } from "@/data/rentalVehicleNames";
import { approvedPremiumVehicles } from "@/data/premiumVehicles";
const allowedNames: ReadonlySet<string> = new Set(rentalVehicleNames);
const premiumNames: ReadonlySet<string> = new Set(approvedPremiumVehicles.map(model => model.name));
export const isClassicTourismCar = (name: string) => allowedNames.has(name.replace(/^VW /, "Volkswagen "));
export const isPremiumTourismCar = (name: string) => premiumNames.has(name);
