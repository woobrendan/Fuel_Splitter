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
      state.history = [...state.history, action.payload];
    },
    removeFromHistory(state, action: PayloadAction<any>) {
      const historyCopy = [...state.history];
      const filtered = historyCopy.filter(
        (history) => history._id !== action.payload._id,
      );
      state.history = [...filtered];
    },
    setHistory(state, action: PayloadAction<FuelBill[]>) {
      state.history = [...action.payload];
    },
  },
});

export const historyActions = historySlice.actions;

export default historySlice;
