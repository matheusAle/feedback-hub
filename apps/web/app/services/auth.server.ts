import { CreateUserInput, LoginResponse, User } from "@/api/types/graphql";
import { Authenticator } from "remix-auth";
import { SessionService } from "@/services/session.server";
import { FormStrategy } from "remix-auth-form";
import { AuthApi } from "@/api/auth";
import { createClient } from "@/api/serverClient";
import { redirect } from "@remix-run/node";

export const authenticator = new Authenticator<LoginResponse>(
  SessionService.storage,
  {
    sessionKey: "login",
    throwOnError: true,
  },
);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const username = form.get("username");
    const password = form.get("password");

    if (!username || !password) throw new Error("Invalid form data");

    const { login } = await AuthApi.login({
      username: username.toString(),
      password: password.toString(),
    });

    return login;
  }),
  "user-pass",
);

export const authenticateFromRequest = (request: Request) => {
  return authenticator.authenticate("user-pass", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};

export const isAuthenticatedFromRequest = async (
  request: Request,
): Promise<User | null> => {
  const login = await authenticator.isAuthenticated(request);
  if (!login) return null;
  return login.user;
};

export const logoutFromRequest = async (request: Request) => {
  const client = await createClient(request);
  try {
    await AuthApi.logout(client);
  } catch (error) {
    // ignore - we're logging out anyway
  }
  return await authenticator.logout(request, {
    redirectTo: "/",
  });
};

export const createUser = async (request: Request) => {
  const body = await request.formData();
  const username = body.get("username");
  const name = body.get("name");
  const password = body.get("password");

  if (!username || !name || !password) {
    return new Response("Invalid form data", {
      status: 400,
    });
  }

  const { createUser: login } = await AuthApi.createUser({
    username,
    name,
    password,
  } as CreateUserInput);

  const session = await SessionService.getSession(
    request.headers.get("Cookie"),
  );

  session.set(authenticator.sessionKey, login);
  session.set(authenticator.sessionStrategyKey, "user-pass");

  throw redirect("/", {
    headers: {
      "Set-Cookie": await SessionService.commitSession(session),
    },
  });
};

export * as AuthService from "./auth.server";
