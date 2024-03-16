import { GraphQLClient, gql } from "graphql-request";
import {
  CreateFeedbackInput,
  CreateFeedbackMutation,
  CreateFeedbackMutationVariables,
  FeedbacksInput,
  FetchFeedbacksQuery,
  FetchFeedbacksQueryVariables,
} from "./types/graphql";
import { FeedbackFeedItemFragment } from "@/features/FeedbackFeed";
import { client } from "./serverClient";

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

export const fetchFeedbacks = (input: FeedbacksInput) => {
  const query = gql`
    query FetchFeedbacks($input: FeedbacksInput!) {
      feedbacks(input: $input) {
        nextCursor
        total
        data {
          ...FeedbackFeedItem
        }
      }
    }
    ${FeedbackFeedItemFragment}
  `;

  console.log("input", input);
  return client.request<FetchFeedbacksQuery, FetchFeedbacksQueryVariables>(
    query,
    { input },
  );
};

export * as FeedbacksApi from "./feedbacks";
