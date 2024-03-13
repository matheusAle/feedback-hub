import type { FastifyInstance } from "fastify";
import mercurius from "mercurius";
import { codegenMercurius } from "mercurius-codegen";
import fs from "node:fs";

import { getResolvers, getSchema } from "@/utils/graphql";

export async function initializeGraphQL(fastify: FastifyInstance) {
  const [schema, resolvers] = await Promise.all([getSchema(), getResolvers()]);

  fastify.register(mercurius, {
    path: "/graphql",
    graphiql: true,
    schema,
    resolvers,
    errorFormatter: (error, ctx) => {
      return mercurius.defaultErrorFormatter(error, ctx);
    },
  });

  codegenMercurius(fastify, {
    silent: true,
    targetPath: "./src/generated/graphql.ts",
    operationsGlob: "./src/graphql/**/*.gql",
  });

  fs.writeFileSync("src/generated/schema.gql", schema);
}
