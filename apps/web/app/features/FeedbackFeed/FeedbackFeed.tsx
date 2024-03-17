import { FeedbackFeedItemFragment } from "@/api/types/graphql";
import { Button } from "@/components/Button";
import { FeedbackCard } from "./FeedbackCard";

type Props = {
  data: FeedbackFeedItemFragment[];
  total: number;
  loadMore: () => void;
  loading: boolean;
};

export const FeedbackFeed = ({ data, total, loadMore, loading }: Props) => {
  return (
    <div className="space-y-6">
      {data.map((item) => (
        <FeedbackCard key={item.id} feedback={item} />
      ))}

      {data.length < total && (
        <div className="flex justify-center">
          <Button
            onClick={loadMore}
            className="btn btn-primary"
            loading={loading}
          >
            Load more
          </Button>
        </div>
      )}
      {data.length === 0 && (
        <div className="flex justify-center">
          <p className="text-lg text-neutral-content">No feedbacks yet</p>
        </div>
      )}
      {data.length === total && (
        <div className="flex justify-center">
          <p className="text-lg text-neutral-content">No more feedbacks</p>
        </div>
      )}
    </div>
  );
};
