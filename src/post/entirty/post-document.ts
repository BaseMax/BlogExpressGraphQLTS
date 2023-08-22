import { Document } from "mongoose";

export interface PostDocument extends Document {
  readonly title: string;
  readonly content: string;
  readonly isPublished: Boolean;
  readonly createdAt: Date;
}
