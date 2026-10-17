const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    getDocumentsByCategory,
    getDocument,
    getAllDocuments,
    uploadDocument,
    deleteDocument,
    searchDocuments,
    renameDocument,
    getDocumentText 
} = require("../controllers/documentController");

const {
    getDashboard,
    getStorage
} = require("../controllers/dashboardController");

const router = express.Router();

// Search documents
router.get(
    "/search",
    authMiddleware,
    searchDocuments,
);

router.get(
    "/storage",
    authMiddleware,
    getStorage
);

// ============================================
// Dashboard
// ============================================

router.get(
    "/dashboard",
    authMiddleware,
    getDashboard
);

// Get documents by category
router.get(
    "/category/:categoryId",
    authMiddleware,
    getDocumentsByCategory
);


// Get single document
router.get(
    "/:id",
    authMiddleware,
    getDocument
);

// Upload document
router.post(
    "/upload",
    authMiddleware,
    upload.single("file"),
    uploadDocument
);

router.get(
    "/",
    authMiddleware,
    getAllDocuments
);

// Rename document
router.put(
    "/:id",
    authMiddleware,
    renameDocument
);

// Delete document
router.delete(
    "/:id",
    authMiddleware,
    deleteDocument
);

router.get(
    "/:id/text",
    authMiddleware,
    getDocumentText 
);


module.exports = router;