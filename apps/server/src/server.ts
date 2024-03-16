import Fastify from "fastify";
import { initializeGraphQL } from "./graphql";
import { initializeRealtime } from "./graphql/sse";
import cors from "@fastify/cors";

(async () => {
  const server = Fastify({
    logger: {
      transport: {
        target: "@fastify/one-line-logger",
      },
    },
  });

  server.register(cors, {
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await initializeGraphQL(server);
  initializeRealtime(server);

  const port = +(process.env.PORT ?? "") || 3000;

  server.listen({ port });
})();
