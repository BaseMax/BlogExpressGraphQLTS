import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { ContextType } from "../context";
import { PostService } from "./post-service";
import { Post } from "./entirty/post-entity";
import { CreatePostInput } from "./dto/create-post.input";
import { injectable } from "tsyringe";
import { UpdatePostInput } from "./dto/update-post.input";
import { BadRequestException } from "../errors/bad-request-exception";

@Resolver()
@injectable()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  @Authorized()
  async createPost(
    @Arg("input") createPostInput: CreatePostInput,
    @Ctx() ctx: ContextType
  ) {
    const userId = ctx.jwtPayload?.sub as string;

    return await this.postService.createPost(createPostInput, userId);
  }

  @Mutation(() => Post)
  @Authorized()
  async updatePost(
    @Arg("input") updatePostInput: UpdatePostInput,
    @Ctx() ctx: ContextType
  ) {
    const userId = ctx.jwtPayload?.sub as string;

    const isAllowed = await this.postService.isAuthor(
      userId,
      updatePostInput.id
    );

    if (!isAllowed) {
      throw new BadRequestException("you aren't allowed to modify.");
    }
    return await this.postService.updatePost(updatePostInput);
  }

  @Mutation(() => Post)
  @Authorized()
  async removePost(@Arg("id") postId: string, @Ctx() ctx: ContextType) {
    const userId = ctx.jwtPayload?.sub as string;

    const isAllowed = await this.postService.isAuthor(userId, postId);

    if (!isAllowed) {
      throw new BadRequestException("you aren't allowed to modify.");
    }
    return await this.postService.deletePost(postId);
  }

  @Query(() => [Post])
  @Authorized()
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Query()
  @Authorized()
  randomValue(@Ctx() ctx: ContextType): number {
    console.log(ctx.jwtPayload);

    return Math.random();
  }
}
