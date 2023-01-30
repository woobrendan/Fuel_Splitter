import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import History from "../models/history_schema";
import { TripInfo } from "../models/model";

const createHistory = (req: Request, res: Response, next: NextFunction) => {
  const { totalKM, totalPrice, costPerLitre } = req.body;
  const copyOfArr = req.body.tripLogs.map((log: TripInfo) => ({ ...log }));
  const history = new History({
    _id: new mongoose.Types.ObjectId(),
    totalKM,
    totalPrice,
    costPerLitre,
    brendan: { ...req.body.brendan },
    lory: { ...req.body.lory },
    david: { ...req.body.david },
    parco: { ...req.body.parco },
    tripLogs: copyOfArr,
  });

  return history
    .save()
    .then((history) => res.status(201).json({ history }))
    .catch((error) => res.status(500).json({ error }));

  // await history.save()
  // res.status(201).json({history})
};

const readHistory = async (req: Request, res: Response) => {
  const historyId = req.params.historyId;
  try {
    const history = await History.findById(historyId);
    return history
      ? res.status(200).json({ history })
      : res.status(404).json({ message: "History not found" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return History.find()
    .then((history) => res.status(200).json({ history }))
    .catch((error) => res.status(500).json({ error }));
};

const updateHistory = (req: Request, res: Response, next: NextFunction) => {
  const historyId = req.params.historyId;
  return History.findById(historyId)
    .then((history) => {
      if (history) {
        history.set(req.body);
        return history
          .save()
          .then((history) => res.status(201).json({ history }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: "History not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteHistory = (req: Request, res: Response, next: NextFunction) => {
  const historyId = req.params.historyId;
  return History.findByIdAndDelete(historyId)
    .then((history) =>
      history
        ? res.status(201).json({ message: "Deleted" })
        : res.status(404).json({ message: "Not Found" }),
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createHistory,
  readHistory,
  readAll,
  updateHistory,
  deleteHistory,
};
