import { db, eq, usersSessions } from "@repo/db";
import { CreateSessionPayload } from "./types";

export const findUserByUsername = async (username: string) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });

  if (!user) throw new Error("User not found");

  return user;
};

export const createUserSession = async ({
  userId,
  token,
  id,
}: CreateSessionPayload) => {
  return db.insert(usersSessions).values({
    id,
    userId,
    token,
    createdAt: new Date(),
  });
};

export const findSessionById = async (id: string) => {
  return db.query.usersSessions.findFirst({
    where: (usersSessions, { eq }) => eq(usersSessions.id, id),
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          username: true,
        },
      },
    },
  });
};

export const completeUserSession = async (id: string) => {
  return db
    .update(usersSessions)
    .set({ endedAt: new Date() })
    .where(eq(usersSessions.id, id));
};

export * as Repository from "./repository";
