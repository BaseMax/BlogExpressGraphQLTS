import { GraphQLError, GraphQLFormattedError } from "graphql";
import { logger } from "../logger/logger";
import { unwrapResolverError } from "@apollo/server/errors";

export function formatError(error: GraphQLError): GraphQLFormattedError {
  const originalError = unwrapResolverError(error);

  logger.error(
    `Server error: ${
      originalError
    }`
  );
  const formattedError = {
    message: error.message,
    path: error.path,
  };
  return formattedError;
}

