import { createInsertSchema } from "drizzle-zod";
import { events, feedbacks, users } from "./schema";
import { z } from "zod";
import string from "string-sanitizer";

export const createUserSchema = createInsertSchema(users, {
  name: z
    .string()
    .trim()
    .min(1)
    .max(255)
    .transform((v) => string.sanitize.keepSpace(v)),
  username: z.string().trim().min(1).max(255),
  password: z.string().trim().min(1).max(255),
})
  .required()
  .omit({ id: true })
  .strict();

export const createEventSchema = createInsertSchema(events, {
  name: z
    .string()
    .trim()
    .min(1)
    .max(255)
    .transform((v) => string.sanitize.keepSpace(v)),
})
  .omit({ id: true })
  .required()
  .strict();

export const createFeedbackSchema = createInsertSchema(feedbacks, {
  content: z
    .string()
    .trim()
    .min(1)
    .max(255)
    .transform((v) => string.sanitize.keepSpace(v)),
  rate: z.number().int().min(1).max(5),
  eventId: z.string().uuid(),
  userId: z.string().uuid(),
})
  .omit({ id: true, createdAt: true })
  .required()
  .strict();
