import { container } from "tsyringe";
import { AuthPayload } from "./entity/auth-payload";
import { JwtService } from "./jwt-service";

const jwt = container.resolve(JwtService);
export function getUserFromToken(token?: string) {
  if (token) {
    const payload = jwt.verify<AuthPayload>(token);
    return payload;
  }
}
