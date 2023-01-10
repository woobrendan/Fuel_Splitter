export interface IndividualInfo {
  name?: string;
  totalKM: number;
  totalTrips: number;
  billPortion: number;
}

export interface FuelBill {
  totalPrice: number;
  totalKM: number;
  costPerLitre: number;
  brendan: IndividualInfo;
  lory: IndividualInfo;
  david: IndividualInfo;
  parco: IndividualInfo;
  tripLogs: TripInfo[];
}

export interface TripInfo {
  isBrendanIn: boolean;
  isLoryIn: boolean;
  isDavidIn: boolean;
  isParcoIn: boolean;
  totalKM: number;
  date: Date | null;
}

export interface GasBill {
  gasCost: number;
  costPerL: number;
}
