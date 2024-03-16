import { gql } from "graphql-request";
import { client } from "./serverClient";
import { EventsQuery } from "./types/graphql";

export const fetchAll = () => {
  const QUERY = gql`
    query Events {
      events {
        id
        name
      }
    }
  `;
  return client.request<EventsQuery>(QUERY, {});
};

export * as EventsApi from "./events";
