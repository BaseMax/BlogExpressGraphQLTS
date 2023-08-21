import { GraphQLError } from "graphql";
import { getUserFromToken } from "./auth/get-user-from-token";

// export const context = async ({ headers }) => {
//   const token = headers["authorization"];
//   if (token) {
//     try {
//       return { user: getUserFromToken(token) };
//     } catch {
//       throw new GraphQLError("Authentication error", {
//         extensions: { code: "UNAUTHENTICATED" },
//       });
//     }
//   } else {
//     return {};
//   }
// };

import { AuthPayload } from "./auth/entity/auth-payload";

export interface Context {
  user?: AuthPayload;
}
