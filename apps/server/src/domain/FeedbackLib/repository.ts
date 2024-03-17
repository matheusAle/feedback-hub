import { and, db, feedbacks, lt, sql, eq } from "@repo/db";
import { CreateFeedbackInput, FeedbacksInput } from "./types";
import { v4 } from "uuid";

export const createFeedback = async (data: CreateFeedbackInput) => {
  const id = v4();
  await db.insert(feedbacks).values({
    ...data,
    id,
    createdAt: new Date(),
  });

  return findFeedbackById(id);
};

export const findFeedbackById = async (id: string) => {
  const feedback = await db.query.feedbacks.findFirst({
    where: (feedbacks, { eq }) => eq(feedbacks.id, id),
  });
  if (!feedback) {
    throw new Error("Feedback not found");
  }
  return feedback;
};

const _getFilterWhere = (
  filter: Pick<FeedbacksInput, "cursor" | "rate" | "eventId">,
) => {
  const list = [];

  if (filter.cursor)
    list.push(lt(feedbacks.createdAt, new Date(filter.cursor)));

  if (filter.rate) list.push(eq(feedbacks.rate, filter.rate));

  if (filter.eventId) list.push(eq(feedbacks.eventId, filter.eventId));

  return and(...list);
};

export const findFeedbacks = async ({
  take,
  cursor,
  rate,
  eventId,
}: FeedbacksInput) => {
  const where = _getFilterWhere({ cursor, rate, eventId });
  return db.query.feedbacks.findMany({
    limit: take,
    orderBy: (posts, { desc }) => desc(posts.createdAt),
    where,
  });
};

export const countFeedbacks = async ({ eventId, rate }: FeedbacksInput) => {
  const where = _getFilterWhere({ eventId, rate });
  const [{ count }] = await db
    .select({ count: sql`count(*)`.mapWith(Number) })
    .from(feedbacks)
    .where(where);
  return count;
};

export * as Repository from "./repository";
