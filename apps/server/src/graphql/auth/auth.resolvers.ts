import { AuthLib } from "@/domain/AuthLib";
import { MutationResolvers } from "@/generated/graphql";

export const mutation: MutationResolvers = {
  login: async (_parent, { input: { username, password } }) => {
    const { user, token } = await AuthLib.authorize(username, password);

    return { user, token };
  },
  logout: async (_parent, _args, { auth }) => {
    if (!auth?.sessionId) {
      throw new Error("Unauthorized");
    }
    await AuthLib.logout(auth.sessionId);

    return true;
  },
};
