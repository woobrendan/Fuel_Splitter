import express from "express";
import controller from "../controllers/tripLog_controller";

const router = express.Router();

router.post("/create", controller.createTripLog);
router.get("/get/:tripId", controller.readTripLog);
router.get("/get/", controller.readAll);
router.patch("/update/:tripId", controller.udpateTripLog);
router.delete("/delete/all/", controller.deleteAll);
router.delete("/delete/:tripId", controller.deleteTripLog);

export = router;
