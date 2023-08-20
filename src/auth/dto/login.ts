import { IsEmail, IsString, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { ICreateUser } from "../../interfaces/create-user-interface";

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(5)
  password: string;
}
