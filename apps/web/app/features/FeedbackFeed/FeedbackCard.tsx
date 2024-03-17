import { FeedbackFeedItemFragment } from "@/api/types/graphql";
import { StarRating } from "@/components/StarRating";
import { format } from "date-fns/format";

export const FeedbackCard = ({
  feedback,
}: {
  feedback: FeedbackFeedItemFragment;
}) => {
  return (
    <div className="card shadow-md hover:shadow-lg bg-base-200 transition-shadow">
      <div className="card-body">
        <div className="flex flex-col">
          <div className="flex flex-row content-between ">
            <div className="flex flex-row items-center space-x-2 mb-2 flex-grow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                fill="none"
                className="stroke-current text-gray-500"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 5l0 2" />
                <path d="M15 11l0 2" />
                <path d="M15 17l0 2" />
                <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" />
              </svg>
              <p className="text-lg text-neutral-content">
                {feedback.event.name}
              </p>
            </div>
            <p className="dark:text-slate-500 flex-grow-0">
              {format(new Date(feedback.createdAt), "MMM dd, yyyy")}
            </p>
          </div>

          <StarRating rate={feedback.rate} size="sm" disabled />
          <p className="my-4 text-lg ext-base-content">{feedback.content}</p>
          <div className="flex flex-row feedbacks-center space-x-2 dark:text-slate-500">
            by {feedback.user.username}
          </div>
        </div>
      </div>
    </div>
  );
};
