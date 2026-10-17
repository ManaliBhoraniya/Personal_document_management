const { PDFParse } = require("pdf-parse");
const Tesseract = require("tesseract.js");

const extractDocumentText = async (fileBuffer, fileType) => {

    // PDF
    if (fileType === "application/pdf") {

        const parser = new PDFParse({
            data: fileBuffer
        });

        const result = await parser.getText();

        await parser.destroy();

        return result.text;
    }

    // TXT
    if (fileType === "text/plain") {
        return fileBuffer.toString("utf-8");
    }

    // JPG
    if (fileType === "image/jpeg") {

        const result = await Tesseract.recognize(
            fileBuffer,
            "eng"
        );

        return result.data.text;
    }

    // PNG
    if (fileType === "image/png") {

        const result = await Tesseract.recognize(
            fileBuffer,
            "eng"
        );

        return result.data.text;
    }

    throw new Error("Unsupported file type");
};

module.exports = {
    extractDocumentText
};