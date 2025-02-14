const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

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
    // Create a unique filename by prepending the current timestamp
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

// Example upload route
app.post("/upload", upload.array("files"), (req, res) => {
  // req.files contains the array of files uploaded
  // req.body will have any additional fields (e.g., caption, regulation, branch, etc.)
  console.log("Uploaded Files:", req.files);
  console.log("Other Data:", req.body);

  res.json({
    message: "Files uploaded successfully!",
    files: req.files,
  });
});

// Other API endpoints can be added here
// For example, endpoints to save post data to a database, fetch posts, etc.

// Start the server on port 5000 (or any port you prefer)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
