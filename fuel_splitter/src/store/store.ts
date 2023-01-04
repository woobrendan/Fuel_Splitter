import { configureStore } from "@reduxjs/toolkit";
import historySlice from "./historySlice";
import fuelBill from "./GasTripSlice";

const store = configureStore({
  reducer: {
    fuelHistory: historySlice.reducer,
    fuelBill: fuelBill.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
