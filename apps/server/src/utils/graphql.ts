import { glob } from "glob";
import { print } from "graphql";
import { loadFiles } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { IResolvers } from "mercurius";

export async function getResolvers() {
  const resolvers: IResolvers = {};

  const files = glob.sync("**/*.resolvers.[t|j]s", {
    cwd: process.cwd(),
    absolute: true,
  });

  for (const file of files) {
    const resolve = await require(file);

    Object.entries(resolve).forEach(([objKey, value]) => {
      const key = objKey.at(0)?.toUpperCase() + objKey.slice(1);

      if (!resolvers[key]) resolvers[key] = {};

      // strict mode don't check for guards
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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
