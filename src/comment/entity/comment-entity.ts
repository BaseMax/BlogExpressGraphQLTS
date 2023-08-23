import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Comment {
  @Field()
  id: string;

  @Field()
  senderId: string;
  @Field()
  content: string;

  @Field()
  postId: string;

  @Field(()=>[String],{nullable:true})
  likedUser?: string[];

  @Field({ nullable: true })
  repliedTo?: string;

  @Field(() => Int)
  countOfLikes: number;

  @Field(() => Date)
  createdAt: Date;
}
