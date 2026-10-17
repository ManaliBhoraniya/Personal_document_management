//const fs = require("fs");
const mongoose = require("mongoose");   
const crypto = require("crypto");
const https = require("https");
const { extractDocumentText } = require("../utils/documentExtractor");
const {
    getStorageDetails,
    USER_STORAGE_LIMIT
} = require("../utils/storage");
const cloudinary = require("../config/cloudinary");
const Document = require("../models/Document");
const Category = require("../models/Category");



// Get documents by category
const getDocumentsByCategory = async (req, res) => {
    try {
        const documents = await Document.find({
        category: req.params.categoryId,
        user: req.userId
        }).populate("category", "name");

        res.json(documents);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Get single document
const getDocument = async (req, res) => {
    try {
        const document = await Document.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!document) {
            return res.status(404).json({
                message: "Document not found"
            });
        }

        res.json(document);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// Get all documents of logged-in user
const getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find({
            user: req.userId
        }).populate("category", "name");

        res.json(documents);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// Upload document
const uploadDocument = async (req, res) => {
    try {
        const { category } = req.body;

        const fileBuffer = req.file.buffer;

        // Create SHA-256 hash
        const fileHash = crypto
            .createHash("sha256")
            .update(fileBuffer)
            .digest("hex");


        // Check for duplicate document
        const existingDocument = await Document.findOne({
            user: req.userId,
            fileHash: fileHash
        });

        if (existingDocument) {

            return res.status(400).json({
                message: "Duplicate document already exists"
            });
        }


        // Check category
        const categoryExists = await Category.findOne({
            _id: category,
            user: req.userId
        });

        if (!categoryExists) {

            return res.status(404).json({
                message: "Category not found"
            });
        }

        // Check storage limit
        const storage = await getStorageDetails(req.userId);

        if (storage.storageUsed + req.file.size > USER_STORAGE_LIMIT) {
        return res.status(400).json({
        message: "Storage limit exceeded. You can use maximum 2 GB."
        });
        }


        // Upload to Cloudinary
        const cloudinaryResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "personal-document-management",
                    resource_type: "auto"
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            uploadStream.end(fileBuffer);
        });


        // Create document
        const document = await Document.create({
            filename: req.file.originalname,
            fileUrl: cloudinaryResult.secure_url,  
            fileType: req.file.mimetype,   //which type of file is stored like pdf,jpg,png,txt
            fileSize: req.file.size,
            fileHash: fileHash,
            cloudinaryId: cloudinaryResult.public_id,
            cloudinaryResourceType: cloudinaryResult.resource_type,
            user: req.userId,
            category: category
        });


        res.status(201).json({
            message: "Document uploaded successfully",
            document
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Delete document
const deleteDocument = async (req, res) => {
    try {
        const document = await Document.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!document) {
            return res.status(404).json({
                message: "Document not found"
            });
        }

         // Delete file from Cloudinary
        await cloudinary.uploader.destroy(
            document.cloudinaryId,
            {
                resource_type: document.cloudinaryResourceType,
                invalidate: true
            }
        );  

        await Document.findByIdAndDelete(req.params.id);


        res.json({
            message: "Document deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// Search documents by filename or category name
const searchDocuments = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                message: "Search query is required"
            });
        }

        // Find user's documents and category names
        const documents = await Document.find({
            user: req.userId
        }).populate("category", "name");

        // Search by filename OR category name
        const searchResults = documents.filter((document) => {
            const filenameMatch = document.filename
                .toLowerCase()
                .includes(query.toLowerCase());

            const categoryMatch = document.category &&
                document.category.name
                    .toLowerCase()
                    .includes(query.toLowerCase());

            return filenameMatch || categoryMatch;
        });

        res.json(searchResults);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// Rename document
const renameDocument = async (req, res) => {
    try {
        const { filename } = req.body;

        if (!filename) {
            return res.status(400).json({
                message: "New filename is required"
            });
        }

        const document = await Document.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.userId
            },
            {
                filename: filename
            },
            {
                new: true
            }
        );

        if (!document) {
            return res.status(404).json({
                message: "Document not found"
            });
        }

        res.json({
            message: "Document renamed successfully",
            document
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// Extract text from a PDF document
const getDocumentText  = async (req, res) => {
    try {
        const document = await Document.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!document) {
            return res.status(404).json({
                message: "Document not found"
            });
        }

        if (document.fileType !== "application/pdf") {
            return res.status(400).json({
                message: "Only PDF files are supported"
            });
        }

        const fileBuffer = await new Promise((resolve, reject) => {
            https.get(document.fileUrl, (response) => {
                const chunks = [];

                response.on("data", (chunk) => {
                    chunks.push(chunk);
                });

                response.on("end", () => {
                    resolve(Buffer.concat(chunks));
                });

                response.on("error", reject);
            }).on("error", reject);
        });

        const extractedText = await extractDocumentText(fileBuffer);

        res.json({
            filename: document.filename,
            text: extractedText
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to extract document text",
            error: error.message
        });
    }
};


module.exports = {
    getDocumentsByCategory,
    getDocument,
    getAllDocuments,
    uploadDocument,
    deleteDocument,
    searchDocuments,
    renameDocument,
    getDocumentText 
};