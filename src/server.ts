import "reflect-metadata";
import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { RecipeResolver } from "./blog/blog-resolver";
import * as path from "path";
import { logger } from "./logger/logger";
import { error } from "console";
import { AuthResolver } from "./auth/AuthResolver";
import { GraphQLError } from "graphql";

dotenv.config();

const port = process.env.Port || 3000;
const dbUri = process.env.DATABASE_URI as string;

export async function createServer(): Promise<Express> {
  const schema = await buildSchema({
    resolvers: [RecipeResolver, AuthResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
  });

  const app = express();

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    formatError: (error: GraphQLError) => {
      const formattedError = {
        message: error.message,
        path: error.path,
      };
      return formattedError;
    },
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
