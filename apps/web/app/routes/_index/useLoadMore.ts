import {
  FeedbackFeedItemFragment,
  FetchFeedbacksQuery,
} from "@/api/types/graphql";
import { useFetcher } from "@remix-run/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useLoadMore = (
  initialCursor: string | null,
  setList: Dispatch<SetStateAction<FeedbackFeedItemFragment[]>>,
) => {
  const fetcher = useFetcher<{ feedbacks: FetchFeedbacksQuery["feedbacks"] }>();

  const [nextCursor, setNextCursor] = useState<string | null>(
    () => initialCursor,
  );

  useEffect(() => {
    if (!fetcher.data || fetcher.state === "loading") {
      return;
    }

    if (fetcher.data) {
      const newItems = fetcher.data.feedbacks
        .data as FeedbackFeedItemFragment[];

      setList((prev) => [...prev, ...newItems]);
      setNextCursor(fetcher.data.feedbacks.nextCursor);
    }
  }, [fetcher, setList]);

  const loadMore = () => {
    const url = new URLSearchParams();

    url.set("cursor", nextCursor || "");
    url.set("eventId", fetcher.data?.feedbacks.eventId || "");
    url.set("rate", fetcher.data?.feedbacks.rate?.toString() || "");

    fetcher.load(`?index&${url.toString()}`);
  };

  return {
    loadMore,
    isLoading: fetcher.state === "loading",
  };
};
