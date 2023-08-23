import { IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class SearchInput {
  @IsString()
  @Field()
  keyword: string;
}
