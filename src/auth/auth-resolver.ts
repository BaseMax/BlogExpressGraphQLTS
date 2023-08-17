import { Args, Arg, Mutation, Resolver, Query } from "type-graphql";
import { AuthPayload } from "./entity/auth-payload";
import { SignupArgs, SignupInput } from "./dto/sign-up";

@Resolver(AuthPayload)
export class AuthResolver {
  @Mutation((returns) => AuthPayload)
  async signup(@Args() signupInput: SignupArgs) {
    console.log(signupInput.signupInput);

    // Your signup resolver logic here
    // Return an instance of AuthPayload
  }

  @Query((returns) => AuthPayload, { nullable: true })
  async recipe(@Arg("title") title: string): Promise<AuthPayload | undefined> {
    return { name: "hi there", token: "os" };
  }
}
