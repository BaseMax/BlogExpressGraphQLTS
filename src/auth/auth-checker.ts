import { AuthCheckerInterface, ResolverData } from "type-graphql";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "./interface/jwt-payload";
import jwt from "jsonwebtoken";
import { JwtService } from "./jwt-service";
import { injectable } from "tsyringe";
import { ContextType } from "../context";
export class CustomAuthChecker implements AuthCheckerInterface<ContextType> {
  constructor() {} // Dependency injection

  check(
    { root, args, context, info }: ResolverData<ContextType>,
    roles: string[]
  ) {
    const token = context.req.headers.authorization;

    if (!token) return false;
    const secretKey = process.env.SECRET_KEY as string;

    const jwtPayload = jwt.verify(token, secretKey) as JwtPayload;

    context.jwtPayload = jwtPayload;
    return true;
  }
}
