import express from "express";
import controller from "../controllers/tripLog_controller";

const router = express.Router();

router.post("/", controller.createTripLog);
router.get("/", controller.readAll);
router.get("/:tripId", controller.readTripLog);
router.patch("/:tripId", controller.udpateTripLog);
router.delete("/all", controller.deleteAll);
router.delete("/:tripId", controller.deleteTripLog);

export = router;
