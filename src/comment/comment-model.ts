import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  likedUser: [{ type: Schema.Types.ObjectId, ref: "User" }],
  countOfLikes: { type: Number, default: 0 },
  repliedTo: { type: Schema.Types.ObjectId, ref: "Comment" },
  createdAt: { type: Date, default: Date.now },
});

export const CommentModel = mongoose.model("Comment", commentSchema);
