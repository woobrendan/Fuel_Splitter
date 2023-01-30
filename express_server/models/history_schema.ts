// const mongoose = require("mongoose");
import mongoose, { Document, Schema } from "mongoose";
import { FuelBill } from "../models/model";

export interface FuelBillModel extends FuelBill, Document {}

const historySchema: Schema = new Schema(
  {
    totalPrice: { type: Number, required: true },
    totalKM: { type: Number, required: true },
    costPerLitre: { type: Number, required: true },
    brendan: {
      name: { type: String },
      totalKM: { type: Number },
      totalTrips: { type: Number },
      billPortion: { type: Number },
    },
    lory: {
      name: { type: String },
      totalKM: { type: Number },
      totalTrips: { type: Number },
      billPortion: { type: Number },
    },
    david: {
      name: { type: String },
      totalKM: { type: Number },
      totalTrips: { type: Number },
      billPortion: { type: Number },
    },
    parco: {
      name: { type: String },
      totalKM: { type: Number },
      totalTrips: { type: Number },
      billPortion: { type: Number },
    },
    tripLogs: { type: Array },
  },
  {
    versionKey: false,
  },
);

export default mongoose.model<FuelBillModel>("History", historySchema);
