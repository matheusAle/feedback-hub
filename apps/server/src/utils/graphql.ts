import { glob } from "glob";
import { print } from "graphql";
import { loadFiles } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

import type { Resolver } from "../graphql/types";

export async function getResolvers() {
  const resolvers: Resolver = {};

  const files = glob.sync("dist/**/*.resolvers.js", {
    cwd: process.cwd(),
    absolute: true,
  });

  for (const file of files) {
    const resolve = await import(file);

    Object.entries(resolve).forEach(([objKey, value]) => {
      const key = objKey.at(0).toUpperCase() + objKey.slice(1);

      if (!resolvers[key]) resolvers[key] = {};
      Object.assign(resolvers[key], value);
    });
  }

  return resolvers;
}

export async function getSchema() {
  const loadedFiles = await loadFiles("src/**/*.gql", {
    recursive: true,
  });

  const typeDefs = mergeTypeDefs(loadedFiles);
  const schema = print(typeDefs);
  return schema;
}
