import { TripInfo } from "./Models/tripModels";

export interface IndividualInfo {
  name?: string;
  totalKM: number;
  totalTrips: number;
  billPortion: number;
}

//for history of all fuel bills
export interface FuelBill {
  totalPrice: number;
  totalKM: number;
  costPerLitre: number;
  brendan: IndividualInfo;
  lory: IndividualInfo;
  david: IndividualInfo;
  parco: IndividualInfo;
  tripLogs: TripInfo[];
  _id?: string;
}

// Gas Pay component of SingleTrip
export interface GasBill {
  gasCost: number;
  costPerL: number;
}
