import { TripInfo } from "./Models/tripModels";

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

export interface GasBill {
  gasCost: number;
  costPerL: number;
}

export interface TripDetails {
  date: string;
  totalKM: number;
  involved: string;
  description: string;
}
