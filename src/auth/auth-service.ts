import { UserService } from "../user/user-service";
import { UserModel } from "../user/user.model";
import { SignupInput } from "./dto/sign-up";
import jwt from "jsonwebtoken";
import { AuthPayload } from "./entity/auth-payload";
import { JwtPayload } from "./interface/jwt-payload";
import { ICreateUser } from "../interfaces/create-user-interface";
import { injectable } from "tsyringe";
import { BadRequestException } from "../errors/bad-request-exception";

@injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async signup(signupInput: ICreateUser): Promise<AuthPayload> {
    const isExistUser = (await this.userService.findByEmail(signupInput.email))
      ? true
      : false;

    if (isExistUser) {
      throw new BadRequestException("user already exist");
    }

    const user = await this.userService.createUser(signupInput);

    const token = await this.getToken({
      sub: user._id,
      name: signupInput.name,
    });
    return { name: signupInput.name, token: token };
  }

  //   if(isExistUser){
  //     throw ERR
  //   }

  async getToken(jwtPayload: JwtPayload): Promise<string> {
    const secretKey = process.env.SECRET_KEY as string;
    return jwt.sign(jwt, secretKey, {
      expiresIn: "1d",
    });
  }
}