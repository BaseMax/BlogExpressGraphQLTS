import { AuthPayload } from "../auth/entity/auth-payload";

export const authChecker = () => (user: AuthPayload | undefined) => {
  if (!user) {
    return false;
  }
  return true;
};
