import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FuelBill } from "../model";

interface HistoryState {
  history: FuelBill[];
}

const initialState: HistoryState = { history: [] };

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory(state, action: PayloadAction<FuelBill>) {
      console.log("payload", action.payload);
      state.history = [...state.history, action.payload];
    },
    removeFromHistory(state, action: PayloadAction<any>) {},
  },
});

export const historyActions = historySlice.actions;

export default historySlice;
