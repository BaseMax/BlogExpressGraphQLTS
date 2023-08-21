import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },

  content: { type: String, required: true, unique: true },

  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isPublished: { type: Boolean, default: false },
});

export const PostModel = mongoose.model("Post", postSchema);
