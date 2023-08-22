import { IsMongoId, IsOptional, IsString, ValidateIf } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdatePostInput {
  @Field()
  @IsMongoId()
  id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  content?: string;
}
