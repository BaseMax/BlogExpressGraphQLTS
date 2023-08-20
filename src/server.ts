import "reflect-metadata";
import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import * as path from "path";
import { logger } from "./logger/logger";
import { AuthResolver } from "./auth/auth-resolver";
import { formatError } from "./helper/formatError";
import { container } from "./container";
dotenv.config();

const port = process.env.Port || 3000;
const dbUri = process.env.DATABASE_URI as string;

export async function createServer(): Promise<Express> {
  const schema = await buildSchema({
    resolvers: [AuthResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
    container: { get: (cls) => container.resolve(cls) },

    validate: true,
  });

  const app = express();

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    introspection: true,
    formatError: formatError,
    });

  await server.start();

  server.applyMiddleware({ app });

  app.listen(port, () => {
    logger.info(
      ` 🚀 GraphQL server ready at: http://localhost:${port}/graphql`
    );
  });

  mongoose.connect(dbUri, {}).then(() => {
    logger.info("successfully connected to mongodb...");
  });

  return app;
}

createServer().catch((error) => {
  logger.error(error);
});
