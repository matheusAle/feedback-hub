import { FastifyInstance } from "fastify";
import { SSEChannels } from "./channels";
import { createHandleFromObservable } from "./createHandleFromObservable";

export const initializeRealtime = (fastify: FastifyInstance) => {
  fastify.get(
    "/sse/feedbacks",
    createHandleFromObservable(SSEChannels.feedBacks),
  );
};

export { SSEChannels };
