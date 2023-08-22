import { ArgsType, Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Tag {
  @Field()
  id: String;

  @Field()
  tagName: string;
}
