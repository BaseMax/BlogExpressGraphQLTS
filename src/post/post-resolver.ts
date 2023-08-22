import { Authorized, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { ContextType } from "../context";

@Resolver()
export class PostResolver {
  @Query()
  @Authorized()
  randomValue(@Ctx() ctx: ContextType): number {
    console.log(ctx.jwtPayload);

    return Math.random();
  }
}
