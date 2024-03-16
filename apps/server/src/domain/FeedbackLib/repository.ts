import { db, feedbacks } from "@repo/db";
import { CreateFeedbackInput } from "./types";
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

export * as Repository from "./repository";
