import { gql } from "graphql-request";
import { useQuery } from "./useQuery";
import { EventsQuery } from "./types/graphql";

const QUERY = gql`
  query Events {
    events {
      id
      name
    }
  }
`;

export const useEventsQuery = () => {
  const { data, isLoading, error } = useQuery<EventsQuery>(QUERY);

  return {
    events: data?.events,
    isEventsLoading: isLoading,
    eventsError: error,
  };
};
