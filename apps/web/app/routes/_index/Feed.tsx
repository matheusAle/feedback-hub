import {
  FeedbackFeedItemFragment,
  FetchFeedbacksQuery,
} from "@/api/types/graphql";
import { FeedbackFeed } from "@/features/FeedbackFeed";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";

type Props = {
  data: FetchFeedbacksQuery["feedbacks"];
};

export const Feed = ({ data }: Props) => {
  const [list, setList] = useState<FeedbackFeedItemFragment[]>(
    () => data.data as FeedbackFeedItemFragment[],
  );
  const [nextCursor, setNextCursor] = useState<string | null>(
    () => data.nextCursor,
  );
  const fetcher = useFetcher<{ feedbacks: FetchFeedbacksQuery["feedbacks"] }>();

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
    fetcher.load(`?index&cursor=${nextCursor || ""}`);
  };

  return (
    <FeedbackFeed
      data={list}
      loadMore={loadMore}
      total={data.total}
      loading={fetcher.state === "loading"}
    />
  );
};
