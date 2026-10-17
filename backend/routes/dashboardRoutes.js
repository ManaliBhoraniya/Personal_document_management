const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getDashboard,
    getStorage
} = require("../controllers/dashboardController");


// Dashboard
router.get("/", authMiddleware, getDashboard);


// Storage page
router.get("/storage", authMiddleware, getStorage);


module.exports = router;