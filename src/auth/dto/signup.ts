import { IsEmail, IsString, MinLength } from "class-validator";
import { ArgsType, Field, InputType } from "type-graphql";
import { ICreateUser } from "../../interfaces/create-user-interface";

@InputType()
export class SignupInput implements ICreateUser {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  @MinLength(5)
  password: string;
}
