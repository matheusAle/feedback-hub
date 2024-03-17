import { Form } from "@remix-run/react";
import { FormEventSelect } from "./FormEventSelect";
import { FormStarRating } from "@/components/FormStarRating";
import { Button, ButtonLink } from "@/components/Button";
import { useRef } from "react";

type Props = {
  eventId?: string | null;
  rate?: number | null;
};
export const FeedbackFilter = ({ eventId, rate }: Props) => {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <Form
      ref={ref}
      className="flex flex-row space-x-3"
      action="?index"
      role="search"
    >
      <FormEventSelect
        className="w-60"
        placeholder="Filter by event"
        name="eventId"
        id="eventId"
        value={eventId || ""}
      />

      <FormStarRating name="rate" value={rate} />
      <Button type="submit" variant="secondary" className="btn-outline">
        filter
      </Button>
      {(eventId || rate) && (
        <ButtonLink to={"/"} variant="text">
          clear
        </ButtonLink>
      )}
    </Form>
  );
};
