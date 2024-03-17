import {
  FeedbackFeedItemFragment,
  FetchFeedbacksQuery,
} from "@/api/types/graphql";
import { useFetcher } from "@remix-run/react";
import { useEventStream } from "@remix-sse/client";
import { SSEFeedBackEvent } from "@repo/sse-types/feedbacks";
import { isBefore } from "date-fns";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";

export const useSse = (
  list: FeedbackFeedItemFragment[],
  setList: Dispatch<SetStateAction<FeedbackFeedItemFragment[]>>,
  data: FetchFeedbacksQuery["feedbacks"],
) => {
  const latestFeedback: SSEFeedBackEvent = useEventStream(
    "http://localhost:7001/sse/feedbacks",
    {
      returnLatestOnly: true,
      deserialize: (data) => {
        return JSON.parse(data);
      },
    },
  );

  const fetchFeedback = useFetcher<{ feedback: FeedbackFeedItemFragment }>({
    key: "feedback/" + latestFeedback?.newFeedback,
  });

  const latestIsInList = useMemo(() => {
    if (!latestFeedback) return false;
    return list.some((item) => item.id === latestFeedback.newFeedback);
  }, [latestFeedback, list]);

  useEffect(() => {
    // If there is no latest feedback or it is already in the list, do nothing
    if (!latestFeedback || latestIsInList) return;

    // If the feedback is already in the list, do nothing
    if (fetchFeedback.state === "loading") return;

    // if the latest feedback is the same as the one we are fetching then we inset it into the list
    if (fetchFeedback.data?.feedback?.id === latestFeedback.newFeedback) {
      const newFeedback = fetchFeedback.data
        .feedback as FeedbackFeedItemFragment;
      // if new feedback don't match current filter, do nothing
      if (
        (data.rate && newFeedback.rate !== data.rate) ||
        (data.eventId && newFeedback.event.id !== data.eventId)
      ) {
        return;
      }

      setList((prev) => {
        if (!fetchFeedback.data?.feedback) return prev;
        const createdAt = new Date(newFeedback.createdAt);

        let index = 0;
        for (const item of prev) {
          // check the created at date to know where to insert the new feedback
          if (isBefore(new Date(item.createdAt), createdAt)) {
            const newList = [...prev];

            newList.splice(index, 0, newFeedback);

            return newList;
          }
          index++;
        }
        return prev;
      });
      return;
    }

    fetchFeedback.load(`/feedbacks/${latestFeedback.newFeedback}`);
  }, [latestFeedback, fetchFeedback, latestIsInList, setList]);

  useEffect(() => {
    if (!fetchFeedback.data || fetchFeedback.state === "loading") return;
  }, [fetchFeedback.data, fetchFeedback.state]);
};
