import type { FastifyInstance } from "fastify";
import mercurius from "mercurius";
import { codegenMercurius } from "mercurius-codegen";
import mercuriusAuth from "mercurius-auth";

import fs from "node:fs";

import { getResolvers, getSchema } from "@/utils/graphql";
import { User } from "@/generated/graphql";
import { AuthLib } from "@/domain/AuthLib";

export type Context = {
  auth: { user: User | null; sessionId: string | null };
};

declare module "mercurius" {
  interface MercuriusContext extends Context {}
}

export async function initializeGraphQL(fastify: FastifyInstance) {
  const [schema, resolvers] = await Promise.all([getSchema(), getResolvers()]);

  fastify
    .register(mercurius, {
      path: "/graphql",
      graphiql: true,
      schema,
      resolvers,
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
    fs.rmSync("src/generated/schema.gql");
  fs.writeFileSync("src/generated/schema.gql", schema);
}
