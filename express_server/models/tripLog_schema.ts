import mongoose, { Document, Schema } from "mongoose";
import { TripInfo } from "./model";

export interface TripInfoModel extends TripInfo, Document {}

const tripInfoSchema: Schema = new Schema(
  {
    isBrendanIn: { type: Boolean },
    isLoryIn: { type: Boolean },
    isDavidIn: { type: Boolean },
    isParcoIn: { type: Boolean },
    totalKM: { type: Number },
    date: { type: Date },
    description: { type: String },
  },
  { versionKey: false },
);

export default mongoose.model<TripInfoModel>("TripInfo", tripInfoSchema);
