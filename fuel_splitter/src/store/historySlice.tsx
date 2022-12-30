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
    addToHistory(state, action: PayloadAction<any>) {},
    removeFromHistory(state, action: PayloadAction<any>) {},
  },
});

export const historyActions = historySlice.actions;

export default historySlice;
