import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FuelBill } from "../model";

const initialState = {} as FuelBill;

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
});

export const historyActions = historySlice.actions;

export default historySlice;
