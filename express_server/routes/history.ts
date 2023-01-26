const express = require("express");
const router = express.Router();
const history = require("../models/history_schema");

router.get("/", async (req: Express.Request, res: Express.Response) => {
  try {
    const results = await history.find();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
