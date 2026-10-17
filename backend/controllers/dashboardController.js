const mongoose = require("mongoose");

const Document = require("../models/Document");
const Category = require("../models/Category");
const {
    getStorageDetails,
    USER_STORAGE_LIMIT
} = require("../utils/storage");


// Get dashboard details
const getDashboard = async (req, res) => {
    try {
        // Count total documents of logged-in user
        const totalDocuments = await Document.countDocuments({
            user: req.userId
        });

        // Count total categories of logged-in user
        const totalCategories = await Category.countDocuments({
            user: req.userId
        });

        // Get storage details
        const storage = await getStorageDetails(req.userId);

        res.json({
            totalDocuments: totalDocuments,
            totalCategories: totalCategories,
            storageUsed: storage.storageUsed,
            storageRemaining: storage.storageRemaining, 
            storageLimit: USER_STORAGE_LIMIT
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Get storage details
const getStorage = async (req, res) => {
    try {
        // Get storage details
        const storage = await getStorageDetails(req.userId);

        res.json({
            storageUsed: storage.storageUsed,
            storageRemaining: storage.storageRemaining,
            storageLimit: USER_STORAGE_LIMIT
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    getDashboard,
    getStorage
};