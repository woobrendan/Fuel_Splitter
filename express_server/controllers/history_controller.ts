import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import History from "../models/history_schema";

const createHistory = (req: Request, res: Response, next: NextFunction) => {
  const { totalKM, totalPrice, costPerLitre } = req.body;
  const copyOfArr = req.body.tripLogs.map((log) => ({ ...log }));
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
};
const readHistory = (req: Request, res: Response, next: NextFunction) => {};
const readAllHistory = (req: Request, res: Response, next: NextFunction) => {};
const updateHistory = (req: Request, res: Response, next: NextFunction) => {};
const deleteHistory = (req: Request, res: Response, next: NextFunction) => {};
