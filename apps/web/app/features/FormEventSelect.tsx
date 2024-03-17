import { Event } from "@/api/types/graphql";
import { FormSelect, FormSelectProps } from "@/components/FormSelect";
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

export const FormEventSelect = (props: Omit<FormSelectProps, "options">) => {
  const fetcher = useFetcher<{ events: Event[] }>();

  useEffect(() => {
    if (!fetcher.data && props.value) {
      if (fetcher.state === "loading") return;
      fetcher.load(`/events`);
    }
  }, [fetcher, props.value]);

  return (
    <FormSelect
      {...props}
      onClick={() => {
        fetcher.load("/events");
      }}
      options={(fetcher?.data?.events || []).map((event) => ({
        label: event.name,
        value: event.id,
      }))}
    />
  );
};
