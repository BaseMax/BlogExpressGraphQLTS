import { MiddlewareFn } from "type-graphql";
import { IExpressContext } from "./interfaces/express-context-interface";
import jwt, { JwtPayload } from "jsonwebtoken";
// export function AuthMiddleware(): MiddlewareFn<IExpressContext> {
//   return async ({ context }, next) => {
//     console.log("yes");

//     const token = context.req.headers["authorization"] || "";

//     if (!token) {
//       throw new Error("Authorization token not valid.");
//     }

//     try {
//       const secretKey = process.env.SECRET_KEY as string;
//       const payload = jwt.verify(token, secretKey) as JwtPayload;

//       if (!payload) {
//         throw new Error("Authorization token not valid.");
//       }

//       context.jwtPayload = payload;
//     } catch (error: any) {
//       console.log(error);

//       throw new Error(error.message);
//     }

//     return next();
// export   const ErrorInterceptor: MiddlewareFn<any> = async ({ context, info }, next) => {

//   };
// }

// export const AuthMiddleware: MiddlewareFn<any> = async ({ context }, next) => {
//   const token = context.req.headers['authorization'] || '';

//   if (!token) {
//     throw new Error('Authentication token not provided.');
//   }

//   try {
//     const secretKey = process.env.SECRET_KEY as string;
//     const payload = jwt.verify(token, secretKey) as JwtPayload; // Replace with your user type
//     context.jwtPayload = payload; // Set the authenticated user in context
//   } catch (error) {
//     throw new Error('Authentication token is invalid.');
//   }

//   return next();
// };

export const ResolveTime: MiddlewareFn = async ({ info }, next) => {
  const start = Date.now();
  await next();
  const resolveTime = Date.now() - start;
  console.log(`${info.parentType.name}.${info.fieldName} [${resolveTime} ms]`);
};

// src/middleware/AuthMiddleware.ts

export const AuthMiddleware: MiddlewareFn<IExpressContext> = async (
  { context },
  next
) => {
  const token = context.req.headers["authorization"] || "";

  if (!token) {
    throw new Error("Authentication token not provided.");
  }

  try {
    const secretKey = process.env.JWT_SECRET as string;
    const payload = jwt.verify(token, secretKey) as JwtPayload; // Replace with your user type
    context.jwtPayload = payload; // Set the authenticated user in context
  } catch (error) {
    throw new Error("Authentication token is invalid.");
  }

  return next();
};
