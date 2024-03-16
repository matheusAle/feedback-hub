import bcrypt from "bcryptjs";
import { Repository } from "./repository";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import { errorAsValue } from "@/utils/errors";

const JWT_SECRET = process.env.JWT_SECRET || "token";
const PASSWORD_SALT = process.env.PASSWORD_SALT || 10;

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, PASSWORD_SALT);
};

const createSession = () => {
  const id = v4();

  const token = jwt.sign({ sessionId: id }, JWT_SECRET, { expiresIn: "24h" });

  return {
    id,
    token,
  };
};

export const authorize = async (username: string, password: string) => {
  const user = await Repository.findUserByUsername(username);

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new Error("Invalid password");

  const { token, id } = createSession();

  await Repository.createUserSession({
    userId: user.id,
    token,
    id,
  });

  return {
    user: {
      username: user.username,
      name: user.name,
      id: user.id,
    },
    token,
  };
};

export const logout = async (sessionId: string) => {
  await Repository.completeUserSession(sessionId);
};

export const findUserBySessionTokenOrError = async (token: string) => {
  const [decoded, error] = errorAsValue(() => jwt.verify(token, JWT_SECRET));
  if (error || !decoded) throw new Error("Invalid token");

  const { sessionId } = decoded as { sessionId: string };
  if (!sessionId) throw new Error("Invalid session");

  const session = await Repository.findSessionById(sessionId);
  if (!session) throw new Error("Session not found");
  if (session.token !== token) throw new Error("Invalid token");
  if (session.endedAt) throw new Error("Session ended");

  return {
    user: session.user,
    sessionId,
  };
};

export * as AuthLib from "./AuthLib";
