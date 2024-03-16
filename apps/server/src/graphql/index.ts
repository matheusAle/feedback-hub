import type { FastifyInstance } from "fastify";
import mercurius from "mercurius";
import { codegenMercurius } from "mercurius-codegen";
import mercuriusAuth from "mercurius-auth";

import fs from "node:fs";

import { getResolversAndLoaders, getSchema } from "@/utils/graphql";
import { User } from "@/generated/graphql";
import { AuthLib } from "@/domain/AuthLib";

declare module "mercurius-auth" {
  interface MercuriusAuthContext extends Record<string, unknown> {
    user: User | null;
    sessionId: string | null;
  }
}

export async function initializeGraphQL(fastify: FastifyInstance) {
  const [schema, { resolvers, loaders }] = await Promise.all([
    getSchema(),
    getResolversAndLoaders(),
  ]);

  fastify
    .register(mercurius, {
      path: "/graphql",
      graphiql: true,
      schema,
      resolvers: resolvers,
      loaders,
      errorFormatter: (error, ctx) => {
        return mercurius.defaultErrorFormatter(error, ctx);
      },
    })
    .register(mercuriusAuth, {
      authDirective: "auth",
      async applyPolicy(_authDirectiveAST, _parent, _args, { auth }) {
        if (auth?.sessionId) return true;
        return false;
      },
      async authContext({ reply }) {
        const authorization = reply.request.headers.authorization || "";

        if (!authorization || typeof authorization !== "string")
          return { sessionId: null };

        const token = authorization.replace("Bearer ", "");

        try {
          const { user, sessionId } =
            await AuthLib.findUserBySessionTokenOrError(token);
          return { user, sessionId };
        } catch (error) {
          return { sessionId: null };
        }
      },
    });

  if (!fs.existsSync("src/generated")) {
    fs.mkdirSync("src/generated");
  }

  codegenMercurius(fastify, {
    silent: true,
    targetPath: "./src/generated/graphql.ts",
    operationsGlob: "./src/graphql/**/*.gql",
  });

  if (fs.existsSync("src/generated/schema.gql"))
    fs.rmSync("src/generated/schema.gql", { force: true });
  fs.writeFileSync("src/generated/schema.gql", schema);
}
