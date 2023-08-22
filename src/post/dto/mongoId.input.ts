import { IsMongoId } from "class-validator";
import { ArgsType, Field, InputType } from "type-graphql";

@InputType()
export class MongoId {
  @IsMongoId()
  @Field()
  id: string;
}
