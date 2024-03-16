import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Header } from "@/features/Header";
import { AuthProvider } from "@/providers/AuthProvider";
import { AuthService } from "@/services/auth.server";
import { FetchFeedbacksQuery, User } from "@/api/types/graphql";
import { FeedbacksApi } from "@/api/feedbacks";
import { Feed } from "./Feed";

export const meta: MetaFunction = () => {
  return [
    { title: "Feedback Hub" },
    { name: "description", content: "Welcome to Feedback Hub" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const nextCursor = url.searchParams.get("cursor") || null;

  const [user, { feedbacks }] = await Promise.all([
    AuthService.isAuthenticatedFromRequest(request),
    FeedbacksApi.fetchFeedbacks({ take: 10, cursor: nextCursor }),
  ]);

  return {
    user,
    feedbacks,
  };
};

export default function Index() {
  const { user, feedbacks } = useLoaderData<typeof loader>();

  return (
    <AuthProvider user={user as User}>
      <div>
        <Header />
        <div className="mx-auto w-full max-w-screen-sm pt-10 pb-20">
          <Feed data={feedbacks as FetchFeedbacksQuery["feedbacks"]} />
        </div>
      </div>
    </AuthProvider>
  );
}
