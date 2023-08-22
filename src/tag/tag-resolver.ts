import { injectable } from "tsyringe";
import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { CreateTagInput } from "./dto/create-tag.input";
import { Tag } from "./entity/tag-entity";
import { TagService } from "./tag-service";
import { MongoId } from "../post/dto/mongoId.input";

@injectable()
@Resolver()
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Authorized()
  @Mutation(() => Tag)
  async createTag(@Arg("input") createTagInput: CreateTagInput) {
    return this.tagService.createTag(createTagInput);
  }

  @Authorized()
  @Mutation(() => Tag, {nullable:true})
  async deleteTag(@Arg("input") mongo: MongoId) {
    const tagDeletedFromPosts = await this.tagService.deleteTagFromPosts(
      mongo.id
    );
    return await this.tagService.deleteTag(mongo.id);
  }
}
