const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  caption: String,
  regulation: String,
  branch: String,
  semester: String,
  subject: String,
  material: String,
  files: [{ filename: String, path: String, fileType: String }],
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
