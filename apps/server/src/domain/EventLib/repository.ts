import { v4 } from "uuid";
import { CreateEventInput } from "./types";
import { db, events } from "@repo/db";
import { eq } from "drizzle-orm";

export const createEvent = async (data: CreateEventInput) => {
  const id = v4();
  await db.insert(events).values({ ...data, id });
  return getEventById(id);
};

export const getEventById = async (id: string) => {
  const event = await db.query.events.findFirst({
    where: eq(events.id, id),
  });
  if (!event) throw new Error("Event not found");
  return event;
};

export const getAllEvents = async () => {
  return db.query.events.findMany();
};

export * as Repository from "./repository";
