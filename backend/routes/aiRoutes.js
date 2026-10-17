const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    askQuestion
} = require("../controllers/aiController");

router.post(
    "/ask/:documentId",
    authMiddleware,
    askQuestion
);

module.exports = router;