import { ICreateUser } from "../interfaces/create-user-interface";
import { UserDocument } from "./interface/user-document";
import { UserModel } from "./user.model";
import * as argon2 from "argon2";
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
}
