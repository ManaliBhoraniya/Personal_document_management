require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.log("MongoDB Connection Failed:", error);
    });

//adds /api/auth before every route inside authRoutes.
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/ai", aiRoutes);

app.use("/uploads", express.static("uploads"));    //because your actual uploaded files are stored inside the uploads folder, but the browser cannot access that folder automatically.


app.get("/", (req, res) => {
    res.send("Personal Document Management API is running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});