import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FuelBill } from "../model";

// export interface TripInfo {
//   isBrendanInvolved: boolean;
//   isLoryInvolved: boolean;
//   isDavidInvolved: boolean;
//   isParcoInvolved: boolean;
//   totalKM: number;
// }

const fuelBill = createSlice({
  name: "fuelBill",
  initialState: {} as FuelBill,
  reducers: {
    addNewTrip(state, action: PayloadAction<FuelBill>) {},
  },
});

export const historyActions = fuelBill.actions;

export default fuelBill;
