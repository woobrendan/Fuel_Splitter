import { Request, Response } from "express";
import mongoose from "mongoose";
import TripLog from "../models/tripLog_schema";

const createTripLog = (req: Request, res: Response) => {
  const trip = new TripLog({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  });
  return trip
    .save()
    .then((trip) => res.status(201).json({ trip }))
    .catch((error) => res.status(500).json({ error }));
};

const readTripLog = async (req: Request, res: Response) => {
  const tripId = req.params.tripId;
  try {
    const tripLog = await TripLog.findById(tripId);
    return tripLog
      ? res.status(200).json({ tripLog })
      : res.status(404).json({ message: "Trip not found" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readAll = (req: Request, res: Response) => {
  return TripLog.find()
    .then((tripLogs) => res.status(200).json({ tripLogs }))
    .catch((error) => res.status(500).json({ error }));
};

const udpateTripLog = async (req: Request, res: Response) => {
  const tripId = req.params.tripId;
  try {
    const tripLog = await TripLog.findById(tripId);
    if (tripLog) {
      tripLog.set(req.body);
      const updated = await tripLog.save();
      return res.status(200).json({ updated });
    } else {
      res.status(404).json({ message: "Trip not found" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteTripLog = async (req: Request, res: Response) => {
  const tripId = req.params.tripId;
  try {
    const trip = await TripLog.findByIdAndDelete(tripId);
    return trip
      ? res.status(201).json({ message: "Deleted" })
      : res.status(404).json({ message: "Not Found" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteAll = (req: Request, res: Response) => {
  return TripLog.deleteMany({})
    .then((trip) =>
      trip
        ? res.status(201).json({ message: "Deleted" })
        : res.status(404).json({ message: "Not Found" }),
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createTripLog,
  readTripLog,
  readAll,
  udpateTripLog,
  deleteAll,
  deleteTripLog,
};
