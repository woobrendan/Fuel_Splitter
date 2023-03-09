import express from "express";
import controller from "../controllers/history_controller";

const router = express.Router();

//localhost.../history

router.post("/new", controller.createHistory);
router.get("/get/:historyId", controller.readHistory);
router.get("/get/", controller.readAll);
router.patch("/update/:historyId", controller.updateHistory);
router.delete("/delete/:historyId", controller.deleteHistory);
router.delete("/delete/all", controller.deleteAll);

export = router;
