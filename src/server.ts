import "reflect-metadata";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import * as path from "path";
import { logger } from "./logger/logger";
import { AuthResolver } from "./auth/auth-resolver";
import { formatError } from "./helper/formatError";
import { container } from "./container";
import { PostResolver } from "./post/post-resolver";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ContextType } from "./context";
import { CustomAuthChecker } from "./auth/auth-checker";
import { Request, Response } from "express";
import { TagResolver } from "./tag/tag-resolver";
import { CommentResolver } from "./comment/comment-resolver";
import { UserResolver } from "./user/user-resolver";
import { Connection } from "mongoose";
dotenv.config();

const port = process.env.Port || 3000;
const dbUri = process.env.DATABASE_URI as string;
type ApolloServerInfo = {
  apolloServer: ApolloServer<ContextType>;
  url: string;
  mongooseConnection: any;
};

export async function createServer(): Promise<ApolloServerInfo> {
  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      PostResolver,
      TagResolver,
      CommentResolver,
      UserResolver,
    ],
    emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
    container: { get: (cls) => container.resolve(cls) },

    authChecker: CustomAuthChecker,

    validate: true,
  });

  const apolloServer = new ApolloServer<ContextType>({
    schema,
    formatError: formatError,
  });

  const { url } = await startStandaloneServer(apolloServer, {
    context: async ({ req, res }) => ({
      req: req as Request,
      res: res as Response,
    }),
  });

  logger.info(` 🚀 GraphQL server ready at: ${url}`);

  let connection = await mongoose.connect(dbUri);

  return { apolloServer, url, mongooseConnection: connection };
}

createServer().catch((error) => {
  logger.error(error);
});
