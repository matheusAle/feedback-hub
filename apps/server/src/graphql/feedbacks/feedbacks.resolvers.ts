import { EventLib } from "@/domain/EventLib";
import { FeedbackLib } from "@/domain/FeedbackLib";
import { UserLib } from "@/domain/UserLib";
import { MutationResolvers, QueryResolvers } from "@/generated/graphql";
import { IResolvers, MercuriusLoaders } from "mercurius";

export const mutation: MutationResolvers = {
  createFeedback(_, { input }, { auth }) {
    if (!auth?.user) throw new Error("Not authenticated");

    return FeedbackLib.createFeedback({
      ...input,
      userId: auth.user.id,
    });
  },
};

export const query: QueryResolvers = {
  async feedbacks(_, { input }) {
    const [data = [], total] = await Promise.all([
      FeedbackLib.findFeedbacks(input),
      FeedbackLib.countFeedbacks(input),
    ]);

    return {
      data,
      total,
      nextCursor: data?.at(-1)?.createdAt ?? null,
      rate: input.rate,
      eventId: input.eventId,
    };
  },
  feedback(_, { id }) {
    return FeedbackLib.findFeedbackById(id);
  },
};

export const loaders: MercuriusLoaders<IResolvers> = {
  Feedback: {
    event: {
      async loader(queries) {
        const eventIds = queries.map(({ obj: { eventId } }) => eventId);
        const events = await EventLib.getEventsByIds(eventIds);
        const eventMap = Object.fromEntries(
          events.map((event) => [event.id, event]),
        );

        return queries.map(({ obj: { eventId } }) => {
          return eventMap[eventId];
        });
      },
    },
    user: {
      async loader(queries) {
        const userIds = queries.map(({ obj: { userId } }) => userId);
        const users = await UserLib.getUsersByIds(userIds);
        const userMap = Object.fromEntries(
          users.map((user) => [user.id, user]),
        );

        return queries.map(({ obj: { userId } }) => {
          return userMap[userId];
        });
      },
    },
  },
};
