import { injectable } from "tsyringe";
import { PostModel } from "./post-model";
import { CreatePostInput } from "./dto/create-post.input";
import { PostDocument } from "./entirty/post-document";
import { UpdatePostInput } from "./dto/update-post.input";
import { Post } from "./entirty/post-entity";
import mongoose from "mongoose";
import { BadRequestException } from "../errors/bad-request-exception";
@injectable()
export class PostService {
  async createPost(
    postInput: CreatePostInput,
    userId: string
  ): Promise<PostDocument> {
    return PostModel.create({ ...postInput, authorId: userId });
  }

  async getAllPosts(): Promise<PostDocument[]> {
    return PostModel.find({
      isPublished: true,
    });
  }

  async getPostById(id: string): Promise<PostDocument | null> {
    return PostModel.findById(id);
  }

  async getMostLikedPosts(): Promise<PostDocument[]> {
    return PostModel.find().sort({
      countOfLikes: -1,
    });
  }

  async getAuthorPosts(authorId: string): Promise<PostDocument[]> {
    return PostModel.find({
      authorId: authorId,
      isPublished: true,
    });
  }

  async getPostByTag(tagId: string): Promise<PostDocument[]> {
    return PostModel.find({
      tags: tagId,
      isPublished: true,
    });
  }

  async search(keyword: string): Promise<PostDocument[]> {
    return await PostModel.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { content: { $regex: keyword, $options: "i" } },
      ],
      isPublished: true,
    });
  }

  async findByIdOrThrow(id: string): Promise<PostDocument | null> {
    const post = await this.getPostById(id);
    if (!post) {
      throw new BadRequestException("post with this credentials doesn't exist");
    }
    return post;
  }

  async addTagToPost(
    tagId: string,
    postId: string
  ): Promise<PostDocument | null> {
    return await PostModel.findByIdAndUpdate(
      postId,
      {
        $push: { tags: tagId },
      },
      {
        returnOriginal: false,
      }
    );
  }

  async removeTagFromPost(
    tagId: string,
    postId: string
  ): Promise<PostDocument | null> {
    return await PostModel.findByIdAndUpdate(postId, {
      $pull: { tags: tagId },
    });
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
  async publishPost(postId: string): Promise<PostDocument | null> {
    return await PostModel.findByIdAndUpdate(
      postId,
      {
        $set: {
          isPublished: true,
        },
      },
      {
        returnOriginal: false,
      }
    );
  }
  async likePost(userId: string, postId: string): Promise<PostDocument | null> {
    return PostModel.findByIdAndUpdate(
      postId,
      {
        $push: { likedUsers: userId },
        $inc: { countOfLikes: 1 },
      },
      {
        returnOriginal: false,
      }
    );
  }

  async retrieveLike(
    userId: string,
    postId: string
  ): Promise<PostDocument | null> {
    return PostModel.findByIdAndUpdate(
      postId,
      {
        $pull: { likedUsers: userId },
        $inc: { countOfLikes: -1 },
      },
      {
        returnOriginal: false,
      }
    );
  }

  async isLikedByUser(userId: string, postId: string): Promise<boolean> {
    const post = await PostModel.findOne({
      _id: new mongoose.Types.ObjectId(postId),
      likedUsers: userId,
    });

    return post ? true : false;
  }
  async deletePost(id: string): Promise<PostDocument | null> {
    return PostModel.findByIdAndDelete(id);
  }
  async isAuthor(userId: string, postId: string): Promise<boolean> {
    const post = await PostModel.findOne({
      _id: postId,
      authorId: userId,
    });

    return post ? true : false;
  }

  async getTagPostsByPopularity(id: string): Promise<PostDocument[]> {
    return await PostModel.find({ tags: id }).sort({
      countOfLikes: -1,
    });
  }
}
