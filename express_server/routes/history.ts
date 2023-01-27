import express from "express";
import controller from "../controllers/history_controller";

const router = express.Router();

router.post("/create", controller.createHistory);
router.get("/get/:historyId", controller.readHistory);
router.get("/get/", controller.readAll);
router.patch("/update/:historyId", controller.updateHistory);
router.delete("/delete/", controller.deleteHistory);

export = router;
