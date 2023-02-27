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
  description: string;
  _id?: string;
}

export interface GasBill {
  gasCost: number;
  costPerL: number;
}

export interface NameVal {
  name: string;
  value: boolean;
}

export interface TripDetails {
  date: string;
  totalKM: number;
  involved: string;
  description: string;
}
