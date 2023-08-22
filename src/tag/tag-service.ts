import { injectable } from "tsyringe";
import { CreateTagInput } from "./dto/create-tag.input";
import { TagDocument } from "./interface/tag-document";
import { TagModel } from "./tag-model";
import { PostModel } from "../post/post-model";
@injectable()
export class TagService {
  async createTag(createTagInput: CreateTagInput): Promise<TagDocument> {
    return TagModel.create({
      ...createTagInput,
    });
  }

  async deleteTag(id: string): Promise<TagDocument | null> {
    return TagModel.findByIdAndDelete(id);
  }

  async deleteTagFromPosts(tagId: string) {
    return PostModel.updateMany(
      {
        tags: tagId,
      },
      {
        $pull: { tags: tagId },
      },
      {
        returnOriginal: false,
      }
    );
  }
}
