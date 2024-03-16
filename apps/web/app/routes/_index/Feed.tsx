import {
  FeedbackFeedItemFragment,
  FetchFeedbacksQuery,
} from "@/api/types/graphql";
import { FeedbackFeed } from "@/features/FeedbackFeed";
import { useState } from "react";
import { useSse } from "./useSse";
import { useLoadMore } from "./useLoadMore";

type Props = {
  data: FetchFeedbacksQuery["feedbacks"];
};

export const Feed = ({ data }: Props) => {
  const [list, setList] = useState<FeedbackFeedItemFragment[]>(
    () => data.data as FeedbackFeedItemFragment[],
  );

  const { loadMore, isLoading } = useLoadMore(data.nextCursor, setList);

  useSse(list, setList);

  return (
    <FeedbackFeed
      data={list}
      loadMore={loadMore}
      total={data.total}
      loading={isLoading}
    />
  );
};
