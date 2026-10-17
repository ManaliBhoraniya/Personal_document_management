const gemini = require("../config/gemini");
const Document = require("../models/Document");
const {
    extractDocumentText
} = require("../utils/documentExtractor");

const https = require("https");

const askQuestion = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                message: "Question is required"
            });
        }

        const document = await Document.findOne({
            _id: req.params.documentId,
            user: req.userId
        });

        if (!document) {
            return res.status(404).json({
                message: "Document not found"
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

        const documentText = await extractDocumentText(
            fileBuffer,
            document.fileType
        );

        const response = await gemini.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: `
You are an AI assistant for a personal document management system.

Answer the user's question using only the provided document text.

If the answer is not present in the document, say:
"I could not find the answer in this document."

Do not make up information.

DOCUMENT:
${documentText}

USER QUESTION:
${question}
`
});

res.json({
    answer: response.text
});

    } catch (error) {
        res.status(500).json({
            message: "Failed to get AI response",
            error: error.message
        });
    }
};

module.exports = {
    askQuestion
};