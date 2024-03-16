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
