/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation Login($input: LoginInput!) {\n      login(input: $input) {\n        token\n        user {\n          id\n          name\n          username\n        }\n      }\n    }\n  ": types.LoginDocument,
    "\n    mutation Logout {\n      logout\n    }\n  ": types.LogoutDocument,
    "\n    mutation CreateUser($input: CreateUserInput!) {\n      createUser(input: $input) {\n        token\n        user {\n          id\n          name\n          username\n        }\n      }\n    }\n  ": types.CreateUserDocument,
    "\n    query Events {\n      events {\n        id\n        name\n      }\n    }\n  ": types.EventsDocument,
    "\n    mutation CreateFeedback($input: CreateFeedbackInput!) {\n      createFeedback(input: $input) {\n        id\n      }\n    }\n  ": types.CreateFeedbackDocument,
    "\n    query FetchFeedbacks($input: FeedbacksInput!) {\n      feedbacks(input: $input) {\n        nextCursor\n        total\n        data {\n          ...FeedbackFeedItem\n        }\n      }\n    }\n    \n  ": types.FetchFeedbacksDocument,
    "\n    query GetFeedbackById($id: String!) {\n      feedback(id: $id) {\n        ...FeedbackFeedItem\n      }\n    }\n    \n  ": types.GetFeedbackByIdDocument,
    "\n  fragment FeedbackFeedItem on Feedback {\n    id\n    rate\n    content\n    createdAt\n    user {\n      id\n      username\n    }\n    event {\n      id\n      name\n    }\n  }\n": types.FeedbackFeedItemFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Login($input: LoginInput!) {\n      login(input: $input) {\n        token\n        user {\n          id\n          name\n          username\n        }\n      }\n    }\n  "): (typeof documents)["\n    mutation Login($input: LoginInput!) {\n      login(input: $input) {\n        token\n        user {\n          id\n          name\n          username\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Logout {\n      logout\n    }\n  "): (typeof documents)["\n    mutation Logout {\n      logout\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateUser($input: CreateUserInput!) {\n      createUser(input: $input) {\n        token\n        user {\n          id\n          name\n          username\n        }\n      }\n    }\n  "): (typeof documents)["\n    mutation CreateUser($input: CreateUserInput!) {\n      createUser(input: $input) {\n        token\n        user {\n          id\n          name\n          username\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Events {\n      events {\n        id\n        name\n      }\n    }\n  "): (typeof documents)["\n    query Events {\n      events {\n        id\n        name\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateFeedback($input: CreateFeedbackInput!) {\n      createFeedback(input: $input) {\n        id\n      }\n    }\n  "): (typeof documents)["\n    mutation CreateFeedback($input: CreateFeedbackInput!) {\n      createFeedback(input: $input) {\n        id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query FetchFeedbacks($input: FeedbacksInput!) {\n      feedbacks(input: $input) {\n        nextCursor\n        total\n        data {\n          ...FeedbackFeedItem\n        }\n      }\n    }\n    \n  "): (typeof documents)["\n    query FetchFeedbacks($input: FeedbacksInput!) {\n      feedbacks(input: $input) {\n        nextCursor\n        total\n        data {\n          ...FeedbackFeedItem\n        }\n      }\n    }\n    \n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetFeedbackById($id: String!) {\n      feedback(id: $id) {\n        ...FeedbackFeedItem\n      }\n    }\n    \n  "): (typeof documents)["\n    query GetFeedbackById($id: String!) {\n      feedback(id: $id) {\n        ...FeedbackFeedItem\n      }\n    }\n    \n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FeedbackFeedItem on Feedback {\n    id\n    rate\n    content\n    createdAt\n    user {\n      id\n      username\n    }\n    event {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment FeedbackFeedItem on Feedback {\n    id\n    rate\n    content\n    createdAt\n    user {\n      id\n      username\n    }\n    event {\n      id\n      name\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;