import { injectable } from "tsyringe";
import { PostModel } from "../post/post-model";
import { CreateCommentInput } from "./dto/create-comment.input";
import { CommentDocument } from "./entity/comment-document";
import { CommentModel } from "./comment-model";
import { PostService } from "../post/post-service";
import { BadRequestException } from "../errors/bad-request-exception";
import { UpdateCommentInput } from "./dto/update-comment.input";

@injectable()
export class CommentService {
  constructor(private readonly postService: PostService) {}
  async createComment(
    createCommentInput: CreateCommentInput,
    userId: string
  ): Promise<CommentDocument> {
    return CommentModel.create({
      ...createCommentInput,
      senderId: userId,
    });
  }

  async findByIdOrThrow(id: string): Promise<CommentDocument | null> {
    return await CommentModel.findById(id);
  }

  async verifyIds(createCommentInput: CreateCommentInput) {
    let mustBeVerifiedIds: any[] = [];

    if (createCommentInput.repliedTo) {
      const verifyCommentId = this.findByIdOrThrow(
        createCommentInput.repliedTo
      );
      mustBeVerifiedIds.push(verifyCommentId);
    }

    const verifyPostId = this.postService.findByIdOrThrow(
      createCommentInput.postId
    );
    mustBeVerifiedIds.push(verifyPostId);

    await Promise.all(mustBeVerifiedIds);
  }

  async isSender(userId: string, postId: string): Promise<boolean> {
    const comment = await CommentModel.findOne({
      _id: postId,
      senderId: userId,
    });

    return comment ? true : false;
  }

  async updateComment(
    updateInput: UpdateCommentInput
  ): Promise<CommentDocument | null> {
    return CommentModel.findByIdAndUpdate(
      updateInput.commentId,
      {
        $set: {
          content: updateInput.newContent,
        },
      },
      {
        returnOriginal: false,
      }
    );
  }
}
