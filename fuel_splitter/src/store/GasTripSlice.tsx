import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FuelBill, TripInfo, GasBill } from "../model";

const initialState: FuelBill = {
  totalPrice: 0,
  totalKM: 0,
  costPerLitre: 0,
  brendan: { name: "Brendan", totalKM: 0, totalTrips: 0, billPortion: 0 },
  lory: { name: "Lory", totalKM: 0, totalTrips: 0, billPortion: 0 },
  david: { name: "David", totalKM: 0, totalTrips: 0, billPortion: 0 },
  parco: { name: "Parco", totalKM: 0, totalTrips: 0, billPortion: 0 },
  tripLogs: [],
};

const fuelBill = createSlice({
  name: "fuelBill",
  initialState,
  reducers: {
    addNewTrip(state, action: PayloadAction<TripInfo>) {
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
        state.brendan.totalKM =
          Math.round((state.brendan.totalKM + costPer) * 100) / 100;
        state.brendan.totalTrips = state.brendan.totalTrips + 1;
      }

      if (isLoryIn) {
        state.lory.totalTrips = state.lory.totalTrips + 1;
        state.lory.totalKM =
          Math.round((state.lory.totalKM + costPer) * 100) / 100;
      }

      if (isParcoIn) {
        state.parco.totalTrips = state.parco.totalTrips + 1;
        state.parco.totalKM =
          Math.round((state.parco.totalKM + costPer) * 100) / 100;
        state.parco.billPortion =
          Math.round((state.parco.totalKM / state.totalKM) * 100) / 100;
      }

      if (isDavidIn) {
        state.david.totalTrips = state.david.totalTrips + 1;
        state.david.totalKM =
          Math.round((state.david.totalKM + costPer) * 100) / 100;
      }
      // recalculate each person bill portion after a new trip has been added
      state.david.billPortion =
        Math.round((state.david.totalKM / state.totalKM) * 100) / 100;
      state.brendan.billPortion =
        Math.round((state.brendan.totalKM / state.totalKM) * 100) / 100;
      state.lory.billPortion =
        Math.round((state.lory.totalKM / state.totalKM) * 100) / 100;
      state.parco.billPortion =
        Math.round((state.parco.totalKM / state.totalKM) * 100) / 100;
    },
    addGasBill(state, action: PayloadAction<GasBill>) {
      state.costPerLitre = action.payload.costPerL;
      state.totalPrice = action.payload.gasCost;
    },
    resetGasTrip(state) {
      state = initialState;
    },
  },
});

export const fuelBillActions = fuelBill.actions;

export default fuelBill;
