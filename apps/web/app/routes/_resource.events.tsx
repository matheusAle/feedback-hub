import { EventsApi } from "@/api/events";

export const loader = async () => {
  const { events } = await EventsApi.fetchAll();

  return {
    events,
  };
};
