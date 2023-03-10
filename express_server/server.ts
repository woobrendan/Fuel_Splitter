import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import historyRoute from "./routes/history";
import tripLogRoute from "./routes/tripLog";
const morgan = require("morgan");

const router = express();

router.use(morgan("dev"));
mongoose.set("strictQuery", true);

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("Connected");
    startServer();
  })
  .catch((error) => {
    console.log("Error");
  });

// Only start the server if Mongo connects

const startServer = () => {
  router.use((req, res, next) => {
    res.status(res.statusCode);

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  //** Rules of API */
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET",
      );
      return res.status(200).json({});
    }

    next();
  });

  //** Routes */
  router.use("/history", historyRoute);
  router.use("/trips", tripLogRoute);

  //** Health Check */
  router.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "pong" }),
  );

  //** Error handling */
  router.use((req, res, next) => {
    const error = new Error("not found");
    console.log("Error: ", error);
    return res.status(404).json({ message: error.message });
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      console.log(`Server is running on port ${config.server.port}`),
    );
};
