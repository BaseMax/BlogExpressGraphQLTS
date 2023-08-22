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
import { type IExpressContext } from "./helper/interfaces/express-context-interface";

import { CustomAuthChecker } from "./auth/auth-checker";
dotenv.config();

const port = process.env.Port || 3000;
const dbUri = process.env.DATABASE_URI as string;

export async function createServer() {
  const schema = await buildSchema({
    resolvers: [AuthResolver, PostResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
    container: { get: (cls) => container.resolve(cls) },

    authChecker: CustomAuthChecker,

    validate: true,
  });

  const server = new ApolloServer<IExpressContext>({
    schema,
    formatError: formatError,
  });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req, res }) => ({ req, res }),
  });

  logger.info(` 🚀 GraphQL server ready at: ${url}`);

  mongoose.connect(dbUri, {}).then(() => {
    logger.info("successfully connected to mongodb...");
  });
}

createServer().catch((error) => {
  logger.error(error);
});
