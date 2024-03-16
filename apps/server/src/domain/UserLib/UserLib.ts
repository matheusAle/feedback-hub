import { createUserSchema } from "@repo/db/validator";
import { AuthLib } from "../AuthLib";
import { CreateUserInput } from "./types";
import { Repository } from "./repository";

export const createUser = async (data: CreateUserInput) => {
  const validData = createUserSchema.parse(data);
  const password = await AuthLib.hashPassword(validData.password);
  return Repository.createUser({ ...validData, password });
};

export { getUsers, getUsersByIds } from "./repository";

export * as UserLib from "./UserLib";
