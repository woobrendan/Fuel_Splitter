interface IndividualInfo {
  totalKM: number;
  totalTrips: number;
  billPortion: number;
}

export interface FuelBill {
  totalPrice: number;
  totalKM: number;
  costPerLitre: number;
  Brendan: IndividualInfo;
  Lory: IndividualInfo;
  David: IndividualInfo;
  Parco: IndividualInfo;
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
