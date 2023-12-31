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
import { MongoId } from "./dto/mongoId.input";
import { AddTagTo, RemoveTagFrom } from "./dto/add-tag-to-post.inputs";
import { TagService } from "../tag/tag-service";
import { SearchInput } from "./dto/search.input";

@Resolver()
@injectable()
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly tagService: TagService
  ) {}

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

  @Query(() => Post, { nullable: true })
  @Authorized()
  async getPostById(@Arg("input") mongo: MongoId) {
    return this.postService.getPostById(mongo.id);
  }

  @Query(() => [Post], { nullable: true })
  async getAuthorPosts(@Arg("input") mongo: MongoId) {
    return this.postService.getAuthorPosts(mongo.id);
  }

  @Query(() => [Post], { nullable: true })
  async getPostByTag(@Arg("input") mongo: MongoId) {
    const tag = await this.tagService.findByIdOrThrow(mongo.id);
    return this.postService.getPostByTag(mongo.id);
  }

  @Query(() => [Post], { nullable: true })
  async search(@Arg("input") searchInput: SearchInput) {
    return this.postService.search(searchInput.keyword);
  }

  @Authorized()
  @Mutation(() => Post, { nullable: true })
  async likePost(@Arg("input") mongo: MongoId, @Ctx() ctx: ContextType) {
    const userId = ctx.jwtPayload?.sub as string;

    const isLikedByUser = await this.postService.isLikedByUser(
      userId,
      mongo.id
    );

    return isLikedByUser
      ? this.postService.retrieveLike(userId, mongo.id)
      : this.postService.likePost(userId, mongo.id);
  }
  @Authorized()
  @Mutation(() => Post, { nullable: true })
  async publishPost(@Arg("input") mongo: MongoId, @Ctx() ctx: ContextType) {
    const userId = ctx.jwtPayload?.sub as string;

    const isAllowed = await this.postService.isAuthor(userId, mongo.id);
    return this.postService.publishPost(mongo.id);
  }

  @Authorized()
  @Mutation(() => Post, { nullable: true })
  async addTagToPost(@Arg("input") addTagTo: AddTagTo) {
    const tag = await this.tagService.findByIdOrThrow(addTagTo.tagId);
    const post = await this.postService.findByIdOrThrow(addTagTo.postId);

    return this.postService.addTagToPost(addTagTo.tagId, addTagTo.postId);
  }

  @Authorized()
  @Mutation(() => Post, { nullable: true })
  async removeTagFrom(@Arg("input") removeTagFrom: RemoveTagFrom) {
    const tag = await this.tagService.findByIdOrThrow(removeTagFrom.tagId);
    const post = await this.postService.findByIdOrThrow(removeTagFrom.postId);

    return this.postService.removeTagFromPost(
      removeTagFrom.tagId,
      removeTagFrom.postId
    );
  }

  @Authorized()
  @Query(() => [Post], { nullable: true })
  async getMostLikedPosts() {
    return await this.postService.getMostLikedPosts();
  }

  @Authorized()
  @Query(() => [Post], { nullable: true })
  async getTagPostsByPopularity(@Arg("input") mongo: MongoId) {
    return await this.postService.getTagPostsByPopularity(mongo.id);
  }
}
