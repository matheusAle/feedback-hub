import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import { resolve } from "node:path";

const sqlite = new Database(resolve(__dirname, "sqlite.db"));

export const db = drizzle(sqlite, {
  schema,
});
