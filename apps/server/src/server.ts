import Fastify from "fastify";
import { initializeGraphQL } from "./graphql";

(async () => {
  const server = Fastify({
    logger: {
      transport: {
        target: "@fastify/one-line-logger",
      },
    },
  });

  await initializeGraphQL(server);

  const port = +process.env.PORT || 3000;

  server.listen({ port });
})();
