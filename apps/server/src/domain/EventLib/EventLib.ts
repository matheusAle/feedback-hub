import { createEventSchema } from "@repo/db/validator";
import { CreateEventInput } from "./types";
import { Repository } from "./repository";

export const createEvent = async (data: CreateEventInput) => {
  const validData = createEventSchema.parse(data);
  return Repository.createEvent(validData);
};

export { getAllEvents } from "./repository";

export * as EventLib from "./EventLib";
