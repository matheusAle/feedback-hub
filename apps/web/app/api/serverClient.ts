import { SessionService } from "@/services/session.server";
import { GraphQLClient } from "graphql-request";

const endpoint =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:7001/graphql";

export const client = new GraphQLClient(endpoint);

export const createClient = async (request: Request) => {
  const session = await SessionService.getSession(
    request.headers.get("Cookie"),
  );
  const token = session?.data?.login?.token;

  return new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
