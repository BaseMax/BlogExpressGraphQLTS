import { injectable } from "tsyringe";
import { PostModel } from "./post-model";
import { CreatePostInput } from "./dto/create-post.input";
import { PostDocument } from "./entirty/post-document";
import { UpdatePostInput } from "./dto/update-post.input";
import { Post } from "./entirty/post-entity";
@injectable()
export class PostService {
  async createPost(
    postInput: CreatePostInput,
    userId: string
  ): Promise<PostDocument> {
    return PostModel.create({ ...postInput, authorId: userId });
  }

  async updatePost(
    updatePostInput: UpdatePostInput
  ): Promise<PostDocument | null> {
    return PostModel.findByIdAndUpdate(
      updatePostInput.id,
      {
        $set: { ...updatePostInput },
      },
      { returnOriginal: false }
    );
  }

  async isAuthor(userId: string, postId: string): Promise<boolean> {
    const post = await PostModel.findOne({
      _id: postId,
      authorId: userId,
    });

    return post ? true : false;
  }
}
