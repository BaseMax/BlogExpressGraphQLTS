import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Post {
  @Field()
  id: string;   
  @Field()
  content: string;

  @Field()
  title: string;

  @Field()
  authorId: string;

  @Field()
  isPublished: boolean;

  @Field(() => Date)
  createdAt: Date;
}
