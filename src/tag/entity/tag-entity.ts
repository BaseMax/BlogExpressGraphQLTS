import { ArgsType, Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Tag {
  @Field()
  id: String;

  @Field()
  tagName: string;
}

@ObjectType()
export class PopularTag {
  @Field()
  id: String;

  @Field()
  tagName: string;

  @Field()
  countOfUsed: number
}
