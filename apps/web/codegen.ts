import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../server/src/generated/schema.gql",
  documents: "app/**/*.{ts,tsx}",
  generates: {
    "./app/api/types/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
