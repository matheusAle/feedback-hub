export type { FeedbacksInput, FeedbacksResponse } from "@/generated/graphql";
import { CreateFeedbackInput as CreateFeedbackInputBase } from "@/generated/graphql";

export type CreateFeedbackInput = CreateFeedbackInputBase & {
  userId: string;
};
