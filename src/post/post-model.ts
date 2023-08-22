import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },

  content: { type: String, required: true },

  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isPublished: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },

  countOfLikes: { type: Number, default: 0 },
  likedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ] ,
});

export const PostModel = mongoose.model("Post", postSchema);
