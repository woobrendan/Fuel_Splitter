import { configureStore } from "@reduxjs/toolkit";
import historySlice from "./historySlice";
import fuelBill from "./tripSlice";

export const createStore = () =>
  configureStore({
    reducer: {
      fuelHistory: historySlice.reducer,
      fuelBill: fuelBill.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

const store = createStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
