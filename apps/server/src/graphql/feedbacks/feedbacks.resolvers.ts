import { FeedbackLib } from "@/domain/FeedbackLib";
import { MutationResolvers } from "@/generated/graphql";

export const mutation: MutationResolvers = {
  createFeedback(_, { input }, { auth }) {
    if (!auth?.user) throw new Error("Not authenticated");

    return FeedbackLib.createFeedback({
      ...input,
      userId: auth.user.id,
    });
  },
};
