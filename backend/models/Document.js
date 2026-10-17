const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },

    fileUrl: {
        type: String,
        required: true
    },

    fileType: {
        type: String,
        required: true
    },

    fileSize: {
        type: Number,
        required: true
    },

    fileHash: {
        type: String,
        required: true
    },
    cloudinaryId: {
        type: String,
        required: true
    },
    cloudinaryResourceType: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
}, {
    timestamps: true
});

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;