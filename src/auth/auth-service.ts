import { UserService } from "../user/user-service";
import { UserModel } from "../user/user.model";
import { SignupInput } from "./dto/sign-up";
import jwt from "jsonwebtoken";
import { AuthPayload } from "./entity/auth-payload";
import { JwtPayload } from "./interface/jwt-payload";
import { ICreateUser } from "../interfaces/create-user-interface";
import { injectable } from "tsyringe";

@injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async signup(signupInput:ICreateUser): Promise<AuthPayload> {
    console.log("here");
    
    const isExistUser = (await this.userService.findByEmail(signupInput.email))
      ? true
      : false;

    console.log(isExistUser);

    const token = await this.getToken({
      sub: "121212",
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
