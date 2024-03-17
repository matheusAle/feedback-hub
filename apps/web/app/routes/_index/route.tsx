import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Header } from "@/features/Header";
import { AuthProvider } from "@/providers/AuthProvider";
import { AuthService } from "@/services/auth.server";
import { FetchFeedbacksQuery, User } from "@/api/types/graphql";
import { FeedbacksApi } from "@/api/feedbacks";
import { Feed } from "./Feed";
import { FeedbackFilter } from "@/features/FeedbackFilter";

export const meta: MetaFunction = () => {
  return [
    { title: "Feedback Hub" },
    { name: "description", content: "Welcome to Feedback Hub" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const cursor = url.searchParams.get("cursor") || null;
  const eventId = url.searchParams.get("eventId") || null;
  const rate = +(url.searchParams.get("rate") || "") || null;

  const [user, { feedbacks }] = await Promise.all([
    AuthService.isAuthenticatedFromRequest(request),
    FeedbacksApi.fetchFeedbacks({ take: 10, cursor, eventId, rate }),
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
          <div className="my-10">
            <h1 className="text-3xl dark:text-white mb-5">Feedbacks</h1>

            <p className="text-lg text-neutral-content mb-3">
              Filter feedbacks by event and rating
            </p>
            <FeedbackFilter eventId={feedbacks.eventId} rate={feedbacks.rate} />
          </div>

          <Feed data={feedbacks as FetchFeedbacksQuery["feedbacks"]} />
        </div>
      </div>
    </AuthProvider>
  );
}
