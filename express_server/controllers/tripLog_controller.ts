import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import TripLog from "../models/tripLog_schema";

const createTripLog = (req: Request, res: Response) => {};

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

const udpateTripLog = (req: Request, res: Response) => {};

const deleteTripLog = (req: Request, res: Response) => {};

const deleteAll = (req: Request, res: Response) => {};
