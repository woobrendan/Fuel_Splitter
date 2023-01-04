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
  tripLogs: [],
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

      //check how many people are involved, then divide to find portion of km
      let count: number = 0;
      const involvment = [isBrendanIn, isDavidIn, isLoryIn, isParcoIn];

      for (let check of involvment) {
        if (check) count++;
      }

      const costPer: number = totalKM / count;

      // Add new trip KMs total. add Trip to logs
      state.totalKM += totalKM;
      state.tripLogs = [...state.tripLogs, action.payload];

      //check each individual to see if theyre involved, and adjust trip numbers accordingly
      if (isBrendanIn) {
        state.Brendan.totalKM =
          Math.round((state.Brendan.totalKM + costPer) * 100) / 100;
        state.Brendan.totalTrips = state.Brendan.totalTrips + 1;
      }

      if (isLoryIn) {
        state.Lory.totalTrips = state.Lory.totalTrips + 1;
        state.Lory.totalKM =
          Math.round((state.Lory.totalKM + costPer) * 100) / 100;
      }

      if (isParcoIn) {
        state.Parco.totalTrips = state.Parco.totalTrips + 1;
        state.Parco.totalKM =
          Math.round((state.Parco.totalKM + costPer) * 100) / 100;
        state.Parco.billPortion =
          Math.round((state.Parco.totalKM / state.totalKM) * 100) / 100;
      }

      if (isDavidIn) {
        state.David.totalTrips = state.David.totalTrips + 1;
        state.David.totalKM =
          Math.round((state.David.totalKM + costPer) * 100) / 100;
      }
      // recalculate each person bill portion after a new trip has been added
      state.David.billPortion =
        Math.round((state.David.totalKM / state.totalKM) * 100) / 100;
      state.Brendan.billPortion =
        Math.round((state.Brendan.totalKM / state.totalKM) * 100) / 100;
      state.Lory.billPortion =
        Math.round((state.Lory.totalKM / state.totalKM) * 100) / 100;
      state.Parco.billPortion =
        Math.round((state.Parco.totalKM / state.totalKM) * 100) / 100;
    },
  },
});

export const fuelBillActions = fuelBill.actions;

export default fuelBill;
