import { IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreatePostInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  content: string;
}
