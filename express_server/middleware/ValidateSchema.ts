import Joi, { ObjectSchema } from "joi";
import { Response, Request, NextFunction } from "express";
import { FuelBill } from "../models/model";

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      console.log("Error:", error);
      return res.status(422).json({ error });
    }
  };
};

const indivInfo = Joi.object().keys({
  name: Joi.string().required(),
  totalKM: Joi.number().required(),
  totalTrips: Joi.number().required(),
  billPortion: Joi.number().required(),
});

const tripInfo = Joi.object().keys({
  isBrendanIn: Joi.boolean().required(),
  isLoryIn: Joi.boolean().required(),
  isDavidIn: Joi.boolean().required(),
  isParcoIn: Joi.boolean().required(),
  totalKM: Joi.number().required(),
  date: Joi.date().required(),
  description: Joi.string().required(),
  _id: Joi.string().required(),
});

export const Schemas = {
  history: {
    create: Joi.object<FuelBill>({
      totalPrice: Joi.number().required(),
      totalKM: Joi.number().required(),
      costPerLitre: Joi.number().required(),
      brendan: indivInfo,
      lory: indivInfo,
      david: indivInfo,
      parco: indivInfo,
      tripLogs: Joi.array().items(tripInfo),
    }),
  },
};
