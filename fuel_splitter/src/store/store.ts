import { configureStore } from "@reduxjs/toolkit";
import historySlice from "./historySlice";

const store = configureStore({
  reducer: {
    fuelHistory: historySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
