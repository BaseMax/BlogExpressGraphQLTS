import mongoose, { Document, ObjectId, Types } from "mongoose";
export interface PostDocument extends Document {
  readonly title: string;
  readonly content: string;
  readonly isPublished: Boolean;
  readonly countOfLikes: number;
  readonly authorId: Types.ObjectId;
  readonly likedUsers: Types.ObjectId[];
  readonly tags: Types.ObjectId[];
  readonly createdAt: Date;
}
