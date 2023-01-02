import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FuelBill } from "../model";

// export interface TripInfo {
//   isBrendanInvolved: boolean;
//   isLoryInvolved: boolean;
//   isDavidInvolved: boolean;
//   isParcoInvolved: boolean;
//   totalKM: number;
// }

// const TripInfo = {
//   isBrendanInvolved: true,
//   isLoryInvolved: true,
//   isDavidInvolved: false,
//   isParcoInvolved: true,
//   totalKM: 15,
// };

const initialState: FuelBill = {
  totalPrice: 0,
  totalKM: 0,
  costPerLitre: 0,
  Brendan: { totalKM: 0, totalTrips: 0, billPortion: 0 },
  Lory: { totalKM: 0, totalTrips: 0, billPortion: 0 },
  David: { totalKM: 0, totalTrips: 0, billPortion: 0 },
  Parco: { totalKM: 0, totalTrips: 0, billPortion: 0 },
};

const fuelBill = createSlice({
  name: "fuelBill",
  initialState,
  reducers: {
    addNewTrip(state, action: PayloadAction<FuelBill>) {},
  },
});

export const historyActions = fuelBill.actions;

export default fuelBill;
