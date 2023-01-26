const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("history", historySchema);
