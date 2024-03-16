import { SqliteError } from "better-sqlite3";

export const isUniqueViolationError = <E>(error: E) => {
  if (!(error instanceof SqliteError)) return;
  return error.code === "SQLITE_CONSTRAINT_UNIQUE";
};
