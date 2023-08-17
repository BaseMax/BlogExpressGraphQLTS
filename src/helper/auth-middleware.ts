import { MiddlewareFn } from "type-graphql";
import { IExpressContext } from "./interfaces/express-context-interface";
import jwt, { JwtPayload } from "jsonwebtoken";
export function AuthMiddleware(): MiddlewareFn<IExpressContext> {
  return async ({ context }, next) => {
    const token = context.req.headers["authorization"] || "";

    if (!token) {
      throw new Error("Authorization token not valid.");
    }

    try {
      const secretKey = process.env.SECRET_KEY as string;
      const payload = jwt.verify(token, secretKey) as JwtPayload;

      if (!payload) {
        throw new Error("Authorization token not valid.");
      }

      context.jwtPayload = payload;
    } catch (error: any) {
      console.log(error);

      throw new Error(error.message);
    }

    return next();
  };
}
