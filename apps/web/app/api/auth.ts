import { GraphQLClient, gql } from "graphql-request";
import {
  CreateUserInput,
  CreateUserMutation,
  CreateUserMutationVariables,
  LoginInput,
  LoginMutation,
  LoginMutationVariables,
  LogoutMutation,
} from "./types/graphql";
import { client } from "./serverClient";

export const login = async (input: LoginInput) => {
  const query = gql`
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        token
        user {
          id
          name
          username
        }
      }
    }
  `;
  return client.request<LoginMutation, LoginMutationVariables>(query, {
    input,
  });
};

export const logout = async (client: GraphQLClient) => {
  const query = gql`
    mutation Logout {
      logout
    }
  `;
  return client.request<LogoutMutation>(query, {});
};

export const createUser = async (input: CreateUserInput) => {
  const query = gql`
    mutation CreateUser($input: CreateUserInput!) {
      createUser(input: $input) {
        token
        user {
          id
          name
          username
        }
      }
    }
  `;
  return client.request<CreateUserMutation, CreateUserMutationVariables>(
    query,
    { input },
  );
};

export * as AuthApi from "./auth";
