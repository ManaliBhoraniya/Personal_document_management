const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

const router = express.Router();


// Create category
router.post("/", authMiddleware, createCategory);


// Get user's categories
router.get("/", authMiddleware, getCategories);


// Update category
router.put("/:id", authMiddleware, updateCategory);


// Delete category
router.delete("/:id", authMiddleware, deleteCategory);


module.exports = router;