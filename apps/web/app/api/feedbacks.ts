import { GraphQLClient, gql } from "graphql-request";
import {
  CreateFeedbackInput,
  CreateFeedbackMutation,
  CreateFeedbackMutationVariables,
} from "./types/graphql";

export const createFeedback = (
  client: GraphQLClient,
  input: CreateFeedbackInput,
) => {
  const mutation = gql`
    mutation CreateFeedback($input: CreateFeedbackInput!) {
      createFeedback(input: $input) {
        id
      }
    }
  `;

  return client.request<
    CreateFeedbackMutation,
    CreateFeedbackMutationVariables
  >(mutation, { input });
};

export * as FeedbacksApi from "./feedbacks";
