import { Args, Arg, Mutation, Resolver, Query, Ctx } from "type-graphql";
import { AuthPayload } from "./entity/auth-payload";
import { SignupInput } from "./dto/sign-up";
import { AuthService } from "./auth-service";
import { injectable } from "tsyringe";

@injectable()
@Resolver(AuthPayload)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => AuthPayload)
  async signup(
    @Ctx() ctx: any,
    @Arg("input")
    input: SignupInput
  ): Promise<AuthPayload> {
    return await this.authService.signup(input);
  }

  @Query((returns) => AuthPayload, { nullable: true })
  async recipe(@Arg("title") title: string): Promise<AuthPayload | undefined> {
    return { name: "hi there", token: "os" };
  }
}
