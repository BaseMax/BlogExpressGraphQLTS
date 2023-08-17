import { IsEmail, IsString } from "class-validator";
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
  password: string;
}

@ArgsType()
export class SignupArgs {
  @Field((type) => SignupInput)
  signupInput: SignupInput;
}
