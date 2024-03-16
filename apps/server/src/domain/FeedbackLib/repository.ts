import { db, feedbacks, sql } from "@repo/db";
import { CreateFeedbackInput, FeedbacksInput } from "./types";
import { v4 } from "uuid";

export const createFeedback = async (data: CreateFeedbackInput) => {
  const id = v4();
  await db.insert(feedbacks).values({
    ...data,
    id,
    createdAt: new Date(),
  });

  return findFeedbackById(id);
};

export const findFeedbackById = async (id: string) => {
  const feedback = await db.query.feedbacks.findFirst({
    where: (feedbacks, { eq }) => eq(feedbacks.id, id),
  });
  if (!feedback) {
    throw new Error("Feedback not found");
  }
  return feedback;
};

export const findFeedbacks = async ({ take, cursor }: FeedbacksInput) => {
  return db.query.feedbacks.findMany({
    limit: take,
    where: cursor
      ? (feedbacks, { gt }) => gt(feedbacks.createdAt, new Date(cursor))
      : undefined,
  });
};

export const countFeedbacks = async () => {
  const [{ count }] = await db
    .select({ count: sql`count(*)`.mapWith(Number) })
    .from(feedbacks);
  return count;
};

export * as Repository from "./repository";
