import { Field, ObjectType, Int } from "type-graphql";

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

  @Field(() => Int)
  countOfLikes: number;

  @Field(() => [String])
  likedUsers: string[];

  @Field(() => [String])
  tags: string[];

  @Field(() => Date)
  createdAt: Date;
}
