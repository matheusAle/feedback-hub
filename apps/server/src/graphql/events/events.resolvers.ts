import { EventLib } from "@/domain/EventLib";
import { MutationResolvers, QueryResolvers } from "@/generated/graphql";

export const mutation: MutationResolvers = {
  createEvent: (_parent, { input }) => {
    return EventLib.createEvent(input);
  },
};

export const query: QueryResolvers = {
  events: () => {
    return EventLib.getAllEvents();
  },
};
