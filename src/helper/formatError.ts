import { GraphQLError, GraphQLFormattedError } from "graphql";
import { logger } from "../logger/logger";
import { unwrapResolverError } from "@apollo/server/errors";

export function formatError(error: GraphQLError): GraphQLFormattedError {
  const originalError = unwrapResolverError(error);

  logger.error(`Server error: ${originalError}`);

  const graphQLFormattedError: GraphQLFormattedError = {
    message:
      (error?.extensions.originalError as any)?.message ||
      (error?.extensions?.exception as any)?.response?.message ||
      error?.message,
  };

  return graphQLFormattedError;
}
