import { Field, Int, ObjectType } from "type-graphql";


@ObjectType()
export class PopularAuthor {

  @Field()
  id: string;


  @Field(() => Int)
  totalLikes: number;

  @Field(() => Int)
  countOfPosts: number;

  @Field()
  name: string;

  @Field()
  email: string;
}

// {
//   _id: new ObjectId("64e44cbdf852d7924f030ebb"),
//   totalLikes: 0,
//   count: 2,
//   sortOrder: 2,
//   user: [
//     {
//       _id: new ObjectId("64e44cbdf852d7924f030ebb"),
//       name: 'john',
//       email: 'test@gmail.com'
//     }
//   ]
// }
