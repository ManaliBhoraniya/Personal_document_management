const Category = require("../models/Category");

// Create category
const createCategory = async (req, res) => {
    try {
        const category = await Category.create({
            name: req.body.name,
            user: req.userId
        });

        res.status(201).json({
            message: "Category created successfully",
            category
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Get user's categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({
            user: req.userId
        });

        res.json(categories);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Update category name
const updateCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.userId
            },
            {
                name: req.body.name
            },
            {
                new: true
            }
        );

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.json({
            message: "Category updated successfully",
            category
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Delete category
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.json({
            message: "Category deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
};