import { injectable } from "tsyringe";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CommentService } from "./comment-service";
import { CreateCommentInput } from "./dto/create-comment.input";
import { ContextType } from "../context";
import { Comment } from "./entity/comment-entity";
import { PostService } from "../post/post-service";

@Resolver()
@injectable()
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly postService: PostService
  ) {}

  @Authorized()
  @Mutation(() => Comment)
  async createComment(
    @Arg("input") createCommentInput: CreateCommentInput,
    @Ctx() ctx: ContextType
  ) {
    const userId = ctx.jwtPayload?.sub as string;
    await this.commentService.verifyIds(createCommentInput);
    return this.commentService.createComment(createCommentInput, userId);
  }

 

  @Query(() => String)
  getHello() {
    return "hi";
  }
}
