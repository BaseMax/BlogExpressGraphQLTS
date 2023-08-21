import "reflect-metadata";
import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { AuthChecker, buildSchema } from "type-graphql";
import * as path from "path";
import { logger } from "./logger/logger";
import { AuthResolver } from "./auth/auth-resolver";
import { formatError } from "./helper/formatError";
import { container } from "./container";
import { PostResolver } from "./post/post-resolver";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Context } from "./context";
import { type IExpressContext } from "./helper/interfaces/express-context-interface";
import { authChecker } from "./helper/auth-checker";
dotenv.config();

export interface ExpressContext {
  req: Request;
}

const port = process.env.Port || 3000;
const dbUri = process.env.DATABASE_URI as string;

export async function createServer() {
  const schema = await buildSchema({
    resolvers: [AuthResolver, PostResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
    container: { get: (cls) => container.resolve(cls) },
    authChecker: () => true,
    validate: true,
  });

  const server = new ApolloServer<IExpressContext>({ schema });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req, res }) => {
      const token = req.headers.authorization || "";

      return {};
    },
  });

  logger.info(` 🚀 GraphQL server ready at: ${url}`);

  mongoose.connect(dbUri, {}).then(() => {
    logger.info("successfully connected to mongodb...");
  });
}

createServer().catch((error) => {
  logger.error(error);
});
