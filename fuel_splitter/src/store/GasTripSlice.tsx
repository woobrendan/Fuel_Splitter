import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FuelBill } from "../model";

// export interface TripInfo {
//   isBrendanIn: boolean;
//   isLoryIn: boolean;
//   isDavidIn: boolean;
//   isParcoIn: boolean;
//   totalKM: number;
// }

// const TripInfo = {
//   isBrendanIn: true,
//   isLoryIn: true,
//   isDavidIn: false,
//   isParcoIn: true,
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
    addNewTrip(
      state,
      action: PayloadAction<{
        isBrendanIn: boolean;
        isLoryIn: boolean;
        isDavidIn: boolean;
        isParcoIn: boolean;
        totalKM: number;
      }>,
    ) {
      const { isBrendanIn, isDavidIn, isLoryIn, isParcoIn, totalKM } =
        action.payload;

      let count: number = 0;
      const involvment = [isBrendanIn, isDavidIn, isLoryIn, isParcoIn];

      for (let check of involvment) {
        if (check) count++;
      }

      const costPer: number = totalKM / count;

      if (isBrendanIn) {
        state.Brendan.totalTrips = state.Brendan.totalTrips + 1;
        state.Brendan.totalKM = state.Brendan.totalKM + costPer;
      }

      if (isLoryIn) {
        state.Lory.totalTrips = state.Lory.totalTrips + 1;
        state.Lory.totalKM = state.Lory.totalKM + costPer;
      }

      if (isParcoIn) {
        state.Parco.totalTrips = state.Parco.totalTrips + 1;
        state.Parco.totalKM = state.Parco.totalKM + costPer;
      }

      if (isDavidIn) {
        state.David.totalTrips = state.David.totalTrips + 1;
        state.David.totalKM = state.David.totalKM + costPer;
      }
    },
  },
});

export const fuelBillActions = fuelBill.actions;

export default fuelBill;
