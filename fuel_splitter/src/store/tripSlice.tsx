import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FuelBill, GasBill } from "../model";
import { TripInfo } from "../Models/tripModels";
import { addTrip } from "./tripActions";

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
      state = addTrip(state, action.payload);
    },

    addGasBill(state, action: PayloadAction<GasBill>) {
      state.costPerLitre = action.payload.costPerL;
      state.totalPrice = action.payload.gasCost;
    },

    resetGasTrip(state) {
      state = initialState;
    },

    setTripLogs(state, action: PayloadAction<TripInfo[]>) {
      const idArr: string[] = [];
      for (let trip of state.tripLogs) {
        idArr.push(trip._id!);
      }

      let tempState = state;
      for (let log of action.payload) {
        if (!idArr.includes(log._id!)) {
          tempState = addTrip(tempState, log);
        }
      }
      state = tempState;
    },

    updateTripLog(state, action: PayloadAction<TripInfo>) {
      const trips = [...state.tripLogs];
      const newTrips = trips.map((trip) =>
        trip._id === action.payload._id ? { ...action.payload } : trip,
      );

      state.tripLogs = [...newTrips];
    },

    removeTripLog(state, action: PayloadAction<TripInfo>) {
      const trips = [...state.tripLogs];
      const filtered = trips.filter((trip) => trip._id !== action.payload._id);

      state.tripLogs = filtered;
    },
  },
});

export const fuelBillActions = fuelBill.actions;

export default fuelBill;
