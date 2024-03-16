import { UserLib } from "@/domain/UserLib";
import { AuthLib } from "@/domain/AuthLib";
import { MutationResolvers, QueryResolvers } from "@/generated/graphql";

export const mutation: MutationResolvers = {
  createUser: async (_parent, { input }) => {
    const user = await UserLib.createUser(input);

    const { token } = await AuthLib.authorize(user.username, input.password);

    return { user, token };
  },
};

export const query: QueryResolvers = {
  users: () => {
    return UserLib.getUsers();
  },
};
