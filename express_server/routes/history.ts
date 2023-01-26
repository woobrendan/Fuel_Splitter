// const express = require("express");
import express, { Request, Response } from "express";
const router = express.Router();
const history = require("../models/history_schema");

router.get("/", async (req: Request, res: Response) => {
  try {
    const results = await history.find();
    res.json(results);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
