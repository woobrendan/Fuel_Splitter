// require("dotenv").config();
import express, { Express } from "express";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 2020;
// const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app: Express = express();

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

mongoose.connect(process.env.COMPASS_URL, { useNewURLParser: true });
const db = mongoose.connection;
db.on("error", (error: express.ErrorRequestHandler) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

const fuelBillRoute = require("./routes/fuelBill.ts");
const historyRoute = require("./routes/history.ts");

app.use("/fuelBill", fuelBillRoute);
app.use("/history", historyRoute);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
