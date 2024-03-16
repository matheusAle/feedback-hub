import { FeedbacksApi } from "@/api/feedbacks";
import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const id = params.id;
  if (!id) return json({ error: "No id provided" }, { status: 400 });

  const { feedback } = await FeedbacksApi.getFeedbackById(id);

  return {
    feedback,
  };
};
