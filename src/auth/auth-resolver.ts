import { Args, Arg, Mutation, Resolver, Query, Ctx } from "type-graphql";
import { AuthPayload } from "./entity/auth-payload";
import { SignupInput } from "./dto/sign-up";
import { AuthService } from "./auth-service";
import { injectable } from "tsyringe";

@injectable()
@Resolver(AuthPayload)
export class AuthResolver {
  constructor(private  authService: AuthService) {}

  @Mutation((returns) => AuthPayload)
  async signup(
    @Ctx() ctx: any,
    @Arg("input", () => SignupInput)
    input: SignupInput
  ): Promise<AuthPayload> {
    console.log(this.authService);

    const auth = await this.authService.signup(input);
    console.log("here");

    return auth;
  }

  @Query((returns) => AuthPayload, { nullable: true })
  async recipe(@Arg("title") title: string): Promise<AuthPayload | undefined> {
    return { name: "hi there", token: "os" };
  }
}
