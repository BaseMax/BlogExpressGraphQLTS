import { IsMongoId, IsOptional, IsString } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class CreateCommentInput {
  @IsMongoId()
  @Field()
  postId: string;

  @IsString()
  @Field()
  content: string;

  @IsOptional()
  @IsMongoId()
  @Field({ nullable: true })
  repliedTo?: string;
}
