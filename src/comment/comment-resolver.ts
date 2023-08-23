import { injectable } from "tsyringe";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CommentService } from "./comment-service";
import { CreateCommentInput } from "./dto/create-comment.input";
import { ContextType } from "../context";
import { Comment } from "./entity/comment-entity";
import { PostService } from "../post/post-service";
import { UpdateCommentInput } from "./dto/update-comment.input";
import { BadRequestException } from "../errors/bad-request-exception";
import { MongoId } from "../post/dto/mongoId.input";

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

  @Authorized()
  @Mutation(() => Comment, { nullable: true })
  async updateComment(
    @Arg("input") updateCommentInput: UpdateCommentInput,
    @Ctx() ctx: ContextType
  ) {
    const userId = ctx.jwtPayload?.sub as string;
    const isAllowed = await this.commentService.isSender(
      userId,
      updateCommentInput.commentId
    );
    if (!isAllowed) {
      throw new BadRequestException(
        "You aren't allowed to modify this comment"
      );
    }

    return this.commentService.updateComment(updateCommentInput);
  }

  @Authorized()
  @Mutation(() => Comment, { nullable: true })
  async deleteComment(@Arg("input") mongo: MongoId, @Ctx() ctx: ContextType) {
    const userId = ctx.jwtPayload?.sub as string;
    const isAllowed = await this.commentService.isSender(userId, mongo.id);
    if (!isAllowed) {
      throw new BadRequestException(
        "You aren't allowed to modify this comment"
      );
    }

    return this.commentService.deleteComment(mongo.id);
  }
}
