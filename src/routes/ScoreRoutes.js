const express = require("express");
const { submitScore, getScore } = require("../controllers/ScoreController");
const router = express.Router();

// Wallet address üzerinden score alma endpoint'i
router.get("/submit/:walletAddress", submitScore);
router.get("/get/:walletAddress", getScore);

module.exports = router;
