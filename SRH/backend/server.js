const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
 // Import the Post model
const Post = require("./models/post");

const db = require("./db"); // Ensure MongoDB connection

const app = express();

// Enable CORS for requests from your React app
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up storage for file uploads using Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists in your backend directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route for GET /
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Upload route with metadata storage
app.post("/upload", upload.array("files"), async (req, res) => {
  try {
    const { caption, regulation, branch, semester, subject, material } = req.body;
    const files = req.files.map(file => ({
      filename: file.filename,
      path: file.path,
      fileType: file.mimetype,
    }));

    const newPost = new Post({
      caption,
      regulation,
      branch,
      semester,
      subject,
      material,
      files,
    });
    await newPost.save();

    res.json({ message: "Files uploaded and metadata saved!", files });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Error uploading files" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
