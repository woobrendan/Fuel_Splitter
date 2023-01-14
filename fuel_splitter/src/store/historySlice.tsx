import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FuelBill } from "../model";
import { tempHistory } from "../temp";

interface HistoryState {
  history: FuelBill[];
}

const initialState: HistoryState = { history: [...tempHistory] };

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory(state, action: PayloadAction<FuelBill>) {
      state.history = [...state.history, action.payload];
    },
    removeFromHistory(state, action: PayloadAction<any>) {},
  },
});

export const historyActions = historySlice.actions;

export default historySlice;
