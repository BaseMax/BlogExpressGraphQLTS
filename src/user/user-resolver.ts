import { injectable } from "tsyringe";
import { Query, Resolver } from "type-graphql";
import { UserService } from "./user-service";
import { PopularAuthor } from "./entity/popular-author-entity";

@Resolver()
@injectable()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [PopularAuthor])
  async getPopularAuthors() {
    return await this.userService.getPopularAuthors(1);
  }
}
