import { createFeedbackSchema } from "@repo/db/validator";
import { CreateFeedbackInput } from "./types";
import { Repository } from "./repository";

export const createFeedback = async (data: CreateFeedbackInput) => {
  const validData = createFeedbackSchema.parse(data);

  return Repository.createFeedback(validData);
};

export * as FeedbackLib from "./FeedbackLib";
