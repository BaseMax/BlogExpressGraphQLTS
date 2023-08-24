import { injectable } from "tsyringe";
import { ICreateUser } from "../interfaces/create-user-interface";
import { UserDocument } from "./interface/user-document";
import { UserModel } from "./user.model";
import * as argon2 from "argon2";
import { PostModel } from "../post/post-model";
import { PopularAuthor } from "./entity/popular-author-entity";

@injectable()
export class UserService {
  async createUser(createUser: ICreateUser): Promise<UserDocument> {
    return await UserModel.create({
      ...createUser,
      password: await argon2.hash(createUser.password),
    });
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await UserModel.findOne({
      email,
    });
  }
  async getPopularAuthors(limit: number): Promise<PopularAuthor[]> {
    const result = await PostModel.aggregate([
      {
        $group: {
          _id: "$authorId",
          totalLikes: { $sum: "$countOfLikes" },
          countOfPosts: { $sum: 1 },
        },
      },
      {
        $addFields: { sortOrder: { $add: ["$totalLikes", "$countOfPosts"] } },
      },
      {
        $sort: { sortOrder: -1 },
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                name: 1,
                email: 1,
              },
            },
          ],
          as: "user",
        },
      },

      {
        $unwind: { path: "$user" },
      },
    ]);

    const mapped: PopularAuthor[  ] = result.map((p) => {
      const detail = p.user;
      p.email = detail.email;
      p.name = detail.name;
      p.id = detail._id;
      return p;
    });

    return mapped;
  }
}

