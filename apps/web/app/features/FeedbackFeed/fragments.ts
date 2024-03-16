import { gql } from "graphql-request";

export const FeedbackFeedItemFragment = gql`
  fragment FeedbackFeedItem on Feedback {
    id
    rate
    content
    createdAt
    user {
      id
      username
    }
    event {
      id
      name
    }
  }
`;
