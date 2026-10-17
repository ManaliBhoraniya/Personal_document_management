const mongoose = require("mongoose");
const Document = require("../models/Document");

const USER_STORAGE_LIMIT = 2 * 1024 * 1024 * 1024; // 2 GB


const getStorageDetails = async (userId) => {
    const currentStorage = await Document.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $group: {
                _id: null,
                totalSize: {
                    $sum: "$fileSize"
                }
            }
        }
    ]);

    const storageUsed = currentStorage.length > 0
        ? currentStorage[0].totalSize
        : 0;

    const storageRemaining = USER_STORAGE_LIMIT - storageUsed;

    return {
        storageUsed,
        storageRemaining,
        storageLimit: USER_STORAGE_LIMIT
    };
};


module.exports = {
    getStorageDetails,
    USER_STORAGE_LIMIT
};