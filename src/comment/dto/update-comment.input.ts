import { IsMongoId, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateCommentInput {
  @IsMongoId()
  @Field()
  commentId: string;

  @IsString()
  @Field()
  newContent: string;
}
