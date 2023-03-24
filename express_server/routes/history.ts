import express from "express";
import controller from "../controllers/history_controller";

const router = express.Router();

//localhost.../history

router.post("/", controller.createHistory);
router.get("/:historyId", controller.readHistory);
router.get("/", controller.readAll);
router.patch("/:historyId", controller.updateHistory);
router.delete("/all", controller.deleteAll);
router.delete("/:historyId", controller.deleteHistory);

export = router;
