import express, { Request, Response } from "express";
const router = express.Router();
const fuelBill = require("../models/fuelBill_schema");

// router.get("/", (req, res) => {
//   res.send("Hello Me World");
// });

router.get("/", async (req: Request, res: Response) => {
  try {
    const results = await fuelBill.find();
    console.log("results", results);
    res.json(results);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
