import { injectable } from "tsyringe";
import { CreateTagInput } from "./dto/create-tag.input";
import { TagDocument } from "./interface/tag-document";
import { TagModel } from "./tag-model";
import { PostModel } from "../post/post-model";
import { PopularTag } from "./entity/tag-entity";
import { BadRequestException } from "../errors/bad-request-exception";
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

  async findByIdOrThrow(id: string): Promise<TagDocument | null> {
    const tag = await TagModel.findById(id);
    if (!tag) {
      throw new BadRequestException("tag with this credentials doesn't exist");
    }

    return tag;
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

  async getPopularTag(): Promise<PopularTag> {
    const popularTags = await TagModel.aggregate([
      {
        $unwind: "tags",
      },
      { $group: { _id: "$tags", countOfUsed: { $sum: 1 } } },

      { $sort: { countOfUsed: -1 } },
    ]);

    console.log(popularTags);

    return { tagName: "test", id: "asjd", countOfUsed: 3 };
  }
}
