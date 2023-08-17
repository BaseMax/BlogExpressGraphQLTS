import { UserService } from "../user/user-service";
import { UserModel } from "../user/user.model";
import { SignupInput } from "./dto/sign-up";



export class AuthService {
  constructor(private readonly userService: UserService) {}
  async signup(signupInput: SignupInput) {
    const isExistUser = (await this.userService.findByEmail(signupInput.email))
      ? true
      : false;
  }

//   if(isExistUser){
//     throw ERR
//   }

}
