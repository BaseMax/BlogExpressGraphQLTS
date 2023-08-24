import { IsMongoId } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class AddTagTo {
  @Field()
  @IsMongoId()
  postId: string;
  @Field()
  @IsMongoId()
  tagId: string;
}

@InputType()
export class RemoveTagFrom extends AddTagTo{}