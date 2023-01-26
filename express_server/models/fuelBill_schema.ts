import mongoose from "mongoose";

const fuelBillSchema = new mongoose.Schema({
  totalPrice: { type: Number },
  totalKM: { type: Number },
  costPerLitre: { type: Number },
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
});

module.exports = mongoose.model("fuelBill", fuelBillSchema);
