const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/studentHelpingDB"; // Ensure MongoDB is running

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

module.exports = mongoose;
