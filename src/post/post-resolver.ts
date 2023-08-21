import { Authorized, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { AuthMiddleware, ResolveTime } from "../helper/auth-middleware";

@Resolver()
export class PostResolver {
  @Query()
  @Authorized()
  randomValue(): number {
    return Math.random();
  }
}
