import { Request, Response } from "express";
import { AuthPayload } from "../../auth/entity/auth-payload";
import { JwtPayload } from "jsonwebtoken";

export interface IExpressContext {
  req: Request;
  res: Response;
  jwtPayload: JwtPayload;
}
