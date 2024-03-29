import { useRouteError } from "@remix-run/react";
import clsx from "clsx";

import { isRouteErrorResponse } from "@remix-run/react";

export const getErrorMessage = (error: unknown) => {
  if (!error) return null;

  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    const msg = error.message;
    const [message] = msg.split(":");
    return message;
  } else {
    return "Unknown Error";
  }
};

export const ActionError = ({
  className,
  ...rest
}: React.HTMLProps<HTMLDivElement>) => {
  const error = useRouteError();

  if (!error) return null;

  return (
    <div
      role="alert"
      className={clsx("alert alert-error p-2", className)}
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div>
        <p className="text-lg">Ops!</p>
        <p className="text-sm">{getErrorMessage(error)}</p>
      </div>
    </div>
  );
};
