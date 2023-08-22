import { Document } from "mongoose";

export class TagDocument extends Document {
  readonly tagName: string;
}
