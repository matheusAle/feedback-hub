import { EventsApi } from "@/api/events";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { FormTextArea } from "@/components/FormTextArea";
import { ActionError } from "@/features/ActionError";
import { useIsActionRunning } from "@/hooks/useIsActionRunning";
import { Form, useLoaderData } from "@remix-run/react";
import { FormSelect } from "@/components/FormSelect";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { FeedbacksApi } from "@/api/feedbacks";
import { FormStarRating } from "@/components/FormStarRating";
import { createClient } from "@/api/serverClient";

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData();
  const eventId = body.get("event")?.toString();
  const content = body.get("feedback")?.toString();
  const rate = +(body.get("rating") || "");

  if (!eventId || !content) {
    throw new Error("Invalid form submission");
  }

  if (!rate) {
    throw new Error("Please provide a rating");
  }

  if (rate < 1 || rate > 5) {
    throw new Error("Invalid rating");
  }

  await FeedbacksApi.createFeedback(await createClient(request), {
    eventId,
    content,
    rate,
  });
  return redirect("/");
};

export const loader = async () => {
  const { events } = await EventsApi.fetchAll();

  return {
    events,
  };
};

export const ErrorBoundary = () => <Screen />;

export default function Screen() {
  const { events } = useLoaderData<typeof loader>();
  const isLoading = useIsActionRunning("/feedback/post");

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      <div className="card shadow-xl border-top w-full  md:w-96 lg:max-w-lg bg-base-200">
        <div className="card-body">
          <div className="flex flex-col space-y-2 items-center mb-3">
            <Logo />
            <h1 className="card-title">Feedback Hub</h1>
          </div>
          <Form method="post">
            <FormSelect
              label="Event"
              name="event"
              required
              options={events.map((event) => ({
                value: event.id,
                label: event.name,
              }))}
            />

            <FormStarRating label="Rating" name="rating" required />

            <FormTextArea
              className="mb-6"
              label="Feedback"
              name="feedback"
              required
            />

            <div className="card-actions">
              <Button type="submit" className="w-full" loading={isLoading}>
                Post feedback
              </Button>
            </div>

            <ActionError />
          </Form>
        </div>
      </div>
    </div>
  );
}
