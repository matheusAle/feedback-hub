import { createFeedbackSchema } from "@repo/db/validator";
import { CreateFeedbackInput } from "./types";
import { Repository } from "./repository";
import { SSEChannels } from "@/graphql/sse";

export const createFeedback = async (data: CreateFeedbackInput) => {
  const validData = createFeedbackSchema.parse(data);

  const feedback = await Repository.createFeedback(validData);

  SSEChannels.feedBacks.next({ newFeedback: feedback.id });

  return feedback;
};

export { findFeedbacks, countFeedbacks, findFeedbackById } from "./repository";

export * as FeedbackLib from "./FeedbackLib";
