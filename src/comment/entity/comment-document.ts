import { Document, Schema, Types } from "mongoose";

export interface CommentDocument {
  readonly senderId: Types.ObjectId;
  readonly content: string;

  readonly postId: Types.ObjectId;

  readonly likedUser: Types.ObjectId[];
  readonly countOfLikes?: number;
  readonly repliedTo?: Types.ObjectId;

  readonly createdAt: Date;
}
