import { db, users } from "@repo/db";
import { isUniqueViolationError } from "@repo/db/utils";
import { CreateUserInput } from "./types";
import { v4 } from "uuid";

export const createUser = async (data: CreateUserInput) => {
  const id = v4();
  try {
    await db.insert(users).values({ ...data, id });
  } catch (e) {
    if (isUniqueViolationError(e)) throw new Error("User already exists");
  }
  return getUserById(id);
};

export const getUserById = async (id: string) => {
  const user = await db.query.users.findFirst({
    columns: { id: true, name: true, username: true },
    where: (users, { eq }) => eq(users.id, id),
  });
  if (!user) throw new Error("User not found");
  return user;
};

export const getUsers = () =>
  db.query.users.findMany({
    columns: {
      id: true,
      name: true,
      username: true,
    },
  });

export * as Repository from "./repository";
