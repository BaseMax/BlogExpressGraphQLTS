import { Args, Arg, Mutation, Resolver, Query, Ctx } from "type-graphql";
import { AuthPayload } from "./entity/auth-payload";
import { SignupInput } from "./dto/signup";
import { AuthService } from "./auth-service";
import { injectable } from "tsyringe";
import { LoginInput } from "./dto/login";

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

  @Mutation((returns) => AuthPayload)
  async login(
    @Ctx() ctx: any,
    @Arg("input")
    input: LoginInput
  ): Promise<AuthPayload> {
    return await this.authService.login(input);
  }

  @Query((returns) => AuthPayload, { nullable: true })
  async getAuthPayload(
    @Arg("token") token: string
  ): Promise<AuthPayload | undefined> {
    console.log(token);
    
    return this.authService.getAuthPayloadFromToken(token);
  }
}
